import Phaser from "phaser"
import jellyfishSrc from "../assets/jellyfish.png"
import bagSrc from "../assets/bag.png"
import plasticbottleSrc from "../assets/plasticbottle.png"
import oceanSrc from "../assets/ocean.png"

let plasticbag1, jellyfish, ocean, center, plasticbottle1, timerText; 

let isNotRunning = false;

export default class FishgameScene extends Phaser.Scene {

  constructor() {
    super("Game");
  }
  
  preload(){
    this.load.image("plasticbag", bagSrc);
    this.load.image("jellyfish", jellyfishSrc);
    // this.load.image("ocean", oceanSrc);
    this.load.image("plasticbottle", plasticbottleSrc);
  };

  create(){
    center = {
      x: this.physics.world.bounds.width / 2,
      y: this.physics.world.bounds.height / 2
    };

    // ocean = this.physics.add.image(center.x, center.y, "ocean");
    // ocean.setScale(.1);
    jellyfish = this.physics.add.sprite(center.x -100, center.y- 100, "jellyfish");

    plasticbottle1 = this.physics.add.sprite(center.x + 50, center.y + 40, "plasticbottle");
    plasticbottle1.setScale(0.3);

    plasticbag1 = this.physics.add.sprite(center.x + 100, center.y + 100, "plasticbag");
    plasticbag1.setScale(0.4);

    // Timer with a function onEvent
    this.timedEvent = this.time.delayedCall(1000, this.onEvent, [], this);
    timerText = this.add.text(center.x, 10); // the text for the timer
    
  }

  update(){
    // Timer direct running when all loaded and displayed here. 
    timerText.setText('Time left: ' + this.timedEvent.getRemainingSeconds().toString().substr(0, 4));
  
    if(!isNotRunning){
      // Here the game in with the movements.

    }
  }
 
  onEvent () {
  isNotRunning = true; 
    this.scene.start("Score");
}


}
