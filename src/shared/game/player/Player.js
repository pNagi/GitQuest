import {Container} from 'shared/game/components'
import {PLAYER} from 'shared/game/configs/Types'

export default class Player extends Container {
    constructor(name) {
        super(PLAYER.front)
    }

    faceFront() {
        this.setAnimation(PLAYER.front)
    }

    turnLeft() {
        this.setAnimation(PLAYER.left)
    }

    turnRight() {
        this.setAnimation(PLAYER.right)
    }

    turnBack() {
        this.setAnimation(PLAYER.back)
    }

    isPassable() {
        return true
    }

    move(horizontalSpeed, verticalSpeed) {
        this._container.x += horizontalSpeed
        this._container.y += verticalSpeed
    }
}
