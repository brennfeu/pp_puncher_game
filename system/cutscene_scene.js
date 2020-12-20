class CutsceneScene extends Scene {
    constructor() { try {
        super({key:"Cutscene"});
    } catch(e) { TRIGGER_ERROR(this, e) } }

    init(_data) { try {
        this.dialogue = DialogueManager.getDialogue(_data["dialogueId"]);
        this.areaName = _data["areaName"];
        this.music = _data["music"];
        this.distantMusic = _data["distantMusic"];
        if (this.distantMusic == undefined) this.distantMusic = false;

        this.nextSceneKey = _data["nextSceneKey"];
        this.nextSceneData = _data["nextSceneData"];
        if (this.nextSceneData == undefined) this.nextSceneData = {};
    } catch(e) { TRIGGER_ERROR(this, e) } }

    preload() { try {
        this.startLoadingScreen();

        this.loadImage("ui/other/cutscene_frame.png");
        if (this.music != undefined) this.loadMusic(this.music + ".mp3");
    } catch(e) { TRIGGER_ERROR(this, e) } }

    create() { try {
        if (this.areaName != undefined) {
            this.addImage("ui/other/cutscene_frame", 0, 0);
            this.addText(this.areaName, 12, 10);
        }

        if (this.music != undefined) {
            this.playMusic(this.music, true, this.distantMusic);
        }

        this.stopLoadingScreen();
        this.openDialogue(this.dialogue.id);
    } catch(e) { TRIGGER_ERROR(this, e) } }

    update() { try {
        if (this.isInDialogue) {
            return this.dialogueUpdate();
        }

        return this.switchScene(this.nextSceneKey, this.nextSceneData);
    } catch(e) { TRIGGER_ERROR(this, e) } }
}
