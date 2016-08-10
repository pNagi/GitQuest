const RANDOM_FILL_PERCENT = 50

const NONE = 0
const FILL = 1

export default class MapGenerator {

    static generate(numberOfCols, numberOfRows) {
        this.numberOfCols = numberOfCols
        this.numberOfRows = numberOfRows
        this.randomFill()

        for (let i = 0; i < 5; i++) {
            this.smoothMap();
        }

        return this.grid
    }

    static setGrid(col, row, value) {
        this.grid[row][col] = value
        this.grid[row + 1][col] = value
        this.grid[row][col + 1] = value
        this.grid[row + 1][col + 1] = value
    }

    static randomFill() {
        this.grid = new Array()
        for (let row = 0; row < this.numberOfRows; row += 2) {
            this.grid[row] = new Array()
            this.grid[row + 1] = new Array()
            for (let col = 0; col < this.numberOfCols; col += 2) {
                if (this.randomByPercent()) {
                    this.setGrid(col, row, FILL)
                } else {
                    this.setGrid(col, row, NONE)
                }

                console.log('random fill')
            }
        }
    }

    static randomByPercent() {
        let fill = Math.floor(Math.random() * 100)
        return fill < RANDOM_FILL_PERCENT
    }

    static smoothMap() {
        for (let row = 0; row < this.numberOfRows; row += 2) {
            for (let col = 0; col < this.numberOfCols; col += 2) {
                let neighbourWallTiles = this.getSurroundingWallCount(col, row)

                if (neighbourWallTiles > 4) {
                    this.setGrid(col, row, FILL)
                } else if (neighbourWallTiles < 4) {
                    this.setGrid(col, row, NONE)
                }
            }
        }
    }

    static getSurroundingWallCount(col, row) {
        let wallCount = 0

        for (let neighbourCol = col - 2; neighbourCol <= col + 2; neighbourCol += 2) {
            for (let neighbourRow = row - 2; neighbourRow <= row + 2; neighbourRow += 2) {
                if (!this.isOutOfBound(neighbourCol, neighbourRow)) {
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

    static isOutOfBound(col, row) {
        return col < 0 || col >= this.numberOfCols || row < 0 || row >= this.numberOfRows
    }
}
