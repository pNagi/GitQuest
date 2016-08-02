import GameObject from 'shared/game/components/GameObject'

export default class Directory extends Container {

    constructor(grid, name) {
        super(grid)

        let text = new createjs.Text(name, '15px Arial', '#eee')
        text.textBaseline = 'alphabetic'
        text.y = (this._grid.length + 1) * 16
        this._container.addChild(text)
    }
}
