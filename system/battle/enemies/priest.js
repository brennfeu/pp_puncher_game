class PriestEnemy extends Enemy {
    constructor(_name = "Cleric", _gods = null) {
        super(_name);

        this.STRValue = 100;
        this.DEXValue = 40;

        this.godsList = _gods;
        if (this.godsList == null) {
            this.godsList = [];
            this.addRandomGod();
        }
        else {
            for (var i in this.godsList) {
                this.godsList[i] = GodManager.getGod(this.godsList[i]);
            }
        }

        this.shieldOfFaith = true;

        this.newChargeChance = 33;

        this.nextPhase = UnrestingSoul;
    }

    turnChange() {
        super.turnChange();

        if (getRandomPercent() <= this.newChargeChance) this.rollFreePriestCharge();
    }
    rollFreePriestCharge() {
        if (getRandomPercent() <= 10) {
            this.specialCharges += 1;
        }
        else {
            this.regularCharges += 1;
        }
    }

    getNextPhaseText() {
        return this.getName() + "'s soul haunts the battlefield!";
    }

    hasSynergy(_synergy) { return false } // no synergies
}
class HighCleric extends PriestEnemy {
    constructor(_name = "High Cleric", _gods = null) {
        super(_name, _gods);

        this.STRValue = 150;
        this.DEXValue = 40;

        this.newChargeChance = 66;
    }
}

class TutorialPriest extends PriestEnemy {
    constructor(_name = undefined, _gods = []) {
        var l = _gods;
        l.push(randomFromList(GodManager.STARTER_GODS));

        super(_name, l);

        this.nextPhase = null; // no unresting soul
    }
}
class ClericMaintainers extends TutorialPriest {
    constructor(_name = "Evil Cleric Maintainer", _gods = []) {
        super(_name, _gods);

        this.nbActions = 3;
    }
}

class OneGodCleric extends PriestEnemy {
    constructor(_god = null) {
        var l = [];
        l.push(_god);
        super(undefined, l);
    }
}

class Faith extends Enemy {
    constructor(_name = "Faith") {
        super(_name);

        this.STRValue = 5000;
        this.DEXValue = 50;

        this.currentMovepool = [ Save ];

        this.regularCharges = 111;
        this.specialCharges = 111;
        this.shieldOfFaith = true;

        this.isBoss = true;
    }

    selectMove() {
        if (getRandomPercent() <= 5) {
            this.chosenMove = SpecialPriestMove;
        }
        else {
            this.chosenMove = RegularPriestMove;
        }
    }

    turnChange() {
        super.turnChange();

        this.regularCharges = 111;
        this.specialCharges = 111;

        this.godsList = randomFromList([
            [GodManager.getGod("Brenn"), GodManager.getGod("Country Music Brenn"), GodManager.getGod("Chad Brenn")],
            [GodManager.getGod("Hello There Puds"), GodManager.getGod("DickDickSon666"), GodManager.getGod("UREGonnaGetRAPED")],
            [GodManager.getGod("Ranger"), GodManager.getGod("Salt King")]
        ]);
    }

    getHurtSound() {
        return null;
    }
}
class FaithFirstBattle extends Faith {
    constructor(_name = "Faith") {
        super(_name);

        this.currentMovepool = [ MoveManager.createMove(function execute(_user, _target = null) {
            _user.duel.addMessage(_user.getName() + " enters " + _target.getName() + "!");
            _target.damage(Math.floor(_target.STR/2)+20, "attack", _user)
            _user.attackCounter += 1;

            _user.duel.memorySoundEffects.push("extraLife");
            _user.duel.addAnimation("faith", 60, _target);
        }) ];

        this.attackCounter = 0;
    }

    selectMove() {
        this.chosenMove = this.currentMovepool[0];
    }

    turnChange() {
        if (this.attackCounter >= 1) {
            this.duel.memoryTurnChange.push(function(_fighter) {
                _fighter.duel.triggerVictory();

                _fighter.duel.memoryDialogues.push(32);
            });
        }
        this.attackCounter += 1;

        return super.turnChange();
    }
}
