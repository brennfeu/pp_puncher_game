class MultiplayerScene extends Scene {
    constructor() { try {
        super({key:"Multiplayer"});
    } catch(e) { TRIGGER_ERROR(this, e) } }

    init(_data) { try {

    } catch(e) { TRIGGER_ERROR(this, e) } }

    preload() { try {
        this.startLoadingScreen();

        this.loadOptionsResources();
        this.loadDialogueResources();
        this.loadUiSounds();


    } catch(e) { TRIGGER_ERROR(this, e) } }

    create() { try {


        this.stopLoadingScreen();
        //this.playMusic("TitleScreen");
    } catch(e) { TRIGGER_ERROR(this, e) } }

    update() { try {
        if (this.isInOptions) {
            return this.optionsUpdate();
        }
        if (this.isInDialogue) {
            return this.dialogueUpdate();
        }




        this.updateTint();

        if (this.justPressedControl("MENU")) {
            this.openOptions();
        }
    } catch(e) { TRIGGER_ERROR(this, e) } }
}
