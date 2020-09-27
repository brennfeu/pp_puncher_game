class Relic {
    constructor(_data, _id) {
        this.id = _id;

        this.name = _data.name;
        this.description = _data.description;
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
