class InstaKill extends Move {
    constructor() {
        super();
        this.name = "Insta Win";
        this.description = "Dev Test, all enemies have -9999999 HP.";
        this.priority = true;
        this.autoPass = true;
        this.needsTarget = false;
        this.type = "Dev Test";
    }

    execute(_user, _target = null) {
        _user.duel.addMessage(_user.getName() + " uses the power of being a dev!");

        for (var i in _user.duel.enemies) {
            _user.duel.enemies[i].STRValue = -99999999;
            _user.duel.addMessage(_user.duel.enemies[i].getName() + " dies!");
        }

        _user.duel.memorySoundEffects.push("darkMagic");
    }
}
class MegaBuff extends Move {
    constructor() {
        super();
        this.name = "Mega Buff";
        this.description = "Dev Test, all heroes get 99999999999 STR AND DEX";
        this.priority = true;
        this.autoPass = true;
        this.needsTarget = false;
        this.type = "Dev Test";
    }

    execute(_user, _target = null) {
        _user.duel.addMessage(_user.getName() + " uses the power of being a dev!");

        for (var i in _user.duel.heroes) {
            _user.duel.heroes[i].STRValue = 99999999999;
            _user.duel.heroes[i].DEXValue = 99999999999;
            _user.duel.addMessage(_user.duel.heroes[i].getName() + " is buffed!");
        }

        _user.duel.memorySoundEffects.push("darkMagic");
    }
}
class Wait extends Move {
    constructor() {
        super();
        this.name = "Wait";
        this.description = "Dev Test, does nothing...";
        this.dexChange = -99999999999;
        this.autoPass = true;
        this.needsTarget = false;
        this.type = "Dev Test";
    }

    execute(_user, _target = null) {
        _user.duel.addMessage(_user.getName() + " does nothing...");
    }
}

var l = [];
if (DEV_MODE) l=l.concat([ InstaKill, MegaBuff, Wait ]);
const OTHER_MOVE_LIST = [].concat(l);
