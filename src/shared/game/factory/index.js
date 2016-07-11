import * as Config from 'shared/game/configs'
import GameObject from 'shared/game/components/GameObject'
import TileGameObject from 'shared/game/components/TileGameObject'

export default class Factory {

    constructor() {
        this.spriteSheet = new createjs.SpriteSheet(Config.TILESET)
    }

    createGameObject(repo) {

        var type = repo.type

        if (type == 'file') {
            type = repo.name.split('.').pop()
        }

        if (Config.OBJECT_TYPE.hasOwnProperty(type)) {
            return new GameObject(this.spriteSheet, Config.OBJECT_TYPE[type])
        }

        return new GameObject(this.spriteSheet, Config.UNKNOWN_TYPE)
    }

    createTileGameObject(type, width, height) {
        if (Config.TILE_TYPE.hasOwnProperty(type)) {
            return new TileGameObject(this.spriteSheet, Config.TILE_TYPE[type], width, height)
        }

        return new TileGameObject(this.spriteSheet, Config.UNKNOWN_TYPE, width, height)
    }
}
