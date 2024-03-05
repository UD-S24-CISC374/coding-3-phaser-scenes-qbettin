import Phaser from "phaser";

class TitleScene extends Phaser.Scene {
    constructor() {
        super({ key: "TitleScene" });
    }

    preload() {
        this.load.image("logo", "assets/bashTheDungeonTextLogo.png");
        this.load.image("playButton", "assets/playButton.png");
        this.load.image(
            "titleScreenBackground",
            "assets/titleScreenBackground.png"
        );
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

        // Add other elements with alpha set to 0 (fully transparent)
        const logo = this.add
            .image(this.cameras.main.width / 2, 175, "logo")
            .setAlpha(0);
        logo.setScale(1.2);

        const creatorText = this.add
            .text(
                this.cameras.main.width / 2,
                375,
                "Created by Quinten Bettin",
                { fontSize: "25px", color: "#fff" }
            )
            .setAlpha(0);
        creatorText.setOrigin(0.5);

        const playButton = this.add
            .image(this.cameras.main.width / 2, 500, "playButton")
            .setAlpha(0);
        playButton.setScale(0.5);
        playButton.setOrigin(0.5);
        playButton.setInteractive();
        playButton.on("pointerdown", () => {
            this.cameras.main.fadeOut(500, 0, 0, 0, () => {
                this.scene.start("LobbyScene");
            });
        });

        // Fade in all elements gradually
        this.tweens.add({
            targets: [background, logo, creatorText, playButton],
            alpha: 1,
            duration: 2000,
            ease: "Linear",
        });
    }
}

export default TitleScene;
