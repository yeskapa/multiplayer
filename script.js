var can
var ctx

const playerSpeed = 1

var player = {x:0, y:0}
var otherPlayers = []

const socket = new WebSocket('wss://arcane-sands-37817-c448646235e1.herokuapp.com/')

socket.onmessage = function(event) {
    if (event.data == "ping") return
    otherPlayers = JSON.parse(event.data)
}

socket.onopen = function(event) {
    console.log('WebSocket connection opened')
}

socket.onclose = function(event) {
    console.log('WebSocket connection closed')
}

window.onload = function() {
    can = document.getElementById("canvas")
    ctx = can.getContext("2d")

    resizeCanvas()

    update()
}

window.onresize = function() {
    resizeCanvas()
}

var keysDown = new Map()

addEventListener("keydown", function(e) {
    keysDown.set(e.key.toLowerCase(), true)
})

addEventListener("keyup", function(e) {
    keysDown.set(e.key.toLowerCase(), false)
})

function drawPlayer(p) {
    ctx.fillStyle = "#fff"
    ctx.fillRect(p.x, p.y, 50, 50)
}

function resizeCanvas() {
    can.width = innerWidth
    can.height = innerHeight
}

function handleInput() {
    if (keysDown.get("w")) player.y -= playerSpeed
    if (keysDown.get("a")) player.x -= playerSpeed
    if (keysDown.get("s")) player.y += playerSpeed
    if (keysDown.get("d")) player.x += playerSpeed
}

function update() {
    ctx.fillStyle = "#000"
    ctx.fillRect(0, 0, innerWidth, innerHeight)

    handleInput()

    drawPlayer(player)
    for (var i = 0; i < otherPlayers.length; i++) {
        drawPlayer(otherPlayers[i])
    }

    window.requestAnimationFrame(update)
}

setInterval(() => {
    if (socket.readyState == 1) socket.send(JSON.stringify(player))
}, 1000);