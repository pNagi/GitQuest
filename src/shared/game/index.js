import * as KeyCode from 'shared/game/constants/keyCodes'
import * as API from 'shared/game/constants/API'

import InformationWindow from 'shared/game/components/InformationWindow'

import Player from 'shared/game/player/Player'
import Map from 'shared/game/map/Map'
import Camera from 'shared/game/camera/Camera'

exports.start = (user, repo, path = '') => {
    let gameEngine = new GameEngine(user, repo, path)
}

class GameEngine {
    constructor(user, repo, path) {
        this.user = user
        this.repo = repo
        this.path = path

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
        this.canvas.style.backgroundColor = '#333'
        this.canvas.width = this.camera.width
        this.canvas.height = this.camera.height

        this.informationWindow = new InformationWindow(this.camera.width, this.camera.height / 3)
        this.informationWindow.setPosition(0, this.camera.height * 2 / 3)
    }

    _createStage() {
        if (this.canvas === null)
            throw 'Canvas not found'
        this.stage = new createjs.Stage(this.canvas)
        this.stage.snapToPixelEnabled = true
    }

    _createPlayer(name) {
        this.player = new Player(name)
        console.log('player', this.player.width, this.player.height)
    }

    loadMap(user, repo, path) {
        this._clearStage()
        console.log('loadMap', user, repo, path)

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
        if (this.path !== '') {
            repo.push({
                name: 'Back',
                path: '/' + this.path.split('/').slice(0, -1).join('/'),
                type: 'dir'
            })
        }

        this.map = new Map(repo, this.player, this.camera)
        console.log('map', this.map.width, this.map.height)
    }

    _handleComplete(event) {
        this._enableStage()
        this._addMapToStage()
    }

    _enableStage() {
        let tick = () => {
            console.log('tick')
            let path = this.map.move()
            if (!!path) {
                this.path = path
                this.loadMap(this.user, this.repo, this.path)
            }
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
                        this.talk()
                        break
                    case KeyCode.SPACE:
                        this.talk()
                        break
                    case KeyCode.KEY_LEFT:
                        this.map.setHorizontalSpeed(-1 * SPEED)
                        this.player.turnLeft()
                        this.informationWindow.visible = false
                        break
                    case KeyCode.KEY_UP:
                        this.map.setVerticalSpeed(-1 * SPEED)
                        this.player.turnBack()
                        this.informationWindow.visible = false
                        break
                    case KeyCode.KEY_RIGHT:
                        this.map.setHorizontalSpeed(SPEED)
                        this.player.turnRight()
                        this.informationWindow.visible = false
                        break
                    case KeyCode.KEY_DOWN:
                        this.map.setVerticalSpeed(SPEED)
                        this.player.faceFront()
                        this.informationWindow.visible = false
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
        this.stage.addChild(this.informationWindow.sprite)

        this.stage.update()
    }

    talk() {
        let information = this.map.talk()
        if (!!information && !this.informationWindow.visible) {
            console.log('info', information)
            this.informationWindow.setText(information)
            this.informationWindow.visible = true
        } else {
            this.informationWindow.visible = false
        }
    }
}
