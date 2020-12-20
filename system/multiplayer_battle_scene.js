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
            _data["duel"].idHost = _data["currentUserId"];
        }
        else {
            var duel = new MultiplayerDuel([], [], false);
            duel.setJSON(JSON.parse(_data["duelString"]));
            _data["duel"] = duel;
        }

        _data["quest"] = [0, 0];
        this.currentUserId = _data["currentUserId"];
        this.lastRegisteredTimestamp = getCurrentTimestamp();
        this.lastPingTimestamp = getCurrentTimestamp();
        this.forceNewTurn = false;
        this.hasSentResults = false;
        this.hostUpdateCounter = 0;
        this.lastHostUpdateCounter = 0;
        this.nonHostUpdateTimestamp = 0;
        this.nonHostUpdates = {};
        this.forceResetStatusIcons = false;
        this.autoWinTimestamp = null;
        this.stopSayinTimesUp = false;
        this.lastUpdateTimestamp = -1;

        super.init(_data);

        if (!_data["isHost"]) {
            this.getFromDatabase();
        }
        else {
            this.sendToDatabase();
        }
    } catch(e) { TRIGGER_ERROR(this, e) } }

    create() { try {
        super.create();

        this.timerObject = this.addText("", 10, 500, {fontStyle: 'bold'});
    } catch(e) { TRIGGER_ERROR(this, e) } }

    update() { try {
        var timerValue = this.lastRegisteredTimestamp + 60 - getCurrentTimestamp();

        // takes too much time?
        if (this.autoWinTimestamp != null && this.duel.duelState != "victory") {
            if (this.autoWinTimestamp + 30 < getCurrentTimestamp()) return this.switchScene("Map");
        }
        else if (timerValue > 0 && ["heroChoice", "moveChoice", "targetChoice"].indexOf(this.duel.duelState) > -1 && !this.stopSayinTimesUp) {
            for (var i in this.duel.heroes) {
                if (this.duel.heroes[i].chosenMove == null) this.duel.heroes[i].chosenMove = Wait;
            }

            if (this.duel.isHost) {
                this.duel.duelState = "waiting";
                this.duel.checkAllFightersAttacks();
                this.lastRegisteredTimestamp = getCurrentTimestamp();
            }
            else {
                this.sendToDatabase();
                this.duel.duelState = "waiting";
            }

            this.stopSayinTimesUp = true;
            return this.openDialogue(43);
        }
        else if (this.lastRegisteredTimestamp + 60*2+30 < getCurrentTimestamp() && this.duel.duelState == "waiting") {
            // auto-win if has internet
            this.executeQuery("SELECT idHost FROM OnlineDuel", "autoWin");
            this.autoWinTimestamp = getCurrentTimestamp();
            return this.openDialogue(42);
        }
        else if (this.duel.duelState != "waiting") this.stopSayinTimesUp = false;

        if (["heroChoice", "moveChoice", "targetChoice", "waiting"].indexOf(this.duel.duelState) > -1 && timerValue > 0) {
            this.timerObject.setText(timerValue);
            this.timerObject.setAlpha(1);
        }
        else {
            this.timerObject.setAlpha(0);
        }

        // host sends to db
        if (this.duel.readyToSendToDB && this.duel.duelState == "heroChoice" && !(this.hasNewStuff() || this.duel.memoryMoves.length > 0)) {
            this.duel.readyToSendToDB = false;
            this.sendToDatabase();
        }

        if (this.duel.isHost && this.hasNewStuff()) {
            this.hostUpdateCounter += 1;
            this.executeQuery(
                "INSERT INTO OnlineDuelUpdate (idHost, id, duelString) " +
                "VALUES ('" +
                    this.currentUserId + "', '" +
                    this.hostUpdateCounter + "', '{" +
                    JSON.stringify(this.getUpdateJSON()).split("'").join("`").slice(1,-1) + "}')"
            );
        }
        if (!this.duel.isHost && this.duel.duelState == "waiting" && this.nonHostUpdateTimestamp + 5 <= getCurrentTimestamp()) {
            this.executeQuery(
                "SELECT * FROM OnlineDuelUpdate " +
                "WHERE idHost = " + this.duel.idHost + " AND id > " + this.hostUpdateCounter,
                "nonHostUpdate"
            );
            this.nonHostUpdateTimestamp = getCurrentTimestamp();
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
            this.resetStatusIcons(); // set duel obj to fighters
            this.duel.newTurn();
            this.forceResetStatusIcons = true;
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
                    "AND lastUpdate > " + this.lastUpdateTimestamp + " " +
                    "AND fullDuelString = FALSE", "readAttacks");
            }
            else if (this.duel.duelState == "waiting") {
                this.executeQuery("SELECT * FROM OnlineDuel " +
                    "WHERE idInvited = '" + this.currentUserId + "' " +
                    "AND timestamp > " + this.lastRegisteredTimestamp, "updateDuel");
            }

            this.lastPingTimestamp = getCurrentTimestamp();
        }

        super.update();

        if (this.forceResetStatusIcons) {
            this.resetStatusIcons();
            this.duel.messageList = [];
            this.forceResetStatusIcons = false;
        }
    } catch(e) { TRIGGER_ERROR(this, e) } }
    hasNewStuff() {
        if (this.duel.memorySoundEffects.length > 0) return true;

        for (var i in this.duel.memoryAnimations) {
            if (this.duel.memoryAnimations[i].animObject == null) return true;
        }
        return false;
    }

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
        //if (this.lastRegisteredTimestamp >= getCurrentTimestamp()) this.lastRegisteredTimestamp = getCurrentTimestamp() + 1;
        //else this.lastRegisteredTimestamp = getCurrentTimestamp();

        if (this.duel.isHost) {
            this.lastRegisteredTimestamp = getCurrentTimestamp();
            this.executeQuery(
                "UPDATE OnlineDuel SET " +
                    "timestamp = '" + this.lastRegisteredTimestamp + "', " +
                    "duelString = '" + JSON.stringify(this.duel.getJSON()).split("'").join("`").slice(1,-1) + "', " +
                    "lastUpdate = '" + this.hostUpdateCounter + "', " +
                    "fullDuelString = TRUE " +
                "WHERE idHost = '" + this.currentUserId + "'"
            );
        }
        else {
            this.executeQuery(
                "UPDATE OnlineDuel SET " +
                    "timestamp = '" + (this.lastRegisteredTimestamp+3) + "', " +
                    "duelString = '{" + JSON.stringify(this.duel.getAttackJSON()).split("'").join("`").slice(1,-1) + "}', " +
                    "fullDuelString = FALSE " +
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

    getUpdateJSON() {
        var json = {};
        var l = this.duel.getAllFighters();

        json["text"] = this.duel.messageList;
        json["sounds"] = this.duel.memorySoundEffects;
        json["animations"] = {}
        for (var i in this.duel.memoryAnimations) {
            if (this.duel.memoryAnimations[i].animObject == null) {
                json["animations"][i] = {};
                for (var j in this.duel.memoryAnimations[i]) {
                    if (j == "fighter") {
                        json["animations"][i]["fighter"] = this.duel.memoryAnimations[i]["fighter"].id;
                    }
                    else {
                        json["animations"][i][j] = this.duel.memoryAnimations[i][j];
                    }
                }
            }
        }
        json["logObj"] = {
            "speed": this.duel.logTextObject.speed,
            "speedCursor": this.duel.logTextObject.speedCursor,
            "currentTextCursor": this.duel.logTextObject.currentTextCursor
        };
        if (this.getMainObjParent() != null) json["idMainFighter"] = this.getMainObjParent().id;
        json["forcedStatus"] = {}
        json["fighterStats"] = {}
        for (var i in l) {
            json["forcedStatus"][l[i].id] = l[i].getAllStatus();
            json["fighterStats"][l[i].id] = [l[i].STRValue, l[i].DEXValue];
        }
        json["forcedDuelEffects"] = this.duel.getDuelEffects();

        return json;
    }
    setUpdateJSON(_json) {
        var json = _json;

        this.duel.messageList = json["text"];
        this.duel.memorySoundEffects = json["sounds"];
        for (var i in json["animations"]) {
            json["animations"][i].fighter = this.duel.getFighterFromId(json["animations"][i].fighter);
            this.duel.memoryAnimations.push(json["animations"][i]);
        }

        for (var i in this.duel.messageList) {
            for (var j in PARTY_MEMBER_NAMES) {
                this.duel.messageList[i] = this.duel.messageList[i].split(PARTY_MEMBER_NAMES[j]).join("Alt. " + PARTY_MEMBER_NAMES[j]);
            }

            this.duel.messageList[i] = this.duel.messageList[i].split("Alt. Alt. ").join("");
        }

        for (var i in json["logObj"]) {
            this.duel.logTextObject[i] = json["logObj"][i];
        }

        for (var i in json["forcedStatus"]) {
            this.duel.getFighterFromId(i).forcedStatus = json["forcedStatus"][i];
        }
        for (var i in json["fighterStats"]) {
            this.duel.getFighterFromId(i).STRValue = json["fighterStats"][i][0];
            this.duel.getFighterFromId(i).DEXValue = json["fighterStats"][i][1];
        }

        this.duel.forcedDuelEffects = json["forcedDuelEffects"];
    }

    recieveQuery(_results, _queryID, _this) {
        if (false) { console.log(_queryID); console.log(_results); }
        //if (_queryID != null) console.log(_queryID);

        switch(_queryID) {
            case("updateDuel"):
                // update the duel - NON HOST
                if (_results.length == 0) return;
                if (!_results[0].fullDuelString) return;
                if (_this.duel.memoryJSON != null) return;
                _this.lastRegisteredTimestamp = _results[0].timestamp;
                _this.duel.memoryJSON = JSON.parse(_results[0].duelString);
                _this.duel.readyToRecieveFromDB = false;
                _this.lastHostUpdateCounter = _results[0].lastUpdate;
                _this.resetStatusIcons();
                _this.autoWinTimestamp = null;
                return;
            case("nonHostUpdate"):
                // update during turn
                for (var i in _results) {
                    _this.nonHostUpdates[_results[i].id] = JSON.parse(_results[i].duelString);
                }
                _this.autoWinTimestamp = null;
                return;

            case("readAttacks"):
                // update the duel - HOST
                if (_results.length == 0 || ["heroChoice", "moveChoice", "targetChoice", "waiting"].indexOf(_this.duel.duelState) < 0) return;
                if (_results[0].fullDuelString) return;
                _this.duel.setAttackJSON(_results[0].duelString);
                _this.duel.checkAllFightersAttacks();
                _this.autoWinTimestamp = null;
                _this.lastUpdateTimestamp = _results[0].lastUpdate
                return;

            case("autoWin"):
                console.log("multiplayer auto-win");
                _this.duel.triggerVictory();
                _this.quitScene();
                return;
        }
    }

    getMainObj() {
        if (this.duel.isHost || this.duel.duelState != "waiting") return super.getMainObj();

        if (this.nonHostUpdates[this.hostUpdateCounter] != null && this.nonHostUpdates[this.hostUpdateCounter].idMainFighter != null) {
            return this.duel.getFighterFromId(this.nonHostUpdates[this.hostUpdateCounter].idMainFighter).spriteObject;
        }
        return null;
    }
}
