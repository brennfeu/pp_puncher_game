class VonTruffle extends Enemy {
    constructor(_name = "Von Truffle") {
        super(_name);

        this.STRValue = 70;
        this.DEXValue = 40;

        this.currentMovepool = [ Yes ];

        this.truffleFriendly = true;
    }
}

class ShadowAphro extends Enemy {
    constructor(_name = "Shadow Aphrodite") {
        super(_name);

        this.STRValue = 300;
    }
}

class YandereDev extends Enemy {
    constructor(_name = "YandereDev") {
        super(_name);

        this.STRValue = 300;

        this.isBoss = true;
        this.nextPhase = ChaliceYandereDev;
    }
}
class ChaliceYandereDev extends Enemy {
    constructor(_name = "YandereDev") {
        super(_name);

        this.STRValue = 1000;
        this.DEXValue = 50;

        this.isBoss = true;
    }
}
