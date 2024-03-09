var can
var ctx

const online = true
const playerSize = 20
const playerSpeed = 1
const playerFriction = 0.9
const playerJumpPower = 30
const gravity = 1

const boundOffset = {
    x:0,
    y:0
}
const bounds = {
    width:400,
    height:400
}

var player = new Player(0, 0, 0, 0)
var otherPlayers = []

var socket
if (online) {
    socket = new WebSocket('wss://arcane-sands-37817-c448646235e1.herokuapp.com/')
}

if (online) {
    socket.onmessage = function(event) {
        if (event.data == "ping") return
        otherPlayers = JSON.parse(event.data)
    }
    
    socket.onopen = function(event) {console.log('WebSocket connection opened')}
    socket.onclose = function(event) {console.log('WebSocket connection closed')}
}

window.onload = function() {
    can = document.getElementById("canvas")
    ctx = can.getContext("2d")

    boundOffset.x = innerWidth - bounds.width / 2
    boundOffset.y = innerHeight - bounds.height / 2

    resizeCanvas()

    update()
}

window.onresize = function() {
    resizeCanvas()
}

function resizeCanvas() {
    can.width = innerWidth
    can.height = innerHeight

    boundOffset.x = innerWidth / 2 - bounds.width / 2
    boundOffset.y = innerHeight / 2 - bounds.height / 2
}

function update() {
    ctx.fillStyle = "#000"
    ctx.fillRect(0, 0, innerWidth, innerHeight)

    player.update()
    player.draw()

    for (var i = 0; i < otherPlayers.length; i++) {
        drawPlayer(otherPlayers[i])
    }
    drawBounds()
}

setInterval(() => {
    update()
}, 1000 / 60);