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

    static newInstance() {
        return new this();
    }
}
