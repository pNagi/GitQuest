import {SIZE} from 'shared/game/configs'

import {Sprite} from 'shared/game/components'

export default class Pane {
    constructor(numberOfCols, numberOfRows, value) {
        this._numberOfCols = numberOfCols
        this._numberOfRows = numberOfRows

        this._pane = new createjs.Container()

        this._grid = new Array()
        for (let row = 0; row < this.numberOfRows; row++) {
            this._grid[row] = new Array()
            for (let col = 0; col < this.numberOfCols; col++) {
                if (!!value) {
                    this._grid[row][col] = new Sprite(value, col, row)
                    this._pane.addChild(this._grid[row][col].sprite)
                } else {
                    this._grid[row][col] = 0
                }
            }
        }
    }

    place(container, col = 0, row = 0) {
        container.sprite.x = col * SIZE
        container.sprite.y = row * SIZE
        this._pane.addChild(container.sprite)
    }

    get numberOfCols() {
        return this._numberOfCols
    }

    get numberOfRows() {
        return this._numberOfRows
    }

    get sprite() {
        return this._pane
    }
}
