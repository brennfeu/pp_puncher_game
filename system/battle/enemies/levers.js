class LeverEnemy extends Machine {
    constructor(_number = -1, _switch = [], _default = false) {
        super("Lever " + _number);

        this.STRValue = 1;
        this.DEXValue = 0;

        this.currentMovepool = [ Wait ];

        this.currentLeverState = _default;
        this.leverSwitchAction = _switch;
    }

    activateLever() {
        var l = this.duel.getAlliesOf(this, true);
        for (var i in this.leverSwitchAction) {
            var lever = l[this.leverSwitchAction[i]];
            if (lever.isDead()) continue;
            if (lever.currentLeverState == null) continue;
            lever.currentLeverState = !lever.currentLeverState;
        }
        this.duel.memorySoundEffects.push("switch");
    }

    getAllStatus() {
        var list = super.getAllStatus();

        var status = {};
        status["display"] = " - Current State: ";
        if (this.currentLeverState) {
            status["icon"] = "other/switchOn";
            status["display"] += "On";
        }
        else {
            status["icon"] = "other/switchOff";
            status["display"] += "Off";
        }
        list.push(status);

        var status = {};
        status["display"] = " - Activates: ";
        for (var i in this.leverSwitchAction) {
            status["display"] += this.leverSwitchAction[i] + " ";
        }
        status["icon"] = null
        list.push(status);

        return list;
    }

    damage(_value, _type, _opponent = null) {
        return false;
    }
}
