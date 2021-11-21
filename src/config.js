import Phaser from "phaser";

export default { 
  type: Phaser.AUTO,
  parent: "project3",
  width: 800,
  height: 600,
  physics: {
        default: "arcade",
        arcade: {
          gravity: false,
          //gravity: { y: 5 },
        }
  }
}
