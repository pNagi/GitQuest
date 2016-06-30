import * as Config from 'shared/game/map/configs'

export default class MapGenerator {
    constructor(repo, width, height) {
        this.size = Config.SIZE
        this.map = new createjs.Container()
        this.mapTileset = new createjs.SpriteSheet(Config.MAP_TILESET)
        this.fileTileset = new createjs.SpriteSheet(Config.FILE_TILESET)

        this.grid = []

        this.maxRow = Math.floor(height / this.size)
        this.maxCol = Math.floor(width / this.size)

        for (var row = 0; row < this.maxRow ; row++) {
            this.grid[row] = new Array()
            for (var col = 0; col < this.maxCol ; col++) {
                this.grid[row][col] = new Array()
                this.grid[row][col][0] = true
                this.grid[row][col][1] = ''

                var tile = new createjs.Sprite(this.mapTileset);
                Config.setGround(tile, row, col)
                this.map.addChild(tile);
            }
        }

        console.log('total row: ' + this.grid.length + ', total col: ' + this.grid[0].length)

        var n = [0, 0]

        repo.forEach(function(item) {

            var itemSprite

            var col = ((2 * n[0]++) + 1)
            var row = ((2 * n[1]) + 1)
            console.log(col, row)

            switch (item.type) {
                case 'dir':
                    itemSprite = new createjs.Sprite(this.mapTileset, 'dir')
                    this.grid[row][col][1] = item.path
                    console.log(item.path)
                    break
                case 'file':
                    var name = item.name.split('.').pop()
                    if (!Config.FILE_OBJECT.hasOwnProperty(name)) {
                        name = 'unknown'
                    }
                    itemSprite = new createjs.Sprite(this.fileTileset, name)
                    this.grid[row][col][0] = false
                    break
                default:
                    itemSprite = new createjs.Sprite(this.fileTileset, 'unknown')
                    break
            }

            itemSprite.set({
                x: this.size * col - 2,
                y: this.size * row + 4
            });

            if (col + 3 > this.maxCol) {
                n[0] = 0
                n[1]++
            }

            this.map.addChild(itemSprite)
        }, this)
    }

    getSprite() {
        return this.map
    }

    getPath(x, y) {
        if (x < 0 || x >= (this.maxCol - 1) * this.size || y < 0 || y >= (this.maxRow - 1) * this.size) {
            return ''
        }

        var col = Math.floor((x + 16) / this.size)
        var row = Math.floor((y + 16) / this.size)

        return this.grid[row][col][1]
    }

    passable(x, y) {
        if (x < 0 || x >= (this.maxCol - 1) * this.size || y < 0 || y >= (this.maxRow - 1) * this.size) {
            console.log('out of map')
            return false
        }

        var col = Math.floor((x + 16) / this.size)
        var row = Math.floor((y + 16) / this.size)

        return this.grid[row][col][0]
    }
}
