class MapScene extends Scene {
    constructor() { try {
        super({key:"Map"});
    } catch(e) { TRIGGER_ERROR(e) } }

    init(_data) { try {
        this.cursor = null;
        this.currentSelect = 0;
        this.currentSelectOffset = 0;
        if (_data["areaSelect"] != undefined) this.currentSelect = parseInt(_data["areaSelect"]);

        this.logTextObject = null;
        this.isOnArea = true;

        this.loadedAreas = [];
        this.areaPoints = [];
        this.areaTexts = [];

        this.speOptTexts = [];
    } catch(e) { TRIGGER_ERROR(e) } }

    preload() { try {
        this.startLoadingScreen();

        this.loadOptionsResources();
        this.loadDialogueResources();
        this.loadPartyResources();
        this.loadUnlockResources();
        this.loadUiSounds();

        this.loadImage("ui/map/log_frame.png");
        this.loadImage("ui/map/opt_frame.png");
        this.loadImage("ui/map/map_point.png");
        this.loadImage("ui/cursor.png");

        this.loadMusic("OutsideTheme.mp3");
    } catch(e) { TRIGGER_ERROR(e) } }

    create() { try {
        this.addImage("ui/map/log_frame", 792, 0); // divisé par 3 : 131+i*263
        this.addText("DESCRIPTION", 810, 13, {fontStyle: 'bold'});
        this.logTextObject = this.addText("", 810, 57, {fontSize: '21px', wordWrap: {width: 400, height: 550}});

        this.loadedAreas = ProgressManager.getUnlockedAreas();
        for (var i in this.loadedAreas) {
            if (i > 2) continue; // only 3 shown areas

            var area = this.loadedAreas[i];

            var data = {align: "center", wordWrap: {width: 40, height: 100}};
            if (area.isCompleted()) data["fontStyle"] = "italic";

            this.areaTexts.push(this.addText(area.getName(), 100+i*263, 120, data));
            this.areaPoints.push(this.addImage("ui/map/map_point", 120+i*263, 100));

            this.areaTexts[this.areaTexts.length-1].setX(140+i*253-Math.floor(this.areaTexts[this.areaTexts.length-1].width/2));
        }

        var l = ["PARTY", "PP BIBLE", "EXIT"];
        for (var i in l) {
            this.addImage("ui/map/opt_frame", 20+i*263, 600);
            this.speOptTexts.push(this.addText(l[i], 20+12+i*263, 600+10));
        }

        this.cursor = this.addImage('ui/cursor', 116+this.currentSelect*263, 90, {fontStyle: 'bold', fontSize: '40px'});

        this.logTextObject.setText(this.loadedAreas[this.currentSelect].getDescription());

        this.checkUnlock();

        this.resetMusicTimers();
        this.playMusic("OutsideTheme");

        this.stopLoadingScreen();

        if (ProgressManager.getCompletedSteps().length == 1) {
            // init cutscene
            return this.openCutscene(1);
        }
    } catch(e) { TRIGGER_ERROR(e) } }

    update() { try {
        if (this.isInOptions) {
            return this.optionsUpdate();
        }
        if (this.isInBible) {
            return this.bibleUpdate();
        }
        if (this.isInParty) {
            return this.partyUpdate();
        }
        if (this.isInDialogue) {
            return this.dialogueUpdate();
        }
        if (this.unlockList.length > 0) {
            if (!this.isInUnlock) this.openUnlock();
            return this.unlockUpdate();
        }

        if (this.justPressedControl("RIGHT") && (!this.isOnArea || this.loadedAreas.length > 1)) {
            this.currentSelect += 1;
            this.playSoundOK();
            this.updateDesc();
        }
        else if (this.justPressedControl("LEFT") && (!this.isOnArea || this.loadedAreas.length > 1)) {
            this.currentSelect -= 1;
            this.playSoundOK();
            this.updateDesc();
        }
        else if (this.justPressedControl("UP") || this.justPressedControl("DOWN")) {
            this.isOnArea = !this.isOnArea;
            this.playSoundOK();
            this.updateDesc();
        }
        else if (this.justPressedControl("BACK")) {
            this.playSoundSelect();
            return this.switchScene("Menu");
        }

        if (this.isOnArea) {
            //console.log(this.currentSelect + " / " + this.currentSelectOffset + " / " + this.loadedAreas.length);

            if (this.currentSelect + this.currentSelectOffset >= this.loadedAreas.length) {
                this.currentSelect = 0;
                this.currentSelectOffset = 0;
                this.updateTexts();
                this.updateDesc();
            }
            else if (this.currentSelect < 0) {
                this.currentSelect = 2;
                if (this.loadedAreas.length > 2) this.currentSelectOffset = this.loadedAreas.length-3;
                this.updateTexts();
                this.updateDesc();
            }

            if ((this.currentSelect > 1 && this.currentSelect + this.currentSelectOffset < this.loadedAreas.length-1)
            || this.currentSelect > 2) {
                this.currentSelect -= 1;
                this.currentSelectOffset += 1;
                this.updateTexts();
                this.updateDesc();
            }
            else if (this.currentSelect < 1 && this.currentSelectOffset > 0) {
                this.currentSelect += 1;
                this.currentSelectOffset -= 1;
                this.updateTexts();
                this.updateDesc();
            }

            this.cursor.setY(90);
            this.cursor.setX(116+this.currentSelect*263);
        }
        else {
            if (this.currentSelect >= this.speOptTexts.length) {
                this.currentSelect -= this.speOptTexts.length;
                this.updateDesc();
            }
            else if (this.currentSelect < 0) {
                this.currentSelect += this.speOptTexts.length;
                this.updateDesc();
            }

            this.cursor.setY(600-10);
            this.cursor.setX(100+this.currentSelect*263);
        }

        if (this.justPressedControl("ENTER")) {
            this.playSoundSelect();

            if (this.isOnArea) {
                var data = {};
                data["areaId"] = this.currentSelect + this.currentSelectOffset;
                return this.switchScene("Area", data);
            }
            else if (this.currentSelect == 0) {
                if (ProgressManager.getUnlockedFightingStyles().length <= 0) {
                    return this.openDialogue(5);
                }
                else {
                    this.openParty();
                }
            }
            else if (this.currentSelect == 1) {
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
    } catch(e) { TRIGGER_ERROR(e) } }

    updateTexts() {
        for (var i in this.areaTexts) {
            var data = {};
            var area = this.loadedAreas[parseInt(i) + parseInt(this.currentSelectOffset)];
            this.areaTexts[i].setText(area.getName());
            if (area.isCompleted()) this.areaTexts[i].setFontStyle("italic");
            else this.areaTexts[i].setFontStyle("");
        }
    }
    updateDesc() {
        try {
            if (this.isOnArea) this.logTextObject.setText(this.loadedAreas[this.currentSelect + this.currentSelectOffset].getDescription());
            else if (this.currentSelect == 0) this.logTextObject.setText("Customize your party members' PP !");
            else if (this.currentSelect == 1) this.logTextObject.setText("The Holy Book of PP Punching!\nHere you can find all kind of useful informations.\n\nTotal Number of Unlocked Things: " + ProgressManager.getTotalNbOfUnlocks());
            else if (this.currentSelect == 2) this.logTextObject.setText("Exit to the menu");
        }
        catch(e) {} // out of bounds
    }

    getMainObj() {
        if (this.isOnArea) return this.areaTexts[this.currentSelect];
        return this.speOptTexts[this.currentSelect];
    }
}
