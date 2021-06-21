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
            storedMove["user"] = _user;
            storedMove["move"] = _user.godsList[i].getRegularAttackAsMove();
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
            storedMove["user"] = _user;
            storedMove["move"] = _user.godsList[i].getSpecialAttackAsMove();
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
class KillParty extends Move {
    constructor() {
        super();
        this.name = "Kill Party";
        this.description = "Dev Test, all party members have -9999999 HP.";
        this.priority = true;
        this.autoPass = true;
        this.needsTarget = false;
        this.type = "Dev Test";
    }

    execute(_user, _target = null) {
        _user.duel.addMessage(_user.getName() + " uses the power of being a dev!");

        for (var i in _user.duel.heroes) {
            _user.duel.heroes[i].STRValue = -99999999;
            _user.duel.heroes[i].damage(1000);
            _user.duel.addMessage(_user.duel.heroes[i].getName() + " dies!");
        }

        _user.duel.memorySoundEffects.push("darkMagic");
    }
}

// relic moves
class PPBibleMove extends Move {
    constructor() {
        super();
        this.name = "PP Bible";
        this.description = "Grants a random buff and a random debuff to every fighter on the battlefield.";
        this.autoPass = true;
        this.needsTarget = false;
        this.type = "relic";
    }

    execute(_user, _target = null) {
        _user.duel.addMessage(_user.getName() + " summons the PP Bible!");

        var l = _user.duel.getAllFighters();
        for (var i in l) {
            if (l[i].isDead()) continue;

            l[i].addRandomBuff();
            l[i].addRandomDebuff();
            _user.duel.addMessage(l[i].getName() + " gets a random buff and a random debuff!");
            _user.duel.addAnimation("buff", 60, l[i]);
            _user.duel.addAnimation("debuff", 60, l[i]);
        }

        _user.duel.memorySoundEffects.push("darkMagic");
    }
}
class DrinkFromChalice extends Move {
    constructor() {
        super();
        this.name = "Mmmmmh Milk";
        this.description = "Grants 5 random buffs to the user.";
        this.autoPass = true;
        this.needsTarget = false;
        this.type = "relic";
    }

    execute(_user, _target = null) {
        _user.duel.addMessage(_user.getName() + " drinks from the Cum Chalice!");

        _user.addRandomBuff();
        _user.addRandomBuff();
        _user.addRandomBuff();
        _user.addRandomBuff();
        _user.addRandomBuff();

        _user.duel.memorySoundEffects.push("drink");
        _user.duel.addAnimation("milk", 60, _user);
    }
}

// enemies
class BlueFireball extends Move {
    execute(_user, _target = null) {
        _user.duel.addMessage(_user.getName() + " casts a Blue Fireball!");

        var l = _user.duel.getOppsOf(_user);
        for (var i in l) {
            var dmg = Math.floor(_user.STR/10);
            if (l[i].rolledDEX >= _user.rolledDEX) {
                dmg = Math.floor(dmg/2);
            }
            else {
                _user.duel.memorySoundEffects.push("flames");
                _user.duel.addAnimation("fire", 60, l[i]);
            }

            if (l[i].damage(dmg, "attack", _user)) {
                l[i].blueFire += Math.floor(_user.DEX/3);
            }
        }
    }
}
class BiteMove extends Move {
    execute(_user, _target = null) {
        _user.duel.addMessage(_user.getName() + " bites " + _target.getName() + "'s PP!")
        if (_target.damage(Math.floor(_user.STR/10), "attack", _user)) {
            _target.bleedDamage += Math.floor(_user.STR/10);
        }

        _user.duel.memorySoundEffects.push("sword");
        _user.duel.addAnimation("bite", 60, _target, true, false);
    }
}

// others
class ActivateLeverMove extends Move {
    constructor() {
        super();
        this.name = "Activate";
        this.description = "Activate the targeted lever.";
        this.priority = true;
        this.autoPass = true;
        this.type = "other";
    }

    execute(_user, _target = null) {
        try {
            _target.activateLever();
            _user.duel.addMessage(_user.getName() + " activates " + _target.getName() + ".");
            _user.duel.addAnimation("activated", 60, _target);
        }
        catch(e) {
            _user.duel.addMessage(_target.getName() + " couldn't be activated.");
        }
    }
}
class PetTheDog extends Move {
    constructor() {
        super();
        this.name = "Pet";
        this.description = "Pets the dog.";
        this.autoPass = true;
        this.type = "other";
    }

    execute(_user, _target = null) {
        _user.duel.addMessage(_user.getName() + " pets " + _target.getName() + "!");

        _user.duel.addAnimation("pet", 60, _target);

        if (_target instanceof Dog) {
            var storedMove = {};
            storedMove["user"] = _user;
            storedMove["move"] = MoveManager.createMove(function(_user) { _user.duel.triggerVictory(); });
            storedMove["target"] = _target;
            _user.duel.memoryMoves.push(storedMove);
        }
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
class TriggerStand extends Move {
    execute(_user, _target = null) {
        var standId = _target; // since this is a no-target move, I use target to get the stand id instead
        console.log(standId);

        _user.duel.addMessage(_user.getName() + " summons " + StandManager.getStand(standId).name + "!");
        _user.setStand(standId);
        _user.triggerStandAbilities();

        _user.duel.memorySoundEffects.push("standSummon");
    }
}

var l = [];
if (DEV_MODE) l=l.concat([ InstaKill, MegaBuff, Wait, KillParty ]);

const OTHER_MOVE_LIST = [ RegularPriestMove, SpecialPriestMove ].concat(l);
