import Phaser from "phaser"

import jellyfishSrc from "../assets/jellyfish.png"
import plasticbottleSrc from "../assets/plasticbottle.png"

let center, scoreText; 


export default class ScoreScene extends Phaser.Scene {

  constructor() {
    super("Score");
  }

  preload(){
    this.load.image("jellyfishButton", jellyfishSrc);
    this.load.image("introButton", plasticbottleSrc);
  }

  create(){
    center = {
      x: this.physics.world.bounds.width / 2,
      y: this.physics.world.bounds.height / 2
    };

    scoreText = this.add.text(center.x, 30, `Your score is: 20
Most of your friends die
and you too. 
Better luck next time!`, {
  font: '24px monospace',
  fill: '#ffff00'    // text-color
}); 

  scoreText.setOrigin(0.5, 0); // this sets the text 50% to the left of its own length (so its really centered)
  
   // Image for the introButton 
   this.introButton = this.add.sprite(center.x, center.y + 200, "introButton").setInteractive();
   this.introButton.setScale(0.2);
   // Text for the introButton
   this.gameText = this.add.text(0, 0, 'Main', { fontSize: '32px', fill: '#ffff00' });
   // This centers the text in the image
   this.centerButtonText(this.gameText, this.introButton);
   
   // This is where the button will take the user, to the intro again
   this.introButton.on('pointerdown', function (pointer) {
     this.scene.start('Intro');
   }.bind(this));

   // This adds an hover-effect (in this case a second image)
   this.input.on('pointerover', function (event, gameObjects) {
     gameObjects[0].setTexture('jellyfishButton');
   });
   this.input.on('pointerout', function (event, gameObjects) {
     gameObjects[0].setTexture('introButton');
   });

}

  update(){
    // Change the score to the real user-score

    }

    // This centers the text in the image for the button 
  centerButtonText (gameText, gameButton) {
    Phaser.Display.Align.In.Center(
      gameText,
      gameButton
    );
  }

}