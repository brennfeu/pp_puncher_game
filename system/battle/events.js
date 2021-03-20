class Event {
    constructor(_id, _name, _description, _function, _likeness = 1, _nbMoveRequired = 0, _onlyStart = false) {
        this.id = _id;
        this.name = _name;
        this.description = _description;
        this.effectFunction = _function;
        this.likeness = _likeness;
        this.nbMoveRequired = _nbMoveRequired;
        this.onlyStart = _onlyStart;
    }

    getDescription() {
        var txt = this.name + "\n\n";
        txt += this.description + "\n\n";
        txt += "Chance to appear: " + this.likeness + "%";
        if (this.onlyStart) {
            txt += "\nMay only trigger at the start of a duel.";
        }
        else if (this.nbMoveRequired > 0) {
            txt += "\nRequired Moves: " + this.nbMoveRequired;
        }
        return txt;
    }
}

class EventManager {
    static addEvent(_name, _description, _function, _likeness = 1, _nbMoveRequired = 0, _onlyStart = false) {
        EventManager.EVENT_LIST.push(new Event(EventManager.EVENT_LIST.length, _name,_description,  _function, _likeness, _nbMoveRequired, _onlyStart));
    }
    static addStartEvent(_name, _description, _function, _likeness = 1) {
        EventManager.addEvent(_name, _description, _function, _likeness, undefined, true);
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
); // 1 (random numbers associated to the event, gotta make sure it doesn't go higher than 100)
EventManager.addEvent(
    "PP Purge", // 1
    "Illegal moves can be used freely for this turn.",
    function(_duel) {
        _duel.addMessage("All PPs grow a mohawk and start to roam the streets.");
        _duel.addMessage("Illegal moves can now be used freely for this turn.");
        _duel.illegalLegal = true;
    }
); // 2
EventManager.addEvent(
    "Sexual Confusion", // 2
    "Movepool only consists of (?) for this turn.",
    function(_duel) {
        _duel.addMessage("Your PPs are confused for this turn.");
        _duel.forceConfusion = true;
    }
); // 3
EventManager.addEvent(
    "PP Enlightenment", // 3
    "Makes cheating (using the PP Bible) allowed. Illegal moves are still illegal.",
    function(_duel) {
        _duel.addMessage("Your PP temporarily become enlightened. All moves can now be used for this turn, using the PP Bible.");
        _duel.addMessage("Illegal moves are still illegal.");
        _duel.allowCheating = true;
    }
); // 4
EventManager.addEvent(
    "Gods Birthday Gift", // 4
    "Grants a regular priest move charge to all fighters.",
    function(_duel) {
        _duel.addMessage("Gods have decided to bless this fight.");
        var l = _duel.getAllFighters();
        for (var i in l) {
            if (l[i].isDead()) continue;
            _duel.addMessage(l[i].getName() + " gets a regular charge!");
            l[i].regularCharges += 1;
        }
    },
    10,
    10
); // 5 - 14
EventManager.addEvent(
    "Gods Christmas Gift", // 5
    "Grants a special priest move charge to all fighters.",
    function(_duel) {
        _duel.addMessage("Gods have decided to bless this fight.");
        var l = _duel.getAllFighters();
        for (var i in l) {
            if (l[i].isDead()) continue;
            _duel.addMessage(l[i].getName() + " gets a special charge!");
            l[i].specialCharges += 1;
        }
    },
    3,
    25
); // 15 - 17
EventManager.addEvent(
    "Nudist Beach", // 6
    "All fighters gets negative effects removed.",
    function(_duel) {
        _duel.addMessage("Fear is freedom! Subjugation is liberation! Contradiction is truth! Those are the facts of this world! And you will all surrender to them, you pigs in human clothing!");
        var l = _duel.getAllFighters();
        for (var i in l) {
            if (l[i].isDead()) continue;
            l[i].resetStatus(true);
        }
    },
    1
); // 18
EventManager.addEvent(
    "PP Inquisition", // 7
    "The fighter with the lowest STR gains the Inquisitor buff, which grants an additional STR/10 damage done to people with higher STR.",
    function(_duel) {
        _duel.addMessage("The PP Inquisition is here to help the weak!");
        var l = _duel.getAllFighters();
        var alive = [];
        for (var i in l) {
            if (l[i].isAlive() && !l[i].isInquisitor) alive.push(l[i]);
        }

        if (alive.length == 0) return _duel.addMessage("But no one here is weak! Good job bros, may you punch PP in the name of Wyndoella!");

        var lowest = alive[0];
        for (var i in alive) {
            if (lowest.STR > alive[i].STR) lowest = alive[i];
        }

        _duel.addMessage(lowest.getName() + " becomes an Inquisitor! May you punch PP in the name of Wyndoella!");
        lowest.isInquisitor = true;
    },
    1
); // 19
EventManager.addStartEvent(
    "Christian Game", // 8
    "Activates christian mode for the whole battle.",
    function(_duel) {
        _duel.addMessage("Let's be a bit more friendly! :)");
        _duel.christianText = true;
    },
    5
); // (alt) 1 - 5
