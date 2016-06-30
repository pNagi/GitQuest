import Player from 'shared/game/player'
import * as PlayerMovement from 'shared/game/player/movement'
import MapGenerator from 'shared/game/map'
import * as API from 'shared/game/constants/API'

var speed = 3,
    width = 32,
    height = 32,
    canvas,
    stage,
    player,
    map

exports.start = (user, repo, path = '') => {
    initStage()
    initPlayer()
    loadMap(user, repo, path)
}

var initStage = () => {
    canvas = document.getElementById('canvas')
    canvas.width = window.innerWidth - 16;
    canvas.height = window.innerHeight * 3/4 - 16;

    stage = new createjs.Stage(canvas)
    stage.snapToPixelEnabled = true;
}

var initPlayer = () => {
    player = Player.init()
    player.x = (canvas.width - width) / 2
    player.y = (canvas.height - height) / 2
}

var handleFileLoad = (event) => {
    console.log('handle file load')
    initMap(event.result)
}

var loadMap = (user, repo, path) => {
    console.log('load map')
    var queue = new createjs.LoadQueue()
    queue.on('fileload', handleFileLoad, this)
    queue.loadFile({
        src: API.getUrl(user, repo, path),
        type: createjs.AbstractLoader.JSON
    })

    queue.load()
}

var initMap = (repo) => {
    console.log('init map')
    map = MapGenerator.init(repo)
    initActions()
    console.log('add children')
    stage.addChild(map)
    stage.addChild(player)

    var infoWindow = new createjs.Container()

    var rect = new createjs.Shape()
    rect.graphics.beginFill('#776787')
    rect.graphics.drawRoundRect(0, 0, canvas.width - 30, canvas.height / 4, 5)
    rect.graphics.endFill()
    rect.alpha = 0.5
    rect.x = -20
    rect.y = -10

    infoWindow.x = 35
    infoWindow.y = (canvas.height * 3/4)

    var text = new createjs.Text('Hello World', '15px Arial', '#fff')
    text.textBaseline = 'alphabetic'
    text.y = 15

    infoWindow.addChild(rect)
    infoWindow.addChild(text)
    stage.addChild(infoWindow)

    infoWindow.visible = false

    PlayerMovement.init(player, map)

    stage.update()
}

var initActions = () => {
    var d = [0, 0, 0, 0]

    var currentPressed = ''

    document.onkeydown = (e) => {
        if (currentPressed == '') {
            currentPressed = e.keyCode
            PlayerMovement.playAnimation(e)
            return PlayerMovement.setSpeed(e, -1 * PlayerMovement.SPEED, PlayerMovement.SPEED)
        }
    }

    document.onkeyup = (e) => {
        if (e.keyCode == currentPressed) {
            currentPressed = ''
            PlayerMovement.stopAnimation(e)
            console.log('player:' + player.x + ', ' + player.y)
            return PlayerMovement.setSpeed(e, 0, 0)
        }
    }

    var tick = () => {
        PlayerMovement.move()

        return stage.update()
    }

    createjs.Ticker.addEventListener('tick', tick)
    createjs.Ticker.useRAF = true
    createjs.Ticker.setFPS(60)
}
