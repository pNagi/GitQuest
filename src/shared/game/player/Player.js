import {Container} from 'shared/game/components'
import {PLAYER_FRONT, PLAYER_LEFT, PLAYER_RIGHT, PLAYER_BACK} from 'shared/game/configs/Types'

export default class Player extends Container {
    constructor(name) {
        super(PLAYER_FRONT)
    }

    faceFront() {
        this.setAnimation(PLAYER_FRONT)
    }

    turnLeft() {
        this.setAnimation(PLAYER_LEFT)
    }

    turnRight() {
        this.setAnimation(PLAYER_RIGHT)
    }

    turnBack() {
        this.setAnimation(PLAYER_BACK)
    }

    translate(horizontalSpeed, verticalSpeed) {
        this._container.x += horizontalSpeed
        this._container.y += verticalSpeed
    }
}
