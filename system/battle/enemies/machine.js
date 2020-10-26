class Machine extends Enemy {
    constructor(_name = "Machine") {
        super(_name);

        // TODO God = Man Who Made A Monster
    }

    turnChange() {
        // immune to status
        this.resetStatus();

        super.turnChange();
    }

    heal(_value, _type) {
        if (_type != "repair") {
            return false;
        }
        super.heal(_value, "inner")
    }

    getHurtSound() {
        return "protect";
    }
    getCorpseSound() {
        return this.getHurtSound();
    }
}
