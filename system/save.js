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
                var l = ["regular", "infernal", "armageddon", "faith", "stand", "rare", "other", "Dev Test"];
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

    static getSavedWaifus() {
        if (ProgressManager.SavedWaifusCache != null) return ProgressManager.SavedWaifusCache;

        var l = [];
        var steps = ProgressManager.getCompletedSteps();
        for (var i in steps) {
            if (steps[i].saveWaifu != undefined) {
                l.push(steps[i].saveWaifu);
            }
        }
        ProgressManager.SavedWaifusCache = l;
        return l;
    }
    // TODO moves, fs, etc...

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
        return nb;
    }
    static canAddNewMovePref() {
        return Math.floor(ProgressManager.getTotalNbOfUnlocks()/10) >  ProgressManager.SAVE_FILES["movePreferences"].length;
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
                return "Fighting styles are permanent effects you can obtain in battle or start with. Equipping one grants a starting advantage, but getting one in battle grants a +10 DEX bonus.\n\nYou can have as many as you wants.\nYou can equip the fighting styles in the world map, in the 'PARTY' tab.";
            case "Events":
                return "Events have a random chance to occur every turn, and unleash their randomness. Some of them cannot appear before a specific amount of moves have been played.";
            case "Gods":
                return "Divine creatures that managed to ascend and keep their divine status for a long period of time, Gods are so powerful they transcend space and time. You can worship them, in exchange for powers they grant to you.\n\nYou can select which god to worship in the world map, in the 'PARTY' tab."
            case "Synergies":
                return "Some Gods work pretty well when combined with each other. If all the required Gods of a synergy are worshipped by someone, that person will immediately get the effect of the synergy."
        }
        return "No Description :("
    }

    static updateLocalStorage() {
        localStorage.setItem("savefile", JSON.stringify(ProgressManager.SAVE_FILES));
    }
    static loadLocalStorage() {
        ProgressManager.SAVE_FILES = JSON.parse(localStorage.getItem("savefile"));
    }
}

ProgressManager.loadLocalStorage();
if (ProgressManager.SAVE_FILES == null) {
    console.log("Savefile Initialisation");
    ProgressManager.SAVE_FILES = {
        "completedSteps": [],
        "movePreferences": []
    };
    ProgressManager.updateLocalStorage();
}
ProgressManager.resetCache();
