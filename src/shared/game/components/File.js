import Container from 'shared/game/components/Container'
import {FILE, UNKNOWN} from 'shared/game/configs/Types'

export default class File extends Container {

    constructor(name, type) {
        super(FILE[type] || UNKNOWN)

        this._name = name
        let text = new createjs.Text(name, '12px Arial', '#eee')
        text.textBaseline = 'alphabetic'
        text.y = (this._grid.length + 1) * 16
        this._container.addChild(text)
    }

    get name() {
        return this._name
    }
}
