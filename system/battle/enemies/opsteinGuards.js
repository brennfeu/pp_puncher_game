class OpsteinGuard extends Enemy {
    constructor(_name = "Opstein Guard") {
        super(_name);

        this.STRValue = 120;
        this.DEXValue = 40;

        this.currentMovepool = [ PunchingPP, AcidShot ];

        // TODO add espinoza god
    }
}
class OpsteinMaintainer extends OpsteinGuard {
    constructor(_name = "Maintainer") {
        super(_name);

        this.STRValue = 80;
        this.nbActions = 3;

        this.currentMovepool = [ AcidShot ];
    }
}

class FiveGGuard extends OpsteinGuard {
    constructor(_name = "5G Guard") {
        super(_name);

        this.STRValue = 80;

        this.currentMovepool = [ MoveManager.createMove(function execute(_user, _target = null) {
            _user.duel.addMessage(_user.getName() + " implants a 5G tracker in " + _target.getName() + "!");
            _target.isVaccinated = true;

            _user.duel.addAnimation("5G", 60, _target);
            if (_target.isAlive()) _user.duel.memorySoundEffects.push(_target.getHurtSound());
        }) ];
    }
}
class WindowsGuard extends OpsteinGuard {
    constructor(_name = "Windows Guard") {
        super(_name);

        this.STRValue = 150;
    }
}
class BillDoors extends FiveGGuard {
    constructor(_name = "Bill Doors") {
        super(_name);

        this.STRValue = 300;
        this.specialArmorValue = 1700;

        this.currentMovepool.push( PunchingPP );
        this.currentMovepool.push( AcidShot );

        this.isBoss = true;
    }
}

class OpsteinBoss extends OpsteinGuard {
    constructor(_name = "Opstein") {
        super(_name);

        this.STRValue = 10;
        this.DEXValue = 55;
        this.armorValue = 2500;
        this.currentMovepool.push( Wait );

        this.isBoss = true;
        this.nextPhase = OpsteinBossPhase2;
    }
}
class OpsteinBossPhase2 extends OpsteinBoss {
    constructor(_name = "Opstein Reborn") {
        super(_name);

        this.STRValue = 1000;
        this.specialArmorValue = 2500;
        this.currentMovepool.push( Perhaps );

        this.nextPhase = null;
    }
}

class OpsteinGuest extends OpsteinGuard {
    constructor(_name = "Opstein Guest") {
        super(_name);

        this.STRValue = 80;
        this.DEXValue = 60;

        this.currentMovepool = [ Pig, Bullet ];
    }
}

class ChickenGuard extends OpsteinGuard {
    constructor(_name = "Chicken Guard") {
        super(_name);

        this.STRValue = 80;
        this.currentMovepool = [ TurkeyBomb, AcidShot ]
    }

    selectMove() {
        var oppHasTurkey = false;
        var l = this.duel.getOppsOf(this);
        for (var i in l) if (l[i].turkeyBomb > 0) oppHasTurkey = true;

        if (!oppHasTurkey) {
            this.chosenMove = TurkeyBomb;
        }
        else {
            this.chosenMove = AcidShot;
        }
    }
}
class SoupGuard extends OpsteinGuard {
    constructor(_name = "Soup Guard") {
        super(_name);

        this.STRValue = 150;
        this.currentMovepool = [ MoveManager.createMove(function execute(_user, _target = null) {
            _user.duel.addMessage(_user.getName() + " drinks soup!");
            _user.addRandomBuff();

            _user.duel.addAnimation("soup", 60, _target);
            _user.duel.memorySoundEffects.push("drink");
        }) ];
    }
}
class JohnSoup extends SoupGuard {
    constructor(_name = "John Soup") {
        super(_name);

        this.STRValue = 300;
        this.specialArmorValue = 1700;

        this.currentMovepool.push( PunchingPP );

        this.isBoss = true;
    }
}

class HamburglarBase extends Enemy {
    constructor(_name = "") {
        super("The Hamburglar" + _name);

        this.specialArmorValue = 5000;

        this.isBoss = true;
    }

    getNextPhaseText() {
        return this.getName() + " ascends closer to divinity!";
    }
}
class TheHamburglarPhase1 extends HamburglarBase {
    constructor() {
        super();

        this.STRValue = 100;
        this.DEXValue = 50;

        this.currentMovepool = [ PunchingPP, PunchingPPReallyHard ];

        this.nextPhase = TheHamburglarPhase2
    }
}
class TheHamburglarPhase2 extends HamburglarBase {
    constructor() {
        super(" II");

        this.STRValue = 300;
        this.DEXValue = 60;

        this.currentMovepool = [ SawBlade, AcidShot ];

        this.nextPhase = TheHamburglarPhase3;
    }
}
class TheHamburglarPhase3 extends HamburglarBase {
    constructor() {
        super(" III");

        this.STRValue = 1000;
        this.DEXValue = 70;

        this.currentMovepool = [ Wait, Perhaps, PPBibleMove ];

        this.nextPhase = TheHamburglarPhase4;
    }
}
class TheHamburglarPhase4 extends HamburglarBase {
    constructor() {
        super("-God");

        this.STRValue = 5000;
        this.DEXValue = 80;

        this.godsList.push(GodManager.getGod("Wyndoella"));
        this.godsList.push(GodManager.getGod("Villager"));
        this.regularCharges = 1;
        this.reducedGodhood = true;
    }
}

class CrewMate extends Enemy {
    constructor(_name = "Crewmate") {
        super(_name);
        if (getRandomPercent() <= 25) this.name += " (Sus)";

        this.STRValue = 90;
        this.DEXValue = 55;

        this.currentMovepool = [ Bullet ];
    }
}
class ImposterBoss extends CrewMate {
    constructor(_name = "The Imposter") {
        super(_name);

        this.STRValue = 100;
        this.DEXValue = 55;

        this.specialArmorValue = 1900;

        this.currentMovepool.push( RedPill );

        this.isBoss = true;
    }
}
