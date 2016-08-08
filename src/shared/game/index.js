import * as KeyCode from 'shared/game/constants/keyCodes'
import * as API from 'shared/game/constants/API'

import Map from 'shared/game/map/Map'
import Camera from 'shared/game/camera/Camera'

exports.start = (user, repo, path = '') => {
    let gameEngine = new GameEngine(user, repo, path)
}

class GameEngine {
    constructor(user, repo, path) {
        this.camera = new Camera()
        this._createCamera()
        this._createCanvas()
        this._createStage()
        this.loadMap(user, repo, path)
    }

    _createCamera() {
        this.camera = new Camera()
    }

    _createCanvas() {
        this.canvas = document.getElementById('canvas')
        this.canvas.width = this.camera.width
        this.canvas.height = this.camera.height
    }

    _createStage() {
        if (this.canvas === null)
            throw 'Canvas not found'
        this.stage = new createjs.Stage(this.canvas)
        this.stage.snapToPixelEnabled = true
    }

    loadMap(user, repo, path) {
        this._clearStage()

        let queue = new createjs.LoadQueue()
        queue.on('fileload', this._handleFileLoad, this)
        queue.on('complete', this._handleComplete, this)
        queue.loadFile({
            src: API.getUrl(user, repo, path),
            type: createjs.AbstractLoader.JSON
        })

        queue.load()
    }

    _clearStage() {
        this.stage.removeAllChildren()
        createjs.Ticker.removeAllEventListeners()
    }

    _handleFileLoad(event) {
        console.log('handle file load')
        this._createMap(event.result)
    }

    _createMap(repo) {
        this.map = new Map(repo)
    }

    _handleComplete(event) {
        console.log('handle complete')
        this._enableStage()
        this._addMapToStage()
    }

    _enableStage() {
        let tick = () => {
            console.log('tick')
            this.camera.translate(this.map)
            return this.stage.update()
        }

        createjs.Ticker.addEventListener('tick', tick)
        createjs.Ticker.useRAF = true
        createjs.Ticker.setFPS(60)

        let SPEED = 3

        let currentPressed = ''

        document.onkeydown = (e) => {

            if (currentPressed === '') {
                currentPressed = e.keyCode

                switch (e.keyCode) {
                    case KeyCode.ENTER:
                        break
                    case KeyCode.SPACE:
                        break
                    case KeyCode.KEY_LEFT:
                        this.camera.setHorizontalSpeed(-1 * SPEED)
                        break
                    case KeyCode.KEY_UP:
                        this.camera.setVerticalSpeed(-1 * SPEED)
                        break
                    case KeyCode.KEY_RIGHT:
                        this.camera.setHorizontalSpeed(SPEED)
                        break
                    case KeyCode.KEY_DOWN:
                        this.camera.setVerticalSpeed(SPEED)
                        break
                }
            }
        }

        document.onkeyup = (e) => {
            if (e.keyCode === currentPressed) {
                currentPressed = ''
                this.camera.setHorizontalSpeed(0)
                this.camera.setVerticalSpeed(0)
            }
        }
    }

    _addMapToStage() {
        this.stage.addChild(this.map.sprite)
        this.stage.update()
    }
}
