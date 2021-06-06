class UniquePeople extends Enemy {
    isOfInterest() {
        return true;
    }
}

class VonTruffle extends UniquePeople {
    constructor(_name = "Von Truffle") {
        super(_name);

        this.STRValue = 70;
        this.DEXValue = 40;

        this.currentMovepool = [ Yes ];

        this.truffleFriendly = true;

        this.godsList = [ GodManager.getGod("DickDickSon666") ]
    }
}

class Edimo extends UniquePeople {
    constructor(_name = "Edimo") {
        super(_name);

        this.STRValue = 200;
        this.DEXValue = 30;

        this.currentMovepool = [
            MoveManager.createMove(function execute(_user, _target = null) {
                _user.duel.addMessage(_user.getName() + " cuts through " + _target.getName() + " with an axe!");
                if (_target.damage(Math.floor(_user.STR/10))) {
                    _target.bleedDamage += 10;
                }

                _user.duel.addAnimation("cut", 60, _target, true, false);
            })
        ];
    }
}

class YandereDev extends UniquePeople {
    constructor(_name = "YandereDev") {
        super(_name);

        this.STRValue = 500;
        this.DEXValue = 40
        this.specialArmorValue = 1000;

        this.currentMovepool.push(DrinkFromChalice);
        this.firstTurn = true;

        this.isBoss = true;

        // TODO GOD
    }

    selectMove() {
        if (this.firstTurn) {
            this.chosenMove = DrinkFromChalice;
            this.firstTurn = false;
        }
        else super.selectMove();
    }
}

class Valurin extends UniquePeople {
    constructor(_name = "Valurin") {
        super(_name);

        this.STRValue = 300;
        this.DEXValue = 50;
    }
}
class ValurinBadger extends Enemy {
    constructor(_name = "Badger") {
        super(_name);

        this.STRValue = 100;
        this.DEXValue = 40;

        this.currentMovepool = [ PunchingPP ];
    }
}

class LoliconNota extends Deredere {
    constructor(_name = "Lolicon Nota") {
        super(_name);

        this.STRValue = 300;
        this.DEXValue = 50;
    }
}

class HololiveGirl extends UniquePeople {
    constructor(_name = "Undefined Hololive Girl") {
        super(_name);
        this.isFemale = true;

        this.STRValue = 200;
        this.DEXValue = 50;

        this.currentMovepool = [ Hologram ]; // then add one custom move for every character

        this.addRandomGod("waifu");
    }
}
class GroundPounder extends HololiveGirl {
    constructor(_name = "Ground Pounder") {
        super(_name);

        this.currentMovepool.push(MoveManager.createMove(function execute(_user, _target = null) {
            _user.duel.addMessage(_user.getName() + " ground pounds " + _target.getName() + "'s PP!");
            _target.damage(20 + Math.floor(_user.STR/8), "attack", _user);

            _user.duel.addAnimation("groundpound", 60, _target, true, false);
            _user.duel.memorySoundEffects.push("punchB");
        }));
    }
}
class EldritchGirl extends HololiveGirl {
    constructor(_name = "Eldritch Girl") {
        super(_name);

        this.currentMovepool.push(MoveManager.createMove(function execute(_user, _target = null) {
            _user.duel.triggeredChaos = true;
            _user.duel.addMessage(_user.getName() + " summons random eldritch chaotic powers!");

            var l = _user.duel.getAllFighters();
            for (var i in l) {
                if (l[i].isDead()) continue;

                var storedMove = {};
                storedMove["user"] = l[i];
                storedMove["move"] = l[i].getRandomMove();
                storedMove["target"] = _user.duel.getRandomFighter();
                _user.duel.memoryMoves.push(storedMove);
            }

            _user.duel.memorySoundEffects.push("darkMagic");
            _user.duel.addAnimation("summon", 60, _user);
        }));
    }
}
class FieryChicken extends HololiveGirl {
    constructor(_name = "Fiery Chicken") {
        super(_name);

        this.currentMovepool.push(MoveManager.createMove(function execute(_user, _target = null) {
            _user.duel.addMessage(_user.getName() + " burns " + _target.getName() + "'s PP!");
            _target.blueFire += Math.floor(_user.STR/10);

            _user.duel.addAnimation("fire", 60, _target, true, false);
            _user.duel.memorySoundEffects.push("flames");
            if (_target.isAlive()) _user.duel.memorySoundEffects.push(_target.getHurtSound());
        }));
    }
}
class DadReaper extends HololiveGirl {
    constructor(_name = "Dad Reaper") {
        super(_name);

        this.currentMovepool.push(BigGuy);
    }
}
class CityPopShark extends HololiveGirl {
    constructor(_name = "City Pop Shark") {
        super(_name);

        this.currentMovepool.push( BiteMove );

        this.specialArmorValue = 800;
        this.isBoss = true;
        this.relics.push(RelicManager.getRelic(7));
    }
}

class Shadooey extends UniquePeople {
    constructor(_name = "Shadooey") {
        super(_name);

        this.STRValue = 20;
        this.DEXValue = 50;

        this.currentMovepool = [ SawBlade ];
    }
}
class Dog extends UniquePeople {
    constructor(_name = "Dog") {
        super(_name);

        this.STRValue = 40;
        this.DEXValue = 30;

        this.currentMovepool = [ Wait ];
    }

    damage(_value, _type, _opponent = null) {
        this.duel.triggerDefeat();
        this.duel.memoryDialogues.push(76);

        return super.damage(_value, _type, _opponent);
    }
}

class ShadowAphroBase extends UniquePeople {
    constructor(_name = "Shadow Aphrodite (☆☆☆)") {
        super(_name);

        this.lifeFibers = 6;
        this.isBoss = true;

        this.addRandomGod("waifu");
    }
}
class ShadowAphroPhase1 extends ShadowAphroBase {
    constructor(_name = "Shadow Aphrodite (☆☆☆)") {
        super(_name);

        this.STRValue = 300;
        this.DEXValue = 40;

        this.nextPhase = ShadowAphroPhase2;
    }
}
class ShadowAphroPhase2 extends ShadowAphroBase {
    constructor(_name = "Shadow Aphrodite Regalia (MK I)") {
        super(_name);

        this.STRValue = 400;
        this.DEXValue = 50;

        this.specialArmorValue = 600;

        this.nextPhase = ShadowAphroPhase3;
    }
}
class ShadowAphroPhase3 extends ShadowAphroBase {
    constructor(_name = "Shadow Aphrodite Regalia (MK II)") {
        super(_name);

        this.STRValue = 600;
        this.DEXValue = 60;

        this.specialArmorValue = 1400;

        this.nextPhase = ShadowAphroPhase4;
    }
}
class ShadowAphroPhase4 extends ShadowAphroBase {
    constructor(_name = "Shadow Aphrodite Regalia (Unleashed)") {
        super(_name);

        this.STRValue = 1000;
        this.DEXValue = 70;

        this.specialArmorValue = 3000;
    }
}
