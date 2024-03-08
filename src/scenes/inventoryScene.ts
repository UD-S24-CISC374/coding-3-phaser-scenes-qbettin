import Phaser from "phaser";
import { gameState } from "../objects/gameState";

class InventoryScene extends Phaser.Scene {
    private gameState: gameState;

    constructor() {
        super({ key: "InventoryScene" });
    }
    preload() {
        this.load.image("escape", "assets/escape.png");
    }

    init(data: { gameState: gameState }) {
        this.gameState = data.gameState;
    }

    create() {
        this.input.keyboard?.on("keydown", (event: KeyboardEvent) => {
            if (event.code === "Escape") {
                this.openGame();
            }
        });
        // Add background image
        const background = this.add.image(
            this.cameras.main.width / 2,
            this.cameras.main.height / 2,
            "titleScreenBackground"
        );
        background.setOrigin(0.5);
        background.setScale(1.21);

        const escapeButton = this.add.image(10, 10, "escape");
        escapeButton.setOrigin(0);
        escapeButton.setInteractive();
        escapeButton.on("pointerdown", () => {
            this.openGame();
        });
        escapeButton.setScale(0.2);
        // Display player's name
        const playerName = this.add.text(
            this.cameras.main.width / 2,
            100,
            `Player: ${this.gameState.player.name}`,
            { fontSize: "24px", color: "#fff" }
        );
        playerName.setOrigin(0.5);

        // Display player's weapons
        const weaponsText = this.add.text(
            this.cameras.main.width / 2,
            150,
            `Weapons: ${this.gameState.player.weapons.join(", ")}`,
            { fontSize: "24px", color: "#fff" }
        );
        weaponsText.setOrigin(0.5);

        // Display player's items
        const itemsText = this.add.text(
            this.cameras.main.width / 2,
            200,
            `Items: ${this.gameState.player.items.join(", ")}`,
            { fontSize: "24px", color: "#fff" }
        );
        itemsText.setOrigin(0.5);
    }
    private openGame() {
        this.scene.resume("GameScene"); // Resume the paused GameScene
        this.scene.stop("InventoryScene"); // Stop the InventoryScene
    }
}

export default InventoryScene;
