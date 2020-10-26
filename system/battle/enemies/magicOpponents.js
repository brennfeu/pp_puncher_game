class EnergyCreature extends Enemy {
    turnChange() {
        this.bleedDamage = 0;

        return super.turnChange();
    }

    getHurtSound() {
        return "soul_hurt";
    }
}

class SpiritGuardian extends EnergyCreature {
    constructor(_name = "Spirit Guardian") {
        super(_name);

        this.STRValue = 80;
        this.DEXValue = 30;

        this.currentMovepool = [ MoveManager.createMove(function execute(_user, _target = null) {
            _user.duel.addMessage(_user.getName() + " attacks " + _target.getName() + "!");

            if (_target.damage(Math.floor(_user.STR/5), "attack", _user) && getRandomPercent() <= 33) {
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
