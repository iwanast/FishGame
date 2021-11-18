import Phaser from "phaser"

import Fishgame from "./Fishgame"

const config = {
  width: 800,
  height: 500,
  type:Phaser.AUTO
}

const game = new Phaser.Game(config)

game.scene.add("fishgame", Fishgame)

game.scene.start("fishgame")