import PokemonTileset from '../../../../build/img/f30221.png'
import MapTileset from '../../../../build/img/bunch_o__free_tiles_by_magiscarf-d6ih36g.png'

const SIZE = 16

var getFrontAnimation = (number) => {
    return [[number + '-front-0', number + '-front-1'], [ number + '-front-2', number + '-front-3']]
}

export const UNKNOWN_TYPE = getFrontAnimation(19)

export const OBJECT_TYPE = {
    dir: getFrontAnimation(1),
    md: getFrontAnimation(3),
    js: getFrontAnimation(6),
    json: getFrontAnimation(7),
    yml: getFrontAnimation(8)
}

export const TILE_TYPE = {
    ground: [['ground']]
}

var animations = {}

var _createAnimationPart = (col, row, number, type, part) => {
    var size = 60
    var speed = 1

    animations[number + '-' + type + '-' + part] = {
        frames: [
            col + row * size,
            col + (row + 2) * size
        ],
        speed: speed
    }
}

var _createAnimationType = (col, row, number, type) => {
    _createAnimationPart(col, row, number, type, 0)
    _createAnimationPart(col + 1, row, number, type, 1)
    _createAnimationPart(col, row + 1, number, type, 2)
    _createAnimationPart(col + 1, row + 1, number, type, 3)
}

var _createAnimations = (width, height, size) => {
    for (var row = 0; row < height; row += 8) {
        for (var col = 0; col < width; col += 4) {
            _createAnimationType(col, row, col / 4 + row / 8 * 15, 'back')
            _createAnimationType(col + 2, row, col / 4 + row / 8 * 15, 'left')
            _createAnimationType(col, row + 4, col / 4 + row / 8 * 15, 'front')
            _createAnimationType(col + 2, row + 4, col / 4 + row / 8 * 15, 'right')
        }
    }
}

_createAnimations(960, 1408, 16)

animations.ground = 12 + (62 * 26) - 1 + 5280

export const TILESET = {
    images: [PokemonTileset, MapTileset],
    frames: {
        width: SIZE,
        height: SIZE
    },
    animations
}
