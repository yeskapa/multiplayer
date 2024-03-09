function drawPlayer(p) {
    ctx.fillStyle = "#fff"
    ctx.fillRect(p.x - playerSize / 2 + boundOffset.x, p.y - playerSize / 2 + boundOffset.y, playerSize, playerSize)
}

function drawBounds() {
    ctx.strokeStyle = "#2a2a2a"
    ctx.beginPath()
    ctx.moveTo(boundOffset.x, boundOffset.y)
    ctx.lineTo(bounds.width + boundOffset.x, boundOffset.y)
    ctx.lineTo(bounds.width + boundOffset.x, bounds.height + boundOffset.y)
    ctx.lineTo(boundOffset.x, bounds.height + boundOffset.y)
    ctx.closePath()
    ctx.stroke()
}