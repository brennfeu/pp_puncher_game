class EnergyCreature extends Enemy {
    turnChange() {
        this.bleedDamage = 0;

        return super.turnChange();
    }

    getHurtSound() {
        return "soul_hurt";
    }

    // TODO god = Hermit
}

class SpiritGuardian extends EnergyCreature {
    constructor(_name = "Spirit Guardian") {
        super(_name);

        this.STRValue = 80;
        this.DEXValue = 30;

        this.currentMovepool = [ MoveManager.createMove(function execute(_user, _target = null) {
            _user.duel.addMessage(_user.getName() + " attacks " + _target.getName() + "!");

            if (_target.damage(Math.floor(_user.STR/5), "attack", _user) && _target.rollLuckPercentHigh() <= 33) {
                _user.duel.addMessage(_target.getName() + " is frightened!");
                _target.noDex = 2;
            }

            _user.duel.memorySoundEffects.push("ghostSound");
            if (getRandomPercent() <= 50) _user.duel.addAnimation("necrotic", 60, _target);
            else _user.duel.addAnimation("radiance", 60, _target);
        }) ];
        this.isFrightening = true;
    }
}
class GuardianOfFaith extends EnergyCreature {
    constructor(_name = "Guardian Of Faith") {
        super(_name);

        this.STRValue = 100;
        this.DEXValue = 30;

        this.currentMovepool = [ SwordMove, ShieldMove ]
    }

    selectMove() {
        if (this.riotShield) {
            this.chosenMove = SwordMove;
        }
        else {
            return super.selectMove();
        }
    }
}

class EnergyBarrier extends EnergyCreature {
    constructor(_name = "Energy Barrier") {
        super(_name);

        this.STRValue = 2000;
        this.DEXValue = 40;

        this.currentMovepool = [ Save ];

        this.boss = true;
    }
}
class EnergyBarrier2 extends EnergyBarrier {
    constructor(_name = "Energy Barrier") {
        super(_name);

        this.STRValue = 3000;

        this.shieldOfFaith = true;

        this.godCounter = 0;
        this.godsListPlanned = shuffleArray(GodManager.STARTER_GODS);
    }

    turnChange() {
        super.turnChange();

        if (getRandomPercent() <= this.newChargeChance) this.rollFreePriestCharge();
        this.godCounter += 1;
        if (this.godCounter >= 3 && this.godsList.length < this.godsListPlanned.length) {
            this.godCounter = 0;
            this.godsList.push(GodManager.getGod(this.godsListPlanned[this.godsList.length]));
        }
    }
    rollFreePriestCharge() {
        if (getRandomPercent() <= 30) {
            this.specialCharges += 1;
        }
        else {
            this.regularCharges += 1;
        }
    }
}
class EnergyMonster extends EnergyCreature {
    constructor(_name = "Energy") {
        super(_name);

        this.STRValue = 200;
        this.DEXValue = 30;
    }
}

class UnrestingSoul extends EnergyCreature {
    constructor(_name = "Unresting Soul") {
        super(_name);

        this.STRValue = 50;

        this.currentMovepool = [ BigGuy ];
    }
}

class TempleTrial extends EnergyCreature {
    constructor(_name) {
        super(_name);

        this.STRValue = 500;
        this.DEXValue = 30;

        var s = GodManager.getSynergy(_name);
        for (var i in s.requiredGods) {
            this.godsList.push(s.requiredGods[i]);
        }
    }
}

class SynergySpirit extends EnergyCreature {
    constructor(_name = "Synergy Spirit", _synergy) {
        super(_name);

        this.STRValue = 50;
        this.DEXValue = 30;

        var s = GodManager.getSynergy(_synergy);
        for (var i in s.requiredGods) {
            this.godsList.push(s.requiredGods[i]);
        }
    }
}

class DemonicSoul extends EnergyCreature {
    constructor(_name = "Demonic Soul") {
        super(_name);

        this.STRValue = 80;
        this.DEXValue = 30;

        this.currentMovepool = [ LaughingSoul ];
    }
}

class ChristianSpirit extends EnergyCreature {
    constructor(_name = "Christian Spirit") {
        super(_name);

        this.STRValue = 150;
        this.DEXValue = 35;

        this.currentMovepool = [ MoveManager.createMove(function execute(_user, _target = null) {
            _user.duel.addMessage(_user.getName() + " attacks " + _target.getName() + "!");
            _target.damage(Math.floor(_user.STR/5), "attack", _user)

            _user.duel.memorySoundEffects.push("ghostSound");
            _user.duel.addAnimation("radiance", 60, _target);
        }) ];

        this.godsList.push(GodManager.getGod("Wyndoella"));
    }
}
class TrueCrossSpirit extends ChristianSpirit {
    constructor(_name = "True Cross Spirit") {
        super(_name);

        this.STRValue = 400;
        this.DEXValue = 50;
        this.specialArmorValue = 1100;

        this.currentMovepool = [ MoveManager.createMove(function execute(_user, _target = null) {
            _user.duel.addMessage(_user.getName() + " attacks " + _target.getName() + "!");
            _target.damage(Math.floor(_user.STR/5), "attack", _user);
            _target.confusion = 2;

            _user.duel.memorySoundEffects.push("ghostSound");
            _user.duel.addAnimation("radiance", 60, _target);
        }) ]

        this.godsList.push(GodManager.getGod("Wyndoella"));

        this.isBoss = true;
    }
}

class FearMePls extends EnergyCreature {
    constructor(_name = "fear me pls") {
        super(_name);

        this.STRValue = 1;
        this.DEXValue = 1;

        this.currentMovepool = [ GodManager.getGod("Hello There Puds").getRegularAttackAsMove() ];

        this.godsList = [ GodManager.getGod("Hello There Puds") ];

        this.nextPhase = FearMePlsPhaseTwo;
    }

    getNextPhaseText() {
        return this.getName() + "'s body appear! It's super tall and thin, and slightly transparent. It doesn't have any facial feature, just a pair of sunglasses.";
    }
}
class FearMePlsPhaseTwo extends FearMePls {
    constructor(_name = "I TOLD YOU TO FEAR ME") {
        super(_name);

        this.STRValue = 500;
        this.DEXValue = 40;

        this.nextPhase = null;
    }
}

class OdditySpirit extends EnergyCreature {
    constructor(_name = "Spirit") {
        super(_name);

        this.STRValue = 100;
        this.DEXValue = 40;

        this.currentMovepool = [ PunchingPP ];
    }
}
class Oddity extends EnergyCreature {
    constructor(_name = "???") {
        super(_name + " Oddity");

        this.STRValue = 200;
        this.DEXValue = 40;

        this.godsList = [ GodManager.getGod("Senjougahara") ];
    }
}
class CrabOddity extends Oddity {
    constructor(_name = "Crab") {
        super(_name);

        this.currentMovepool = [ GodManager.getGod("Senjougahara").getSpecialAttackAsMove(false) ];
    }
}
class SnailOddity extends Oddity {
    constructor(_name = "Snail") {
        super(_name);

        this.currentMovepool = [ MoveManager.createMove(function execute(_user, _target = null) {
            _user.duel.addMessage(_user.getName() + " curses " + _target.getName() + "!");

            _target.blindness = 2;
            _target.confusion = 2;

            _user.duel.memorySoundEffects.push("ghostSound");
            _user.duel.addAnimation("curse", 60, _target);
        }) ];
    }
}
class MonkeyOddity extends Oddity {
    constructor(_name = "Monkey") {
        super(_name);

        this.currentMovepool = [ MoveManager.createMove(function execute(_user, _target = null) {
            _user.duel.addMessage(_user.getName() + " attacks " + _target.getName() + "!");

            if(_target.damage(20 + Math.floor(_user.STR/8), "attack", _user)) {
                _target.bleedDamage += Math.floor(_user.STR/15);
            }

            _user.duel.addAnimation("attack", 60, _target, true, false);
            _user.duel.memorySoundEffects.push("punchB");
        }) ];
    }
}
class CatOddity extends Oddity {
    constructor(_name = "Cat") {
        super(_name);

        this.currentMovepool = [ MoveManager.createMove(function execute(_user, _target = null) {
            _user.duel.addMessage(_user.getName() + " attacks " + _target.getName() + "!");

            var value = Math.floor(_user.STR/10);
            if(_target.damage(value, "attack", _user)) {
                _user.heal(value, "inner");
            }

            _user.duel.addAnimation("drain", 60, _target, true, false);
            _user.duel.memorySoundEffects.push("punchA");
        }) ];
    }
}
class SnakeOddity extends Oddity {
    constructor(_name = "Snake") {
        super(_name);

        this.currentMovepool = [ MoveManager.createMove(function execute(_user, _target = null) {
            _user.duel.addMessage(_user.getName() + " attacks " + _target.getName() + "!");

            if(_target.damage(20 + Math.floor(_user.STR/8), "attack", _user)) {
                _target.scalyScars += 3;
            }

            _user.duel.addAnimation("attack", 60, _target, true, false);
            _user.duel.memorySoundEffects.push("punchB");
        }) ];
    }
}
class DarknessOddity extends EnergyCreature {
    constructor(_name = "The Darkness") {
        super(_name);

        this.STRValue = 5;
        this.DEXValue = 0;

        this.currentMovepool = [ MoveManager.createMove(function execute(_user, _target = null) {
            _user.swallowFighter(_target);
        }) ];
    }

    damage(_value, _type, _opponent = null) {
        if (_type == "auto") return super.damage(_value, _type, _opponent);
        else if (_type == "attack") this.swallowFighter(_opponent);
        return false;
    }

    swallowFighter(_fighter) {
        _fighter.setSTR(-999999999);
        this.duel.addMessage(_fighter.getName() + " gets swallowed by the Darkness!");

        this.duel.memorySoundEffects.push("darkMagic");
        this.duel.addAnimation("darkness", 60, _fighter);
    }

    getAllStatus() {
        var list = super.getAllStatus();

        var status = {};
        status["display"] = "Turn(s) left: " + this.STR;
        status["icon"] = "other/depression";
        list.push(status);

        return list;
    }

    turnChange() {
        this.STRValue -= 1;

        return super.turnChange();
    }

    getHurtSound() {
        return null;
    }
}

class FamilyFriendly extends EnergyCreature {
    constructor(_name = "Family Friendly") {
        super(_name);

        this.STRValue = 150;
        this.DEXValue = 50;

        this.currentMovepool = [ MoveManager.createMove(function execute(_user, _target = null) {
            _user.duel.addMessage(_user.swornEnemy.name + " kills " + _user.getName() + "!");
            _user.damage(1000, "attack", _user.swornEnemy);
            _user.duel.addMessage(_user.getName() + " is DEAD! D.E.A.D.!");
        }, function(_move) {
            _move.autoPass = true;
        }) ];

        this.swornEnemy = new ElectricKettleAlien();
    }

    damage(_value, _type, _opponent = null) {
        if (_type == "auto") return super.damage(_value, _type, _opponent);
        else if (_type == "attack" && _opponent.name == this.swornEnemy.name) super.damage(_value, _type, _opponent);

        this.duel.addMessage("You can't hurt the " + this.getName() + ".");
        return false;
    }

    getHurtSound() {
        return null;
    }
}
