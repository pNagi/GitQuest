import Container from 'shared/game/components/Container'
import {FILE, UNKNOWN} from 'shared/game/configs/Types'

export default class File extends Container {

    constructor(info, type) {
        super(FILE[type] || UNKNOWN)

        this._info = info
        let text = new createjs.Text(this._info.name, '10px Arial', '#eee')
        text.textBaseline = 'alphabetic'
        text.y = (this._grid.length) * 16 + 8
        this._container.addChild(text)
    }

    press() {
        return this._info.name
    }
}
