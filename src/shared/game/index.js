import Player from 'shared/game/player'
import MapGenerator from 'shared/game/map'
import * as KeyCode from 'shared/game/constants/keyCodes'

var speed = 3
var width = 32
var height = 32

exports.start = (user, repo, path = '') => {
    loadMap(user, repo, path)
}

var base = 'https://api.github.com/repos/'

var getUrl = (user, repo, path) => {
    return base + user + '/' + repo + '/contents/' + path
}

var handleFileLoad = (event) => {
    console.log(event.result)
    init(event.result)
}

var handleComplete = (event) => {}

var loadMap = (user, repo, path) => {
    var queue = new createjs.LoadQueue()
    queue.on('fileload', handleFileLoad, this)
    queue.on('complete', handleComplete, this)
    queue.loadFile({
        src: getUrl(user, repo, path),
        type: createjs.AbstractLoader.JSON
    })

    queue.load()
}

var init = (repo) => {
    var canvas = document.getElementById('canvas')

    canvas.width = window.innerWidth - 16;
    // canvas.height = window.innerHeight - 16;

    var stage = new createjs.Stage(canvas)

    var player = Player.init()
    player.x = (canvas.width - width) / 2
    player.y = (canvas.height - height) / 2

    var map = MapGenerator.init(repo)

    var d = [0, 0, 0, 0]

    var talk = () => {
        console.log('talk')
        loadMap('pnagi', 'Lecture', 'Algorithm')
    }

    var getAction = function(e) {
        switch (e.keyCode) {
            case KeyCode.ENTER:
                talk()
                break
            case KeyCode.SPACE:
                talk()
                break
            case KeyCode.KEY_LEFT:
                if (player.currentAnimation != 'walkleft')
                    player.gotoAndPlay('walkleft')
                break
            case KeyCode.KEY_UP:
                if (player.currentAnimation != 'walkup')
                    player.gotoAndPlay('walkup')
                break
            case KeyCode.KEY_RIGHT:
                if (player.currentAnimation != 'walkright')
                    player.gotoAndPlay('walkright')
                break
            case KeyCode.KEY_DOWN:
                if (player.currentAnimation != 'walkdown')
                    player.gotoAndPlay('walkdown')
                break
        }
    }

    var stopWalkAnimation = function(e) {
        switch (e.keyCode) {
            case KeyCode.KEY_LEFT:
                if (player.currentAnimation == 'walkleft')
                    player.gotoAndStop('left')
                break
            case KeyCode.KEY_UP:
                if (player.currentAnimation == 'walkup')
                    player.gotoAndStop('up')
                break
            case KeyCode.KEY_RIGHT:
                if (player.currentAnimation == 'walkright')
                    player.gotoAndStop('right')
                break
            case KeyCode.KEY_DOWN:
                if (player.currentAnimation == 'walkdown')
                    player.gotoAndStop('down')
                break
        }
    }

    var _setD = function(e, d1, d2) {
        if (!e) {
            e = window.event
        }
        switch (e.keyCode) {
            case KeyCode.KEY_LEFT:
                return d[0] = d1
            case KeyCode.KEY_UP:
                return d[1] = d1
            case KeyCode.KEY_RIGHT:
                return d[2] = d2
            case KeyCode.KEY_DOWN:
                return d[3] = d2
        }
    }

    var currentPressed = ''

    document.onkeydown = (e) => {
        console.log('keydown:' + e.keyCode)
        if (currentPressed == '') {
            currentPressed = e.keyCode
            getAction(e)
            return _setD(e, -1 * speed, speed)
        }
    }

    document.onkeyup = (e) => {
        console.log('keyup:' + e.keyCode)
        if (e.keyCode == currentPressed) {
            currentPressed = ''
            stopWalkAnimation(e)
            console.log('player:' + player.x + ', ' + player.y)
            return _setD(e, 0, 0)
        }
    }

    var wall = {
        left: 0,
        top: canvas.height - height,
        right: canvas.width - width,
        bottom: 0
    }

    window.tick = function() {
        player.x += d[0] + d[2]
        if (player.x < wall.left) {
            player.x = wall.left
        }
        if (player.x > wall.right) {
            player.x = wall.right
        }

        player.y += d[1] + d[3]
        if (player.y < wall.bottom) {
            player.y = wall.bottom
        }
        if (player.y > wall.top) {
            player.y = wall.top
        }

        return stage.update()
    }

    createjs.Ticker.addEventListener('tick', window.tick)
    createjs.Ticker.useRAF = true
    createjs.Ticker.setFPS(60)

    stage.addChild(map)
    stage.addChild(player)
    stage.update()
}
