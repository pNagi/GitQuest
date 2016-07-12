// import Player from 'shared/game/player'
// import * as PlayerMovement from 'shared/game/player/movement'
import * as KeyCode from 'shared/game/constants/keyCodes'
import * as API from 'shared/game/constants/API'

// import Promise from 'bluebird'
import Factory from 'shared/game/factory'
import MapGenerator from 'shared/game/map'

exports.start = (user, repo, path = '') => {
    var gameEngine = new GameEngine()
    gameEngine.loadMap(user, repo, path)
}

class GameEngine {
    constructor() {
        this._createCanvas()
        this._createStage()
        this._createFactory()
        this._createMap()
        this._createPlayer()
    }

    _createCanvas() {
        this.canvas = document.getElementById('canvas')
        this.canvas.width = window.innerWidth - 16
        this.canvas.height = window.innerHeight * 4 / 5 - 16
    }

    _createStage() {
        if (this.canvas == null)
            throw 'Canvas not found'
        this.stage = new createjs.Stage(this.canvas)
        this.stage.snapToPixelEnabled = true
    }

    _createFactory() {
        this.factory = new Factory()
    }

    _createMap() {
        //bad code
        var SCALE = 1
        this.map = new MapGenerator(this.canvas.width * SCALE, this.canvas.height * SCALE, this.canvas.width, this.canvas.height)
        this.map.ground = this.factory.createTileGameObject('ground', this.canvas.width * SCALE / 16, this.canvas.height * SCALE / 16)
    }

    _createPlayer() {
        this.player = this.factory.createPlayer()
        this.map.placePlayer(this.player)
    }

    loadMap(user, repo, path) {
        this._clearStage()

        var queue = new createjs.LoadQueue()
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
        var tick = () => {
            this.map.translate()
            return this.stage.update()
        }

        createjs.Ticker.addEventListener('tick', tick)
        createjs.Ticker.useRAF = true
        createjs.Ticker.setFPS(60)

        var SPEED = 3

        var currentPressed = ''

        document.onkeydown = (e) => {

            if (currentPressed == '') {
                currentPressed = e.keyCode

                switch (e.keyCode) {
                    case KeyCode.ENTER:
                        break
                    case KeyCode.SPACE:
                        break
                    case KeyCode.KEY_LEFT:
                        this.player.walkLeft()
                        this.map.setHorizontalSpeed(-1 * SPEED)
                        break
                    case KeyCode.KEY_UP:
                        this.player.walkUp()
                        this.map.setVerticalSpeed(-1 * SPEED)
                        break
                    case KeyCode.KEY_RIGHT:
                        this.player.walkRight()
                        this.map.setHorizontalSpeed(SPEED)
                        break
                    case KeyCode.KEY_DOWN:
                        this.player.walkDown()
                        this.map.setVerticalSpeed(SPEED)
                        break
                }
            }
        }

        document.onkeyup = (e) => {
            if (e.keyCode == currentPressed) {
                currentPressed = ''
                this.map.setHorizontalSpeed(0)
                this.map.setVerticalSpeed(0)
            }
        }
    }

    _createObjects(repo) {
        repo.forEach(function(entry) {
            this.map.placeObjectRandomly(this.factory.createGameObject(entry))
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
