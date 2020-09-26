class Event {
    constructor(_id, _name, _description, _function, _likeness = 1, _nbMoveRequired = 0) {
        this.id = _id;
        this.name = _name;
        this.description = _description;
        this.effectFunction = _function;
        this.likeness = _likeness;
        this.nbMoveRequired = _nbMoveRequired;
    }

    getDescription() {
        var txt = this.name + "\n\n";
        txt += this.description + "\n\n";
        txt += "Chance to appear: " + this.likeness + "%";
        if (this.nbMoveRequired > 0) {
            txt += "\nMove Required: " + this.nbMoveRequired;
        }
        return txt;
    }
}

class EventManager {
    static addEvent(_name, _description, _function, _likeness = 1, _nbMoveRequired = 0) {
        EventManager.EVENT_LIST.push(new Event(EventManager.EVENT_LIST.length, _name,_description,  _function, _likeness, _nbMoveRequired));
    }

    static getEvent(_id) {
        return EventManager.EVENT_LIST[_id];
    }
}
EventManager.EVENT_LIST = [];

EventManager.addEvent(
    "PP Equality", // 0
    "Moves' DEX modifier have no effect for this turn.",
    function(_duel) {
        _duel.addMessage("There is no DEX modifier for moves for this turn!");
        _duel.noDexModifier = true;
    }
);
EventManager.addEvent(
    "PP Purge", // 1
    "Illegal moves can be used freely for this turn.",
    function(_duel) {
        _duel.addMessage("All PPs grow a mohawk and start to roam the streets.");
        _duel.addMessage("Illegal moves can now be used freely for this turn.");
        _duel.illegalLegal = true;
    }
);
EventManager.addEvent(
    "Sexual Confusion", // 2
    "Movepool only consists of (?) for this turn.",
    function(_duel) {
        _duel.addMessage("Your PPs are confused for this turn.");
        _duel.forceConfusion = true;
    }
);
EventManager.addEvent(
    "PP Enlightenment", // 3
    "Makes cheating (using the PP Bible) allowed. Illegal moves are still illegal.",
    function(_duel) {
        _duel.addMessage("Your PP temporarily become enlightened. All moves can now be used for this turn, using the PP Bible.");
        _duel.addMessage("Illegal moves are still illegal.");
        _duel.allowCheating = true;
    }
);
