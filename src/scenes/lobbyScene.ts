import Phaser from "phaser";
import { CharacterMovement } from "../util/playerMovement";

class LobbyScene extends Phaser.Scene {
    private player?: Phaser.Physics.Arcade.Sprite;
    private characterMovement: CharacterMovement;
    private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;

    constructor() {
        super({ key: "LobbyScene" });
    }

    preload() {
        this.load.image(
            "titleScreenBackground",
            "assets/titleScreenBackground.png"
        );

        // Preload your player spritesheet if not already loaded
        this.load.spritesheet("player", "assets/hunter_walk_anim.png", {
            frameWidth: 64,
            frameHeight: 116,
        });
    }

    create() {
        // Add background image
        const background = this.add.image(
            this.cameras.main.width / 2,
            this.cameras.main.height / 2,
            "titleScreenBackground"
        );
        background.setOrigin(0.5);
        background.setScale(1.21);

        // Create player sprite
        this.player = this.physics.add.sprite(100, 100, "player");

        // Create an instance of CharacterMovement
        this.characterMovement = new CharacterMovement(this.player, this);

        // Enable cursor keys for keyboard input
        this.cursors = this.input.keyboard?.createCursorKeys();
    }

    update() {
        // Check for keyboard input and move the player accordingly
        if (this.cursors) {
            // Handle diagonal movement
            if (this.cursors.up.isDown && this.cursors.left.isDown) {
                this.characterMovement.moveUpLeft();
            } else if (this.cursors.up.isDown && this.cursors.right.isDown) {
                this.characterMovement.moveUpRight();
            } else if (this.cursors.down.isDown && this.cursors.left.isDown) {
                this.characterMovement.moveDownLeft();
            } else if (this.cursors.down.isDown && this.cursors.right.isDown) {
                this.characterMovement.moveDownRight();
            } else {
                // Handle individual directions
                if (this.cursors.up.isDown) {
                    this.characterMovement.moveUp();
                } else if (this.cursors.down.isDown) {
                    this.characterMovement.moveDown();
                } else {
                    this.characterMovement.stopY(); // Stop vertical movement if no up/down keys are pressed
                }
                if (this.cursors.left.isDown) {
                    this.characterMovement.moveLeft();
                } else if (this.cursors.right.isDown) {
                    this.characterMovement.moveRight();
                } else {
                    this.characterMovement.stopX(); // Stop horizontal movement if no left/right keys are pressed
                }
            }
        }
    }
}

export default LobbyScene;
