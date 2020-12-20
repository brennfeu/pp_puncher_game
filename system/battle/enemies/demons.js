class Demon extends Enemy {
    constructor(_name = "Undefined Demon") {
        super(_name);

        this.nextPhase = DemonicSoul;
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

// big demons are firghtening, and can use bigsatan?
