class Fighter {
    constructor(_name) {
        this.name = _name;
        this.duel = null; // gets added when duel loads fighters
        this.id = Fighter.idCounter;
        Fighter.idCounter += 1;

        // stats
        this.STRValue = 0;
        this.DEXValue = 20;
        this.nbActions = 1;

        this.DEXBonus = 0;
        this.rolledDEX = 0;

        // styles
        this.fightingStyles = [];
        this.relics = [];

        // effects
        this.resetStatus();

        // movepool
        this.currentMovepool = [];
        this.chosenMove = null;
        this.chosenTarget = null;
        this.moveCap = 0;

        this.nextPhase = null;

        this.spriteObject = null; // Gets instanciated by the duel scene
        this.spriteX = 0;
        this.spriteY = 0;
        this.STRTextObject = null; // Gets instanciated by the duel scene
        this.DEXTextObject = null; // Gets instanciated by the duel scene
        this.statusIconObjects = [];
    }

    getName() {
        return this.name;
    }

    getDescription() {
        var txt = this.getName();

        if (this.isHero()) {
            txt += "\n\nFighting Styles:\n";
            var styleTxt = "";

            for (var i in this.fightingStyles) {
                styleTxt += " - " + this.fightingStyles[i] + "\n";
            }

            if (styleTxt == "") {
                txt += "None\n";
            }
            else if (this.hasUltimatePP()) {
                txt += " - Ultimate PP";
            }
            else {
                txt += styleTxt
            }
        }
        else {
            txt += "\n"
        }

        txt += "\nStatus:\n";
        var statusTxt = ""
        for (var i in this.getAllStatus()) {
            statusTxt += this.getAllStatus()[i]["display"] + "\n";
        }

        if (statusTxt == "") {
            txt += "None\n";
        }
        else {
            txt += statusTxt
        }

        return txt;
    }
    getAllStatus() {
        var list = [];
        // DEX Bonus
        if (this.noDex > 0) {
            var status = {};
            status["display"] = " - No DEX";
            status["icon"] = null;
            list.push(status);
        }
        else if (this.DEXBonus != 0) {
            var status = {};
            status["display"] = " - DEX Bonus : " + this.DEXBonus;
            status["icon"] = null;
            list.push(status);
        }
        // One turn Buffs
        if (this.backFromDeath > 0) {
            var status = {};
            status["display"] = " - Undeath Energy";
            status["icon"] = "special/death";
            list.push(status);

            if (this.isHero() && this.isAlive()) {
                AchievementManager.unlockAchievement(4); // FLEX
            }
        }
        if (this.scoutBuff > 0) {
            var status = {};
            status["display"] = " - Examination Buff";
            status["icon"] = "exam";
            list.push(status);
        }
        if (this.highFiveBuff > 0) {
            var status = {};
            status["display"] = " - High Five Buff";
            status["icon"] = "highFive";
            list.push(status);
        }
        // Value Buffs
        if (this.bleedDamage > 0) {
            var status = {};
            status["display"] = " - Haemorrhage: " + this.bleedDamage;
            status["icon"] = "bleedDamage";
            list.push(status);
        }
        if (this.damageBuildUp > 0) {
            var status = {};
            status["display"] = " - Damage Build-Up: " + this.damageBuildUp;
            status["icon"] = "muscle";
            list.push(status);
        }
        if (this.pigHeal > 0) {
            var status = {};
            status["display"] = " - Hog Squeezer: " + this.pigHeal;
            status["icon"] = "pig";
            list.push(status);
        }
        if (this.redPillAddiction > 0) {
            var status = {};
            status["display"] = " - Red Pill Addiction: " + this.redPillAddiction;
            status["icon"] = "redpill";
            list.push(status);
        }
        // Temporary Buffs
        if (this.waifuDetermination > 0) {
            var status = {};
            status["display"] = " - Waifu Determination (for " + this.waifuDetermination + " turn";
            if (this.waifuDetermination > 1) status["display"] += "s";
            status["display"] += ")"
            status["icon"] = "special/waifuDetermination";
            list.push(status);
        }
        if (this.boomerang > 0) {
            var status = {};
            status["display"] = " - Boomerang (for " + this.boomerang + " turn";
            if (this.boomerang > 1) status["display"] += "s";
            status["display"] += ")"
            status["icon"] = "boomerang";
            list.push(status);
        }
        if (this.depression > 0) {
            var status = {};
            status["display"] = " - Depression (for " + this.depression + " turn";
            if (this.depression > 1) status["display"] += "s";
            status["display"] += ")"
            status["icon"] = "other/depression";
            list.push(status);
        }
        if (this.killerBlessing > 0) {
            var status = {};
            status["display"] = " - Killing Adrenaline (for " + this.killerBlessing + " turn";
            if (this.killerBlessing > 1) status["display"] += "s";
            status["display"] += ")"
            status["icon"] = "special/killerBlessing";
            list.push(status);
        }
        // Countdowns
        if (this.turkeyBomb > 0) {
            var status = {};
            status["display"] = " - Turkey Countdown: " + this.turkeyBomb + " turn";
            if (this.turkeyBomb > 1) {
                status["display"] += "s";
                status["icon"] = "turkeyA";
            }
            else {
                status["icon"] = "turkeyB";
            }
            list.push(status);
        }
        // Permanent Buffs
        if (this.truffleFriendly) {
            var status = {};
            status["display"] = " - Touched by the Ancient Fungus";
            status["icon"] = "other/fungus";
            list.push(status);
        }
        return list;
    }
    resetStatus() {
        this.killerBlessing = 0;
        this.wantsHighFive = false;
        this.highFiveBuff = 0;
        this.bleedDamage = 0;
        this.truffleFriendly = false;
        this.scoutBuff = 0;
        this.redPillAddiction = 0;
        this.turkeyBomb = -1;
        this.boomerang = 0;
        this.pigHeal = 0;
        this.noDex = 0;
        this.waifuDetermination = 0;
        this.depression = 0;
        this.damageBuildUp = 0;
    }

    get STR() {
        var a = this.STRValue;

        if (this.hasFightingStyle("big")) {
            a += 20;
        }
        if (this.hasFightingStyle("fast")) {
            a -= 10;
        }
        if (this.hasUltimatePP()) {
            a += 50;
        }

        if (this.highFiveBuff > 0) {
            a += 50;
        }
        if (this.waifuDetermination > 0) {
            a += this.waifuDetermination*10;
        }

        return a;
    }
    setSTR(_str) { this.STRValue = _str - this.STR + this.STRValue; }
    isDead() { return this.STR <= 0; }
    isAlive() { return !this.isDead(); }

    get DEX() {
        if (this.isDead()) return -999999999;
        if (this.noDex > 0) return 0;
        var a = this.DEXValue + this.DEXBonus;

        if (this.damageBuildUp > 0) {
            a = this.DEXBonus;
        }

        if (this.hasFightingStyle("big")) {
            a -= 5;
        }
        if (this.hasFightingStyle("fast")) {
            a += 5;
        }
        if (this.hasFightingStyle("versatile")) {
            a -= 20;
        }
        if (this.hasUltimatePP()) {
            a += 50;
        }

        if (this.highFiveBuff > 0) {
            a += 20;
        }
        if (this.scoutBuff > 0) {
            a += 20;
        }
        if (this.waifuDetermination > 0) {
            a += this.waifuDetermination*5;
        }

        return a;
    }
    setDEX(_dex) { this.DEXValue = _dex - this.DEX + this.DEXValue; }

    hasFightingStyle(_style) {
        return (this.fightingStyles.indexOf(_style) > -1) || (this.fightingStyles.indexOf(FightingStyles.get(_style)) > -1);
    }
    addFightingStyle(_style) {
        if (this.hasFightingStyle(_style)) return;
        if (FightingStyles.get(_style) != null) _style = FightingStyles.get(_style);
        this.fightingStyles.push(_style);
    }
    hasUltimatePP() {
        return this.fightingStyles.length >= FightingStyles.StylesList.length;
    }

    turnChange() {
        if (this.isDead()) {
            // bonus lives
            if (this.nextPhase != null) {
                for (var i in this.duel.enemies) {
                    if (this.duel.enemies[i].id == this.id) {
                        var next = this.nextPhase.newInstance();
                        var obj = ["spriteObject", "spriteX", "spriteY", "STRTextObject", "DEXTextObject", "duel"];
                        for (var j in obj) {
                            next[obj[j]] = this[obj[j]];
                        }
                        this.duel.memoryTurnChange.push(function(_fighter) {
                            _fighter.duel.addMessage(_fighter.getName() + " unleashes its next phase!");
                            _fighter.duel.memorySoundEffects.push("flex");
                        });
                        return this.duel.enemies[i] = next;
                    }
                }
            }
            return false;
        }

        this.chosenMove = null;
        this.chosenTarget = null;
        this.moveCap = 0;

        // effects
        if (this.killerBlessing > 0) {
            this.duel.memoryTurnChange.push(function(_fighter) {
                _fighter.duel.addMessage(_fighter.getName() + " gets +1 DEX thanks to the Killing Adrenaline!");
                _fighter.DEXValue += 1;
                _fighter.heal(_fighter.killerBlessing*10, "inner");

                _fighter.killerBlessing -= 1;
            });
        }
        if (this.bleedDamage > 0) {
            this.duel.memoryTurnChange.push(function(_fighter) {
                _fighter.duel.addMessage(_fighter.getName() + " bleeds.");
                _fighter.damage(_fighter.bleedDamage, "inner");
            });
        }
        if (this.pigHeal > 0) {
            this.duel.memoryTurnChange.push(function(_fighter) {
                _fighter.duel.addMessage(_fighter.getName() + " squeezes hog!");
                _fighter.heal(_fighter.pigHeal, "inner");

                _fighter.duel.memorySoundEffects.push("mmh");
            });
        }
        if (this.depression > 0) {
            this.duel.memoryTurnChange.push(function(_fighter) {
                _fighter.duel.addMessage(_fighter.getName() + " is depressive...");
                _fighter.executeMove(SawBlade, _fighter);

                _fighter.depression -= 1;
            });
        }

        // countdown
        if (this.turkeyBomb > 0) {
            this.turkeyBomb -= 1;
            if (this.turkeyBomb <= 0) {
                this.duel.memoryTurnChange.push(function(_fighter) {
                    _fighter.duel.addMessage(_fighter.getName() + " explodes!");
                    _fighter.damage(1000, "inner");

                    _fighter.duel.memorySoundEffects.push("explosion");
                });
            }
        }

        // temporary effects
        this.wantsHighFive = false;
        this.highFiveBuff = Math.max(0, this.highFiveBuff-1);
        this.scoutBuff = Math.max(0, this.scoutBuff-1);
        this.boomerang = Math.max(0, this.boomerang-1);
        this.noDex = Math.max(0, this.noDex-1);
        this.waifuDetermination = Math.max(0, this.waifuDetermination-1);
        this.backFromDeath = Math.max(0, this.backFromDeath-1);
    }

    getRandomMove() {
        return randomFromList(this.getCurrentListOfMoves());
    }

    executeMove(_move = this.chosenMove, _target = this.chosenTarget, _forceMove = false) {
        var nbActions = this.nbActions;

        if (this.boomerang > 0) nbActions += nbActions;

        this.moveCap += 1;
        if (this.moveCap >= 100) {
            if (this.moveCap == 100) {
                var myId = this.id;
                this.duel.memoryMoves = this.duel.memoryMoves.filter(move => move.user.id == myId);
                return this.duel.addMessage(this.getName() + "'s Move Cap Achieved!");
            }
            return;
        }
        this.duel.moveCount += 1;
        _move.newInstance().execute(this, _target);

        if (_forceMove) return;
        for (var i=0; i < nbActions-1; i++) {
            var storedMove = {};
            storedMove["user"] = this;
            storedMove["move"] = _move;
            storedMove["target"] = _target;
            this.duel.memoryMoves.unshift(storedMove);
        }
    }
    rollDEX() {
        var maxRoll = 50;

        // max roll modifiers
        if (this.hasFightingStyle("crystal")) {
            maxRoll += 20;
        }
        if (this.hasFightingStyle("diamond")) {
            maxRoll -= 10;
        }

        if (this.chosenMove == null) {
            this.rolledDEX = 0;
        }
        else {
            this.rolledDEX = this.DEX + Math.floor(Math.random() * maxRoll + 1);
            if (!this.duel.noDexModifier) {
                this.rolledDEX += this.chosenMove.newInstance().dexChange;
            }
        }
    }

    canPlayThisTurn() {
        if (this.chosenMove != null) {
            return false;
        }
        if (this.isDead()) {
            return false;
        }
        return true;
    }

    damage(_value, _type, _opponent = null) {
        if (_type == "auto") {
            // DO NOT USE EXTERNALLY
            if (this.duel.steelProtection) {
                _value = Math.floor(_value/10);
            }

            if (_value > 0) {
                if (this.isAlive()) {
                    this.duel.memorySoundEffects.push(this.getHurtSound());
                    if (this.STR <= _value) {
                        // TODO death sound ?
                        if (this.duel.mainFighter.id == this.id) {
                            this.backFromDeath = 2;
                            // TODO : add 1 madness stack
                        }
                        else {
                            this.duel.mainFighter.killerBlessing += this.getDangerLevel();

                            if (this.duel.mainFighter.chosenMove == Hologram && this.duel.mainFighter.isHero()) {
                                AchievementManager.unlockAchievement(1); // VITAL_POINT
                            }
                        }
                    }
                }
                else if (this.getCorpseSound() != null) {
                    this.duel.memorySoundEffects.push(this.getCorpseSound());
                }
                this.STRValue -= _value;
                this.duel.addMessage(this.getName() + " takes " + _value + " damages.");
                return true;
            }
            else {
                this.duel.addMessage(this.getName() + " takes no damage.");
                return false;
            }
        }
        else if (_type == "inner") {
            // Bleed etc
            return this.damage(_value, "auto");
        }
        else if (_type == "attack") {
            // critical hit
            var criticalChance = 5; // %
            if (getRandomPercent() <= criticalChance) {
                this.duel.addMessage("Critical Hit!");
                _value = _value*2;
            }

            // opponent's effects
            if (_opponent.damageBuildUp > 0 && _value > 0) {
                _value = _value*_opponent.damageBuildUp;
                _opponent.damageBuildUp = 0;
            }
            if (_opponent.backFromDeath > 0 && _value > 0) {
                _value = _value*2;
            }
            if (_opponent.hasFightingStyle("scarred") > 0 && _value > 0 && getRandomPercent() <= 10) {
                this.duel.addMessage(_opponent.getName() + "'s PP scar scares " + this.getName() + "!");
                this.noDex = 2;
            }

            // self effects
            if (this.hasFightingStyle("crystal")) {
                _value = Math.floor(_value*1.2);
            }
            if (this.hasFightingStyle("diamond")) {
                _value = Math.floor(_value*0.5);
            }
        }
        else {
            console.log("Warning: Damage type was incorrect: <" + _type + ">.")
        }

        // character protections
        // TODO

        // check reverse damage
        return this.damage(_value, "auto");
    }

    heal(_value, _type) {
        if (_type == "auto") {
            // DO NOT USE EXTERNALLY
            if (_value > 0) {
                this.STRValue += _value;
                this.duel.addMessage(this.getName() + " gets healed by " + _value + " HP.");
                this.duel.memorySoundEffects.push("heal");
                return true;
            }
            else {
                this.duel.addMessage(this.getName() + " gets no heal.");
                return false;
            }
        }

        // add effects
        // check reverse damage
        return this.heal(_value, "auto");
    }

    updateTextObjects() {
        if (this.isDead()) {
            this.spriteObject.setTint(9474192);

            this.STRTextObject.setText("DEAD");
            this.DEXTextObject.setText("");
        }
        else {
            this.spriteObject.clearTint();
            this.spriteObject.setText(this.getName());

            this.STRTextObject.setText("STR: " + this.STR);
            this.DEXTextObject.setText("DEX: " + this.DEX);
        }
    }

    getDangerLevel() { // used for killer blessing
        return 1;
    }
    isHero() {
        return false;
    }
    getHurtSound() {
        return "hurtA";
    }
    getCorpseSound() {
        return null;
    }
}

Fighter.idCounter = 0;
