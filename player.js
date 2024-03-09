class Player {
    constructor(x, y, vx, vy) {
        this.serverPosition = {
            x:x,
            y:y
        }
        this.position = {
            x:x,
            y:y
        }
        this.velocity = {
            x:vx,
            y:vy
        }

        this.onGround = false
    }

    update() {
        handleInput()
        player.velocity.y += gravity

        player.velocity.x *= playerFriction
        player.velocity.y *= playerFriction

        player.position.x += player.velocity.x
        player.position.y += player.velocity.y

        player.onGround = false

        if (player.position.x + playerSize / 2 > bounds.width) {
            player.position.x = bounds.width - playerSize / 2
            player.velocity.x = 0
        }
        if (player.position.x - playerSize / 2 < 0) {
            player.position.x = playerSize / 2
            player.velocity.x = 0
        }
        if (player.position.y + playerSize / 2 > bounds.height) {
            player.position.y = bounds.height - playerSize / 2
            player.velocity.y = 0
            player.onGround = true
        }
        if (player.position.y - playerSize / 2 < 0) {
            player.position.y = playerSize / 2
            player.velocity.y = 0
        }

        if (socket.readyState == 1) {
            if (distance(player.serverPosition, player.position) > playerSize / 2) {
                socket.send(JSON.stringify(player.position))
                player.serverPosition.x = player.position.x
                player.serverPosition.y = player.position.y
            }
        }
    }

    draw() {
        ctx.fillStyle = "#fff"
        ctx.fillRect(this.position.x - playerSize / 2 + boundOffset.x, this.position.y - playerSize / 2 + boundOffset.y, playerSize, playerSize)
    }
}

function distance(a, b) {
    return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2)
}