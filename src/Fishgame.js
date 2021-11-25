import Phaser from "phaser";
import jellyfishSrc from "../assets/jellyfish.png";
import bagSrc from "../assets/bag.png";
import plasticbottleSrc from "../assets/plasticbottle.png";
import oceanSrc from "../assets/ocean.png";
import fishSrc from "../assets/fish.png";

let plasticbag1,
  plasticbag2,
  plasticbag3,
  jellyfish,
  ocean,
  center,
  plasticbottle1,
  plasticbottle2,
  plasticbottle3,
  timerText,
  fish,
  userScore,
  fishCursors;

 
let isNotRunning = false;

// For the scores
userScore = 3;
sessionStorage.setItem("score", 0); // Prepare the sessionStorage

export default class FishgameScene extends Phaser.Scene {
  constructor() {
    super("Game");
  }

  preload() {
    this.load.image("plasticbag", bagSrc);
    this.load.image("jellyfish", jellyfishSrc);
    this.load.image("ocean", oceanSrc);
    this.load.image("plasticbottle", plasticbottleSrc);
    this.load.image("fish", fishSrc);
  }

  create() {
    center = {
      x: this.physics.world.bounds.width / 2,
      y: this.physics.world.bounds.height / 2,
    };

    ocean = this.physics.add.image(center.x, center.y, "ocean");
    ocean.setScale(0.1);

    jellyfish = this.physics.add.sprite(
      center.x - 40,
      center.y - 70,
      "jellyfish"
    );
    jellyfish.setScale(0.5);

    plasticbottle1 = this.physics.add.sprite(
      center.x + 50,
      center.y + 40,
      "plasticbottle"
    );
    plasticbottle1.setScale(0.1);

    plasticbottle2 = this.physics.add.sprite(
      center.x + 400,
      center.y + 200,
      "plasticbottle"
    );
    plasticbottle2.setScale(0.1);

    plasticbottle3 = this.physics.add.sprite(
      center.x + 179,
      center.y + 430,
      "plasticbottle"
    );
    plasticbottle3.setScale(0.1);

    plasticbag1 = this.physics.add.sprite(
      center.x + 100,
      center.y + 100,
      "plasticbag"
    );
    plasticbag1.setScale(0.2);

    plasticbag2 = this.physics.add.sprite(
      center.x + 50,
      center.y + 360,
      "plasticbag"
    );
    plasticbag2.setScale(0.2);

    plasticbag3 = this.physics.add.sprite(
      center.x + 300,
      center.y + 300,
      "plasticbag"
    );
    plasticbag3.setScale(0.2);

    fish = this.physics.add.sprite(center.x - 500, center.y - 250, "fish");
    fish.setScale(0.8);
    fish.setBodySize(100, 100, true);
    // setting cursors for fish
    fishCursors = this.input.keyboard.createCursorKeys();

    // Timer with a function onEvent
    this.timedEvent = this.time.delayedCall(1000, this.onEvent, [], this);
    timerText = this.add.text(center.x, 10); // the text for the timer

    //so the fish cant escape the screen
    fish.setCollideWorldBounds(true);
  }

  update() {
    // Making the fish move up and down with arrows
    if (fishCursors.up.isDown) {
      //console.log("up");
      fish.y -= 2;
    }
    if (fishCursors.down.isDown) {
      //console.log("down");
      fish.y += 2;
    }
    if (fishCursors.right.isDown) {
      //console.log("right");
      fish.x += 2;
    }
    if (fishCursors.left.isDown) {
      //console.log("left");
      fish.x -= 2;
    }
 
    // eliminates the bottle on contact
    this.physics.add.collider(fish, plasticbottle1, function () {
      plasticbottle1.destroy();
    });

    // Timer direct running when all loaded and displayed here.
    timerText.setText(
      "Time left: " +
        this.timedEvent.getRemainingSeconds().toString().substr(0, 4)
    );

    if (!isNotRunning) {
      // Here the game in with the movements.
    }
  }

  onEvent() {
    isNotRunning = true; 
    // Saving the userScore to sessionStorage
    sessionStorage.setItem("score", userScore);
    console.log("onEvent Fishgame")
      this.scene.start("Score");
  }
}
