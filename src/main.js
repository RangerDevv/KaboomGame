import kaboom from "kaboom"
kaboom({
	background:[215,155,25]
  })

loadAseprite("Player", "sprites/player/playerFront.svg")
loadAseprite("turnLeft", "sprites/player/playerTurnLeft.svg")
loadAseprite("turnRight", "sprites/player/playerTurnRight.svg")
loadAseprite("Back", "sprites/player/playerBack.svg")

const player=add([
    sprite("Player"),
    pos(80, 40),
	"player",
	LEFT = -100,
	RIGHT = 100,
	UP = -100,
	DOWN = 100,
	area(),
	solid(),
	{health : 100}
])
const border1 = add([
    rect(width(), 48),
    pos(0, height()-48),
    outline(4),
	"rectangle",
    area(),
    solid(),
    color(127, 200, 255),
])
const border2 = add([
    rect(width(), 48),
    pos(0, 0),
    outline(4),
	"rectangle",
    area(),
    solid(),
    color(127, 200, 255),
])
const border3 = add([
    rect(48 , height()),
    pos(0 , 0),
    outline(4),
	"rectangle",
    area(),
    solid(),
    color(127, 200, 255),
])
const border4 = add([
    rect(48 , height()),
    pos(width() -48, 0),
    outline(4),
	"rectangle",
    area(),
    solid(),
    color(127, 200, 255),
])
add([
    rect(48 , height()),
    pos(width() -48, 0),
    outline(4),
	"rectangle",
    area(),
    solid(),
    color(127, 200, 255),
])

onKeyDown("left", () => {
    player.move(LEFT, 0)
	player.use(sprite("turnLeft"))
})
onKeyDown("right", () => {
    player.move(RIGHT, 0)
	player.use(sprite("turnRight"))
})
onKeyDown("up", () => {
    player.move(0, UP)
	player.use(sprite("Back"))
})
onKeyDown("down", () => {
    player.move(0, DOWN)
	player.use(sprite("Player"))
})

player.onCollide("rectangle", () => {
	shake()
    console.log(player.health)
	// destroyAll("rectangle")
})

