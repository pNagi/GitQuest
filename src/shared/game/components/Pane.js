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
                    this._grid[row][col] = new Sprite(value[0][0], col, row)
                    this._pane.addChild(this._grid[row][col].sprite)
                }
            }
        }
    }

    place(container, col = 0, row = 0) {
        if (this._checkAvailability(container, col, row)) {
            container.sprite.x = col * SIZE
            container.sprite.y = row * SIZE
            this._pane.addChild(container.sprite)
            this._placeOnGrid(container, col, row)
            console.log('place successfully')
        } else {
            console.log('place failed')
        }
    }

    _placeOnGrid(container, col, row) {
        for (let localRow = 0; localRow < container.numberOfRows; localRow++) {
            for (let localCol = 0; localCol < container.numberOfCols; localCol++) {
                this._grid[localRow + row][localCol + col] = container
            }
        }
    }

    placeRandomly(container) {
        let col = Math.floor(Math.random() * (this.numberOfCols - container.numberOfCols - 2) + 1)
        let row = Math.floor(Math.random() * (this.numberOfRows - container.numberOfRows - 2) + 1)

        let safety = 10
        while (!this._checkAvailability(container, col, row) || safety < 0) {
            col = Math.floor(Math.random() * (this.numberOfCols - container.numberOfCols - 2) + 1)
            row = Math.floor(Math.random() * (this.numberOfRows - container.numberOfRows - 2) + 1)
            safety--
        }

        if (safety < 0) {
            return false
        }

        this.place(container, col, row)
        return true
    }

    _checkAvailability(container, col, row) {
        for (let localRow = 0; localRow < container.numberOfRows; localRow++) {
            for (let localCol = 0; localCol < container.numberOfCols; localCol++) {
                if (!this._isAvailable(localCol + col, localRow + row)) {
                    return false
                }
            }
        }

        return true
    }

    _isAvailable(col, row) {
        if (col > this.numberOfCols || col < 0)
            return false
        if (row > this.numberOfRows || row < 0)
            return false

        return (!!!this._grid[row][col])
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
