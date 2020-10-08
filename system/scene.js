class Scene extends Phaser.Scene {
    constructor(_json) {
        super(_json);
        this.sceneName = _json.key;

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

    loadImage(_image, _name = _image.substring(0, _image.length - 4)) {
        return this.load.image(_name.replace(/ /g,''), "resources/images/" + _image.replace(/ /g,''));
    }
    addImage(_name, _x, _y) {
        return this.addImageMiddle(_name, _x, _y).setOrigin(0, 0);
    }
    addImageMiddle(_name, _x, _y) {
        //console.log(_name.replace(/ /g,''))
        return this.add.image(_x, _y, _name.replace(/ /g,''));
    }
    getImage(_name) {
        //console.log(_name.replace(/ /g,''));
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
        Scene.musicTimers = {};
    }
    stopMusic() {
        Scene.musicTimers[this.currentMusic] = this.musicPlayer.seek;
        this.musicPlayer.stop();
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
        if (_json == null) {
            _json = {};
        }
        if (!("fontSize" in _json)) {
            _json["fontSize"] = '24px';
        }
        var obj = new TextDict(this, _x, _y, _text, _json, _speed);
        this.add.existing(obj);
        return obj;
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

        this.loadImage("status/other/depression.png");
        this.loadImage("status/other/fungus.png");
        this.loadImage("status/other/offensive.png");
        this.loadImage("status/other/defensive.png");

        this.loadImage("status/special/killerBlessing.png");
        this.loadImage("status/special/waifuDetermination.png");
        this.loadImage("status/special/death.png");
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

        this.loadSound("battle/thisSucks.mp3");
        this.loadSound("battle/yeehaw.mp3");
        this.loadSound("battle/uuh.mp3");
        this.loadSound("battle/ohYeah.mp3");
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
        this.loadingText = this.addText("LOADING...", 1000, 650, {fontStyle: 'bold', fontSize: '30px'});
    }
    stopLoadingScreen() {
        this.loadingText.destroy();
        this.loadingText = null;
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
            GREENWORKS.initAPI();
        }
        catch(e) {}

        return this.scene.start(_sceneName, _data);
    }
    closeGame() {
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

        this.optionBlackScreen = this.addImage("ui/blackScreen");
        this.optionBlackScreen.setAlpha(0.5);

        this.dialogueFrame = this.addImage("ui/other/dialogue_frame", 0, 675-200);
        this.dialogueSpeakerObj = this.addText("", 12, 675-200+12, {fontStyle: 'bold'});
        this.dialogueObj = this.addText("", 12, 675-200+60, { wordWrap: {width: 1200-24, height: 140-12}}, getTextSpeed());

        var line = this.currentDialogue.getLine(this.currentLine);
        this.dialogueSpeakerObj.setText(line.speaker);
        this.dialogueObj.setText(line.text);

        if (this.sceneName == "Cutscene") this.optionBlackScreen.setAlpha(0);
    }
    closeDialogue() {
        this.isInDialogue = false;

        this.optionBlackScreen.destroy();
        this.optionBlackScreen = null;

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
        if (this.justPressedControl("ENTER")) {
            if (!this.dialogueObj.isShowingFullText()) {
                return this.dialogueObj.showFullText();
            }

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
        if (GlobalVars.get("unlocksNext").length > 0) {
            var q = QuestManager.getQuest(GlobalVars.get("unlocksNext")[0]);
            var s = q.getStep(GlobalVars.get("unlocksNext")[1]);

            // unlock screen
            if (s.unlockGameMechanics != undefined) {
                for (var i in s.unlockGameMechanics) {
                    this.unlockList.push(["Game Mechanic", s.unlockGameMechanics[i]])
                }
            }
            if (s.unlockPartyMembers != undefined) {
                for (var i in s.unlockPartyMembers) {
                    this.unlockList.push(["Party Member", s.unlockPartyMembers[i]])
                }
            }
            if (s.unlockAreas != undefined) {
                for (var i in s.unlockAreas) {
                    this.unlockList.push(["Area", s.unlockAreas[i]])
                }
            }
            if (s.unlockFightingStyles != undefined) {
                for (var i in s.unlockFightingStyles) {
                    this.unlockList.push(["Fighting Style", s.unlockFightingStyles[i]])
                }
            }
            if (s.unlockMoves != undefined) {
                for (var i in s.unlockMoves) {
                    this.unlockList.push(["Move", s.unlockMoves[i]])
                }
            }
            if (s.unlockEvents != undefined) {
                for (var i in s.unlockEvents) {
                    this.unlockList.push(["Event", s.unlockEvents[i]])
                }
            }

            if (s.saveWaifu != undefined) {
                this.unlockList.push(["Waifu", s.saveWaifu]);
            }

            GlobalVars.set("unlocksNext", []);
        }
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

        if (unlockType == "Waifu") {
            this.unlockTitle.setText(unlockType + " Saved");
            this.unlockDesc.setText(GodManager.getGod(unlock).name);
            return;
        }

        this.unlockTitle.setText(unlockType + " Unlocked");
        switch(unlockType) {
            case "Party Member":
            case "Game Mechanic":
                this.unlockDesc.setText(unlock);
                break;
            case "Move":
                this.unlockDesc.setText(unlock.newInstance().getDescription());
                break;
            case "Area":
                this.unlockDesc.setText(AreaManager.getArea(unlock).name + "\n\n" + AreaManager.getArea(unlock).description);
                break;
            case "Fighting Style":
                this.unlockDesc.setText(unlock + "\n\n" + FightingStyles.getDesc(unlock));
                break;
            case "Event":
                this.unlockDesc.setText(EventManager.getEvent(unlock).getDescription());
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

        this.cursorA = this.addText(">", 65, -1000);
        this.cursorB = this.addText(">", 400-20, -1000);
        this.cursorASelect = 0;
        this.cursorBSelect = 0;

        this.bibleStep = 0;

        // base description
        this.bibleDescription.setText(ProgressManager.getUnlockedPartyMembers()[this.cursorASelect].getDescription());

        var l = [];
        if (ProgressManager.getUnlockedGameMechanics().indexOf("Fighting Styles") > -1) {
            l = l.concat(ProgressManager.getUnlockedFightingStyles());
        }
        for (var i in l) {
            this.bibleTextsB.push(this.addText(l[i], 400, 84+22*i))
        }
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
                this.cursorASelect -= 1;
                this.playSoundOK();
                if (this.cursorASelect < 0) {
                    this.cursorASelect += this.bibleTextsA.length;
                }
                this.partyUpdateDesc();
            }
            else if (this.justPressedControl("DOWN")) {
                this.cursorASelect += 1;
                this.playSoundOK();
                if (this.cursorASelect >= this.bibleTextsA.length) {
                    this.cursorASelect -= this.bibleTextsA.length;
                }
                this.partyUpdateDesc();
            }

            this.cursorA.setY(84+22*this.cursorASelect);
            this.cursorB.setY(-1000);

            if (this.justPressedControl("ENTER") || this.justPressedControl("RIGHT")) {
                this.bibleStep = 1;
                this.cursorBSelect = 0;
                this.partyUpdateDesc();
                this.playSoundSelect();
            }
        }
        else {
            if (this.justPressedControl("UP")) {
                this.cursorBSelect -= 1;
                this.playSoundOK();
                if (this.cursorBSelect < 0) {
                    this.cursorBSelect += this.bibleTextsB.length;
                }
                this.partyUpdateDesc();
            }
            else if (this.justPressedControl("DOWN")) {
                this.cursorBSelect += 1;
                this.playSoundOK();
                if (this.cursorBSelect >= this.bibleTextsB.length) {
                    this.cursorBSelect -= this.bibleTextsB.length;
                }
                this.partyUpdateDesc();
            }

            this.cursorB.setY(84+22*this.cursorBSelect);

            if (this.justPressedControl("ENTER")) {
                var pm = ProgressManager.getUnlockedPartyMembers()[this.cursorASelect];
                var fs = ProgressManager.getUnlockedFightingStyles()[this.cursorBSelect];

                if (pm.fightingStyles.indexOf(fs) > -1) {
                    pm.fightingStyles.splice(pm.fightingStyles.indexOf(fs), 1);
                }
                else {
                    pm.fightingStyles.push(fs);
                }

                PartyManager.updateLocalStorage();
                this.partyUpdateDesc();
                this.playSoundSelect();
            }

            if (this.justPressedControl("BACK") || this.justPressedControl("LEFT")) {
                this.bibleStep = 0;
                this.partyUpdateDesc();
                this.playSoundSelect();
            }
        }

        if (this.justPressedControl("MENU") || (this.justPressedControl("BACK") && this.bibleStep == 0)) {
            return this.closeParty();
        }
    }
    partyUpdateDesc() {
        var desc = ProgressManager.getUnlockedPartyMembers()[this.cursorASelect].getDescription();
        if (this.bibleStep != 0) {
            var fs = ProgressManager.getUnlockedFightingStyles()[this.cursorBSelect];
            desc += "\n\n\n" + fs + ":\n" + FightingStyles.getDesc(fs);
        }
        this.bibleDescription.setText(desc);

        for (var i in this.bibleTextsB) this.bibleTextsB[i].destroy();
        this.bibleTextsB = [];
        var l = [];
        if (ProgressManager.getUnlockedGameMechanics().indexOf("Fighting Styles") > -1) {
            l = l.concat(ProgressManager.getUnlockedFightingStyles());
        }
        for (var i in l) {
            this.bibleTextsB.push(this.addText(l[i], 400, 84+22*i))
        }
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

        this.bibleTextsA.push(this.addText("Moves", 85, 84+22*this.bibleTextsA.length));
        var l = ["Fighting Styles", "Events", "Gods", "Stånds"];
        var unlocks = ProgressManager.getUnlockedGameMechanics();
        for (var i in l) {
            if (unlocks.indexOf(l[i]) < 0) continue;
            this.bibleTextsA.push(this.addText(l[i], 85, 84+22*this.bibleTextsA.length));
        }
        //this.bibleTextsA.push(this.addText("Enemies", 85, 84+22*this.bibleTextsA.length)); // toujours en dernier

        this.cursorA = this.addText(">", 65, -1000);
        this.cursorB = this.addText(">", 400-20, -1000);
        this.cursorASelect = 0;
        this.cursorBSelect = 0;

        this.bibleStep = 0;

        this.bibleDescription.setText("All the different attacks you have access to!");
        l = ProgressManager.getUnlockedMoves();
        for (var i in l) {
            this.bibleTextsB.push(this.addText(l[i].newInstance().name, 400, 84+22*i))
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

        for (var i in this.bibleTextsA) this.bibleTextsA[i].destroy();
        this.bibleTextsA = [];
        for (var i in this.bibleTextsB) this.bibleTextsB[i].destroy();
        this.bibleTextsB = [];

        this.playSoundSelect();
    }
    bibleUpdate() {
        if (this.bibleStep == 0) {
            if (this.justPressedControl("UP")) {
                this.cursorASelect -= 1;
                this.playSoundOK();
                if (this.cursorASelect < 0) {
                    this.cursorASelect += this.bibleTextsA.length;
                }
                this.bibleUpdateDesc();
            }
            else if (this.justPressedControl("DOWN")) {
                this.cursorASelect += 1;
                this.playSoundOK();
                if (this.cursorASelect >= this.bibleTextsA.length) {
                    this.cursorASelect -= this.bibleTextsA.length;
                }
                this.bibleUpdateDesc();
            }

            this.cursorA.setY(84+22*this.cursorASelect);
            this.cursorB.setY(-1000);

            if ((this.justPressedControl("ENTER") || this.justPressedControl("RIGHT")) && this.bibleTextsB.length > 0) {
                this.bibleStep = 1;
                this.cursorBSelect = 0;
                this.bibleUpdateDesc();
                this.playSoundSelect();
            }
        }
        else {
            if (this.justPressedControl("UP")) {
                this.cursorBSelect -= 1;
                this.playSoundOK();
                if (this.cursorBSelect < 0) {
                    this.cursorBSelect += this.bibleTextsB.length;
                }
                this.bibleUpdateDesc();
            }
            else if (this.justPressedControl("DOWN")) {
                this.cursorBSelect += 1;
                this.playSoundOK();
                if (this.cursorBSelect >= this.bibleTextsB.length) {
                    this.cursorBSelect -= this.bibleTextsB.length;
                }
                this.bibleUpdateDesc();
            }

            this.cursorB.setY(84+22*this.cursorBSelect);

            if (this.justPressedControl("BACK") || this.justPressedControl("LEFT")) {
                this.bibleStep = 0;
                this.bibleUpdateDesc();
                this.playSoundSelect();
            }

            if (this.sceneName == "Battle" && this.duel.duelState == "moveChoice" && this.cursorASelect == 0 && this.justPressedControl("ENTER")) {
                this.selectMove(ProgressManager.getUnlockedMoves()[this.cursorBSelect]);
                this.closeBible();
                if (!ProgressManager.isStepCompleted(0, 1)) {
                    this.openDialogue(18);
                    ProgressManager.unlockStep(0, 1);
                }
                return;
            }
        }

        if (this.justPressedControl("MENU") || (this.justPressedControl("BACK") && this.bibleStep == 0)) {
            return this.closeBible();
        }
    }
    bibleUpdateDesc() {
        if (this.bibleStep == 0) {
            var l = [];
            if (this.cursorASelect == this.bibleTextsA.length-1 && false) {
                // when I'll do the enemies tab
                this.bibleDescription.setText("Every opponent you managed to beat.");
            }
            else if (this.cursorASelect == 0) {
                this.bibleDescription.setText("All the different attacks you have access to!");
                var a = ProgressManager.getUnlockedMoves();
                for (var i in a) l[i] = a[i].newInstance().name;
            }
            else if (this.cursorASelect == 1) {
                this.bibleDescription.setText("Effects you can acquire during battle, or start with for every battle.");
                l = ProgressManager.getUnlockedFightingStyles();
            }
            else if (this.cursorASelect == 2) {
                this.bibleDescription.setText("Random Events that have a chance to occur every turn.");
                var a = ProgressManager.getUnlockedEvents();
                for (var i in a) l[i] = EventManager.getEvent(a[i]).name;
            }

            for (var i in this.bibleTextsB) this.bibleTextsB[i].destroy();
            this.bibleTextsB = [];
            for (var i in l) {
                this.bibleTextsB.push(this.addText(l[i], 400, 84+22*i))
            }
        }
        else {
            if (this.cursorASelect == this.bibleTextsA.length-1 && false) {
                // when I'll do the enemies tab
                this.bibleDescription.setText("");
            }
            else if (this.cursorASelect == 0) {
                var move = ProgressManager.getUnlockedMoves()[this.cursorBSelect].newInstance();
                this.bibleDescription.setText(move.getDescription());
            }
            else if (this.cursorASelect == 1) {
                var fs = ProgressManager.getUnlockedFightingStyles()[this.cursorBSelect];;
                this.bibleDescription.setText(fs + "\n\n" +
                    FightingStyles.getDesc(fs));
            }
            else if (this.cursorASelect == 2) {
                var ev = EventManager.getEvent(ProgressManager.getUnlockedEvents()[this.cursorBSelect]);
                this.bibleDescription.setText(ev.getDescription());
            }
            else if (this.cursorASelect == 3) {
                this.bibleDescription.setText("");
            }
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
            if (this.sceneName == "Battle") {
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

            if (this.justPressedControl("BACK")) {
                this.playSoundOK();
                this.optionCurrentSelect = 0;
                if (this.musicPlayer != null) {
                    this.musicPlayer.setVolume(GlobalVars.get("settings")["musicVolume"]/100);
                }
                return this.optionArea = "audio";
            }
            else if (this.justPressedControl("ENTER")) {
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

            if (this.justPressedControl("BACK")) {
                this.playSoundOK();
                this.optionCurrentSelect = 1;
                GlobalVars.loadSettings();
                return this.optionArea = "audio";
            }
            else if (this.justPressedControl("ENTER")) {
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
            var q = this.loadedQuests[this.questSelect];

            // unlock / lock steps
            if (this.justPressedKey("U")) {
                this.playSoundOK();
                if (this.selectsStep) {
                    if (!ProgressManager.isStepCompleted(q.id, this.stepSelect)) {
                        ProgressManager.unlockStep(q.id, parseInt(this.stepSelect));

                        this.selectsStep = false;
                        this.updateDesc();
                        this.selectsStep = true;
                    }
                    else {
                        ProgressManager.lockStep(q.id, this.stepSelect);
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
