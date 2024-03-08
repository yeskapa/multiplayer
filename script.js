// var can
// var ctx

// var player = {x:0, y:0}
// var otherPlayers = []

// const socket = new WebSocket('https://arcane-sands-37817-c448646235e1.herokuapp.com/')

// socket.onmessage = function(event) {
//     const message = JSON.parse(event.data)
    
//     otherPlayers = message
// }

// socket.onopen = function(event) {console.log('WebSocket connection opened')}
// socket.onclose = function(event) {console.log('WebSocket connection closed')}

// window.onload = function() {
//     can = document.getElementById("canvas")
//     ctx = can.getContext("2d")

//     resizeCanvas()

//     update()
// }

// window.onresize = function() {
//     resizeCanvas()
// }

// addEventListener("keydown", function(e) {
//     if (e.key == "w") player.y -= 10
//     if (e.key == "a") player.x -= 10
//     if (e.key == "s") player.y += 10
//     if (e.key == "d") player.x += 10

//     socket.send(JSON.stringify(player))
// })

// function drawPlayer(p) {
//     ctx.fillStyle = "#fff"
//     ctx.fillRect(p.x, p.y, 50, 50)
// }

// function resizeCanvas() {
//     can.width = innerWidth
//     can.height = innerHeight
// }

// function update() {
//     ctx.fillStyle = "#000"
//     ctx.fillRect(0, 0, innerWidth, innerHeight)

//     drawPlayer(player)
//     for (var i = 0; i < otherPlayers.length; i++) {
//         drawPlayer(otherPlayers[i])
//     }


//     window.requestAnimationFrame(update)
// }

// Create a WebSocket connection
const socket = new WebSocket('https://arcane-sands-37817-c448646235e1.herokuapp.com/');

// Event handler for when the connection is established
socket.onopen = function(event) {
    console.log('WebSocket connection established');
};

// Event handler for receiving messages
socket.onmessage = function(event) {
    const message = event.data;
    console.log('Received message:', message);
};

// Event handler for when the connection is closed
socket.onclose = function(event) {
    console.log('WebSocket connection closed');
};

// Function to send a message
function sendMessage() {
    const message = document.getElementById('messageInput').value;
    socket.send(message);
}