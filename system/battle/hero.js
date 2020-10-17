class Hero extends Fighter {
    constructor(_partyMember) {
        super(_partyMember.name);

        var waifuSaved = ProgressManager.getSavedWaifus().length;
        this.STRValue = 70 + waifuSaved*10;
        this.DEXValue = 20 + waifuSaved*5;

        this.moveFrameObject = null;
        this.moveFrameText = null;

        for (var i in _partyMember.fightingStyles) {
            this.addFightingStyle(_partyMember.fightingStyles[i]);
        }
    }

    rollNewMovepool() {
        this.currentMovepool = [];

        if (this.duel.forceConfusion) {
            this.currentMovepool = [ InterrogationPoint ];
            return;
        }
        else if (this.duel.forceSatan) {
            this.currentMovepool = [ BigSatan ];
            return;
        }
        else {
            var commonMoves = [PunchingPP, PunchingPPReallyHard, Hologram, FlexBro, HighFiveBro];
            if (this.hasFightingStyle("versatile")) {
                commonMoves.push(AdaptPP);
            }

            for (var i in commonMoves) {
                while (this.currentMovepool.length <= i) {
                    var randomMove = this.getRandomMoveFromList(REGULAR_MOVE_LIST);

                    // 20% chance to be a common move
                    if (getRandomPercent() <= 20) {
                        randomMove = commonMoves[i];
                    }
                    // 5% chance to force a liked move to appear --> 25% chance for the whole movepool
                    else if (getRandomPercent() <= 5 && ProgressManager.getMovesLikely().length > 0) {
                        randomMove = randomFromList(ProgressManager.getMovesLikely());
                    }
                    // rare move
                    else if (getRandomPercent() <= 2) {
                        randomMove = this.getRandomMoveFromList(RARE_MOVE_LIST);
                    }
                    // the game is about punching pp, so you're going to punch pp. it's very unlikely not to get this move in the movepool
                    else if (i == 0 && getRandomPercent() <= 80) {
                        randomMove = PunchingPP;
                    }

                    // we don't ccept null moves here, sorry
                    if (randomMove == null) {
                        continue;
                    }
                    // Fighting Styles moves not appearing when they shouldn't
                    if (ProgressManager.getUnlockedMoves().indexOf(randomMove) < 0 ||
                        (this.hasFightingStyle("fast") && randomMove == DeadBro) ||
                        (this.hasFightingStyle("big") && randomMove == PregnantBro) ||
                        (this.hasFightingStyle("versatile") && randomMove == AdaptPP) ||
                        ((this.hasFightingStyle("diamond") || this.hasFightingStyle("crystal")) && randomMove == EncrustPP)) {
                        continue;
                    }
                    // Unliked Moves have 50% chance to reroll the current move
                    if (getRandomPercent() <= 50 && ProgressManager.getMovesUnlikely().indexOf(randomMove.getClassName()) > -1) {
                        continue;
                    }

                    // now add it to the list if it's not already in there
                    if (this.currentMovepool.indexOf(randomMove) <= -1) {
                        this.currentMovepool.push(randomMove);
                    }
                }
            }
        }

        this.currentMovepool = shuffleArray(this.currentMovepool);
        this.hasNewMovepool = true; // scene reloads moves
    }
    getCurrentListOfMoves() {
        return ProgressManager.getUnlockedMoves();
    }
    getRandomMoveFromList(_list) {
        var tries = 0;
        while (tries <= 100000) {
            var move = this.getRandomMove();
            if (_list.indexOf(move) > -1) {
                return move;
            }
        }
        return null;
    }

    updateTextObjects() {
        super.updateTextObjects();
        if (this.chosenMove == null || this.isDead() || ["heroChoice", "moveChoice", "targetChoice", "movePlaying"].indexOf(this.duel.duelState) < 0) {
            this.moveFrameObject.setY(-1000);
            this.moveFrameText.setY(-1000);
            this.moveFrameText.setText("");
        }
        else {
            this.moveFrameObject.setY(this.spriteY-27);
            this.moveFrameText.setY(this.spriteY-20);
            this.moveFrameText.setText(this.chosenMove.newInstance().name);
        }
    }

    getDangerLevel() { // used for killer blessing
        return 3;
    }
    isHero() {
        return true;
    }
    getHurtSound() {
        return "hurtB";
    }
}
