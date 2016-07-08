export default class GameObject {
    constructor(spriteSheet, grid) {
        //check tileset type
        //check if grid is 2d Array
        //check if content in grid match existed component in tileset

        this._grid = [
            [
                ['111'],
                ['000']
            ],
            [
                ['000'],
                null
            ]
        ]
        this._container = new createjs.Container()

        for (var row = 0; row < this._grid.length; row++) {
            for (var col = 0; col < this._grid[row].length; col++) {
                if (this._grid[row][col] != null) {
                    var rect = new createjs.Shape()
                    rect.graphics.beginFill('#' + this._grid[row][col])
                    rect.graphics.drawRect(0, 0, 16, 16)
                    rect.graphics.endFill()
                    rect.alpha = 0.5
                    rect.y = row * 16
                    rect.x = col * 16

                    this._container.addChild(rect)
                }
            }
        }
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
