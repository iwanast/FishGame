import Phaser from "phaser"

import {getScoreAndUsername} from "./firebase"

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
    getScoreAndUsername();
  }

  create(){
    center = {
      x: this.physics.world.bounds.width / 2,
      y: this.physics.world.bounds.height / 2
    };

  // setScoreText();
//     scoreText = this.add.text(center.x, 30, `Your score is: 20
// Most of your friends die
// and you too. 
// Better luck next time!

// `, {
//   font: '24px monospace',
//   fill: '#ffff00'    // text-color
// });

// Best score from user ${arrayScores[0].username} with ${arrayScores[0].score}
// Second comes user ${arrayScores[1].username} with ${arrayScores[1].score}
  
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
  
  setScoreText(querySnapshot){
    let theBestScoresArray = []

    querySnapshot.forEach((item) => {
          theBestScoresArray.push({
            score: item.data().score, 
            username : item.data().username,
          });
        });

    scoreText = this.add.text(center.x, 30, `Your score is: 20
  Most of your friends die
  and you too. 
  Better luck next time!
  
  Best score from user ${theBestScoresArray[0].username} with ${theBestScoresArray[0].score}
  Second comes user ${theBestScoresArray[1].username} with ${theBestScoresArray[1].score}
  `, {
    font: '24px monospace',
    fill: '#ffff00'    // text-color
  });
  
  scoreText.setOrigin(0.5, 0); // this sets the text 50% to the left of its own length (so its really centered)

  }


}