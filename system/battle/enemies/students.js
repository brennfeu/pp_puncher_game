class Student extends Enemy {
    constructor(_name = "Student") {
        super(_name);

        this.currentMovepool = [Boomerang, BrocketeerDive, Bullet, FlexBro,
            Hologram, Kick, Pig, PunchingPP, PunchingPPReallyHard,
            RedPill, Save, SawBlade, Scout, Steel];

        if (getRandomPercent() <= 80) {
            this.addRandomGod("waifu");
        }
        else {
            this.addRandomGod("regular");
        }
    }
}

class Tier4Student extends Student {
    constructor(_name = "Tier 4 Student") {
        super(_name);

        this.STRValue = 70;
    }
}
class Tier3Student extends Student {
    constructor(_name = "Tier 3 Student") {
        super(_name);

        this.STRValue = 100;
        this.DEXValue = 25;
    }
}
class Tier2Student extends Student {
    constructor(_name = "Tier 2 Student") {
        super(_name);

        this.STRValue = 120;
        this.DEXValue = 30;
    }
}
class Tier1Student extends Student {
    constructor(_name = "Tier 1 Student") {
        super(_name);

        this.STRValue = 200;
        this.DEXValue = 30;
    }
}

class AnimeHighSchooler extends Student {
    constructor(_name = "Anime Student") {
        super(_name);

        this.STRValue = 200;

        this.currentMovepool = [ HighFiveBro, PunchingPP ]
    }

    selectMove() {
        var nb = 0;
        var l = this.duel.getAlliesOf(this);
        for (var i in l) {
            if (l[i].isAlive()) nb += 1;
        }

        if(nb > 0 && this.highFiveBuff <= 0) {
            return this.chosenMove = HighFiveBro;
        }
        this.chosenMove = PunchingPP;
    }

    turnChange() {
        super.turnChange();

        if (this.highFiveBuff > 0) {
            this.duel.memoryTurnChange.push(function(_fighter) {
                _fighter.duel.addMessage(_fighter.getName() + " gets healed by the power of friendship!");
                _fighter.heal(10, "inner");
            });
        }
    }
}

class StudentCouncilMember extends Tier1Student {
    constructor(_name = "Student Council Member") {
        super(_name);

        this.STRValue = 150;

        this.currentMovepool = [Boomerang, Bullet, FlexBro,
            Hologram, Pig, PunchingPP, PunchingPPReallyHard,
            RedPill, Save, SawBlade, Scout, Steel];
        this.isBoss = true;
    }

    selectMove() {
        if (getRandomPercent() <= 30) {
            return this.chosenMove = this.currentMovepool[this.currentMovepool.length-1];
        }
        var l = this.duel.getAlliesOf(this);
        for (var i in l) {
            if (l[i].isDead()) return this.chosenMove = Save;
        }
        return super.selectMove();
    }
}
class CouncilPresident extends StudentCouncilMember {
    constructor(_name = "President") {
        super(_name);

        this.STRValue = 500;

        this.currentMovepool.push(MoveManager.createMove(
            function execute(_user, _target = null) {
                _user.duel.addMessage(_user.getName() + " prepares a Super Triple Punch!");
                // triple punch
                for (var i in [0, 1, 2]) {
                    var storedMove = {};
                    storedMove["user"] = _user;
                    storedMove["move"] = PunchingPPReallyHard;
                    storedMove["target"] = _target;
                    _user.duel.memoryMoves.push(storedMove);
                }
            },
            { "dexChange": -20 }
        ));
    }
}
class CouncilVicePresident extends StudentCouncilMember {
    constructor(_name = "Vice-President") {
        super(_name);

        this.STRValue = 200;

        this.currentMovepool.push(MoveManager.createMove(
            function execute(_user, _target = null) {
                _user.duel.addMessage(_user.getName() + " prepares a Triple Punch!");
                // triple punch
                for (var i in [0, 1, 2]) {
                    var storedMove = {};
                    storedMove["user"] = _user;
                    storedMove["move"] = PunchingPP;
                    storedMove["target"] = _target;
                    _user.duel.memoryMoves.push(storedMove);
                }
            }
        ));
    }
}
class CouncilSecretary extends StudentCouncilMember {
    constructor(_name = "Secretary") {
        super(_name);

        this.currentMovepool.push(MoveManager.createMove(
            function execute(_user, _target = null) {
                _user.duel.addMessage(_user.getName() + " equips everyone with boomerangs!");
                var l = _user.duel.getAlliesOf(_user, true);
                for (var i in l) {
                    if (l[i].isAlive()) {
                        var storedMove = {};
                        storedMove["user"] = l[i];
                        storedMove["move"] = Boomerang;
                        storedMove["target"] = null;
                        _user.duel.memoryMoves.push(storedMove);
                    }
                }
            }
        ));
    }
}
class CouncilTreasurer extends StudentCouncilMember {
    constructor(_name = "Treasurer") {
        super(_name);

        this.currentMovepool.push(MoveManager.createMove(
            function execute(_user, _target = null) {
                _user.duel.addMessage(_user.getName() + " makes " + _target.getName() + " depressive...");
                _target.depression += 3;

                _user.duel.addAnimation("sad", 60, _target);
            }
        ));
    }
}

class GymClubStudent extends Tier3Student {
    constructor(_name = "Gym Club Student") {
        super(_name);

        this.currentMovepool.push(BronanSlam);

        this.godsList.push(GodManager.getGod("The Brawn"));
    }

    selectMove() {
        if (this.damageBuildUp <= 0) {
            return this.chosenMove = BronanSlam;
        }
        return super.selectMove();
    }
}
class BoardGameClubStudent extends Tier2Student {
    constructor(_name = "Board Game Club Student") {
        super(_name);
    }
}
