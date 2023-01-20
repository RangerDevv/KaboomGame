import kaboom from "kaboom"
kaboom()


let k = kaboom

loadAseprite("Player", "sprites/player/playerFront.svg")
loadAseprite("Turn", "sprites/player/playerTurn.svg")

const player=add([
    sprite("Player"),
    pos(80, 40),
	LEFT = -80,
	RIGHT = 80,
	UP = -80,
	DOWN = 60,
	area(),
	solid()
])

const rect = add([
    rect(width(), 48),
    pos(0, height() - 48),
    outline(4),
    area(),
    solid(),
    color(127, 200, 255),
])

onKeyDown("left", () => {
    player.move(LEFT, 0)
})
onKeyDown("right", () => {
    player.move(RIGHT, 0)
})
onKeyDown("up", () => {
    player.move(0, UP)
})
onKeyDown("down", () => {
    player.move(0, DOWN)
})

onCollide("player", "rect", () => {
    console.log("WOW!")
})