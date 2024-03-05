import Player from "./player";

export class gameState {
    player: Player;
    level: number;
    constructor(player: Player, level: number) {
        this.player = player;
        this.level = level;
    }
}
