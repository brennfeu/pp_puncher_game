class WyndoellaBoss extends Enemy {
    constructor(_name = "Wyndoella") {
        super(_name);

        this.STRValue = Math.pow(10, 99);
        this.DEXValue = 0;

        // TODO add itself in the god list
        // TODO special theme

        this.cannotFailMove = true;
        this.isBoss = true;

        this.currentMovepool = [
            MoveManager.createMove(function execute(_user, _target = null) {
                _user.duel.addMessage(_user.getName() + " attacks " + _target + " !");
                _target.damage(_user.STR, "inner");

                _user.duel.memorySoundEffects.push("heal");
                _user.duel.addAnimation("light", 60, _user);
            })
        ];
    }

    turnChange() {
        // immune to bad status
        this.resetStatus(true);

        super.turnChange();
    }

    getHurtSound() {
        return null;
    }
    getCorpseSound() {
        return this.getHurtSound();
    }
}
