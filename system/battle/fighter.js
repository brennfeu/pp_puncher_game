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
        this.standPower = null;

        // effects
        this.resetStatus();
        this.forcedStatus = null;
        this.specialLuck = 0;

        // movepool
        this.currentMovepool = [];
        this.chosenMove = null;
        this.chosenTarget = null;
        this.moveCap = 0;
        this.moveHistory = [];

        this.nextPhase = null;

        this.spriteObject = null; // Gets instanciated by the duel scene
        this.spriteX = 0;
        this.spriteY = 0;
        this.STRTextObject = null; // Gets instanciated by the duel scene
        this.DEXTextObject = null; // Gets instanciated by the duel scene
        this.statusIconObjects = [];
    }
    loadPartyMember(_partyMember) {
        this.partyMember = _partyMember;
        for (var i in _partyMember.fightingStyles) {
            this.addFightingStyle(_partyMember.fightingStyles[i]);
        }
        for (var i in _partyMember.gods) {
            this.godsList.push(GodManager.getGod(_partyMember.gods[i]));
        }
        for (var i in _partyMember.relics) {
            this.relics.push(RelicManager.getRelic(_partyMember.relics[i]));
        }
    }
    initForDuel() {
        // duel start functions
        for (var j in this.godsList) {
            if (this.godsList[j].startFunction != null) this.godsList[j].startFunction(this);
        }

        this.triggerStandAbilities();
    }

    getName() {
        if (this.isTree) return "Blasted Tree";
        if (this.legatoActivated) return "Legato";

        var fullname = this.name;
        if (this.duel.sexyTextCountdown > 0) {
			if ((this.id+this.duel.turnCount)%3 == 0) {
				fullname = "Sexy " + fullname;
			}
			else if ((this.id+this.duel.turnCount)%3 == 1) {
				fullname = "Hot " + fullname;
			}
			else {
				fullname = "Retarded " + fullname;
			}
		}
        if (this.genderBender) {
            fullname += "ia";
        }
        if (this.duel.uwuText) {
			if ((this.id+this.duel.turnCount)%4 == 0) {
				fullname += "-Chan";
			}
			else if ((this.id+this.duel.turnCount)%4 == 1) {
				fullname += "-Kun";
			}
			else if ((this.id+this.duel.turnCount)%4 == 2) {
				fullname += "-Senpai";
			}
			else {
				fullname += "-Sama";
			}
		}
        return fullname;
    }
    getDescription() {
        var txt = this.getName();

        if (this.isHero()) {
            txt += "\n\nFighting Styles:";
            var styleTxt = "";

            for (var i in this.fightingStyles) {
                styleTxt += "\n - " + this.fightingStyles[i];
            }

            if (styleTxt == "") {
                txt += " None";
            }
            else if (this.hasUltimatePP()) {
                txt += " Ultimate PP";
            }
            else {
                txt += styleTxt
            }
        }

        txt += "\n\nStatus:";
        var statusTxt = ""
        for (var i in this.getAllStatus()) {
            if (this.getAllStatus()[i]["display"] != null) statusTxt += "\n" + this.getAllStatus()[i]["display"];
        }

        if (statusTxt == "") {
            txt += " None";
        }
        else {
            txt += statusTxt
        }

        if ((this.regularCharges > 0 || this.specialCharges > 0) && this.godsList.length > 0 && !this.isSilenced) {
            txt += "\n\nFaith:";

            for (var i in this.godsList) {
                txt += "\n - " + this.godsList[i].name;
            }

            txt += "\nRegular Charges: " + this.regularCharges;
            txt += "\nSpecial Charges: " + this.specialCharges;
        }

        var synergyTxt = "";
        for (var i in GodManager.SYNERGY_LIST) {
            if (this.hasSynergy(GodManager.SYNERGY_LIST[i].name)) {
                synergyTxt += "\n - " + GodManager.SYNERGY_LIST[i].name
            }
        }
        if (synergyTxt != "") txt += "\n\nSynergies:" + synergyTxt;

        return txt;
    }
    getAllStatus() {
        // multiplayer forced status
        if (this.forcedStatus != null) return this.forcedStatus;
        if (this.isTree) return [];

        var list = [];
        // Only Icons
        if (this.regularCharges > 0 && this.godsList.length > 0 && !this.isSilenced) {
            var status = {};
            status["display"] = null;
            status["icon"] = "special/regularCharge";
            list.push(status);
        }
        if (this.specialCharges > 0 && this.godsList.length > 0 && !this.isSilenced) {
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
        else if (this.noDexBonus) {
            var status = {};
            status["display"] = " - DEX Bonus : None";
            status["icon"] = "noDexBonus";
            list.push(status);
        }
        else if (this.DEXBonus != 0) {
            var status = {};
            status["display"] = " - DEX Bonus : " + this.DEXBonus;
            status["icon"] = null;
            list.push(status);
        }
        // One turn Buffs
        if (this.blindness > 0) {
            var status = {};
            status["display"] = " - Blind";
            status["icon"] = "blind";
            list.push(status);
        }
        if (this.confusion > 0) {
            var status = {};
            status["display"] = " - Confused";
            status["icon"] = "confusion";
            list.push(status);
        }
        if (this.scoutBuff > 0) {
            var status = {};
            status["display"] = " - Examination Buff";
            status["icon"] = "exam";
            list.push(status);
        }
        if (this.fullOfAmmos) {
            var status = {};
            status["display"] = " - Full of Ammos";
            status["icon"] = "ammos";
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
        if (this.mechSkull) {
            var status = {};
            status["display"] = " - Mech Skull";
            status["icon"] = "mechSkull";
            list.push(status);
        }
        if (this.readyToBurst) {
            var status = {};
            status["display"] = " - Ready to Burst";
            status["icon"] = "trapSign";
            list.push(status);
        }
        if (this.trappedInStar) {
            var status = {};
            status["display"] = " - Trapped in a Star";
            status["icon"] = "other/starTrapped";
            list.push(status);
        }
        if (this.isTrolled > 0) {
            var status = {};
            status["display"] = " - Trolled";
            status["icon"] = "troll";
            list.push(status);
        }
        if (this.backFromDeath > 0) {
            var status = {};
            status["display"] = " - Undeath Energy";
            status["icon"] = "special/death";
            list.push(status);

            if (this.isHero() && this.isAlive()) {
                AchievementManager.unlockAchievement(4); // FLEX
            }
        }
        // Value Buffs
        if (this.armorValue > 0) {
            var status = {};
            status["display"] = " - Armor STR: " + this.armorValue;
            status["icon"] = "other/armor";
            list.push(status);
        }
        if (this.specialArmorValue > 0) {
            var status = {};
            status["display"] = " - Special Armor STR: " + this.specialArmorValue;
            status["icon"] = "other/specialArmor";
            list.push(status);
        }
        if (this.acidDamage > 0) {
            var status = {};
            status["display"] = " - Acid: " + this.acidDamage;
            status["icon"] = "acidDamage";
            list.push(status);
        }
        if (this.lostSoulCount > 0) {
            var status = {};
            status["display"] = " - Additional Lost Souls: " + this.lostSoulCount;
            status["icon"] = "lostSouls";
            list.push(status);
        }
        if (this.blueFire > 0) {
            var status = {};
            status["display"] = " - Blue Fire: " + this.blueFire;
            status["icon"] = "blueFire";
            list.push(status);
        }
        if (this.damageBuildUp > 0) {
            var status = {};
            status["display"] = " - Damage Build-Up: " + this.damageBuildUp;
            status["icon"] = "muscle";
            list.push(status);
        }
        if (this.signpostCurse > 0) {
            var status = {};
            status["display"] = " - Exposed: " + this.signpostCurse*25 + "%";
            status["icon"] = "exposed";
            list.push(status);
        }
        if (this.extraLife > 0) {
            var status = {};
            status["display"] = " - Extra Lives: " + this.extraLife;
            status["icon"] = "extraLife";
            list.push(status);
        }
        if (this.quickeningCharges > 0) {
            var status = {};
            status["display"] = " - Quickening Charges: " + this.quickeningCharges;
            status["icon"] = "quickening";
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
        if (this.luck > 0) {
            var status = {};
            status["display"] = " - Luck Stacks: " + this.luck;
            status["icon"] = "luck";
            list.push(status);
        }
        if (this.madnessStacks > 0) {
            var status = {};
            status["display"] = " - Madness Stacks: " + this.madnessStacks;
            status["icon"] = "madness";
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
        if (this.scalyScars > 0) {
            var status = {};
            status["display"] = " - Scaly Scars: " + this.scalyScars;
            status["icon"] = "scalyScars";
            list.push(status);
        }
        if (this.chessPromotion > 0) {
            var status = {};
            status["display"] = " - Chess Piece: ";
            if (this.chessPromotion == 1) {
                status["display"] += "Pawn";
                status["icon"] = "other/promotionPawn";
            }
            else if (this.chessPromotion == 2) {
                status["display"] += "Knight";
                status["icon"] = "other/promotionKnight";
            }
            else if (this.chessPromotion == 3) {
                status["display"] += "Bishop";
                status["icon"] = "other/promotionBishop";
            }
            else if (this.chessPromotion == 4) {
                status["display"] += "Rook";
                status["icon"] = "other/promotionRook";
            }
            else if (this.chessPromotion == 5) {
                status["display"] += "Queen";
                status["icon"] = "other/promotionQueen";
            }
            else if (this.chessPromotion == 6) {
                status["display"] += "King";
                status["icon"] = "other/promotionKing";
            }
            else {
                status["display"] += "Unknown";
                status["icon"] = "other/promotionKing";
            }
            list.push(status);
        }
        // Temporary Buffs
        if (this.acidCover > 0) {
            var status = {};
            status["display"] = " - Acid Cover (for " + this.acidCover + " turn";
            if (this.acidCover > 1) status["display"] += "s";
            status["display"] += ")"
            status["icon"] = "acidArmor";
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
        if (this.disabled > 0) {
            var status = {};
            status["display"] = " - Disabled (for " + this.depression + " turn";
            if (this.disabled > 1) status["display"] += "s";
            status["display"] += ")"
            status["icon"] = "disabled";
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
        if (this.possessCountdown > 0 && this.possessedBy != null && this.possessedBy.isAlive()) {
            var status = {};
            status["display"] = " - Possessed by " + this.possessedBy.getName();
            if (this.possessCountdown > 1) status["display"] += (" for: " + this.possessCountdown + " turns");
            status["icon"] = "possessed";
            list.push(status);
        }
        if (this.waifuDetermination > 0) {
            var status = {};
            status["display"] = " - Waifu Determination (for " + this.waifuDetermination + " turn";
            if (this.waifuDetermination > 1) status["display"] += "s";
            status["display"] += ")"
            status["icon"] = "special/waifuDetermination";
            list.push(status);
        }
        // Countdowns
        if (this.hasRelic(4)) {
            var status = {};
            if (this.bleachCountdown <= 0) {
                status["display"] = " - Bleach Ready!";
                status["icon"] = "bleachFull";
            }
            else {
                status["display"] = " - Bleach Ready in: " + this.bleachCountdown + " turn";
                if (this.bleachCountdown > 1) {
                    status["display"] += "s";
                }
                status["icon"] = "bleachEmpty";
            }
            list.push(status);
        }
        if (this.borealAscentCountdown > 0) {
            var status = {};
            status["display"] = " - Boreal Ascent in: " + this.borealAscentCountdown + " turn";
            if (this.borealAscentCountdown > 1) {
                status["display"] += "s";
            }
            status["icon"] = "borealAscentCountdown";
            list.push(status);
        }
        if (this.gettingRegularCharge > 0) {
            var status = {};
            status["display"] = " - Regular Charge in: " + this.gettingRegularCharge + " turn";
            if (this.gettingRegularCharge > 1) {
                status["display"] += "s";
            }
            status["icon"] = "regularChargeTimer";
            list.push(status);
        }
        if (this.gettingSpecialCharge > 0) {
            var status = {};
            status["display"] = " - Special Charge in: " + this.gettingSpecialCharge + " turn";
            if (this.gettingSpecialCharge > 1) {
                status["display"] += "s";
            }
            status["icon"] = "specialChargeTimer";
            list.push(status);
        }
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
        if (this.badLuck) {
            var status = {};
            status["display"] = " - Bad Luck";
            status["icon"] = "badLuck";
            list.push(status);
        }
        if (this.hasBoner) {
            var status = {};
            status["display"] = " - Big Boner Mmmmmmh...";
            status["icon"] = "boner";
            list.push(status);
        }
        if (this.borealAscentCountdown == 0) {
            var status = {};
            status["display"] = " - Boreal Ascent";
            status["icon"] = "borealAscent";
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
        if (this.isInquisitor) {
            var status = {};
            status["display"] = " - Inquisitor";
            status["icon"] = "other/inquisitor";
            list.push(status);
        }
        if (this.gigaChad) {
            var status = {};
            status["display"] = " - Giga Chad";
            status["icon"] = "gigaChad";
            list.push(status);
        }
        if (this.godOfDeath) {
            var status = {};
            status["display"] = " - God of Death";
            status["icon"] = "other/godOfDeath";
            list.push(status);
        }
        if (this.hasKamui) {
            var status = {};
            status["display"] = " - Kamui";
            status["icon"] = "kamui";
            list.push(status);
        }
        if (this.livingGod) {
            var status = {};
            status["display"] = " - Living God";
            status["icon"] = "livingGod";
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

        if (this.standPower != null) {
            var status = {};
            status["display"] = " - Stand: 「" + StandManager.getStand(this.standPower).name + "」";
            status["icon"] = "other/stand";
            list.push(status);
        }

        return list;
    }
    resetStatus(_onlyBadStatus = false) {
        // resets bad status
        this.bleedDamage = 0;
        this.turkeyBomb = -1;
        this.noDex = 0;
        this.depression = 0;
        this.damageBuildUp = 0;
        this.hasBoner = false;
        this.isFurry = false; // TODO: icon+status text
        this.isSilenced = false;
        this.saltyWounds = false;
        this.confusion = 0;
        this.possessedBy = null; this.possessCountdown = 0;
        this.badLuck = false;
        this.madnessStacks = 0;
        this.blindness = 0;
        this.kidneyCurse = 0;
        this.isTrolled = 0;
        this.scalyScars = 0;
        this.blueFire = 0;
        this.reducedGodhood = false;
        this.trappedInStar = false;
        this.isTree = false;
        this.acidDamage = 0;
        this.disabled = 0;
        this.noDexBonus = false;
        this.signpostCurse = 0;

        if (_onlyBadStatus) return;
        // resets good status
        this.killerBlessing = 0;
        this.wantsHighFive = false;
        this.highFiveBuff = 0;
        this.truffleFriendly = false;
        this.scoutBuff = 0;
        this.redPillAddiction = 0;
        this.boomerang = 0;
        this.pigHeal = 0;
        this.waifuDetermination = 0;
        this.extraLife = 0;
        this.isCowboy = false;
        this.eldritchFriendly = false;
        this.isFrightening = false;
        this.riotShield = false;
        this.shieldOfFaith = false;
        this.hasKamui = false;
        this.lifeFibers = 0;
        this.cannotFailMove = false; // hidden for wyndoella boss
        this.luck = 0;
        this.livingGod = false;
        this.isInquisitor = false;
        this.armorValue = 0;
        this.specialArmorValue = 0;
        this.acidCover = 0;
        this.godOfDeath = false;
        this.chessPromotion = 0;
        this.gettingSpecialCharge = 0;
        this.gettingRegularCharge = 0;
        this.gigaChad = false;
        this.fullOfAmmos = false;
        this.quickeningCharges = 0;
        this.mechSkull = false;
        this.lostSoulCount = 0;
        this.borealAscentCountdown = -1;

        // relic activation
        this.legatoActivated = false;
        this.bleachCountdown = 0;
    }
    addRandomBuff(_id = -1) {
        while(true) {
            var r = getRandomPercent();
            if (_id != -1) {
                r = _id;
                _id = -1;
            }

            switch(r) {
                case 1:
                    this.killerBlessing += 3;
                    return;
                case 2:
                    this.highFiveBuff = 2;
                    return;
                case 3:
                    this.truffleFriendly = true;
                    return;
                case 4:
                    this.scoutBuff = 2;
                    return;
                case 5:
                    this.redPillAddiction += 2;
                    return;
                case 6:
                    this.boomerang += 2;
                    return;
                case 7:
                    this.pigHeal += 1+Math.floor(this.STR/100);
                    return;
                case 8:
                    this.waifuDetermination += 2;
                    return;
                case 9:
                    this.extraLife += 1;
                    return;
                case 10:
                    this.isCowboy = true;
                    return;
                case 11:
                    this.eldritchFriendly = true;
                    return;
                case 12:
                    this.isFrightening = true;
                    return;
                case 13:
                    this.riotShield = true;
                    return;
                case 14:
                    this.shieldOfFaith = true;
                    return;
                case 15:
                    this.hasKamui = true;
                    return;
                case 16:
                    this.lifeFibers += 1;
                    return;
                case 17:
                    this.luck += 10;
                    return;
                case 18:
                    this.isInquisitor = true;
                    return;
                case 19:
                    this.armorValue += Math.floor(this.STR/10);
                    return;
                case 20:
                    this.specialArmorValue += Math.floor(this.STR/15);
                    return;
                case 21:
                    this.acidCover += 4;
                    return;
                case 22:
                    this.godOfDeath = true;
                    return;
                case 23:
                    this.chessPromotion += 1;
                    if (this.chessPromotion > 6) this.chessPromotion = 6;
                    return;
                case 24:
                    this.gettingRegularCharge = 5;
                    return;
                case 25:
                    this.gigaChad = true;
                    return;
                case 26:
                    this.fullOfAmmos = true;
                    return;
                case 27:
                    this.borealAscentCountdown = 11;
                    return;
            }
        }
    }
    addRandomDebuff(_id = -1) {
        while(true) {
            var r = getRandomPercent();
            if (_id != -1) {
                r = _id;
                _id = -1;
            }

            switch(r) {
                case 1:
                    this.bleedDamage += 1+Math.floor(this.STR/100);
                    return;
                case 2:
                    if (this.turkeyBomb < 2) this.turkeyBomb = 10;
                    else this.turkeyBomb = 1;
                    return;
                case 3:
                    this.isSilenced = true;
                    return;
                case 4:
                    this.saltyWounds = true;
                    return;
                case 5:
                    this.confusion += 2;
                    return;
                case 6:
                    this.badLuck += 10;
                    return;
                case 7:
                    this.madnessStacks += 5;
                    return;
                case 8:
                    this.damageBuildUp = 1;
                    return;
                case 9:
                    this.hasBoner = true;
                    return;
                case 10:
                    this.noDex += 2;
                    return;
                case 11:
                    this.blindness += 2;
                    return;
                case 12:
                    this.kidneyCurse = 2;
                    return;
                case 13:
                    this.isTrolled = 2;
                    return;
                case 14:
                    this.scalyScars += 1+Math.floor(this.STR/200)
                    return;
                case 15:
                    this.blueFire += 1+Math.floor(this.STR/50);
                    return;
                case 16:
                    this.acidDamage += 1+Math.floor(this.STR/100);
                    return;
                case 17:
                    this.disabled += 4;
                    return;
                case 18:
                    this.noDexBonus = true;
                    return;
                case 19:
                    this.signpostCurse += 1;
                    return;
            }
        }
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
        if (this.hasFightingStyle("electric")) {
            a -= 15;
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
        if (this.chessPromotion > 0) {
            a += 20*Math.pow(2, this.chessPromotion-1);
        }
        if (this.hasBoner) {
            a += 50;
        }
        if (this.livingGod) {
            if (this.reducedGodhood) a += 1000;
            else a += 10000;
        }
        if (this.borealAscentCountdown == 0) {
            a += 500;
        }

        if (this.hasStand(24)) { // Black Clouds
            a += 100;
        }

        return a;
    }
    setSTR(_str) { this.STRValue = _str - this.STR + this.STRValue; }
    isDead() { return this.STR <= 0; }
    isAlive() { return !this.isDead(); }

    get DEX() {
        if (this.duel == null) return 1;
        if (this.isDead()) return -999999999;
        if (this.noDex > 0 || this.isTree) return 0;
        for (var i in this.duel.getOppsOf(this)) if (this.duel.getOppsOf(this)[i].isFrightening) return 0;

        var a = this.DEXValue + (this.quickeningCharges*2);
        if (!this.noDexBonus) a += this.DEXBonus

        if (this.hasFightingStyle("big")) {
            a -= 5;
        }
        if (this.hasFightingStyle("fast")) {
            a += 5;
        }
        if (this.hasFightingStyle("drunken")) {
            a -= 15;
        }
        if (this.hasFightingStyle("versatile")) {
            a -= 20;
        }
        if (this.hasFightingStyle("hockey puck")) {
            a -= 45;
        }
        if (this.hasFightingStyle("small")) {
            a += 5;
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
        if (this.damageBuildUp > 0 && !this.gigaChad) {
            a -= 30;
        }
        if (this.waifuDetermination > 0) {
            a += this.waifuDetermination*5;
        }
        if (this.chessPromotion > 0) {
            a += 2*Math.pow(2, this.chessPromotion-1);
        }
        if (this.hasBoner) {
            a -= 20;
        }
        if (this.hasKamui) {
            a += 20;
        }
        if (this.livingGod) {
            if (this.reducedGodhood) a += 50;
            else a += 10000;
        }
        if (this.disabled > 0) {
            a -= 15;
        }
        if (this.borealAscentCountdown == 0) {
            a += 30;
        }

        if (this.hasStand(25)) { // Silver Lining
            a += 15;
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

    setStand(_standId) {
        this.standPower = _standId;
    }
    hasStand(_standId) {
        return this.standPower == _standId;
    }
    checkForStand() {
        if (ProgressManager.getUnlockedGameMechanics().indexOf("Stands") < 0) return false;
        //if (this.name != "Brenn") return false;

        var l = StandManager.STAND_LIST;
        for (var i in l) {
            if (l[i].summonMoves.length == 0 || this.moveHistory.length < 2) continue;

            var ready = true;
            for (var j in l[i].summonMoves) {
                if (l[i].summonMoves[j] != this.moveHistory[this.moveHistory.length - (1 + parseInt(j))]) {
                    if (ready) { // console logs
                        //console.log(l[i].name + " " + ready);
                        //console.log(l[i].summonMoves[j])
                        //console.log(this.moveHistory[this.moveHistory.length - (1 + parseInt(j))]);
                    }

                    ready = false;
                }
            }

            if (ready) {
                var storedMove = {};
                storedMove["user"] = this;
                storedMove["move"] = TriggerStand;
                storedMove["target"] = l[i].id;
                this.duel.memoryMoves.push(storedMove);

                return true;
            }
        }

        return false;
    }
    triggerStandAbilities() {
        // Black Clouds and Silver Lining
        if ((this.hasStand(0) || this.hasStand(24) || this.hasStand(25)) && !this.forcedBCaSL) {
            var stand = StandManager.getStand(randomFromList([24, 25]));
            this.setStand(stand.id);
        }

        // Boreal Flame
        if (this.hasStand(17) && this.borealAscentCountdown < 0) this.borealAscentCountdown = 10;

        // Cybion
        if (this.hasStand(8)) this.resetStatus(true);
    }

    turnChange() {
        if (this.isDead()) {
            if (!this.checkExtraLife()) {
                this.checkNextPhase();
                return false;
            }
        }

        this.chosenMove = null;
        this.chosenTarget = null;
        this.moveCap = 0;

        if (this.isTree) {
            this.chosenMove = Wait;
            return;
        }

        // stands start effect
        this.checkForStand();
        this.triggerStandAbilities();

        if (this.hasStand(7)) { // Concepts of Maths
            this.duel.memoryTurnChange.push(function(_fighter) {
                _fighter.duel.addMessage(_fighter.getName() + " gets a quickening charge!");
                _fighter.quickeningCharges += 1;

                _fighter.duel.memorySoundEffects.push("quickening");
            });
        }
        if (this.hasStand(12) && this.moveHistory.length > 0) { // Parallel Minds
            var l = this.duel.getAlliesOf(this);
            for (var i in l) {
                if (l[i].isDead() || l[i].moveHistory.length == 0) continue;
                if (l[i].moveHistory[l[i].moveHistory.length-1] == this.moveHistory[this.moveHistory.length-1]) {
                    this.duel.memoryTurnChange.push(function(_fighter) {
                        _fighter.duel.addMessage(_fighter.getName() + " gets a +15 STR and +5 DEX!");
                        _fighter.STRValue += 15;
                        _fighter.DEXValue += 5;
                    });
                }
            }
        }

        // effects
        if (this.killerBlessing > 0) {
            this.duel.memoryTurnChange.push(function(_fighter) {
                _fighter.duel.addMessage(_fighter.getName() + " gets +1 DEX thanks to the Killing Adrenaline!");
                _fighter.DEXValue += 1;
                _fighter.heal(_fighter.killerBlessing*10, "inner");

                _fighter.killerBlessing -= 1;
            });
        }
        if (this.depression > 0) {
            this.duel.memoryTurnChange.push(function(_fighter) {
                _fighter.duel.addMessage(_fighter.getName() + " is depressive...");
                _fighter.executeMove(SawBlade, _fighter);

                _fighter.depression -= 1;
            });
        }
        if (this.scalyScars > 0) {
            this.duel.memoryTurnChange.push(function(_fighter) {
                _fighter.duel.addMessage(_fighter.getName() + "'s scars hurts him!");
                _fighter.bleedDamage += _fighter.scalyScars;

                _fighter.duel.memorySoundEffects.push(_fighter.getHurtSound());
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
        if (this.acidDamage > 0) {
            this.duel.memoryTurnChange.push(function(_fighter) {
                var dmg = _fighter.acidDamage;

                _fighter.duel.addMessage(_fighter.getName() + " melts.");
                _fighter.damage(dmg, "inner");

                _fighter.duel.memorySoundEffects.push("acid");
            });
        }
        if (this.blueFire > 0) {
            this.duel.memoryTurnChange.push(function(_fighter) {
                _fighter.duel.addMessage(_fighter.getName() + " burns.");
                _fighter.damage(_fighter.blueFire, "inner");

                _fighter.duel.memorySoundEffects.push("flames");

                _fighter.blueFire -= 1 + Math.floor(_fighter.blueFire/9);
                if (_fighter.blueFire <= 0) {
                    _fighter.duel.addMessage(_fighter.getName() + "'s blue fire has died out.");
                }
                else {
                    _fighter.duel.addMessage(_fighter.getName() + "'s blue fire burns down.");
                }
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

        this.blindness = Math.max(0, this.blindness-1);
        if (this.blindness > 0) {
            this.chosenTarget = this.duel.getRandomFighter();
        }
        this.kidneyCurse = Math.max(0, this.kidneyCurse-1);
        if (this.kidneyCurse > 0 && !this.isHero()) {
            this.chosenMove = randomFromList([ KidneyShoot, SuperKidneyShoot ]);
        }

        // countdown
        if (this.turkeyBomb > 0) {
            this.turkeyBomb -= 1;
            if (this.turkeyBomb <= 0) {
                this.duel.memoryTurnChange.push(function(_fighter) {
                    _fighter.duel.addMessage(_fighter.getName() + " explodes!");
                    _fighter.damage(1000, "inner");

                    _fighter.duel.addAnimation("explosion", 60, _fighter);
                    _fighter.duel.memorySoundEffects.push("explosion");
                });
            }
        }
        if (this.borealAscentCountdown > 0) {
            this.borealAscentCountdown -= 1;
            if (this.borealAscentCountdown == 0) {
                this.duel.memoryTurnChange.push(function(_fighter) {
                    _fighter.duel.addMessage(_fighter.getName() + " achieves the Boreal Ascent!");

                    _fighter.duel.addAnimation("boreal", 60, _fighter);
                    _fighter.duel.memorySoundEffects.push("flames");
                });
            }
        }
        if (this.hasRelic(4)) {
            this.bleachCountdown = Math.max(0, this.bleachCountdown-1);
        }
        if (this.gettingRegularCharge > 0) {
            this.gettingRegularCharge -= 1;
            if (this.gettingRegularCharge <= 0) {
                this.duel.memoryTurnChange.push(function(_fighter) {
                    _fighter.duel.addMessage(_fighter.getName() + " gets a regular charge!");
                    _fighter.regularCharges += 1;

                    _fighter.duel.addAnimation("charge", 60, _fighter);
                    _fighter.duel.memorySoundEffects.push("ohYeah");
                });
            }
        }
        if (this.gettingSpecialCharge > 0) {
            this.gettingSpecialCharge -= 1;
            if (this.gettingSpecialCharge <= 0) {
                this.duel.memoryTurnChange.push(function(_fighter) {
                    _fighter.duel.addMessage(_fighter.getName() + " gets a special charge!");
                    _fighter.specialCharges += 1;

                    _fighter.duel.addAnimation("charge", 60, _fighter);
                    _fighter.duel.memorySoundEffects.push("ohYeah");
                });
            }
        }
        if (this.trappedInStar) {
            this.duel.memoryTurnChange.push(function(_fighter) {
                _fighter.trappedInStar = false;
                _fighter.duel.addMessage(_fighter.getName() + " explodes!");

                var damage = 0;
                var l = _fighter.duel.getOppsOf(_fighter);
                for (var i in l) {
                    if (l[i].STR > damage) damage = l[i].STR;
                }
                _fighter.damage(damage, "attack", _fighter.duel.fakeFighter("Rias"));

                _fighter.duel.addAnimation("explosion", 60, _fighter);
                _fighter.duel.memorySoundEffects.push("explosion");
            });
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

                _fighter.duel.memorySoundEffects.push("guitarSolo");
            });
        }

        // relics
        if (this.hasRelic(1) && this.rollLuckPercentLow() <= 5) { // Legato
            this.duel.memoryTurnChange.push(function(_fighter) {
                _fighter.duel.addMessage("Legato Activates!");
                _fighter.legatoActivated = true;

                _fighter.duel.memorySoundEffects.push("darkMagic");
            });
        }
        if (this.hasRelic(3) && this.rollLuckPercentLow() <= 10) { // Holy Prepuce
            this.duel.memoryTurnChange.push(function(_fighter) {
                var a = _fighter.DEX;
                if (a <= 10) a = 10;

                _fighter.duel.addMessage(_fighter.getName() + " gets blessed by The Holy Prepuce!");
                _fighter.duel.addMessage(_fighter.getName() + " heals based on his DEX!");
                _fighter.heal(a, "inner");
            });
        }
        if (this.hasRelic(5) && this.rollLuckPercentLow() <= 5) { // Nerdy Kiwi
            this.duel.memoryTurnChange.push(function(_fighter) {
                _fighter.duel.addMessage(_fighter.getName() + " gets filled with determination!");
                _fighter.waifuDetermination += 3;

                _fighter.duel.memorySoundEffects.push("ohYeah");
            });
        }

        // temporary effects
        this.wantsHighFive = false;
        this.isFrightening = false;
        this.readyToBurst = false;
        this.legatoActivated = false;
        this.mechSkull = false;
        this.highFiveBuff = Math.max(0, this.highFiveBuff-1);
        this.scoutBuff = Math.max(0, this.scoutBuff-1);
        this.boomerang = Math.max(0, this.boomerang-1);
        this.noDex = Math.max(0, this.noDex-1);
        this.waifuDetermination = Math.max(0, this.waifuDetermination-1);
        this.backFromDeath = Math.max(0, this.backFromDeath-1);
        this.confusion = Math.max(0, this.confusion-1);
        this.acidCover = Math.max(0, this.acidCover-1);
        this.isTrolled = Math.max(0, this.isTrolled-1);
        this.disabled = Math.max(0, this.disabled-1);
        this.possessCountdown = Math.max(0, this.possessCountdown-1); if (this.possessCountdown <= 0) this.possessedBy = null;

        // check max values
        if (this.chessPromotion > 5) this.chessPromotion = 5;

        this.armorValue = Math.max(0, this.armorValue); // not under 0
        this.specialArmorValue = Math.max(0, this.specialArmorValue); // not under 0

        this.checkExtraLife();
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
    checkExtraLife() {
        if (this.extraLife > 0) {
            this.duel.mainFighter.killerBlessing += 1;

            var resetFighter = eval("new " + this.constructor.name + "(\"\")");
            resetFighter.duel = this.duel;
            this.STRValue = resetFighter.STRValue;
            this.extraLife -= 1;

            this.duel.addMessage(this.getName() + " uses an extra life!");
            this.duel.memorySoundEffects.push("extraLife");
            return true;
        }
        return false;
    }

    getRandomMove() {
        return randomFromList(this.getCurrentListOfMoves());
    }
    getForcedMovepool() {
        if (this.duel.forceConfusion || this.confusion > 0) {
            return [ InterrogationPoint ];
        }
        else if (this.duel.forceSatan) {
            return [ BigSatan ];
        }
        return null;
    }

    executeMove(_move = this.chosenMove, _target = this.chosenTarget, _forceMove = false) {
        this.duel.moveCount += 1;
        if (_forceMove) return _move.newInstance().execute(this, _target);

        this.moveCap += 1;
        if (this.moveCap >= 100) {
            if (this.moveCap == 100) {
                var myId = this.id;
                this.duel.memoryMoves = this.duel.memoryMoves.filter(move => move.user.id == myId);
                return this.duel.addMessage(this.getName() + "'s Move Cap Achieved!");
            }
            return;
        }

        // more than once?
        var nbActions = this.nbActions;
        if (this.boomerang > 0) nbActions += nbActions;
        if (this.hasSynergy("Valurin Duality") && this.rollLuckPercentLow() <= 5) nbActions += nbActions;
        if (this.fullOfAmmos) {
            nbActions = nbActions*3;
            this.fullOfAmmos = false;
        }
        for (var i=0; i < nbActions-1; i++) {
            var storedMove = {};
            storedMove["user"] = this;
            storedMove["move"] = _move;
            storedMove["target"] = _target;
            this.duel.memoryMoves.unshift(storedMove);
        }

        var willBurst = _target != null && _target.isAlive() && _target.readyToBurst;
        _move.newInstance().execute(this, _target);

        if (_target != null) _target.increaseLuck();

        // burst
        if (willBurst) {
            _target.readyToBurst = false;
            this.duel.addMessage(_target.getName() + " bursts!");
            var l = _target.duel.getOppsOf(_target);
            for (var i in l) {
                l[i].noDex = 2;
            }
            this.duel.memorySoundEffects.push("explosion");
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
        if (this.possessCountdown > 0 && this.possessedBy != null && this.possessedBy.isAlive()) {
            return false;
        }
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
            if (this.duel.barrelWeakening) {
                _value = _value*3;
            }

            if (this.hasStand(2) && this.rollLuckPercentLow() <= 10) { // Titans of Creation
                this.heal(_value, "inner")
                return false;
            }

            if (_value <= 0) {
                this.duel.addMessage(this.getName() + " takes no damage.");
                return false;
            }

            if (this.specialArmorValue > 0) {
                if (_value >= this.specialArmorValue) {
                    _value = _value - this.specialArmorValue
                    this.duel.addMessage(this.getName() + "'s special armor takes " + this.specialArmorValue + " damage and breaks!");
                    this.specialArmorValue = 0;
                    if (_value <= 0) return false;
                }
                else {
                    this.duel.addMessage(this.getName() + "'s special armor takes " + _value + " damage!");
                    this.specialArmorValue -= _value;
                    return false;
                }
            }
            if (this.hasFightingStyle("drunken") && this.rollLuckPercentLow() < 50) {
                this.duel.addMessage(this.getName() + " ignores the pain and takes no damage.");
                return false;
            }

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
            this.duel.addMessage(this.getName() + " takes " + _value + " damage.");

            // money!!
            if (!this.isHero() && ProgressManager.getUnlockedGameMechanics().indexOf("PP Coins") > 0) ProgressManager.setValue("PP_Coins", ProgressManager.getValue("PP_Coins")+1);

            if (this.STR <= 0) { // dies?
                // god of death buff
                var l = this.duel.getAllFighters();
                for (var i in l) {
                    if (l[i].isDead()) continue;
                    if (l[i].godOfDeath) {
                        this.duel.addMessage(l[i].getName() + " savors " + this.getName() + "'s death.");
                        l[i].heal(100);
                    }
                }

                // mech Skull
                if (this.mechSkull) {
                    this.duel.addMessage(this.getName() + "'s mech skull avenges his death.");
                    var l = this.duel.getOppsOf(this);
                    for (var i in l) {
                        if (l[i].isDead()) continue;
                        l[i].damage(_value*3, "attack", this);
                    }
                }

                // really dies?
                if (!this.checkExtraLife()) {
                    if (this.confusion > 0 && this.STR + _value > 0) {
                        this.duel.addMessage("\nConfusion was " + this.getName() + "'s epitaph.");
                    }
                    this.checkNextPhase();
                }
            }
            else { // post hit effects
                if (this.madnessStacks > 0 && this.rollLuckPercentHigh() <= this.madnessStacks) {
                    this.duel.addMessage(this.getName() + " flinched!");
                    this.noDex = 2;
                }
            }
            return true;
        }
        else if (_type == "inner") {
            // Bleed etc
            return this.damage(_value, "auto");
        }
        else if (_type == "attack") {
            // critical hit
            var criticalChance = 5 + _opponent.lifeFibers*5 + this.exposed*25; // %
            if (_opponent.rollLuckPercentLow() <= criticalChance) {
                this.duel.addMessage("Critical Hit!");
                this.increaseLuck();
                _value = _value*2;
            }

            // opponent's effects
            if (_opponent.isInquisitor && _opponent.STR < this.STR) {
                _value += Math.floor(_opponent.STR/10);
            }
            if (_opponent.damageBuildUp > 0 && _value > 0) {
                _value = _value*_opponent.damageBuildUp;
                _opponent.damageBuildUp = 0;
            }
            if (_opponent.backFromDeath > 0 && _value > 0) {
                _value = _value*2;
            }
            if (_opponent.hasFightingStyle("scarred") > 0 && _value > 0 && this.rollLuckPercentLow() <= 10) {
                this.duel.addMessage(_opponent.getName() + "'s PP scar scares " + this.getName() + "!");
                this.noDex = 2;
            }
            if (_opponent.madnessStacks > 0 && _opponent.id != this.id && this.rollLuckPercentLow() <= _opponent.madnessStacks*3) {
                this.duel.addMessage(_opponent.getName() + " hits himself in his madness!");
    			_opponent.duel.getOppOf(this).damage(_value, "attack", _opponent)
    			return false;
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
            if (this.armorValue > 0) {
                if (_value >= this.armorValue) {
                    _value = _value - this.armorValue
                    this.duel.addMessage(this.getName() + "'s armor takes " + this.armorValue + " damages and breaks!");
                    this.armorValue = 0;
                    if (_value <= 0) return false;
                }
                else {
                    this.duel.addMessage(this.getName() + "'s armor takes " + _value + " damages!");
                    this.armorValue -= _value;
                    return false;
                }
            }
        }
        else {
            Logger.warning("Damage type was incorrect: <" + _type + ">.")
        }

        // character protections
        // TODO

        // check reverse damage
        var result = this.damage(_value, "auto");

        // post-attack effects
        if (_type == "attack" && result) {
            if (this.acidCover > 0) {
                this.duel.addMessage(_opponent.getName() + " gets damaged from the acid cover!");
                _opponent.damage(Math.floor(this.STR/10), "inner");
            }

            if (_opponent.hasRelic(4) && _opponent.bleachCountdown <= 0 && result) {
                this.blindness = 2;
                _opponent.bleachCountdown = 6;
                this.duel.addMessage(this.getName() + " gets blinded by " + _opponent.getName() + "'s bleach!");
            }
            if (_opponent.hasFightingStyle("electric") && this.rollLuckPercentHigh() <= 15) {
                this.noDex = 2;
                this.duel.addMessage(_opponent.getName() + " gets shocked by " + _opponent.getName() + "'s PP!");
            }
            if (this.hasStand(3) && this.rollLuckPercentLow() <= 20) { // Metal Resistance
                var storedMove = {};
                storedMove["user"] = this;
                storedMove["move"] = GodManager.getRandomGod("waifu").getRegularAttackAsMove();
                storedMove["target"] = _opponent;
                this.duel.memoryMoves.push(storedMove);
            }
            if (_opponent.hasStand(11)) { // Illud Divinum Insanus
                this.madnessStacks += 1;
            }

            if (this.trappedInStar) {
                var l = this.duel.getAllFighters();
                for (var i in l) {
                    if (l[i].id == this.id) continue;
                    if (l[i].trappedInStar) l[i].damage(_value, "inner");
                }
            }
        }

        return result;
    }

    heal(_value, _type) {
        if (_type == "auto") {
            // DO NOT USE EXTERNALLY

            if (this.quickeningCharges > 0) _value += Math.floor(this.quickeningCharges*_value*0.5);

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
        while (nbTries <= 100) {
            if (this.godsList.indexOf(god) < 0 && god != null) {
                this.godsList.push(god);
                if (god.startFunction != null) god.startFunction(this);
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

    hasRelic(_id) {
        var l = this.relics;
        for (var i in l) {
            if (l[i].id == _id) return true;
        }
        return false;
    }

    increaseLuck(_value = 3) {
        if (DEV_MODE && this.isHero()) _value = 1;
        this.specialLuck += _value;
    }
    decreaseLuck(_value = 3) {
        this.specialLuck -= _value;
        if (this.specialLuck <= 0) this.specialLuck = 0;
    }
    getLuck() {
        var a = this.specialLuck + this.luck;

        if (this.backFromDeath > 0) {
            a += 10;
        }

        return a;
    }
    rollLuckPercentHigh() {
        if (DREAM_LUCK && this.isHero()) return 100;

        var roll = getRandomPercent()+this.getLuck();
        if (roll >= 100) roll = 100;
        this.checkLuck();
        if (roll < 10) this.increaseLuck();
        return roll;
    }
    rollLuckPercentLow() {
        if (DREAM_LUCK && this.isHero()) return 1;

        var roll = getRandomPercent()-this.getLuck();
        if (roll <= 0) roll = 0;
        this.checkLuck();
        if (roll > 90) this.increaseLuck();
        return roll;
    }
    checkLuck(_nbTimes = 20) {
        if (_nbTimes <= 0) return;

        if (getRandomPercent() >= this.specialLuck) this.decreaseLuck(1);
        this.checkLuck(_nbTimes-1);
    }

    updateTextObjects() {
        if (this.spriteObject == null) return;
        if (this.isDead()) {
            this.spriteObject.setTint(9474192);

            this.STRTextObject.setText("DEAD");
            this.DEXTextObject.setText("");
        }
        else {
            this.spriteObject.clearTint();
            this.spriteObject.setText(this.getName());

            var txt = "STR: " + this.STR;
            if (this.armorValue + this.specialArmorValue > 0) txt += " (+" + (this.armorValue + this.specialArmorValue) + ")";
            this.STRTextObject.setText(txt);
            this.DEXTextObject.setText("DEX: " + this.DEX);
        }
    }
    destroyObjects() {
        if (this.spriteObject != null) this.spriteObject.destroy();
        this.spriteObject = null;
        if (this.STRTextObject != null) this.STRTextObject.destroy();
        this.STRTextObject = null;
        if (this.DEXTextObject != null) this.DEXTextObject.destroy();
        this.DEXTextObject = null;

        for (var j in this.statusIconObjects) {
            this.statusIconObjects[j].destroy();
        }
        this.statusIconObjects = [];
    }
    hasGameObj(_obj) {
        for (var i in Fighter.SPECIAL_OBJECTS) {
            if (this[Fighter.SPECIAL_OBJECTS[i]] === _obj) return true;
        }
        return false;
    }

    getDangerLevel() { // used for killer blessing
        return 1;
    }
    isOfInterest() {
        return (this.getDangerLevel() > 1 || this.STR >= 1000 || this.DEX >= 100)
    }
    isHero() {
        return false;
    }
    getHurtSound() {
        if (this.isTree) return "woodcut"
        return "hurtA";
    }
    getCorpseSound() {
        if (this.isTree) return "woodcut"
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
Fighter.SPECIAL_OBJECTS = ["spriteObject", "spriteX", "spriteY", "STRTextObject", "DEXTextObject", "duel", "statusIconObjects"];

// Hero objects
Fighter.SPECIAL_OBJECTS.push("moveFrameObject");
Fighter.SPECIAL_OBJECTS.push("moveFrameText");
