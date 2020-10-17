class PriestEnemy extends Enemy {
    constructor(_name = "Priest", _gods = null) {
        super(_name);

        this.STRValue = 100;
        this.DEXValue = 30;

        this.godsList = _gods;
        if (this.godsList == null) {
            this.godsList = [];
            this.addRandomGod();
            this.addRandomGod();
        }

        this.rollFreePriestCharge();
    }

    turnChange() {
        super.turnChange();

        this.rollFreePriestCharge();
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
