class Enemy extends Fighter {
    constructor(_name) {
        super(_name);
        this.currentMovepool = [ PunchingPP ];
        this.randomMovepool = [ FlexBro, Hologram, Kick, InterrogationPoint, PunchingPP, PunchingPPReallyHard, SawBlade, Steel, Yes ];

        this.isBoss = false;
    }

    getCurrentListOfMoves() {
        return this.randomMovepool;
    }

    selectMove() {
        this.chosenMove = randomFromList(this.currentMovepool);
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
