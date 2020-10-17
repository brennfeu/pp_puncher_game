class Enemy extends Fighter {
    constructor(_name) {
        super(_name);
        this.currentMovepool = [ PunchingPP ];
        this.randomMovepool = [ FlexBro, Hologram, Kick, InterrogationPoint, PunchingPP, PunchingPPReallyHard, SawBlade, Steel, Yes ];

        this.isBoss = false;
    }

    getCurrentListOfMoves() {
        var l = this.randomMovepool;

        // gods moves
        if (this.regularCharges > 0) l.push(RegularPriestMove);
        if (this.specialCharges > 0) l.push(SpecialPriestMove);

        return l;
    }

    selectMove() {
        if (this.getCurrentListOfMoves().indexOf(SpecialPriestMove) > -1) {
            return this.chosenMove = SpecialPriestMove;
        }
        else if (this.getCurrentListOfMoves().indexOf(RegularPriestMove) > -1) {
            return this.chosenMove = RegularPriestMove;
        }

        this.chosenMove = randomFromList(this.getCurrentListOfMoves());
    }

    selectTarget() {
        this.chosenTarget = randomFromList(this.duel.heroes);
    }

    getDangerLevel() { // used for killer blessing
        if (this.isBoss) return 10;
        return 1;
    }
    setSpriteCoordinates(_x, _y) {
        this.spriteX = _x;
        this.spriteY = _y;
    }

    destroyObjects() {
        this.spriteObject.destroy();
        this.STRTextObject.destroy();
        this.DEXTextObject.destroy();
    }

    static newInstance() {
        return eval("new " + this.name + "()");
    }
}
