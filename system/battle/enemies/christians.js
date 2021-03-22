class ChristianPriest extends Enemy {
    constructor(_name = "Priest", _gods = null) {
        super(_name);

        this.STRValue = 150;
        this.DEXValue = 35;

        this.reducedGodhood = true;

        this.godsList.push(GodManager.getGod("Wyndoella"));
    }

    turnChange() {
        super.turnChange();

        if (this.rollLuckPercentLow() <= 50 && this.isAlive()) {
            this.duel.memoryTurnChange.push(function(_fighter) {
                _fighter.duel.addMessage(_fighter.getName() + " gets blessed by The Lord!");
                _fighter.duel.addMessage(_fighter.getName() + " heals based on his DEX!");
                _fighter.heal(_fighter.getHealValue(), "inner");
            });
        }
        else if (this.rollLuckPercentLow() <= 1 && this.isAlive()) {
            this.duel.memoryTurnChange.push(function(_fighter) {
                _fighter.duel.addMessage(_fighter.getName() + " witnesses a miracle!");
                _fighter.duel.addMessage(_fighter.getName() + " heals based on his DEX!");
                _fighter.heal(_fighter.getHealValue()*5, "inner");
                _fighter.duel.memorySoundEffects.push("jesus");
            });
        }
    }

    getHealValue() {
        var a = this.DEX;
        if (a <= 10) a = 10;
        return a;
    }
}
class ChristianGuy extends ChristianPriest {
    constructor(_name = "Christian", _gods = null) {
        super(_name);

        this.STRValue = 50;
        this.DEXValue = 20;

        this.currentMovepool = [ Wait ];
    }
}
class Timmy extends ChristianGuy {
    constructor(_name = "Timmy", _gods = null) {
        super(_name);

        this.STRValue = 20;
        this.DEXValue = 20;
    }
}

class ChristianBishop extends ChristianPriest {
    constructor(_name = "Bishop", _gods = null) {
        super(_name);

        this.STRValue = 250;
        this.DEXValue = 40;

        this.BishopHealMove = MoveManager.createMove(function execute(_user, _target = null) {
            _user.duel.addMessage(_user.getName() + " heals his allies in the name of God!");
            var l = _user.duel.getAlliesOf(_user);

            for (var i in l) {
                if (l[i].isDead()) continue;

                _user.duel.addMessage(l[i].getName() + " heals based on " + _user.getName() + "'s DEX!");
                l[i].heal(_user.getHealValue());
                l[i].duel.addAnimation("heal", 60, l[i]);
            }
        });
        this.currentMovepool.push(this.BishopHealMove);
    }

    selectMove() {
        if (getRandomPercent() <= 25) {
            this.chosenMove = this.BishopHealMove
        }
        else {
            return super.selectMove();
        }
    }
}
class ChristianArchBishop extends ChristianBishop {
    constructor(_name = "Archbishop", _gods = null) {
        super(_name);

        this.STRValue = 400;
        this.DEXValue = 45;

        this.ArchBishopHelpMove = MoveManager.createMove(function execute(_user, _target = null) {
            _user.duel.addMessage(_user.getName() + " helps his allies in the name of God!");
            var l = _user.duel.getAlliesOf(_user);

            for (var i in l) {
                if (l[i].isDead()) continue;

                var dexGain = Math.floor(_user.getHealValue()/15)
                _user.duel.addMessage(l[i].getName() + " gains " + dexGain + " DEX!");
                l[i].DEXValue += dexGain;
                l[i].duel.memorySoundEffects.push("heal");
                l[i].duel.addAnimation("dex", 60, l[i]);
            }
        });
        this.currentMovepool.push(this.ArchBishopHelpMove);
    }

    selectMove() {
        if (getRandomPercent() <= 25) {
            this.chosenMove = this.ArchBishopHelpMove
        }
        else {
            return super.selectMove();
        }
    }
}

class ChristianCardinal extends ChristianPriest {
    constructor(_name = "???, Cardinal of ???", _debuffId) {
        super(_name);

        this.STRValue = 400;
        this.DEXValue = 45;

        this.cardinalDebuffId = _debuffId;

        this.currentMovepool = [ PunchingPP, Save ];
        this.currentMovepool.push(MoveManager.createMove(function execute(_user, _target = null) {
            _user.duel.addMessage(_user.getName() + " curses his opponents!");
            var l = _user.duel.getOppsOf(_user);

            for (var i in l) {
                if (l[i].isDead()) continue;

                _user.duel.addMessage(l[i].getName() + " gets cursed!");
                l[i].addRandomDebuff(_user.cardinalDebuffId);
                l[i].duel.addAnimation("cursed", 60, _user);
            }
        }));
    }
}
class TenguCardinalBoss extends ChristianCardinal {
    constructor(_name = "Sōjōbō, Cardinal of Mount Kurama") {
        super(_name);

        this.STRValue = 500;
        this.DEXValue = 45;

        this.cardinalDebuffId = undefined;

        this.specialArmorValue = 1500;
        this.isBoss = true;
    }
}

class Templar extends ChristianPriest {
    constructor(_name = "Templar", _gods = null) {
        super(_name);

        this.STRValue = 100;

        this.currentMovepool = [ SwordMove ]
    }
}
class Inquisitor extends Templar {
    constructor(_name = "Inquisitor", _gods = null) {
        super(_name);

        this.STRValue = 80;

        this.isInquisitor = true;
    }
}
class GrandMaster extends Inquisitor {
    constructor(_name = "Grand Master", _gods = null) {
        super(_name);

        this.specialArmorValue = 300;
    }
}

class BlindGuardian extends Templar {
    constructor(_name = "Blind Guardian", _gods = null) {
        super(_name);

        this.armorValue = 500;
        this.blindness = 1;
    }

    turnChange() {
        this.blindness += 1;
        return super.turnChange();
    }
}
class EternalChampion extends Templar {
    constructor(_name = "Eternal Champion", _gods = null) {
        super(_name);

        this.armorValue = 50000;
        this.STRValue = 50;
    }

    isOfInterest() {
        return true;
    }
}

class TrueCross extends Machine {
    constructor(_name = "True Cross", _gods = null) {
        super(_name);

        this.STRValue = 500;
        this.DEXValue = 40;

        this.currentMovepool = [ BigGuy ];

        this.godsList.push(GodManager.getGod("Wyndoella"));
        this.isBoss = true;

        this.nextPhase = TrueCrossSpirit;
    }

    getNextPhaseText() {
        return this.getName() + "'s sprit leaves its body of steel!";
    }
}

class ChristianMaintainer extends ChristianPriest {
    constructor(_name = "Maintainer", _gods = null) {
        super(_name);

        this.STRValue = 100;

        this.nbActions = 3;
        this.currentMovepool = [ PunchingPP ];
    }
}

class Nun extends ChristianPriest {
    constructor(_name = "Nun") {
        super(_name);

        this.STRValue = 150;

        this.currentMovepool = [ Bullet ];
    }
}
class Canoness extends Nun {
    constructor(_name = "Canoness") {
        super(_name);

        this.STRValue = 500;
    }
}

class ThePope extends ChristianArchBishop {
    constructor(_name = "Benedict IX", _gods = null) {
        super(_name);

        this.STRValue = 500;
        this.DEXValue = 50;

        this.specialArmorValue = 2500;

        this.currentMovepool.push(MoveManager.createMove(function execute(_user, _target = null) {
            _user.duel.addMessage(_user.getName() + " helps his allies in the name of God!");
            var l = _user.duel.getAlliesOf(_user);

            for (var i in l) {
                if (l[i].isDead()) continue;

                _user.duel.addMessage(l[i].getName() + " gains an extra life!");
                _user.extraLife += 1;
            }

            _user.duel.memorySoundEffects.push("jesus");
        }));

        this.isBoss = true;
    }
}
class ThePopeFinal extends ThePope {
    constructor(_name = "Benedict IX", _gods = null) {
        super(_name);

        this.STRValue = 500;
        this.DEXValue = 100;

        this.specialArmorValue = 4500;

        this.godOfDeath = true;
    }

    initForDuel() {
        super.initForDuel();

        this.duel.memorySoundEffects.push("jesus");
    }
}
