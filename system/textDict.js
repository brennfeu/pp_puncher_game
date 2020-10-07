class TextDict extends Phaser.GameObjects.Text {
    constructor(scene, x, y, text, style, _speed = null) {
        super(scene, x, y, text, style);

        this.duel = null;
        if (scene.sceneName == "Battle") this.duel = scene.duel;

        this.speed = _speed;
        this.speedCursor = 0;
        this.currentTextCursor = 0;
        this.memoryText = text;

        if (_speed != null) {
            super.setText(TextDict.updatedText(this.memoryText.substring(0, this.currentTextCursor)));
        }
    }

    setText(_text, _forceInstant = false, _memory = true) {
        if (_memory) this.memoryText = _text;
        var txt = _text;
        if (this.speed != null && !_forceInstant) txt = txt.substring(0, this.currentTextCursor);
        return super.setText(TextDict.updatedText(txt));
    }

    nextFrame() {
        if (this.speed == null);
        var txt = this.memoryText;

        if (!this.isShowingFullText()) {
            this.speedCursor += 1;
            if (this.speedCursor >= this.speed) {
                this.speedCursor = 0;
                this.currentTextCursor += 1;

                txt = txt.substring(0, this.currentTextCursor);
                this.setText(txt, false, false);
            }
        }
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

        if (!DEV_MODE) {
            // Parody Names
            for (var i in TextDict.DICT) {
                txt = txt.split(i).join(TextDict.DICT[i]);
            }
        }

        return txt
    }
    static addDict(_wordToChange, _wordThatReplaces) {
        TextDict.DICT[_wordToChange] = _wordThatReplaces;
    }
}
TextDict.DICT = {};

TextDict.addDict("69", "69 (lol)");

TextDict.addDict("IKEA", "DIKEA");
TextDict.addDict("Ikea", "Dikea");
TextDict.addDict("Free Lives", "Free Loves");
TextDict.addDict("Senjougahara", "Senjouhagara");
TextDict.addDict("Ryuko", "Myuko");
