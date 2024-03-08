import Phaser from "phaser";
import { gameState } from "../objects/gameState";
import { CharacterMovement } from "../util/playerMovement";

class GameScene extends Phaser.Scene {
    private gameState: gameState;
    private player?: Phaser.Physics.Arcade.Sprite;
    private characterMovement: CharacterMovement;
    private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;

    constructor() {
        super({ key: "GameScene" });
    }

    preload() {
        this.load.image("forwardSlash", "assets/forward_slash.png");
        this.load.image(
            "gameScreenBackground",
            "assets/titleScreenBackground.png"
        );
        this.load.spritesheet("player", "assets/hunter_walk_anim.png", {
            frameWidth: 64,
            frameHeight: 116,
        });
    }
    init(data: { gameState: gameState }) {
        this.gameState = data.gameState;
    }
    create() {
        this.input.keyboard?.on("keydown", (event: KeyboardEvent) => {
            if (event.code === "Slash") {
                this.openInventory();
            }
        });
        // Add background image

        const background = this.add.image(
            this.cameras.main.width / 2,
            this.cameras.main.height / 2,
            "gameScreenBackground"
        );
        background.setOrigin(0.5);
        background.setScale(1.21);

        const forwardSlashButton = this.add.image(1200, 450, "forwardSlash");
        forwardSlashButton.setOrigin(0);
        forwardSlashButton.setInteractive();
        forwardSlashButton.on("pointerdown", () => {
            this.openInventory();
        });
        forwardSlashButton.setScale(0.1);

        this.player = this.physics.add.sprite(100, 100, "player");

        this.characterMovement = new CharacterMovement(
            this.player,
            this,
            300,
            this.gameState
        );

        // Enable cursor keys for keyboard input
        this.cursors = this.input.keyboard?.createCursorKeys();
    }
    private openInventory() {
        this.scene.pause("GameScene"); // Pause the GameScene
        this.scene.launch("InventoryScene", { gameState: this.gameState });
    }

    update() {
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

export default GameScene;
