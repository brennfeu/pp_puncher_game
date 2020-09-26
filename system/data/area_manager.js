class Area {
    constructor(_data, _id) {
        this.id = _id;

        this.name = _data.name;
        this.description = _data.description;
    }

    getAreaTheme() {
        return this.getTheme("area");
    }
    getBattleTheme() {
        return this.getTheme("battle");
    }
    getBossTheme() {
        return this.getTheme("boss");
    }
    getVictoryTheme() {
        return this.getTheme("victory");
    }
    getTheme(_type) {
        return this.name.split(" ").join("") + "_" + _type;
    }

    getName() {
        var txt = this.name;
        if (QuestManager.hasMainQuest(this.id)) txt += "(!)";
        return txt;
    }
    getDescription() {
        var txt = this.name + "\n\n" + this.description + "\n\nQuests:\n";

        var l = ProgressManager.getUnlockedQuests();
        for (var i in l) {
            if (l[i].areaId != this.id) continue;
            txt += " - " + l[i].getName() + "  ";
            txt += ProgressManager.getCompletedSteps(l[i].id).length + "/";
            if (l[i].isCompleted()) {
                txt += l[i].questSteps.length;
            }
            else {
                txt += "?";
            }
            txt += "\n"
        }

        return txt;
    }
    isCompleted() {
        var l = QuestManager.getQuestsFromArea(this.id);
        for (var i in l) {
            if (!l[i].isCompleted()) return false;
        }
        return true;
    }
}

class AreaManager {
    static addArea(_area) {
        AreaManager.AREA_LIST.push(_area);
    }
    static getArea(_id) {
        return AreaManager.AREA_LIST[_id];
    }

    static loadList(_list) {
        for (var i in _list) {
            AreaManager.addArea(new Area(_list[i], i));
        }
    }
}
AreaManager.AREA_LIST = [];
