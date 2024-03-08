class Player {
    name: string;
    hearts: number;
    shields: number;
    weapons: string[];
    items: string[];
    constructor(
        name: string,
        hearts: number,
        shields: number,
        weapons: string[],
        items: string[]
    ) {
        this.name = name;
        this.hearts = hearts;
        this.shields = shields;
        this.weapons = weapons;
        this.items = items;
    }
}

export default Player;
