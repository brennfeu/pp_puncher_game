class MultiplayerBattleScene extends BattleScene {
    constructor() { try {
        super("MultiplayerBattle");
    } catch(e) { TRIGGER_ERROR(this, e) } }

    init(_data) { try {
        Logger.log(_data, "data")
        if (_data["isHost"]) {
            var challengerData = _data["challengerData"];
            _data["duel"] = new MultiplayerDuel(
                PartyManager.getCurrentParty(),
                challengerData["initParty"],
                true
            );
            _data["duel"].idHost = _data["currentUserId"];
        }
        else {
            var duel = new MultiplayerDuel([], [], false);
            duel.setJSON(_data["duelString"]);
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
        // host sends to db
        if (this.duel.readyToSendToDB && this.duel.duelState == "heroChoice" && !(this.hasNewStuff() || this.duel.memoryMoves.length > 0)) {
            this.duel.readyToSendToDB = false;
            this.sendToDatabase();
        }

        if (this.duel.isHost && this.hasNewStuff()) {
            this.hostUpdateCounter += 1;
            this.sendQuery("addDuelUpdate", undefined, {
                "myId": this.currentUserId,
                "hostUpdateCounter": this.hostUpdateCounter,
                "duelString": "{" + JSON.stringify(this.getUpdateJSON()).split("'").join("`").slice(1,-1) + "}"
            })
        }
        if (!this.duel.isHost && this.duel.duelState == "waiting" && this.nonHostUpdateTimestamp + 5 <= getCurrentTimestamp()) {
            this.sendQuery("getDuelUpdate", "nonHostUpdate", {
                "idHost": this.duel.idHost,
                "hostUpdateCounter": this.hostUpdateCounter
            })
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
                this.sendQuery("nonHostAttacks", "readAttacks", {
                    "myId": this.currentUserId,
                    "lastUpdateTimestamp": this.lastUpdateTimestamp
                })
            }
            else if (this.duel.duelState == "waiting") {
                this.sendQuery("updatedDuel", "updateDuel", {
                    "myId": this.currentUserId,
                    "timestamp": this.lastRegisteredTimestamp
                })
            }

            this.lastPingTimestamp = getCurrentTimestamp();
        }

        // takes too much time?
        var timerValue = this.lastRegisteredTimestamp + 40 - getCurrentTimestamp();
        if (false) {} // bool = disable timer?
        else if (this.autoWinTimestamp != null && this.duel.duelState != "victory") {
            if (this.autoWinTimestamp + 30 < getCurrentTimestamp()) return this.switchScene("Map");
        }
        else if (timerValue < 0 && ["heroChoice", "moveChoice", "targetChoice"].indexOf(this.duel.duelState) > -1 && !this.stopSayinTimesUp) {
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
        else if (this.lastRegisteredTimestamp + 120 < getCurrentTimestamp() && this.duel.duelState == "waiting") {
            // auto-win if has internet
            this.sendQuery("everyoneOnline", "autoWin");
            this.autoWinTimestamp = getCurrentTimestamp();
            return this.openDialogue(42);
        }
        else if (this.duel.duelState != "waiting") this.stopSayinTimesUp = false;

        if (["heroChoice", "moveChoice", "targetChoice"].indexOf(this.duel.duelState) > -1 && timerValue >= 0) {
            this.timerObject.setText("" + timerValue);
            this.timerObject.setAlpha(1);
        }
        else {
            this.timerObject.setAlpha(0);
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
            this.sendQuery("updateDuel", undefined, {
                "myId": this.currentUserId,
                "duelString": JSON.stringify(this.duel.getJSON()).split("'").join("`").slice(1,-1),
                "lastUpdate": this.hostUpdateCounter,
                "fullDuelString": true,
                "timestamp": this.lastRegisteredTimestamp
            });
        }
        else {
            this.sendQuery("updateDuel", undefined, {
                "myId": this.currentUserId,
                "duelString": "{" + JSON.stringify(this.duel.getAttackJSON()).split("'").join("`").slice(1,-1) + "}",
                "fullDuelString": false,
                "timestamp": this.lastRegisteredTimestamp+3
            });
        }
    }
    getFromDatabase() {
        if (this.duel.isHost) {
            this.sendQuery("duelFromHost", "joinDuel", {"myId": this.currentUserId});
        }
        else if (this.duel.readyToRecieveFromDB) {
            this.sendQuery("duelFromInvite", "joinDuel", {"myId": this.currentUserId});
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
            if (i == "currentTextCursor" && json["logObj"][i] != 0) continue;
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
        Logger.log(_queryID, "recievedQuery", _results);

        switch(_queryID) {
            case("updateDuel"):
                // update the duel - NON HOST
                if (_results == null) return;
                if (!_results.fullDuelString) return;
                if (_this.duel.memoryJSON != null) return;
                _this.lastRegisteredTimestamp = _results.timestamp;
                _this.duel.memoryJSON = _results.duelString;
                _this.duel.readyToRecieveFromDB = false;
                _this.lastHostUpdateCounter = _results.lastUpdate;
                _this.resetStatusIcons();
                _this.autoWinTimestamp = null;
                return;
            case("nonHostUpdate"):
                // update during turn
                for (var i in _results) {
                    _this.nonHostUpdates[_results[i].id] = _results[i].duelString;
                }
                _this.autoWinTimestamp = null;
                return;

            case("readAttacks"):
                // update the duel - HOST
                if (_results == null || ["heroChoice", "moveChoice", "targetChoice", "waiting"].indexOf(_this.duel.duelState) < 0) return;
                if (_results.fullDuelString) return;
                _this.duel.setAttackJSON(_results.duelString);
                _this.duel.checkAllFightersAttacks();
                _this.autoWinTimestamp = null;
                _this.lastUpdateTimestamp = _results.lastUpdate
                return;

            case("autoWin"):
                Logger.log("Multiplayer Auto-win", "multiplayerTime");
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
