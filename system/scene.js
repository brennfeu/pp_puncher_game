class Scene extends Phaser.Scene {
    constructor(_json) {
        super(_json);
        this.sceneName = _json.key;

        this.allTextObjects = [];
        this.allImageObjects = [];

        this.isMaintainingKey = false;
        this.isMaintainingKeyMemory = null;
        this.keyTimer = 0;
        this.gamepadTimer = 0;

        this.soundList = {};
        this.musicPlayer = null;
        this.currentMusic = "";

        this.isInOptions = false;
        this.optionTexts = null;
        this.optionTitle = null;
        this.optionBlackScreen = null;
        this.optionFrame = null;
        this.optionCurrentSelect = 0;
        this.optionMemorySelect = 0
        this.optionArea = "";
        this.volumeCounter = 0;

        this.isInBible = false;
        this.bibleFrame = null;
        this.bibleTitle = null;
        this.bibleDescriptionTitle = null;
        this.bibleDescription = null;
        this.bibleTextsA = [];
        this.bibleTextsB = [];
        this.cursorA = null;
        this.cursorB = null;
        this.cursorASelect = 0;
        this.cursorBSelect = 0;
        this.bibleStep = 0;

        this.isInDialogue = false;
        this.currentDialogue = null;
        this.currentLine = null;
        this.dialogueFrame = null;
        this.dialogueObj = null;
        this.dialogueSpeakerObj = null;

        this.isInUnlock = false;
        this.unlockList = []; // [type, id] ex: ["Move", PunchingPP]
        this.unlockFrame = null;
        this.unlockTitle = null;
        this.unlockDesc = null;

        this.mainObj = null; // rainbow tint
        this.mainObjTint = 0;
        this.forceTint = [];

        this.loadingText = null;
    }

    getAllObjects() {
        for (var i = this.allTextObjects.length - 1; i >= 0; i--) {
    		if (!this.allTextObjects[i].active) {
                this.allTextObjects.splice(i, 1);
    		}
    	}
        for (var i = this.allImageObjects.length - 1; i >= 0; i--) {
    		if (!this.allImageObjects[i].active) {
                this.allImageObjects.splice(i, 1);
    		}
    	}
        return this.allTextObjects.concat(this.allImageObjects)
    }

    loadImage(_image, _name = _image.substring(0, _image.length - 4)) {
        return this.load.image(_name.replace(/ /g,''), "resources/images/" + _image.replace(/ /g,''));
    }
    addImage(_name, _x, _y) {
        return this.addImageMiddle(_name, _x, _y).setOrigin(0, 0);
    }
    addImageMiddle(_name, _x, _y) {
        Logger.log(_name.replace(/ /g,''), "sceneAddStuff")
        var obj = this.add.image(_x, _y, _name.replace(/ /g,''));
        this.allImageObjects.push(obj);
        return obj
    }
    getImage(_name) {
        Logger.log(_name.replace(/ /g,''), "sceneAddStuff")
        return this.textures.get(_name.replace(/ /g,'')).getSourceImage();
    }

    loadMusic(_audio, _name = _audio.substring(0, _audio.length - 4)) {
        var l = [];
        l.push("resources/music/" + _audio.replace(/ /g,''));
        return this.load.audio(_name.replace(/ /g,''), l);
    }
    playMusic(_name, _loop = true, _distantMusic = false) {
        if (DISABLE_MUSIC) return;
        if (this.musicPlayer != null) {
            this.musicPlayer.stop()
        }
        var config = {
            mute: false,
            rate: 1,
            detune: 0,
            seek: 0,
            delay:0
        }
        config["loop"] = _loop;
        config["volume"] = GlobalVars.get("settings")["musicVolume"]/100;
        if (_distantMusic) {
            config["volume"] = config["volume"]/3;
        }
        if (Scene.musicTimers[_name.replace(/ /g,'')] != undefined && !_name.replace(/ /g,'').includes("_victory")) {
            config["seek"] = Scene.musicTimers[_name.replace(/ /g,'')];
        }
        this.musicPlayer = this.sound.add(_name.replace(/ /g,''));
        this.currentMusic = _name.replace(/ /g,'');
        this.musicPlayer.play(config);
    }
    resetMusicTimers() {
        if (DISABLE_MUSIC) return;
        Scene.musicTimers = {};
    }
    stopMusic() {
        if (DISABLE_MUSIC) return;
        Scene.musicTimers[this.currentMusic] = this.musicPlayer.seek;
        this.musicPlayer.stop();
    }
    musicFadeOut() {
        if (DISABLE_MUSIC) return;
        var sound = this.musicPlayer;
        this.tweens.add({
            targets:  sound,
            volume:   0,
            duration: 10000
        });
    }
    loadSound(_audio, _name = _audio.substring(0, _audio.length - 4)) {
        var l = [];
        l.push("resources/sounds/" + _audio.replace(/ /g,''));
        return this.load.audio(_name.replace(/ /g,''), l);
    }
    playSound(_name) {
        var config = {};
        config["volume"] = GlobalVars.get("settings")["soundsVolume"]/100;
        for (var i in this.soundList) {
            if (i == _name.replace(/ /g,'')) {
                return this.soundList[i].play(config);
            }
        }
        this.soundList[_name.replace(/ /g,'')] = this.sound.add(_name.replace(/ /g,''));
        return this.playSound(_name);
    }

    playSoundSelect() {
        return this.playSound("ui/select");
    }
    playSoundOK() {
        return this.playSound("ui/ok");
    }
    playSoundError() {
        return this.playSound("ui/error");
    }

    addText(_text, _x, _y, _json = null, _speed = null) {
        Logger.log(_text, "sceneAddStuff")

        if (_json == null) {
            _json = {};
        }
        if (!("fontSize" in _json)) {
            _json["fontSize"] = '24px';
        }
        var obj = new TextDict(this, _x, _y, _text, _json, _speed);
        this.add.existing(obj);
        this.allTextObjects.push(obj);
        return obj;
    }

    executeQuery(_str, _queryID = null) { // DEPRECATED
        throw "Tried to use executeQuery. This shouldn't be used anymore, or only for testing purposes."

        var _scene = this;
        var _function = this.recieveQuery;

        Logger.log(_queryID + " / " + _str, "queries")

        DB_CONNECTION.query(_str, (_error, _result) => {
            if (_error) {
                Logger.warning("QUERY ERROR ON " + _queryID, _error);

                QUERY_RESULT = _error;
                throw _error;
            }

            if (_scene == CURRENT_SCENE) _function(_result, _queryID, _scene);
        });

        // HOW TO USE:
        // have a recieveQuery(_results, _queryID) function in your scene
        // _queryID helps knowing what was the purpose of the query, so the function could have a switch:case for each queryID
    }
    sendQuery(_str, _queryID = null, _param = {}) {
        // HOW TO USE:
        // have a recieveQuery(_results, _queryID) function in your scene
        // _queryID helps knowing what was the purpose of the query, so the function could have a switch:case for each queryID

        var _scene = this;
        var _function = this.recieveQuery;
        _param["version"] = GAME_VERSION;
        _param["password"] = SERVER_PASSWORD;

        var _headers = new Headers();
        _headers.append("Content-Type", "application/json");

        var requestOptions = {
          method: 'POST',
          headers: _headers,
          body: JSON.stringify(_param),
          redirect: 'follow'
        };

        fetch(SERVER_URL + _str, requestOptions)
          .then(_result => {
                _result.text().then(
                    _finalResult => {
                        if (_finalResult[0] == "<") {
                            // error :(
                            Logger.warning("Error on " + _str, _finalResult);
                            return;
                        }

                        var fixedResult = _finalResult.split('\\"').join('"').split('\\"').join('"').split('\\"').join('"')
                        fixedResult = fixedResult.split('"{').join('{').split('}"').join('}')
                        try {
                            var result = JSON.parse(fixedResult);
                            _function(result, _queryID, _scene)
                        }
                        catch(e) {
                            Logger.warning("Error on: " + fixedResult, e)
                        }
                    }
                )
          })
          .then(a => {})
          .catch(error => Logger.warning('error', error));
    }

    loadMovesImages() {
        for (var i in REGULAR_MOVE_LIST) {
            this.loadImage("ui/battle/moves/" + REGULAR_MOVE_LIST[i].newInstance().name + ".png");
        }
    }
    loadBattleAnimations() {
        // might come back some day?
    }
    loadStatusIcons() {
        this.loadImage("status/bleedDamage.png");
        this.loadImage("status/highFive.png");
        this.loadImage("status/exam.png");
        this.loadImage("status/muscle.png");
        this.loadImage("status/pig.png");
        this.loadImage("status/redpill.png");
        this.loadImage("status/boomerang.png");
        this.loadImage("status/turkeyA.png");
        this.loadImage("status/turkeyB.png");
        this.loadImage("status/extraLife.png");
        this.loadImage("status/cowboy.png");
        this.loadImage("status/eldritch.png");
        this.loadImage("status/boner.png");
        this.loadImage("status/salt.png");
        this.loadImage("status/shield.png");
        this.loadImage("status/silence.png");
        this.loadImage("status/kamui.png");
        this.loadImage("status/lifeFiber.png");
        this.loadImage("status/confusion.png");
        this.loadImage("status/trapSign.png");
        this.loadImage("status/possessed.png");
        this.loadImage("status/luck.png");
        this.loadImage("status/badLuck.png");
        this.loadImage("status/livingGod.png");
        this.loadImage("status/blind.png");
        this.loadImage("status/madness.png");
        this.loadImage("status/bleachEmpty.png");
        this.loadImage("status/bleachFull.png");
        this.loadImage("status/acidArmor.png");
        this.loadImage("status/curse.png");
        this.loadImage("status/troll.png");
        this.loadImage("status/scalyScars.png");
        this.loadImage("status/blueFire.png");
        this.loadImage("status/regularChargeTimer.png");
        this.loadImage("status/specialChargeTimer.png");

        this.loadImage("status/other/depression.png");
        this.loadImage("status/other/fungus.png");
        this.loadImage("status/other/offensive.png");
        this.loadImage("status/other/defensive.png");
        this.loadImage("status/other/scary.png");
        this.loadImage("status/other/faithShield.png");
        this.loadImage("status/other/inquisitor.png");
        this.loadImage("status/other/armor.png");
        this.loadImage("status/other/specialArmor.png");
        this.loadImage("status/other/godOfDeath.png");
        this.loadImage("status/other/promotionPawn.png");
        this.loadImage("status/other/promotionRook.png");
        this.loadImage("status/other/promotionQueen.png");
        this.loadImage("status/other/promotionBishop.png");
        this.loadImage("status/other/promotionKnight.png");
        this.loadImage("status/other/promotionKing.png");

        this.loadImage("status/special/killerBlessing.png");
        this.loadImage("status/special/waifuDetermination.png");
        this.loadImage("status/special/death.png");
        this.loadImage("status/special/regularCharge.png");
        this.loadImage("status/special/specialCharge.png");
    }

    loadUiSounds() {
        this.loadSound("ui/confirmation.ogg");
        this.loadSound("ui/error.ogg");
        this.loadSound("ui/ok.ogg");
        this.loadSound("ui/select.ogg");
        this.loadSound("ui/switch.ogg");
    }
    loadBattleSounds() {
        this.loadSound("battle/event.mp3");
        this.loadSound("battle/lightning.mp3");

        this.loadSound("battle/heal.mp3");
        this.loadSound("battle/hurtA.mp3");
        this.loadSound("battle/hurtB.mp3");
        this.loadSound("battle/extraLife.mp3");
        this.loadSound("battle/soul_hurt.mp3");
        this.loadSound("battle/hurtA_demon.mp3");
        this.loadSound("battle/hurtA_alien.mp3");

        this.loadSound("battle/punchA.mp3");
        this.loadSound("battle/punchB.mp3");
        this.loadSound("battle/punchBig.mp3");
        this.loadSound("battle/protect.mp3");
        this.loadSound("battle/cut.mp3");
        this.loadSound("battle/darkMagic.mp3");
        this.loadSound("battle/flex.mp3");
        this.loadSound("battle/mmh.mp3");
        this.loadSound("battle/hey.mp3");
        this.loadSound("battle/ohYeahDouble.mp3");
        this.loadSound("battle/explosion.mp3");
        this.loadSound("battle/gun.mp3");
        this.loadSound("battle/woohoo.mp3");
        this.loadSound("battle/jesus.mp3");
        this.loadSound("battle/yeehaw.mp3");
        this.loadSound("battle/ghostSound.mp3");
        this.loadSound("battle/woodcut.mp3");
        this.loadSound("battle/thisSucks.mp3");
        this.loadSound("battle/guitarSolo.mp3");
        this.loadSound("battle/ohYeah.mp3");
        this.loadSound("battle/scream.mp3");
        this.loadSound("battle/salt.mp3");
        this.loadSound("battle/staple.mp3");
        this.loadSound("battle/laugh.mp3");
        this.loadSound("battle/cry.mp3");
        this.loadSound("battle/acid.mp3");
        this.loadSound("battle/drink.mp3");
        this.loadSound("battle/flames.mp3");

        this.loadSound("battle/uuh.mp3");
    }

    getInputKeyObj(_key) {
        if (_key == null) {
            if (Scene.keyboardDict["null"] == undefined) Scene.keyboardDict["null"] = this.input.keyboard.addKey(null);
            return this.getInputKeyObj("null")
        }
        for (var i in Scene.keyboardDict) {
            if (i == _key) return Scene.keyboardDict[_key];
        }
        Scene.keyboardDict[_key] = this.input.keyboard.addKey(_key);
        return this.getInputKeyObj(_key)
    }
    isPressingKey(_key, _duration = 0) {
        if (ControlManager.GAMEPAD == null) {
            ControlManager.GAMEPAD = this.input.gamepad.gamepads[0];
        }
        else {
            if (this.gamepadTimer > 0) {
                this.gamepadTimer -= 1;
                return false;
            }
            for (var i in ControlManager.GAMEPAD_CONTROLS) {
                if (i == _key && ControlManager.GAMEPAD[ControlManager.GAMEPAD_CONTROLS[i]]) {
                    this.gamepadTimer = _duration;
                    return true;
                }
            }
            return false;
        }

        if (_duration <= 0) {
            return this.getInputKeyObj(_key).isDown;
        }
        return this.input.keyboard.checkDown(this.getInputKeyObj(_key), _duration);
    }
    justPressedKey(_key) {
        return this.isPressingKey(_key, 1000);
    }

    isPressingControl(_controlName, _duration = 0) {
        return this.isPressingKey(ControlManager.getKeyControl(_controlName), _duration) || this.isPressingKey(ControlManager.getForcedKeyControl(_controlName), _duration);
    }
    justPressedControl(_controlName) {
        if (this.isMaintainingKeyMemory == _controlName) {
            if (this.isMaintainingKey) {
                if (this.isPressingControl(_controlName, 80)) {
                    this.keyTimer = 0;
                    return true;
                }
                this.increaseControlTimer(_controlName);
                return false;
            }
            if (this.isPressingControl(_controlName) && this.isPressingControl(_controlName, 500)) {
                this.isMaintainingKey = true;
                return false;
            }
            this.increaseControlTimer(_controlName);
        }
        if (this.isPressingControl(_controlName, 1000)) {
            this.isMaintainingKeyMemory = _controlName;
            this.isMaintainingKey = false;
            this.keyTimer = 0;
            return true;
        }
        return false;
    }
    increaseControlTimer(_controlName) {
        if (!this.isPressingControl(_controlName)) this.keyTimer += 1;
        if (this.keyTimer >= 5) {
            this.isMaintainingKeyMemory = null;
            this.isMaintainingKey = false;
            this.keyTimer = 0;
        }
    }

    startLoadingScreen() {
        CURRENT_SCENE = this;

        var txt = "LOADING...";
        if (getRandomPercent() <= 1) txt = "¯\\_(ツ)_/¯";
        this.loadingText = this.addText(txt, 1000, 650, {fontStyle: 'bold', fontSize: '30px'});
    }
    stopLoadingScreen() {
        this.loadingText.destroy();
        this.loadingText = null;

        if (!CHECK_STEAM() && SHOW_STEAM_ERROR) {
            this.openDialogue(48);
            SHOW_STEAM_ERROR = false;
        }
    }

    switchScene(_sceneName, _data) {
        if (this.musicPlayer != null) {
            this.stopMusic();
        }
        if (this.isInOptions) {
            this.closeOptions();
        }

        Scene.keyboardDict = {};
        this.mainObj = null;
        this.mainObjTint = 0;
        this.forceTint = [];

        try {
            GREENWORKS.setStat("COMP_AREAS", ProgressManager.getNbCompletedAreas());
            GREENWORKS.storeStats(
                function(_idk) {
                    if (ProgressManager.getNbCompletedAreas() >= 13) {
                        AchievementManager.unlockAchievement(9); // World Tour
                    }
                },
                function(_err) {
                    console.log(_err)
                }
            );
        }
        catch(e) {}

        Logger.log("Switched scene to '" + _sceneName + "'", "switchScene");

        return this.scene.start(_sceneName, _data);
    }
    closeGame() {
        //DB_CONNECTION.end((err) => {});
        window.close();
    }

    updateTint() {
        this.mainObjTint += 1;
        if (this.mainObjTint == 360) this.mainObjTint = 0;
        if (this.mainObj != null) {
            this.mainObj.clearTint();
        }
        this.mainObj = this.getMainObj(); // override this
        if (this.mainObj != null) {
            this.mainObj.setTint(Phaser.Display.Color.HSVColorWheel()[this.mainObjTint].color);
        }

        for (var i in this.forceTint) {
            this.forceTint[i].setTint(Phaser.Display.Color.HSVColorWheel()[(this.mainObjTint + Math.floor((i+1)/(this.forceTint.length*2)*360))%360].color);
        }
    }
    addToForceTint(_textObj) {
        this.forceTint.push(_textObj);
    }
    getMainObj() { return null; } // override this to return the text object to tint, needs to have updateTint in the loop

    loadDialogueResources() {
        this.loadImage("ui/other/dialogue_frame.png");
    }
    openDialogue(_dialogueId) {
        this.isInDialogue = true;

        this.currentDialogue = DialogueManager.getDialogue(_dialogueId);
        this.currentLine = 0;

        if (!this.isInBible) {
            this.optionBlackScreen = this.addImage("ui/blackScreen");
            this.optionBlackScreen.setAlpha(0.5);
        }

        this.dialogueFrame = this.addImage("ui/other/dialogue_frame", 0, 675-200);
        this.dialogueSpeakerObj = this.addText("", 12, 675-200+12, {fontStyle: 'bold'});
        this.dialogueObj = this.addText("", 12, 675-200+60, { wordWrap: {width: 1200-24, height: 140-12}}, getTextSpeed());

        var line = this.currentDialogue.getLine(this.currentLine);
        this.dialogueSpeakerObj.setText(line.speaker);
        this.dialogueObj.setText(line.text);

        if (this.sceneName == "Cutscene") this.optionBlackScreen.setAlpha(0);

        if (this.autoSkipSpeed == undefined) {
            this.autoSkipSpeed = 30;
            this.autoSkipCountdown = this.autoSkipSpeed;
            this.autoSkipNb = 0;
        }
    }
    closeDialogue() {
        this.isInDialogue = false;

        if (!this.isInBible) {
            this.optionBlackScreen.destroy();
            this.optionBlackScreen = null;
        }

        this.currentDialogue = null;
        this.currentLine = 0;

        this.dialogueFrame.destroy();
        this.dialogueFrame = null;
        this.dialogueObj.destroy();
        this.dialogueObj = null;
        this.dialogueSpeakerObj.destroy();
        this.dialogueSpeakerObj = null;
    }
    dialogueUpdate() {
        this.dialogueObj.nextFrame();

        if ((GlobalVars.get("settings")["battleAutoNext"] || this.sceneName == "MultiplayerBattle") && this.dialogueObj.isShowingFullText()) {
            this.autoSkipCountdown -= 0.125;
        }

        if (this.justPressedControl("ENTER") || this.autoSkipCountdown <= 0) {
            if (!this.dialogueObj.isShowingFullText()) {
                return this.dialogueObj.showFullText();
            }

            this.autoSkipNb += 1;
            this.autoSkipCountdown = Math.max(1, this.autoSkipSpeed - this.autoSkipNb);
            if (this.sceneName == "Battle" || this.sceneName == "MultiplayerBattle") this.duel.logTextObject.speed = getTextSpeed() - Math.floor(this.autoSkipNb/7);

            this.currentLine += 1;
            this.dialogueObj.resetCursor();
            this.playSoundOK();

            if (this.currentLine >= this.currentDialogue.dialogueLines.length) {
                return this.closeDialogue();
            }

            var line = this.currentDialogue.getLine(this.currentLine);
            if (line.speaker != undefined) {
                this.dialogueSpeakerObj.setText(line.speaker);
            }
            this.dialogueObj.setText(line.text);
        }
        else if (this.justPressedControl("MENU")) {
            return this.closeDialogue();
        }

        this.updateTint();
    }

    loadUnlockResources() {
        this.loadImage("ui/other/unlock_frame.png");
        this.loadSound("ui/unlock.mp3")
    }
    checkUnlock() {
        this.checkSpecialUnlocks();

        if (GlobalVars.get("unlocksNext").length > 0) {
            var q = QuestManager.getQuest(GlobalVars.get("unlocksNext")[0]);
            var s = q.getStep(GlobalVars.get("unlocksNext")[1]);

            // unlock screen
            this.addUnlocksFromStep(s);

            GlobalVars.set("unlocksNext", []);
        }
    }
    addUnlocksFromStep(s, _bought = false) {
        if (s.unlockGameMechanics != undefined) {
            for (var i in s.unlockGameMechanics) {
                this.unlockList.push(["Game Mechanic", s.unlockGameMechanics[i], _bought])
            }
        }
        if (s.unlockPartyMembers != undefined) {
            for (var i in s.unlockPartyMembers) {
                this.unlockList.push(["Party Member", s.unlockPartyMembers[i], _bought])
            }
        }
        if (s.unlockAreas != undefined) {
            for (var i in s.unlockAreas) {
                this.unlockList.push(["Area", s.unlockAreas[i], _bought])
            }
        }
        if (s.unlockFightingStyles != undefined) {
            for (var i in s.unlockFightingStyles) {
                this.unlockList.push(["Fighting Style", s.unlockFightingStyles[i], _bought])
            }
        }
        if (s.unlockRelics != undefined) {
            for (var i in s.unlockRelics) {
                this.unlockList.push(["Relic", s.unlockRelics[i], _bought])
            }
        }
        if (s.unlockMoves != undefined) {
            for (var i in s.unlockMoves) {
                this.unlockList.push(["Move", s.unlockMoves[i], _bought])
            }
        }
        if (s.unlockEvents != undefined) {
            for (var i in s.unlockEvents) {
                this.unlockList.push(["Event", s.unlockEvents[i], _bought])
            }
        }
        if (s.unlockGods != undefined) {
            for (var i in s.unlockGods) {
                this.unlockList.push(["God", s.unlockGods[i], _bought])
            }
        }

        if (s.saveWaifu != undefined) {
            this.unlockList.push(["Waifu", s.saveWaifu]);
        }

        if (s.unlockArtworks != undefined) {
            for (var i in s.unlockArtworks) {
                this.unlockList.push(["Artwork", s.unlockArtworks[i], _bought])
            }
        }
    }
    checkSpecialUnlocks() {
        // Move Preferences
        if (ProgressManager.getTotalNbOfUnlocks() >= 25 && !ProgressManager.isStepCompleted(0, 3)) {
            ProgressManager.unlockStep(0, 3);
            this.unlockList.push(["Game Mechanic", "Move Preferences"]);
        }
        // NG+
        if (QuestManager.readyForNGP() && !ProgressManager.isStepCompleted(0, 5)) {
            return; // REMOVE THAT FOR NG+
            ProgressManager.unlockStep(0, 5);
        }

        // Shop
        try {
            var lastShopUnlock = ProgressManager.getCompletedSteps(34).length;
            var step = QuestManager.getStep(34, lastShopUnlock)
            if (step.ppCoinsPrice <= ProgressManager.getValue("PP_Coins")) {
                ProgressManager.unlockStep(34, lastShopUnlock);
                this.addUnlocksFromStep(step, true);
                ProgressManager.setValue("PP_Coins", ProgressManager.getValue("PP_Coins")-step.ppCoinsPrice);
            }
        }
        catch(e) {}
    }
    openUnlock() {
        this.isInUnlock = true;

        this.optionBlackScreen = this.addImage("ui/blackScreen");
        this.optionBlackScreen.setAlpha(0.5);

        this.unlockFrame = this.addImage("ui/other/unlock_frame", 404, 100);
        this.unlockTitle = this.addText("", 404+12, 100+14);
        this.unlockDesc = this.addText("", 404+12, 100+55, {wordWrap: {width: 400, height: 550}});

        this.playSound("ui/unlock");
        this.updateUnlockDesc();
    }
    closeUnlock() {
        this.isInUnlock = false;

        this.optionBlackScreen.destroy();
        this.optionBlackScreen = null;

        this.unlockFrame.destroy();
        this.unlockFrame = null;
        this.unlockTitle.destroy();
        this.unlockTitle = null;
        this.unlockDesc.destroy();
        this.unlockDesc = null;
    }
    unlockUpdate() {
        if (this.justPressedControl("ENTER") || this.justPressedControl("MENU")) {
            this.unlockList.splice(0, 1);

            if (this.unlockList.length <= 0) {
                return this.closeUnlock();
            }
            this.playSound("ui/unlock");

            this.updateUnlockDesc();
        }

        this.updateTint();
    }
    updateUnlockDesc() {
        var unlockType = this.unlockList[0][0];
        var unlock = this.unlockList[0][1];
        var bought = this.unlockList[0][2];
        if (bought) bought = "\n\nBought from the Weeb Shop.";
        else bought = "";

        if (unlockType == "Waifu") {
            this.unlockTitle.setText(unlockType + " Saved");
            this.unlockDesc.setText(GodManager.getGod(unlock).name + "\n\n" + GodManager.getGod(unlock).description[0]);
            return;
        }

        this.unlockTitle.setText(unlockType + " Unlocked");
        switch(unlockType) {
            case "Party Member":
                this.unlockDesc.setText(unlock + "\n\n" + PartyManager.getHeroDescription(unlock) + bought);
                break;
            case "Game Mechanic":
                this.unlockDesc.setText(unlock + "\n\n" + ProgressManager.getMechanicDescription(unlock) + bought);
                break;
            case "Move":
                this.unlockDesc.setText(unlock.newInstance().getDescription() + bought);
                break;
            case "Area":
                this.unlockDesc.setText(AreaManager.getArea(unlock).name + "\n\n" + AreaManager.getArea(unlock).description + bought);
                break;
            case "Fighting Style":
                this.unlockDesc.setText(unlock + "\n\n" + FightingStyles.getDesc(unlock) + bought);
                break;
            case "Event":
                this.unlockDesc.setText(EventManager.getEvent(unlock).getDescription() + bought);
                break;
            case "God":
                this.unlockDesc.setText(GodManager.getGod(unlock).name + "\n" + GodManager.getGod(unlock).getDescription() + bought);
                break;
            case "Artwork":
                this.unlockDesc.setText(ArtworkManager.getArtwork(unlock).getDescription() + bought);
                break;
            case "Relic":
                this.unlockDesc.setText(RelicManager.getRelic(unlock).getDescription(true) + bought);
                break;
        }
    }

    openCutscene(_id) {
        this.switchScene("Cutscene", CUTSCENE_LIST[_id])
    }

    loadPartyResources() {
        this.loadImage("ui/other/party_frame.png");
    }
    openParty() {
        this.isInParty = true;

        this.optionBlackScreen = this.addImage("ui/blackScreen");
        this.optionBlackScreen.setAlpha(0.5)

        this.bibleFrame = this.addImage("ui/other/party_frame", 50, 25);
        this.bibleTitle = this.addText("PARTY MEMBERS", 65, 38, {fontStyle: 'bold'});
        this.bibleDescriptionTitle = this.addText("DESCRIPTION", 759, 84, {fontStyle: 'bold'});
        this.bibleDescription = this.addText("", 759, 130, {fontSize: '21px', wordWrap: {width: 400, height: 550}});

        var l = ProgressManager.getUnlockedPartyMembers();
        for (var i in l) {
            this.bibleTextsA.push(this.addText(l[i].name, 85, 84+22*this.bibleTextsA.length));
        }

        this.cursorA = new CustomCursor(
            this.addText(">", 65, -1000),
            "vertical",
            this.bibleTextsA
        );
        this.cursorA.setFormula(84, 22, 84);
        this.cursorB = new CustomCursor(
            this.addText(">", 400-20, -1000),
            "vertical",
            this.bibleTextsB
        );
        this.cursorB.setFormula(84, 22, 84);
        this.cursorB.setForcedLength(25);

        this.bibleStep = 0;

        // base description
        this.bibleDescription.setText(ProgressManager.getUnlockedPartyMembers()[this.cursorASelect].getDescription());
        this.partyUpdateDesc();
    }
    closeParty() {
        this.isInParty = false;

        this.optionBlackScreen.destroy();
        this.optionBlackScreen = null;

        this.bibleFrame.destroy();
        this.bibleFrame = null;
        this.bibleTitle.destroy();
        this.bibleTitle = null;
        this.bibleDescriptionTitle.destroy();
        this.bibleDescriptionTitle = null;
        this.bibleDescription.destroy();
        this.bibleDescription = null;

        this.cursorA.destroy();
        this.cursorA = null;
        this.cursorB.destroy();
        this.cursorB = null;

        for (var i in this.bibleTextsA) this.bibleTextsA[i].destroy();
        this.bibleTextsA = [];
        for (var i in this.bibleTextsB) this.bibleTextsB[i].destroy();
        this.bibleTextsB = [];

        this.playSoundSelect();
    }
    partyUpdate() {
        if (this.bibleStep == 0) {
            if (this.justPressedControl("UP")) {
                this.cursorA.goUp();
                this.playSoundOK();
            }
            else if (this.justPressedControl("DOWN")) {
                this.cursorA.goDown();
                this.playSoundOK();
            }

            if (this.cursorA.update()) {
                this.partyUpdateDesc();
            }

            if (this.justPressedControl("ENTER") || this.justPressedControl("RIGHT")) {
                this.bibleStep = 1;
                this.cursorBSelect = 0;
                this.partyUpdateDesc();
                this.playSoundSelect();
            }
        }
        else {
            if (this.justPressedControl("UP")) {
                this.cursorB.goUp();
                this.playSoundOK();
            }
            else if (this.justPressedControl("DOWN")) {
                this.cursorB.goDown();
                this.playSoundOK();
            }

            if (this.cursorB.update()) {
                this.partyUpdateDesc();
            }

            if (this.justPressedControl("ENTER")) {
                var pm = ProgressManager.getUnlockedPartyMembers()[this.cursorA.getCurrentSelect()];

                if (this.partyIsOnFightingStyles()) {
                    var fs = ProgressManager.getUnlockedFightingStyles()[this.cursorB.getCurrentSelect()];

                    if (pm.fightingStyles.indexOf(fs) > -1) {
                        pm.fightingStyles.splice(pm.fightingStyles.indexOf(fs), 1);
                    }
                    else {
                        pm.fightingStyles.push(fs);
                    }
                }
                else if (this.partyIsOnGods()) {
                    var god = ProgressManager.getUnlockedGods()[this.cursorB.getCurrentSelect() - ProgressManager.getUnlockedFightingStyles().length-1].name;

                    if (pm.gods.indexOf(god) > -1) {
                        pm.gods.splice(pm.gods.indexOf(god), 1);
                    }
                    else if (pm.gods.length < ProgressManager.getNbGodSlots()) {
                        pm.gods.push(god);
                    }
                }

                PartyManager.updateLocalStorage();
                this.partyUpdateDesc();
                this.playSoundSelect();
            }

            if (this.justPressedControl("BACK") || this.justPressedControl("LEFT")) {
                this.bibleStep = 0;
                this.cursorB.obj.setY(-1000); // hide cursorB
                this.cursorB.currentSelect = 0;
                this.cursorB.currentOffset = 0;
                this.partyUpdateDesc();
                this.playSoundSelect();
            }
        }

        if (this.justPressedControl("MENU") || (this.justPressedControl("BACK") && this.bibleStep == 0)) {
            return this.closeParty();
        }
    }
    partyUpdateDesc() {
        var partyMember = ProgressManager.getUnlockedPartyMembers()[this.cursorA.getCurrentSelect()];
        var desc = partyMember.getDescription();
        if (this.bibleStep != 0) {
            if (this.partyIsOnFightingStyles()) {
                var fs = ProgressManager.getUnlockedFightingStyles()[this.cursorB.getCurrentSelect()];
                desc = partyMember.getDescription("fs");
                desc += "\n\n" + fs + ":\n" + FightingStyles.getDesc(fs);
            }
            else if (this.partyIsOnGods()) {
                var god = ProgressManager.getUnlockedGods()[this.cursorB.getCurrentSelect() - ProgressManager.getUnlockedFightingStyles().length-1];
                desc = partyMember.getDescription("gods");
                desc += "\n\n" + god.name + "\n" + god.getDescription();
            }
        }
        this.bibleDescription.setText(desc);

        for (var i in this.bibleTextsB) this.bibleTextsB[i].destroy();
        this.bibleTextsB = [];

        var l = [];
        if (ProgressManager.getUnlockedGameMechanics().indexOf("Fighting Styles") > -1) {
            l = l.concat(ProgressManager.getUnlockedFightingStyles());
        }
        var gods = ProgressManager.getUnlockedGods();
        if (gods.length > 0) {
            l.push(""); // visual space
            for (var i in gods) {
                l.push(gods[i].name);
            }
        }
        for (var i in l) {
            this.bibleTextsB.push(this.addText(l[i], 400, 84+22*i))
        }
        this.cursorB.objList = this.bibleTextsB;
        this.cursorB.updateObjList();
    }
    partyIsOnFightingStyles() {
        if (this.bibleStep == 0) return false;
        return this.cursorB.getCurrentSelect() >= 0 && this.cursorB.getCurrentSelect() < ProgressManager.getUnlockedFightingStyles().length;
    }
    partyIsOnGods() {
        if (this.bibleStep == 0) return false;
        return this.cursorB.getCurrentSelect() > ProgressManager.getUnlockedFightingStyles().length && this.cursorB.getCurrentSelect() <= ProgressManager.getUnlockedFightingStyles().length + ProgressManager.getUnlockedGods().length;
    }

    loadBibleResources() {
        this.loadImage("ui/other/bible_frame.png");
    }
    openBible() {
        this.isInBible = true;

        this.optionBlackScreen = this.addImage("ui/blackScreen");
        this.optionBlackScreen.setAlpha(0.5)

        this.bibleFrame = this.addImage("ui/other/bible_frame", 50, 25);
        this.bibleTitle = this.addText("PP BIBLE", 65, 38, {fontStyle: 'bold'});
        this.bibleDescriptionTitle = this.addText("DESCRIPTION", 759, 84, {fontStyle: 'bold'});
        this.bibleDescription = this.addText("", 759, 130, {fontSize: '21px', wordWrap: {width: 400, height: 550}});

        var l = ["Game Mechanics", "Moves", "Party Members", "Fighting Styles", "Events", "Gods", "Synergies", "Relics", "Stånds"];
        var unlocks = ProgressManager.getUnlockedGameMechanics();
        for (var i in l) {
            if (unlocks.indexOf(l[i]) < 0) continue;
            this.bibleTextsA.push(this.addText(l[i], 85, 84+22*this.bibleTextsA.length));
        }
        this.bibleTextsA.push(this.addText("Artworks", 85, 84+22*this.bibleTextsA.length)); // toujours en avant-dernier
        this.bibleTextsA.push(this.addText("Achievements", 85, 84+22*this.bibleTextsA.length)); // toujours en dernier

        this.cursorA = new CustomCursor(
            this.addText(">", 65, -1000),
            "vertical",
            this.bibleTextsA
        );
        this.cursorA.setFormula(84, 22, 84);
        this.cursorB = new CustomCursor(
            this.addText(">", 400-20, -1000),
            "vertical",
            this.bibleTextsB
        );
        this.cursorB.setFormula(84, 22, 84);
        this.cursorB.setForcedLength(25);

        this.bibleStep = 0;

        this.bibleArtwork = null;
        this.artworkBlackScreen = null;

        this.bibleDescription.setText("All the game mechanics you know about!");
        l = ProgressManager.getUnlockedGameMechanics();
        for (var i in l) {
            this.bibleTextsB.push(this.addText(ProgressManager.getUnlockedGameMechanics()[i], 400, 84+22*i))
        }
    }
    closeBible() {
        this.isInBible = false;

        this.optionBlackScreen.destroy();
        this.optionBlackScreen = null;

        this.bibleFrame.destroy();
        this.bibleFrame = null;
        this.bibleTitle.destroy();
        this.bibleTitle = null;
        this.bibleDescriptionTitle.destroy();
        this.bibleDescriptionTitle = null;
        this.bibleDescription.destroy();
        this.bibleDescription = null;

        this.cursorA.destroy();
        this.cursorA = null;
        this.cursorB.destroy();
        this.cursorB = null;

        this.bibleResetArtwork()

        for (var i in this.bibleTextsA) this.bibleTextsA[i].destroy();
        this.bibleTextsA = [];
        for (var i in this.bibleTextsB) this.bibleTextsB[i].destroy();
        this.bibleTextsB = [];

        this.playSoundSelect();
    }
    bibleUpdate() {
        if (this.bibleStep == 0) {
            if (this.justPressedControl("UP")) {
                this.cursorA.goUp();
                this.playSoundOK();
            }
            else if (this.justPressedControl("DOWN")) {
                this.cursorA.goDown();
                this.playSoundOK();
            }

            if (this.cursorA.update()) {
                this.bibleUpdateDesc();
            }

            if (this.justPressedControl("ENTER") || this.justPressedControl("RIGHT")) {
                if (this.bibleTextsB.length > 0) {
                    this.bibleStep = 1;
                    this.cursorBSelect = 0;
                    this.bibleUpdateDesc();
                    this.playSoundSelect();
                }
            }
        }
        else {
            if (this.justPressedControl("UP")) {
                this.cursorB.goUp();
                this.playSoundOK();
            }
            else if (this.justPressedControl("DOWN")) {
                this.cursorB.goDown();
                this.playSoundOK();
            }

            if (this.cursorB.update()) {
                this.bibleUpdateDesc();
            }

            if (this.justPressedControl("BACK") || this.justPressedControl("LEFT")) {
                if (this.bibleArtwork != null) {
                    this.bibleResetArtwork();
                    this.playSoundOK();
                    return;
                }

                this.bibleStep = 0;
                this.cursorB.obj.setY(-1000); // hide cursorB
                this.cursorB.currentSelect = 0;
                this.cursorB.currentOffset = 0;
                this.bibleUpdateDesc();
                this.playSoundSelect();
            }

            if (this.justPressedControl("ENTER")) {
                if (this.bibleArtwork != null) {
                    this.bibleResetArtwork();
                    this.playSoundOK();
                }
                else if ((this.sceneName == "Battle" || this.sceneName == "MultiplayerBattle") && this.duel.duelState == "moveChoice" && this.cursorA.getCurrentObject().text == "Moves") {
                    this.selectMove(ProgressManager.getUnlockedMoves()[this.cursorB.getCurrentSelect()]);
                    this.closeBible();
                    if (!ProgressManager.isStepCompleted(0, 1)) {
                        this.openDialogue(18);
                        ProgressManager.unlockStep(0, 1);
                        this.unlockList.push(["Game Mechanic", "Cheating"])
                    }
                    AchievementManager.unlockAchievement(6); // Hacking to the Game
                    return;
                }
                else if (ProgressManager.isStepCompleted(0, 3) && this.cursorA.getCurrentObject().text == "Moves") {
                    var move = ProgressManager.getUnlockedMoves()[this.cursorB.getCurrentSelect()]
                    var pref = move.getPreference();
                    if (pref == 0) {
                        if (!ProgressManager.canAddNewMovePref()) return this.playSoundError();
                        move.setPreference(1);
                        this.bibleTextsB[this.cursorB.getCurrentSelect()].setText(move.newInstance().name + " (+)");
                        this.playSoundOK();
                    }
                    else if (pref == 1) {
                        move.setPreference(-1);
                        this.bibleTextsB[this.cursorB.getCurrentSelect()].setText(move.newInstance().name + " (-)");
                        this.playSoundOK();
                    }
                    else {
                        move.setPreference(0);
                        this.bibleTextsB[this.cursorB.getCurrentSelect()].setText(move.newInstance().name);
                        this.playSoundOK();
                    }
                }
                else if (this.sceneName == "Map" && this.cursorA.getCurrentObject().text == "Party Members") {
                    var dialogueLine = PartyManager.getHeroDialogueLine(ProgressManager.getUnlockedPartyMembers()[this.cursorB.getCurrentSelect()].name);
                    if (dialogueLine != null) {
                        this.playSoundOK();
                        this.openDialogue(dialogueLine);
                    }
                }
                else if (this.sceneName == "Map" && this.cursorB.getCurrentObject().text == "Multiplayer") {
                    this.closeBible();
                    return this.switchScene("Multiplayer");
                }
                else if (this.cursorA.getCurrentObject().text == "Artworks") {
                    var artwork = ProgressManager.getUnlockedArtworks()[this.cursorB.getCurrentSelect()];
                    this.artworkBlackScreen = this.addImage("ui/blackScreen");
                    this.artworkBlackScreen.setAlpha(0.5)
                    this.bibleArtwork = this.addImageMiddle(artwork.getFullPath().substring(0, artwork.getFullPath().length - 4), 600, 337);
                    this.playSoundOK();
                }
            }
        }

        if (this.justPressedControl("MENU") || (this.justPressedControl("BACK") && this.bibleStep == 0)) {
            return this.closeBible();
        }
    }
    bibleUpdateDesc() {
        if (this.bibleStep == 0) {
            var l = [];
            if (this.cursorA.getCurrentSelect() == this.bibleTextsA.length-1) {
                this.bibleDescription.setText("A list of all achievements you acquired. If different from steam achievements, try and connect to steam, and launch the game again.");
                var a = AchievementManager.ACHIEVEMENT_LIST;
                for (var i in a) l[i] = a[i].getName();
            }
            else if (this.cursorA.getCurrentSelect() == this.bibleTextsA.length-2) {
                // artworks
                this.bibleDescription.setText("Some random artworks of things you've come across.");
                var a = ProgressManager.getUnlockedArtworks();
                for (var i in a) l[i] = a[i].name;
            }
            else if (this.cursorA.getCurrentSelect() == 0) {
                this.bibleDescription.setText("All the game mechanics you know about!");
                var a = ProgressManager.getUnlockedGameMechanics();
                for (var i in a) l[i] = a[i];
            }
            else if (this.cursorA.getCurrentSelect() == 1) {
                this.bibleDescription.setText("All the different attacks you have access to!");
                var a = ProgressManager.getUnlockedMoves();
                for (var i in a) {
                    l[i] = a[i].newInstance().name;
                    if (a[i].getPreference() == 1) l[i] += " (+)";
                    else if (a[i].getPreference() == -1) l[i] += " (-)";
                }
            }
            else if (this.cursorA.getCurrentSelect() == 2) {
                this.bibleDescription.setText("All the people that makes your adventurers group!");
                var a = ProgressManager.getUnlockedPartyMembers();
                for (var i in a) l[i] = a[i].name;
            }
            else if (this.cursorA.getCurrentSelect() == 3) {
                this.bibleDescription.setText("Effects you can acquire during battle, or start with for every battle.");
                l = ProgressManager.getUnlockedFightingStyles();
            }
            else if (this.cursorA.getCurrentSelect() == 4) {
                this.bibleDescription.setText("Random Events that have a chance to occur every turn.");
                var a = ProgressManager.getUnlockedEvents();
                for (var i in a) l[i] = EventManager.getEvent(a[i]).name;
            }
            else if (this.cursorA.getCurrentSelect() == 5) {
                this.bibleDescription.setText("All the Gods you know you can worship.");
                var a = ProgressManager.getUnlockedGods();
                for (var i in a) l[i] = a[i].name;
            }
            else if (this.cursorA.getCurrentSelect() == 6) {
                this.bibleDescription.setText("All the Synergies between the Gods you have access to.");
                var a = ProgressManager.getUnlockedSynergies();
                for (var i in a) l[i] = a[i].name;
            }
            else if (this.cursorA.getCurrentSelect() == 7) {
                this.bibleDescription.setText("All the Relics you've acquired up until now!");
                var a = ProgressManager.getUnlockedRelics();
                for (var i in a) l[i] = a[i].name;
            }

            for (var i in this.bibleTextsB) this.bibleTextsB[i].destroy();
            this.bibleTextsB = [];
            for (var i in l) {
                this.bibleTextsB.push(this.addText(l[i], 400, 84+22*i))
            }

            this.cursorB.objList = this.bibleTextsB;
            this.cursorB.updateObjList();
            this.cursorB.obj.setY(-1000); // hide cursor
        }
        else {
            if (this.cursorA.getCurrentSelect() == this.bibleTextsA.length-1) {
                var a = AchievementManager.ACHIEVEMENT_LIST[this.cursorB.getCurrentSelect()];
                this.bibleDescription.setText(a.getDescription());
            }
            else if (this.cursorA.getCurrentSelect() == this.bibleTextsA.length-2) {
                // artworks
                var artwork = ProgressManager.getUnlockedArtworks()[this.cursorB.getCurrentSelect()];
                this.bibleDescription.setText(artwork.getDescription());
            }
            else if (this.cursorA.getCurrentSelect() == 0) {
                var gm = ProgressManager.getUnlockedGameMechanics()[this.cursorB.getCurrentSelect()];
                this.bibleDescription.setText(ProgressManager.getMechanicDescription(gm));
            }
            else if (this.cursorA.getCurrentSelect() == 1) {
                var move = ProgressManager.getUnlockedMoves()[this.cursorB.getCurrentSelect()].newInstance();
                this.bibleDescription.setText(move.getDescription());
            }
            else if (this.cursorA.getCurrentSelect() == 2) {
                var pm = ProgressManager.getUnlockedPartyMembers()[this.cursorB.getCurrentSelect()];
                this.bibleDescription.setText(PartyManager.getHeroDescription(pm.name));
            }
            else if (this.cursorA.getCurrentSelect() == 3) {
                var fs = ProgressManager.getUnlockedFightingStyles()[this.cursorB.getCurrentSelect()];;
                this.bibleDescription.setText(fs + "\n\n" +
                    FightingStyles.getDesc(fs));
            }
            else if (this.cursorA.getCurrentSelect() == 4) {
                var ev = EventManager.getEvent(ProgressManager.getUnlockedEvents()[this.cursorB.getCurrentSelect()]);
                this.bibleDescription.setText(ev.getDescription());
            }
            else if (this.cursorA.getCurrentSelect() == 5) {
                var god = ProgressManager.getUnlockedGods()[this.cursorB.getCurrentSelect()];
                this.bibleDescription.setText(god.getDescription());
            }
            else if (this.cursorA.getCurrentSelect() == 6) {
                var synergy = ProgressManager.getUnlockedSynergies()[this.cursorB.getCurrentSelect()];
                this.bibleDescription.setText(synergy.getDescription());
            }
            else if (this.cursorA.getCurrentSelect() == 7) {
                var relic = ProgressManager.getUnlockedRelics()[this.cursorB.getCurrentSelect()];
                this.bibleDescription.setText(relic.getDescription());
            }
        }
    }
    bibleResetArtwork() {
        if (this.bibleArtwork != null) {
            this.bibleArtwork.destroy();
            this.artworkBlackScreen.destroy();
            this.bibleArtwork = null;
            this.artworkBlackScreen = null;
        }
    }

    loadOptionsResources() {
        this.loadImage("ui/blackScreen.png");
        this.loadImage("ui/optionsFrame.png");

        this.loadBibleResources();
    }
    openOptions() {
        this.isInOptions = true;

        this.optionBlackScreen = this.addImage("ui/blackScreen");
        this.optionBlackScreen.setAlpha(0.5)
        this.optionFrame = this.addImage("ui/optionsFrame", 50, 25);

        this.optionTitle = this.addText("", 65, 38, {fontStyle: 'bold'});
        this.optionTexts = this.addText("", 65, 85);

        this.optionCurrentSelect = 0;
        this.optionArea = "options";

        this.playSoundSelect();
    }
    closeOptions() {
        this.isInOptions = false;

        this.optionBlackScreen.destroy();
        this.optionBlackScreen = null;
        this.optionFrame.destroy();
        this.optionFrame = null;
        this.optionTitle.destroy();
        this.optionTitle = null;
        this.optionTexts.destroy();
        this.optionTexts = null;

        this.playSoundSelect();
    }
    optionsUpdate() {
        var texts = [];
        if (this.optionArea == "options") {
            texts = ["Controls", "Audio", "Battle Automatic Text Flow: "];
            if (this.sceneName == "Battle" || this.sceneName == "MultiplayerBattle") {
                if (this.duel.duelState == "moveChoice") {
                    texts.push("Open Bible");
                }
                texts.push("Restart Battle");
            }
            if (this.sceneName == "Menu") {
                texts.push("Reset Data");
                texts.push("Open Credits");
            }
            texts = texts.concat(["Return to Menu", "Close Options"])

            if (GlobalVars.get("settings")["battleAutoNext"]) {
                texts[2] += "Enabled";
            }
            else {
                texts[2] += "Disabled";
            }
            this.optionTitle.setText("Options");

            if (this.justPressedControl("BACK")) {
                return this.closeOptions();
            }

            if (this.justPressedControl("ENTER")) {
                this.playSoundOK();
                if (texts[this.optionCurrentSelect] == "Controls") {
                    this.optionCurrentSelect = 0;
                    return this.optionArea = "controls";
                }
                else if (texts[this.optionCurrentSelect] == "Audio") {
                    this.optionCurrentSelect = 0;
                    return this.optionArea = "audio";
                }
                else if (texts[this.optionCurrentSelect].startsWith("Battle Automatic Text Flow")) {
                    GlobalVars.get("settings")["battleAutoNext"] = !GlobalVars.get("settings")["battleAutoNext"];
                    GlobalVars.updateSettings();
                }
                else if (texts[this.optionCurrentSelect] == "Reset Data") {
                    if (ProgressManager.getPercentageCompletion() >= 100) AchievementManager.unlockAchievement(8); // Why

                    localStorage.removeItem("controls");
                    localStorage.removeItem("settings");
                    localStorage.removeItem("savefile");
                    localStorage.removeItem("partyMembers");

                    return this.closeGame();
                }
                else if (texts[this.optionCurrentSelect] == "Open Credits") {
                    return this.openCutscene(4);
                }
                else if (texts[this.optionCurrentSelect] == "Return to Menu") {
                    return this.switchScene("Menu");
                }
                else if (texts[this.optionCurrentSelect] == "Close Options") {
                    return this.closeOptions();
                }
                else if (texts[this.optionCurrentSelect] == "Open Bible") {
                    this.closeOptions();
                    return this.openBible();
                }
                else if (texts[this.optionCurrentSelect] == "Restart Battle") {
                    var data = {};
                    data["quest"] = this.currentQuest;
                    return this.switchScene("Battle", data);
                }
            }
        }
        else if (this.optionArea == "controls") {
            this.optionTitle.setText("Options > Controls");
            var l = ["UP","DOWN","LEFT","RIGHT","ENTER","BACK","MENU"]
            for (var i in l) {
                texts.push(l[i] + ": " + ControlManager.getKeyControl(l[i]));
            }
            texts.push("Go Back");

            if (this.justPressedControl("BACK")) {
                this.playSoundOK();
                this.optionCurrentSelect = 0;
                return this.optionArea = "options";
            }

            if (this.justPressedControl("ENTER")) {
                this.playSoundOK();
                if (texts[this.optionCurrentSelect] == "Go Back") {
                    this.playSoundOK();
                    this.optionCurrentSelect = 0;
                    return this.optionArea = "options";
                }
                else {
                    this.optionMemorySelect = texts[this.optionCurrentSelect].split(":")[0];
                    return this.optionArea = "inputControl";
                }
            }
        }
        else if (this.optionArea == "audio") {
            this.optionTitle.setText("Options > Audio");
            texts = ["Music Volume", "Sounds Volume", "Go Back"];

            if (this.justPressedControl("BACK")) {
                this.playSoundOK();
                this.optionCurrentSelect = 1;
                return this.optionArea = "options";
            }

            if (this.justPressedControl("ENTER")) {
                this.playSoundOK();
                if (texts[this.optionCurrentSelect] == "Go Back") {
                    this.playSoundOK();
                    this.optionCurrentSelect = 1;
                    return this.optionArea = "options";
                }
                else if (texts[this.optionCurrentSelect] == "Music Volume") {
                    this.optionCurrentSelect = 0;
                    this.volumeCounter = GlobalVars.get("settings").musicVolume;
                    return this.optionArea = "musicVolumeSlider";
                }
                else if (texts[this.optionCurrentSelect] == "Sounds Volume") {
                    this.optionCurrentSelect = 0;
                    this.volumeCounter = GlobalVars.get("settings").soundsVolume;
                    return this.optionArea = "soundsVolumeSlider";
                }
            }
        }
        else if (this.optionArea == "inputControl") {
            this.optionTitle.setText("Options > Controls > " + this.optionMemorySelect);
            texts = ["Press the key for: " + this.optionMemorySelect];

            if (this.justPressedControl("BACK")) {
                this.playSoundOK();
                return this.optionArea = "controls";
            }

            var l = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
            for (var i in l) {
                if (this.justPressedKey(l[i])) {
                    ControlManager.addControl(this.optionMemorySelect, l[i]);
                    ControlManager.updateLocalStorage();
                    return this.optionArea = "controls";
                }
            }
        }
        else if (this.optionArea == "musicVolumeSlider") {
            this.optionTitle.setText("Options > Audio > Music Volume");
            texts = ["Music Volume: " + this.volumeCounter + "%"];

            if (this.justPressedControl("UP")) {
                this.volumeCounter += 10;
                this.playSoundOK();
            }
            else if (this.justPressedControl("DOWN")) {
                this.volumeCounter -= 10;
                this.playSoundOK();
            }
            else if (this.justPressedControl("RIGHT")) {
                this.volumeCounter += 1;
                this.playSoundOK();
            }
            else if (this.justPressedControl("LEFT")) {
                this.volumeCounter -= 1;
                this.playSoundOK();
            }

            if (this.volumeCounter < 0) {
                this.volumeCounter = 0;
            }
            else if (this.volumeCounter > 100) {
                this.volumeCounter = 100;
            }

            if (this.musicPlayer != null) {
                this.musicPlayer.setVolume(this.volumeCounter/100);
            }

            if (this.justPressedControl("ENTER") || this.justPressedControl("BACK")) {
                this.playSoundSelect();
                this.optionCurrentSelect = 0;
                GlobalVars.get("settings")["musicVolume"] = this.volumeCounter;
                GlobalVars.updateSettings();
                return this.optionArea = "audio";
            }
        }
        else if (this.optionArea == "soundsVolumeSlider") {
            this.optionTitle.setText("Options > Audio > Sounds Volume");
            texts = ["Sounds Volume: " + this.volumeCounter + "%"];

            if (this.justPressedControl("UP")) {
                this.volumeCounter += 10;
                if (this.volumeCounter > 100) {
                    this.volumeCounter = 100;
                }
                GlobalVars.get("settings")["soundsVolume"] = this.volumeCounter;
                this.playSoundOK();
            }
            else if (this.justPressedControl("DOWN")) {
                this.volumeCounter -= 10;
                if (this.volumeCounter < 0) {
                    this.volumeCounter = 0;
                }
                GlobalVars.get("settings")["soundsVolume"] = this.volumeCounter;
                this.playSoundOK();
            }
            else if (this.justPressedControl("RIGHT")) {
                this.volumeCounter += 1;
                if (this.volumeCounter > 100) {
                    this.volumeCounter = 100;
                }
                GlobalVars.get("settings")["soundsVolume"] = this.volumeCounter;
                this.playSoundOK();
            }
            else if (this.justPressedControl("LEFT")) {
                this.volumeCounter -= 1;
                if (this.volumeCounter < 0) {
                    this.volumeCounter = 0;
                }
                GlobalVars.get("settings")["soundsVolume"] = this.volumeCounter;
                this.playSoundOK();
            }

            if (this.justPressedControl("ENTER") || this.justPressedControl("BACK")) {
                this.playSoundSelect();
                this.optionCurrentSelect = 1;
                GlobalVars.get("settings")["soundsVolume"] = this.volumeCounter;
                GlobalVars.updateSettings();
                return this.optionArea = "audio";
            }
        }

        if (this.justPressedControl("UP")) {
            this.optionCurrentSelect -= 1;
            this.playSoundOK();
            if (this.optionCurrentSelect < 0) {
                this.optionCurrentSelect += texts.length;
            }
        }
        else if (this.justPressedControl("DOWN")) {
            this.optionCurrentSelect += 1;
            this.playSoundOK();
            if (this.optionCurrentSelect >= texts.length) {
                this.optionCurrentSelect -= texts.length;
            }
        }
        else if (this.justPressedControl("MENU")) {
            return this.closeOptions();
        }

        var finalText = "";
        for (var i in texts) {
            if (i == this.optionCurrentSelect) {
                finalText += "> " + texts[i] + " <\n\n";
            }
            else {
                finalText += texts[i] + "\n\n";
            }
        }
        this.optionTexts.setText(finalText);
    }

    checkDevTools() {
        if (this.sceneName == "Area") {
            var q = this.loadedQuests[this.questCursor.getCurrentSelect()];

            // unlock / lock steps
            if (this.justPressedKey("U")) {
                this.playSoundOK();
                if (this.selectsStep) {
                    if (!ProgressManager.isStepCompleted(q.id, this.stepSelect)) {
                        ProgressManager.unlockStep(q.id, parseInt(this.stepCursor.getCurrentSelect()));
                    }
                    else {
                        ProgressManager.lockStep(q.id, parseInt(this.stepCursor.getCurrentSelect()));
                    }
                }
                else {
                    var unlock = !q.isCompleted();
                    var steps = ProgressManager.getUnlockedSteps(q.id)
                    for (var i in steps) {
                        ProgressManager.lockStep(q.id, i);
                    }
                    if (unlock) {
                        steps = q.questSteps;
                        for (var i in steps) {
                            ProgressManager.unlockStep(q.id, parseInt(i));
                        }
                    }
                }
            }

            this.updateDesc();
        }
    }
}
Scene.musicTimers = {};
Scene.keyboardDict = {};
