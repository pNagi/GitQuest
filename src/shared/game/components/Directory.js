import Container from 'shared/game/components/Container'
import * as Types from 'shared/game/configs/'

export default class Directory extends Container {

    constructor(name) {
        super(Types.DIRECTORY)

        let text = new createjs.Text(name, '15px Arial', '#eee')
        text.textBaseline = 'alphabetic'
        text.y = (this._grid.length + 1) * 16
        this._container.addChild(text)
    }
}
