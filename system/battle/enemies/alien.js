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
