// const RANDOM_FILL_PERCENT = 50
const RANDOM_FILL_PERCENT = 40

const NONE = 0
const FILL = 1

export default class MapGenerator {

    static generate(numberOfCols, numberOfRows, exception, exceptionValue) {
        this.numberOfCols = numberOfCols
        this.numberOfRows = numberOfRows

        if (!!exception) {
            this.exceptionValue = exceptionValue
            this.setException(exception)
        }

        this.randomFill()

        for (let i = 0; i < 5; i++) {
            this.smoothMap()
        }

        return this.grid
    }

    static setException(exception) {

        let exceptionWithBorder = new Array()
        for (let row = 0; row < this.numberOfRows; row += 3) {
            exceptionWithBorder[row] = new Array()
            exceptionWithBorder[row + 1] = new Array()
            exceptionWithBorder[row + 2] = new Array()
            for (let col = 0; col < this.numberOfCols; col += 3) {
                //count
                for (let neighbourCol = col - 3; neighbourCol <= col + 3; neighbourCol += 3) {
                    for (let neighbourRow = row - 3; neighbourRow <= row + 3; neighbourRow += 3) {
                        for (let drow = 0; drow < 3 ; drow++) {
                            for (let dcol = 0; dcol < 3; dcol++) {
                                if (!this.isOutOfBound(neighbourCol, neighbourRow)) {
                                    if (exception[neighbourRow][neighbourCol] === 1) {
                                        exceptionWithBorder[row + drow][col + dcol] = FILL
                                    } else if (!!!exceptionWithBorder[row + drow][col + dcol]) {
                                        exceptionWithBorder[row + drow][col + dcol] = exception[row + drow][col + dcol]
                                    }
                                } else {
                                    exceptionWithBorder[row + drow][col + dcol] = FILL
                                }
                            }
                        }
                    }
                }
            }
        }

        this.exception = exceptionWithBorder
    }

    static isOutOfBound(col, row) {
        return col < 0 || col >= this.numberOfCols || row < 0 || row >= this.numberOfRows
    }

    static isInvalid(col, row) {
        return this.isOutOfBound(col, row) || (!!this.exception && this.exception[row] && this.exception[row][col] === this.exceptionValue)
    }

    static setGrid(col, row, value) {
        for (let drow = 0; drow < 3 ; drow++) {
            for (let dcol = 0; dcol < 3; dcol++) {
                this.grid[row + drow][col + dcol] = value
            }
        }
    }

    static randomFill() {
        this.grid = new Array()
        for (let row = 0; row < this.numberOfRows; row += 3) {
            this.grid[row] = new Array()
            this.grid[row + 1] = new Array()
            this.grid[row + 2] = new Array()
            for (let col = 0; col < this.numberOfCols; col += 3) {
                if (this.isInvalid(col, row)) {
                    this.setGrid(col, row, FILL)
                } else {
                    this.setGrid(col, row, this.randomByPercent() ? FILL : NONE)
                }
            }
        }
    }

    static randomByPercent() {
        return Math.floor(Math.random() * 100) < RANDOM_FILL_PERCENT
    }

    static smoothMap() {
        for (let row = 0; row < this.numberOfRows; row += 3) {
            for (let col = 0; col < this.numberOfCols; col += 3) {
                if (!this.isInvalid(col, row)) {
                    let neighbourWallTiles = this.getSurroundingWallCount(col, row)

                    if (neighbourWallTiles > 4) {
                        this.setGrid(col, row, FILL)
                    } else if (neighbourWallTiles < 4) {
                        this.setGrid(col, row, NONE)
                    }
                }
            }
        }
    }

    static getSurroundingWallCount(col, row) {
        let wallCount = 0

        for (let neighbourCol = col - 3; neighbourCol <= col + 3; neighbourCol += 3) {
            for (let neighbourRow = row - 3; neighbourRow <= row + 3; neighbourRow += 3) {
                if (!this.isInvalid(neighbourCol, neighbourRow)) {
                    if (neighbourCol !== col || neighbourRow !== row) {
                        if (this.grid[neighbourRow][neighbourCol] !== NONE) {
                            wallCount++
                        }
                    }
                } else {
                    wallCount++
                }
            }
        }

        return wallCount
    }
}
