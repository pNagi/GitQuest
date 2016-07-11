import TileGameObject from 'shared/game/components/TileGameObject'

export default class MapGenerator {

    constructor(width, height, cameraWidth, cameraHeight) {
        this.size = 16
        this.numberOfCols = Math.ceil(width / this.size)
        this.numberOfRows = Math.ceil(height / this.size)

        this.cameraWidth = cameraWidth
        this.cameraHeight = cameraHeight

        this._createGrid()
        this._createSprite()
        this._setInitialPosition()
        this._createMovement()
    }

    _createGrid() {
        this._grid = new Array()
        for (var row = 0; row < this.numberOfRows; row++) {
            this._grid[row] = new Array()
            for (var col = 0; col < this.numberOfCols; col++) {
                this._grid[row][col] = new Array()
            }
        }
    }

    _createSprite() {
        this._map = new createjs.Container()
        this._ground = new createjs.Container()
        this._objects = new createjs.Container()

        this._map.addChild(this._ground)
        this._map.addChild(this._objects)
    }

    _setInitialPosition() {
        this._map.x = (this.cameraWidth - (this.numberOfCols * this.size)) / 2
        this._map.y = (this.cameraHeight - (this.numberOfRows * this.size)) / 2
    }

    _createMovement() {
        this.horizontalSpeed = 0
        this.verticalSpeed = 0
    }

    set ground(ground) {
        console.log(ground)
        this._ground.addChild(ground.sprite)
    }

    placePlayer(player) {
        this._player = player.sprite

        var col = Math.floor(this.numberOfCols / 2)
        var row = Math.floor(this.numberOfRows / 2)

        this._placeOnContainer(col, row, this._player)
    }

    placeObject(col, row, gameObject) {
        if (col == Math.floor(this.numberOfCols / 2) && row == Math.floor(this.numberOfRows / 2)) {
            return false
        }

        try {
            this._placeOnGrid(col, row, gameObject.grid)
            this._placeOnContainer(col, row, gameObject.sprite)
        } catch (err) {
            console.log(err)
            return false
        }

        return true
    }

    placeObjectRandomly(gameObject) {

        var col = Math.floor((Math.random() * (this.numberOfCols - gameObject.width))),
            row = Math.floor((Math.random() * (this.numberOfRows - gameObject.height)))

        if (!this.placeObject(col, row, gameObject)) {
            this.placeObjectRandomly(gameObject)
        }

        return true
    }

    _placeOnGrid(col, row, gameObjectGrid) {
        for (var objRow = 0; objRow < gameObjectGrid.length; objRow++) {
            for (var objCol = 0; objCol < gameObjectGrid[0].length; objCol++) {
                if (this._grid[objRow + row][objCol + col].length > 0)
                    throw 'Overlap'
                if (gameObjectGrid[objRow][objCol] != null)
                    this._grid[objRow + row][objCol + col] = gameObjectGrid[objRow][objCol]
            }
        }
    }

    _placeOnContainer(col, row, gameObjectSprite) {
        gameObjectSprite.x = col * this.size
        gameObjectSprite.y = row * this.size
        this._objects.addChild(gameObjectSprite)
    }

    get sprite() {
        return this._map
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
        return (x < 0 || x >= (this.numberOfCols - 2) * this.size || y < 0 || y >= (this.numberOfRows - 2) * this.size)
    }

    _isPassable(x, y) {
        if (this._isOutOfBound(x, y)) {
            return false
        }

        if (this._grid[Math.ceil(y / this.size)][Math.ceil(x / this.size)].length > 0) {
            return false
        }

        return true
    }

    _isOutOfCamera(x, y) {
        return (x > 0 || x < this.cameraWidth - (this.numberOfCols * this.size) || y > 0 || y < this.cameraHeight - (this.numberOfRows * this.size))
    }

    translate() {
        try {
            this._translatePlayer()
            this._translateMap()
        } catch (err) {}
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
        if (!this._isOutOfCamera(this._map.x - this.horizontalSpeed, this._map.y - this.verticalSpeed)) {
            this._map.x -= this.horizontalSpeed
            this._map.y -= this.verticalSpeed
        }

        console.log(this._map.x, this._map.y)
    }
}
