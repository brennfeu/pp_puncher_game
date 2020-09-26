class VonTruffle extends Enemy {
    constructor(_name = "Von Truffle") {
        super(_name);

        this.STRValue = 70;
        this.DEXValue = 40;

        this.currentMovepool = [ Yes ];

        this.truffleFriendly = true;
    }
}
