import MapTileset from '../../../../../build/img/bunch_o__free_tiles_by_magiscarf-d6ih36g.png'

export const SIZE = 16

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

    var x = 12;
    var y = 26;
    tile.gotoAndStop(x + (62 * y) - 1)

    tile.x = SIZE * col;
    tile.y = SIZE * row;
}
