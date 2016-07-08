import MapTileset from '../../../../../build/img/pokemon_bw2___season_tiles_by_shiney570-d9cytb8.png'

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
        default:
            break
    }

    tile.x = SIZE * col;
    tile.y = SIZE * row;
}
