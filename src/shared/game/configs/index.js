import PokemonTileset from '../../../../build/img/f30221.png'
import MapTileset from '../../../../build/img/bunch_o__free_tiles_by_magiscarf-d6ih36g.png'
import PlayerTileset from '../../../../build/img/tileset-hoenn_ows_remake.png'

const SIZE = 16

let getAnimation = (name, number, type) => {
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
    dir: [
        [null, 'd-1', 'd-2', 'd-3', null],
        ['e-l-1', 'd-4', 'd-5', 'd-6', 'e-r-1'],
        ['e-l-2', 'd-7', 'd-8', 'd-9', 'e-r-2'],
        [null, 'd-10', 'd-11', 'd-12', null]
    ],
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

let animations = {}

let _createAnimationPart = (col, row, name, number, type, part) => {
    let size = 960 / SIZE
    let speed = 0.05

    animations[name + '-' + number + '-' + type + '-' + part] = {
        frames: [
            col + row * size,
            col + (row + 2) * size
        ],
        speed: speed
    }
}

let _createAnimationType = (col, row, number, name, type) => {
    _createAnimationPart(col, row, name, number, type, 0)
    _createAnimationPart(col + 1, row, name, number, type, 1)
    _createAnimationPart(col, row + 1, name, number, type, 2)
    _createAnimationPart(col + 1, row + 1, name, number, type, 3)
}

let _createAnimations = (initial, width, height, size, name) => {
    for (let row = 0; row < height; row += 8) {
        for (let col = 0; col < width; col += 4) {
            _createAnimationType(col, row, col / 4 + row / 8 * 15, name, 'back')
            _createAnimationType(col + 2, row, col / 4 + row / 8 * 15, name, 'left')
            _createAnimationType(col, row + 4, col / 4 + row / 8 * 15, name, 'front')
            _createAnimationType(col + 2, row + 4, col / 4 + row / 8 * 15, name, 'right')
        }
    }
}

let _createPlayerAnimationPart = (col, row, name, number, type, part) => {
    let size = 800 / SIZE
    let speed = 0.05

    animations[name + '-' + number + '-' + type + '-' + part] = {
        frames: [10178 + col + row * size],
        speed: speed
    }
}

let _createPlayerAnimationType = (col, row, number, name, type) => {
    _createPlayerAnimationPart(col, row, name, number, type, 0)
    _createPlayerAnimationPart(col + 1, row, name, number, type, 1)
    _createPlayerAnimationPart(col, row + 1, name, number, type, 2)
    _createPlayerAnimationPart(col + 1, row + 1, name, number, type, 3)
}

let _createPlayerAnimations = (initial, width, height, size, name) => {
    for (let row = 0; row < height; row += 4) {
        for (let col = 0; col < width; col += 4) {
            _createPlayerAnimationType(col, row, col / 4 + row / 4 * size / 4, name, 'front')
            _createPlayerAnimationType(col + 2, row, col / 4 + row / 4 * size / 4, name, 'right')
            _createPlayerAnimationType(col, row + 2, col / 4 + row / 4 * size / 4, name, 'back')
            _createPlayerAnimationType(col + 2, row + 2, col / 4 + row / 4 * size / 4, name, 'left')
        }
    }
}

_createAnimations(0, 960, 1408, 16, 'o')
_createPlayerAnimations(10178, 800, 600, 16, 'p')

let getPostionOnMapTileset = (col, row) => {
    return col + (row * 62) - 1 + 5280
}

animations.ground = getPostionOnMapTileset(12, 26)

animations['d-1'] = getPostionOnMapTileset(22, 25)
animations['d-2'] = getPostionOnMapTileset(23, 25)
animations['d-3'] = getPostionOnMapTileset(24, 25)
animations['d-4'] = getPostionOnMapTileset(22, 26)
animations['d-5'] = getPostionOnMapTileset(23, 26)
animations['d-6'] = getPostionOnMapTileset(24, 26)
animations['d-7'] = getPostionOnMapTileset(22, 27)
animations['d-8'] = getPostionOnMapTileset(23, 27)
animations['d-9'] = getPostionOnMapTileset(24, 27)
animations['d-10'] = getPostionOnMapTileset(22, 28)
animations['d-11'] = getPostionOnMapTileset(23, 28)
animations['d-12'] = getPostionOnMapTileset(24, 28)

animations['e-r-1'] = getPostionOnMapTileset(25, 31)
animations['e-r-2'] = getPostionOnMapTileset(25, 32)

animations['e-l-1'] = getPostionOnMapTileset(27, 31)
animations['e-l-2'] = getPostionOnMapTileset(27, 32)

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
