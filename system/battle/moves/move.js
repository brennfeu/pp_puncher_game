class Move {
    constructor() {
        this.name = "";
        this.description = "";
        this.type = "regular";

        this.needsTarget = true;
        this.dexChange = 0;
        this.priority = false;
        this.autoPass = false;
        this.illegal = 0;
        this.specialCheatProbabilty = -1;
    }

    execute(_user, _target = null) {
        _user.duel.addmessage(_user.getName() + " uses the default move...");
    }

    getDescription() {
        var txt = this.name + "\n\n" + this.description;

        if (!this.needsTarget) {
            txt += "\nDoes not need a target.";
        }
        if (this.dexChange != 0) {
            txt += "\nDEX Modifier: " + this.dexChange;
        }
        if (this.priority) {
            txt += "\nHas priority.";
        }
        if (this.autoPass) {
            txt += "\nAlways passes.";
        }
        if (this.illegal != 0) {
            txt += "\nIllegal: " + this.illegal + "%";
        }

        txt += "\n\nType : " + this.type.charAt(0).toUpperCase() + this.type.slice(1);

        return txt;
    }

    alternateWorldExecute(_user, _target = null) {
        return this.execute(_user, _target);
    }

    getCheatProb() {
        if (this.specialCheatProbabilty != -1) return this.specialCheatProbabilty;

        switch(this.type) {
            case "regular":
            case "stand":
                return 50;
            case "infernal":
            case "other":
                return 80;
            case "armageddon":
            case "rare":
                return 95;
        }

        return 100;
    }

    static getPreference() {
        for (var i in ProgressManager.SAVE_FILES["movePreferences"]) {
            if (ProgressManager.SAVE_FILES["movePreferences"][i][0] == this.getClassName()) {
                return ProgressManager.SAVE_FILES["movePreferences"][i][1];
            }
        }
        return 0;
    }
    static setPreference(_pref = 0) {
        for (var i in ProgressManager.SAVE_FILES["movePreferences"]) {
            if (ProgressManager.SAVE_FILES["movePreferences"][i][0] == this.getClassName()) {
                ProgressManager.SAVE_FILES["movePreferences"].splice(i, 1);
            }
        }
        if (_pref != 0) {
            ProgressManager.SAVE_FILES["movePreferences"].push([this.getClassName(), _pref]);
        }

        ProgressManager.updateLocalStorage();
    }
    static getClassName() {
        return this.name;
    }

    static newInstance() {
        return new this();
    }
}
