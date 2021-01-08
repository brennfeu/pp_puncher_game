class MultiplayerScene extends Scene {
    constructor() { try {
        super({key:"Multiplayer"});
    } catch(e) { TRIGGER_ERROR(this, e) } }

    init(_data) { try {

    } catch(e) { TRIGGER_ERROR(this, e) } }

    preload() { try {
        this.startLoadingScreen();

        this.loadImage("ui/multiplayer/big_frame.png");
    } catch(e) { TRIGGER_ERROR(this, e) } }

    create() { try {
        try {
            var ppPoints = ProgressManager.getValue("PP_Points");
            if (ppPoints == undefined || ppPoints == null) {
                ppPoints = 0;
                ProgressManager.setValue("PP_Points", 0);
            }

            var username = MYSQL.escape(GREENWORKS.getSteamId().getPersonaName()).split("'").join("");
            var userId = parseInt(GREENWORKS.getSteamId().getRawSteamID());

            // so each instance has a different ID
            if (DEV_MODE) userId = getRandomPercent()*getRandomPercent()*getRandomPercent();
            Logger.log("User ID: " + userId, "multiplayer");
        }
        catch(e) {
            // TODO show error message and go back
            throw e;
        }

        this.titleA = this.addText("People you can challenge", 35, 20, {fontStyle: 'bold'});
        this.titleB = this.addText("People that challenges you", 35+40+550, 20, {fontStyle: 'bold'});
        this.addImage("ui/multiplayer/big_frame", 30, 50, {fontStyle: 'bold'});
        this.addImage("ui/multiplayer/big_frame", 30+40+550, 50, {fontStyle: 'bold'});

        this.addText(username, 35, 60+550+10, {fontStyle: 'bold'});
        this.addText("PP Points: " + ppPoints, 35+40+550, 60+550+10, {fontStyle: 'bold'});
        this.addText("Unlocks: " + ProgressManager.getTotalNbOfUnlocks(), 35+40+550, 60+550+33, {fontStyle: 'bold'});

        this.stillTherePingTimestamp = 0;
        this.reloadPeopleListTimestamp = 0;

        this.table1List = [];
        this.table2List = [];
        this.cursor1 = new CustomCursor(
            this.addText(">", 45, -10000),
            "vertical",
            this.table1List
        );
        this.cursor1.setFormula(62, 22, 62);
        this.cursor2 = new CustomCursor(
            this.addText(">", 45+40+550, -10000),
            "vertical",
            this.table2List
        );
        this.cursor2.setFormula(62, 22, 62);

        this.selectsLeft = true;

        this.currentUserId = userId;
        this.currentUserName = username;

        this.peopleList = [];
        this.challengeList = [];

        this.stopLoadingScreen();
        this.playMusic("AnimeConvention_area");

        this.reloadsList1();
    } catch(e) { TRIGGER_ERROR(this, e) } }

    update() { try {
        if (this.isInOptions) {
            return this.optionsUpdate();
        }
        if (this.isInDialogue) {
            return this.dialogueUpdate();
        }

        if (!ProgressManager.isStepCompleted(0, 4) || !ProgressManager.isStepCompleted(27, 1)) {
            ProgressManager.unlockStep(0, 4);
            ProgressManager.unlockStep(27, 1);
            return this.openDialogue(37);
        }

        if (this.justPressedControl("BACK")) {
            return this.quitScene();
        }

        this.sendCheckIfNecessary();

        if (this.selectsLeft && this.table1List.length != 0) {
            if (this.justPressedControl("DOWN")) {
                this.cursor1.goDown();
                this.playSoundOK();
            }
            else if (this.justPressedControl("UP")) {
                this.cursor1.goUp();
                this.playSoundOK();
            }
            else if (this.justPressedControl("BACK")) {
                this.playSoundSelect();
                return this.quitScene();
            }
            else if (this.justPressedControl("RIGHT") && this.table2List.length > 0) {
                this.cursor1.obj.setY(-1000);
                this.cursor1.currentSelect = 0; this.cursor1.currentOffset = 0;
                return this.selectsLeft = false;
            }

            this.cursor1.update();

            if (this.justPressedControl("ENTER")) {
                this.playSoundSelect();

                if (this.cursor1.getCurrentSelect() == this.table1List.length-1) {
                    return this.quitScene();
                }
                else if (this.cursor1.getCurrentSelect() == this.table1List.length-2) {
                    return this.reloadsList1();
                }
                else if (this.peopleList.length == 0) return;

                this.sendQuery("challengeYou", undefined, {
                    "myId": this.currentUserId,
                    "yourId": this.peopleList[this.cursor1.getCurrentSelect()].id,
                    "myData": JSON.stringify(this.getChallengerData()).split("'").join("`").slice(1,-1)
                });
            }
        }
        else if (!this.selectsLeft && this.table2List.length != 0) {
            if (this.justPressedControl("DOWN")) {
                this.cursor2.goDown();
                this.playSoundOK();
            }
            else if (this.justPressedControl("UP")) {
                this.cursor2.goUp();
                this.playSoundOK();
            }
            else if (this.justPressedControl("BACK")) {
                this.playSoundSelect();
                return this.quitScene();
            }
            else if (this.justPressedControl("LEFT") && this.table1List.length > 0) {
                this.cursor2.obj.setY(-1000);
                this.cursor2.currentSelect = 0; this.cursor2.currentOffset = 0;
                return this.selectsLeft = true;
            }

            this.cursor2.update();

            if (this.justPressedControl("ENTER")) {
                this.playSoundSelect();

                if (this.cursor2.getCurrentSelect() == this.table2List.length-1) {
                    return this.quitScene();
                }
                else if (this.cursor2.getCurrentSelect() == this.table2List.length-2) {
                    return this.reloadsList2();
                }
                else if (this.challengeList.length == 0) return;

                return this.triggerDuel(this.challengeList[this.cursor2.getCurrentSelect()].idChallenger, true)
            }
        }

        this.updateTint();

        if (this.justPressedControl("MENU")) {
            this.openOptions();
        }
    } catch(e) { TRIGGER_ERROR(this, e) } }

    quitScene() {
        this.removeMyPresence();
        return this.switchScene("Map");
    }

    sendCheckIfNecessary() {
        if (this.reloadPeopleListTimestamp + 10 <= getCurrentTimestamp()) {
            // check if someone accepted request
            this.sendQuery("duelFromInvite", "joinDuel", {"myId": this.currentUserId});

            if (this.selectsLeft) this.reloadsList2();

            this.reloadPeopleListTimestamp = getCurrentTimestamp();
        }
        if (this.stillTherePingTimestamp + 3 <= getCurrentTimestamp()) {
            // i'm still right there!
            this.sendQuery("stillTherePing", undefined, {
                "myId": this.currentUserId,
                "myName": this.currentUserName,
                "myPoints": ProgressManager.getValue("PP_Points"),
                "myUnlocks": ProgressManager.getTotalNbOfUnlocks()
            })

            this.stillTherePingTimestamp = getCurrentTimestamp();
        }
    }
    reloadsList1() {
        // ask for all online users with the same version except me
        this.sendQuery("everyoneOnline", "reloadPeopleList");

        // resets list
        for (var i in this.table1List) this.table1List[i].destroy();
        this.table1List = [];
        this.cursor1.objList = this.table1List;
        this.cursor1.currentSelect = 0; this.cursor1.currentOffset = 0; this.cursor1.obj.setY(-1000)
    }
    reloadsList2() {
        // ask for all online users with the same version except me
        this.sendQuery("everyoneChallengingMe", "reloadChallengeList", {"myId": this.currentUserId});

        // resets list
        for (var i in this.table2List) this.table2List[i].destroy();
        this.table2List = [];
        this.cursor2.objList = this.table1List;
        this.cursor2.currentSelect = 0; this.cursor2.currentOffset = 0; this.cursor2.obj.setY(-1000)
    }

    recieveQuery(_results, _queryID, _this) {
        Logger.log(_queryID, "recievedQuery", _results);

        switch(_queryID) {
            case("joinDuel"):
                // someone accepted my challenge!
                if (_results == null || _results.duelString == "") return;
                _this.duelString = _results.duelString;
                _this.triggerDuel(_results.id, false);
                return;

            case("reloadPeopleList"):
                // reloads the left table
                _this.setTable1Users(_results);
                return;
            case("reloadChallengeList"):
                // reloads the left table
                _this.setTable2Users(_results);
                return;
        }
    }

    setTable1Users(_userList) {
        for (var i in this.table1List) this.table1List[i].destroy();
        this.table1List = [];
        this.peopleList = [];

        for (var i in _userList) {
            if (_userList[i].id == this.currentUserId) continue;
            var txt = _userList[i].name + " (" + _userList[i].pppoints + " PPP / " + _userList[i].unlocks + " Unlocks)"
            this.table1List.push(this.addText(txt, 65, 62 + this.table1List.length*22));

            this.peopleList.push(_userList[i])
        }

        if (this.table1List.length == 0) this.table1List.push(this.addText("No one is online right now :(", 65, 62));
        this.table1List.push(this.addText("", 65, 62 + this.table1List.length*22));
        this.table1List.push(this.addText("Refresh List", 65, 62 + this.table1List.length*22));
        this.table1List.push(this.addText("Quit", 65, 62 + this.table1List.length*22));

        this.cursor1.objList = this.table1List;
    }
    setTable2Users(_challengeList) {
        for (var i in this.table2List) this.table2List[i].destroy();
        this.table2List = [];
        this.challengeList = [];

        for (var i in _challengeList) {
            var user = null;
            for (var j in this.peopleList) {
                if (this.peopleList[j].id == _challengeList[i].idChallenger) {
                    user = this.peopleList[j];
                }
            }

            if (user == null) continue;
            var txt = user.name + " (" + user.pppoints + " PPP / " + user.unlocks + " Unlocks)"
            this.table2List.push(this.addText(txt, 65+40+550, 62 + this.table2List.length*22));

            this.challengeList.push(_challengeList[i])
        }

        if (this.table2List.length == 0) this.table2List.push(this.addText("No one is challenging you", 65+40+550, 62));
        this.table2List.push(this.addText("", 65+40+550, 62 + this.table2List.length*22));
        this.table2List.push(this.addText("Refresh List", 65+40+550, 62 + this.table2List.length*22));
        this.table2List.push(this.addText("Quit", 65+40+550, 62 + this.table2List.length*22));

        this.cursor2.objList = this.table2List;
    }

    triggerDuel(_otherDudeId, _isHost) {
        if (_isHost) {
            var challenge = null;
            for (var j in this.challengeList) {
                if (this.challengeList[j].idChallenger == _otherDudeId) {
                    challenge = this.challengeList[j];
                }
            }
            if (challenge == null) {
                this.reloadsList1();
                this.openDialogue(41);
                return;
            }
        } // gathers challenge data

        // update DB
        this.removeMyPresence();
        if (_isHost) this.sendQuery("startDuel", undefined, {
            "myId": this.currentUserId,
            "yourId": _otherDudeId
        })

        var data = {}
        data["currentUserId"] = this.currentUserId;
        data["isHost"] = _isHost;
        if (_isHost) {
            data["challengerData"] = challenge.challengerData;
        }
        else {
            data["duelString"] = this.duelString;
        }
        return this.switchScene("MultiplayerBattle", data);
    }
    removeMyPresence() {
        this.sendQuery("removeMyPresence", undefined, {"myId": this.currentUserId})
    }

    getChallengerData() {
        var data = {};

        data["initParty"] = PartyManager.getCurrentParty();

        return JSON.stringify(data);
    }

    getMainObj() {
        if (this.selectsLeft) {
            return this.titleA;
        }
        return this.titleB;
    }
}
