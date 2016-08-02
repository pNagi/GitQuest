// import Player from 'shared/game/player'
import * as KeyCode from 'shared/game/constants/keyCodes'
import * as API from 'shared/game/constants/API'

// import Factory from 'shared/game/factory'
import Map from 'shared/game/map/Map'

exports.start = (user, repo, path = '') => {
    let gameEngine = new GameEngine(user, repo, path)
}

class GameEngine {
    constructor(user, repo, path) {
        this._createCanvas()
        this._createStage()
        this.loadMap(user, repo, path)
    }

    _createCanvas() {
        this.canvas = document.getElementById('canvas')
        this.canvas.width = window.innerWidth - 16
        this.canvas.height = window.innerHeight - 16
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
        this.map = new Map(repo.length)
        // this._createObjects(repo)
    }

    _createObjects(repo) {
        repo.forEach(function(object) {
            // this.map.placeObjectRandomly(Factory.createGameObject(object))
        }, this)
    }

    _handleComplete(event) {
        console.log('handle complete')
        this._enableStage()
        this._addMapToStage()
    }

    _enableStage() {
        let tick = () => {
            console.log('tick')
            // this.map.translate()
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
                        this.map.setHorizontalSpeed(-1 * SPEED)
                        break
                    case KeyCode.KEY_UP:
                        this.map.setVerticalSpeed(-1 * SPEED)
                        break
                    case KeyCode.KEY_RIGHT:
                        this.map.setHorizontalSpeed(SPEED)
                        break
                    case KeyCode.KEY_DOWN:
                        this.map.setVerticalSpeed(SPEED)
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
