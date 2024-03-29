import kaboom from "kaboom"
kaboom({
	background:[215,155,25]
  })

let currDiag = 0

loadAseprite("Player", "sprites/player/playerFront.svg")
loadAseprite("turnLeft", "sprites/player/playerTurnLeft.svg")
loadAseprite("turnRight", "sprites/player/playerTurnRight.svg")
loadAseprite("Back", "sprites/player/playerBack.svg")
loadAseprite("sChest", "sprites/Items/smallChest.svg")


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
	{
        health : 100,
        Holding : false
    }
])
const border1 = add([
    rect(width(), 48),
    pos(0, height()-48),
	"rectangle",
    area(),
    solid(),
    color(127, 200, 255),
])
const border2 = add([
    rect(width(), 48),
    pos(0, 0),
	"rectangle",
    area(),
    solid(),
    color(127, 200, 255),
])
const border3 = add([
    rect(48 , height()),
    pos(0 , 0),
	"rectangle",
    area(),
    solid(),
    color(127, 200, 255),
])
const border4 = add([
    rect(48 , height()),
    pos(width() -48, 0),
	"rectangle",
    area(),
    solid(),
    color(127, 200, 255),
])

addLevel([
    "                           ",
    "                           ",
    "                           ",
    "                           ",
    "                      =    ",
    "                           ", 
    "                           ",
    "                           ",
    "                           ",
    "                           ",
    "                           ",
    "                           ",
    "                           ",
    "                           ",
], {
    // define the size of each block
    width: 32,
    height: 32,
    // define what each symbol means, by a function returning a component list (what will be passed to add())
    "=": () => [
        sprite("sChest"),
        area(),
        solid(),
        "Chest"
    ],
    // "$": () => [
    //     sprite("coin"),
    //     area(),
    //     pos(0, -9),
    // ],
    // "^": () => [
    //     sprite("spike"),
    //     area(),
    //     "danger",
    // ],
})

const dialogs = [
    [ "Trosky: Huh? Where am I? I have to get out of here as soon as possible. " ],
	[ "Trosky: I have to find something... a kay or a crowbar maybe?" ],
]

const dialogBox = add([
    rect(width() - 200, 120, { radius: 32 }),
    origin("center"),
    pos(center().x, height() - 100),
    // area(),
    // solid(),
    // color(127, 200, 255),
	"DiagBox"
])

const txt = add([
    text("Trosky: Huh? Where am I? I have to get out of here as soon as possible.", { size: 32, width: width() - 230 }),
    pos(dialogBox.pos),
    origin("center")
])

const avatar = add([
    sprite("Back"),
    scale(1),
    origin("right"),
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

onKeyPress("space", () => {
	txt.text = dialogs[currDiag]
	currDiag++
	if (currDiag>dialogs.length) {
		destroy(dialogBox)
		destroy(txt)
	}

})

player.onCollide("rectangle", () => {
	shake()
    console.log(player.health)
	// destroyAll("rectangle")
})

player.onCollide("Chest", () => {
    onKeyRelease("e", () => {
        // if (player.Holding == true) {
        //     readd(dialogBox)
        //     readd(txt)
        //     player.Holding = true
        //     dialogs.push("YES! I CAN ESCAPE!")
        //     txt.text = dialogs[dialogs.length -1]
        //     setTimeout(() => {
        //         destroy(dialogBox)
        //         destroy(txt)
        //         console.log(dialogs.toString)
        //         player.Holding = false
        //         destroy(player)
        //     }, 2000);
        // } else {
            readd(dialogBox)
            readd(txt)
            dialogs.push("I found a key!")
            txt.text = dialogs[dialogs.length -1]
            setTimeout(() => {
                destroy(dialogBox)
                destroy(txt)
                console.log(dialogs.toString)
                player.Holding = true
            }, 2000);
        // }
    })
})

