import Phaser from "phaser";
import jellyfishSrc from "../assets/jellyfish.png";
import bagSrc from "../assets/bag.png";
import bottleSrc from "../assets/plasticbottle.png";
import oceanSrc from "../assets/ocean.png";
import fishSrc from "../assets/fish.png";
import turtleSrc from "../assets/turtle.png";
import soundSrc from "../assets/soundfx.wav";
import soundMunchingSrc from "../assets/fastMunching.wav";
import helmSrc from "../assets/helm.png";
import strawSrc from "../assets/straw.png";
import spoonSrc from "../assets/spoon.png";

let bag1,
  bag2,
  bag3,
  jellyfish,
  ocean,
  center,
  bottle1,
  bottle2,
  bottle3,
  timerText,
  fish,
  turtle,
  dontEatMeText,
  eatingSound,
  munchingSound,
  userScore,
  fishCursors,
  helm1,
  spoon1,
  spoon2,
  straw1;

 
let isNotRunning = false;

// For the scores
userScore = 3;
sessionStorage.setItem("score", 0); // Prepare the sessionStorage

export default class FishgameScene extends Phaser.Scene {
  constructor() {
    super("Game");
  }

  preload() {
    this.load.image("bag", bagSrc);
    this.load.image("jellyfish", jellyfishSrc);
    this.load.image("ocean", oceanSrc);
    this.load.image("bottle", bottleSrc);
    this.load.image("fish", fishSrc);
    this.load.image("turtle", turtleSrc);
    this.load.audio("sound", soundSrc);
    this.load.audio("soundMunching", soundMunchingSrc);
    this.load.image("helm", helmSrc);
    this.load.image("straw", strawSrc);
    this.load.image("spoon", spoonSrc);
  }

  create() {
    center = {
      x: this.physics.world.bounds.width / 2,
      y: this.physics.world.bounds.height / 2,
    };

    // Backgroundimage
    ocean = this.physics.add.image(center.x, center.y, "ocean");
    ocean.setDisplaySize(center.x * 2, center.y * 2);
    
    // Jellyfish
    jellyfish = this.physics.add.sprite(
      center.x + (center.x /2),
      center.y - (center.y /1.5),
      "jellyfish"
    );
    jellyfish.setDisplaySize(center.x / 4, center.y / 4);
    jellyfish.setBodySize(40, 40, true);
    
    //straw1
    straw1 = this.physics.add.sprite(
      center.x + (center.x /2),
      center.y,
      "straw"
    );
    straw1.scaleX = 0.2; 
    straw1.scaleY = straw1.scaleX; // this is to make the scale proportionally

    //Spoon1
    spoon1 = this.physics.add.sprite(
      center.x - (center.x /2),
      center.y + (center.y /1.5),
      "spoon"
    );
    spoon1.angle += 90; 
    spoon1.setBodySize(150, 30);

    //Spoon2
    spoon2 = this.physics.add.sprite(
      center.x - (center.x /1.7),
      center.y - (center.y /1.5),
      "spoon"
    );
    spoon2.angle = -90; 
    spoon2.setBodySize(150, 30);
    spoon2.scaleX = 0.4; 
    spoon2.scaleY = spoon2.scaleX; // this is to make the scale proportionally


    // bottle 1
    bottle1 = this.physics.add.sprite(
      center.x -(center.x /4),
      center.y -(center.y /6),
      "bottle"
    );
    bottle1.setDisplaySize(center.x/6, center.y / 6);
    //bottle1.setOrigin(0, 0.5); // from which point to rotate then (x, y)
    bottle1.angle += 90; 

    bottle2 = this.physics.add.sprite(
      center.x + 400,
      center.y + 200,
      "bottle"
    );
    bottle2.setScale(0.5);
    bottle2.angle += 130;

    bottle3 = this.physics.add.sprite(
      center.x + 179,
      center.y + 30,
      "bottle"
    );
    bottle3.setScale(0.3);

    bag1 = this.physics.add.sprite(
      center.x + center.x / 1.7,
      center.y * 2 - center.y / 7,
      "bag"
    );
    bag1.setScale(0.8);
    bag1.angle += 90;

    bag2 = this.physics.add.sprite(
      center.x + 50,
      center.y + 360,
      "bag"
    );
    bag2.setScale(0.5);
    bag2.angle += 180;
    bag3 = this.physics.add.sprite(
      center.x + 300,
      center.y + 300,
      "bag"
    );
    bag3.setScale(0.7);

    turtle = this.physics.add.sprite(center.x + 200, center.y + -150, "turtle");
    turtle.setScale(0.2);
    turtle.setImmovable(true);
    turtle.setBodySize(40, 40, true)

    fish = this.physics.add.sprite(center.x + 300, center.y - 250, "fish");
    fish.setScale(0.8);
    fish.setBodySize(100, 100, true);
    // setting cursors for fish
    fishCursors = this.input.keyboard.createCursorKeys();

    eatingSound = this.sound.add("sound", { loop: false });
    munchingSound = this.sound.add("soundMunching", { loop: false });
    // Timer with a function onEvent
    this.timedEvent = this.time.delayedCall(1000, this.onEvent, [], this);
    timerText = this.add.text(center.x, 10); // the text for the timer

    //so the fish cant escape the screen
    fish.setCollideWorldBounds(true);

    //text to appear when eating wrong things
    dontEatMeText = this.add.text(center.x + 200, center.y - 200, 'Dont eat me!', { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif', fontSize: 50 });
    dontEatMeText.visible = false;
  
  }

    
    

  update() {
    // Making the fish move up and down with arrows
    if (fishCursors.up.isDown) {
      fish.y -= 2;
      fish.setVelocity(0, -600);
      
    }
    if (fishCursors.down.isDown) {
      //console.log("down");
      fish.y += 2;
      fish.setVelocity(0, 600);
    }
    if (fishCursors.right.isDown) {
      //console.log("right");
      fish.x += 2;
      fish.setVelocity(600, 0);
    }
    if (fishCursors.left.isDown) {
      //console.log("left");
      fish.x -= 2;
      fish.setVelocity(-600, 0);
    }
    if(!fishCursors.left.isDown && !fishCursors.up.isDown && !fishCursors.down.isDown && !fishCursors.right.isDown)
    {
      fish.setVelocity(0, 0)
    }

    // eliminates the bottle on contact
    this.physics.add.collider(fish, bottle1, function () {
      //eatingSound.play()
      munchingSound.play()
      bottle1.destroy();
    });

    // if the fish collides with a friend
    this.physics.add.collider(fish, turtle, function () {
      dontEatMeText.visible = true;
    });
    this.physics.add.collider(fish, jellyfish, function () {
      dontEatMeText.visible = true;
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

  // onEvent() {
  //   isNotRunning = true;
  //   this.scene.start("Score");
  // }
  onEvent() {
    isNotRunning = true; 
    // Saving the userScore to sessionStorage
    sessionStorage.setItem("score", userScore);
      //this.scene.start("Score");
  }
}
