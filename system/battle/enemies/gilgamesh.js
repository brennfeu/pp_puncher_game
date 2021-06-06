class UrukPerson extends Enemy {
    constructor(_name = "Undefined Uruk Inhabitant") {
        super(_name);

        this.STRValue = 150;
        this.DEXValue = 50;
    }
}

class UrukMan extends UrukPerson {
    constructor(_name = "Uruk Man") {
        super(_name);

        this.currentMovepool = [ SwordMove, SawBlade ];
    }
}
class UrukWoman extends UrukPerson {
    constructor(_name = "Uruk Woman") {
        super(_name);
        this.isFemale = true;

        this.currentMovepool = [ AcidShot, SawBlade ];
    }
}
class UrukBride extends UrukWoman {
    constructor(_name = "Uruk Bride") {
        super(_name);

        this.specialArmorValue = 280;
    }
}

class Enkidu extends UrukPerson {
    constructor(_name = "Enkidu") {
        super(_name);

        this.STRValue = 0;// STR SET UP IN INIT
        this.AdaptiveDEXOffset = 5;

        this.currentMovepool = REGULAR_MOVE_LIST;

        this.isBoss = true;
    }

    initForDuel() {
        super.initForDuel();

        var l = this.duel.getOppsOf(this);
        for (var i in l) {
            this.STRValue += l[i].STR;
            this.specialArmorValue += l[i].STR;
        }
    }
}

class UrukElder extends UrukPerson {
    constructor(_name = "Uruk Elder") {
        super(_name);

        this.DEXValue += 5;

        this.currentMovepool = [ LostSoulMove ];
    }
}

class UrukGod extends UrukPerson {
    constructor(_name = "Undefined Uruk God") {
        super(_name);

        this.livingGod = true;
        this.reducedGodhood = true;

        this.DEXValue -= 25;
    }
}
class Ninsun extends UrukGod {
    constructor(_name = "Ninsun") {
        super(_name);
        this.isFemale = true;

        this.currentMovepool = [ LaughingSoul ];
    }
}
class Shamash extends UrukGod {
    constructor(_name = "Shamash") {
        super(_name);

        this.currentMovepool = [ Brolander, MoveManager.createMove(function execute(_user, _target = null) {
            _user.duel.addMessage(_user.getName() + " calls fire from the sun!");

            var l = _user.duel.getOppsOf(_user);
            for (var i in l) {
                var dmg = Math.floor(_user.STR/10);

                if (l[i].damage(dmg, "attack", _user)) {
                    l[i].blueFire += Math.floor(_user.DEX/3);
                }

                _user.duel.memorySoundEffects.push("flames");
                _user.duel.addAnimation("fire", 60, l[i]);
            }
        }) ];
    }

    turnChange() {
        super.turnChange();

        var l = this.duel.getOppsOf(this);
        for (var i in l) {
            l[i].blueFire += 2;
        }
    }
}

class Bull extends Enemy {
    constructor(_name = "Bull") {
        super(_name);

        this.STRValue = 250;
        this.DEXValue = 40;

        this.currentMovepool = [ BiteMove ];
    }

    getHurtSound() {
        return "hurtA_demon";
    }
}
class BullOfHeaven extends Bull {
    constructor(_name = "Bull Of Heaven") {
        super(_name);

        this.armorValue = 1000;
    }
}
class Lion extends Bull {
    constructor(_name = "Lion") {
        super(_name);
    }
}

class Thunderbird extends Enemy {
    constructor(_name = "Thunderbird") {
        super(_name);

        this.STRValue = 515;
        this.DEXValue = 50;

        this.addFightingStyle("electric");

        this.currentMovepool = [ Brolander, BlueFireball ];
    }

    getHurtSound() {
        return "hurtA_demon";
    }
}

class Humbaba extends Enemy {
    constructor(_name = "Humbaba") {
        super(_name);

        this.STRValue = 2000;
        this.DEXValue = 50;

        this.armorValue = 1000;

        this.currentMovepool = [ PunchingPP ];

        this.isFrightening = true;

        this.isBoss = true;
    }

    getHurtSound() {
        return "hurtA_demon";
    }
}

class AngelOfDeath extends Demon {
    constructor(_name = "Angel of Death") {
        super(_name);

        this.STRValue = 1000;
        this.DEXValue = 50;

        this.specialArmorValue = 2500;

        this.godOfDeath = true;

        this.currentMovepool = [ SatanMove, PunchingPP ];
    }
}

class Grief extends EnergyCreature {
    constructor(_name = "Grief") {
        super(_name);

        this.STRValue = 20;
        this.DEXValue = 30;

        this.currentMovepool = [ Wait ];
    }
}

class ScorpionMonster extends Enemy {
    constructor(_name = "Scorpion Monster") {
        super(_name);

        this.STRValue = 1000;
        this.DEXValue = 50;

        this.currentMovepool = [ AcidShot ];
    }

    getHurtSound() {
        return "hurtA_demon";
    }
}

class LotsOfTrees extends Enemy {
    constructor(_name = "120 Trees") {
        super(_name);

        this.STRValue = 12000;
        this.DEXValue = 0;

        this.currentMovepool = [ Wait ];
    }

    damage(_value, _type, _opponent = null) {
        var currentWood = ProgressManager.getValue("wood");
        if (currentWood == undefined) currentWood = 0;

        ProgressManager.setValue("wood", currentWood + _value);

        return super.damage(_value, _type, _opponent);
    }

    getHurtSound() {
        return "woodcut";
    }
}

class Gilgamesh extends UrukPerson {
    constructor(_name = "Gilgamesh - King of Heroes") {
        super(_name);

        this.STRValue = 500;
        this.DEXValue = 55;

        this.specialArmorValue = 2000;

        this.isBoss = true;

        this.nextPhase = GilgameshPhase2
    }

    hasValue(_id) {
        return true;
    }
}
class GilgameshPhase2 extends UrukPerson {
    constructor(_name = "Gilgamesh - God of the Underworld") {
        super(_name);

        this.STRValue = 1000;
        this.DEXValue = 30;

        this.specialArmorValue = 4000;

        this.isBoss = true;

        this.livingGod = true;
        this.reducedGodhood = true;
        this.godOfDeath = true;
    }

    hasValue(_id) {
        return true;
    }
}
