import Phaser from "phaser";

export default { 
  type: Phaser.AUTO,
  parent: "project3",
  width: window.innerWidth,
  height: window.innerHeight,
  physics: {
        default: "arcade",
        arcade: {
          gravity: false,
          //gravity: { y: 5 },
        }
  }
}
