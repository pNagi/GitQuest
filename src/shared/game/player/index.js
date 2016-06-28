import * as Config from 'shared/game/player/configs'

exports.init = () => {
    console.log(Config)
    var spriteSheet = new createjs.SpriteSheet(Config.TILESET)
    var player = new createjs.Sprite(spriteSheet, 'down')

    return player
}
