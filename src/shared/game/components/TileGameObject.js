import GameObject from 'shared/game/components/GameObject'

export default class TileGameObject extends GameObject {
    constructor(spriteSheet, grid, numberOfCols, numberOfRows) {

        var tileGrid = new Array()
        for (var row = 0; row < numberOfRows; row++) {
            tileGrid[row] = new Array()
            for (var col = 0; col < numberOfCols; col++) {
                tileGrid[row][col] = grid[row % grid.length][col % grid[0].length]
            }
        }

        super(spriteSheet, tileGrid)
    }
}
