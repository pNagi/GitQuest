import Tileset from '../../../../../build/img/event2.png'

export const TILESET = {
    images: [Tileset],
    frames: {
        width: 32,
        height: 48,
        regX: 0,
        regY: 0,
        spacing: 0,
        margin: 0
    },
    animations: {
        left: 4,
        up: 12,
        right: 8,
        down: 0,
        walkleft: {
            frames: [
                5, 6, 7, 6
            ],
            speed: 0.15
        },
        walkup: {
            frames: [
                13, 14, 15, 14
            ],
            speed: 0.15
        },
        walkright: {
            frames: [
                9, 10, 11, 10
            ],
            speed: 0.15
        },
        walkdown: {
            frames: [
                1, 2, 3, 2
            ],
            speed: 0.15
        },
        run: [
            1, 5
        ],
        jump: [6, 8, 'run']
    }
}
