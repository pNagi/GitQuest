import {SIZE} from 'shared/game/configs'

export default class InformationWindow {

    constructor(width, height) {
        this._window = new createjs.Container()
        this._createRect(width, height)
        this._createText()
    }

    _createRect(width, height) {
        this._rect = new createjs.Shape()
        this._rect.graphics.beginFill('#776787')
        this._rect.graphics.drawRoundRect(0, 0, width - 40, height - 20, 5)
        this._rect.graphics.endFill()
        this._rect.alpha = 0.5
        this.setRectPosition(20, 10)

        this._window.addChild(this._rect)
    }

    _createText() {
        this._text = new createjs.Text('Hello...', '15px Arial', '#fff')
        this._text.textBaseline = 'alphabetic'
        this.setTextPosition(20, 30)

        this._window.addChild(this._text)
    }

    setPosition(x, y) {
        this._window.x = x
        this._window.y = y
    }

    setRectPosition(x, y) {
        this._rect.x = x
        this._rect.y = y
    }

    setTextPosition(x, y) {
        this._text.x = this._rect.x + x
        this._text.y = this._rect.y + y
    }

    setText(information) {
        this._text.text = information
    }

    set visible(visible) {
        this._window.visible = visible
    }

    get visible() {
        return this._window.visible
    }

    get sprite() {
        return this._window
    }
}
