import Layer from 'shared/game/components/Container'

const RANDOM_FILL_PERCENT = 48

const NONE = null
const GRASS = 'GRASS'
const GRASS_TOP_LEFT = 'GRASS_TOP_LEFT'
const GRASS_TOP = 'GRASS_TOP'
const GRASS_TOP_RIGHT = 'GRASS_TOP_RIGHT'
const GRASS_LEFT = 'GRASS_LEFT'
const GRASS_CENTER = 'GRASS_CENTER'
const GRASS_RIGHT = 'GRASS_RIGHT'
const GRASS_BOTTOM_LEFT = 'GRASS_BOTTOM_LEFT'
const GRASS_BOTTOM = 'GRASS_BOTTOM'
const GRASS_BOTTOM_RIGHT = 'GRASS_BOTTOM_RIGHT'

export default class MapGenerator {

    static createGrass(numberOfCols, numberOfRows) {
        this.numberOfCols = numberOfCols
        this.numberOfRows = numberOfRows
        this.randomFillMap()

        for (let i = 0; i < 5; i++) {
            this.smoothMap();
        }

        console.log('create ground')
        console.log(this.ground)
        return this.ground
    }

    static randomFillMap() {

        this.ground = new Array()
        for (let row = 0; row < this.numberOfRows; row++) {
            this.ground[row] = new Array()
            for (let col = 0; col < this.numberOfCols; col++) {
                if (this.randomByPercent()) {
                    this.ground[row][col] = GRASS
                } else {
                    this.ground[row][col] = NONE
                }

                console.log('hello from inside')
            }
        }
    }

    static randomByPercent() {
        let fill = Math.floor(Math.random() * 100)
        return fill < RANDOM_FILL_PERCENT
    }

    static smoothMap() {
        for (let row = 0; row < this.numberOfRows; row++) {
            for (let col = 0; col < this.numberOfCols; col++) {
                let neighbourWallTiles = this.getSurroundingWallCount(col, row)

                if (neighbourWallTiles > 4) {
                    this.ground[row][col] = GRASS
                } else if (neighbourWallTiles < 4) {
                    this.ground[row][col] = NONE
                }
            }
        }
    }

    static getSurroundingWallCount(col, row) {
        let wallCount = 0

        for (let neighbourCol = col - 1; neighbourCol <= col + 1; neighbourCol++) {
            for (let neighbourRow = row - 1; neighbourRow <= row + 1; neighbourRow++) {
                if (!this.isOutOfBound(neighbourCol, neighbourRow)) {
                    if (neighbourCol !== col || neighbourRow !== row) {
                        if (this.ground[neighbourRow][neighbourCol] !== NONE) {
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
