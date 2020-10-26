class VonTruffle extends Enemy {
    constructor(_name = "Von Truffle") {
        super(_name);

        this.STRValue = 70;
        this.DEXValue = 40;

        this.currentMovepool = [ Yes ];

        this.truffleFriendly = true;

        this.godsList = [ GodManager.getGod("DickDickSon666") ]
    }
}

class Edimo extends Enemy {
    constructor(_name = "Edimo") {
        super(_name);

        this.STRValue = 200;
        this.DEXValue = 30;

        this.currentMovepool = [
            MoveManager.createMove(function execute(_user, _target = null) {
                _user.duel.addMessage(_user.getName() + " cuts through " + _target.getName() + " with an axe!");
                if (_target.damage(Math.floor(_user.STR/10))) {
                    _target.bleedDamage += 10;
                }

                _user.duel.addAnimation("cut", 60, _target, true, false);
            })
        ];
    }
}

class ShadowAphro extends Enemy {
    constructor(_name = "Shadow Aphrodite") {
        super(_name);

        this.STRValue = 300;

        // TODO GOD
    }
}

class YandereDev extends Enemy {
    constructor(_name = "YandereDev") {
        super(_name);

        this.STRValue = 300;

        this.isBoss = true;
        this.nextPhase = ChaliceYandereDev;

        // TODO GOD
    }
}
class ChaliceYandereDev extends Enemy {
    constructor(_name = "YandereDev") {
        super(_name);

        this.STRValue = 1000;
        this.DEXValue = 50;

        this.isBoss = true;

        // TODO GOD
    }
}
