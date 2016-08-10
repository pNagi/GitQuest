import {
    DUNE_TOP_LEFT,
    DUNE_TOP,
    DUNE_TOP_RIGHT,
    DUNE_LEFT,
    DUNE_CENTER,
    DUNE_RIGHT,
    DUNE_BOTTOM_LEFT,
    DUNE_BOTTOM,
    DUNE_BOTTOM_RIGHT,
    DUNE_TOP_LEFT_INSIDE,
    DUNE_TOP_RIGHT_INSIDE,
    DUNE_BOTTOM_LEFT_INSIDE,
    DUNE_BOTTOM_RIGHT_INSIDE
} from 'shared/game/configs/Types'
import * as Config from 'shared/game/configs'

import {Sprite} from 'shared/game/components'

export default class Layer {
    constructor(grid) {
        console.log('create layer')
        this._numberOfCols = grid[0].length
        this._numberOfRows = grid.length

        this._container = new createjs.Container()

        let getGrid = (grid, col, row) => {
            if (col < 0 || col >= this._numberOfCols || row < 0 || row >= this._numberOfRows) {
                return 1
            }

            return grid[row][col]
        }

        this._grid = new Array()
        for (let row = 0; row < this.numberOfRows; row++) {
            this._grid[row] = new Array()
            for (let col = 0; col < this.numberOfCols; col++) {
                if (!!grid[row][col]) {
                    let neighbour = {
                        topLeft: getGrid(grid, col-1, row-1),
                        top: getGrid(grid, col, row-1),
                        topRight: getGrid(grid, col+1, row-1),
                        left: getGrid(grid, col-1, row),
                        right: getGrid(grid, col+1, row),
                        bottomLeft: getGrid(grid, col-1, row+1),
                        bottom: getGrid(grid, col, row+1),
                        bottomRight: getGrid(grid, col+1, row+1)
                    }
                    this._grid[row][col] = new Sprite(this.getType(neighbour))
                    this._grid[row][col].setPosition(col, row)
                    this._container.addChild(this._grid[row][col].sprite)
                }
            }
        }
    }

    getType(neighbour) {
        if (neighbour.top === 0 && neighbour.right === 0 && neighbour.left !== 0 && neighbour.bottom !== 0) {
            //top right
            return DUNE_TOP_RIGHT
        } else if (neighbour.top === 0 && neighbour.right !== 0 && neighbour.left === 0 && neighbour.bottom !== 0) {
            //top left
            return DUNE_TOP_LEFT
        } else if (neighbour.top === 0 && neighbour.right !== 0 && neighbour.left !== 0 && neighbour.bottom !== 0) {
            //top
            return DUNE_TOP
        } else if (neighbour.top !== 0 && neighbour.right !== 0 && neighbour.left === 0 && neighbour.bottom !== 0) {
            //left
            return DUNE_LEFT
        } else if (neighbour.top !== 0 && neighbour.right === 0 && neighbour.left !== 0 && neighbour.bottom !== 0) {
            //right
            return DUNE_RIGHT
        } else if (neighbour.top !== 0 && neighbour.right === 0 && neighbour.left !== 0 && neighbour.bottom === 0) {
            //bottom right
            return DUNE_BOTTOM_RIGHT
        } else if (neighbour.top !== 0 && neighbour.right !== 0 && neighbour.left === 0 && neighbour.bottom === 0) {
            //bottom left
            return DUNE_BOTTOM_LEFT
        } else if (neighbour.top !== 0 && neighbour.right !== 0 && neighbour.left !== 0 && neighbour.bottom === 0) {
            //bottom
            return DUNE_BOTTOM
        } else if (neighbour.topLeft === 0) {
            return DUNE_TOP_LEFT_INSIDE
        } else if (neighbour.topRight === 0) {
            return DUNE_TOP_RIGHT_INSIDE
        } else if (neighbour.bottomLeft === 0) {
            return DUNE_BOTTOM_LEFT_INSIDE
        } else if (neighbour.bottomRight === 0) {
            return DUNE_BOTTOM_RIGHT_INSIDE
        } else if (neighbour.top !== 0 && neighbour.right !== 0 && neighbour.left !== 0 && neighbour.bottom !== 0) {
            //center
            return DUNE_CENTER
        }
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
