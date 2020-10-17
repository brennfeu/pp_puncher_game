class RegularPriestMove extends Move {
    constructor() {
        super();
        this.name = "PP Pray";
        this.description = "Calls for the regular power of the gods you worship.";
        this.type = "faith";

        this.specialCheatProbabilty = 0;
    }

    execute(_user, _target = null) {
        _user.duel.addMessage(_user.getName() + " calls for divine powers!");

        if (_user.godsList.length == 0 || _user.regularCharges <= 0) {
            _user.duel.addMessage("...but no one answers.");
            return;
        }

        _user.regularCharges -= 1;
        for (var i in _user.godsList) {
            var storedMove = {};
            var move = MoveManager.createMove(function(_user, _target = null, _godIndex = this.__proto__.constructor.godIndex) {
                _user.duel.addMessage(_user.godsList[_godIndex].name + " answers his calls!");
                _user.godsList[_godIndex].normalMove(_user, _target);
            });
            move.godIndex = i;

            storedMove["user"] = _user;
            storedMove["move"] = move
            storedMove["target"] = _target;
            _user.duel.memoryMoves.push(storedMove);
        }
    }
}
class SpecialPriestMove extends Move {
    constructor() {
        super();
        this.name = "PP Ritual";
        this.description = "Calls for the regular power of the gods you worship.";
        this.type = "faith";

        this.specialCheatProbabilty = 0;
    }

    execute(_user, _target = null) {
        _user.duel.addMessage(_user.getName() + " calls for superior divine powers!");

        if (_user.godsList.length == 0 || _user.specialCharges <= 0) {
            _user.duel.addMessage("...but no one answers.");
            return;
        }

        _user.specialCharges -= 1;
        for (var i in _user.godsList) {
            var storedMove = {};
            var move = MoveManager.createMove(function(_user, _target = null, _godIndex = this.__proto__.constructor.godIndex) {
                _user.duel.addMessage(_user.godsList[_godIndex].name + " answers his calls!");
                _user.godsList[_godIndex].specialMove(_user, _target);
            });
            move.godIndex = i;

            storedMove["user"] = _user;
            storedMove["move"] = move
            storedMove["target"] = _target;
            _user.duel.memoryMoves.push(storedMove);
        }
    }
}

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

const OTHER_MOVE_LIST = [ RegularPriestMove, SpecialPriestMove ].concat(l);
