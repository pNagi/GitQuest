import _ from 'lodash'

import {GridCreator} from 'shared/game/utils/'
import {Layer, Path} from 'shared/game/components'

const NONE = 0
const FILLED = -1

export default class PathGenerator {

    constructor(player, containers, numberOfCols, numberOfRows) {
        this.numberOfCols = numberOfCols
        this.numberOfRows = numberOfRows

        this._initPath(player, containers)
        let pass = this.generatePath(containers)
        let safety = 1000

        while ((!pass || this.checkFillPercent()) && safety > 0) {
            this._initPath(player, containers)
            pass = this.generatePath(containers)
            safety--
        }

        this.createSprites(this.grid)
    }

    getLayer() {
        return this.layer
    }

    checkFillPercent() {
        let count = 0
        for (let row = 0; row < this.numberOfRows; row++) {
            for (let col = 0; col < this.numberOfCols; col++) {
                this.grid[row][col] !== 0 && count++
            }
        }

        return count / (this.numberOfRows * this.numberOfCols) > 0.4
    }

    createSprites(grid) {
        for (let row = 0; row < this.numberOfRows; row++) {
            for (let col = 0; col < this.numberOfCols; col++) {
                grid[row][col] !== 0 && this.layer.place(new Path(), col, row)
            }
        }
    }

    printGrid() {
        let count = 0
        for (let row = 0; row < this.numberOfRows ; row++) {
            let s = ''
            for (let col = 0 ; col < this.numberOfCols ; col++) {
                s += ('    ' + this.grid[row][col]).slice(-3)
            }
            count++
        }
    }

    _placePlayer(player) {
        this.layer.place(player, (this.numberOfCols - player.numberOfCols) / 2, (this.numberOfRows - player.numberOfRows) / 2, false)

        let startCol = Math.floor(player.col / 2)
        let startRow = Math.floor(player.row / 2)
        let endCol = Math.ceil((player.col + player.numberOfCols) / 2)
        let endRow = Math.ceil((player.row + player.numberOfRows) / 2)

        for (let row = startRow; row <= endRow; row++) {
            for (let col = startCol; col <= endCol; col++) {
                this.setGrid(col * 2, row * 2, FILLED)
            }
        }
    }

    _createLayer() {
        this.layer = new Layer(GridCreator.makeGrid(this.numberOfCols, this.numberOfRows))
    }

    _createGrid() {
        this.grid = GridCreator.makeGrid(this.numberOfCols, this.numberOfRows, NONE)
    }

    _initPath(player, containers) {
        this._createGrid()
        this._createLayer()
        this._placePlayer(player)

        this.path = new Array()
        this.isEnd = new Array()

        for (let index = 0; index < containers.length; index++) {
            let container = containers[index]

            this.path[index] = new Array()
            this.isEnd[index] = false
            this.layer.placeRandomly(container)

            let startCol = Math.floor(container.col / 2)
            let startRow = Math.floor(container.row / 2)
            let endCol = Math.ceil((container.col + container.numberOfCols) / 2)
            let endRow = Math.ceil((container.row + container.numberOfRows) / 2)

            let dirs = new Array()
            for (let row = startRow; row <= endRow; row++) {
                for (let col = startCol; col <= endCol; col++) {
                    if (row === endRow) {
                        this.setGrid(col * 2, row * 2, this.indexToSupportive(index))
                        dirs.push({
                            col: col * 2,
                            row: row * 2
                        })
                    } else {
                        this.setGrid(col * 2, row * 2, FILLED)
                    }
                }
            }

            let dir = dirs[Math.floor(Math.random() * dirs.length)]
            this.path[index].push(dir)
            this.setGrid(dir.col, dir.row, this.indexToMain(index))
        }
    }

    indexToMain(index) {
        return (index + 1) * 2
    }

    indexToSupportive(index) {
        return (index + 1) * 2 - 1
    }

    generatePath(containers) {
        let safety = this.numberOfCols * this.numberOfRows / 2

        while (safety > 0) {

            for (let index = 0; index < containers.length; index++) {
                if (this.isEnd[index]) {
                    continue
                }

                let col = _.last(this.path[index]).col
                let row = _.last(this.path[index]).row

                let dirs = new Array()
                let final = new Array()

                for (let neighbourCol = col - 2; neighbourCol <= col + 2; neighbourCol += 2) {
                    for (let neighbourRow = row - 2; neighbourRow <= row + 2; neighbourRow += 2) {
                        if (!this.isOutOfBound(neighbourCol, neighbourRow)) {
                            if (neighbourCol === col || neighbourRow === row) {
                                if (this.grid[neighbourRow][neighbourCol] === FILLED) {
                                    continue
                                }

                                let dir = {
                                    col: neighbourCol,
                                    row: neighbourRow
                                }
                                if (this.grid[neighbourRow][neighbourCol] === NONE || this.grid[neighbourRow][neighbourCol] === this.indexToSupportive(index) || this.grid[neighbourRow][neighbourCol] === this.indexToMain(index)) {
                                    dirs.push(dir)
                                } else if (this.grid[neighbourRow][neighbourCol] % 2 === 0) {
                                    final.push(dir)
                                }
                            }
                        }
                    }
                }

                if (dirs.length === 0 && final.length === 0) {
                    return false
                }

                if (final.length > 0) {
                    let dir = final[Math.floor(Math.random() * final.length)]
                    this.path[index].push(dir)

                    let finalIndex = this.grid[dir.row][dir.col]
                    this.path[index].forEach(function(position) {
                        this.setGrid(position.col, position.row, finalIndex)
                    }, this)

                    this.path[(finalIndex / 2) - 1] = _.union(this.path[index], this.path[(finalIndex / 2) - 1])

                    this.isEnd[index] = true
                } else {
                    let dir = dirs[Math.floor(Math.random() * dirs.length)]
                    this.path[index].push(dir)

                    col = _.last(this.path[index]).col
                    row = _.last(this.path[index]).row
                    this.setGrid(col, row, (index + 1) * 2)
                }
            }

            let count = 0
            this.isEnd.forEach(function(isIndexEnd) {
                if (isIndexEnd) {
                    count++
                }
            })

            if (count === this.isEnd.length - 1) {
                return true
            }

            safety--
        }

        return false
    }

    isOutOfBound(col, row) {
        return col < 0 || col >= this.numberOfCols || row < 0 || row >= this.numberOfRows
    }

    setGrid(col, row, value) {
        this.grid[row][col] = value
        this.grid[row + 1][col] = value
        this.grid[row][col + 1] = value
        this.grid[row + 1][col + 1] = value
    }
}
