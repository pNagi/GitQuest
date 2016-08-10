import Container from 'shared/game/components/Container'
import {DIRECTORY} from 'shared/game/configs/Types'

export default class Directory extends Container {

    constructor(name) {
        super(DIRECTORY)

        let text = new createjs.Text(name, '12px Arial', '#eee')
        text.textBaseline = 'alphabetic'
        text.y = (this._grid.length - 1) * 16
        this._container.addChild(text)
    }
}
