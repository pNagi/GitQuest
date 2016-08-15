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
    DUNE_BOTTOM_RIGHT_INSIDE,
    STAIR_TOP,
    STAIR_LEFT,
    STAIR_RIGHT,
    STAIR_BOTTOM
} from 'shared/game/configs/Types'

export default class GridCreator {
    static makeGrid(numberOfCols, numberOfRows, value = null) {
        let grid = new Array()
        for (let row = 0; row < numberOfRows; row++) {
            grid[row] = new Array()
            for (let col = 0; col < numberOfCols; col++) {
                grid[row][col] = value
            }
        }

        return grid
    }

    static makeDune(grid, exception, objects) {
        let numberOfCols = grid[0].length
        let numberOfRows = grid.length

        grid = this.getRidOfOverlapping(grid, objects)

        let getValue = (grid, col, row) => {
            if (col < 0 || col >= numberOfCols || row < 0 || row >= numberOfRows) {
                return 1
            }

            return grid[row][col]
        }

        let newGrid = new Array()
        for (let row = 0; row < numberOfRows; row++) {
            newGrid[row] = new Array()
            for (let col = 0; col < numberOfCols; col++) {
                if (!!grid[row][col]) {
                    let neighbour = {
                        topLeft: getValue(grid, col-1, row-1),
                        top: getValue(grid, col, row-1),
                        topRight: getValue(grid, col+1, row-1),
                        left: getValue(grid, col-1, row),
                        right: getValue(grid, col+1, row),
                        bottomLeft: getValue(grid, col-1, row+1),
                        bottom: getValue(grid, col, row+1),
                        bottomRight: getValue(grid, col+1, row+1)
                    }

                    if (exception[row][col] > 0) {
                        newGrid[row][col] = this.getStairType(neighbour)
                    } else {
                        newGrid[row][col] = this.getDuneType(neighbour)
                    }
                }
            }
        }

        return newGrid
    }

    static getRidOfOverlapping(grid, objects) {

        for (let index = 0 ; index < objects.length ; index++) {
            let object = objects[index]
            let min = 99
            for (let row = object.row - 1; row < object.numberOfRows + object.row + 1; row++) {
                for (let col = object.col - 1; col < object.numberOfCols + object.col + 1; col++) {
                    if (grid[row][col] < min) {
                        min = grid[row][col]
                    }
                }
            }

            for (let row = object.row - 1; row < object.numberOfRows + object.row + 1; row++) {
                for (let col = object.col - 1; col < object.numberOfCols + object.col + 1; col++) {
                    grid[row][col] = min
                }
            }
        }

        return grid
    }

    static getStairType(neighbour) {
        if (neighbour.top === 0 && neighbour.right === 0 && neighbour.left !== 0 && neighbour.bottom !== 0) {
            return DUNE_TOP_RIGHT
        } else if (neighbour.top === 0 && neighbour.right !== 0 && neighbour.left === 0 && neighbour.bottom !== 0) {
            return DUNE_TOP_LEFT
        } else if (neighbour.top === 0 && neighbour.right !== 0 && neighbour.left !== 0 && neighbour.bottom !== 0) {
            return STAIR_TOP
        } else if (neighbour.top !== 0 && neighbour.right !== 0 && neighbour.left === 0 && neighbour.bottom !== 0) {
            return STAIR_LEFT
        } else if (neighbour.top !== 0 && neighbour.right === 0 && neighbour.left !== 0 && neighbour.bottom !== 0) {
            return STAIR_RIGHT
        } else if (neighbour.top !== 0 && neighbour.right === 0 && neighbour.left !== 0 && neighbour.bottom === 0) {
            return DUNE_BOTTOM_RIGHT
        } else if (neighbour.top !== 0 && neighbour.right !== 0 && neighbour.left === 0 && neighbour.bottom === 0) {
            return DUNE_BOTTOM_LEFT
        } else if (neighbour.top !== 0 && neighbour.right !== 0 && neighbour.left !== 0 && neighbour.bottom === 0) {
            return STAIR_BOTTOM
        } else if (neighbour.topLeft === 0 && neighbour.top !== 0 && neighbour.left !== 0) {
            return DUNE_TOP_LEFT_INSIDE
        } else if (neighbour.topRight === 0 && neighbour.top !== 0 && neighbour.right !== 0) {
            return DUNE_TOP_RIGHT_INSIDE
        } else if (neighbour.bottomLeft === 0 && neighbour.bottom !== 0 && neighbour.left !== 0) {
            return DUNE_BOTTOM_LEFT_INSIDE
        } else if (neighbour.bottomRight === 0 && neighbour.bottom !== 0 && neighbour.right !== 0) {
            return DUNE_BOTTOM_RIGHT_INSIDE
        }

        return undefined
    }

    static getDuneType(neighbour) {
        if (neighbour.top === 0 && neighbour.right === 0 && neighbour.left !== 0 && neighbour.bottom !== 0) {
            return DUNE_TOP_RIGHT
        } else if (neighbour.top === 0 && neighbour.right !== 0 && neighbour.left === 0 && neighbour.bottom !== 0) {
            return DUNE_TOP_LEFT
        } else if (neighbour.top === 0 && neighbour.right !== 0 && neighbour.left !== 0 && neighbour.bottom !== 0) {
            return DUNE_TOP
        } else if (neighbour.top !== 0 && neighbour.right !== 0 && neighbour.left === 0 && neighbour.bottom !== 0) {
            return DUNE_LEFT
        } else if (neighbour.top !== 0 && neighbour.right === 0 && neighbour.left !== 0 && neighbour.bottom !== 0) {
            return DUNE_RIGHT
        } else if (neighbour.top !== 0 && neighbour.right === 0 && neighbour.left !== 0 && neighbour.bottom === 0) {
            return DUNE_BOTTOM_RIGHT
        } else if (neighbour.top !== 0 && neighbour.right !== 0 && neighbour.left === 0 && neighbour.bottom === 0) {
            return DUNE_BOTTOM_LEFT
        } else if (neighbour.top !== 0 && neighbour.right !== 0 && neighbour.left !== 0 && neighbour.bottom === 0) {
            return DUNE_BOTTOM
        } else if (neighbour.topLeft === 0 && neighbour.top !== 0 && neighbour.left !== 0) {
            return DUNE_TOP_LEFT_INSIDE
        } else if (neighbour.topRight === 0 && neighbour.top !== 0 && neighbour.right !== 0) {
            return DUNE_TOP_RIGHT_INSIDE
        } else if (neighbour.bottomLeft === 0 && neighbour.bottom !== 0 && neighbour.left !== 0) {
            return DUNE_BOTTOM_LEFT_INSIDE
        } else if (neighbour.bottomRight === 0 && neighbour.bottom !== 0 && neighbour.right !== 0) {
            return DUNE_BOTTOM_RIGHT_INSIDE
        }

        return undefined
    }
}
