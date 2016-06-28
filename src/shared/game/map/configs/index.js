import Tileset from '../../../../../build/img/pokemon_bw2___season_tiles_by_shiney570-d9cytb8.png'

export const SIZE = 32

export const OBJECT = {
    dir: 65,
    file: 64,
    unknown: 0
}

export const TILESET = {
    images: [Tileset],
    frames: {
        width: SIZE,
        height: SIZE
    },
    animations: OBJECT
}

export const impassable = [OBJECT.dir, OBJECT.file]

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
