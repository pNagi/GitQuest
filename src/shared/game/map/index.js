import * as Config from 'shared/game/map/configs'

export default class MapGenerator {

    constructor(repo, width, height, path) {
        this.size = Config.SIZE
        this.map = new createjs.Container()
        this.mapTileset = new createjs.SpriteSheet(Config.MAP_TILESET)
        this.fileTileset = new createjs.SpriteSheet(Config.FILE_TILESET)

        this.maxRow = Math.ceil(height / this.size)
        this.maxCol = Math.ceil(width / this.size)

        this.createGrid()

        this.map.addChild(this.createGroundLayer())

        this.placeObjects(repo, path)
    }

    createGrid() {
        this.grid = new Array()
        for (var row = 0; row < this.maxRow ; row++) {
            this.grid[row] = new Array()
            for (var col = 0; col < this.maxCol ; col++) {
                this.grid[row][col] = new Array()
                this.grid[row][col][0] = true
                this.grid[row][col][1] = ''
            }
        }
    }

    createGroundLayer() {
        var groundLayer = new createjs.Container()

        for (var row = 0; row < this.maxRow ; row++) {
            for (var col = 0; col < this.maxCol ; col++) {
                var tile = new createjs.Sprite(this.mapTileset);
                Config.setGround(tile, row, col)
                groundLayer.addChild(tile);
            }
        }

        return groundLayer
    }

    createDir() {
        return new createjs.Sprite(this.mapTileset, 'dir')
    }

    createFile(name) {
        var fileType = name.split('.').pop()
        if (!Config.FILE_OBJECT.hasOwnProperty(fileType)) {
            fileType = 'unknown'
        }

        return new createjs.Sprite(this.fileTileset, fileType)
    }

    createUnknown() {
        return new createjs.Sprite(this.fileTileset, 'unknown')
    }

    createItemSprite(type, name, path, col, row) {
        var itemSprite

        switch (type) {
            case 'dir':
                itemSprite = this.createDir()
                this.grid[row][col][1] = path
                break
            case 'file':
                itemSprite = this.createFile(name)
                this.grid[row][col][0] = false
                break
            default:
                itemSprite = this.createUnknown()
                break
        }

        itemSprite.set({
            x: col * this.size,
            y: row * this.size
        });

        this.map.addChild(itemSprite)
    }

    getParentPath(path) {
        return path.split('/').slice(0, -1).join('/')
    }

    placeObjects(repo, path) {

        var xIndex = 0
        var yIndex = 0

        if (path != '') {
            var col = ((2 * xIndex++) + 1)
            var row = ((2 * yIndex) + 1)

            this.createItemSprite('dir', 'back', this.getParentPath(path), col, row)
        }

        repo.forEach(function(item) {
            var col = ((2 * xIndex++) + 1)
            var row = ((2 * yIndex) + 1)

            this.createItemSprite(item.type, item.name, item.path, col, row)

            if (col + 3 > this.maxCol) {
                xIndex = 0
                yIndex++
            }
        }, this)
    }

    getSprite() {
        return this.map
    }

    isOutOfBound(x, y) {
        return (x < 0 || x >= (this.maxCol - 1) * this.size || y < 0 || y >= (this.maxRow - 1) * this.size)
    }

    getIndex(pos) {
        return Math.floor((pos + 16) / this.size)
    }

    getPath(x, y) {
        if (this.isOutOfBound(x, y)) {
            return ''
        }

        var col = this.getIndex(x)
        var row = this.getIndex(y)

        return this.grid[row][col][1]
    }

    passable(x, y) {
        if (this.isOutOfBound(x, y)) {
            return false
        }

        var col = this.getIndex(x)
        var row = this.getIndex(y)

        return this.grid[row][col][0]
    }
}
