import Tileset from '../../../../build/img/pokemon_bw2___season_tiles_by_shiney570-d9cytb8.png'

exports.init = (repo) => {
    var map = new createjs.Container()
    var tileset = new createjs.SpriteSheet({
        images: [Tileset],
        frames: {
            width: 32,
            height: 32
        },
        animations: {
            item: 65
        }
    })

    var count = 0;
    for (var row = 0; row < canvas.height / 32; row++) {
        for (var col = 0; col < canvas.width / 32; col++) {
            var tile = new createjs.Sprite(tileset);

            switch (row % 4) {
                case 0:
                    tile.gotoAndStop(count++ % 4 + 4);
                    break
                case 1:
                    tile.gotoAndStop(count++ % 4 + 4 + 16);
                    break
                case 2:
                    tile.gotoAndStop(count++ % 4 + 4 + 32);
                    break
                case 3:
                    tile.gotoAndStop(count++ % 4 + 4 + 48);
                    break
            }

            tile.x = 32 * col;
            tile.y = 32 * row;
            map.addChild(tile);
        }
        count = 0;
    }

    var size = 32
    var count = [1, 1]

    repo.forEach(function(data) {

        var item = new createjs.Sprite(tileset, 'item').set({
            x: -size + size * 2 * count[0]++,
            y: -size + size * 2 * count[1]
        });

        if (size + size * 2 * count[0] > canvas.width) {
            count[0] = 1
            count[1]++
        }
        if (size + size * 2 * count[1] > canvas.height) {
            count[0] = 1
        }

        map.addChild(item)
    })

    return map
}
