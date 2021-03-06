class Hero extends Fighter {
    constructor(_partyMember) {
        if (_partyMember == undefined) return super(""); // for multiplayer JSON gathering

        super(_partyMember.name);

        var waifuSaved = ProgressManager.getSavedWaifus().length;
        this.STRValue = 80 + waifuSaved*10;
        this.DEXValue = 20 + waifuSaved*5;

        if (DEV_MODE) { // reduces stat buff of bonus waifus in dev mode
            var bonusWaifuSaved = ProgressManager.getSavedWaifus(true).length;
            this.STRValue -= bonusWaifuSaved*5;
            this.DEXValue -= bonusWaifuSaved*3;
        }

        this.moveFrameObject = null;
        this.moveFrameText = null;

        this.loadPartyMember(_partyMember);
    }

    rollNewMovepool() {
        this.currentMovepool = [];

        var l = this.duel.getAllFighters();

        var hasLevers = false;
        var hasDogs = false;
        for (var i in l) {
            if (l[i] instanceof LeverEnemy) hasLevers = true;
            if (l[i] instanceof Dog) hasDogs = true;
        }

        var forcedPool = this.getForcedMovepool();
        if (forcedPool != null) {
            this.currentMovepool = forcedPool;
            return;
        }
        else if (hasLevers) {
            this.currentMovepool = [ ActivateLeverMove, Wait ];
        }
        else if (hasDogs) {
            this.currentMovepool = [ PetTheDog ];
        }
        else if (this.kidneyCurse > 0) {
            this.currentMovepool = [ KidneyShoot, SuperKidneyShoot ];
        }
        else {
            var commonMoves = [PunchingPP, PunchingPPReallyHard, Hologram, FlexBro, HighFiveBro];
            if (this.isTrolled > 0) {
                commonMoves = [ Barrel ]
            }
            if (this.hasFightingStyle("versatile")) {
                commonMoves.push(AdaptPP);
            }

            var availableMoveList = REGULAR_MOVE_LIST;
            if (this.standPower != null) availableMoveList = availableMoveList.concat(STAND_MOVE_LIST);

            for (var i in commonMoves) {
                while (this.currentMovepool.length <= i) {
                    var randomMove = this.getRandomMoveFromList(availableMoveList);
                    if (this.legatoActivated) randomMove = this.getRandomMoveFromList(MoveManager.MOVE_LIST);

                    // 20% chance to be a common move
                    if (getRandomPercent() <= 20) {
                        randomMove = commonMoves[i];
                    }
                    // 5% chance to force a liked move to appear --> 25% chance for the whole movepool
                    else if (this.rollLuckPercentLow() <= 5 && ProgressManager.getMovesLikely().length > 0) {
                        randomMove = randomFromList(ProgressManager.getMovesLikely());
                    }
                    // rare move
                    else if (this.rollLuckPercentLow() <= 1 && this.rollLuckPercentLow() <= 10) {
                        randomMove = this.getRandomMoveFromList(RARE_MOVE_LIST);
                    }
                    // the game is about punching pp, so you're going to punch pp. it's very unlikely not to get this move in the movepool
                    else if (i == 0 && getRandomPercent() <= 80) {
                        randomMove = PunchingPP;
                    }

                    // we don't accept null moves here, sorry
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
                    if (this.rollLuckPercentLow() <= 50 && ProgressManager.getMovesUnlikely().indexOf(randomMove.getClassName()) > -1) {
                        continue;
                    }

                    // now add it to the list if it's not already in there
                    if (this.currentMovepool.indexOf(randomMove) <= -1) {
                        this.currentMovepool.push(randomMove);
                    }
                }
            }
        }

        // adds gods moves if has charges and gods
        if (this.regularCharges > 0 && this.godsList.length > 0 && !this.isSilenced) this.currentMovepool.push(RegularPriestMove);
        if (this.specialCharges > 0 && this.godsList.length > 0 && !this.isSilenced) this.currentMovepool.push(SpecialPriestMove);

        if (!hasLevers) this.currentMovepool = shuffleArray(this.currentMovepool);
        this.hasNewMovepool = true; // scene reloads moves
    }
    getCurrentListOfMoves() {
        return ProgressManager.getUnlockedMoves();
    }
    getRandomMoveFromList(_list) {
        var tries = 0;
        while (tries <= 100000) {
            var move = this.getRandomMove();
            if (_list.indexOf(move) > -1 ||
              (move == PPBibleMove && this.hasRelic(2) && this.rollLuckPercentLow() <= 50) ||
              (move == DrinkFromChalice && this.hasRelic(0) && this.rollLuckPercentLow() <= 20)) {
                return move;
            }

            tries += 1;
        }
        Logger.warning("Could not find an unlocked move from the following list", _list);
        return null;
    }
    getForcedMovepool() {
        if (this.duel.checkParam("forceRootOfNuisance", true)) {
            return [ RootOfNuisance ];
        }

        return super.getForcedMovepool();
    }

    hasSynergy(_synergy) {
        if (ProgressManager.getUnlockedGameMechanics().indexOf("Synergies") < 0) return false;
        return super.hasSynergy(_synergy);
    }

    updateTextObjects() {
        super.updateTextObjects();

        if (this.spriteObject == null) return;
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
    destroyObjects() {
        super.destroyObjects();

        if (this.moveFrameObject != null) this.moveFrameObject.destroy();
        this.moveFrameObject = null;
        if (this.moveFrameText != null) this.moveFrameText.destroy();
        this.moveFrameText = null;
    }

    getDangerLevel() { // used for killer blessing
        return 3;
    }
    isOfInterest() {
        return true
    }
    isHero() {
        return true;
    }
    hasHeroDexBonus() {
        return true;
    }

    getHurtSound() {
        return "hurtB";
    }
}
