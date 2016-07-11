import GameObject from 'shared/game/components/GameObject'

import * as Config from 'shared/game/configs'

export default class Player extends GameObject {

    constructor(spriteSheet, grid) {
        super(spriteSheet, grid)
    }

    walkUp() {
        this.sprite.getChildAt(0).gotoAndPlay(Config.getBackPlayerOf(1)[0][0])
        this.sprite.getChildAt(1).gotoAndPlay(Config.getBackPlayerOf(1)[0][1])
        this.sprite.getChildAt(2).gotoAndPlay(Config.getBackPlayerOf(1)[1][0])
        this.sprite.getChildAt(3).gotoAndPlay(Config.getBackPlayerOf(1)[1][1])
    }

    walkLeft() {
        this.sprite.getChildAt(0).gotoAndPlay(Config.getLeftPlayerOf(1)[0][0])
        this.sprite.getChildAt(1).gotoAndPlay(Config.getLeftPlayerOf(1)[0][1])
        this.sprite.getChildAt(2).gotoAndPlay(Config.getLeftPlayerOf(1)[1][0])
        this.sprite.getChildAt(3).gotoAndPlay(Config.getLeftPlayerOf(1)[1][1])
    }

    walkDown() {
        this.sprite.getChildAt(0).gotoAndPlay(Config.getFrontPlayerOf(1)[0][0])
        this.sprite.getChildAt(1).gotoAndPlay(Config.getFrontPlayerOf(1)[0][1])
        this.sprite.getChildAt(2).gotoAndPlay(Config.getFrontPlayerOf(1)[1][0])
        this.sprite.getChildAt(3).gotoAndPlay(Config.getFrontPlayerOf(1)[1][1])
    }

    walkRight() {
        this.sprite.getChildAt(0).gotoAndPlay(Config.getRightPlayerOf(1)[0][0])
        this.sprite.getChildAt(1).gotoAndPlay(Config.getRightPlayerOf(1)[0][1])
        this.sprite.getChildAt(2).gotoAndPlay(Config.getRightPlayerOf(1)[1][0])
        this.sprite.getChildAt(3).gotoAndPlay(Config.getRightPlayerOf(1)[1][1])
    }
}
