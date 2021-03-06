import {Container} from 'shared/game/components'
import {PLAYER} from 'shared/game/configs/Types'

import {SIZE} from 'shared/game/configs'

export default class Player extends Container {
    constructor(name) {
        super(PLAYER.front)
        this.headTo = {
            col: 0,
            row: 1
        }
    }

    get col() {
        return Math.ceil(this.x / SIZE)
    }

    get row() {
        return Math.ceil((this.y + 8) / SIZE)
    }

    faceFront() {
        this.setAnimation(PLAYER.front)
        this.headTo = {
            col: 0,
            row: 1
        }
    }

    turnLeft() {
        this.setAnimation(PLAYER.left)
        this.headTo = {
            col: -1,
            row: 0
        }
    }

    turnRight() {
        this.setAnimation(PLAYER.right)
        this.headTo = {
            col: 1,
            row: 0
        }
    }

    turnBack() {
        this.setAnimation(PLAYER.back)
        this.headTo = {
            col: 0,
            row: -1
        }
    }

    isPassable() {
        return true
    }

    move(horizontalSpeed, verticalSpeed) {
        this.setExactPosition(this._container.x + horizontalSpeed, this._container.y + verticalSpeed)
    }
}
