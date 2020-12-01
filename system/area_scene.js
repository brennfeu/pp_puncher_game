class AreaScene extends Scene {
    constructor() { try {
        super({key:"Area"});
    } catch(e) { TRIGGER_ERROR(this, e) } }

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
    } catch(e) { TRIGGER_ERROR(this, e) } }

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
    } catch(e) { TRIGGER_ERROR(this, e) } }

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
            this.questTexts.push(this.addText(l[i].getName() + " ", 30, 10 + i*22, data));
        }
        this.questTexts.push(this.addText("", 30, 10 + l.length*22));
        this.questTexts.push(this.addText("Exit Area", 30, 10 + l.length*22));

        this.questStepFrame = this.addImage("ui/area/quest_frame", 300-10, 675-1000);

        this.playMusic(this.area.getAreaTheme());

        // cursors
        this.questCursor = new CustomCursor(
            this.addText(">", 5, 10),
            "vertical",
            this.questTexts
        );
        this.questCursor.setFormula(10, 22, 10);
        if (this.onLoadQuest != undefined) this.questCursor.currentSelect = this.loadedQuests.indexOf(QuestManager.getQuest(parseInt(this.onLoadQuest[0])));
        this.updateDesc();
        this.stepCursor = new CustomCursor(
            this.addText(">", 300+5, -10000),
            "vertical",
            this.questStepTexts
        );
        this.stepCursor.setFormula(10, 22, 10);

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
    } catch(e) { TRIGGER_ERROR(this, e) } }

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
                this.questCursor.goDown();
                this.playSoundOK();
            }
            else if (this.justPressedControl("UP")) {
                this.questCursor.goUp();
                this.playSoundOK();
            }
            else if (this.justPressedControl("BACK")) {
                this.playSoundSelect();
                return this.quitScene();
            }

            if (this.questCursor.update()) {
                this.updateDesc();
            }

            if (this.justPressedControl("ENTER") || this.justPressedControl("RIGHT")) {
                this.playSoundSelect();

                if (this.questCursor.getCurrentSelect() == this.questTexts.length-1) {
                    return this.quitScene();
                }

                this.selectsStep = true;
                // TODO questStep
                this.updateDesc();
            }
        }
        else {
            if (this.justPressedControl("DOWN")) {
                this.stepCursor.goDown();
                this.playSoundOK();
            }
            else if (this.justPressedControl("UP")) {
                this.stepCursor.goUp();
                this.playSoundOK();
            }

            if (this.stepCursor.update()) {
                this.updateDesc();
            }

            if (this.justPressedControl("ENTER")) {
                this.playSoundSelect();

                var q = this.loadedQuests[this.questCursor.getCurrentSelect()];
                var s = ProgressManager.getUnlockedSteps(q.id)[this.stepCursor.getCurrentSelect()];

                // trigger multiplayer?
                if (s.goToMultiplayerScene) { return this.switchScene("Multiplayer"); }
                // trigger dialogue?
                else if (s.preFightDialogue != undefined && !ProgressManager.isStepCompleted(q.id, s.id)) {
                    this.readyForBattle = true;
                    this.openDialogue(s.preFightDialogue);
                }
                // trigger battle
                else {
                    return this.triggerDuel();
                }
            }
            else if (this.justPressedControl("BACK") || this.justPressedControl("LEFT")) {
                this.playSoundSelect();
                this.selectsStep = false;
                this.updateDesc();

                this.stepCursor.obj.setY(-1000);
                this.stepCursor.currentSelect = 0;
                this.stepCursor.currentOffset = 0;
            }
        }

        if (this.justPressedControl("MENU")) {
            this.openOptions();
        }
    } catch(e) { TRIGGER_ERROR(this, e) } }

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
        var q = this.loadedQuests[this.questCursor.getCurrentSelect()];
        var s = ProgressManager.getUnlockedSteps(q.id)[this.stepCursor.getCurrentSelect()];

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

            if (this.questCursor.getCurrentSelect() == this.questTexts.length-1) {
                this.questStepFrame.setY(-1000);
                this.logTextObject.setText("Exit " + this.area.name + " and go back to the map?");
                return;
            }
            try {
                var q = this.loadedQuests[this.questCursor.getCurrentSelect()];
                var l = ProgressManager.getUnlockedSteps(q.id);

                this.logTextObject.setText(q.getDescription());

                for (var i in l) {
                    var data = {};
                    if (ProgressManager.isStepCompleted(q.id, l[i].id)) data["fontStyle"] = "italic";
                    this.questStepTexts.push(this.addText(l[i].getName(), 300+30, 10 + i*22, data));
                }
                this.questStepFrame.setY(30 + l.length*22 - 675);

                this.stepCursor.objList = this.questStepTexts;
            }
            catch(e) {} // out of bounds
        }
        else {
            try {
                var q = this.loadedQuests[this.questCursor.getCurrentSelect()];
                this.logTextObject.setText(ProgressManager.getUnlockedSteps(q.id)[this.stepCursor.getCurrentSelect()].getDescription());
            }
            catch(e) {} // out of bounds
        }
    }
}
