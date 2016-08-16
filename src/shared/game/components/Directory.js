import Container from 'shared/game/components/Container'

import {DIRECTORY} from 'shared/game/configs/Types'
import {SIZE} from 'shared/game/configs'

export default class Directory extends Container {

    constructor(info) {
        super(DIRECTORY)
        this._container.height = (this.numberOfRows - 2) * SIZE

        this._info = info
        let text = new createjs.Text(this._info.name, '12px Arial', '#eee')
        text.textBaseline = 'alphabetic'
        text.y = (this._grid.length - 1) * 16
        this._container.addChild(text)
    }

    press() {
        return this._name
    }

    stepOver() {
        return this._info.path
    }
}
