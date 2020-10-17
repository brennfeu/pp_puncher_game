class PriestEnemy extends Enemy {
    constructor(_name = "Priest", _gods = null) {
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

        this.newChargeChance = 33;
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
}
class HighPriest extends PriestEnemy {
    constructor(_name = "High Priest", _gods = null) {
        super(_name, _gods);

        this.STRValue = 150;
        this.DEXValue = 50;

        this.newChargeChance = 66;
    }
}

class TutorialPriest extends PriestEnemy {
    constructor(_name = "Priest", _gods = null) {
        var starterGods = [
            "Brenn", "Country Music Brenn", "Chad Brenn",
            "DickDickSon666", "Hello There Puds", "UREGonnaGetRAPED",
            "Ranger", "Salt King"
        ];
        var l = [];
        l.push(randomFromList(starterGods));

        super(undefined, l);
    }
}
