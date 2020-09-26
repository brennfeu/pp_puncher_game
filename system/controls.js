class ControlManager {
    static addControl(_controlName, _key) {
        for (var i in ControlManager.CONTROL_LIST) {
            if (ControlManager.CONTROL_LIST[i] == _controlName) {
                delete ControlManager.CONTROL_LIST[i];
            }
        }
        ControlManager.CONTROL_LIST[_key] = _controlName;
    }

    static getControlKey(_key) {
        return ControlManager.CONTROL_LIST[_key];
    }
    static getKeyControl(_controlName) {
        for (var i in ControlManager.CONTROL_LIST) {
            if (ControlManager.CONTROL_LIST[i] == _controlName) {
                return i;
            }
        }
        return null;
    }

    static getForcedControlKey(_key) {
        return ControlManager.FORCED_CONTROLS[_key];
    }
    static getForcedKeyControl(_controlName) {
        for (var i in ControlManager.FORCED_CONTROLS) {
            if (ControlManager.FORCED_CONTROLS[i] == _controlName) {
                return i;
            }
        }
        return null;
    }

    static updateLocalStorage() {
        localStorage.setItem("controls", JSON.stringify(ControlManager.CONTROL_LIST));
    }

    static loadLocalStorage() {
        ControlManager.CONTROL_LIST = JSON.parse(localStorage.getItem("controls"));
    }
}

ControlManager.FORCED_CONTROLS = {
    "up": "UP",
    "down": "DOWN",
    "left": "LEFT",
    "right": "RIGHT",
    "enter": "ENTER",
    "esc": "MENU",
}
ControlManager.GAMEPAD_CONTROLS = {
    "up": "UP",
    "down": "DOWN",
    "left": "LEFT",
    "right": "RIGHT",
    "A": "ENTER",
    "B": "BACK",
    "X": "MENU",
    "Y": "MENU"
}
ControlManager.GAMEPAD = null; // init in scene constructor

ControlManager.loadLocalStorage();
if (ControlManager.CONTROL_LIST == null) {
    console.log("Controls Initialisation");
    ControlManager.CONTROL_LIST = {
        "Z": "UP",
        "S": "DOWN",
        "Q": "LEFT",
        "D": "RIGHT",
        "T": "ENTER",
        "Y": "BACK",
        "U": "MENU"
    };
    ControlManager.updateLocalStorage();
}
