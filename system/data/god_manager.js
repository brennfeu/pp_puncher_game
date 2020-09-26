class God {
    constructor(_name, _type, _normalMoveFunction, _specialMoveFunction, _startFunction = null) {
        this.name = _name;
        this.type = _type;
        this.normalMove = _normalMoveFunction;
        this.specialMove = _specialMoveFunction;
        this.startFunction = _startFunction;
    }
}
class RegularGod extends God {
    constructor(_name, _normalMoveFunction, _specialMoveFunction) {
        super(_name, "regular", _normalMoveFunction, _specialMoveFunction);
    }
}
class Waifu extends God {
    constructor(_name, _normalMoveFunction, _specialMoveFunction) {
        super(_name, "waifu", _normalMoveFunction, _specialMoveFunction);
    }
}
class EldritchGod extends God {
    constructor(_name, _normalMoveFunction, _specialMoveFunction, _startFunction) {
        super(_name, "eldritch", _normalMoveFunction, _specialMoveFunction, _startFunction);
    }
}

class GodManager {
    static addGod(_godObj) {
        GodManager.GOD_LIST.push(_godObj);
    }

    static getGod(_name) {
        for (var i in GodManager.GOD_LIST) {
            if (GodManager.GOD_LIST[i].name == _name) {
                return GodManager.GOD_LIST[i];
            }
        }
        return null;
    }

    static loadList(_list) {
        for (var i in _list) {
            GodManager.addGod(_list[i]);
        }
    }
}
GodManager.GOD_LIST = [];
