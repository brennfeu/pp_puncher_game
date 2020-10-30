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
            nb += Math.floor((_user.STR+total)/19);
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

class EyeOfTruth extends Move {
    constructor() {
        super();
        this.name = "Eye of Truth";
        this.description = "Triggers the move of your inner worth. Each and everyone has a different effect when using this move.";
        this.autoPass = true;

        this.type = "rare";
    }

    execute(_user, _target = null) {
        _user.duel.addMessage(_user.getName() + " summons the Eye of Truth!");
        if (!_user.isHero()) return _user.duel.addMessage("Looks like " + _user.getName() + "'s inner worth isn't worth that much after all...");
        _user.duel.addMessage(_user.getName() + " uses his signature move!");

        switch(_user.name) {
            case("Brenn"):
                _user.duel.addMessage(_user.getName() + " decides to make a game called PP Puncher!");
                _user.duel.addMessage(_user.getName() + " uses his new knowledge to punch " + _target.getName() + "'s PP!");
                _target.damage(_user.STR, "attack", _user);
                break;
            case("Pudding"):
                _user.duel.addMessage(_user.getName() + "'s true inner worth is too complex for the Eye of Truth to understand!");
                new InterrogationPoint().execute(_user, _target);
                break;
            case("Eldon"):
                _user.duel.addMessage(_user.getName() + " genderbends!");
                _user.genderBender = !_user.genderBender;
                var l = _user.duel.getOppsOf(_user);
                for (var i in l) {
                    l[i].confusion = 2;
                }
                break;
            default:
                _user.duel.addMessage("The Eye of Truth cannot find " + _user.getName() + "'s signature move :(");
                break;
        }
    }
}

const RARE_MOVE_LIST = [ WoodCutting, EyeOfTruth ];
