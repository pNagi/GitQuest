import GameObject from 'shared/game/components/GameObject'

export default class TileGameObject extends GameObject {
    constructor(spriteSheet, grid, numberOfCols, numberOfRows) {

        let tileGrid = new Array()
        for (let row = 0; row < numberOfRows; row++) {
            tileGrid[row] = new Array()
            for (let col = 0; col < numberOfCols; col++) {
                tileGrid[row][col] = grid[row % grid.length][col % grid[0].length]
            }
        }

        super(spriteSheet, tileGrid)
    }
}
