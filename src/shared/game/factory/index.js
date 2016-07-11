import * as Config from 'shared/game/configs'
import GameObject from 'shared/game/components/GameObject'
import TileGameObject from 'shared/game/components/TileGameObject'
import Player from 'shared/game/player'

export default class Factory {

    constructor() {
        this.spriteSheet = new createjs.SpriteSheet(Config.TILESET)
    }

    createPlayer() {
        return new Player(this.spriteSheet, Config.PLAYER)
    }

    createGameObject(repo) {

        var type = repo.type

        if (type == 'file') {
            type = repo.name.split('.').pop()
        }

        if (Config.FILE_TYPE.hasOwnProperty(type)) {
            return new GameObject(this.spriteSheet, Config.FILE_TYPE[type])
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
