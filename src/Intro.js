import Phaser from "phaser";

import jellyfishSrc from "../assets/jellyfish.png";
import plasticbottleSrc from "../assets/plasticbottle.png";

let center, introText;

export default class IntroScene extends Phaser.Scene {
  constructor() {
    super("Intro");
  }

  preload() {
    this.load.image("jellyfishButton", jellyfishSrc);
    this.load.image("playButton", plasticbottleSrc);
    this.load.html("form", "form.html"); // loads in the form
  }

  create() {

    sessionStorage.setItem("user", ""); // Empty the name in sessionStorage
    sessionStorage.setItem("score", 0); // Prepare the sessionStorage and set it to zero again
    center = {
      x: this.physics.world.bounds.width / 2,
      y: this.physics.world.bounds.height / 2,
    };
    introText = this.add.text(
      center.x,
      center.y, //updated for better balance between elements
      ` 
      You have to eat as much plastic as possible 
      to save your friends. 
      Each eaten plastic gives you points. 
      If you succeed to eat all the plastic,
      you win! 
      Be afraid of the sharks and mind the time.
      Good luck!
      `,
      {
        font: "24px monospace",
        align: "center", 
        fill: "#ffff00", // text-color
      }
    );
    introText.setOrigin(0.5, 0.5); // this sets the text 50% to the left and up of its own length and height (so its really centered)
    introText.visible = false;
    // Image for the playButton
    this.playButton = this.add
      .sprite(center.x, center.y + 200, "playButton")
      .setInteractive();
    this.playButton.setScale(0.2);
    // Text for the playButton
    this.gameText = this.add.text(0, 0, "Play", {
      font: "32px monospace",
      fill: "#ffff00",
    });
    // This centers the text in the image
    this.centerButtonText(this.gameText, this.playButton);

    //
    this.playButton.visible = false;
    this.gameText.visible = false;

    // This is where the button will take the user, to the game
    this.playButton.on(
      "pointerdown",
      function (pointer) {
        this.scene.start("Game");
      }.bind(this)
    );

    // This adds an hover-effect (in this case a second image)
    this.input.on("pointerover", function (event, gameObjects) {
      gameObjects[0].setTexture("jellyfishButton");
    });
    this.input.on("pointerout", function (event, gameObjects) {
      gameObjects[0].setTexture("playButton");
    });

    // adding DOM element to intro page (form from form.html)
    this.nameInput = this.add.dom(center.x, 360).createFromCache("form");

    // Adds the welcome text on screen
    this.message = this.add
      .text(center.x, 250, "Hello, --", {
        font: "50px monospace",
        align: "center",
        weight: "bold",
        fill: "#ffff00", // text-color
      })
      .setOrigin(0.5);

    // Gets the input from DOM, saves it to SS and shows it on screen
    this.returnKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.ENTER
    );
    this.returnKey.on("down", (event) => {
      this.name = this.nameInput.getChildByName("name");
      let nameToSave = this.name.value;
      const formElement = document.querySelector("#input-form"); // selects the form
      formElement.remove(); // removes the form once you typed in your name
      sessionStorage.setItem("user", nameToSave); // Saving username to SS
      if (this.name.value != "") {
        // Just a funny function if we want to welcome user w name
        this.message.setText("Hello, " + nameToSave);
      }
      this.playButton.visible = true; //setting the play button to visible
      this.gameText.visible = true;
      introText.visible = true;
    });
  }

  update() {}

  // This centers the text in the image for the button
  centerButtonText(gameText, gameButton) {
    Phaser.Display.Align.In.Center(gameText, gameButton);
  }
}
