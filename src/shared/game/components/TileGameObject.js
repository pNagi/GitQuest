import GameObject from 'shared/game/components/GameObject'

export default class TileGameObject extends GameObject {
    constructor(spriteSheet, grid, width, height) {

        var tileGrid = new Array()
        for (var row = 0; row < height; row++) {
            tileGrid[row] = new Array()
            for (var col = 0; col < width; col++) {
                tileGrid[row][col] = grid[row % grid.length][col % grid[0].length]
            }
        }

        super(spriteSheet, tileGrid)
    }
}
