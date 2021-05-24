class God {
    constructor(_name, _description, _type, _normalMoveFunction, _specialMoveFunction, _startFunction = null) {
        this.name = _name;
        this.description = _description;
        this.type = _type;
        this.normalMove = _normalMoveFunction;
        this.specialMove = _specialMoveFunction;
        this.startFunction = _startFunction;
    }

    getDescription() {
        var txt = this.description[0];
        txt += "\nType: " + this.type.charAt(0).toUpperCase() + this.type.slice(1);

        txt += "\n\n\nRegular Move: " + this.description[1];
        txt += "\n\nSpecial Move: " + this.description[2];
        if (this.startFunction != null) txt += "\n\nTrigger Move: " + this.description[3];

        return txt;
    }

    getRegularAttackAsMove(_showGodMessage = true) {
        var move = MoveManager.createMove(function(_user, _target = null, _godName = this.__proto__.constructor.godName, _showGodMessage = this.__proto__.constructor.showGodMessage) {
            var g = GodManager.getGod(_godName);
            if (_showGodMessage) _user.duel.addMessage(g.name + " answers his calls!");
            g.normalMove(_user, _target);
        });
        move.godName = this;
        move.showGodMessage = _showGodMessage;

        return move;
    }
    getSpecialAttackAsMove() {
        var move = MoveManager.createMove(function(_user, _target = null, _godName = this.__proto__.constructor.godName) {
            var g = GodManager.getGod(_godName);
            _user.duel.addMessage(g.name + " answers his calls!");
            g.specialMove(_user, _target);
        });
        move.godName = this;

        return move;
    }
}
class RegularGod extends God {
    constructor(_name, _description, _normalMoveFunction, _specialMoveFunction) {
        super(_name, _description, "regular", _normalMoveFunction, _specialMoveFunction);
    }
}
class Waifu extends God {
    constructor(_name, _description, _normalMoveFunction, _specialMoveFunction) {
        super(_name, _description, "waifu", _normalMoveFunction, _specialMoveFunction);
    }
}
class EldritchGod extends God {
    constructor(_name, _description, _normalMoveFunction, _specialMoveFunction, _startFunction) {
        super(_name, _description, "eldritch", _normalMoveFunction, _specialMoveFunction, _startFunction);
    }
}

class Synergy {
    constructor(_name, _gods, _description) {
        // also has id defined in GodManager.addSynergy(_synergyObj)
        this.name = _name;
        this.requiredGods = _gods;
        this.description = _description;
    }

    getDescription() {
        var txt = this.name + "\n\n";

        for (var i in this.requiredGods) {
            if (this.requiredGods[i] == "regular") txt += " - Any Regular God\n";
            else if (this.requiredGods[i] == "waifu") txt += " - Any Waifu\n";
            else if (this.requiredGods[i] == "eldritch") txt += " - Any Eldritch God\n";
            else txt += " - " + this.requiredGods[i].name + "\n";
        }

        txt += "\n" + this.description;
        return txt;
    }
}

class GodManager {
    static addGod(_godObj) {
        GodManager.GOD_LIST.push(_godObj);
    }
    static addSynergy(_synergyObj) {
        _synergyObj.id = GodManager.SYNERGY_LIST.length;
        GodManager.SYNERGY_LIST.push(_synergyObj);
    }

    static getGod(_name) {
        for (var i in GodManager.GOD_LIST) {
            if (GodManager.GOD_LIST[i].name == _name) {
                return GodManager.GOD_LIST[i];
            }
        }
        return _name;
    }
    static getSynergy(_name) {
        for (var i in GodManager.SYNERGY_LIST) {
            if (GodManager.SYNERGY_LIST[i].name == _name) {
                return GodManager.SYNERGY_LIST[i];
            }
        }
        return null;
    }

    static getAllGods(_category = null) {
        if (_category == null) return GodManager.GOD_LIST;

        var l = [];
        for (var i in GodManager.GOD_LIST) {
            if (GodManager.GOD_LIST[i].type == _category) l.push(GodManager.GOD_LIST[i]);
        }
        return l;
    }
    static getRandomGod(_category = "regular") {
        if (ProgressManager.getUnlockedGods().lenth == 0) return null;

        var nbTries = 0;
        while (nbTries <= 100) {
            var random = randomFromList(GodManager.getAllGods(_category));
            if (_category == "waifu" && ProgressManager.getSavedWaifus().indexOf(random.name) > -1) {
                return random;
            }
            if (ProgressManager.getUnlockedGods().indexOf(random) > -1) {
                return random;
            }

            nbTries += 1;
        }
        return null;
    }

    static loadList(_list) {
        for (var i in _list) {
            GodManager.addGod(_list[i]);
        }
    }
    static loadSynergyList(_list) {
        for (var i in _list) {
            for (var j in _list[i].requiredGods) {
                _list[i].requiredGods[j] = GodManager.getGod(_list[i].requiredGods[j]);
            }
            GodManager.addSynergy(_list[i]);
        }
    }
}
GodManager.GOD_LIST = [];
GodManager.SYNERGY_LIST = [];
