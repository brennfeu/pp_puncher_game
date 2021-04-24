class Duel {
    constructor(_heroes, _encounter, _place, _parameters = {}) {
        this.heroes = _heroes;
        this.encounter = _encounter;
        this.enemies = []; // get loaded later with the encounter
        this.place = _place;

        this.duelState = ""; // "heroChoice", "moveChoice", "targetChoice", "movePlaying", "turnChange", "victory", "defeat"
        this.forcedState = "";

        this.memoryMoves = []; // {"user":(fighterObject), "target":(fighterObject), "move":(moveObject)}
        this.memoryAnimations = []; // {"duration":(nbFrames), "image":(linkOfAnimationImage), "fighter":(fighterObject), "randomized":(bool), "isAbove":(bool)}
        this.memorySoundEffects = [];
        this.memoryDialogues = [];
        this.memoryTurnChange = []; // functions

        this.eventMemory = [];
        this.lastEvent = null;
        this.forceEventLoop = 0;

        this.currentFighterIndex = 0;
        this.mainFighter = null; // just for looks

        // load enemies in enemies var
        for (var i in this.encounter.enemyList) {
            this.enemies.push(this.encounter.enemyList[i]);
        }

        this.messageList = [];
        this.messageTitle = "";

        this.moveCount = 0;
        this.turnCount = 0;

        // effects
        this.forcedDuelEffects = null;
        this.steelProtection = false;
        this.barrelWeakening = false;
        this.noDexModifier = false;
        this.illegalLegal = false;
        this.forceConfusion = false;
        this.allowCheating = false;
        this.forceSatan = false;
        this.triggeredChaos = false;

        this.uwuText = false;
        this.christianText = false;
        this.sexyTextCountdown = 0;
        this.leetTextCountdown = 0;
        this.randomCapTextCountdown = 0;

        // parameters
        this.parameters = {};
        for (var i in _parameters) {
            this.parameters[i] = _parameters[i];
        }

        // arcademode
        this.arcadeModeCounter = 0;
        this.ogPlace = this.place;
        if (this.checkParam("arcadeMode", true)) {
            var s = QuestManager.getQuest(this.getParam("arcadeQuestStarter")).getArcadeModeSteps();
            var encounter = new Encounter(s[this.arcadeModeCounter].encounter);
            this.place = AreaManager.getArea(QuestManager.getQuest(this.getParam("arcadeQuestStarter")).areaId);

            this.changeEncounter(encounter);
        }

        // next encounters
        this.nextEncounters = [];
        if (this.hasParam("nextEncounters")) {
            this.nextEncounters = this.getParam("nextEncounters").slice();
        }

        // Objects on screen --> instantiated by battle scene
        this.logTitleObject = null;
        this.logTextObject = null;
        this.moveObjects = [];
    }
    checkParam(_param, _value) {
        return this.parameters[_param] != null && this.parameters[_param] == _value;
    }
    hasParam(_param) {
        return this.parameters[_param] != null && this.parameters[_param] != undefined;
    }
    getParam(_param) {
        return this.parameters[_param];
    }

    changeEncounter(_enc) {
        for (var i in this.enemies) {
            this.enemies[i].destroyObjects();
        }
        this.enemies = [];
        for (var i in _enc.enemyList) {
            Logger.log("Enemy instanciation", "duelShit", _enc.enemyList[i])
            this.enemies.push(_enc.enemyList[i]);
            _enc.enemyList[i].duel = this;
            _enc.enemyList[i].initForDuel();
        }
    }

    startDuel() {
        var l = this.getAllFighters();
        for (var i in l) {
            l[i].duel = this; // can't do it in constructor cause not instantiated yet :(
            l[i].initForDuel();
        }

        this.setTitle("DUEL START");

        // when saving waifus
        if (this.checkParam("waifuDetermination", true)) {
            for (var i in this.heroes) {
                this.heroes[i].waifuDetermination = 5;
            }
        }

        // special area effects
        if (this.place.id == 3 && ProgressManager.getUnlockedGods().length > 0) {
            // allfaiths temple forces charges
            this.triggerEvent(4);
        }

        // random start event?
        if (!this.rollEvent(true)) {
            // start first turn
            this.startNewTurn(true);
        }
    }

    startNewTurn(_skipTurnChange = false) {
        if (["victory", "defeat"].indexOf(this.duelState) > -1) return;
        if (["victory", "defeat"].indexOf(this.forcedState) > -1) return this.duelState = this.forcedState;

        this.selectedHero = null;
        this.selectedMove = null;

        if (!_skipTurnChange) {
            this.duelState = "turnChange";
            this.currentFighterIndex = 0;
            this.setTitle("TURN CHANGE");

            return this.turnChangeNext();
        }

        var nb = 0;
        for (var i in this.heroes) {
            if (this.heroes[i].isAlive()) {
                nb += 1;
            }
        }
        if (nb == 0) {
            this.setTitle("DEFEAT");
            this.duelState = "defeat";
            return;
        }

        nb = 0;
        for (var i in this.enemies) {
            if (this.enemies[i].isAlive() || this.enemies[i].nextPhase != null) {
                nb += 1;
            }
        }
        if (nb == 0) {
            // next encounter
            if (this.nextEncounters.length > 0) {
                var encounter = new Encounter(this.nextEncounters[0]);
                this.nextEncounters.splice(0, 1);

                this.changeEncounter(encounter);
                return this.startNewTurn(true);
            }

            // arcade mode next
            if (this.checkParam("arcadeMode", true)) {
                this.arcadeModeCounter += 1;
                var s = QuestManager.getQuest(this.getParam("arcadeQuestStarter")).getArcadeModeSteps();
                if (this.arcadeModeCounter < s.length) {
                    var encounter = new Encounter(s[this.arcadeModeCounter].encounter)

                    this.changeEncounter(encounter);
                    return this.startNewTurn(true);
                }
            }

            this.setTitle("VICTORY");
            this.duelState = "victory";
            return;
        }

        this.nextTurnEffects();
        if (this.duelState == "defeat") return;
        this.rollEvent();
        if (this.duelState == "eventPlay") return;

        this.newTurn();
    }
    newTurn() {
        for (var i in this.heroes) {
            this.heroes[i].rollNewMovepool();
        }
        this.checkAllFightersAttacks();

        this.duelState = "heroChoice";
    }
    turnChangeNext() {
        var l = this.getAllFighters();

        if (this.memoryMoves.length > 0) {
            this.mainFighter = this.memoryMoves[0]["user"];
            this.memoryMoves[0]["user"].executeMove(this.memoryMoves[0]["move"], this.memoryMoves[0]["target"], true);
            this.memoryMoves.shift();
            return;
        }
        if (this.memoryTurnChange.length > 0) {
            this.addTextSeparator();
            this.memoryTurnChange[0](l[this.currentFighterIndex-1]);
            return this.memoryTurnChange.splice(0, 1);
        }
        if (this.currentFighterIndex+1 > l.length) {
            return this.startNewTurn(true);
        }
        for (var i in l) {
            if (i > this.currentFighterIndex) {
                this.currentFighterIndex = i;
            }
            if (i == this.currentFighterIndex) {
                this.mainFighter = l[i];
                this.mainFighter.turnChange();
                this.resetLog();
                this.currentFighterIndex += 1;
                if (this.memoryTurnChange.length > 0) {
                    this.memoryTurnChange[0](l[this.currentFighterIndex-1]);
                    return this.memoryTurnChange.splice(0, 1);
                }
                if (this.memoryMoves.length > 0) {
                    this.mainFighter = this.memoryMoves[0]["user"];
                    this.memoryMoves[0]["user"].executeMove(this.memoryMoves[0]["move"], this.memoryMoves[0]["target"], true);
                    this.memoryMoves.shift();
                    return;
                }
            }
        }
        return this.startNewTurn(true);
    }
    nextTurnEffects() {
        this.turnCount += 1;

        this.steelProtection = false;
        this.barrelWeakening = false;
        this.noDexModifier = false;
        this.illegalLegal = false;
        this.forceConfusion = false;
        this.allowCheating = false;
        this.sexyTextCountdown = Math.max(0, this.sexyTextCountdown-1);
        this.leetTextCountdown = Math.max(0, this.leetTextCountdown-1);
        this.randomCapTextCountdown = Math.max(0, this.randomCapTextCountdown-1);
        if (getRandomPercent() <= 50) this.forceSatan = false;

        if (this.checkParam("turnCountdown", this.turnCount)) {
            this.duelState = "defeat";
            return;
        }
    }
    rollEvent(_onlyStart = false) {
        this.forceEventLoop += 1;
        if (this.checkParam("forceEventLoop", this.forceEventLoop) && this.hasParam("forceEvent")) {
            this.forceEventLoop = 0;
            return this.triggerEvent(this.getParam("forceEvent"))
        }

        if (this.checkParam("forceBasicEvents", true)) return this.triggerEvent(randomFromList([0, 1, 2]));
        if (ProgressManager.getUnlockedGameMechanics().indexOf("Events") < 0) return false;

        var randomRoll = getRandomPercent();
        var events = ProgressManager.getUnlockedEvents();
        for (var i in events) {
            if (EventManager.getEvent(events[i]).onlyStart != _onlyStart) continue;

            randomRoll -= EventManager.getEvent(events[i]).likeness;
            if (randomRoll <= 0) {
                var ev = EventManager.getEvent(events[i]);
                if (ev.nbMoveRequired > this.moveCount) return;
                this.triggerEvent(ev.id);
                return true;
            }
        }
        return false;
    }
    eventNext() {
        if (this.eventMemory.length <= 0) return this.newTurn();

        this.resetLog();
        this.eventMemory[0].effectFunction(this);
        this.lastEvent = this.eventMemory[0].name;
        this.eventMemory.shift();
        return;
    }
    triggerEvent(_eventId) {
        this.setTitle("EVENT");
        this.duelState = "eventPlay";
        this.eventMemory.push(EventManager.getEvent(_eventId));
        this.eventNext();
        return true;
    }

    fighterSelectsMove(_fighter, _move, _target) {
        _fighter.chosenMove = _move;
        _fighter.chosenTarget = _target;

        if (_move != null) _fighter.moveHistory.push(_move);

        this.checkAllFightersAttacks();
    }

    checkAllFightersAttacks() {
        if (this.getValidHeroesNb() == 0) {
            this.enemiesSelectTheirMoves();
            return this.triggerAttacks(); // Starts all attacks
        }
    }
    enemiesSelectTheirMoves() {
        for (var i in this.enemies) {
            // select move?
            if (this.enemies[i].chosenMove == null) {
                this.enemies[i].selectMove();

                this.enemies[i].moveHistory.push(this.enemies[i].chosenMove);
            }

            // select target?
            if (this.enemies[i].chosenMove != null && this.enemies[i].chosenMove.newInstance().needsTarget
                && this.enemies[i].chosenTarget == null) {
                this.enemies[i].selectTarget();
            }
        }
    }
    getValidHeroesNb() {
        var validHeroesNb = 0;
        for (var i in this.heroes) {
            if (this.heroes[i].canPlayThisTurn()) {
                validHeroesNb += 1;
            }
        }
        return validHeroesNb;
    }

    triggerAttacks() {
        this.duelState = "movePlaying";
        this.setTitle("ATTACKS");
        this.resetLog();

        var l = this.getAllFighters();
        for (var i in l) {
            if (l[i].possessCountdown > 0 && l[i].possessedBy != null && l[i].possessedBy.isAlive()) {
                l[i].chosenMove = l[i].possessedBy.chosenMove;
                l[i].chosenTarget = l[i].possessedBy.chosenTarget;
            }
            l[i].rollDEX();
        }

        this.currentFighterIndex = 0;
        this.triggerNextAttack();
    }
    triggerNextAttack() {
        if (this.memoryMoves.length > 0) {
            if (this.memoryMoves[0]["user"].isAlive()) this.addTextSeparator();
            this.mainFighter = this.memoryMoves[0]["user"];
            this.memoryMoves[0]["user"].executeMove(this.memoryMoves[0]["move"], this.memoryMoves[0]["target"], true);
            this.memoryMoves.shift();
            return;
        }

        if (this.currentFighterIndex+1 > this.getAllFighters(true).length) {
            return this.startNewTurn();
        }

        var f = this.getAllFighters(true)[this.currentFighterIndex];
        if (f.isAlive() && f.chosenMove != null) {
            var oppDEX = 0;
            if (f.chosenMove.newInstance().needsTarget) {
                oppDEX = f.chosenTarget.rolledDEX;
            }
            else {
                var nb = 0;
                for (var i in this.getOppsOf(f)) {
                    if (this.getOppsOf(f)[i].isAlive()) {
                            oppDEX += this.getOppsOf(f)[i].rolledDEX;
                            nb += 1;
                    }
                }
                if (nb == 0) {
                    oppDEX = -999999999;
                }
                else {
                    oppDEX = Math.floor(oppDEX/nb);
                }
            }

            this.mainFighter = f;
            if (this.mainFighter.isAlive() && this.messageList.length > 0) this.addTextSeparator();

            if (this.mainFighter.chosenMove.newInstance().autoPass ||
                    this.mainFighter.cannotFailMove ||
                    this.mainFighter.rolledDEX + 10 >= oppDEX ||
                    (this.checkParam("autoPunch", true) && this.mainFighter.chosenMove == PunchingPP)) {
                this.launchMove(this.getAllFighters(true)[this.currentFighterIndex]);
                this.getAllFighters(true)[this.currentFighterIndex].DEXBonus = 0;
            }
            else {
                this.mainFighter.DEXBonus += 5;
                if (this.mainFighter.hasStand(4) && this.mainFighter.chosenMove == Hologram) this.mainFighter.DEXBonus += 5;

                this.addMessage(this.mainFighter.getName() + "'s move failed!");
                this.addAnimation("miss", 60, this.mainFighter);
            }
        }
        else {
            this.currentFighterIndex += 1;
            return this.triggerNextAttack();
        }

        this.currentFighterIndex += 1;
    }
    launchMove(_fighter) {
        var illegal = false;

        // illegal percentage
        if (!this.illegalLegal) {
            illegal = _fighter.chosenMove.newInstance().illegal > _fighter.rollLuckPercentLow();
            if (_fighter.badLuck && _fighter.chosenMove.newInstance().illegal > 0) {
                illegal = true;
            }
        }

        // cheating
        if (_fighter.isHero() && // only heroes cheat:
          _fighter.currentMovepool.indexOf(_fighter.chosenMove) < 0 && // if not in movepool
          _fighter.rollLuckPercentLow() <= _fighter.chosenMove.newInstance().getCheatProb() && // and cheating roll fail
          !this.allowCheating) {
            illegal = true;
        } // and cheating is forbidden

        // dev cheat always works
        if (_fighter.chosenMove.newInstance().type == "Dev Test") {
            illegal = false;
        }

        if (illegal) {
            _fighter.increaseLuck();
            this.addMessage(_fighter.getName() + " is doing illegal stuff! He looses 20 DEX and 10 STR.");
            this.addAnimation("illegal", 60, _fighter);
            this.memorySoundEffects.push("lightning");
            _fighter.DEXValue -= 20;
            _fighter.STRValue -= 10;
            return;
        }

        _fighter.executeMove();
        _fighter.checkForStand();
    }

    getAllFighters(_orderByDexRoll = false) {
        if (_orderByDexRoll) {
            var l = this.getAllFighters().sort((a,b) => (a.rolledDEX < b.rolledDEX) ? 1 : ((b.rolledDEX > a.rolledDEX) ? -1 : 0));
            return l.sort((a,b) => (b.chosenMove == null) ? -1 : (a.chosenMove == null) ? 1 : b.chosenMove.newInstance().priority - a.chosenMove.newInstance().priority);
        }
        return this.heroes.concat(this.enemies).slice();
    }
    getRandomFighter(_allowDead = false) {
        var nb = 0;
        while (nb < 1000) {
            nb += 1;
            var f = randomFromList(this.getAllFighters());
            if (f.isAlive() || _allowDead) {
                return f;
            }
        }
        return randomFromList(this.getAllFighters());
    }
    getOppsOf(_fighter) {
        if (_fighter.isHero()) {
            return this.enemies.slice();
        }
        return this.heroes.slice();
    }
    getAlliesOf(_fighter, _includesFighter = false) {
        var liste = this.enemies.slice();
        if (_fighter.isHero()) {
            liste = this.heroes.slice();
        }
        if (!_includesFighter) {
            for (var i in liste) {
                if (liste[i].id == _fighter.id) {
                    liste.splice(i, 1);
                    break;
                }
            }
        }
        return liste;
    }
    getFighterFromId(_id) {
        var l = this.getAllFighters();
        for (var i in l) {
            if (l[i].id == _id) return l[i];
        }
        return null;
    }
    fakeFighter(_name, _Class = FakeEnemy) {
        var a = new _Class(_name);
        a.duel = this;
        return a;
    }

    getTheme() {
        if (this.duelState == "victory" && this.getVictoryTheme() != null) return this.getVictoryTheme();
        if (this.hasBoss()) return this.place.getBossTheme();
        return this.place.getBattleTheme();
    }
    getVictoryTheme() {
        if (this.hasBoss() || this.checkParam("arcadeMode", true)) return this.place.getVictoryTheme();
        return null;
    }
    hasBoss() {
        for (var i in this.enemies) {
            if (this.enemies[i].isBoss) {
                return true
            }
        }
        return false
    }

    addAnimation(_image, _duration, _fighter, _randomized = false, _isAbove = true) {
        var dict = {};
        dict["image"] = _image;
        dict["duration"] = _duration;
        dict["fighter"] = _fighter;
        dict["randomized"] = _randomized;
        dict["isAbove"] = _isAbove;
        dict["animObject"] = null;
        this.memoryAnimations.push(dict);
    }

    addMessage(_message) {
        var message = _message.split("\n").join("|");

        // real messages may get a change lol
        if (message.length > 3 && message.split(" ").length > 1) {
            if (this.randomCapTextCountdown > 0) {
                var lettres = message.split("");
            	for (var i = 0; i < lettres.length; i++) {
            		if (getRandomPercent() <= 33) {
            			lettres[i] = lettres[i].toUpperCase();
            		}
            	}
            	message = lettres.join("");
            }
            if (this.uwuText) {
                message = message.split(" ");
                for (var i in message) {
                    if (getRandomPercent() <= 5 && /^[a-zA-Z]+$/.test(message[i])) {
                        message[i] = "fuck"
                    }
                }
                message = message.join(" ")

                if (getRandomPercent() <= 15) {
                    message += " uwu";
                }
                else if (getRandomPercent() <= 25) {
                    message += " owo";
                }
                else if (getRandomPercent() <= 35) {
                    message += " TwT";
                }
            }
        }

        this.messageList.push(message);
    }
    getAllMessages() {
        var str = "";
        for (var i in this.messageList) {
            str += this.messageList[i] + "\n";
        }
        return str;
    }
    resetLog() {
        this.messageList = [];
        this.logTextObject.resetCursor();
    }
    deleteFirstMessage() {
        if (this.messageList.length == 0) return;
        if (this.messageList[0] == "") {
            this.messageList.shift();
        }
        else {
            this.logTextObject.currentTextCursor -= this.messageList[0].split(" ")[0].length+1;
            this.messageList[0] = this.messageList[0].substr(this.messageList[0].split(" ")[0].length+1);
        }
        this.logTextObject.setText(this.getAllMessages());
    }
    addTextSeparator() {
        if (this.memoryMoves.length > 0 || this.memoryTurnChange.length > 0) return this.addMessage("\n")
        this.addMessage("\n-----------------\n");
    }
    setTitle(_message) {
        this.messageTitle = _message;
        this.logTitleObject.setText(this.messageTitle);
    }
    getDuelEffects() {
        if (this.forcedDuelEffects != null) return this.forcedDuelEffects;

        var txt = "";
        if (this.steelProtection) {
            txt += "- Damages are reduced to ";
            var amount = 10;
            if (this.barrelWeakening) amount = 30;
            txt += amount + "%.\n"
        }
        if (this.barrelWeakening) {
            txt += "- Damages are increased to 300%.\n"
        }
        if (this.noDexModifier) {
            txt += "- Moves' DEX modifiers have no effect.\n"
        }
        if (this.illegalLegal) {
            txt += "- Illegal moves can be used freely.\n"
        }
        if (this.allowCheating) {
            txt += "- Cheating can be used freely.\n"
        }
        if (this.forceSatan) {
            txt += "- Hell on Earth!\n"
        }
        if (this.hasParam("turnCountdown")) {
            txt += "- Turns Left: " + (this.getParam("turnCountdown") - this.turnCount) + "\n";
        }

        if (txt.length > 0) {
            txt = txt.slice(0, -1);
        }
        return txt;
    }

    triggerVictory() {
        this.forcedState = "victory";
        this.duelState = "victory";
        this.memoryMoves = [];
        this.memoryAnimations = [];
        this.memorySoundEffects = [];
        this.memoryDialogues = [];
        this.memoryTurnChange = [];
    }
}

Duel.SPECIAL_OBJECTS = ["logTextObject", "logTitleObject"];
