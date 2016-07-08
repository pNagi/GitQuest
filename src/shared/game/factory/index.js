import * as Config from 'shared/game/configs'
import GameObject from 'shared/game/components/GameObject'

export default class Factory {

    constructor() {
        this.spriteSheet = new createjs.SpriteSheet(Config.TILESET)
    }

    create(type, info) {
        if (Config.FILE_TYPE.hasOwnProperty(type)) {
            return new GameObject(Config.FILE_TYPE[type], info)
        }

        return new GameObject(this.spriteSheet, Config.UNKNOWN_TYPE, info)
    }
}
