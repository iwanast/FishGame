import Phaser from "phaser";
import jellyfishSrc from "../assets/jellyfish.png";
import bagSrc from "../assets/bag.png";
import plasticbottleSrc from "../assets/plasticbottle.png";
import oceanSrc from "../assets/ocean.png";
import fishSrc from "../assets/fish.png";

let plasticbag1, jellyfish, ocean, center, plasticbottle1, timerText, fish, fishCursors;

let isNotRunning = false;

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
      center.x - 100,
      center.y - 100,
      "jellyfish"
    );

    plasticbottle1 = this.physics.add.sprite(
      center.x + 50,
      center.y + 40,
      "plasticbottle"
    );
    plasticbottle1.setScale(0.3);

    plasticbag1 = this.physics.add.sprite(
      center.x + 100,
      center.y + 100,
      "plasticbag"
    );
    plasticbag1.setScale(0.4);

    fish = this.add.sprite(center.x - 500, center.y - 250, "fish");
    fish.setScale(0.8);
    // setting cursors for fish 
    fishCursors = this.input.keyboard.createCursorKeys();

    // Timer with a function onEvent
    this.timedEvent = this.time.delayedCall(10000, this.onEvent, [], this);
    timerText = this.add.text(center.x, 10); // the text for the timer
  }

  update() {
    
    // if (window.game.input.mousePointer.isDown) {
    //   console.log('ok');
    //   //  400 is the speed it will move towards the mouse
    //   window.game.physics.arcade.moveToPointer(fish, 400);
    // }
    
    // Making the fish move up and down with arrows
    if (fishCursors.up.isDown) {
      console.log('up');
      fish.y -= 2;
      //fish.setVelocity(0, -200);
      //fish.anims.play('up', true);
    }
    if (fishCursors.down.isDown) {
      console.log('down');
      fish.y += 2;
      //fish.setVelocity(0, 200)
    }
    if (fishCursors.right.isDown) {
      console.log('right');
      fish.x += 2;
      //fish.setVelocity(200, 0)
    }
    if (fishCursors.left.isDown) {
      console.log('left');
      fish.x -= 2;
      //fish.setVelocity(-200, 0)
    }

    // Timer direct running when all loaded and displayed here.
    timerText.setText(
      "Time left: " +
        this.timedEvent.getRemainingSeconds().toString().substr(0, 4)
    );

    if (!isNotRunning) {
      // Here the game in with the movements.
    }
  }

  // onEvent() {
  //   isNotRunning = true;
  //   this.scene.start("Score");
  // }
}
