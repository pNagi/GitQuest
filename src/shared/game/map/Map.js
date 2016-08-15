import {Container, Layer, File, Directory} from 'shared/game/components'

import {GridCreator} from 'shared/game/utils/'
import MapGenerator from 'shared/game/map/MapGenerator'
import PathGenerator from 'shared/game/map/PathGenerator'

import {GROUND} from 'shared/game/configs/Types'
import {SIZE} from 'shared/game/configs'

const EXPAND_SIZE = 6

export default class Map {

    constructor(repo, player, camera) {

        let repoSize = repo.length

        this._numberOfCols = Math.ceil(repoSize * EXPAND_SIZE)
        this._numberOfRows = Math.ceil(repoSize * EXPAND_SIZE)

        console.log('map', this._numberOfCols, this._numberOfRows)

        this._map = new createjs.Container()

        this._objects = new Array()

        this._player = player
        this._createObjects(repo)
        this._path = new PathGenerator(this._player, this._objects, this.numberOfCols, this.numberOfRows)
        this._objectLayer = this._path.getLayer()

        this._groundLayer = new Array()
        this._groundLayer[0] = new Layer(GridCreator.makeGrid(this.numberOfCols, this.numberOfRows, GROUND))

        console.log('dune level1')
        let level1 = MapGenerator.generate(this.numberOfCols, this.numberOfRows)
        this._groundLayer[1] = new Layer(GridCreator.makeDune(level1, this._path.grid, this._objects))

        console.log('dune level2')
        let level2 = MapGenerator.generate(this.numberOfCols, this.numberOfRows, level1, 1)
        this._groundLayer[2] = new Layer(GridCreator.makeDune(level2, this._path.grid, this._objects))

        this._map.addChild(this._groundLayer[0].sprite)
        this._map.addChild(this._groundLayer[2].sprite)
        this._map.addChild(this._groundLayer[1].sprite)
        this._map.addChild(this._objectLayer.sprite)

        this._setInitialPosition(camera)
        this._horizontalSpeed = 0
        this._verticalSpeed = 0
    }

    _createObjects(repo) {
        repo.forEach(function(object) {
            if (object.type === 'dir') {
                // this._objectLayer.placeRandomly(new Directory(object.name))
                this._objects.push(new Directory(object.name))
            } else if (object.type === 'file') {
                let type = object.name.split('.').pop()
                // this._objectLayer.placeRandomly(new File(object.name, type))
                this._objects.push(new File(object.name, type))
            }
        }, this)
    }

    _setInitialPosition(camera) {
        this._camera = camera
        this._map.x = (this._camera.width - this.width) / 2
        this._map.y = (this._camera.height - this.height) / 2
        this.setCamera()
        this._setVisible()
    }

    setCamera() {
        this._camera.x = this._map.x * -1
        this._camera.y = this._map.y * -1
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

    translate() {
        for (let i = 0; i < Math.abs(this._horizontalSpeed); i++) {
            let speed = (this._horizontalSpeed > 0) ? 1 : -1

            if (this._isPassable(this._player.x + speed, this._player.y)) {
                this._player.translate(speed, 0)
                if (!this._isInCameraReachZoneX(this._player.x)) {
                    if (this._isInCenterOfCameraX(this._player.x)) {
                        this._map.x -= speed
                        this.setCamera()
                    }
                }
            }
        }

        for (let i = 0; i < Math.abs(this._verticalSpeed); i++) {
            let speed = (this._verticalSpeed > 0) ? 1 : -1

            if (this._isPassable(this._player.x, this._player.y + speed)) {
                this._player.translate(0, speed)
                if (!this._isInCameraReachZoneY(this._player.y)) {
                    if (this._isInCenterOfCameraY(this._player.y)) {
                        this._map.y -= speed
                        this.setCamera()
                    }
                }
            }
        }

        this._setVisible()
        this._sortObjects()
    }

    _isPassable(x, y) {
        return !(this._isOutOfBound(x, y) || this._isImpassableObject(x, y))
    }

    _isOutOfBound(x, y) {
        return (x < 0 || x >= this.width - this._player.width || y < 0 || y >= this.height - this._player.height)
    }

    //check player block too! 4 directions
    _isImpassableObject(x, y) {
        let row = Math.ceil(y / SIZE)
        let col = Math.ceil(x / SIZE)

        return !(this._objectLayer.isPassable(col, row) && (this._groundLayer[1].isPassable(col, row)))
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
            if (obj1.y > obj2.y) {
                return 1;
            }
            if (obj1.y < obj2.y) {
                return -1;
            }
            return 0;
        }

        this._objectLayer.sprite.sortChildren(sortByY)
    }

    _setVisible() {
        let startCol = Math.floor(this._camera.x / SIZE)
        let startRow = Math.floor(this._camera.y / SIZE)
        let endCol = Math.ceil((this._camera.x + this._camera.width) / SIZE)
        let endRow = Math.ceil((this._camera.y + this._camera.height) / SIZE)

        for (let index = 0; index < this._groundLayer.length; index++) {
            this._groundLayer[index].setVisible(startCol, startRow, endCol, endRow)
        }
        this._objectLayer.setVisible(startCol, startRow, endCol, endRow)
    }
}
