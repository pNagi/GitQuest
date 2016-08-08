import {MapTileset, ObjectTileset, PlayerTileset} from 'shared/game/configs/Tilesets'

export const SIZE = 16

let images = []
let animations = {}
let tilesetNumber = 1
let count = 0

let initAnimations = (tileset) => {
    images.push(tileset.img)

    let numberOfRows = tileset.height / (SIZE * 2)
    let numberOfCols = tileset.width / (SIZE * 2)

    for (let row = 1; row <= numberOfRows; row++) {
        for (let col = 1; col <= numberOfCols; col++) {
            animations['S' + tilesetNumber + '-C' + col + '-R' + row + '-B1'] = count
            animations['S' + tilesetNumber + '-C' + col + '-R' + row + '-B2'] = count + 1
            animations['S' + tilesetNumber + '-C' + col + '-R' + row + '-B3'] = count + numberOfCols * 2
            animations['S' + tilesetNumber + '-C' + col + '-R' + row + '-B4'] = count + numberOfCols * 2 + 1
            count += 2
        }
        count += numberOfCols * 2
    }
    tilesetNumber++
}

initAnimations(MapTileset)

export const TILESET = {
    images,
    frames: {
        width: SIZE,
        height: SIZE
    },
    animations
}
