import _ from 'lodash'

import {GridCreator} from 'shared/game/utils/'
import {Layer, Path} from 'shared/game/components'

const NONE = 0

export default class PathGenerator {

    constructor(player, containers, numberOfCols, numberOfRows) {
        this.numberOfCols = numberOfCols
        this.numberOfRows = numberOfRows

        console.log('generate path')
        this.createGrid(player, containers)
        this.generatePath(containers)

        let safety = 1000
        let pass = false
        while ((!pass || this.checkFillPercent()) && safety > 0) {
            this.createGrid(player, containers)
            pass = this.generatePath(containers)
            console.log('pass', pass)
            safety--
        }

        this.createSprites()
        // this.printGrid()
    }

    getLayer() {
        return this.layer
    }

    checkFillPercent() {
        let count = 0
        for (let row = 0; row < this.numberOfRows; row++) {
            for (let col = 0; col < this.numberOfCols; col++) {
                if (this.grid[row][col] !== 0) {
                    count++
                }
            }
        }

        let result = (count / (this.numberOfRows * this.numberOfCols) > 0.4)
        console.log(count / (this.numberOfRows * this.numberOfCols))
        return result
    }

    createSprites() {
        for (let row = 0; row < this.numberOfRows; row++) {
            for (let col = 0; col < this.numberOfCols; col++) {
                if (this.grid[row][col] !== 0) {
                    this.layer.place(new Path(), col, row, true)
                }
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
            console.log(count % 2 + ':' + s)
            count++
        }
    }

    createGrid(player, containers) {
        this.grid = GridCreator.makeGrid(this.numberOfCols, this.numberOfRows, NONE)
        this.layer = new Layer(GridCreator.makeGrid(this.numberOfCols, this.numberOfRows))

        this.layer.place(player, (this.numberOfCols - player.numberOfCols) / 2, (this.numberOfRows - player.numberOfRows) / 2, false)
        let startCol = Math.floor(player.col / 2)
        let startRow = Math.floor(player.row / 2)
        let endCol = Math.ceil((player.col + player.numberOfCols) / 2)
        let endRow = Math.ceil((player.row + player.numberOfRows) / 2)

        for (let row = startRow; row <= endRow; row++) {
            for (let col = startCol; col <= endCol; col++) {
                this.setGrid(col * 2, row * 2, -1)
            }
        }

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
                        this.setGrid(col * 2, row * 2, ((index + 1) * 2) - 1)
                        dirs.push({
                            col: col * 2,
                            row: row * 2
                        })
                    } else {
                        this.setGrid(col * 2, row * 2, -1)
                    }
                }
            }

            let random = Math.floor(Math.random() * dirs.length)
            let dir = dirs[random]
            this.path[index].push(dir)
            this.setGrid(dir.col, dir.row, ((index + 1) * 2))
        }
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

                                //object
                                if (this.grid[neighbourRow][neighbourCol] === -1) {
                                    continue
                                }

                                //my path
                                // if (this.grid[neighbourRow][neighbourCol] === ((index + 1) * 2)) {
                                //     continue
                                // }

                                //possible path
                                if (this.grid[neighbourRow][neighbourCol] === NONE || this.grid[neighbourRow][neighbourCol] === (index + 1) * 2 - 1 || this.grid[neighbourRow][neighbourCol] === ((index + 1) * 2)) {
                                    dirs.push({
                                        col: neighbourCol,
                                        row: neighbourRow
                                    })
                                } else if (this.grid[neighbourRow][neighbourCol] % 2 === 0) {
                                    final.push({
                                        col: neighbourCol,
                                        row: neighbourRow
                                    })
                                }
                            }
                        }
                    }
                }

                if (dirs.length === 0 && final.length === 0) {
                    console.log('killed itself')
                    // this.path[index].push(this.path[index][Math.floor(Math.random() * this.path[index].length)])
                    return false
                    //continue
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
