import Phaser from "phaser";
import jellyfishSrc from "../assets/jellyfish.png";
import bluejellyfishSrc from "../assets/bluejellyfish.png";
import bagSrc from "../assets/bag.png";
import bottleSrc from "../assets/plasticbottle.png";
import oceanSrc from "../assets/ocean.png";
import fishSrc from "../assets/fish1.png";
import turtleSrc from "../assets/turtle.png";
import soundSrc from "../assets/soundfx.wav";
import soundOuchSrc from "../assets/ouch.wav";
import soundSharkSrc from "../assets/sharkSound.wav";
import soundMunchingSrc from "../assets/fastMunching.wav";
import soundCheeringSrc from "../assets/cheering.wav";
import soundDisapprovingSrc from "../assets/disapproving.wav";
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

import bubbleSrc from "../assets/bubble.png";

let bag1,
  bag2,
  bag3,
  bluejellyfish,
  jellyfish,
  ocean,
  center,
  bottle1,
  bottle2,
  bottle3,
  timerText,
  fish,
  turtle,
  dontDisturbMeText,
  dontEatMeText,
  keepGoingText,
  eatingSound,
  ouchSound,
  scoreDisplay,
  munchingSound,
  sharkSound,
  cheeringSound,
  disapprovingSound,
  fishCursors,
  hideText,
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
  bubble,
  emitter,
  sharkright;

// Creating an array of all plastics that we can use to erase them ontouch. add all plastic here.
let plastics = [];

// For the scores
let userScore = 0;
let soundOuchIsPlaying = false;
let soundCheeringIsPlaying = false;
let soundDisapprovingIsPlaying = false;

export default class FishgameScene extends Phaser.Scene {
  constructor() {
    super("Game");
  }

  preload() {
    this.load.image("bag", bagSrc);
    this.load.image("jellyfish", jellyfishSrc);
    this.load.image("bluejellyfish", bluejellyfishSrc);
    this.load.image("ocean", oceanSrc);
    this.load.image("bottle", bottleSrc);
    this.load.image("fish", fishSrc);
    this.load.image("turtle", turtleSrc);
    this.load.audio("sound", soundSrc);
    this.load.audio("soundOuch", soundOuchSrc);
    this.load.audio("soundCheering", soundCheeringSrc);
    this.load.audio("soundDisapproving", soundDisapprovingSrc);
    this.load.audio("soundMunching", soundMunchingSrc);
    this.load.audio("soundShark", soundSharkSrc);
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
    this.load.image("bubble", bubbleSrc);
  }

  create() {
    userScore = 0;
    center = {
      x: this.physics.world.bounds.width / 2,
      y: this.physics.world.bounds.height / 2,
    };

    // Backgroundimage
    ocean = this.physics.add.image(center.x, center.y, "ocean");
    ocean.setDisplaySize(center.x * 2, center.y * 2);

    ///////////////////////////// PLASTICS AND SHARKS //////////////////////////////
    //straw1
    straw1 = this.physics.add.sprite(
      center.x - center.x / 3,
      center.y - center.y / 5,
      "straw"
    );
    straw1.scaleX = 0.2;
    straw1.scaleY = straw1.scaleX; // this is to make the scale proportionally
    straw1.angle += 23;

    //straw2
    straw2 = this.physics.add.sprite(
      center.x - center.x / 1.3,
      center.y + center.y / 2.8,
      "straw"
    );
    straw2.scaleX = 0.2;
    straw2.scaleY = straw2.scaleX; // this is to make the scale proportionally

    //straw3
    straw3 = this.physics.add.sprite(
      center.x - center.x / 6,
      center.y - center.y / 5,
      "straw"
    );
    straw3.scaleX = 0.2;
    straw3.scaleY = straw1.scaleX; // this is to make the scale proportionally
    straw3.angle += 40;

    //Spoon1 in the bottom left
    spoon1 = this.physics.add.sprite(
      center.x - center.x / 2,
      center.y + center.y / 1.5,
      "spoon"
    );
    spoon1.angle += 60;
    spoon1.setBodySize(150, 30);
    spoon1.scaleX = 0.4;
    spoon1.scaleY = spoon1.scaleX;

    //Spoon2 up in the water
    spoon2 = this.physics.add.sprite(
      center.x - center.x / 1.7,
      center.y - center.y / 1.5,
      "spoon"
    );
    spoon2.angle = -90;
    spoon2.setBodySize(150, 30);
    spoon2.scaleX = 0.4;
    spoon2.scaleY = spoon2.scaleX; // this is to make the scale proportionally

    //Spoon3 in the bottom right
    spoon3 = this.physics.add.sprite(
      center.x + center.x / 1.8,
      center.y + center.y / 1.9,
      "spoon"
    );
    spoon3.angle += 110;
    spoon3.setBodySize(150, 30);
    spoon3.scaleX = 0.35;
    spoon3.scaleY = spoon3.scaleX;

    //shark behind the bottle1 behind the yellow plant
    sharkright = this.physics.add.sprite(
      center.x - center.x / 4,
      center.y,
      "sharkright"
    );
    sharkright.setScale(0.3);

    // bottle 1 behind the yellow plant
    bottle1 = this.physics.add.sprite(
      center.x - center.x / 4,
      center.y,
      "bottle"
    );
    bottle1.scaleX = 0.3;
    bottle1.scaleY = bottle1.scaleX;
    bottle1.angle += 90;

    //bottle2 behind the red plant
    bottle2 = this.physics.add.sprite(
      center.x - center.x / 9,
      2 * center.y,
      "bottle"
    );
    bottle2.setScale(0.3);
    bottle2.angle += 130;

    //shark behind the bottle3 behind the green plant
    sharkleft = this.physics.add.sprite(
      center.x + center.x / 2.5,
      center.y - center.y / 10,
      "sharkleft"
    );
    sharkleft.setScale(0.3);

    //bottle3 behind the green plant
    bottle3 = this.physics.add.sprite(
      center.x + center.x / 2.5,
      center.y - center.y / 10,
      "bottle"
    );
    bottle3.setScale(0.3);

    //bag1 to the right fo the blue plant
    bag1 = this.physics.add.sprite(
      center.x + center.x / 2.3,
      center.y * 2 - center.y / 5,
      "bag"
    );
    bag1.setScale(0.6);
    bag1.angle += 90;

    //bag2 behind green plant
    bag2 = this.physics.add.sprite(50, 2 * center.y - 60, "bag");
    bag2.setScale(0.5);
    bag2.angle += 180;

    //bag3 to the left of the blue plant
    bag3 = this.physics.add.sprite(
      center.x + center.x / 3,
      center.y + center.y / 1.3,
      "bag"
    );
    bag3.setScale(0.7);

    // helm 1
    helm1 = this.physics.add.sprite(center.x - center.x / 2.3, 30, "helm");
    helm1.scaleX = 0.2;
    helm1.scaleY = helm1.scaleX;

    // helm 2
    helm2 = this.physics.add.sprite(
      center.x - center.x / 1.6,
      center.y + center.y / 1.1,
      "helm"
    );
    helm2.scaleX = 0.3;
    helm2.scaleY = helm2.scaleX;

    //helm 3
    helm3 = this.physics.add.sprite(
      center.x + center.x / 1.1,
      center.y / 9,
      "helm"
    );
    helm3.scaleX = 0.2;
    helm3.scaleY = helm3.scaleX;

    // Creating an array of all plastics that we can use to erase them ontouch. add all plastic here.
    plastics = [
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

    ///////////////////////////// HIDINGS /////////////////////////////////////////
    //jellow coral
    jellowcoral1 = this.physics.add.image(
      center.x - center.x / 3,
      center.y,
      "jellowCoral"
    );
    jellowcoral1.scaleX = 0.9;
    jellowcoral1.scaleY = jellowcoral1.scaleX;
    jellowcoral1.setBodySize(1, 1, true);

    //waterplant
    waterplant = this.physics.add.image(
      center.x + center.x / 2,
      center.y - center.y / 8,
      "waterplant"
    );
    waterplant.scaleX = 0.8;
    waterplant.scaleY = waterplant.scaleX;
    waterplant.setBodySize(1, 1, true);

    // greenplant
    greenplant = this.physics.add.image(
      center.x - center.x / 1.2,
      center.y + center.y / 1.3,
      "greenplant"
    );
    greenplant.scaleX = 0.9;
    greenplant.scaleY = greenplant.scaleX;
    greenplant.setBodySize(1, 1, true);

    //redplant
    redplant = this.physics.add.image(
      center.x,
      center.y + center.y / 1.3,
      "redplant"
    );
    redplant.scaleX = 0.9;
    redplant.scaleY = redplant.scaleX;
    redplant.setBodySize(1, 1, true);

    //blueplant
    blueplant = this.physics.add.image(
      center.x + center.x / 2.4,
      center.y + center.y / 1.2,
      "blueplant"
    );
    blueplant.scaleX = 0.9;
    blueplant.scaleY = blueplant.scaleX;
    blueplant.setBodySize(1, 1, true);

    ///////////////////////////// FISH AND FRIENDS //////////////////////////////
    //Turtle
    turtle = this.physics.add.sprite(
      center.x + center.x / 7,
      center.y + center.y / 3,
      "turtle"
    );
    turtle.setScale(0.2);
    turtle.setImmovable(true);
    turtle.setBodySize(40, 40, true);

    // Red Jellyfish
    jellyfish = this.physics.add.sprite(
      center.x + center.x / 2.5,
      center.y - center.y / 1.8,
      "jellyfish"
    );
    jellyfish.setDisplaySize(center.x / 4, center.y / 4);
    jellyfish.setBodySize(20, 20, true); // does not change the displaySize only the size to interact with
    jellyfish.setImmovable(true);

    // Blue Jellyfish
    bluejellyfish = this.physics.add.sprite(
      center.x - center.x / 1.15,
      center.y - center.y / 1.9,
      "bluejellyfish"
    );
    bluejellyfish.setBodySize(30, 30, true); // does not change the displaySize only the size to interact with
    bluejellyfish.setImmovable(true);

    const friends = [turtle, jellyfish, bluejellyfish];

    fish = this.physics.add.sprite(center.x, center.y - center.y / 2, "fish");
    fish.setScale(0.8);
    fish.setOrigin(0.2, 0.2);
    fish.setBodySize(100, 100, true);
    // setting cursors for fish
    fishCursors = this.input.keyboard.createCursorKeys();

    //so the fish cant escape the screen
    fish.setCollideWorldBounds(true);

    // Particles for the fishtail
    bubble = this.add.particles("bubble");
    emitter = bubble.createEmitter({
      scale: { start: 0.2, end: 1 },
      speed: 100,
      gravity: { x: 0, y: -1200 },
      lifespan: { min: 200, max: 250 },
      blendMode: "ADD",
      frequency: 110,
    });
    emitter.startFollow(fish);

    ///////////////////////////// SOUND TEXT AND FUNCTIONALITY //////////////////////////////

    // Soundeffects
    eatingSound = this.sound.add("sound", { loop: false });
    ouchSound = this.sound.add("soundOuch", { loop: false });
    sharkSound = this.sound.add("soundShark", { volume: 0.2 }, { loop: false });
    munchingSound = this.sound.add("soundMunching", { loop: false });
    cheeringSound = this.sound.add(
      "soundCheering",
      { volume: 0.2 },
      { loop: false }
    );
    disapprovingSound = this.sound.add(
      "soundDisapproving",
      { volume: 0.2 },
      { loop: false }
    );

    //text to appear when bumping into Turtle
    dontEatMeText = this.add
      .text(center.x + center.x / 7, center.y, "Dont eat me!", {
        fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
        fontSize: 40, // lowered from 50 to fit screen size
      })
      .setOrigin(0.5, 0);
    dontEatMeText.visible = false;

    //text to appear when bumping into red jellyfish
    dontDisturbMeText = this.add
      .text(
        center.x + center.x / 3,
        center.y - center.y / 1.2,
        "Dont disturb me! I have deep thoughts.",
        {
          fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
          fontSize: 40, // lowered from 50 to fit screen size
        }
      )
      .setOrigin(0.5, 0);
    dontDisturbMeText.visible = false;

    //text to appear when bumping into blue  jellyfish
    keepGoingText = this.add
      .text(center.x - center.x / 2, 30, "Keep going! You can do this!", {
        fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
        fontSize: 40, // lowered from 50 to fit screen size
      })
      .setOrigin(0.5, 0);
    keepGoingText.visible = false;

    //text to appear when shark appears.
    hideText = this.add
      .text(
        center.x,
        center.y - center.y / 2,
        "You have to hide! There is a shark!",
        {
          fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
          fontSize: 50,
        }
      )
      .setOrigin(0.5, 0);
    hideText.visible = false;

    // eliminates plastics on contact + play eating sound + takes it away from the array
    plastics.forEach((plastic) => {
      this.physics.add.collider(fish, plastic, function () {
        munchingSound.play();
        for (let i = 0; i < plastics.length; i++) {
          if (plastics[i] == plastic) {
            plastics.splice(i--, 1);
          }
        }
        if (plastic == bottle3 || plastic == bottle1) {
          if (plastic == bottle3) {
            sharkleft.setVelocity(-400, 0);
            setTimeout(() => {
              sharkSound.play();
            }, 200);
            fish.setPosition(center.x * 2, center.y * 2);
          } else if (plastic == bottle1) {
            sharkright.setVelocity(400, 0);
            setTimeout(() => {
              sharkSound.play();
            }, 200);
            fish.setPosition(center.x * 2, center.y * 2);
          }
          hideText.visible = true;
          setTimeout(() => {
            hideText.visible = false;
          }, 2000); //take away msg after 2 sec
        }
        plastic.destroy();
        if (userScore < 140) {
          userScore = userScore + 10;
        } else if (userScore == 140) {
          userScore = userScore + 160;
        }
      });
    });

    // if the fish collides with the turtle
    this.physics.add.collider(fish, turtle, function () {
      if (!soundOuchIsPlaying) {
        soundOuchIsPlaying = true;
        ouchSound.play();
      }
      setTimeout(() => {
        soundOuchIsPlaying = false;
      }, ouchSound.duration * 1000 + 4000);
      dontEatMeText.visible = true;
      setTimeout(() => {
        dontEatMeText.visible = false;
      }, 2000); //take away msg after 2 sec
    });

    // if the fish collides with the red jellyfish
    this.physics.add.collider(fish, jellyfish, function () {
      if (!soundDisapprovingIsPlaying) {
        soundDisapprovingIsPlaying = true;
        disapprovingSound.play();
      }
      setTimeout(() => {
        soundDisapprovingIsPlaying = false;
      }, disapprovingSound.duration * 1000 + 4000);
      dontDisturbMeText.visible = true;
      setTimeout(() => {
        dontDisturbMeText.visible = false;
      }, 2000); //take away msg after 2 sec
    });

    // if the fish collides with the blue jellyfish
    this.physics.add.collider(fish, bluejellyfish, function () {
      if (!soundCheeringIsPlaying) {
        soundCheeringIsPlaying = true;
        cheeringSound.play();
      }
      setTimeout(() => {
        soundCheeringIsPlaying = false;
      }, cheeringSound.duration * 1000 + 4000);
      keepGoingText.visible = true;
      setTimeout(() => {
        keepGoingText.visible = false;
      }, 2000); //take away msg after 2 sec
    });

    // Creating display for score
    scoreDisplay = this.add.text(center.x, 50);

    // Timer with a function onEvent
    this.timedEvent = this.time.delayedCall(30000, this.onEvent, [], this);
    timerText = this.add.text(center.x, 10); // the text for the timer
  }

  update() {
    // Updates the score on screen
    scoreDisplay.setText(`Score: ${userScore}`);

    //Making collision with plastic only if space is down
    if (fishCursors.space.isDown) {
      for (let i = 0; i < plastics.length; i++) {
        plastics[i].body.checkCollision.none = false;
      }
    }
    if (!fishCursors.space.isDown) {
      plastics.forEach((plastic) => {
        plastic.body.checkCollision.none = true;
      });
    }

    // Making the fish move up and down with arrows

    if (fishCursors.up.isDown) {
      fish.y -= 2;
      fish.setVelocity(0, -600);
      fish.setFlipX(0);
      fish.setOrigin(0.2, 0.2);
    }
    if (fishCursors.down.isDown) {
      fish.y += 2;
      fish.setVelocity(0, 600);
      fish.setFlipY(0);
      fish.setOrigin(0.2, 0.2);
    }
    if (fishCursors.right.isDown) {
      fish.x += 2;
      fish.setVelocity(600, 0);
      fish.setFlipX(0);
      fish.setOrigin(0.2, 0.2);
    }
    if (fishCursors.left.isDown) {
      fish.x -= 2;
      fish.setVelocity(-600, 0);
      fish.setFlipX(10);
      fish.setOrigin(0.8, 0.2);
    }
    if (
      !fishCursors.left.isDown &&
      !fishCursors.up.isDown &&
      !fishCursors.down.isDown &&
      !fishCursors.right.isDown
    ) {
      fish.setVelocity(0, 0);
    }

    // Timer direct running when all loaded and displayed here.
    timerText.setText(
      "Time left: " +
        this.timedEvent.getRemainingSeconds().toString().substr(0, 4)
    );
  }

  onEvent() {
    //Saving the userScore to sessionStorage
    sessionStorage.setItem("score", userScore);
    this.scene.start("Score");
  }
}
