class Enemy extends Fighter {
    constructor(_name) {
        super(_name);
        this.currentMovepool = [ PunchingPP ];
        this.randomMovepool = [ BigGuy, Bullet, Boomerang, BrocketeerDive,
            FlexBro, Hologram, Kick, InterrogationPoint, PunchingPP, PunchingPPReallyHard, Pig,
            SawBlade, Steel, Yes, ShieldMove ];

        this.isBoss = false;
    }

    getCurrentListOfMoves() {
        var forcedPool = this.getForcedMovepool();
        if (forcedPool != null) {
            return forcedPool;
        }

        var l = this.currentMovepool.slice();

        // gods moves
        if (this.regularCharges > 0) l.push(RegularPriestMove);
        if (this.specialCharges > 0) l.push(SpecialPriestMove);

        return l;
    }
    getRandomMove() {
        return randomFromList(this.randomMovepool);
    }

    selectMove() {
        if (this.getCurrentListOfMoves().indexOf(SpecialPriestMove) > -1 && this.godsList.length > 0) {
            return this.chosenMove = SpecialPriestMove;
        }
        else if (this.getCurrentListOfMoves().indexOf(RegularPriestMove) > -1 && this.godsList.length > 0) {
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

    static newInstance() {
        return eval("new " + this.name + "()");
    }
}
