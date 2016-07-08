import PokemonTileset from '../../../../build/img/f30221.png'
import MapTileset from '../../../../build/img/bunch_o__free_tiles_by_magiscarf-d6ih36g.png'

const SIZE = 32

export const UNKNOWN = 'unknown'

export const FILE_TYPE = {
    md: {
        frames: [
            30 * 2 + 0,
            30 * 3 + 0
        ],
        speed: 0.05
    },
    js: {
        frames: [
            30 * 2 + 8,
            30 * 3 + 8
        ],
        speed: 0.05
    },
    json: {
        frames: [
            30 * 2 + 14,
            30 * 3 + 14
        ],
        speed: 0.05
    },
    unknown: {
        frames: [
            30 * 42 + 0,
            30 * 43 + 0
        ],
        speed: 0.05
    }
}

export const TILESET = {
    images: [PokemonTileset],
    frames: {
        width: SIZE,
        height: SIZE
    },
    animations: FILE_TYPE
}
