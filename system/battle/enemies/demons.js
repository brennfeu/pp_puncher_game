class Demon extends Enemy {
    constructor(_name = "Undefined Demon") {
        super(_name);

        this.nextPhase = DemonicSoul;

        this.godsList.push(GodManager.getGod("Rias"));
    }

    getNextPhaseText() {
        return this.getName() + "'s soul haunts the battlefield!";
    }

    getHurtSound() {
        return "hurtA_demon";
    }
}

class MinorDemon extends Demon {
    constructor(_name = "Minor Demon") {
        super(_name);

        this.STRValue = 120;
        this.DEXValue = 40;

        this.currentMovepool = [ PunchingPP, SatanMove ];
    }

    selectMove() {
        var hasPossessed = false;
        var l = this.duel.getOppsOf(this);
        for (var i in l) if (l[i].possessedBy != null && l[i].possessedBy.id == this.id) hasPossessed = true;

        if (!hasPossessed) {
            this.chosenMove = SatanMove;
        }
        else {
            this.chosenMove = PunchingPP;
        }
    }
}
class GoatDemon extends Demon {
    constructor(_name = "Goat Demon") {
        super(_name);

        this.STRValue = 500;
        this.DEXValue = 45;

        this.currentMovepool = [ PunchingPP, PunchingPPReallyHard, MoveManager.createMove(function execute(_user, _target = null) {
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
        }) ];
    }
}
// big demons are frightening, and can use bigsatan?

class Oni extends Demon {
    constructor(_name = "Oni") {
        super(_name);

        this.STRValue = 200;
        this.DEXValue = 40;

        this.armorValue = 300;

        this.currentMovepool = [ PunchingPP, MoveManager.createMove(function execute(_user, _target = null) {
            _user.duel.addMessage(_user.getName() + " trolls " + _target.getName() + "!");
            _target.isTrolled = 2;

            _user.duel.memorySoundEffects.push("laugh");
            _user.duel.addAnimation("trolled", 60, _target);
        }) ];
    }
}
class FakeOni extends Demon {
    constructor(_name = "Oni") {
        super(_name);

        this.STRValue = 1;
        this.DEXValue = 9999999999;

        this.currentMovepool = [ MoveManager.createMove(function execute(_user, _target = null) {
            _user.duel.addMessage(_user.getName() + " trolls PP Arbitrator!");

            var storedMove = {};
            storedMove["user"] = _user;
            storedMove["move"] = MoveManager.createMove(function execute(_user, _target = null) {
                _user.setSTR(-1);
                _user.duel.uwuText = true;
                _user.duel.addMessage("UwU mode activated!");
            });
            storedMove["target"] = null;
            _user.duel.memoryMoves.push(storedMove);
        }, { "needsTarget": false, "autoPass": true, "priority": true }) ];

        this.nextPhase = null;
    }
}

class Sadako extends Demon {
    constructor(_name = "Sadako") {
        super(_name);

        this.STRValue = 500;
        this.DEXValue = 40;

        this.currentMovepool = [ BigGuy ];

        this.isFrightening = true;
    }

    turnChange() {
        var l = this.duel.getOppsOf(this);
        for (var i in l) {
            if (l[i].isAlive() && l[i].DEX <= 0) {
                this.duel.memoryTurnChange.push(Function("_fighter",
                    'var target = _fighter.duel.getFighterFromId(' + l[i].id + ');\n' +
                    '_fighter.duel.addMessage(_fighter.getName() + " haunts " + target.getName() + "!");\n' +
                    'target.damage(10 + Math.floor(_fighter.STR/10), "attack", _fighter);'
                ));
            }
        }

        return super.turnChange();
    }
}

class Shinigami extends Demon {
    constructor(_name = "Shinigami") {
        super(_name);

        this.STRValue = 250;
        this.DEXValue = 40;

        this.armorValue = 250;
        this.specialArmorValue = 250;

        this.godOfDeath = true;

        this.currentMovepool = [ PunchingPP, PunchingPPReallyHard, BigGuy, SawBlade ];
    }
}
class EpicShinigami extends Shinigami {
    constructor(_name = "Epic Shinigami") {
        super(_name);

        this.STRValue = 800;
        this.DEXValue = 60;

        this.specialArmorValue = 2500
        this.isBoss = true;

        this.currentMovepool.push(Save);
    }
}

class Dokkaebi extends Demon {
    constructor(_name = "Dokkaebi") {
        super(_name);

        this.STRValue = 100;
        this.DEXValue = 35;

        this.currentMovepool = [ PunchingPP ];
    }

    damage(_value, _type, _opponent = null) {
        super.damage(_value, _type, _opponent);

        if (_opponent != null) {
            this.duel.addMessage(_opponent.getName() + " burns!");
            _opponent.blueFire += Math.floor(this.DEX/2);
        }
    }
}
