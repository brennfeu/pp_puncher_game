class TextDict extends Phaser.GameObjects.Text {
    constructor(scene, x, y, text, style, _speed = null) {
        super(scene, x, y, text, style);

        this.duel = null;
        if (scene.sceneName == "Battle") this.duel = scene.duel;

        this.speed = _speed;
        this.speedCursor = 0;
        this.currentTextCursor = 0;
        this.memoryText = text;

        this.lastRegisteredTimestamp = null;
        this.hasStarted = false;

        if (_speed != null) {
            super.setText(TextDict.updatedText(this.memoryText.substring(0, this.currentTextCursor)));
        }
    }

    setText(_text, _forceInstant = false, _memory = true) {
        if (_memory && this.memoryText != _text) this.lastRegisteredTimestamp = getCurrentMilliTimestamp();
        if (_memory) this.memoryText = _text;

        var txt = _text;
        if (this.speed != null && !_forceInstant) txt = txt.substring(0, this.currentTextCursor);
        return super.setText(TextDict.updatedText(txt));
    }

    nextFrame() {
        if (this.speed == null) return;
        if (!this.hasStarted) {
            this.hasStarted = true;
            this.lastRegisteredTimestamp = getCurrentMilliTimestamp();
        }

        // 1+ seconds means it doesn't count (options opened or something)
        if (this.lastRegisteredTimestamp + 1000 < getCurrentMilliTimestamp()) this.lastRegisteredTimestamp = getCurrentMilliTimestamp();

        if (!this.isShowingFullText()) {
            this.speedCursor += Math.floor((getCurrentMilliTimestamp()-this.lastRegisteredTimestamp)/8);
            this.lastRegisteredTimestamp = getCurrentMilliTimestamp();

            if (this.speedCursor >= this.speed) {
                this.currentTextCursor += this.speedCursor-this.speed+1;
                this.speedCursor = 0;

                var txt = this.memoryText;
                txt = txt.substring(0, this.currentTextCursor);
                this.setText(txt, false, false);
            }
        }
        else this.lastRegisteredTimestamp = getCurrentMilliTimestamp();
    }
    isShowingFullText() {
        return this.currentTextCursor >= this.memoryText.length;
    }
    showFullText() {
        this.currentTextCursor = this.memoryText.length;
        this.speedCursor = 0;
        this.setText(this.memoryText);
    }
    resetCursor() {
        this.speedCursor = 0;
        this.currentTextCursor = 0;
    }

    static updatedText(_txt) {
        var txt = _txt;

        // stand
        txt = txt.split("stand").join("stånd");
        txt = txt.split("Stand").join("Stånd");

        // parody names
        if (!DEV_MODE) {
            // Parody Names
            for (var i in TextDict.DICT) {
                txt = txt.split(i).join(TextDict.DICT[i]);
            }
        }
        // christian
        if (CURRENT_SCENE != null && (
          (CURRENT_SCENE.duel != null && CURRENT_SCENE.duel.christianText) ||
          (!ProgressManager.isStepCompleted(36, 6) && CURRENT_SCENE.area != null && CURRENT_SCENE.area.id == 4) ||
          (!ProgressManager.isStepCompleted(36, 6) && CURRENT_SCENE.duel != null && CURRENT_SCENE.duel.place.id == 4))) {
            txt = txt.split("PP").join("Power Puff Girl");
            txt = txt.split("Pp").join("Power Puff Girl");
            txt = txt.split("pp").join("power puff girl");
        	txt = txt.split("Punch").join("Hug");
        	txt = txt.replace(/hitler/gi, "Angry German");
        	txt = txt.replace(/villager/gi, "infidel");
        	txt = txt.replace(/dick/gi, "Richard");
        	txt = txt.replace(/raped/gi, "raked");
        	txt = txt.replace(/satan/gi, "Stanley");
        	txt = txt.replace(/hell/gi, "Hottube");
        	txt = txt.replace(/gay/gi, "Brenn");
        	txt = txt.replace(/kidney stone/gi, "volleyball");
        	txt = txt.replace(/circumcised/gi, "trims");
        	txt = txt.replace(/punches/gi, "hugs");
        	txt = txt.replace(/punching/gi, "hugging");
        	txt = txt.replace(/punch/gi, "hug");
        	txt = txt.replace(/dong/gi, "dog");
        	txt = txt.replace(/espinoza/gi, "Uncle");
        	txt = txt.replace(/hog/gi, "Teddy Bear");
        	txt = txt.replace(/ancient Fungus/gi, "Papa Stalin");
        	txt = txt.replace(/furry/gi, "Hairy Man");
        	txt = txt.replace(/fuck/gi, "duck");
        	txt = txt.replace(/cum/gi, "milky white substance");
            txt = txt.replace("SEXUAL CONFUSION", "ROMANTIC TENSION");
        	txt = txt.replace("Wyndoella", "God");
        }
        // uwu
        if (CURRENT_SCENE != null && CURRENT_SCENE.duel != null && CURRENT_SCENE.duel.uwuText) {
            txt = txt.split("r").join("w");
        	txt = txt.split("R").join("W");
        }
        // leet
        if (CURRENT_SCENE != null && CURRENT_SCENE.duel != null && CURRENT_SCENE.duel.leetTextCountdown > 0) {
            txt = txt.split("o").join("0");
        	txt = txt.split("O").join("0");
        	txt = txt.split("i").join("1");
        	txt = txt.split("I").join("1");
        	txt = txt.split("e").join("3");
        	txt = txt.split("E").join("3");
        	txt = txt.split("a").join("4");
        	txt = txt.split("A").join("4");
        	txt = txt.split("s").join("5");
        	txt = txt.split("S").join("5");
        	txt = txt.split("b").join("8");
        	txt = txt.split("B").join("8");
        }

        // christmas
        if (isInDates(new Date(currentyear, 12 -1, 15), new Date(currentyear+1, 1 -1, 1))) {
            txt = txt.split("pp").join("present");
            txt = txt.split("Pp").join("Present");
            txt = txt.split("PP").join("Present");

            txt = txt.split("Puncher").join("Gifter");
            txt = txt.split("punche").join("gift");
            txt = txt.split("Punch").join("Gift");
            txt = txt.split("punch").join("gift");
        }
        // halloween
        if (isInDates(new Date(currentyear, 10 -1, 20), new Date(currentyear, 11 -1, 1))) {
            txt = txt.split("Puncher").join("Spooker");
            txt = txt.split("punche").join("spook");
            txt = txt.split("Punch").join("Spook");
            txt = txt.split("punch").join("spook");
        }

        // reverse texte: txt = txt.split("").reverse().join("").split(" ").reverse().join(" ")

        return txt.split("|").join("\n").split("`").join("'");
    }
    static addDict(_wordToChange, _wordThatReplaces) {
        TextDict.DICT[_wordToChange] = _wordThatReplaces;
    }

    static speedToText(_nb) {
        switch(_nb) {
            case 0: return "Slow";
            case 1: return "Normal";
            case 2: return "Fast";
            case 3: return "SuperSonic";
        }
        return "Invalid Speed: " + _nb
    }
    static getNextSpeed(_nb) {
        var nb = _nb+1;
        if (nb > 3) nb = 0;
        return nb;
    }
}
TextDict.DICT = {};

TextDict.addDict(" 69 ", " 69 (lol) ");

TextDict.addDict("IKEA", "DIKEA");
TextDict.addDict("Ikea", "Dikea");
TextDict.addDict("Free Lives", "Free Loves");
TextDict.addDict("Power Puff", "Puff Power");

TextDict.addDict("Senjougahara", "Senjouhagara");
TextDict.addDict("Ryuko", "Myuko");
TextDict.addDict("Kurisu", "Rukisu");
TextDict.addDict("Astolfo", "Astalfo");
TextDict.addDict("Rias", "Lias");
TextDict.addDict("Megumin", "Mugemax");
TextDict.addDict("Roxy", "Roxi");
TextDict.addDict("Kaguya", "Kayuga");

TextDict.addDict("Mongo", "Bongo");
