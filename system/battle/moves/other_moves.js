// faith moves
class RegularPriestMove extends Move {
    constructor() {
        super();
        this.name = "PP Pray";
        this.description = "Calls for the regular power of the gods you worship.";
        this.type = "faith";

        this.specialCheatProbabilty = 80;
    }

    execute(_user, _target = null) {
        _user.duel.addMessage(_user.getName() + " calls for divine powers!");

        if (_user.godsList.length == 0 ||
          _user.isSilenced) {
            _user.duel.addMessage("...but no one answers.");
            return;
        }

        _user.regularCharges = Math.max(0, _user.regularCharges-1);
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

        _user.duel.memorySoundEffects.push("extraLife");
    }
}
class SpecialPriestMove extends Move {
    constructor() {
        super();
        this.name = "PP Ritual";
        this.description = "Calls for the special power of the gods you worship.";
        this.type = "faith";

        this.specialCheatProbabilty = 95;
    }

    execute(_user, _target = null) {
        _user.duel.addMessage(_user.getName() + " calls for superior divine powers!");

        if (_user.godsList.length == 0 ||
          _user.isSilenced) {
            _user.duel.addMessage("...but no one answers.");
            return;
        }

        _user.specialCharges = Math.max(0, _user.specialCharges-1);
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

        _user.duel.memorySoundEffects.push("extraLife");
    }
}

// dev test moves
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

// special moves that shouldn't appear in game
class TriggerNextPhase extends Move {
    execute(_user, _target = null) {
        for (var i in _user.duel.enemies) {
            if (_user.duel.enemies[i].id == _user.id) {
                // create a new instance of the next phase
                var next = _user.nextPhase.newInstance();
                var obj = Fighter.SPECIAL_OBJECTS;
                for (var j in obj) {
                    next[obj[j]] = _user[obj[j]];
                }

                // message and sound effect
                _user.duel.addMessage(_user.getNextPhaseText());
                if (_user.getNextPhaseSound() != null) _user.duel.memorySoundEffects.push(_user.getNextPhaseSound());

                // change in memory
                for (var j in _user.duel.heroes) {
                    if (_user.duel.heroes[j].chosenTarget != null && _user.duel.heroes[j].chosenTarget.id == _user.id) _user.duel.heroes[j].chosenTarget = next;
                }
                _user.duel.enemies[i] = next;

                // make sure the existing object does not trigger next phase again
                _user.nextPhase = null;
                return;
            }
        }
    }
}

var l = [];
if (DEV_MODE) l=l.concat([ InstaKill, MegaBuff, Wait ]);

const OTHER_MOVE_LIST = [ RegularPriestMove, SpecialPriestMove ].concat(l);
