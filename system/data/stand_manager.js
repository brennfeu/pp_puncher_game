class Stand {
    constructor(_data, _id) {
        this.id = _id;

        this.name = _data.name;
        this.description = _data.description;
        this.summonMoves = _data.summonMoves;
    }

    getDescription(_includeName = false) {
        var txt = "";
        if (_includeName) txt += this.name + "\n\n";
        txt += this.description;

        txt += "\n\nSummon Moves:";
        for (var i in this.summonMoves) {
            txt += "\n - " + this.summonMoves[i].newInstance().name;
        }

        return txt;
    }
}

class StandManager {
    static addStand(_area) {
        StandManager.STAND_LIST.push(_area);
    }
    static getStand(_id) {
        return StandManager.STAND_LIST[_id];
    }

    static loadList(_list) {
        for (var i in _list) {
            StandManager.addStand(new Stand(_list[i], i));
        }
    }
}
StandManager.STAND_LIST = [];
