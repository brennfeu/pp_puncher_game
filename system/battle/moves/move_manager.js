class MoveManager {
    static getMove(_id) {
        return MoveManager.MOVE_LIST[_id];
    }
    static getMoveByName(_name) {
        for (var i in MoveManager.MOVE_LIST) {
            if (MoveManager.MOVE_LIST[i].newInstance().name == _name) {
                return MoveManager.MOVE_LIST[i];
            }
        }
        return null;
    }

    static getAllMovesNames() {
        var l = [];
        for (var i in MoveManager.MOVE_LIST) {
            l.push(MoveManager.MOVE_LIST[i].newInstance().name);
        }
        return l;
    }

    static createMove(_function, _data) {
        var move = class extends Move {
            constructor() {
                super();

                this.execute = _function;
                for (var i in _data) {
                    this[i] = _data[i];
                }
            }
        };

        MoveManager.MOVE_LIST.push(move);
        return move;
    }

}
MoveManager.MOVE_LIST = [];

const nameSort = function (a, b) {
    var na = a.newInstance().name.toUpperCase();
    var nb = b.newInstance().name.toUpperCase();
    if (na < nb) return -1;
    else if (na > nb) return 1;
    return 0;
}
MoveManager.MOVE_LIST = MoveManager.MOVE_LIST.concat(REGULAR_MOVE_LIST.sort(nameSort));
MoveManager.MOVE_LIST = MoveManager.MOVE_LIST.concat(OTHER_MOVE_LIST.sort(nameSort));
