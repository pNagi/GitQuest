import * as Config from 'shared/game/configs'
import GameObject from 'shared/game/components/GameObject'
import TileGameObject from 'shared/game/components/TileGameObject'
import Player from 'shared/game/player'

export default class Factory {

    static getSpriteSheet() {
        if (typeof this.spriteSheet === 'undefined') {
            this.spriteSheet = new createjs.SpriteSheet(Config.TILESET)
        }

        return this.spriteSheet
    }

    static getPlayerGrid() {
        return Config.PLAYER
    }

    static createGameObject(repo) {

        let type = repo.type

        if (type === 'file') {
            type = repo.name.split('.').pop()
        }

        if (Config.FILE_TYPE.hasOwnProperty(type)) {
            return new GameObject(this.getSpriteSheet(), Config.FILE_TYPE[type], repo.name)
        }

        return new GameObject(this.getSpriteSheet(), Config.UNKNOWN_TYPE, repo.name)
    }

    static createTileGameObject(type, width, height) {
        if (Config.TILE_TYPE.hasOwnProperty(type)) {
            return new TileGameObject(this.getSpriteSheet(), Config.TILE_TYPE[type], width, height)
        }

        return new TileGameObject(this.getSpriteSheet(), Config.UNKNOWN_TYPE, width, height)
    }
}
