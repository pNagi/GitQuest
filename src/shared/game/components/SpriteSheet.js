import * as Config from 'shared/game/configs'

export default class SpriteSheet {

    static getInstance() {
        console.log('get sprite sheet')
        if (!!!this._spriteSheet) {
            console.log('new sprite sheet')
            this._spriteSheet = new createjs.SpriteSheet(Config.TILESET)
        }

        return this._spriteSheet
    }

    static hasType(type) {
        return Config.TILESET.animations.hasOwnProperty(type)
    }
}
