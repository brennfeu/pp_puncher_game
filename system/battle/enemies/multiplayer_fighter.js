class HeroEnemy extends Enemy {
    constructor(_hero) {
        super(_hero.name);

        for (var i in _hero) {
            if (i == "id") continue;
            this[i] = _hero[i];
        }

        this.currentMovepool = REGULAR_MOVE_LIST;
    }
}

class MultiplayerEnemy extends HeroEnemy {
    constructor(_hero) {
        if (_hero == undefined) return super(""); // for multiplayer JSON gathering
        super(_hero);

        for (var i in _hero) {
            if (i == "id") continue;
            this[i] = _hero[i];
        }
    }

    selectTarget() { console.log("Warning: MultiplayerEnemy " + this.name + " tried to select a target!"); }
    selectHero() { console.log("Warning: MultiplayerEnemy " + this.name + " tried to select a move!"); }
}
