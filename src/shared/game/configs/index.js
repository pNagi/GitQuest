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
    console.log(numberOfCols, numberOfRows)

    for (let row = 1; row <= Math.ceil(numberOfRows); row++) {
        let next = 1
        for (let col = 1; col <= numberOfCols; col++) {
            animations['S' + tilesetNumber + '-C' + col + '-R' + row + '-B1'] = count
            animations['S' + tilesetNumber + '-C' + col + '-R' + row + '-B2'] = count + 1
            if (row + 0.5 < numberOfRows) {
                animations['S' + tilesetNumber + '-C' + col + '-R' + row + '-B3'] = count + numberOfCols * 2
                animations['S' + tilesetNumber + '-C' + col + '-R' + row + '-B4'] = count + numberOfCols * 2 + 1
                next = 2
            }
            count += 2
        }
        count += numberOfCols * next
    }
    tilesetNumber++
}

initAnimations(MapTileset)
console.log(count)
console.log('Tileset Number', tilesetNumber)
initAnimations(PlayerTileset)
console.log(count)

console.log(images)
console.log(animations)

export const TILESET = {
    images,
    frames: {
        width: SIZE,
        height: SIZE
    },
    animations
}
