class ProgressManager {
    static isStepCompleted(_questId, _stepId) {
        var l = ProgressManager.SAVE_FILES["completedSteps"];
        for (var i in l) {
            if (l[i][0] + "/" + l[i][1] == _questId + "/" + _stepId) return true;
        }
        return false;
    }
    static unlockStep(_questId, _stepId) {
        if (ProgressManager.isStepCompleted(_questId, _stepId)) return;

        ProgressManager.resetCache();
        ProgressManager.SAVE_FILES["completedSteps"].push([_questId, _stepId]);
        ProgressManager.updateLocalStorage();
    }
    static lockStep(_questId, _stepId) {
        if (!ProgressManager.isStepCompleted(_questId, _stepId)) return;

        ProgressManager.resetCache();
        var l = ProgressManager.SAVE_FILES["completedSteps"];
        var newL = [];
        for (var i in l) {
            if (l[i][0] + "/" + l[i][1] == _questId + "/" + _stepId) {
                ProgressManager.SAVE_FILES["completedSteps"].splice(i, 1);
                ProgressManager.updateLocalStorage();
                return;
            }
        }
    }

    static getCompletedSteps(_questId = null) {
        if (ProgressManager.CompletedStepsCache != null && _questId == null) return ProgressManager.CompletedStepsCache;

        var l = [];
        var steps = ProgressManager.SAVE_FILES["completedSteps"];
        for (var i in steps) {
            if (_questId != null && _questId != QuestManager.getQuest(steps[i][0]).id) continue;
            l.push(QuestManager.getStep(steps[i][0], steps[i][1]));
        }
        if (_questId == null) ProgressManager.CompletedStepsCache = l;
        return l;
    }

    static getUnlockedAreas() {
        if (ProgressManager.AreasCache != null) return ProgressManager.AreasCache;

        var l = [];
        var steps = ProgressManager.getCompletedSteps();
        for (var i in steps) {
            if (steps[i].unlockAreas != undefined) {
                var areas = steps[i].unlockAreas;
                for (var j in areas) {
                    l = l.concat(AreaManager.getArea(areas[j]));
                }
            }
        }
        ProgressManager.AreasCache = l;
        return l;
    }
    static getUnlockedGameMechanics() {
        if (ProgressManager.GameMechanicsCache != null) return ProgressManager.GameMechanicsCache;

        var l = [];
        var steps = ProgressManager.getCompletedSteps();
        for (var i in steps) {
            if (steps[i].unlockGameMechanics != undefined) {
                var gm = steps[i].unlockGameMechanics;
                for (var j in gm) {
                    l = l.concat(gm[j]);
                }
            }
        }
        ProgressManager.GameMechanicsCache = l;
        return l;
    }
    static getUnlockedQuests(_areaId = null) {
        if (ProgressManager.QuestsCache != null && _areaId == null) return ProgressManager.QuestsCache;

        var l = [];
        var steps = ProgressManager.getCompletedSteps();
        for (var i in steps) {
            if (steps[i].unlockQuests != undefined) {
                var quests = steps[i].unlockQuests;
                for (var j in quests) {
                    var q = QuestManager.getQuest(quests[j]);
                    if (q.ignoreMe) continue;

                    if (_areaId != null && _areaId != q.areaId) continue;
                    l.push(q);
                }
            }
        }
        l = l.sort(
            function (a, b) {
                var ta = a.isMain
                var tb = b.isMain
                if (ta && !tb) return -1;
                else if (!ta && tb) return 1;

                var ia = a.isImportant
                var ib = b.isImportant
                if (ia && !ib) return -1;
                else if (!ia && ib) return 1;

                var na = a.name
                var nb = b.name
                if (na < nb) return -1;
                else if (na > nb) return 1;
                return 0;
            }
        );
        if (_areaId == null) ProgressManager.QuestsCache = l;
        return l;
    }
    static getUnlockedSteps(_questId = null) {
        if (ProgressManager.StepsCache != null && _questId == null) return ProgressManager.StepsCache;

        var l = [];
        var unlocks = [];
        var nextSteps = [];
        var final = [];
        l = l.concat(ProgressManager.SAVE_FILES["completedSteps"]);

        for (var i in l) {
            var s = QuestManager.getStep(l[i][0], l[i][1]);

            if (s.unlockQuestSteps != undefined) {
                var steps = s.unlockQuestSteps;
                for (var j in steps) {
                    if (steps[j][1] > 0 && !ProgressManager.isStepCompleted(steps[j][0], steps[j][1]-1)) continue;
                    unlocks.push([steps[j][0], steps[j][1]]);
                }
            }

            if (s.unlockQuests != undefined) {
                var quests = s.unlockQuests;
                for (var j in quests) {
                    unlocks.push([quests[j], 0]);
                }
            }

            if (s.unlockNextStep && QuestManager.getQuest(l[i][0]).questSteps.length > l[i][1]+1) {
                nextSteps.push([l[i][0], l[i][1]+1]);
            }
        }
        l = l.concat(unlocks).concat(nextSteps);

        var strL = [];
        for (var i in l) {
            strL.push(l[i].join("/"));
        }
        l = [];
        for (var i in strL) {
            if (strL.indexOf(strL[i]) != i) continue; // no duplicates
            l.push(strL[i].split("/"))
        }

        for (var i in l) {
            if (_questId != null && _questId != QuestManager.getQuest(l[i][0]).id) continue;

            final.push(QuestManager.getStep(l[i][0], l[i][1]));
        }
        if (_questId == null) ProgressManager.StepsCache = final;
        return final;
    }
    static getUnlockedPartyMembers() {
        if (ProgressManager.PartyMembersCache != null) return ProgressManager.PartyMembersCache;

        var l = [];
        var steps = ProgressManager.getCompletedSteps();
        for (var i in steps) {
            if (steps[i].unlockPartyMembers != undefined) {
                var pm = steps[i].unlockPartyMembers;
                for (var j in pm) {
                    l = l.concat(PartyManager.getPartyMemberByName(pm[j]));
                }
            }
        }
        ProgressManager.PartyMembersCache = l;
        return l;
    }
    static getUnlockedMoves() {
        if (ProgressManager.MovesCache != null) return ProgressManager.MovesCache;

        var l = [];
        var steps = ProgressManager.getCompletedSteps();
        for (var i in steps) {
            if (steps[i].unlockMoves != undefined) {
                var moves = steps[i].unlockMoves;
                for (var j in moves) {
                    l = l.concat(moves[j]);
                }
            }
        }
        if (DEV_MODE) {
            for (var i in OTHER_MOVE_LIST) {
                var move = OTHER_MOVE_LIST[i];
                if (move.newInstance().type == "Dev Test") l.push(move)
            }
        }
        l = l.sort(
            function (a, b) {
                var l = ["regular", "infernal", "armageddon", "faith", "stand", "rare", "relic", "other", "Dev Test"];
                var ta = l.indexOf(a.newInstance().type);
                var tb = l.indexOf(b.newInstance().type);
                if (ta < tb) return -1;
                else if (ta > tb) return 1;

                var na = a.newInstance().name.toUpperCase();
                var nb = b.newInstance().name.toUpperCase();
                if (na < nb) return -1;
                else if (na > nb) return 1;
                return 0;
            }
        );
        ProgressManager.MovesCache = l;
        return l;
    }
    static getUnlockedFightingStyles() {
        if (ProgressManager.FightingStylesCache != null) return ProgressManager.FightingStylesCache;

        var l = [];
        var steps = ProgressManager.getCompletedSteps();
        for (var i in steps) {
            if (steps[i].unlockFightingStyles != undefined) {
                var fs = steps[i].unlockFightingStyles;
                for (var j in fs) {
                    l.push(fs[j]);
                }
            }
        }

        l = l.sort(
            function (a, b) {
                var na = a.toUpperCase();
                var nb = b.toUpperCase();
                if (na < nb) return -1;
                else if (na > nb) return 1;
                return 0;
            }
        );
        ProgressManager.FightingStylesCache = l;
        return l;
    }
    static getUnlockedEvents() {
        if (ProgressManager.EventsCache != null) return ProgressManager.EventsCache;

        var l = [];
        var steps = ProgressManager.getCompletedSteps();
        for (var i in steps) {
            if (steps[i].unlockEvents != undefined) {
                var e = steps[i].unlockEvents;
                for (var j in e) {
                    l.push(e[j]);
                }
            }
        }
        l = l.sort(
            function (a, b) {
                var sa = EventManager.getEvent(a).onlyStart;
                var sb = EventManager.getEvent(b).onlyStart;
                if (sa && !sb) return -1;
                else if (sb && !sa) return 1;

                var na = EventManager.getEvent(a).name.toUpperCase();
                var nb = EventManager.getEvent(b).name.toUpperCase();
                if (na < nb) return -1;
                else if (na > nb) return 1;
                return 0;
            }
        );
        ProgressManager.EventsCache = l;
        return l;
    }
    static getUnlockedGods() {
        if (ProgressManager.GodsCache != null) return ProgressManager.GodsCache;

        var l = [];
        var steps = ProgressManager.getCompletedSteps();
        for (var i in steps) {
            if (steps[i].unlockGods != undefined) {
                var god = steps[i].unlockGods;
                for (var j in god) {
                    l.push(GodManager.getGod(god[j]));
                }
            }
        }

        // waifus
        if (ProgressManager.isStepCompleted(21, 1)) {
            var waifus = ProgressManager.getSavedWaifus();
            for (var i in waifus) {
                l.push(GodManager.getGod(waifus[i]));
            }
        }

        l = l.sort(
            function (a, b) {
                var l = ["regular", "waifu", "eldritch"];
                var ta = l.indexOf(a.type);
                var tb = l.indexOf(b.type);
                if (ta < tb) return -1;
                else if (ta > tb) return 1;

                var na = a.name.toUpperCase();
                var nb = b.name.toUpperCase();
                if (na < nb) return -1;
                else if (na > nb) return 1;
                return 0;
            }
        );
        ProgressManager.GodsCache = l;
        return l;
    }
    static getUnlockedArtworks() {
        if (ProgressManager.ArtworksCache != null) return ProgressManager.ArtworksCache;

        var l = [];
        var steps = ProgressManager.getCompletedSteps();
        for (var i in steps) {
            if (steps[i].unlockArtworks != undefined) {
                var artworks = steps[i].unlockArtworks;
                for (var j in artworks) {
                    l.push(ArtworkManager.getArtwork(artworks[j]));
                }
            }
        }

        l = l.sort(
            function (a, b) {
                var na = a.id;
                var nb = b.id;
                if (na < nb) return -1;
                else if (na > nb) return 1;
                return 0;
            }
        );
        ProgressManager.ArtworksCache = l;
        return l;
    }
    static getUnlockedRelics() {
        if (ProgressManager.RelicsCache != null) return ProgressManager.RelicsCache;

        var l = [];
        var steps = ProgressManager.getCompletedSteps();
        for (var i in steps) {
            if (steps[i].unlockRelics != undefined) {
                var artworks = steps[i].unlockRelics;
                for (var j in artworks) {
                    l.push(RelicManager.getRelic(artworks[j]));
                }
            }
        }

        l = l.sort(
            function (a, b) {
                // TODO update with other members
                var l = ["Brenn", "Pudding", "Eldon", "Valurin", "Country Music Brenn", "Otasan"];
                var ta = l.indexOf(a.wielder.name);
                var tb = l.indexOf(b.wielder.name);
                if (ta < tb) return -1;
                else if (ta > tb) return 1;

                var na = a.name;
                var nb = b.name;
                if (na < nb) return -1;
                else if (na > nb) return 1;
                return 0;
            }
        );
        ProgressManager.RelicsCache = l;
        return l;
    }
    static getUnlockedStands() {
        if (ProgressManager.StandsCache != null) return ProgressManager.StandsCache;
        if (ProgressManager.getUnlockedGameMechanics().indexOf("Stands") < 0) return [];

        var l = [];
        var moves = ProgressManager.getUnlockedMoves();
        for (var i in StandManager.STAND_LIST) {
            var moveMissing = StandManager.STAND_LIST[i].summonMoves.length == 0;

            for (var j in StandManager.STAND_LIST[i].summonMoves) {
                if (moves.indexOf(StandManager.STAND_LIST[i].summonMoves[j]) < 0) {
                    moveMissing = true;
                }
            }

            if (!moveMissing) {
                l.push(StandManager.STAND_LIST[i]);
            }
        }

        l = l.sort(
            function (a, b) {
                var na = a.name.toUpperCase();
                var nb = b.name.toUpperCase();
                if (na < nb) return -1;
                else if (na > nb) return 1;
                return 0;
            }
        );
        ProgressManager.StandsCache = l;
        return l;
    }

    static getSavedWaifus(_onlyBonusWaifus = false) {
        if (ProgressManager.SavedWaifusCache != null && !_onlyBonusWaifus) return ProgressManager.SavedWaifusCache;

        var l = [];
        var steps = ProgressManager.getCompletedSteps();
        for (var i in steps) {
            if (_onlyBonusWaifus && steps[i].parentQuest.isMain) continue;
            if (steps[i].saveWaifu == undefined) continue;

            l.push(steps[i].saveWaifu);
        }
        if (!_onlyBonusWaifus) ProgressManager.SavedWaifusCache = l;
        return l;
    }

    static resetCache() {
        ProgressManager.CompletedStepsCache = null;
        ProgressManager.StepsCache = null;
        ProgressManager.QuestsCache = null;
        ProgressManager.AreasCache = null;
        ProgressManager.GameMechanicsCache = null;
        ProgressManager.PartyMembersCache = null;
        ProgressManager.MovesCache = null;
        ProgressManager.FightingStylesCache = null;
        ProgressManager.EventsCache = null;
        ProgressManager.GodsCache = null;
        ProgressManager.ArtworksCache = null;
        ProgressManager.RelicsCache = null;
        ProgressManager.StandsCache = null;

        ProgressManager.SavedWaifusCache = null;
    }

    static getTotalNbOfUnlocks() {
        // should be the amount of things displayed by the bible
        var nb = 0;
        nb += ProgressManager.getUnlockedGameMechanics().length;
        nb += ProgressManager.getUnlockedMoves().length;
        nb += ProgressManager.getUnlockedPartyMembers().length;
        nb += ProgressManager.getUnlockedFightingStyles().length;
        nb += ProgressManager.getUnlockedEvents().length;
        nb += ProgressManager.getUnlockedGods().length;
        nb += ProgressManager.getUnlockedSynergies().length;
        nb += ProgressManager.getUnlockedRelics().length;
        return nb;
    }
    static canAddNewMovePref() {
        return Math.floor(ProgressManager.getTotalNbOfUnlocks()/10) >  ProgressManager.SAVE_FILES["movePreferences"].length;
    }
    static getPercentageCompletion() {
        var l = QuestManager.QUEST_LIST;
        var total = 0;
        var unlocked = 0;

        for (var i in l) {
            if (l[i].areaId == -1) continue;
            for (var j in l[i].questSteps) {
                total += 1;
                if (ProgressManager.isStepCompleted(l[i].id, j)) unlocked += 1;
            }
        }

        return Math.floor(unlocked/total*100);
    }

    static getMovesLikely() {
        var l = [];
        for (var i in ProgressManager.SAVE_FILES["movePreferences"]) {
            if (ProgressManager.SAVE_FILES["movePreferences"][i][1] == 1) {
                l.push(ProgressManager.SAVE_FILES["movePreferences"][i][0]);
            }
        }
        return l;
    }
    static getMovesUnlikely() {
        var l = [];
        for (var i in ProgressManager.SAVE_FILES["movePreferences"]) {
            if (ProgressManager.SAVE_FILES["movePreferences"][i][1] == -1) {
                l.push(ProgressManager.SAVE_FILES["movePreferences"][i][0]);
            }
        }
        return l;
    }

    static getNbGodSlots() {
        var nb = 0;
        if (ProgressManager.getUnlockedGameMechanics().indexOf("Gods") > -1) nb += 1;
        if (ProgressManager.isStepCompleted(22, 1)) nb += 1;
        if (ProgressManager.isStepCompleted(22, 3)) nb += 1;
        return nb;
    }
    static getUnlockedSynergies() {
        if (this.getUnlockedGameMechanics().indexOf("Synergies") < 0) return [];
        var l = [];
        var unlockedTypes = [];
        for (var i in ProgressManager.getUnlockedGods()) {
            unlockedTypes.push(ProgressManager.getUnlockedGods()[i].type);
        }
        for (var i in GodManager.SYNERGY_LIST) {
            var isUnlocked = true;
            for (var j in GodManager.SYNERGY_LIST[i].requiredGods) {
                if (ProgressManager.getUnlockedGods().indexOf(GodManager.SYNERGY_LIST[i].requiredGods[j]) < 0 &&
                  unlockedTypes.indexOf(GodManager.SYNERGY_LIST[i].requiredGods[j]) < 0) {
                    isUnlocked = false;
                }
            }
            if (isUnlocked) {
                l.push(GodManager.SYNERGY_LIST[i]);
            }
        }
        return l;
    }

    static getMechanicDescription(_mec) {
        switch(_mec) {
            case "Game Mechanics":
                return "Well, isn't learning new game mechanics, a game mechanic itself?"
            case "Party Members":
                return "Going on an adventure is better with friends. You can have up to 4 party members at the same time.\n\nAny party member unlocked after that will only be available when a party member on the front has been killed.";
            case "Moves":
                return "Each turn, you can use one of 5 moves. Those 5 moves are chosen randomly between all of your known moves.\n\nMoves that aren't against a specific target test their DEX against the average DEX of your opponents. Missing a move grants 5 temporary bonus DEX."
            case "Move Preferences":
                return "Once you unlock 25 things in your PP Bible, you can select up to <nb_of_unlocked_items>/10 moves that you want to appear either more, or less often.\n\nTo do so, open the bible, and select the move you want to appear more. Select it again for it to appear less often. Select it again to reset."
            case "Cheating":
                return "When selecting a move, you can open the bible and select the move you want. PP Arbitrator doesn't always notices this, but when he does, he makes sure you get a penalty (-20 DEX and -10 STR).";
            case "Fighting Styles":
                return "Fighting styles are permanent effects you can obtain in battle or start with. Equipping one grants a starting advantage, but getting one in battle grants a +10 DEX bonus on top of the fighting styles' effects.\n\nYou can have as many as you wants.\nYou can equip the fighting styles in the world map, in the 'PARTY' tab.";
            case "Events":
                return "Events have a random chance to occur every turn, and unleash their randomness. Some of them cannot appear before a specific amount of moves have been played.";
            case "Gods":
                return "Divine creatures that managed to ascend and keep their divine status for a long period of time, Gods are so powerful they transcend space and time. You can worship them, in exchange for powers they grant to you.\n\nYou can select which god to worship in the world map, in the 'PARTY' tab."
            case "Synergies":
                return "Some Gods work pretty well when combined with each other. If all the required Gods of a synergy are worshipped by someone, that person will immediately get the effect of the synergy."
            case "Multiplayer":
                return "Play Online Multiplayer with Strangers! Puts your current team against the one of a stranger or a friend! Be careful, as they may have more unlocks than you do!\n\nMultiplayer can be accessed in the Anime Convention, or using the Bible > Game Mechanics > Multiplayer."
            case "Alternative Talks":
                return "PP Arbitrator's way of talking can be altered by different means. This will affect every text shown on screen (as every text on screen is reported by PP Arbitrator)."
            case "Relics":
                return "Powerful items that grants unique powers to their wielder. Wielders do not choose relics, but relics choose their wielder, so you can't force someone to use a relic, as the relic just won't work."
            case "PP Coins":
                var price = "Shop is empty, you bought everything!";
                try { price = "Next Item Price: " + QuestManager.getStep(34, ProgressManager.getCompletedSteps(34).length).ppCoinsPrice } catch(e) {}
                return "Another random cryptocurrency, except the amount automatically increments whenever an opponent takes damage. Buying stuff is automatic, you don't have to worry about going to the shop and select an item to buy it.\n\nAmount of PP Coins: " + ProgressManager.getValue("PP_Coins") + "\n" + price;
            case "Stands":
                return "Spirits of PP Punching you can manifest by using specific move combos. Once summoned, they grant you a specific power as well as new available moves in your movepool. You don't have to successfully use the move, missing also counts for the combo.";
        }
        return "No Description :("
    }

    static getCurrentVersion() {
        var currentVersion = ProgressManager.getValue("version");
        if (currentVersion == undefined) {
            return "Beta 1.0.10";
        }
        return currentVersion;
    }
    static updateCurrentVersion() {
        ProgressManager.setValue("version", GAME_VERSION);
    }

    static getValue(_valueName) {
        if (ProgressManager.SAVE_FILES["otherValues"] == undefined) ProgressManager.SAVE_FILES["otherValues"] = {};
        return ProgressManager.SAVE_FILES["otherValues"][_valueName];
    }
    static setValue(_valueName, _value) {
        ProgressManager.SAVE_FILES["otherValues"][_valueName] = _value;
        ProgressManager.updateLocalStorage();
    }

    static updateLocalStorage() {
        localStorage.setItem("savefile", JSON.stringify(ProgressManager.SAVE_FILES));
    }
    static loadLocalStorage() {
        ProgressManager.SAVE_FILES = JSON.parse(localStorage.getItem("savefile"));
        if (ProgressManager.SAVE_FILES != null && ProgressManager.SAVE_FILES["movePreferences"] == undefined) {
            ProgressManager.SAVE_FILES["movePreferences"] = [];
        }
    }
}

ProgressManager.loadLocalStorage();
if (ProgressManager.SAVE_FILES == null) {
    console.log("Savefile Initialisation");
    ProgressManager.SAVE_FILES = {
        "completedSteps": [],
        "movePreferences": [],
        "otherValues": {}
    };
    ProgressManager.updateLocalStorage();
}
ProgressManager.resetCache();
