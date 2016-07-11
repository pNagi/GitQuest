export default class GameObject {
    constructor(spriteSheet, grid) {
        //check tileset type
        //check if grid is 2d Array
        //check if content in grid match existed component in tileset
        this._spriteSheet = spriteSheet

        this._grid = grid

        this._container = new createjs.Container()

        for (var row = 0; row < this._grid.length; row++) {
            for (var col = 0; col < this._grid[row].length; col++) {
                if (this._grid[row][col] != null) {
                    this._createPart(this._grid[row][col], row * 16, col * 16)
                }
            }
        }
    }

    _createPart(config, y, x) {
        var part = new createjs.Sprite(this._spriteSheet, config)
        part.y = y
        part.x = x
        this._container.addChild(part)
    }

    get width() {
        return this._grid[0].length
    }

    get height() {
        return this._grid.length
    }

    get grid() {
        return this._grid
    }

    get sprite() {
        return this._container
    }
}
