class UniquePeople extends Enemy {
    isOfInterest() {
        return true;
    }
}

class VonTruffle extends UniquePeople {
    constructor(_name = "Von Truffle") {
        super(_name);

        this.STRValue = 70;
        this.DEXValue = 40;

        this.currentMovepool = [ Yes ];

        this.truffleFriendly = true;

        this.godsList = [ GodManager.getGod("DickDickSon666") ]
    }
}

class Edimo extends UniquePeople {
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

class ShadowAphro extends UniquePeople {
    constructor(_name = "Shadow Aphrodite") {
        super(_name);

        this.STRValue = 300;

        // TODO GOD
    }
}

class YandereDev extends UniquePeople {
    constructor(_name = "YandereDev") {
        super(_name);

        this.STRValue = 500;
        this.DEXValue = 40
        this.specialArmorValue = 1000;

        this.currentMovepool.push(DrinkFromChalice);
        this.firstTurn = true;

        this.isBoss = true;

        // TODO GOD
    }

    selectMove() {
        if (this.firstTurn) {
            this.chosenMove = DrinkFromChalice;
            this.firstTurn = false;
        }
        else super.selectMove();
    }
}
