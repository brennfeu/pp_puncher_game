class Weeb extends Enemy {
    constructor(_name = "Weeb") {
        super(_name);

        this.STRValue = 15;
        this.addRandomGod("waifu");
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

class CrystalWeeb extends Weeb {
    constructor(_name = "Crystal Weeb") {
        super(_name);

        this.addFightingStyle("crystal");
    }
}
class DiamondWeeb extends Weeb {
    constructor(_name = "Diamond Weeb") {
        super(_name);

        this.addFightingStyle("diamond");
    }
}

class SuperWeeb extends Weeb {
    constructor(_name = "Super Weeb") {
        super(_name);

        this.STRValue = this.STRValue*2;
    }
}
class MegaWeeb extends SuperWeeb {
    constructor(_name = "Mega Weeb") {
        super(_name);

        this.STRValue = this.STRValue*2;
    }
}
class GigaWeeb extends MegaWeeb {
    constructor(_name = "Giga Weeb") {
        super(_name);

        this.STRValue = this.STRValue*2;
    }
}

class BleachCoveredWeeb extends Weeb {
    constructor(_name = "Bleach-Covered Weeb") {
        super(_name);

        this.STRValue = 500;
        this.DEXValue = 40;
        this.specialArmorValue = 1000;

        this.isBoss = true;
    }

    turnChange() {
        super.turnChange();
        this.bleachCountdown = 0;
    }

    hasRelic(_id) {
        if (_id == 4) return true;
        return super.hasRelic(_id);
    }
}

class GodOfDiscord extends BossWeeb {
    constructor(_name = "God of Discord") {
        super(_name);

        this.STRValue = 1000;
        this.DEXValue = 50;

        this.currentMovepool = [ PunchingPPReallyHard ];

        this.nextPhase = GodOfDiscord2;
    }
}
class GodOfDiscord2 extends BossWeeb {
    constructor(_name = "God of Discord") {
        super(_name);

        this.STRValue = 2000;
        this.DEXValue = 50;

        this.currentMovepool = [ PunchingPPReallyHard ];
    }

    hasStand(_id) {
        return true;
    }
}
