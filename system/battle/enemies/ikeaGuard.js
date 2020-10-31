class IkeaGuard extends Enemy {
    constructor(_name = "Ikea Guard") {
        super(_name);

        this.STRValue = 60;

        this.currentMovepool = [ PunchingPP, SawBlade ];

        this.godsList = [ GodManager.getGod(randomFromList([ "DickDickSon666", "Hello There Puds", "UREGonnaGetRAPED" ])) ];
        // TODO add leprepuds to random list
    }
}
class EvilMaintainer extends IkeaGuard {
    constructor(_name = "Evil Maintainer") {
        super(_name);

        this.STRValue = 30;
        this.nbActions = 3;

        this.currentMovepool = [ PunchingPP ];
    }
}
class LostHermit extends IkeaGuard {
    constructor(_name = "Lost Hermit") {
        super(_name);

        this.STRValue = 30;
        this.DEXValue = 30;

        this.pigHeal = 15;

        this.currentMovepool = [ PunchingPP ];
    }
}
class IkeaManager extends IkeaGuard {
    constructor(_name = "Ikea Manager") {
        super(_name);

        this.STRValue = 150;

        this.currentMovepool = [ PunchingPP, Save ];
    }

    selectMove() {
        var l = this.duel.getAlliesOf(this);
        for (var i in l) {
            if (l[i].isDead()) {
                return this.chosenMove = Save;
            }
        }
        this.chosenMove = PunchingPP;
    }
}
class EliteGuard extends IkeaGuard {
    constructor(_name = "Elite Guard") {
        super(_name);

        this.STRValue = 80;
        this.boomerang = 2;

        this.currentMovepool = this.currentMovepool.concat([ Pig ]);
    }
}
class IkeaBoomerang extends IkeaGuard {
    constructor(_name = "Boomerang Guy") {
        super(_name);

        this.currentMovepool = [ Boomerang, PunchingPP ]
    }

    selectMove() {
        if (this.boomerang <= 0) {
            this.chosenMove = Boomerang;
        }
        else {
            this.chosenMove = PunchingPP;
        }
    }
}
class IkeaKicker extends IkeaGuard {
    constructor(_name = "Kicker Guard") {
        super(_name);

        this.STRValue = 80;

        this.currentMovepool = [ Kick ];
    }
}
class IkeaDiver extends IkeaGuard {
    constructor(_name = "Jetpack Guard") {
        super(_name);

        this.STRValue = 80;

        this.currentMovepool = [ BrocketeerDive ];
    }
}
class SteroidGuard extends IkeaGuard {
    constructor(_name = "Steroid Guard") {
        super(_name);

        this.DEXValue -= 5;
        this.currentMovepool = [ RedPill, Hologram ];
    }

    selectMove() {
        if (this.redPillAddiction < 10) {
            this.chosenMove = RedPill;
        }
        else {
            this.chosenMove = Hologram;
        }
    }
}
class IkeaChef extends IkeaGuard {
    constructor(_name = "Ikea Chef") {
        super(_name);

        this.STRValue = 200;

        this.currentMovepool = [ TurkeyBomb, SawBlade ]
    }

    selectMove() {
        var oppHasTurkey = false;
        var l = this.duel.getOppsOf(this);
        for (var i in l) if (l[i].turkeyBomb > 0) oppHasTurkey = true;

        if (!oppHasTurkey) {
            this.chosenMove = TurkeyBomb;
        }
        else {
            this.chosenMove = SawBlade;
        }
    }
}

class IkeaScout extends Enemy {
    constructor(_name = "Ikea Scout") {
        super(_name);

        this.STRValue = 40;

        this.currentMovepool = [ Scout, Steel ];
    }

    selectMove() {
        if (this.attackMode) {
            this.chosenMove = Steel;
        }
        else {
            this.chosenMove = Scout;
        }
    }
}
class IkeaPig extends Enemy {
    constructor(_name = "Ikea Pig") {
        super(_name);

        this.STRValue = 70;

        this.currentMovepool = [ Pig, PunchingPP ];
    }
}

class FreeLivesHQ extends Machine {
    constructor(_name = "Free Lives HQ") {
        super(_name);

        this.STRValue = 500;
        this.DEXValue = 30;
        this.nbActions = 2;

        this.currentMovepool = [ SawBlade ];

        this.isBoss = true;
    }
}
class AfroMan extends Enemy {
    constructor(_name = "Afro Man") {
        super(_name);

        this.STRValue = 10;
        this.DEXValue = 0;

        this.currentMovepool = [ Steel ];
    }
}

class IkeaSawblade extends Machine {
    constructor(_name = "Ikea Sawblade") {
        super(_name);

        this.STRValue = 80;
        this.DEXValue = 0;

        this.attackMode = false;

        this.currentMovepool = [ SawBlade, Steel ];
    }

    turnChange() {
        super.turnChange();

        if (this.attackMode) {
            this.attackMode = false;
            this.DEXValue -= 30;
        }
        else {
            this.attackMode = true;
            this.DEXValue += 30;
        }
    }

    selectMove() {
        if (this.attackMode) {
            this.chosenMove = SawBlade;
        }
        else {
            this.chosenMove = Steel;
        }
    }

    getAllStatus() {
        var list = super.getAllStatus();
        var status = {};
        if (this.attackMode) {
            status["display"] = " - Offensive Mode";
            status["icon"] = "other/offensive";
        }
        else {
            status["display"] = " - Defensive Mode";
            status["icon"] = "other/defensive";
        }
        list.push(status);
        return list;
    }
}
class IkeaTurret extends Machine {
    constructor(_name = "Ikea Turret") {
        super(_name);

        this.STRValue = 80;
        this.DEXValue = 35;

        this.currentMovepool = [ Bullet ];
    }
}

class IkeaMonstruosity extends Machine {
    constructor(_name = "Ikea Monstruosity") {
        super(_name);

        this.STRValue = 500;
        this.DEXValue = 40;

        this.currentMovepool = [ Bullet, PunchingPP ];

        this.isBoss = true;
        this.nextPhase = IkeaMonstruosityPhaseTwo;
    }

    selectMove() {
        if (this.DEXValue > 20) {
            this.chosenMove = Bullet;
        }
        else {
            this.chosenMove = PunchingPP;
        }
    }

    getNextPhaseText() {
        return this.getName() + "'s furniture floats around and creates a new, more powerful Monstruosity!";
    }
}
class IkeaMonstruosityPhaseTwo extends Machine {
    constructor(_name = "Ikea Monstruosity") {
        super(_name);

        this.STRValue = 1500;
        this.DEXValue = 100;

        this.currentMovepool = [ Bullet ];

        this.isBoss = true;
    }

    selectMove() {
        this.chosenMove = Bullet;
    }
}

class SwedishPilgrims extends IkeaGuard {
    constructor(_name = "Swedish Pilgrim") {
        super(_name);

        this.STRValue = 80;

        this.currentMovepool = this.randomMovepool;
    }
}
class TargetDummy extends Enemy {
    constructor(_name = "Target Dummy") {
        super(_name);

        this.STRValue = 1;
        this.currentMovepool = [ Wait ];
    }
}

class LandMineGuard extends IkeaGuard {
    constructor(_name = "Landmine Worker", _startsWithTrap) {
        super(_name);

        this.STRValue = 80;

        this.currentMovepool = [ PunchingPPReallyHard ];

        this.trapSignLoopCount = !_startsWithTrap;
        this.readyToBurst = _startsWithTrap;
    }

    turnChange() {
        super.turnChange();

        if (this.trapSignLoopCount) {
            this.readyToBurst = true;
        }
        this.trapSignLoopCount = !this.trapSignLoopCount;
    }
}
