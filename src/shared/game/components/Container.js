import {SIZE} from 'shared/game/configs'

import {Sprite} from 'shared/game/components'

export default class Container {
    constructor(grid) {
        this._numberOfCols = grid[0].length
        this._numberOfRows = grid.length

        this._container = new createjs.Container()

        this._grid = new Array()
        for (let row = 0; row < this.numberOfRows; row++) {
            this._grid[row] = new Array()
            for (let col = 0; col < this.numberOfCols; col++) {
                if (!!grid[row][col]) {
                    this._grid[row][col] = new Sprite(grid[row][col])
                    this._grid[row][col].setPosition(col, row)
                    this._container.addChild(this._grid[row][col].sprite)
                }
            }
        }
    }

    setAnimation(grid) {
        for (let row = 0; row < this.numberOfRows; row++) {
            for (let col = 0; col < this.numberOfCols; col++) {
                this._grid[row][col].setFrame(grid[row][col])
            }
        }
    }

    get x() {
        return this.sprite.x
    }

    get y() {
        return this.sprite.y
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
        return this._container
    }
}
