import Factory from 'shared/game/factory'
import Player from 'shared/game/player'

import Promise from 'bluebird'
import _ from 'lodash'

export default class MapGenerator {

    constructor(cameraWidth, cameraHeight) {
        this.size = 16

        let SCALE = 1.2
        let width = cameraWidth * SCALE
        let height = cameraHeight * SCALE

        this._setCameraSize(cameraWidth, cameraHeight)
        this._setGridSize(width, height)

        this._createGrid(width, height)
        this._createSprite()
        this._createMovement()
    }

    _setCameraSize(cameraWidth, cameraHeight) {
        this.cameraWidth = cameraWidth
        this.cameraHeight = cameraHeight
    }

    _setGridSize(width, height) {
        this.numberOfCols = Math.ceil(width / this.size)
        this.numberOfRows = Math.ceil(height / this.size)
    }

    _createGrid() {
        this._grid = new Array()
        for (let row = 0; row < this.numberOfRows; row++) {
            this._grid[row] = new Array()
            for (let col = 0; col < this.numberOfCols; col++) {
                this._grid[row][col] = 0
            }
        }
    }

    _createSprite() {
        this._map = new createjs.Container()
        this._groundLayer = new createjs.Container()
        this._objectLayer = new createjs.Container()

        this._map.addChild(this._groundLayer)
        this._map.addChild(this._objectLayer)

        this._player = Player.getInstance().sprite
        this._objectLayer.addChild(this._player)

        this._createGround()
        this._setInitialPosition()
    }

    _createGround() {
        this.ground = Factory.createTileGameObject('ground', this.numberOfCols, this.numberOfRows)
        this._groundLayer.addChild(this.ground.sprite)
    }

    _setInitialPosition() {
        this._setMapInitialPosition()
        this._setPlayerInitialPosition()
    }

    _setMapInitialPosition() {
        this._map.x = (this.cameraWidth - this.width) / 2.0
        this._map.y = (this.cameraHeight - this.height) / 2.0
    }

    _setPlayerInitialPosition() {
        this._player.x = (this.width / 2) - 16
        this._player.y = (this.height / 2) - 16
    }

    _createMovement() {
        this.horizontalSpeed = 0
        this.verticalSpeed = 0
    }

    _printGrid() {
        console.log(this._grid.join('\n'))
    }

    get width() {
        return this.numberOfCols * this.size
    }

    get height() {
        return this.numberOfRows * this.size
    }

    get sprite() {
        return this._map
    }

    _isAvailable(col, row) {
        if (col > this.numberOfCols || col < 0)
            return false
        if (row > this.numberOfRows || row < 0)
            return false

        return (this._grid[row][col] === 0)
    }

    _checkAvailability(col, row, gameObject) {
        for (let objRow = 0; objRow < gameObject.numberOfRows; objRow++) {
            for (let objCol = 0; objCol < gameObject.numberOfCols; objCol++) {
                if (!this._isAvailable(objCol + col, objRow + row))
                    return false
            }
        }

        return true
    }

    _placeOnGrid(col, row, gameObject) {
        for (let objRow = 0; objRow < gameObject.numberOfRows; objRow++) {
            for (let objCol = 0; objCol < gameObject.numberOfCols; objCol++) {
                this._grid[objRow + row][objCol + col] = 1
            }
        }
    }

    _placeOnLayer(col, row, gameObjectSprite) {
        gameObjectSprite.x = col * this.size
        gameObjectSprite.y = row * this.size
        this._objectLayer.addChild(gameObjectSprite)
    }

    placeObject(col, row, gameObject) {
        this._placeOnGrid(col, row, gameObject)
        this._placeOnLayer(col, row, gameObject.sprite)

        this._printGrid()
        return true
    }

    placeObjectRandomly(gameObject) {

        let col = Math.floor(Math.random() * (this.numberOfCols - gameObject.numberOfCols))
        let row = Math.floor(Math.random() * (this.numberOfRows - gameObject.numberOfRows))

        while (!this._checkAvailability(col, row, gameObject)) {
            col = Math.floor(Math.random() * (this.numberOfCols - gameObject.numberOfCols))
            row = Math.floor(Math.random() * (this.numberOfRows - gameObject.numberOfRows))
        }

        this.placeObject(col, row, gameObject)

        return true
    }

    setHorizontalSpeed(speed) {
        this.horizontalSpeed = speed
        this.verticalSpeed = 0
    }

    setVerticalSpeed(speed) {
        this.verticalSpeed = speed
        this.horizontalSpeed = 0
    }

    _isOutOfBound(x, y) {
        //2 is player grid
        let playerCols = 2
        let playerRows = 2
        return (x < 0 || x >= (this.numberOfCols - playerCols) * this.size || y < 0 || y >= (this.numberOfRows - playerRows) * this.size)
    }

    _isObject(x, y) {
        let row = Math.ceil(y / this.size)
        let col = Math.ceil(x / this.size)

        return (this._grid[row][col] > 0)
    }

    //player position
    _isPassable(x, y) {
        if (this._isOutOfBound(x, y) || this._isObject(x, y)) {
            return false
        }

        return true
    }

    //player position
    _isInCameraReachZoneX(x) {
        return (x < this.cameraWidth / 2 || x > this.width - (this.cameraWidth / 2))
    }

    _isInCameraReachZoneY(y) {
        return (y < this.cameraHeight / 2 || y > this.height - (this.cameraHeight / 2))
    }

    _translatePlayer() {
        if (this._isPassable(this._player.x + this.horizontalSpeed, this._player.y + this.verticalSpeed)) {
            this._player.x += this.horizontalSpeed
            this._player.y += this.verticalSpeed
        } else {
            throw 'impassable'
        }
    }

    _translateMap() {
        if (!this._isInCameraReachZoneX(this._player.x + this.horizontalSpeed)) {
            this._map.x -= this.horizontalSpeed
        }

        if (!this._isInCameraReachZoneY(this._player.y + this.verticalSpeed)) {
            this._map.y -= this.verticalSpeed
        }
    }

    _sortObjects() {
        let sortByY = (obj1, obj2, options) => {
            if (obj1.y > obj2.y) {
                return 1;
            }
            if (obj1.y < obj2.y) {
                return -1;
            }
            return 0;
        }

        this._objectLayer.sortChildren(sortByY)
    }

    translate() {
        try {
            this._translatePlayer()
            this._translateMap()
        } catch (err) {}

        this._sortObjects()
    }
}
