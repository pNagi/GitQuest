import * as Config from 'shared/game/map/configs'

exports.init = (repo) => {

    var size = Config.SIZE
    var map = new createjs.Container()
    var tileset = new createjs.SpriteSheet(Config.TILESET)

    var mapWidth = canvas.width
    var mapHeight = canvas.height

    for (var row = 0; row < mapHeight / size ; row++) {
        for (var col = 0; col < mapWidth / size ; col++) {
            var tile = new createjs.Sprite(tileset);
            Config.setGround(tile, row, col)
            map.addChild(tile);
        }
    }

    var n = [0, 0]

    repo.forEach(function(item) {

        var itemSprite

        switch (item.type) {
            case 'dir':
                itemSprite = new createjs.Sprite(tileset, 'dir')
                break
            case 'file':
                itemSprite = new createjs.Sprite(tileset, 'file')
                break
            default:
                itemSprite = new createjs.Sprite(tileset, 'unknown')
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
        if (size * ((2 * n[1]) + 3) > mapHeight) {
            n[0] = 0
        }

        map.addChild(itemSprite)
    })

    return map
}
