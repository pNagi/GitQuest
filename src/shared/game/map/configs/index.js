import MapTileset from '../../../../../build/img/pokemon_bw2___season_tiles_by_shiney570-d9cytb8.png'
import PokemonTileset from '../../../../../build/img/f30221.png'

export const SIZE = 32

export const MAP_OBJECT = {
    dir: 65,
    unknown: 0
}

export const MAP_TILESET = {
    images: [MapTileset],
    frames: {
        width: SIZE,
        height: SIZE
    },
    animations: MAP_OBJECT
}

export const FILE_OBJECT = {
    md: {
        frames: [30*2 + 0, 30*3 + 0],
        speed: 0.05
    },
    js: {
        frames: [30*2 + 8, 30*3 + 8],
        speed: 0.05
    },
    json: {
        frames: [30*2 + 14, 30*3 + 14],
        speed: 0.05
    },
    unknown: {
        frames: [30*42 + 0, 30*43 + 0],
        speed: 0.05
    }
}

export const FILE_TILESET = {
    images: [PokemonTileset],
    frames: {
        width: SIZE,
        height: SIZE
    },
    animations: FILE_OBJECT
}

export const impassable = [MAP_OBJECT.dir, ...Object.keys(FILE_OBJECT)]

export const setGround = (tile, row, col) => {
    switch (row % 4) {
        case 0:
            tile.gotoAndStop(col % 4 + 4);
            break
        case 1:
            tile.gotoAndStop(col % 4 + 4 + 16);
            break
        case 2:
            tile.gotoAndStop(col % 4 + 4 + 32);
            break
        case 3:
            tile.gotoAndStop(col % 4 + 4 + 48);
            break
    }

    tile.x = SIZE * col;
    tile.y = SIZE * row;
}
