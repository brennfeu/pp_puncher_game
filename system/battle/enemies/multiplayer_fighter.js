class HeroEnemy extends Enemy {
    constructor(_hero) {
        super(_hero.name);

        for (var i in _hero) {
            if (["id"].indexOf(i) > -1) continue;
            this[i] = _hero[i];
        }

        this.currentMovepool = REGULAR_MOVE_LIST;
    }

    getName() {
        return "Alt. " + super.getName();
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

    selectTarget() { Logger.warning("MultiplayerEnemy " + this.name + " tried to select a target!"); }
    selectHero() { Logger.warning("MultiplayerEnemy " + this.name + " tried to select a move!"); }
}
