import Container from 'shared/game/components/Container'
import {Sprite} from 'shared/game/components'

export default class Layer extends Container {
    constructor(grid) {
        super(grid)
    }

    place(container, col = 0, row = 0, onGrid = true) {
        if (this.checkAvailability(container, col, row)) {
            container.setPosition(col, row)
            this._container.addChild(container.sprite)
            if (onGrid) {
                this._placeOnGrid(container, col, row)
            }
            return true
            // console.log('place successfully')
        } else {
            return false
            // console.log('place failed')
        }
    }

    _placeOnGrid(container, col, row) {
        for (let localRow = 0; localRow < container.numberOfRows; localRow++) {
            for (let localCol = 0; localCol < container.numberOfCols; localCol++) {
                if (!!container.getSpriteAt(localCol, localRow)) {
                    this._grid[localRow + row][localCol + col] = container.getSpriteAt(localCol, localRow)
                }
            }
        }
    }

    placeRandomly(container, redo = true) {
        let safety = 5000

        let col = Math.floor(Math.random() * (this.numberOfCols - container.numberOfCols - 2) + 1)
        let row = Math.floor(Math.random() * (this.numberOfRows - container.numberOfRows - 2) + 1)

        while (redo && !this.checkAvailability(container, col, row) || safety < 0) {
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

    fillEmpty(type) {
        for (let row = 0; row < this.numberOfRows; row++) {
            for (let col = 0; col < this.numberOfCols; col++) {
                if (!!!this._grid[row][col]) {
                    this._grid[row][col] = new Sprite(this, type, col, row)
                    this._container.addChild(this._grid[row][col].sprite)
                }
            }
        }
    }

    checkAvailability(container, col, row) {
        for (let localRow = 0; localRow < container.numberOfRows; localRow++) {
            for (let localCol = 0; localCol < container.numberOfCols; localCol++) {
                if (!!container.getSpriteAt(localCol, localRow) && !this._isAvailable(localCol + col, localRow + row)) {
                    return false
                }
            }
        }

        return true
    }

    _isAvailable(col, row) {
        return this.isOutOfBound(col, row) ? false : !!!this._grid[row][col]
    }

    isPassable(col, row) {
        return this.isOutOfBound(col, row) ? false : (!!this._grid[row][col] ? this._grid[row][col].isPassable() : true)
    }

    setVisible(startCol, startRow, endCol, endRow) {
        for (let row = 0; row < this.numberOfRows; row++) {
            for (let col = 0; col < this.numberOfCols; col++) {
                if (!!this._grid[row][col]) {
                    this._grid[row][col].visible = (row >= startRow && row <= endRow && col >= startCol && col <= endCol)
                }
            }
        }
    }

    getLayout() {
        let grid = new Array()
        for (let row = 0; row < this.numberOfRows; row++) {
            grid[row] = new Array()
            for (let col = 0; col < this.numberOfCols; col++) {
                grid[row][col] = !!this._grid[row][col] ? 1 : 0
            }
        }

        return grid
    }
}
