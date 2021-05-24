class Achievement {
    constructor(_data, _id) {
        this.id = _id;

        this.name = _data.name;
        this.description = _data.description;
        this.steamName = _data.steamName;
        this.isHidden = _data.isHidden;
        if (this.isHidden == undefined) this.isHidden = false;
    }

    getName() {
        var txt = "";
        if (this.isCompleted()) txt += "✓ ";
        else txt += "✕ ";
        txt += this.name;
        return txt;
    }
    getDescription() {
        var txt = this.getName() + "\n\n";

        if (this.isHidden && !this.isCompleted()) {
            txt += "???";
        }
        else {
            txt += this.description;
        }

        return txt;
    }

    isCompleted() {
        return ProgressManager.getValue("Achievements")[this.id];
    }
}

class AchievementManager {
    static addAchievement(_area) {
        AchievementManager.ACHIEVEMENT_LIST.push(_area);
    }
    static getAchievement(_id) {
        for (var i in AchievementManager.ACHIEVEMENT_LIST) if (AchievementManager.ACHIEVEMENT_LIST[i].id == _id) return AchievementManager.ACHIEVEMENT_LIST[i];
        return null;
    }

    static unlockAchievement(_id) {
        if (_id == undefined) return false;

        var l = ProgressManager.getValue("Achievements");
        l[_id] = true;
        ProgressManager.setValue("Achievements", l);

        // steam
        try {
            GREENWORKS.activateAchievement(AchievementManager.getAchievement(_id).steamName, function(){}, function(){});
        }
        catch(e) {
            Logger.warning("Error Trying to Unlock an Achievement", e)
        }
    }
    static resetAchievements() {
        ProgressManager.setValue("Achievements", []);
        for (var i in AchievementManager.ACHIEVEMENT_LIST) {
            GREENWORKS.clearAchievement(AchievementManager.ACHIEVEMENT_LIST[i].steamName, function() {}, function(e) {});
        }
    }

    static steamUpdate() {
        if (GREENWORKS == null) return false;

        var l = AchievementManager.ACHIEVEMENT_LIST;
        for (var i in l) { // update from steam
            var f = Function("_bool", "if (_bool) { AchievementManager.unlockAchievement(" + l[i].id + "); }");
            GREENWORKS.getAchievement(l[i].steamName, f);
        }
    }

    static init() {
        var l = ProgressManager.getValue("Achievements");
        if (l == undefined) l = [];

        for (var i in AchievementManager.ACHIEVEMENT_LIST) {
            if (i >= l.length) {
                l[i] = false;
            }

            // update steam
            if (l[i]) {
                AchievementManager.unlockAchievement(i);
            }
        }

        ProgressManager.setValue("Achievements", l);
        AchievementManager.steamUpdate();
    }
    static loadList(_list) {
        for (var i in _list) {
            AchievementManager.addAchievement(new Achievement(_list[i], i));
        }
    }
}
AchievementManager.ACHIEVEMENT_LIST = [];
