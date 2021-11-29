import Phaser from "phaser";

import config from "./config"
import FishgameScene from "./Fishgame";
import IntroScene from "./Intro";
import ScoreScene from "./Score";

class Game extends Phaser.Game {
  constructor() {
    super(config);
    this.scene.add("Game", FishgameScene);
    this.scene.add("Intro", IntroScene);
    this.scene.add("Score", ScoreScene);
    // This decides what the first scene will be
    this.scene.start("Intro");
  }
}

window.game = new Game();
