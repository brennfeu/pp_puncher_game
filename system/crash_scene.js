class CrashScene extends Scene {
    constructor() { try {
        super({key:"Crash"});
    } catch(e) { TRIGGER_ERROR(this, e) } }

    init(_data) { try {
        this.crashTxt = _data["crashTxt"];

        var clipboard = nw.Clipboard.get();
        clipboard.set(this.crashTxt, 'text');
    } catch(e) { TRIGGER_ERROR(this, e) } }

    preload() { try {
        this.startLoadingScreen();

        this.loadOptionsResources();
    } catch(e) { TRIGGER_ERROR(this, e) } }

    create() { try {
        this.addText(this.crashTxt, 10, 40, { fontSize: '18px', wordWrap: {width: 1180}});

        this.stopLoadingScreen();
    } catch(e) { TRIGGER_ERROR(this, e) } }

    update() { try {
        if (this.isInOptions) {
            return this.optionsUpdate();
        }

        if (this.justPressedControl("MENU")) {
            this.openOptions();
        }
    } catch(e) { TRIGGER_ERROR(this, e) } }
}
