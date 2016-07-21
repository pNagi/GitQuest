import Player from 'shared/game/player'
import * as KeyCode from 'shared/game/constants/keyCodes'
import * as API from 'shared/game/constants/API'

import Factory from 'shared/game/factory'
import MapGenerator from 'shared/game/map'

exports.start = (user, repo, path = '') => {
    let gameEngine = new GameEngine()
    gameEngine.loadMap(user, repo, path)
}

class GameEngine {
    constructor() {
        this._createCanvas()
        this._createStage()
        this._createMap()
    }

    _createCanvas() {
        this.canvas = document.getElementById('canvas')
        this.canvas.width = window.innerWidth - 16
        this.canvas.height = window.innerHeight * 4 / 5 - 16
    }

    _createStage() {
        if (this.canvas === null)
            throw 'Canvas not found'
        this.stage = new createjs.Stage(this.canvas)
        this.stage.snapToPixelEnabled = true
    }

    _createMap() {
        this.map = new MapGenerator(this.canvas.width, this.canvas.height)
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

    _addMapToStage() {
        this.stage.addChild(this.map.sprite)
        this.stage.update()
    }

    _enableStage() {
        let tick = () => {
            this.map.translate()
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
                        Player.getInstance().walkLeft()
                        this.map.setHorizontalSpeed(-1 * SPEED)
                        break
                    case KeyCode.KEY_UP:
                        Player.getInstance().walkUp()
                        this.map.setVerticalSpeed(-1 * SPEED)
                        break
                    case KeyCode.KEY_RIGHT:
                        Player.getInstance().walkRight()
                        this.map.setHorizontalSpeed(SPEED)
                        break
                    case KeyCode.KEY_DOWN:
                        Player.getInstance().walkDown()
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

    _createObjects(repo) {
        repo.forEach(function(entry) {
            this.map.placeObjectRandomly(Factory.createGameObject(entry))
        }, this)
    }

    _handleComplete(event) {
        console.log('handle complete')
        this._enableStage()
        this._addMapToStage()
    }

    _handleFileLoad(event) {
        console.log('handle file load')
        this._createObjects(event.result)
    }
}
