import Phaser from "phaser"

import {getScoreAndUsername, arrayScores} from "./firebase"

import jellyfishSrc from "../assets/jellyfish.png"
import plasticbottleSrc from "../assets/plasticbottle.png"

let center, scoreText, bestScoreText, userscore, username;

const scoreTextArray = [
  `
  Most of your friends die
  and you too. 
  Better luck next time!
  
  You want a hint? The plastic is often the same color as where its tangled in.
  Keep looking under the surface!`,
  `
  You are still in deep water, keep the humor up and help your friends to survive.
  Some have already died. 

  You want a hint? There are five different sort of plastic.`, 
  `
  Its always better to look under the surface real focused and you are focused! 
  But not enough yet. 

  You want a hint? Each plasticsort exists so many times as the number which should give luck.`,
  `
  You have reached the middle and saved halv of your friends. 
  You may survive at this point but probably not.
  
  You want a hint? Rosa and yellow swimming in the water are not always fishes.`,
  `
  Wow what a deep concentration you have! 
  Still there are plastic missing.
  
  Hint: Think about the little straws how much damage they do! `,
  `
  You are a real friend and have helped clean the ocean!
  Your friends will survive and will give you a special funeral. 
  Only a not polluted ocean could be better!`,];

       
console.log("ScoreTextArray: " + scoreTextArray[0])        
export default class ScoreScene extends Phaser.Scene {

  constructor() {
    super("Score");
  }

  preload(){
    this.load.image("jellyfishButton", jellyfishSrc);
    this.load.image("introButton", plasticbottleSrc);
    console.log("preload Score")
    getScoreAndUsername((arrayScores) =>{
      this.setScoreText(arrayScores);
    });
  }

  create(){
    center = {
      x: this.physics.world.bounds.width / 2,
      y: this.physics.world.bounds.height / 2
    };

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

   // This adds a hover-effect (in this case a second image)
   this.input.on('pointerover', function (event, gameObjects) {
     gameObjects[0].setTexture('jellyfishButton');
   });
   this.input.on('pointerout', function (event, gameObjects) {
     gameObjects[0].setTexture('introButton');
   });
}

  update(){

    // Change the score to the real user-score
    //this.uppdateScore();
    
    }

    // This centers the text in the image for the button 
  centerButtonText (gameText, gameButton) {
    Phaser.Display.Align.In.Center(
      gameText,
      gameButton
    );
  }

  // Sets the text in the Score-page after the firebase-highscores are uppdated and called
  setScoreText(arrayScores){

    userscore = JSON.parse(sessionStorage.getItem("score"));
    username = sessionStorage.getItem("user"); 

    let textForTheReachedScore = ""; 

    if(userscore <= 30){
      textForTheReachedScore = scoreTextArray[0]
    } else if(userscore <= 60){
      textForTheReachedScore = scoreTextArray[1]
    } else if(userscore <= 90){
      textForTheReachedScore =  scoreTextArray[2]
    } else if(userscore <= 120){
      textForTheReachedScore =  scoreTextArray[3]
    } else if(userscore <= 149){
      textForTheReachedScore =  scoreTextArray[4]
    } else if (userscore >= 150){
      textForTheReachedScore =  scoreTextArray[5]
    }
   

    scoreText = this.add.text(center.x, center.y -center.y/1.5, `
    ${username}, your score is: ${userscore}
    ${textForTheReachedScore}
  `, {
    font: '24px monospace',
    align: "center", 

    
    fill: '#ffff00'    // text-color
  });
  
  scoreText.setOrigin(0.5, 0); // this sets the text 50% to the left of its own length (so its really centered)


  bestScoreText = this.add.text(center.x, center.y, `
  Best scores
  1. ${arrayScores[0].username} with ${arrayScores[0].score}
  2. ${arrayScores[1].username} with ${arrayScores[1].score}
  3. ${arrayScores[2].username} with ${arrayScores[2].score}`, {
    font: '24px monospace',
    fill: '#ffff00'    // text-color 
  }).setOrigin(0.5, 0);;

  }  
}