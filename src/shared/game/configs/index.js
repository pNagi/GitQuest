import {MapTileset, ObjectTileset, PlayerTileset} from 'shared/game/configs/Tilesets'

export const SIZE = 16

let images = []
let animations = {}
let tilesetNumber = 1
let count = 0

let initFrames = (tileset) => {
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

let convertToAnimation = (frames) => {
    return {
        frames: frames,
        speed: 0.05
    }
}

let initAnimations = (tileset) => {
    images.push(tileset.img)

    let numberOfRows = tileset.height / (SIZE * 2)
    let numberOfCols = tileset.width / (SIZE * 2)

    for (let row = 1; row <= numberOfRows / 2; row++) {
        for (let col = 1; col <= numberOfCols; col++) {
            animations['S' + tilesetNumber + '-C' + col + '-R' + row + '-B1'] = convertToAnimation([count, count + numberOfCols * 4])
            animations['S' + tilesetNumber + '-C' + col + '-R' + row + '-B2'] = convertToAnimation([count + 1, count + 1 + numberOfCols * 4])
            animations['S' + tilesetNumber + '-C' + col + '-R' + row + '-B3'] = convertToAnimation([count + numberOfCols * 2, count + numberOfCols * 6])
            animations['S' + tilesetNumber + '-C' + col + '-R' + row + '-B4'] = convertToAnimation([count + 1 + numberOfCols * 2, count + 1 + numberOfCols * 6])
            count += 2
        }
        count += numberOfCols * 6
    }
    tilesetNumber++
}

initFrames(MapTileset)
initFrames(PlayerTileset)
initAnimations(ObjectTileset)

export const TILESET = {
    images,
    frames: {
        width: SIZE,
        height: SIZE
    },
    animations
}
