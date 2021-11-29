import Phaser from "phaser";
import jellyfishSrc from "../assets/jellyfish.png";
import bagSrc from "../assets/bag.png";
import bottleSrc from "../assets/plasticbottle.png";
import oceanSrc from "../assets/ocean.png";
import fishSrc from "../assets/fish.png";
import turtleSrc from "../assets/turtle.png";
import soundSrc from "../assets/soundfx.wav";
import soundOuchSrc from "../assets/ouch.wav";
import soundMunchingSrc from "../assets/fastMunching.wav";
import helmSrc from "../assets/helm.png";
import strawSrc from "../assets/straw.png";
import spoonSrc from "../assets/spoon.png";
import jellowcoralSrc from "../assets/jellowcoral.png";
import waterplantSrc from "../assets/waterplant.png";
import greenplantSrc from "../assets/greenplant.png";
import blueplantSrc from "../assets/blueplant.png";
import redplantSrc from "../assets/redplant.png";
import sharkleftSrc from "../assets/shark.png";
import sharkrightSrc from "../assets/sharkright.png";

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
  ouchSound,
  //userScore,
  scoreDisplay,
  munchingSound,
  fishCursors,
  helm1,
  helm2,
  helm3,
  spoon1,
  spoon2,
  spoon3,
  straw1,
  straw2,
  straw3,
  jellowcoral1,
  waterplant,
  greenplant,
  blueplant,
  redplant,
  sharkleft,
  sharkright;


let isNotRunning = false;

// For the scores
let userScore = 0;
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
    this.load.audio("soundOuch", soundOuchSrc);
    this.load.audio("soundMunching", soundMunchingSrc);
    this.load.image("helm", helmSrc);
    this.load.image("straw", strawSrc);
    this.load.image("spoon", spoonSrc);
    this.load.image("jellowCoral", jellowcoralSrc);
    this.load.image("waterplant", waterplantSrc);
    this.load.image("redplant", redplantSrc);
    this.load.image("greenplant", greenplantSrc);
    this.load.image("blueplant", blueplantSrc);
    this.load.image("sharkleft", sharkleftSrc);
    this.load.image("sharkright", sharkrightSrc);

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
    jellyfish.setBodySize(20, 20, true); // does not change the displaySize only the size to interact with
    jellyfish.setImmovable(true);

    //straw1
    straw1 = this.physics.add.sprite(
      center.x - (center.x /3),
      center.y - center.y / 5,
      "straw"
    );
    straw1.scaleX = 0.2; 
    straw1.scaleY = straw1.scaleX; // this is to make the scale proportionally
    straw1.angle += 23;

    //straw2
    straw2 = this.physics.add.sprite(
      center.x - (center.x /1.3),
      center.y + (center.y / 2.8),
      "straw"
    );
    straw2.scaleX = 0.2; 
    straw2.scaleY = straw2.scaleX;

    //straw3
    straw3 = this.physics.add.sprite(
      center.x - (center.x /6),
      center.y - center.y / 5,
      "straw"
    );
    straw3.scaleX = 0.2; 
    straw3.scaleY = straw1.scaleX;
    straw3.angle += 40;

    //Spoon1 in the bottom left
    spoon1 = this.physics.add.sprite(
      center.x - (center.x /2),
      center.y + (center.y /1.5),
      "spoon"
    );
    spoon1.angle += 60; 
    spoon1.setBodySize(150, 30);
    spoon1.scaleX = 0.4; 
    spoon1.scaleY = spoon1.scaleX; 

    //Spoon2 up in the water
    spoon2 = this.physics.add.sprite(
      center.x - (center.x /1.7),
      center.y - (center.y /1.5),
      "spoon"
    );
    spoon2.angle = -90; 
    spoon2.setBodySize(150, 30);
    spoon2.scaleX = 0.4; 
    spoon2.scaleY = spoon2.scaleX; 

     //Spoon3 in the bottom right
     spoon3 = this.physics.add.sprite(
      center.x + (center.x /1.8),
      center.y + (center.y /1.9),
      "spoon"
    );
    spoon3.angle += 110; 
    spoon3.setBodySize(150, 30);
    spoon3.scaleX = 0.35; 
    spoon3.scaleY = spoon3.scaleX; 


    // bottle 1 behind the yellow plant
    bottle1 = this.physics.add.sprite(
      center.x -(center.x /4),
      center.y,
      "bottle"
    );
    bottle1.scaleX = 0.3; 
    bottle1.scaleY = bottle1.scaleX;
    bottle1.angle += 90; 

    //bottle2 behind the red plant
    bottle2 = this.physics.add.sprite(
      center.x - center.x/9,
      2*center.y,
      "bottle"
    );
    bottle2.setScale(0.3);
    bottle2.angle += 130;

    //bottle3 behind the green plant
    bottle3 = this.physics.add.sprite(
      center.x + center.x/2.5,
      center.y - center.y/10,
      "bottle"
    );
    bottle3.setScale(0.3);

    //bag1 to the right fo the blue plant
    bag1 = this.physics.add.sprite(
      center.x + center.x/2.3,
      center.y * 2 - center.y / 5,
      "bag"
    );
    bag1.setScale(0.6);
    bag1.angle += 90;

    //bag2 behind green plant
    bag2 = this.physics.add.sprite(
      50,
      2* center.y - 60,
      "bag"
    );
    bag2.setScale(0.5);
    bag2.angle += 180;

    //bag3 to the left of the blue plant
    bag3 = this.physics.add.sprite(
      center.x + center.x/3,
      center.y + center.y/1.3,
      "bag"
    );
    bag3.setScale(0.7);

    // helm1
    helm1 = this.physics.add.sprite(
      center.x - (center.x /2.3),
      30,
      "helm"
    );
    helm1.scaleX = 0.2; 
    helm1.scaleY = helm1.scaleX; 

    // helm2
    helm2 = this.physics.add.sprite(
      center.x - (center.x /1.6),
      center.y + (center.y / 1.1),
      "helm"
    );
    helm2.scaleX = 0.3; 
    helm2.scaleY = helm2.scaleX; 

    //
    helm3 = this.physics.add.sprite(
      center.x + (center.x /1.1),
      center.y/9,
      "helm"
    );
    helm3.scaleX = 0.2; 
    helm3.scaleY = helm3.scaleX; 

    //jellow coral
    jellowcoral1 = this.physics.add.image(
      center.x - (center.x/3),
      center.y,
      "jellowCoral"
    );
    jellowcoral1.scaleX = 0.9; 
    jellowcoral1.scaleY = jellowcoral1.scaleX; 
    jellowcoral1.setBodySize(1, 1, true);

    //waterplant
    waterplant = this.physics.add.image(
      center.x + (center.x/2),
      center.y - center.y/8,
      "waterplant"
    );
    waterplant.scaleX = 0.8; 
    waterplant.scaleY = waterplant.scaleX; 
    waterplant.setBodySize(1, 1, true);

    // greenplant
    greenplant = this.physics.add.image(
      center.x - (center.x/1.2),
      center.y + center.y/1.3,
      "greenplant"
    );
    greenplant.scaleX = 0.9; 
    greenplant.scaleY = greenplant.scaleX; 
    greenplant.setBodySize(1, 1, true);

    //redplant
    redplant = this.physics.add.image(
      center.x,
      center.y + center.y/1.3,
      "redplant"
    );
    redplant.scaleX = 0.9; 
    redplant.scaleY = redplant.scaleX; 
    redplant.setBodySize(1, 1, true);

     //blueplant
     blueplant = this.physics.add.image(
      center.x + center.x/2.4,
      center.y + center.y/1.2,
      "blueplant"
    );
    blueplant.scaleX = 0.9; 
    blueplant.scaleY = blueplant.scaleX; 
    blueplant.setBodySize(1, 1, true);

    // Creating an array of all plastics that we can use to erase them ontouch. add all plastic here.
    const plastics = [
      helm1,
      helm2,
      helm3,
      spoon1,
      spoon2,
      spoon3,
      straw1,
      straw2,
      straw3,
      bottle1,
      bottle2,
      bottle3,
      bag1,
      bag2,
      bag3,
    ];

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
    ouchSound = this.sound.add("soundOuch", { loop: false }); //Unfortunately sound is lagging, because of decoding i think

    // // Timer with a function onEvent
    // this.timedEvent = this.time.delayedCall(1000, this.onEvent, [], this);
    // timerText = this.add.text(center.x, 10); // the text for the timer
    munchingSound = this.sound.add("soundMunching", { loop: false });
    // Timer with a function onEvent
    this.timedEvent = this.time.delayedCall(1000, this.onEvent, [], this);
    timerText = this.add.text(center.x, 10); // the text for the timer


    //so the fish cant escape the screen
    fish.setCollideWorldBounds(true);

    //text to appear when eating wrong things. Make cooler!!
    dontEatMeText = this.add.text(
      center.x + 100,
      center.y - 200,
      "Dont eat me!",
      {
        fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
        fontSize: 50,
      }
    );
    dontEatMeText.visible = false;

    // eliminates plastics on contact + play eating sound
    plastics.forEach(plastic => {
      this.physics.add.collider(fish, plastic, function () {
        munchingSound.play();
        plastic.destroy();
        userScore++;
      });
    });

    // if the fish collides with a friend
    this.physics.add.collider(fish, turtle, function () {
      ouchSound.play();
      dontEatMeText.visible = true;
      setTimeout(() => {
        dontEatMeText.visible = false;
      }, 2000); //take away msg after 2 sec
    });

    // Creating display for score
    scoreDisplay = this.add.text(100, 100);
  }

  update() {
    // Updates the score on screen
    scoreDisplay.setText(`Score: ${userScore}`);

    // Making the fish move up and down with arrows
    if (fishCursors.up.isDown) {
      fish.y -= 2;
      fish.setVelocity(0, -600);
    }
    if (fishCursors.down.isDown) {
      fish.y += 2;
      fish.setVelocity(0, 600);
    }
    if (fishCursors.right.isDown) {
      fish.x += 2;
      fish.setVelocity(600, 0);
    }
    if (fishCursors.left.isDown) {
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
