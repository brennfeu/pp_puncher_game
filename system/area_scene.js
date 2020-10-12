class AreaScene extends Scene {
    constructor() { try {
        super({key:"Area"});
    } catch(e) { TRIGGER_ERROR(e) } }

    init(_data) { try {
        this.area = AreaManager.getArea(_data["areaId"]);
        this.onLoadQuest = _data["currentQuest"];

        this.questCursor = null;
        this.questSelect = 0;
        this.stepCursor = null;
        this.stepSelect = 0;

        this.logTextObject = null;

        this.questTexts = [];
        this.questStepTexts = [];
        this.questStepFrame = null;

        this.loadedQuests = [];

        this.selectsStep = false;

        this.readyForBattle = false;

        this.tutorialWarning = false;
    } catch(e) { TRIGGER_ERROR(e) } }

    preload() { try {
        this.startLoadingScreen();

        this.loadOptionsResources();
        this.loadDialogueResources();
        this.loadUnlockResources();
        this.loadUiSounds();

        this.loadImage("ui/area/log_frame.png");
        this.loadImage("ui/area/name_frame.png");
        this.loadImage("ui/area/quest_frame.png");

        this.loadMusic(this.area.getAreaTheme() + ".mp3");
    } catch(e) { TRIGGER_ERROR(e) } }

    create() { try {
        this.addImage("ui/area/log_frame", 792, 0);
        this.addText("DESCRIPTION", 810, 13, {fontStyle: 'bold'});
        this.logTextObject = this.addText("", 810, 57, {fontSize: '21px', wordWrap: {width: 400, height: 550}});

        this.addImage("ui/area/name_frame", 0, 675-44);
        this.addText(this.area.name.toUpperCase(), 12, 675-44+10, {fontStyle: 'bold'});

        this.loadedQuests = ProgressManager.getUnlockedQuests(this.area.id);
        var l = this.loadedQuests;
        this.addImage("ui/area/quest_frame", -5, -645+(l.length+2)*22);
        for (var i in l) {
            var data = {};
            if (l[i].isCompleted()) data["fontStyle"] = "italic";
            this.questTexts.push(this.addText(l[i].getName(), 30, 10 + i*22, data));
        }
        this.addText("Exit Area", 30, 10 + (l.length+1)*22);
        this.questCursor = this.addText(">", 5, 10);

        this.questStepFrame = this.addImage("ui/area/quest_frame", 300-10, 675-1000);
        this.stepCursor = this.addText(">", 300+5, -10000);

        if (this.onLoadQuest != undefined) {
            this.questSelect = this.loadedQuests.indexOf(QuestManager.getQuest(parseInt(this.onLoadQuest[0])));
        }

        this.playMusic(this.area.getAreaTheme());

        // init text
        var q = this.loadedQuests[this.questSelect];
        var l = ProgressManager.getUnlockedSteps(q.id);
        this.logTextObject.setText(q.getDescription());
        for (var i in l) {
            var data = {};
            if (ProgressManager.isStepCompleted(q.id, l[i].id)) data["fontStyle"] = "italic";
            this.questStepTexts.push(this.addText(l[i].getName(), 300+30, 10 + i*22, data));
        }
        this.questStepFrame.setY(30 + l.length*22 - 675);

        // cutscene
        var d = GlobalVars.get("cutsceneNext");
        if (d != null) {
            GlobalVars.set("cutsceneNext", null);
            return this.openCutscene(d);
        }

        this.checkUnlock();

        // dialogue
        var d = GlobalVars.get("dialogueNext");
        if (d.length > 1 && d[0] == this.area.id) {
            this.openDialogue(d[1]);
            GlobalVars.set("dialogueNext", []);
        }

        this.stopLoadingScreen();
    } catch(e) { TRIGGER_ERROR(e) } }

    update() { try {
        if (this.isInOptions) {
            return this.optionsUpdate();
        }
        if (this.isInDialogue) {
            return this.dialogueUpdate();
        }
        if (this.unlockList.length > 0) {
            if (!this.isInUnlock) this.openUnlock();
            return this.unlockUpdate();
        }
        if (DEV_MODE && this.isPressingKey("SHIFT")) {
            this.checkDevTools();
        }

        if (!ProgressManager.isStepCompleted(0, 2)) {
            ProgressManager.unlockStep(0, 2);
            return this.openDialogue(22);
        }

        if (!this.selectsStep) {
            if (this.justPressedControl("DOWN")) {
                this.questSelect += 1;
                this.playSoundOK();
                this.updateDesc();
            }
            else if (this.justPressedControl("UP")) {
                this.questSelect -= 1;
                this.playSoundOK();
                this.updateDesc();
            }
            else if (this.justPressedControl("BACK")) {
                this.playSoundSelect();
                return this.quitScene();
            }

            if (this.questSelect >= this.questTexts.length+1) {
                this.questSelect -= this.questTexts.length+1;
                this.updateDesc();
            }
            else if (this.questSelect < 0) {
                this.questSelect += this.questTexts.length+1;
                this.updateDesc();
            }

            if (this.questSelect == this.questTexts.length) {
                this.questCursor.setY(10 + (this.questSelect+1)*22);
            }
            else {
                this.questCursor.setY(10 + this.questSelect*22);
            }
            this.stepCursor.setY(-100000);

            if (this.justPressedControl("ENTER") || this.justPressedControl("RIGHT")) {
                this.playSoundSelect();

                if (this.questSelect == this.questTexts.length) {
                    return this.quitScene();
                }

                this.selectsStep = true;
                this.stepSelect = 0;
                this.updateDesc();
            }
        }
        else {
            if (this.justPressedControl("DOWN")) {
                this.stepSelect += 1;
                this.playSoundOK();
                this.updateDesc();
            }
            else if (this.justPressedControl("UP")) {
                this.stepSelect -= 1;
                this.playSoundOK();
                this.updateDesc();
            }

            if (this.stepSelect >= this.questStepTexts.length) {
                this.stepSelect -= this.questStepTexts.length;
                this.updateDesc();
            }
            else if (this.stepSelect < 0) {
                this.stepSelect += this.questStepTexts.length;
                this.updateDesc();
            }

            this.stepCursor.setY(10 + this.stepSelect*22);

            if (this.justPressedControl("ENTER")) {
                this.playSoundSelect();

                var q = this.loadedQuests[this.questSelect];
                var s = ProgressManager.getUnlockedSteps(q.id)[this.stepSelect];
                if (s.preFightDialogue != undefined && !ProgressManager.isStepCompleted(q.id, s.id)) {
                    this.readyForBattle = true;
                    this.openDialogue(s.preFightDialogue);
                }
                else {
                    return this.triggerDuel();
                }
            }
            else if (this.justPressedControl("BACK") || this.justPressedControl("LEFT")) {
                this.playSoundSelect();
                this.selectsStep = false;
                this.updateDesc();
            }
        }

        if (this.justPressedControl("MENU")) {
            this.openOptions();
        }
    } catch(e) { TRIGGER_ERROR(e) } }

    quitScene() {
        if (!ProgressManager.isStepCompleted(1, 2) && !this.tutorialWarning) {
            this.tutorialWarning = true;
            return this.openDialogue(21);
        }
        var data = {};
        data["areaSelect"] = this.area.id;
        return this.switchScene("Map", data);
    }

    triggerDuel() {
        var q = this.loadedQuests[this.questSelect];
        var s = ProgressManager.getUnlockedSteps(q.id)[this.stepSelect];

        var data = {}
        //data["duel"] = new StoryDuel(PartyManager.getCurrentParty(), new Encounter(s.encounter), AreaManager.getArea(this.area.id));
        data["quest"] = [q.id, s.id];
        return this.switchScene("Battle", data);
    }
    closeDialogue() {
        super.closeDialogue();

        if (this.readyForBattle) this.triggerDuel();
    }

    updateDesc() {
        if (!this.selectsStep) {
            for (var i in this.questStepTexts) this.questStepTexts[i].destroy();
            this.questStepTexts = [];

            if (this.questSelect == this.questTexts.length) {
                this.questStepFrame.setY(-1000);
                this.logTextObject.setText("Exit " + this.area.name + " and go back to the map?");
                return;
            }
            try {
                var q = this.loadedQuests[this.questSelect];
                var l = ProgressManager.getUnlockedSteps(q.id);

                this.logTextObject.setText(q.getDescription());

                for (var i in l) {
                    var data = {};
                    if (ProgressManager.isStepCompleted(q.id, l[i].id)) data["fontStyle"] = "italic";
                    this.questStepTexts.push(this.addText(l[i].getName(), 300+30, 10 + i*22, data));
                }
                this.questStepFrame.setY(30 + l.length*22 - 675);
            }
            catch(e) {} // out of bounds
        }
        else {
            try {
                var q = this.loadedQuests[this.questSelect];
                this.logTextObject.setText(ProgressManager.getUnlockedSteps(q.id)[this.stepSelect].getDescription());
            }
            catch(e) {} // out of bounds
        }
    }
}
