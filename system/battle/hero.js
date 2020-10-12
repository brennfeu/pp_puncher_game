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
        else {
            var commonMoves = [PunchingPP, PunchingPPReallyHard, Hologram, FlexBro, HighFiveBro];
            if (this.hasFightingStyle("versatile")) {
                commonMoves.push(AdaptPP);
            }

            for (var i in commonMoves) {
                while (this.currentMovepool.length <= i) {
                    var randomMove = this.getRandomMove();
                    if (getRandomPercent() <= 20) {
                        randomMove = commonMoves[i];
                    }
                    if (i == 0 && getRandomPercent() <= 90) {
                        randomMove = PunchingPP;
                    }

                    // Fightin Styles moves
                    if (ProgressManager.getUnlockedMoves().indexOf(randomMove) < 0 ||
                        (this.hasFightingStyle("fast") && randomMove == DeadBro) ||
                        (this.hasFightingStyle("big") && randomMove == PregnantBro) ||
                        (this.hasFightingStyle("versatile") && randomMove == AdaptPP) ||
                        ((this.hasFightingStyle("diamond") || this.hasFightingStyle("crystal")) && randomMove == EncrustPP)) {
                        continue;
                    }

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
