import {SIZE} from 'shared/game/configs'

export default class Camera {
    constructor() {
        this.numberOfCols = Math.floor((window.innerWidth - 16) / SIZE / 2) * 2
        this.numberOfRows = Math.floor((window.innerHeight - 16) / SIZE / 2) * 2
        this._horizontalSpeed = 0
        this._verticalSpeed = 0

        this.x = 0
        this.y = 0
        console.log('camera', this.numberOfCols, this.numberOfRows)
    }

    get width() {
        return this.numberOfCols * SIZE
    }

    get height() {
        return this.numberOfRows * SIZE
    }
}
