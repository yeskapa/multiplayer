var keysDown = new Map()

addEventListener("keydown", function(e) {
    keysDown.set(e.key.toLowerCase(), true)
})

addEventListener("keyup", function(e) {
    keysDown.set(e.key.toLowerCase(), false)
})

function handleInput() {
    if (keysDown.get("a")) player.velocity.x -= playerSpeed
    if (keysDown.get("d")) player.velocity.x += playerSpeed
    if ((keysDown.get(" ") || keysDown.get("w")) && player.onGround) player.velocity.y -= playerJumpPower
}