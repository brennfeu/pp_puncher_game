class Dere extends Student {
    constructor(_name = "Dere") {
        super(_name);

        this.STRValue = 250;
        this.DEXValue = 25;
    }
}

class Dandere extends Dere {
    constructor(_name = "Dandere") {
        super(_name);

        this.currentMovepool = [ Wait ];
    }
}
class Yandere extends Dere {
    constructor(_name = "Yandere") {
        super(_name);

        this.currentMovepool = [ PunchingPPReallyHard ];
    }
}
class Darudere extends Dere {
    constructor(_name = "Darudere") {
        super(_name);

        this.currentMovepool = [ Wait, Bullet ];
    }

    selectMove() {
        if (this.STR < 250) {
            this.chosenMove = Bullet;
        }
        else {
            this.chosenMove = Wait;
        }
    }
}
class Tsundere extends Dere {
    constructor(_name = "Tsundere") {
        super(_name);

        this.currentMovepool = [ PunchingPP ];

        this.favOpp = null;
    }

    selectTarget() {
        if (this.favOpp == null) {
            this.favOpp = randomFromList(this.duel.heroes);
        }
        this.chosenTarget = this.favOpp;
    }

    damage(_value, _type, _opponent = null) {
        super.damage(_value, _type, _opponent);

        if (_opponent != null) {
            this.favOpp = _opponent;
        }
    }
}
class Kuudere extends Dere {
    constructor(_name = "Kuudere") {
        super(_name);

        this.currentMovepool = [ PunchingPP ];
        this.nbActions = 2;
    }
}
class Deredere extends Dere {
    constructor(_name = "Deredere") {
        super(_name);

        this.isBoss = true;
        this.currentMovepool = [
            MoveManager.createMove(function execute(_user, _target = null) {
                _user.duel.addMessage(_user.getName() + " bursts of joy!");
                _user.heal(Math.floor(_user.STR/2));

                _user.duel.memorySoundEffects.push("explosion");
                _user.duel.addAnimation("burst", 60, _user);
            }),
            MoveManager.createMove(function execute(_user, _target = null) {
                _user.duel.addMessage(_user.getName() + " bursts of energy!");
                var l = _user.duel.getOppsOf(_user);
                for (var i in l) {
                    if (l[i].isDead()) continue;
                    _user.duel.heroes[i].damage(Math.floor(_user.STR/7), "attack", _user);
                    _user.duel.addAnimation("energy", 60, _user.duel.heroes[i], false, true);
                }

                _user.duel.memorySoundEffects.push("explosion");
                _user.duel.addAnimation("burst", 60, _user);
            })
        ];
    }
}
