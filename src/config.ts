import Phaser from "phaser";
import PreloadScene from "./scenes/preloadScene";
import TitleScene from "./scenes/titleScene";

const DEFAULT_WIDTH = 1280;
const DEFAULT_HEIGHT = 720;

export const CONFIG: Phaser.Types.Core.GameConfig = {
    title: "Bash the Dungeon",
    version: "0.0.1",
    type: Phaser.AUTO,
    backgroundColor: "#ffffff",

    scale: {
        parent: "phaser-game",
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: DEFAULT_WIDTH,
        height: DEFAULT_HEIGHT,
        mode: Phaser.Scale.FIT,
    },
    scene: [PreloadScene, TitleScene],
    plugins: {
        global: [
            {
                key: "TweenManager",
                plugin: Phaser.Tweens.TweenManager,
                start: true,
            },
        ],
    },
    physics: {
        default: "arcade",
        arcade: {
            debug: false,
            gravity: { y: 300 },
        },
    },
    input: {
        keyboard: true,
        mouse: true,
        touch: true,
        gamepad: false,
    },
    render: {
        pixelArt: false,
        antialias: true,
    },
};

export default CONFIG;
