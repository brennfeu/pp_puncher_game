class EnemyStand extends Enemy {
    constructor(_standId) {
        var stand = StandManager.getStand(_standId);

        super(stand.name);
        this.setStand(stand.id);

        this.STRValue = 300;
        this.DEXValue = 50;

        this.specialArmorValue = 300;

        this.specialArmorValue = 1000;

        this.currentMovepool = STAND_MOVE_LIST;
    }
}

class EnemyStandUser extends Enemy {
    constructor(_standId, _name = "Stand User") {
        super(_name);

        this.STRValue = 150;
        this.DEXValue = 45;

        this.specialArmorValue = 300;

        this.forcedBCaSL = true;

        this.setStand(_standId);
    }
}
class BossStandUser extends Enemy {
    constructor(_name = "Stand Master") {
        super(_name);

        this.STRValue = 500;
        this.DEXValue = 55;

        this.specialArmorValue = 2500;

        this.setStand(10);

        this.isBoss = true;
        this.nextPhase = BossStandUserPhase2;
    }

    getNextPhaseText() {
        return this.getName() + " sacrifices his stand to revive!";
    }
}
class BossStandUserPhase2 extends BossStandUser {
    constructor(_name = "Stand Master") {
        super(_name);

        this.DEXValue = 45;

        this.specialArmorValue = 4500;

        this.setStand(26);

        this.nextPhase = null;
    }

    // has multiple stands
    hasStand(_value) {
        return [0, 2, 3, 4, 10, 11, 24, 25].indexOf(_value) >= 0;
    }
}

class TheThinker extends Machine {
    constructor(_name = "The Thinker") {
        super(_name);

        this.STRValue = 10;
        this.DEXValue = 30;

        this.currentMovepool = [ Perhaps ];

        this.setStand(26);
    }

    selectMove() {
        this.chosenMove = Perhaps;
    }

    damage(_value, _type, _opponent = null) {
        if ((_type == "attack" && _opponent.standPower != null) || _type == "auto") {
            return super.damage(_value, _type, _opponent);
        }
        else {
            this.duel.addMessage(this.getName() + "'s stand protects him.");
            return false;
        }
    }
}
