import * as KeyCode from 'shared/game/constants/keyCodes'
export const SPEED = 3

var player, wall

exports.init = (p, w) => {
    player = p
    wall = w
}

exports.talk = (e) => {
    loadMap('pnagi', 'Lecture', 'Algorithm')
}

exports.playAnimation = (e) => {
    switch (e.keyCode) {
        case KeyCode.ENTER:
            talk();
            break
        case KeyCode.SPACE:
            talk();
            break
        case KeyCode.KEY_LEFT:
            if (player.currentAnimation != 'walkleft')
                player.gotoAndPlay('walkleft')
            break
        case KeyCode.KEY_UP:
            if (player.currentAnimation != 'walkup')
                player.gotoAndPlay('walkup')
            break
        case KeyCode.KEY_RIGHT:
            if (player.currentAnimation != 'walkright')
                player.gotoAndPlay('walkright')
            break
        case KeyCode.KEY_DOWN:
            if (player.currentAnimation != 'walkdown')
                player.gotoAndPlay('walkdown')
            break
    }
}

exports.stopAnimation = (e) => {
    switch (e.keyCode) {
        case KeyCode.KEY_LEFT:
            if (player.currentAnimation == 'walkleft')
                player.gotoAndStop('left')
            break
        case KeyCode.KEY_UP:
            if (player.currentAnimation == 'walkup')
                player.gotoAndStop('up')
            break
        case KeyCode.KEY_RIGHT:
            if (player.currentAnimation == 'walkright')
                player.gotoAndStop('right')
            break
        case KeyCode.KEY_DOWN:
            if (player.currentAnimation == 'walkdown')
                player.gotoAndStop('down')
            break
    }
}

var d = [0, 0, 0, 0]

exports.setSpeed = (e, inverse, direct) => {
    if (!e) {
        e = window.event
    }

    switch (e.keyCode) {
        case KeyCode.KEY_LEFT:
            return d[0] = inverse
        case KeyCode.KEY_UP:
            return d[1] = inverse
        case KeyCode.KEY_RIGHT:
            return d[2] = direct
        case KeyCode.KEY_DOWN:
            return d[3] = direct
    }
}

exports.move = () => {
    player.x += d[0] + d[2]
    if (player.x < wall.left) {
        player.x = wall.left
    }
    if (player.x > wall.right) {
        player.x = wall.right
    }

    player.y += d[1] + d[3]
    if (player.y < wall.bottom) {
        player.y = wall.bottom
    }
    if (player.y > wall.top) {
        player.y = wall.top
    }
}
