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
        this.godsList = []; this.regularCharges = 0; this.specialCharges = 0;

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
            if (this.getAllStatus()[i]["display"] != null) statusTxt += this.getAllStatus()[i]["display"] + "\n";
        }

        if (statusTxt == "") {
            txt += "None\n";
        }
        else {
            txt += statusTxt
        }

        if (this.regularCharges > 0 || this.specialCharges > 0) {
            txt += "\nFaith:\n";
            var godsTxt = "";

            for (var i in this.godsList) {
                godsTxt += " - " + this.godsList[i].name + "\n";
            }

            if (godsTxt == "") {
                txt += "No God\n";
            }
            else {
                txt += godsTxt
            }

            txt += "Regular Charges: " + this.regularCharges + "\n";
            txt += "Special Charges: " + this.specialCharges + "\n";
        }
        else {
            txt += "\n"
        }

        var synergyTxt = "";
        for (var i in GodManager.SYNERGY_LIST) {
            if (this.hasSynergy(GodManager.SYNERGY_LIST[i].name)) {
                synergyTxt += " - " + GodManager.SYNERGY_LIST[i].name + "\n"
            }
        }
        if (synergyTxt != "") txt += "\nSynergies:\n" + synergyTxt;

        return txt;
    }
    getAllStatus() {
        var list = [];
        // Only Icons
        if (this.regularCharges > 0) {
            var status = {};
            status["display"] = null;
            status["icon"] = "special/regularCharge";
            list.push(status);
        }
        if (this.specialCharges > 0) {
            var status = {};
            status["display"] = null;
            status["icon"] = "special/specialCharge";
            list.push(status);
        }

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
        if (this.isFrightening) {
            var status = {};
            status["display"] = " - Frightening";
            status["icon"] = "other/scary";
            list.push(status);
        }
        if (this.highFiveBuff > 0) {
            var status = {};
            status["display"] = " - High Five Buff";
            status["icon"] = "highFive";
            list.push(status);
        }
        // Value Buffs
        if (this.damageBuildUp > 0) {
            var status = {};
            status["display"] = " - Damage Build-Up: " + this.damageBuildUp;
            status["icon"] = "muscle";
            list.push(status);
        }
        if (this.extraLife > 0) {
            var status = {};
            status["display"] = " - Extra Lives: " + this.extraLife;
            status["icon"] = "extraLife";
            list.push(status);
        }
        if (this.bleedDamage > 0) {
            var status = {};
            status["display"] = " - Haemorrhage: " + this.bleedDamage;
            status["icon"] = "bleedDamage";
            list.push(status);
        }
        if (this.lifeFibers > 0) {
            var status = {};
            status["display"] = " - Life Fiber: " + (this.lifeFibers*5) + "%";
            status["icon"] = "lifeFiber";
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
        if (this.hasBoner) {
            var status = {};
            status["display"] = " - Big Boner Mmmmmmh...";
            status["icon"] = "boner";
            list.push(status);
        }
        if (this.isCowboy) {
            var status = {};
            status["display"] = " - Cowboy";
            status["icon"] = "cowboy";
            list.push(status);
        }
        if (this.eldritchFriendly) {
            var status = {};
            status["display"] = " - Eldritch Friendly";
            status["icon"] = "eldritch";
            list.push(status);
        }
        if (this.hasKamui) {
            var status = {};
            status["display"] = " - Kamui";
            status["icon"] = "kamui";
            list.push(status);
        }
        if (this.saltyWounds) {
            var status = {};
            status["display"] = " - Salty Wounds";
            status["icon"] = "salt";
            list.push(status);
        }
        if (this.isSilenced) {
            var status = {};
            status["display"] = " - Silenced";
            status["icon"] = "silence";
            list.push(status);
        }
        if (this.shieldOfFaith) {
            var status = {};
            status["display"] = " - Shield of Faith";
            status["icon"] = "other/faithShield";
            list.push(status);
        }
        if (this.riotShield) {
            var status = {};
            status["display"] = " - Riot Shield";
            status["icon"] = "shield";
            list.push(status);
        }
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
        this.extraLife = 0;
        this.isCowboy = false;
        this.eldritchFriendly = false;
        this.hasBoner = false;
        this.saltyWounds = false;
        this.isFurry = false; // TODO: icon+status text
        this.isFrightening = false;
        this.riotShield = false;
        this.shieldOfFaith = false;
        this.isSilenced = false;
        this.hasKamui = false;
        this.lifeFibers = false;
    }

    get STR() {
        if (this.duel == null) return 1;

        var a = this.STRValue;

        if (this.hasFightingStyle("big")) {
            a += 20;
        }
        if (this.hasFightingStyle("fast")) {
            a -= 10;
        }
        if (this.hasFightingStyle("hockey puck")) {
            a -= 45;
        }
        if (this.hasUltimatePP()) {
            a += 50;
        }

        if (this.hasSynergy("Cosmopolitan")) {
            a += 15;
        }

        if (this.highFiveBuff > 0) {
            a += 50;
        }
        if (this.waifuDetermination > 0) {
            a += this.waifuDetermination*10;
        }
        if (this.hasBoner) {
            a += 50;
        }
        if (this.hasKamui) {
            a += 200;
        }

        return a;
    }
    setSTR(_str) { this.STRValue = _str - this.STR + this.STRValue; }
    isDead() { return this.STR <= 0; }
    isAlive() { return !this.isDead(); }

    get DEX() {
        if (this.duel == null) return 1;
        if (this.isDead()) return -999999999;
        if (this.noDex > 0) return 0;
        for (var i in this.duel.getOppsOf(this)) if (this.duel.getOppsOf(this)[i].isFrightening) return 0;

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
        if (this.hasFightingStyle("hockey puck")) {
            a -= 45;
        }
        if (this.hasUltimatePP()) {
            a += 50;
        }

        if (this.hasSynergy("Cosmopolitan")) {
            a += 5;
        }
        if (this.hasSynergy("Eldon Duality") && this.isAlive()) {
            var allies = this.duel.getAlliesOf(this);
            var nb = 0;
            for (var i in allies) {
                if (allies[i].isAlive()) nb += 1;
            }
            if (nb == 1) a += 10;
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
        if (this.hasBoner) {
            a -= 20;
        }
        if (this.hasKamui) {
            a += 20;
        }

        if (a < 10 && this.hasSynergy("Debilus Team")) return 10;
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
            this.checkNextPhase();
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
                var dmg = _fighter.bleedDamage;
                if (_fighter.saltyWounds) dmg = dmg*5;

                _fighter.duel.addMessage(_fighter.getName() + " bleeds.");
                _fighter.damage(dmg, "inner");
            });
        }
        if (this.pigHeal > 0) {
            this.duel.memoryTurnChange.push(function(_fighter) {
                var heal = _fighter.pigHeal;
                if (_fighter.isCowboy) heal = heal*3;

                _fighter.duel.addMessage(_fighter.getName() + " squeezes hog!");
                _fighter.heal(heal, "inner");

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

        // other stuff
        if (this.hasKamui) {
            this.duel.memoryTurnChange.push(function(_fighter) {
                _fighter.duel.addMessage(_fighter.getName() + "'s Kamui drains his blood!");
                _fighter.damage(20, "inner")
                if (_fighter.STR <= 40) {
    				_fighter.hasKamui = false;
    				_fighter.duel.addMessage(_fighter.getName() + "'s Kamui leaves him to prevent his death!");
    			}
            });
        }

        // synergies
        if (this.hasSynergy("Holy Brenn Trinity")) {
            this.duel.memoryTurnChange.push(function(_fighter) {
                _fighter.duel.addMessage("The Holy Brenn Trinity blesses " + _fighter.getName() + "'s party!");
                var l = _fighter.duel.getAlliesOf(_fighter, true);
                for (var i in l) {
                    if (l[i].isDead()) continue;
                    l[i].heal(5);
                }
            });
        }
        if (this.hasSynergy("Unholy Pudding Trinity")) {
            this.duel.memoryTurnChange.push(function(_fighter) {
                _fighter.duel.addMessage("The Unholy Pudding Trinity curses " + _fighter.getName() + "'s opponents!");
                var l = _fighter.duel.getOppsOf(_fighter);
                for (var i in l) {
                    if (l[i].isDead()) continue;
                    l[i].damage(5, "inner");
                }
            });
        }
        if (this.hasSynergy("Garbage Music Maker")) {
            this.duel.memoryTurnChange.push(function(_fighter) {
                _fighter.duel.addMessage(_fighter.getName() + " plays garbage music!");
                var l = _fighter.duel.getOppsOf(_fighter);
                for (var i in l) {
                    if (l[i].isDead()) continue;
                    l[i].bleedDamage += 1;
                }
            });
        }

        // temporary effects
        this.wantsHighFive = false;
        this.isFrightening = false;
        this.highFiveBuff = Math.max(0, this.highFiveBuff-1);
        this.scoutBuff = Math.max(0, this.scoutBuff-1);
        this.boomerang = Math.max(0, this.boomerang-1);
        this.noDex = Math.max(0, this.noDex-1);
        this.waifuDetermination = Math.max(0, this.waifuDetermination-1);
        this.backFromDeath = Math.max(0, this.backFromDeath-1);
    }
    checkNextPhase() {
        if (this.isAlive()) return;
        if (this.nextPhase != null) {
            var storedMove = {};
            storedMove["user"] = this;
            storedMove["move"] = TriggerNextPhase;
            storedMove["target"] = null;
            this.duel.memoryMoves.push(storedMove);
        }
    }

    getRandomMove() {
        return randomFromList(this.getCurrentListOfMoves());
    }

    executeMove(_move = this.chosenMove, _target = this.chosenTarget, _forceMove = false) {
        if (_move == null) return;

        this.duel.moveCount += 1;
        if (_forceMove) return _move.newInstance().execute(this, _target);;

        this.moveCap += 1;
        if (this.moveCap >= 100) {
            if (this.moveCap == 100) {
                var myId = this.id;
                this.duel.memoryMoves = this.duel.memoryMoves.filter(move => move.user.id == myId);
                return this.duel.addMessage(this.getName() + "'s Move Cap Achieved!");
            }
            return;
        }
        _move.newInstance().execute(this, _target);

        var nbActions = this.nbActions;
        if (this.boomerang > 0) nbActions += nbActions;
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
                    if (this.getHurtSound() != null) this.duel.memorySoundEffects.push(this.getHurtSound());
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

                if (this.STR <= 0) {
                    if (this.extraLife > 0) {
                        this.duel.mainFighter.killerBlessing += 1;

                        var resetFighter = eval("new " + this.constructor.name + "(\"\")");
                        resetFighter.duel = this.duel;
                        this.STRValue = resetFighter.STRValue;
                        this.extraLife -= 1;

                        this.duel.addMessage(this.getName() + " uses an extra life!");
                        this.duel.memorySoundEffects.push("extraLife");
                    }
                    else { this.checkNextPhase(); }
                }
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
            var criticalChance = 5 + _opponent.lifeFibers*5; // %
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
            if (this.shieldOfFaith) {
                _value -= 5*this.godsList.length;
            }
            if (this.hasSynergy("Waifu Body Pillow")) {
                _value -= 10;
            }
            if (this.hasFightingStyle("crystal")) {
                _value = Math.floor(_value*1.2);
            }
            if (this.hasFightingStyle("diamond")) {
                _value = Math.floor(_value*0.5);
            }

            if (this.riotShield) {
                this.riotShield = false;
                this.duel.addMessage(this.getName() + " reflects the attack!");
                _opponent.damage(_value, "attack", this);

                this.duel.addAnimation("reflects", 60, this);
                this.duel.addAnimation("damaged", 60, _opponent, true, false);
                this.duel.memorySoundEffects.push("protect");
                return false;
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

    addRandomGod(_category = "regular") {
        var god = GodManager.getRandomGod(_category);
        var nbTries = 0;
        while (nbTries <= 10000) {
            if (this.godsList.indexOf(god) < 0) {
                this.godsList.push(god);
                return true;
            }
            god = GodManager.getRandomGod(_category);
            nbTries += 1;
        }
        return false;
    }
    hasSynergy(_synergy) {
        var s = GodManager.getSynergy(_synergy);
        for (var i in s.requiredGods) {
            if (this.godsList.indexOf(s.requiredGods[i]) < 0 && !this.hasGodType(s.requiredGods[i])) return false;
        }
        return true;
    }
    hasGodType(_godType) {
        for (var i in this.godsList) {
            if (this.godsList[i].type == _godType) return true;
        }
        return false;
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

    getNextPhaseText() {
        return this.getName() + " unleashes its next phase!";
    }
    getNextPhaseSound() {
        return "flex";
    }
}

Fighter.idCounter = 0;
