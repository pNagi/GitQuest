import {SIZE} from 'shared/game/configs'
import * as Types from 'shared/game/configs/Tiles'
import {SpriteSheet} from 'shared/game/components'

export default class Sprite {
    constructor(type, col = 0, row = 0) {
        console.log('create sprite type')
        console.log(type)

        if (!SpriteSheet.hasType(type)) {
            type = Types.UNKNOWN
        }

        this._type = type
        this._sprite = new createjs.Sprite(SpriteSheet.getInstance(), type)
        this._sprite.x = col * SIZE
        this._sprite.y = row * SIZE
    }

    get type() {
        return this._type
    }

    get sprite() {
        return this._sprite
    }

    setPosition(col, row) {
        this._sprite.x = col * SIZE
        this._sprite.y = row * SIZE
    }

    setFrame(frame) {
        // if (Config.animations.hasOwnProperty(frame)) {
        //     this._sprite.gotoAndStop(this._type + '-' + frame)
        // }
    }
}
