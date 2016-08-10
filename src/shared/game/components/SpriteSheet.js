import * as Config from 'shared/game/configs'

export default class SpriteSheet {

    static getInstance() {
        if (!!!this._spriteSheet) {
            this._spriteSheet = new createjs.SpriteSheet(Config.TILESET)
        }

        return this._spriteSheet
    }

    static hasType(type) {
        return Config.TILESET.animations.hasOwnProperty(type)
    }
}
