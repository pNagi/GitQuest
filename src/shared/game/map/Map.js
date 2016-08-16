import {Container, Layer, File, Directory, SmallTree, MediumTree} from 'shared/game/components'

import {GridCreator} from 'shared/game/utils/'
import MapGenerator from 'shared/game/map/MapGenerator'
import PathGenerator from 'shared/game/map/PathGenerator'

import {GROUND, GRASS} from 'shared/game/configs/Types'
import {SIZE} from 'shared/game/configs'

const EXPAND_SIZE = 6

export default class Map {

    constructor(repo, player, camera) {

        let repoSize = repo.length

        this._numberOfCols = Math.ceil(repoSize * EXPAND_SIZE)
        this._numberOfRows = Math.ceil(repoSize * EXPAND_SIZE)

        this._map = new createjs.Container()

        this._setPlayer(player)
        this._createObjects(repo)

        this._path = new PathGenerator(this._player, this._objects, this.numberOfCols, this.numberOfRows)
        this._objectLayer = this._path.getLayer()

        this._createGroundLayer()
        this._createEnvironment()

        this._map.addChild(this._groundLayer.sprite)
        this._map.addChild(this._environmentLayer.sprite)
        this._map.addChild(this._objectLayer.sprite)

        this._setInitialPosition(camera)
        this._horizontalSpeed = 0
        this._verticalSpeed = 0
    }

    _setPlayer(player) {
        this._player = player
    }

    _createObjects(repo) {
        this._objects = new Array()
        this._createFilesAndDirectories(repo)
    }

    _createFilesAndDirectories(repo) {
        repo.forEach(function(object) {
            if (object.type === 'dir') {
                this._objects.push(new Directory(object.name))
            } else if (object.type === 'file') {
                let type = object.name.split('.').pop()
                this._objects.push(new File(object.name, type))
            }
        }, this)
    }

    _createEnvironment() {
        this._createTrees(this.numberOfCols * this.numberOfRows)
    }

    _createTrees(max) {
        for (let count = 0; count < max; count++) {
            if (Math.random() >= 0.9) {
                this._objectLayer.placeRandomly(new MediumTree(), false)
                this._objectLayer.placeRandomly(new SmallTree(), false)
            } else {
                this._objectLayer.placeRandomly(new MediumTree(), false)
            }
        }

        this._objectLayer.fillEmpty(GRASS)
    }

    _createGroundLayer() {
        this._groundLayer = new Layer(GridCreator.makeGrid(this.numberOfCols, this.numberOfRows, GROUND))

        this._environmentLayer = new Layer(GridCreator.makeGrid(this.numberOfCols, this.numberOfRows))

        let level2 = MapGenerator.generate(this.numberOfCols, this.numberOfRows)
        this._environmentLayer.place(new Layer(GridCreator.makeDune(level2, this._path.grid, this._objects)))

        let level1 = MapGenerator.generate(this.numberOfCols, this.numberOfRows, level2, 1)
        this._environmentLayer.place(new Layer(GridCreator.makeDune(level1, this._path.grid, this._objects)))

        this._path.addSprites(this._environmentLayer.getLayout())
    }

    _setInitialPosition(camera) {
        this._camera = camera
        this._map.x = (this._camera.width - this.width) / 2
        this._map.y = (this._camera.height - this.height) / 2
        this._moveCamera()
        this._setVisibleArea()
    }

    set x(x) {
        this._map.x = x
    }

    set y(y) {
        this._map.y = y
    }

    get width() {
        return this._numberOfCols * SIZE
    }

    get height() {
        return this._numberOfRows * SIZE
    }

    get numberOfCols() {
        return this._numberOfCols
    }

    get numberOfRows() {
        return this._numberOfRows
    }

    get sprite() {
        return this._map
    }

    setHorizontalSpeed(speed) {
        this._horizontalSpeed = speed
    }

    setVerticalSpeed(speed) {
        this._verticalSpeed = speed
    }

    move() {
        this._moveHorizontally()
        this._moveVertically()

        if (this._horizontalSpeed !== 0 || this._verticalSpeed !== 0) {
            this._setVisibleArea()
            this._sortObjects()
        }
    }

    _moveHorizontally() {
        for (let i = 0; i < Math.abs(this._horizontalSpeed); i++) {
            let speed = (this._horizontalSpeed > 0) ? 1 : -1

            if (this._isPassable(this._player.x + speed, this._player.y)) {
                this._player.move(speed, 0)
                if (!this._isInCameraReachZoneX(this._player.x)) {
                    if (this._isInCenterOfCameraX(this._player.x)) {
                        this._map.x -= speed
                        this._moveCamera()
                    }
                }
            }
        }
    }

    _moveVertically() {
        for (let i = 0; i < Math.abs(this._verticalSpeed); i++) {
            let speed = (this._verticalSpeed > 0) ? 1 : -1

            if (this._isPassable(this._player.x, this._player.y + speed)) {
                this._player.move(0, speed)
                if (!this._isInCameraReachZoneY(this._player.y)) {
                    if (this._isInCenterOfCameraY(this._player.y)) {
                        this._map.y -= speed
                        this._moveCamera()
                    }
                }
            }
        }
    }

    _moveCamera() {
        this._camera.x = this._map.x * -1
        this._camera.y = this._map.y * -1
    }

    _isPassable(x, y) {
        return !(this._isOutOfBound(x, y) || this._isImpassableObject(x, y))
    }

    _isOutOfBound(x, y) {
        return (x < 0 || x >= this.width - this._player.width || y < 0 || y >= this.height - this._player.height)
    }

    _isImpassableObject(x, y) {
        let row = Math.ceil((y + 8) / SIZE)
        let col = Math.ceil(x / SIZE)

        let passable = this._objectLayer.isPassable(col, row) && this._groundLayer.isPassable(col, row) && this._environmentLayer.isPassable(col, row)

        return !passable
    }

    _isInCameraReachZoneX(x) {
        return (x < (this._camera.width - this._player.width) / 2 || x > this.width - (this._camera.width + this._player.width) / 2)
    }

    _isInCameraReachZoneY(y) {
        return (y < (this._camera.height - this._player.height) / 2 || y > this.height - (this._camera.height + this._player.height) / 2)
    }

    _isInCenterOfCameraX(x) {
        return x !== this._camera.x + ((this._camera.width - this._player.width) / 2)
    }

    _isInCenterOfCameraY(y) {
        return y !== this._camera.y + ((this._camera.height - this._player.height) / 2)
    }

    _sortObjects() {
        let sortByY = (obj1, obj2, options) => {
            if (obj1.y + obj1.height > obj2.y + obj2.height) {
                return 1;
            }
            if (obj1.y + obj1.height < obj2.y + obj2.height) {
                return -1;
            }
            return 0;
        }

        this._objectLayer.sprite.sortChildren(sortByY)
    }

    _setVisibleArea() {
        let startCol = Math.floor(this._camera.x / SIZE)
        let startRow = Math.floor(this._camera.y / SIZE)
        let endCol = Math.ceil((this._camera.x + this._camera.width) / SIZE)
        let endRow = Math.ceil((this._camera.y + this._camera.height) / SIZE)

        this._groundLayer.setVisible(startCol, startRow, endCol, endRow)
        this._environmentLayer.setVisible(startCol, startRow, endCol, endRow)
        this._objectLayer.setVisible(startCol, startRow, endCol, endRow)
    }

    talk() {

    }
}
