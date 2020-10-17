class WoodCutting extends Move {
    constructor() {
        super();
        this.name = "Gather Wood";
        this.autoPass = true;
        this.description = "Gives you lumberjack experience. You can't call yourself a lumberjack before 1 000 000 000 wood things gathered.\n\nCurrent Wood Counter: ";
        this.needsTarget = false;

        this.type = "rare";

        try {
            var nbWood = GREENWORKS.getStatInt("WOOD");
            this.description += nbWood;
        }
        catch(e) {
            this.description += "\n\nUnknown :("
        }
    }

    execute(_user, _target = null) {
        try {
            var nb = Math.floor(getRandomPercent()/10)+1;
            var total = GREENWORKS.getStatInt("WOOD");
            GREENWORKS.setStat("WOOD", total + nb);
            GREENWORKS.storeStats(function(_idk) { if(GREENWORKS.getStatInt("WOOD") > 1000000000) { AchievementManager.unlockAchievement(5); } }, function(_err) {});
            _user.duel.addMessage(_user.getName() + " gets " + nb + " wood.");
        }
        catch(e) {
            _user.duel.addMessage(_user.getName() + " fails to find a good wood source. It might be because you aren't connected to steam?");
            console.log(e);
        }
    }
}

const RARE_MOVE_LIST = [ WoodCutting ];
