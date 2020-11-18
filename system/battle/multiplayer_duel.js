class MultiplayerDuel extends Duel {
    constructor(_heroes, _enemies, _isHost) {
        // TODO get place
        super(_heroes, new Encounter("multiplayer", _enemies), _place);

        this.isHost = _isHost;

        this.cacheList = [];
    }

    // TODO
    getTheme() {
        return super.getTheme();
    }

    getJSON() {
        var obj = Fighter.SPECIAL_OBJECTS;
        var l = this.getAllFighters();
        this.cacheList = [];

        for (var i in l) {
            cacheList[i] = {};
            for (var j in obj) {
                this.cacheList[i][Fighter.SPECIAL_OBJECTS[j]] = l[i][Fighter.SPECIAL_OBJECTS[j]];
                l[i][Fighter.SPECIAL_OBJECTS[j]] = null;
            }
        }

        var json = JSON.stringify(this);

        for (var i in this.cacheList) {
            for (var j in this.cacheList[i]) {
                l[i][j] = this.cacheList[i][j];
            }
        }
        this.cacheList = [];

        return json;
    }
    setJSON() {

    }
}
