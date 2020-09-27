class Quest {
    constructor(_data, _id) {
        this.id = parseInt(_id);

        this.name = _data.name;
        this.description = _data.description;
        this.isMain = _data.isMain;
        this.areaId = _data.areaId;

        this.questSteps = [];
        for (var i in _data.questSteps) {
            this.questSteps.push(new QuestSteps(_data.questSteps[i], i))
        }

        this.ignoreMe = _data.ignoreMe;
        if (this.ignoreMe == undefined) this.ignoreMe = false;
    }

    getName() {
        var txt = this.name;
        if (this.isMain && !this.isCompleted()) txt += " (!)";
        return txt;
    }
    getDescription() {
        var txt = this.name + "\n\n" + this.description;

        txt += "\n\nCompleted : ";
        txt += ProgressManager.getCompletedSteps(this.id).length + "/";
        if (this.isCompleted()) {
            txt += this.questSteps.length;
        }
        else {
            txt += "?";
        }

        return txt;
    }
    isCompleted() {
        if (this.questSteps.length == 0) return true;
        return ProgressManager.isStepCompleted(this.id, this.questSteps.length-1);
    }

    getArcadeModeSteps() {
        var l = [];
        for (var i in this.questSteps) {
            var step = this.questSteps[i];
            l.push(step);
            if (step.unlockQuests != undefined) {
                for (var j in step.unlockQuests) {
                    var q = QuestManager.getQuest(step.unlockQuests[j]);
                    if (q.areaId == this.areaId && q.id != 12) l = l.concat(q.getArcadeModeSteps());
                }
            }
        }
        return l;
    }

    getStep(_id) {
        return this.questSteps[_id];
    }
}
class QuestSteps {
    constructor(_data, _id) {
        this.id = parseInt(_id);

        this.name = _data.name;
        this.description = _data.description;
        this.encounter = _data.encounter;
        this.duelParam = _data.duelParam;
        if (this.duelParam == undefined) this.duelParam = {};

        this.preFightDialogue = _data.preFightDialogue;
        this.postFightDialogue = _data.postFightDialogue;
        this.inFightDialogue = _data.inFightDialogue;
        this.postFightCutscene = _data.postFightCutscene;

        this.unlockGameMechanics = _data.unlockGameMechanics;
        this.unlockAreas = _data.unlockAreas;
        this.unlockQuests = _data.unlockQuests;
        this.unlockQuestSteps = _data.unlockQuestSteps; // 1 quest step = [questID, stepID]
        this.unlockPartyMembers = _data.unlockPartyMembers;
        this.unlockMoves = _data.unlockMoves;
        this.unlockFightingStyles = _data.unlockFightingStyles;
        this.unlockEvents = _data.unlockEvents;

        this.saveWaifu = _data.saveWaifu;

        this.unlockNextStep = _data.unlockNextStep;
        if (this.unlockNextStep == undefined) this.unlockNextStep = true;
    }

    getName() {
        var txt = this.name;
        return txt;
    }
    getDescription() {
        var txt = this.name + "\n\n" + this.description;
        return txt;
    }
}

class QuestManager {
    static addQuest(_area) {
        QuestManager.QUEST_LIST.push(_area);
    }
    static getQuest(_id) {
        return QuestManager.QUEST_LIST[_id];
    }
    static getStep(_idQ, _idS) {
        return QuestManager.getQuest(_idQ).getStep(_idS);
    }

    static loadList(_list) {
        for (var i in _list) {
            QuestManager.addQuest(new Quest(_list[i], i));
        }
    }

    static getQuestsFromArea(_areaId) {
        var l = [];
        for (var i in this.QUEST_LIST) {
            if (this.QUEST_LIST[i].areaId == _areaId && !this.QUEST_LIST[i].ignoreMe) {
                l.push(this.QUEST_LIST[i]);
            }
        }
        return l;
    }
    static getQuestOfArea(_areaId, _id) {
        return QuestManager.getQuestsFromArea(_areaId)[_id]
    }
    static hasMainQuest(_areaId) {
        var l = ProgressManager.getUnlockedQuests();
        for (var i in l) {
            if (l[i].areaId == _areaId && l[i].isMain && !l[i].isCompleted()) {
                return true;
            }
        }
        return false;
    }
}
QuestManager.QUEST_LIST = [];
