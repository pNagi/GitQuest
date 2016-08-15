import Container from 'shared/game/components/Container'

import {DIRECTORY} from 'shared/game/configs/Types'
import {SIZE} from 'shared/game/configs'

export default class Directory extends Container {

    constructor(name) {
        super(DIRECTORY)
        this._container.height = (this.numberOfRows - 2) * SIZE

        this._name = name
        let text = new createjs.Text(name, '12px Arial', '#eee')
        text.textBaseline = 'alphabetic'
        text.y = (this._grid.length - 1) * 16
        this._container.addChild(text)
    }

    get name() {
        return this._name
    }
}
