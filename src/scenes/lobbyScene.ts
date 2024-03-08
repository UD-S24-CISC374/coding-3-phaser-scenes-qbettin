import Phaser from "phaser";
import { CharacterMovement } from "../util/playerMovement";
import { gameState } from "../objects/gameState";

class LobbyScene extends Phaser.Scene {
    private player?: Phaser.Physics.Arcade.Sprite;
    private characterMovement: CharacterMovement;
    private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
    private gameState: gameState;

    constructor() {
        super({ key: "LobbyScene" });
    }

    preload() {
        this.load.image(
            "titleScreenBackground",
            "assets/titleScreenBackground.png"
        );
        this.load.image("door", "assets/lobby_door.png");

        // Preload your player spritesheet if not already loaded
        this.load.spritesheet("player", "assets/hunter_walk_anim.png", {
            frameWidth: 64,
            frameHeight: 116,
        });
    }
    init(data: { gameState: gameState }) {
        this.gameState = data.gameState;
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

        const door = this.physics.add.image(900, 400, "door");
        door.setScale(0.1); // Adjust scale as needed
        door.setOrigin(0.1);

        // Enable door to be a physics object with collision
        door.setImmovable(true);
        door.setCollideWorldBounds(true);

        // Add collision detection with the player
        this.physics.add.collider(
            this.player,
            door,
            this.onDoorCollision,
            undefined,
            this
        );

        // Create an instance of CharacterMovement
        this.characterMovement = new CharacterMovement(
            this.player,
            this,
            300,
            this.gameState
        );

        // Enable cursor keys for keyboard input
        this.cursors = this.input.keyboard?.createCursorKeys();
    }
    private onDoorCollision() {
        // Start the GameScene when player collides with the door
        this.scene.start("GameScene", { gameState: this.gameState });
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
