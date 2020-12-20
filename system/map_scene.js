class MapScene extends Scene {
    constructor() { try {
        super({key:"Map"});
    } catch(e) { TRIGGER_ERROR(this, e) } }

    init(_data) { try {
        this.cursor = null;
        this.cursorStart = 0
        if (_data["areaSelect"] != undefined) this.cursorStart = parseInt(_data["areaSelect"]);

        this.logTextObject = null;
        this.isOnArea = true;

        this.loadedAreas = [];
        this.areaPoints = [];
        this.areaTexts = [];

        this.speOptTexts = [];
    } catch(e) { TRIGGER_ERROR(this, e) } }

    preload() { try {
        this.startLoadingScreen();

        this.loadImage("ui/map/log_frame.png");
        this.loadImage("ui/map/opt_frame.png");
        this.loadImage("ui/map/map_point.png");
        this.loadImage("ui/cursor.png");

        this.loadMusic("OutsideTheme.mp3");
    } catch(e) { TRIGGER_ERROR(this, e) } }

    create() { try {
        this.addImage("ui/map/log_frame", 792, 0); // divisé par 3 : 131+i*263
        this.addText("DESCRIPTION", 810, 13, {fontStyle: 'bold'});
        this.logTextObject = this.addText("", 810, 57, {fontSize: '21px', wordWrap: {width: 400, height: 550}});

        this.loadedAreas = ProgressManager.getUnlockedAreas();
        for (var i in this.loadedAreas) {
            var area = this.loadedAreas[i];

            var data = {align: "center", wordWrap: {width: 40, height: 100}};
            if (area.isCompleted()) data["fontStyle"] = "italic";

            this.areaTexts.push(this.addText(area.getName(), 100+i*263, 120, data));
            if (i <= 2) this.areaPoints.push(this.addImage("ui/map/map_point", 120+i*263, 100));

            this.areaTexts[this.areaTexts.length-1].setOrigin(0.5, 0);
        }

        var l = ["PARTY", "PP BIBLE", "EXIT"];
        for (var i in l) {
            this.addImage("ui/map/opt_frame", 20+i*263, 600);
            this.speOptTexts.push(this.addText(l[i], 20+12+i*263, 600+10));
        }

        this.cursor = new CustomCursor(
            this.addImage('ui/cursor', 116+263, 90, {fontStyle: 'bold', fontSize: '40px'}),
            "horizontal",
            this.areaTexts
        );
        this.cursor.setFormula(116, 263, 130);
        this.cursor.setForcedLength(3);
        if (this.cursorStart > 2) {
            this.cursor.currentSelect = 2;
            this.cursor.currentOffset = this.cursorStart - 2;
        }
        else {
            this.cursor.currentSelect = this.cursorStart;
        }
        this.cursor.updateObjList();

        this.checkUnlock();

        this.resetMusicTimers();
        this.playMusic("OutsideTheme");

        this.stopLoadingScreen();

        if (ProgressManager.getCompletedSteps().length == 1) {
            // init cutscene
            return this.openCutscene(1);
        }
        else if (ProgressManager.getCurrentVersion() != GAME_VERSION) {
            var version = ProgressManager.getCurrentVersion();
            ProgressManager.updateCurrentVersion();

            if (version == "Beta 1.0.10" && ProgressManager.isStepCompleted(8, 6)) return this.openCutscene(6);
        }
    } catch(e) { TRIGGER_ERROR(this, e) } }

    update() { try {
        if (this.isInOptions) {
            return this.optionsUpdate();
        }
        if (this.isInDialogue) {
            return this.dialogueUpdate();
        }
        if (this.isInBible) {
            return this.bibleUpdate();
        }
        if (this.isInParty) {
            return this.partyUpdate();
        }
        if (this.unlockList.length > 0) {
            if (!this.isInUnlock) this.openUnlock();
            return this.unlockUpdate();
        }

        if (this.justPressedControl("RIGHT") && (!this.isOnArea || this.loadedAreas.length > 1)) {
            this.cursor.goRight();
            this.playSoundOK();
            this.updateDesc();
        }
        else if (this.justPressedControl("LEFT") && (!this.isOnArea || this.loadedAreas.length > 1)) {
            this.cursor.goLeft();
            this.playSoundOK();
            this.updateDesc();
        }
        else if (this.justPressedControl("UP") || this.justPressedControl("DOWN")) {
            this.isOnArea = !this.isOnArea;
            if (this.isOnArea) {
                this.cursor.objList = this.areaTexts;
                this.cursor.currentOffset = this.cursor.memoryOffset;
                this.cursor.setFormula(116, 263, 130);
                this.cursor.updateObjList();
                this.cursor.obj.setY(90);
            }
            else {
                this.cursor.objList = this.speOptTexts;
                this.cursor.memoryOffset = this.cursor.currentOffset;
                this.cursor.currentOffset = 0;
                this.cursor.setFormula(100, 263, 32);
                this.cursor.updateObjList();
                this.cursor.obj.setY(600-10);
            }
            this.playSoundOK();
            this.updateDesc();
        }
        else if (this.justPressedControl("BACK")) {
            this.playSoundSelect();
            return this.switchScene("Menu");
        }

        if (this.cursor.update()) {
            this.updateDesc();
        }

        if (this.justPressedControl("ENTER")) {
            this.playSoundSelect();

            if (this.isOnArea) {
                var data = {};
                data["areaId"] = this.cursor.getCurrentSelect();
                return this.switchScene("Area", data);
            }
            else if (this.cursor.getCurrentSelect() == 0) {
                if (ProgressManager.getUnlockedFightingStyles().length <= 0) {
                    return this.openDialogue(5);
                }
                else {
                    this.openParty();
                }
            }
            else if (this.cursor.getCurrentSelect() == 1) {
                return this.openBible();
            }
            else {
                return this.switchScene("Menu");
            }
        }

        this.updateTint();

        if (this.justPressedControl("MENU")) {
            this.openOptions();
        }
    } catch(e) { TRIGGER_ERROR(this, e) } }

    updateDesc() {
        try {
            if (this.isOnArea) this.logTextObject.setText(this.loadedAreas[this.cursor.getCurrentSelect()].getDescription());
            else if (this.cursor.getCurrentSelect() == 0) this.logTextObject.setText("Customize your party members' PP !");
            else if (this.cursor.getCurrentSelect() == 1) this.logTextObject.setText("The Holy Book of PP Punching!\nHere you can find all kind of useful informations.\n\nTotal Number of Unlocked Things: " + ProgressManager.getTotalNbOfUnlocks());
            else if (this.cursor.getCurrentSelect() == 2) this.logTextObject.setText("Exit to the menu");
        }
        catch(e) {} // out of bounds
    }

    getMainObj() {
        return this.cursor.getCurrentObject();
    }
}
