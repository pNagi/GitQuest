import _ from 'lodash'

import {SIZE} from 'shared/game/configs'
import {IMPASSABLE_OBJECTS} from 'shared/game/configs/Passable'
import {SpriteSheet} from 'shared/game/components'

export default class Sprite {
    constructor(parent, type, col = 0, row = 0) {
        this._parent = parent
        this._type = _.head(_.flattenDeep([type]))
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
        this._sprite.gotoAndStop(frame)
    }

    isPassable() {
        return _.indexOf(IMPASSABLE_OBJECTS, this._type) < 0
    }
}
