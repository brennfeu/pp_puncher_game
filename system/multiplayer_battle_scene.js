class MultiplayerBattleScene extends BattleScene {
    constructor() { try {
        super("MultiplayerBattle");
    } catch(e) { TRIGGER_ERROR(this, e) } }

    init(_data) { try {
        if (_data["isHost"]) {
            var challengerData = JSON.parse(_data["challengerData"]);
            _data["duel"] = new MultiplayerDuel(
                PartyManager.getCurrentParty(),
                challengerData["initParty"],
                true
            );
        }
        else {
            var duel = new MultiplayerDuel([], [], false);
            duel.setJSON(_data["duelString"]);
            _data["duel"] = duel;
        }

        _data["quest"] = [0, 0];
        this.currentUserId = _data["currentUserId"];
        this.lastRegisteredTimestamp = 0;
        this.lastPingTimestamp = getCurrentTimestamp();
        this.forceNewTurn = false;
        this.hasSentResults = false;

        super.init(_data);

        if (!_data["isHost"]) {
            this.getFromDatabase();
        }
        else {
            this.sendToDatabase();
        }
    } catch(e) { TRIGGER_ERROR(this, e) } }

    preload() { try {
        super.preload();

        // loads all themes
        for (var i in AreaManager.AREA_LIST) {
            this.loadMusic(AreaManager.AREA_LIST[i].getBattleTheme() + ".mp3");
            this.loadMusic(AreaManager.AREA_LIST[i].getBossTheme() + ".mp3");
            this.loadMusic(AreaManager.AREA_LIST[i].getVictoryTheme() + ".mp3");
        }
    } catch(e) { TRIGGER_ERROR(this, e) } }

    create() { try {
        super.create();
    } catch(e) { TRIGGER_ERROR(this, e) } }

    update() { try {
        // host sends to db
        if (this.duel.readyToSendToDB && this.duel.duelState == "heroChoice") {
            this.duel.readyToSendToDB = false;
            CURRENT_SCENE.sendToDatabase();
        }

        // deletes objects that shouldn't exist
        var l = this.getAllObjects();
        for (var i in l) {
            if (!l[i].active) continue;
            if (l[i].fighter == null) continue;
            var trueFighter = this.duel.getFighterFromId(l[i].fighter.id)
			if (!trueFighter.hasGameObj(l[i])) {
                l[i].destroy();
                if (trueFighter != l[i].fighter) l[i].fighter.destroyObjects();
			}
		}

        // non host when he gets the JSON
        if (this.forceNewTurn) {
            this.forceNewTurn = false;
            this.resetStatusIcons();
            this.duel.newTurn();
        }

        // send results
        if (this.duel.isHost && !this.hasSentResults && ["victory", "defeat"].indexOf(this.duel.duelState) > -1) {
            this.hasSentResults = true;
            this.sendToDatabase();
        }

        // pings DB
        if (this.lastPingTimestamp + 3 <= getCurrentTimestamp()) {
            if (this.duel.isHost) {
                // check if opponents sent his attacks
                this.executeQuery("SELECT * FROM OnlineDuel " +
                    "WHERE idHost = '" + this.currentUserId + "' " +
                    "AND timestamp > " + this.lastRegisteredTimestamp, "readAttacks");
            }
            else if (this.duel.duelState == "waiting") {
                this.executeQuery("SELECT * FROM OnlineDuel " +
                    "WHERE idInvited = '" + this.currentUserId + "' " +
                    "AND timestamp > " + this.lastRegisteredTimestamp, "updateDuel");
            }

            this.lastPingTimestamp = getCurrentTimestamp();
        }

        super.update();
    } catch(e) { TRIGGER_ERROR(this, e) } }

    quitScene() {
        if (this.duel.duelState == "victory") {
            ProgressManager.setValue("PP_Points", ProgressManager.getValue("PP_Points") + this.duel.getWinPoints());

            // save to steam
            try {
                GREENWORKS.setStat("PP_POINTS", ProgressManager.getValue("PP_Points"));
                GREENWORKS.storeStats(
                    function(_idk) {},
                    function(_err) {}
                );
            }
            catch(e) {}
        }
        this.switchScene("Multiplayer");
    }

    sendToDatabase() {
        if (this.lastRegisteredTimestamp >= getCurrentTimestamp()) this.lastRegisteredTimestamp = getCurrentTimestamp() + 1;
        else this.lastRegisteredTimestamp = getCurrentTimestamp();

        if (this.duel.isHost) {
            this.executeQuery(
                "UPDATE OnlineDuel SET " +
                    "timestamp = '" + this.lastRegisteredTimestamp + "', " +
                    "duelString = '" + JSON.stringify(this.duel.getJSON()).split("'").join("").slice(1,-1) + "' " +
                "WHERE idHost = '" + this.currentUserId + "'"
            );
        }
        else {
            this.executeQuery(
                "UPDATE OnlineDuel SET " +
                    "timestamp = '" + this.lastRegisteredTimestamp + "', " +
                    "duelString = '{" + JSON.stringify(this.duel.getAttackJSON()).split("'").join("").slice(1,-1) + "}' " +
                "WHERE idInvited = '" + this.currentUserId + "'"
            );
        }
    }
    getFromDatabase() {
        if (this.duel.isHost) {
            this.executeQuery("SELECT * FROM OnlineDuel WHERE idHost = '" + this.currentUserId + "'", "updateDuel");
        }
        else if (this.duel.readyToRecieveFromDB) {
            this.executeQuery("SELECT * FROM OnlineDuel WHERE idInvited = '" + this.currentUserId + "'", "updateDuel");
        }
    }

    recieveQuery(_results, _queryID, _this) {
        if (false) { console.log(_queryID); console.log(_results); }

        switch(_queryID) {
            case("updateDuel"):
                // update the duel - NON HOST
                if (_results.length == 0) return;
                if (!_this.duel.readyToRecieveFromDB) return;
                _this.lastRegisteredTimestamp = _results.timestamp;
                _this.duel.setJSON(_results[0].duelString);
                _this.duel.readyToRecieveFromDB = false;
                _this.forceNewTurn = true;
                return;

            case("readAttacks"):
                // update the duel - HOST
                if (_results.length == 0) return;
                _this.lastRegisteredTimestamp = _results[0].timestamp;
                _this.duel.setAttackJSON(_results[0].duelString);
                _this.duel.checkAllFightersAttacks();
                return;
        }
    }

}
