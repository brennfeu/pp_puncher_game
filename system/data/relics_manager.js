class Relic {
    constructor(_data, _id) {
        this.id = _id;

        this.name = _data.name;
        this.description = _data.description;
        this.usage = _data.usage;
        this.wielder = PartyManager.getPartyMemberByName(_data.wielder);
    }

    getDescription(_includeName = false) {
        var txt = "";
        if (_includeName) txt += this.name + "\n\n";
        txt += this.description;
        txt += "\n\n" + this.usage;
        txt += "\n\nWielder: " + this.wielder.name;
        return txt;
    }
}

class RelicManager {
    static addRelic(_area) {
        RelicManager.RELIC_LIST.push(_area);
    }
    static getRelic(_id) {
        return RelicManager.RELIC_LIST[_id];
    }

    static loadList(_list) {
        for (var i in _list) {
            RelicManager.addRelic(new Relic(_list[i], i));
        }
    }
}
RelicManager.RELIC_LIST = [];
