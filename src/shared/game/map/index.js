import * as Config from 'shared/game/map/configs'

exports.init = (repo) => {

    var size = Config.SIZE
    var map = new createjs.Container()
    var mapTileset = new createjs.SpriteSheet(Config.MAP_TILESET)
    var fileTileset = new createjs.SpriteSheet(Config.FILE_TILESET)

    var mapWidth = canvas.width
    var mapHeight = canvas.height

    for (var row = 0; row < mapHeight / size ; row++) {
        for (var col = 0; col < mapWidth / size ; col++) {
            var tile = new createjs.Sprite(mapTileset);
            Config.setGround(tile, row, col)
            map.addChild(tile);
        }
    }

    var n = [0, 0]

    repo.forEach(function(item) {

        var itemSprite

        switch (item.type) {
            case 'dir':
                itemSprite = new createjs.Sprite(mapTileset, 'dir')
                break
            case 'file':
                var name = item.name.split('.').pop()
                if (!Config.FILE_OBJECT.hasOwnProperty(name)) {
                    name = 'unknown'
                }
                itemSprite = new createjs.Sprite(fileTileset, name)
                break
            default:
                itemSprite = new createjs.Sprite(fileTileset, 'unknown')
                break
        }

        itemSprite.set({
            x: size * ((2 * n[0]++) + 1),
            y: size * ((2 * n[1]) + 1)
        });

        if (size * ((2 * n[0]) + 3) > mapWidth) {
            n[0] = 0
            n[1]++
        }

        map.addChild(itemSprite)
    })

    return map
}
