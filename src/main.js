import Phaser from "phaser"

import Fishgame from "./Fishgame"

const config = {
  width: 800,
  height: 600,
  type: Phaser.AUTO,
  scene: [ Fishgame],
  physics: {
    default: "arcade",
    arcade: {
      gravity: false,
      //gravity: { y: 5 },
    }
  }
}

const game = new Phaser.Game(config)

game.scene.add("fishgame", Fishgame)

game.scene.start("fishgame")