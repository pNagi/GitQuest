import PokemonTileset from '../../../../build/img/f30221.png'
import MapTileset from '../../../../build/img/bunch_o__free_tiles_by_magiscarf-d6ih36g.png'
import PlayerTileset from '../../../../build/img/tileset-hoenn_ows_remake.png'

const SIZE = 16

var getAnimation = (name, number, type) => {
    return [
        [
            name + '-' + number + '-' + type + '-0',
            name + '-' + number + '-' + type + '-1'
        ],
        [
            name + '-' + number + '-' + type + '-2',
            name + '-' + number + '-' + type + '-3'
        ]
    ]
}

export const getFrontPlayerOf = (number) => {
    return getAnimation('p', number, 'front')
}

export const getBackPlayerOf = (number) => {
    return getAnimation('p', number, 'back')
}

export const getLeftPlayerOf = (number) => {
    return getAnimation('p', number, 'left')
}

export const getRightPlayerOf = (number) => {
    return getAnimation('p', number, 'right')
}

export const getFrontObjectOf = (number) => {
    return getAnimation('o', number, 'front')
}

export const PLAYER = getFrontPlayerOf(1)

export const FILE_TYPE = {
    dir: getFrontObjectOf(1),
    md: getFrontObjectOf(3),
    js: getFrontObjectOf(6),
    json: getFrontObjectOf(7),
    yml: getFrontObjectOf(8)
}

export const TILE_TYPE = {
    ground: [
        ['ground']
    ]
}

export const UNKNOWN_TYPE = getFrontObjectOf(10)

var animations = {}

var _createAnimationPart = (col, row, name, number, type, part) => {
    var size = 960 / SIZE
    var speed = 0.05

    animations[name + '-' + number + '-' + type + '-' + part] = {
        frames: [
            col + row * size,
            col + (row + 2) * size
        ],
        speed: speed
    }
}

var _createAnimationType = (col, row, number, name, type) => {
    _createAnimationPart(col, row, name, number, type, 0)
    _createAnimationPart(col + 1, row, name, number, type, 1)
    _createAnimationPart(col, row + 1, name, number, type, 2)
    _createAnimationPart(col + 1, row + 1, name, number, type, 3)
}

var _createAnimations = (initial, width, height, size, name) => {
    for (var row = 0; row < height; row += 8) {
        for (var col = 0; col < width; col += 4) {
            _createAnimationType(col, row, col / 4 + row / 8 * 15, name, 'back')
            _createAnimationType(col + 2, row, col / 4 + row / 8 * 15, name, 'left')
            _createAnimationType(col, row + 4, col / 4 + row / 8 * 15, name, 'front')
            _createAnimationType(col + 2, row + 4, col / 4 + row / 8 * 15, name, 'right')
        }
    }
}

var _createPlayerAnimationPart = (col, row, name, number, type, part) => {
    var size = 800 / SIZE
    var speed = 0.05

    animations[name + '-' + number + '-' + type + '-' + part] = {
        frames: [10178 + col + row * size],
        speed: speed
    }
}

var _createPlayerAnimationType = (col, row, number, name, type) => {
    _createPlayerAnimationPart(col, row, name, number, type, 0)
    _createPlayerAnimationPart(col + 1, row, name, number, type, 1)
    _createPlayerAnimationPart(col, row + 1, name, number, type, 2)
    _createPlayerAnimationPart(col + 1, row + 1, name, number, type, 3)
}

var _createPlayerAnimations = (initial, width, height, size, name) => {
    for (var row = 0; row < height; row += 4) {
        for (var col = 0; col < width; col += 4) {
            _createPlayerAnimationType(col, row, col / 4 + row / 4 * size / 4, name, 'front')
            _createPlayerAnimationType(col + 2, row, col / 4 + row / 4 * size / 4, name, 'right')
            _createPlayerAnimationType(col, row + 2, col / 4 + row / 4 * size / 4, name, 'back')
            _createPlayerAnimationType(col + 2, row + 2, col / 4 + row / 4 * size / 4, name, 'left')
        }
    }
}

_createAnimations(0, 960, 1408, 16, 'o')
_createPlayerAnimations(10178, 800, 600, 16, 'p')

animations.ground = 12 + (62 * 26) - 1 + 5280
animations.temp = 10178

export const TILESET = {
    images: [
        PokemonTileset, MapTileset, PlayerTileset
    ],
    frames: {
        width: SIZE,
        height: SIZE
    },
    animations
}
