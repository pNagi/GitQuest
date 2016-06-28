import Tileset from '../../../../../build/img/tileset-hoenn_ows_remake.png'

export const TILESET = {
    images: [Tileset],
    frames: {
        width: 32,
        height: 32,
        regX: 0,
        regY: 0,
        spacing: 0,
        margin: 0
    },
    animations: {
        left: 28,
        up: 27,
        right: 3,
        down: 2,
        walkleft: {
            frames: [28],
            speed: 0.15
        },
        walkup: {
            frames: [27],
            speed: 0.15
        },
        walkright: {
            frames: [3],
            speed: 0.15
        },
        walkdown: {
            frames: [2],
            speed: 0.15
        },
        run: [
            1, 5
        ],
        jump: [6, 8, 'run']
    }
}
