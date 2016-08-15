import * as KeyCode from 'shared/game/constants/keyCodes'
import * as API from 'shared/game/constants/API'

import Player from 'shared/game/player/Player'
import Map from 'shared/game/map/Map'
import Camera from 'shared/game/camera/Camera'

exports.start = (user, repo, path = '') => {
    let gameEngine = new GameEngine(user, repo, path)
}

class GameEngine {
    constructor(user, repo, path) {
        this._createCamera()
        this._createCanvas()
        this._createStage()
        this._createPlayer(user)
        this.loadMap(user, repo, path)
    }

    _createCamera() {
        this.camera = new Camera()
    }

    _createCanvas() {
        this.canvas = document.getElementById('canvas')
        this.canvas.style.backgroundColor = '#eee'
        this.canvas.width = this.camera.width
        this.canvas.height = this.camera.height
    }

    _createStage() {
        if (this.canvas === null)
            throw 'Canvas not found'
        this.stage = new createjs.Stage(this.canvas)
        this.stage.snapToPixelEnabled = true
    }

    _createPlayer(name) {
        this.player = new Player(name)
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
        this._createMap(event.result)
    }

    _createMap(repo) {
        this.map = new Map(repo, this.player, this.camera)
    }

    _handleComplete(event) {
        this._enableStage()
        this._addMapToStage()
    }

    _enableStage() {
        let tick = () => {
            console.log('tick')
            this.map.move()
            return this.stage.update()
        }

        createjs.Ticker.addEventListener('tick', tick)
        createjs.Ticker.useRAF = true
        createjs.Ticker.setFPS(60)

        let SPEED = 4

        let currentPressed = ''

        document.onkeydown = (e) => {

            if (currentPressed === '') {
                currentPressed = e.keyCode

                switch (e.keyCode) {
                    case KeyCode.ENTER:
                        this.map.talk()
                        break
                    case KeyCode.SPACE:
                        this.map.talk()
                        break
                    case KeyCode.KEY_LEFT:
                        this.map.setHorizontalSpeed(-1 * SPEED)
                        this.player.turnLeft()
                        break
                    case KeyCode.KEY_UP:
                        this.map.setVerticalSpeed(-1 * SPEED)
                        this.player.turnBack()
                        break
                    case KeyCode.KEY_RIGHT:
                        this.map.setHorizontalSpeed(SPEED)
                        this.player.turnRight()
                        break
                    case KeyCode.KEY_DOWN:
                        this.map.setVerticalSpeed(SPEED)
                        this.player.faceFront()
                        break
                }
            }
        }

        document.onkeyup = (e) => {
            if (e.keyCode === currentPressed) {
                currentPressed = ''
                this.map.setHorizontalSpeed(0)
                this.map.setVerticalSpeed(0)
            }
        }
    }

    _addMapToStage() {
        this.stage.addChild(this.map.sprite)
        this.stage.update()
    }
}
