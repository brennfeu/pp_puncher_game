class GlobalVars {
    static get(_key) {
        return GlobalVars.VARIABLES[_key];
    }
    static set(_key, _value) {
        return GlobalVars.VARIABLES[_key] = _value;
    }

    static updateSettings() {
        localStorage.setItem("settings", JSON.stringify(GlobalVars.VARIABLES.settings));
    }
    static loadSettings() {
        GlobalVars.VARIABLES.settings = JSON.parse(localStorage.getItem("settings"));
    }
}

GlobalVars.VARIABLES = {};

GlobalVars.loadSettings();
if (GlobalVars.get("settings") == null) {
    console.log("Settings Initialisation");
    GlobalVars.set("settings", {
        "musicVolume": "100",
        "soundsVolume": "100",
        "battleAutoNext": false,
        "textSpeed": 1
    });
    GlobalVars.updateSettings();
}

GlobalVars.set("dialogueNext", []); // [areaId, dialogueId]
GlobalVars.set("cutsceneNext", null); // cutsceneId
GlobalVars.set("unlocksNext", []);
