import Phaser from "phaser";

export default {
  type: Phaser.AUTO,
  parent: "game",
  width: window.innerWidth,
  height: window.innerHeight,
  dom: {
    createContainer: true,
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: false,
      debug: false,
      //gravity: { y: 5 },
    },
  },
};
