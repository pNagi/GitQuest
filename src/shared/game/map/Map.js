import {Container, Pane, Layer} from 'shared/game/components'
import MapGenerator from 'shared/game/map/MapGenerator'
import {GROUND} from 'shared/game/configs/Types'
import {GridCreator} from 'shared/game/utils'

const EXPAND_SIZE = 4

export default class Map {

    constructor(repo) {
        let repoSize = repo.length
        this._numberOfCols = Math.ceil(repoSize * EXPAND_SIZE)
        this._numberOfRows = Math.ceil(repoSize * EXPAND_SIZE)

        this._map = new createjs.Container()

        this._groundLayer = new Pane(this.numberOfCols, this.numberOfRows, GROUND)

        let generateMap = MapGenerator.generate(this.numberOfCols, this.numberOfRows)
        console.log(generateMap.join('\n'))
        this._test = new Layer(generateMap)

        this._groundLayer.place(this._test)

        this._objectLayer = new Pane(this.numberOfCols, this.numberOfRows)

        // repo.forEach(function(object) {
        //     if (object.type === 'dir') {
        //
        //     }
        // }, this)

        this._map.addChild(this._groundLayer.sprite)
        this._map.addChild(this._objectLayer.sprite)

        this._horizontalSpeed = 0
        this._verticalSpeed = 0
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

    translate(horizontalSpeed, verticalSpeed) {
        this._map.x -= horizontalSpeed
        this._map.y -= verticalSpeed
    }
}
