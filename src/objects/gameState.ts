import Player from "./player";

export class gameState {
    player: Player;
    level: number;
    hasAnims: boolean;
    constructor(player: Player, level: number, hasAnims: boolean) {
        this.player = player;
        this.level = level;
        this.hasAnims = hasAnims;
    }
}
