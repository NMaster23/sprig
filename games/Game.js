/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Game
@description: 
@author: 
@tags: ['tag1', 'tag2']
@addedOn: 2025-00-00
*/

const player = "p"
const bot = "b"
const projectile = "m"

setLegend(
  [ player, bitmap`
....L......L....
....L..LL..L....
......L..L......
.....L....L.....
....L......L....
....LLLLLLLL....` ],
  [ bot, bitmap`
....00000000....
....0......0....
.....0....0.....
......0..0......
....0..00..0....
....0......0....` ],
  [ projectile, bitmap`
.......33.......
.......33.......
.......33.......
.......33.......
.......33.......` ],
)
let level = 0
const levels = [
  map`
bbbbbbbbbb
..........
..........
..........
p.........`
]

setMap(levels[level])

onInput("a", () => {
  getFirst(player).x -= 1.0;
})
onInput("d", () => {
  getFirst(player).x += 1.0;
})
onInput("j", () => {
  const p = getFirst(player)
  addSprite(p.x, p.y, projectile)
})

setInterval(() => {
  const bullets = getAll(projectile)
  const bots = getAll(bot)
  const p = getFirst(player)
  for (const a of bots) {
    a.y += 1
    if (a.y == 4) {
      a.remove()
      p.remove()
      for (const b of bullets) {
        b.remove()
      }
      addText("Game Over", {
        x: 5,
        y: 6,
        color: color`3`,
      })
    }
  }
}, 1000)

setInterval(() => {
  const bullets = getAll(projectile)
  for (const b of bullets) {
    b.y -= 1
    if (b.y < 0) b.remove()
  }
  const hits = tilesWith(projectile, bot)
  for (const tile of hits) {
    for (const s of tile) {
      if (s.type === projectile || s.type === bot) {
        s.remove()
      }
    }
  }
}, 500)