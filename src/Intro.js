import Phaser from "phaser"

import jellyfishSrc from "../assets/jellyfish.png"
import plasticbottleSrc from "../assets/plasticbottle.png"

let center, introText;  


export default class IntroScene extends Phaser.Scene {

  constructor() {
    super("Intro");
  }

  preload() {
    this.load.image("jellyfishButton", jellyfishSrc);
    this.load.image("playButton", plasticbottleSrc);
  }

  create() {
    center = {
      x: this.physics.world.bounds.width / 2,
      y: this.physics.world.bounds.height / 2
    };
    introText = this.add.text(center.x, center.y, 
` You have to eat as much plastic as possible 
           to save your world. 
    Each eaten plastic gives you points. 
   If you succeed to eat all the plastic,
                  you win! 
  Be afraid of the sharks and mind the time.
               Good luck!`, {
    font: '24px monospace',
    fill: '#ffff00'    // text-color
    }); 
  introText.setOrigin(0.5, 0.5); // this sets the text 50% to the left and up of its own length and height (so its really centered)
 
  // Image for the playButton 
    this.playButton = this.add.sprite(center.x, center.y + 200, "playButton").setInteractive();
    this.playButton.setScale(0.2);
    // Text for the playButton
    this.gameText = this.add.text(0, 0, 'Play', { fontSize: '32px', fill: '#ffff00' });
    // This centers the text in the image
    this.centerButtonText(this.gameText, this.playButton);
    
    // This is where the button will take the user, to the game
    this.playButton.on('pointerdown', function (pointer) {
      this.scene.start('Game');
    }.bind(this));

    // This adds an hover-effect (in this case a second image)
    this.input.on('pointerover', function (event, gameObjects) {
      gameObjects[0].setTexture('jellyfishButton');
    });
    this.input.on('pointerout', function (event, gameObjects) {
      gameObjects[0].setTexture('playButton');
    });
  }

// This centers the text in the image for the button 
  centerButtonText (gameText, gameButton) {
    Phaser.Display.Align.In.Center(
      gameText,
      gameButton
    );
  }

}