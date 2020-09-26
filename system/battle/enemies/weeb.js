class Weeb extends Enemy {
    constructor(_name = "Weeb") {
        super(_name);

        this.STRValue = 15;
    }
}

class BigWeeb extends Weeb {
    constructor(_name = "Big Weeb") {
        super(_name);

        this.addFightingStyle("big");
    }
}
class FastWeeb extends Weeb {
    constructor(_name = "Fast Weeb") {
        super(_name);

        this.addFightingStyle("fast");
    }
}

class BossWeeb extends Weeb {
    constructor(_name = "Ultimate Weeb") {
        super(_name);

        this.STRValue = 150;
        this.DEXValue = 30;

        this.currentMovepool = [ PunchingPPReallyHard ];

        this.isBoss = true;
    }
}
