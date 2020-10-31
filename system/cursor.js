class CustomCursor {
    constructor(_obj, _type, _objList = []) {
        this.obj = _obj;
        this.type = _type; // "horizontal", "vertical"

        this.currentSelect = 0;
        this.currentOffset = 0;

        this.objList = _objList;
        this.objListFormulaBase = 0;
        this.forceLength = null;

        this.formulaBase = 0;
        this.formulaMultiplier = 1;

        this.initUpdate = false;
    }

    update() {
        // var for calculations
        var maxLength = this.getMaxLength();

        // offset
        if (this.forceLength != null && this.objList.length != 0 && maxLength < this.objList.length) {
            var middle = Math.floor(maxLength/2);
            if (this.currentSelect > middle && this.getCurrentSelect()+middle < this.objList.length) {
                this.currentOffset += 1;
                this.currentSelect -= 1;
                this.updateObjList();
            }
            else if (this.currentSelect < middle && this.getCurrentSelect() >= middle) {
                this.currentOffset -= 1;
                this.currentSelect += 1;
                this.updateObjList();
            }
        }

        // loop
        maxLength = Math.min(maxLength, this.objList.length);
        if (this.currentSelect >= maxLength) {
            this.currentSelect -= maxLength;
            this.currentOffset = 0;
            this.updateObjList();
        }
        else if (this.currentSelect < 0) {
            this.currentSelect += maxLength;
            this.currentOffset = this.objList.length - maxLength;
            this.updateObjList();
        }

        // update game object
        var value = this.formulaBase + this.currentSelect*this.formulaMultiplier
        if (this.type == "horizontal") {
            this.obj.setX(value);
        }
        else if (this.type == "vertical") {
            this.obj.setY(value);
        }

        if (!this.initUpdate) {
            this.updateObjList();
            this.initUpdate = true;
            return true;
        }
        return false;
    }
    updateObjList() {
        for (var i in this.objList) {
            var value = this.objListFormulaBase + (i-this.currentOffset)*this.formulaMultiplier
            if (this.type == "horizontal") {
                this.objList[i].setX(value);
            }
            else if (this.type == "vertical") {
                this.objList[i].setY(value);
            }

            if (i-this.currentOffset >= 0 && i-this.currentOffset < this.getMaxLength()) {
                this.objList[i].setAlpha(1);
            }
            else {
                this.objList[i].setAlpha(0);
            }
        }
    }

    getMaxLength() {
        var maxLength = this.objList.length;
        if (this.forceLength != null) maxLength = this.forceLength
        return maxLength;
    }

    goDown() {
        if (this.type == "vertical") {
            this.currentSelect += 1;
            this.initUpdate = false; // force update
            this.skipEmpty(1);
        }
        else {
            console.log("Warning, non-vertical cursor tried to go down.")
        }
    }
    goUp() {
        if (this.type == "vertical") {
            this.currentSelect -= 1;
            this.initUpdate = false; // force update
            this.skipEmpty(-1);
        }
        else {
            console.log("Warning, non-vertical cursor tried to go up.")
        }
    }
    goRight() {
        if (this.type == "horizontal") {
            this.currentSelect += 1;
            this.initUpdate = false; // force update
            this.skipEmpty(1);
        }
        else {
            console.log("Warning, non-horizontal cursor tried to go right.")
        }
    }
    goLeft() {
        if (this.type == "horizontal") {
            this.currentSelect -= 1;
            this.initUpdate = false; // force update
            this.skipEmpty(-1);
        }
        else {
            console.log("Warning, non-horizontal cursor tried to go left.")
        }
    }

    skipEmpty(_value) {
        try {
            var value = this.objList[this.getCurrentSelect()].text;
            if (value == "") {
                this.currentSelect += _value;
            }
        }
        catch(e) {}
    }

    getCurrentSelect() {
        var a = this.currentSelect;
        a += this.currentOffset;
        return a;
    }
    getCurrentObject() {
        return this.objList[this.getCurrentSelect()];
    }

    setFormula(_base, _multiplier, _objListFormulaBase = 0) {
        this.formulaBase = _base;
        this.formulaMultiplier = _multiplier;
        this.objListFormulaBase = _objListFormulaBase;
    }
    setForcedLength(_forcedLength) {
        this.forceLength = _forcedLength;
    }
    resetForcedLength() {
        this.setForcedLength(null);
    }

    destroy() {
        return this.obj.destroy();
    }
}
