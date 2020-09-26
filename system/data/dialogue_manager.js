class Dialogue {
    constructor(_data, _id) {
        this.id = _id;

        this.dialogueLines = [];
        for (var i in _data.dialogueLines) {
            this.dialogueLines.push(new DialogueLine(_data.dialogueLines[i], i))
        }
    }

    getLine(_id) {
        return this.dialogueLines[_id];
    }
}
class DialogueLine {
    constructor(_data, _id) {
        this.id = _id;

        this.speaker = _data.speaker;
        this.text = _data.text;
    }
}

class DialogueManager {
    static addDialogue(_area) {
        DialogueManager.DIALOGUE_LIST.push(_area);
    }
    static getDialogue(_id) {
        return DialogueManager.DIALOGUE_LIST[_id];
    }
    static getDialogueLine(_idD, _idL) {
        return DialogueManager.getDialogue(_idD).getLine(_idL);
    }

    static loadList(_list) {
        for (var i in _list) {
            DialogueManager.addDialogue(new Dialogue(_list[i], i));
        }
    }
}
DialogueManager.DIALOGUE_LIST = [];
