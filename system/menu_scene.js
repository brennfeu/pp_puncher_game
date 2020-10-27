class MenuScene extends Scene {
    constructor() { try {
        super({key:"Menu"});
    } catch(e) { TRIGGER_ERROR(this, e) } }

    init(_data) { try {
        this.cursor = null;

        this.textObjects = [];
        this.title = null;
    } catch(e) { TRIGGER_ERROR(this, e) } }

    preload() { try {
        this.startLoadingScreen();

        this.loadOptionsResources();
        this.loadDialogueResources();
        this.loadUiSounds();

        this.loadImage("ui/menu/frame.png");
        this.loadMusic("TitleScreen.mp3");
    } catch(e) { TRIGGER_ERROR(this, e) } }

    create() { try {
        this.title = this.addText('PP PUNCHER ', 180, 40, {fontStyle: 'bold italic', fontSize: '60px'});
        this.addToForceTint(this.title);
        this.addText(GAME_VERSION, 1100, 650, {fontSize: '12px'});

        this.addImage("ui/menu/frame", 80, 480);
        this.addImage("ui/menu/frame", 80, 480+60);
        this.addImage("ui/menu/frame", 80, 480+60*2);
        this.textObjects.push(this.addText('START', 80+10, 480+8, {fontStyle: 'bold', fontSize: '29px'}));
        this.textObjects.push(this.addText('OPTIONS', 80+10, 480+60+8, {fontStyle: 'bold', fontSize: '29px'}));
        this.textObjects.push(this.addText('EXIT', 80+10, 480+60*2+8, {fontStyle: 'bold', fontSize: '29px'}));

        this.cursor = new CustomCursor(
            this.addText('>', 40, 480, {fontStyle: 'bold', fontSize: '40px'}),
            "vertical",
            this.textObjects
        );
        this.cursor.setFormula(480, 60, 488);

        this.stopLoadingScreen();

        if (ProgressManager.getCompletedSteps().length == 0) {
            // first launch
            ProgressManager.unlockStep(0, 0); // base unlocks
            return this.openCutscene(0);
        }

        this.playMusic("TitleScreen");
    } catch(e) { TRIGGER_ERROR(this, e) } }

    update() { try {
        if (this.isInOptions) {
            return this.optionsUpdate();
        }
        if (this.isInDialogue) {
            return this.dialogueUpdate();
        }

        if (this.justPressedControl("DOWN")) {
            this.playSoundOK();
            this.cursor.goDown();
        }
        else if (this.justPressedControl("UP")) {
            this.playSoundOK();
            this.cursor.goUp();
        }

        this.cursor.update();

        if (this.justPressedControl("ENTER")) {
            if (this.cursor.getCurrentSelect() == 0) {
                // START
                this.playSoundSelect();

                var data = {};
                return this.switchScene("Map", data);
            }
            else if (this.cursor.getCurrentSelect() == 1) {
                // OPTIONS
                this.openOptions();
            }
            else {
                // EXIT
                this.closeGame();
            }
        }

        this.updateTint();

        if (this.justPressedControl("MENU")) {
            this.openOptions();
        }
    } catch(e) { TRIGGER_ERROR(this, e) } }

    getMainObj() {
        return this.cursor.getCurrentObject();
    }
}
