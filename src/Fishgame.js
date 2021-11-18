import Phaser from "phaser"

export default class Fishgame extends Phaser.Scene {

  preload(){

  }

  create(){
  const text = this.add.text(400, 250, "Hello all")
  text.setOrigin(0.5, 0.5)

  }

  update(){

  }
}