import {Container, Pane} from 'shared/game/components'
import MapGenerator from 'shared/game/map/MapGenerator'

const EXPAND_SIZE = 4

const GROUND = 'GROUND'

export default class Map {

    constructor(repoSize) {
        this._numberOfCols = Math.ceil(repoSize * EXPAND_SIZE)
        this._numberOfRows = Math.ceil(repoSize * EXPAND_SIZE)

        this._map = new createjs.Container()

        this._groundLayer = new Pane(this.numberOfCols, this.numberOfRows, GROUND)
        this._grassLayer = new Container(MapGenerator.createGrass(this.numberOfCols, this.numberOfRows))

        this._groundLayer.place(this._grassLayer)

        this._objectLayer = new Pane(this.numberOfCols, this.numberOfRows)

        this._map.addChild(this._groundLayer.sprite)
        this._map.addChild(this._objectLayer.sprite)
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
}
