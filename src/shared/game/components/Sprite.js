import _ from 'lodash'

import {SpriteSheet} from 'shared/game/components'

import {SIZE} from 'shared/game/configs'
import {IMPASSABLE_OBJECTS} from 'shared/game/configs/Passable'

export default class Sprite {
    constructor(parent, type, col = 0, row = 0) {
        this._parent = parent
        this._type = _.head(_.flattenDeep([type]))
        this._sprite = new createjs.Sprite(SpriteSheet.getInstance(), type)
        this._sprite.width = SIZE
        this._sprite.height = SIZE
        this.setPosition(col, row)
    }

    set visible(visible) {
        this._sprite.visible = visible
    }

    get type() {
        return this._type
    }

    get parent() {
        return this._parent
    }

    get sprite() {
        return this._sprite
    }

    setPosition(col, row) {
        this._sprite.x = col * SIZE
        this._sprite.y = row * SIZE
    }

    setFrame(frame) {
        this._sprite.gotoAndPlay(frame)
    }

    isPassable() {
        return _.indexOf(IMPASSABLE_OBJECTS, this._type) < 0
    }
}
