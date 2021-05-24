class Alien extends Enemy {
    constructor(_name = "Undefined Alien") {
        super(_name);

        // TODO god = ???
    }

    getHurtSound() {
        return "hurtA_alien";
    }
}

class ElectricKettleAlien extends Alien {
    constructor(_name = "Electric Kettle Alien") {
        super(_name);

        this.STRValue = 1015;
        this.DEXValue = 50;

        this.armorValue = 2000;
        this.specialArmorValue = 500;

        this.addFightingStyle("electric");
        this.isBoss = true;

        this.currentMovepool = [ PunchingPP, LaughingSoul ];
    }
}

class Molbol extends Alien {
    constructor(_name = "Molbol") {
        super(_name);

        this.STRValue = 300;
        this.DEXValue = 45;

        this.BadBreathMove = MoveManager.createMove(function execute(_user, _target = null) {
            _user.duel.addMessage(_user.getName() + " uses its bad breath on its opponents!");
            var l = _user.duel.getOppsOf(_user);

            for (var i in l) {
                if (l[i].isDead()) continue;

                l[i].addRandomDebuff();
                if (l[i].isAlive()) _user.duel.memorySoundEffects.push(l[i].getHurtSound());
                _user.duel.addAnimation("debuffed", 60, l[i]);
            }
        },
            function specificationFunction(_move) {
                _move.needsTarget = false;
            }
        )
        this.currentMovepool = [ AcidShot, this.BadBreathMove ];

        this.badBreathProbability = 25;
    }

    selectMove() {
        if (this.rollLuckPercentLow() <= this.badBreathProbability) {
            this.chosenMove = this.BadBreathMove;
        }
        else {
            this.chosenMove = AcidShot;
        }
    }
}
class GreatMolbol extends Molbol {
    constructor(_name = "Great Molbol") {
        super(_name);

        this.specialArmorValue = 300;

        this.badBreathProbability = 50;
    }

    selectMove() {
        super.selectMove();

        if (this.chosenMove == this.BadBreathMove) this.nbActions = 1;
        else this.nbActions = 2; // double acid
    }
}
