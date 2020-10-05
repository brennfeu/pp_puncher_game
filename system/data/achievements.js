class Achievement {
    constructor(_data, _id) {
        this.id = _id;

        this.name = _data.name;
        this.description = _data.description;
        this.steamName = _data.steamName;
    }
}

class AchievementManager {
    static addAchievement(_area) {
        AchievementManager.ACHIEVEMENT_LIST.push(_area);
    }
    static getAchievement(_id) {
        return AchievementManager.ACHIEVEMENT_LIST[_id];
    }

    static unlockAchievement(_id) {
        try {
            GREENWORKS.activateAchievement(AchievementManager.getAchievement(_id).steamName, function(){}, function(){});
        }
        catch(e) {
            console.log("Error Trying to Unlock an Achievement");
            console.log(e)
        }
    }

    static loadList(_list) {
        for (var i in _list) {
            AchievementManager.addAchievement(new Achievement(_list[i], i));
        }
    }
}
AchievementManager.ACHIEVEMENT_LIST = [];
