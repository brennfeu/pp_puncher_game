class BattleScene extends Scene {
    constructor() {
        super({key:"Battle"});
    }

    init(_data) {
        this.duel = _data["duel"];
        this.currentQuest = _data["quest"];

        if (this.duel == undefined) {
            var q = QuestManager.getQuest(this.currentQuest[0]);
            var s = q.getStep(this.currentQuest[1]);

            this.duel = new StoryDuel(PartyManager.getCurrentParty(), new Encounter(s.encounter), AreaManager.getArea(q.areaId), s.duelParam);
        }

        this.lastDuelEvent = null;
        this.isShowingEvent = false;
        this.eventTitleObj = null;
        this.eventBackground = null;

        this.moveList = [];
        this.moveFrame = null;

        this.selectionDirection = "";

        this.cursorHero = null;
        this.cursorMove = null;
        this.cursorTarget = null;
        this.currentSelectHero = 0; // array id of the current selection
        this.currentSelectMove = 0; // array id of the current selection
        this.currentSelectTarget = 0; // array id of the current selection

        this.selectedHero = null;
        this.selectedMove = null;

        this.duelStatusFrame = null;
        this.duelStatusTitle = null;
        this.duelStatus = null;

        this.blockedHeroFrames = [];

        this.autoSkipSpeed = 60;
        this.autoSkipCountdown = this.autoSkipSpeed;
        this.autoSkipNb = 0;
    }

    preload() {
        this.startLoadingScreen();

        this.loadOptionsResources();
        this.loadDialogueResources();
        this.loadBibleResources();
        this.loadUiSounds();

        this.loadImage("ui/cursor.png");
        this.loadImage("ui/battle/hero_frame_blocked.png");
        this.loadImage("ui/battle/hero_move_frame.png");
        this.loadImage("ui/battle/log_frame.png");
        this.loadImage("ui/battle/heroes_bar.png");
        this.loadImage("ui/battle/move_frame.png");
        this.loadImage("ui/battle/event_bar.png");

        this.loadBattleAnimations();
        this.loadStatusIcons();
        this.loadBattleSounds();

        this.loadMusic(this.duel.place.getBattleTheme() + ".mp3");
        this.loadMusic(this.duel.place.getBossTheme() + ".mp3");
        this.loadMusic(this.duel.place.getVictoryTheme() + ".mp3");
    }

    create() {
        this.moveFrame = this.addImage("ui/battle/move_frame", 488, -1000);
        this.addImage("ui/battle/log_frame", 792, 0);

        this.duelStatusFrame = this.addImage("ui/battle/log_frame", 792, 1000);
        this.duelStatusTitle = this.addText("DUEL EFFECTS", 810, -1000, {fontStyle: 'bold'});
        this.duelStatus = this.addText("", 810, -1000, {fontSize: '21px', wordWrap: {width: 400, height: 550}});

        this.addImage("ui/battle/heroes_bar", 0, 561);

        for (var i in this.duel.heroes) {
            var xValue = 20 + i*300;
            var yValue = 574;
            this.duel.heroes[i].spriteObject = this.addText(this.duel.heroes[i].name, xValue, yValue+6, {fontStyle: 'bold'});
            this.duel.heroes[i].STRTextObject = this.addText("STR: " + this.duel.heroes[i].STR, xValue, yValue+6+37);
            this.duel.heroes[i].DEXTextObject = this.addText("DEX: " + this.duel.heroes[i].DEX, xValue, yValue+6+63);

            this.duel.heroes[i].moveFrameObject = this.addImage("ui/battle/hero_move_frame", xValue-6, -1000);
            this.duel.heroes[i].moveFrameText = this.addText("", xValue+1, -1000, {fontSize: '21px'});

            this.duel.heroes[i].spriteX = xValue;
            this.duel.heroes[i].spriteY = yValue;

            var bf = this.addImage("ui/battle/hero_frame_blocked", xValue, yValue+6);
            bf.setAlpha(0);
            this.blockedHeroFrames.push(bf);
        }

        this.duel.logTitleObject = this.addText(this.duel.messageTitle, 810, 13, {fontStyle: 'bold'});
        this.duel.logTextObject = this.addText(this.duel.getAllMessages(), 810, 57, {fontSize: '21px', wordWrap: {width: 400, height: 550}}, getTextSpeed());

        this.cursorHero = this.addImage("ui/cursor", -1000, -1000);
        this.cursorMove = this.addText(">", -1000, -1000, {fontSize: '21px'});
        this.cursorTarget = this.addImage("ui/cursor", -1000, -1000);

        this.playMusic(this.duel.getTheme());

        this.stopLoadingScreen();

        var q = QuestManager.getQuest(this.currentQuest[0]);
        var s = q.getStep(this.currentQuest[1]);
        if (!ProgressManager.isStepCompleted(q.id, s.id)) {
            if (s.inFightDialogue != undefined) this.openDialogue(s.inFightDialogue);
        }
    }

    update() {
        if (this.isInOptions) {
            return this.optionsUpdate();
        }
        if (this.isInDialogue) {
            return this.dialogueUpdate();
        }
        if (this.isInBible) {
            return this.bibleUpdate();
        }

        this.checkEnemiesObjects();
        if (this.duel.getTheme() != this.currentMusic) this.playMusic(this.duel.getTheme());

        for (var i in this.duel.getAllFighters()) {
            this.duel.getAllFighters()[i].updateTextObjects();
        }
        for (var i in this.duel.heroes) {
            if (this.duel.heroes[i].canPlayThisTurn()) {
                this.blockedHeroFrames[i].setAlpha(0);
            }
            else {
                this.blockedHeroFrames[i].setAlpha(0.5);
            }
        }

        if (this.duel.duelState == "") {
            this.duel.startDuel();
            this.resetStatusIcons();
        }
        else if (this.duel.duelState == "heroChoice") {
            this.autoSkipCountdown = this.autoSkipSpeed;
            this.autoSkipNb = 0;

            this.duel.setTitle("FIGHTER CHOICE");
            this.cursorHero.setX(this.duel.heroes[this.currentSelectHero].spriteX + 20);
            this.cursorHero.setY(558);

            if (this.justPressedControl("RIGHT") || (!this.duel.heroes[this.currentSelectHero].canPlayThisTurn() && this.selectionDirection == "right")) {
                this.currentSelectHero += 1;
                this.selectionDirection = "right";
                this.updateMovepoolObjects();
                this.playSoundOK();
            }
            else if (this.justPressedControl("LEFT") || (!this.duel.heroes[this.currentSelectHero].canPlayThisTurn() && this.selectionDirection == "left")) {
                this.currentSelectHero -= 1;
                this.selectionDirection = "left";
                this.updateMovepoolObjects()
                this.playSoundOK();
            }

            if (this.currentSelectHero < 0) {
                this.currentSelectHero += this.duel.heroes.length;
            }
            if (this.currentSelectHero >= this.duel.heroes.length) {
                this.currentSelectHero -= this.duel.heroes.length;
            }

            this.duel.logTextObject.setText(this.duel.heroes[this.currentSelectHero].getDescription(), true);
            if (this.moveList.length == 0) this.updateMovepoolObjects();

            if (this.justPressedControl("ENTER")) {
                this.playSoundSelect();
                this.selectedHero = this.duel.heroes[this.currentSelectHero];
                this.duel.duelState = "moveChoice";
                this.currentSelectMove = 0;
            }
        }
        else if (this.duel.duelState == "moveChoice") {
            this.duel.setTitle("MOVE CHOICE");
            this.cursorMove.setX(500);
            this.cursorMove.setY(this.currentSelectMove*18+542-(this.moveList.length*18));

            if (this.justPressedControl("DOWN")) {
                this.currentSelectMove += 1;
                this.playSoundOK();
            }
            else if (this.justPressedControl("UP")) {
                this.currentSelectMove -= 1;
                this.playSoundOK();
            }

            if (this.currentSelectMove < 0) {
                this.currentSelectMove += this.duel.heroes[this.currentSelectHero].currentMovepool.length;
            }
            if (this.currentSelectMove >= this.duel.heroes[this.currentSelectHero].currentMovepool.length) {
                this.currentSelectMove -= this.duel.heroes[this.currentSelectHero].currentMovepool.length;
            }

            this.duel.logTextObject.setText(this.duel.heroes[this.currentSelectHero].currentMovepool[this.currentSelectMove].newInstance().getDescription(), true);

            if (this.justPressedControl("BACK")) {
                this.playSoundSelect();
                this.duel.duelState = "heroChoice";
                this.cursorMove.setX(-1000);
            }
            else if (this.justPressedControl("ENTER")) {
                this.selectMove(this.duel.heroes[this.currentSelectHero].currentMovepool[this.currentSelectMove]);
                this.updateMovepoolObjects();
            }
        }
        else if (this.duel.duelState == "targetChoice") {
            this.duel.setTitle("TARGET CHOICE");
            this.cursorTarget.setX(this.duel.enemies[this.currentSelectTarget].spriteX + 20);
            this.cursorTarget.setY(this.duel.enemies[this.currentSelectTarget].spriteY - 22);

            if (this.justPressedControl("RIGHT") || (!this.duel.enemies[this.currentSelectTarget].canPlayThisTurn() && this.selectionDirection == "right")) {
                this.currentSelectTarget += 1;
                this.selectionDirection = "right";
                this.playSoundOK();
            }
            else if (this.justPressedControl("LEFT") || (!this.duel.enemies[this.currentSelectTarget].canPlayThisTurn() && this.selectionDirection == "left")) {
                this.currentSelectTarget -= 1;
                this.selectionDirection = "left";
                this.playSoundOK();
            }

            if (this.currentSelectTarget < 0) {
                this.currentSelectTarget += this.duel.enemies.length;
            }
            if (this.currentSelectTarget >= this.duel.enemies.length) {
                this.currentSelectTarget -= this.duel.enemies.length;
            }

            this.duel.logTextObject.setText(this.duel.enemies[this.currentSelectTarget].getDescription(), true);

            if (this.justPressedControl("BACK")) {
                this.playSoundSelect();
                this.duel.duelState = "moveChoice";
                this.cursorTarget.setX(-1000);
            }
            else if (this.justPressedControl("ENTER")) {
                this.playSoundSelect();
                this.duel.duelState = "heroChoice";

                this.duel.fighterSelectsMove(this.selectedHero, this.selectedMove, this.duel.enemies[this.currentSelectTarget]);
                this.selectedHero = null;
                this.selectedMove = null;

                this.currentSelectHero = 0;
                this.cursorHero.setX(-1000);
                this.currentSelectMove = 0;
                this.cursorMove.setX(-1000);
                this.currentSelectTarget = 0;
                this.cursorTarget.setX(-1000);

                this.selectionDirection = "right";
                this.updateMovepoolObjects();
            }
        }
        else if (this.duel.duelState == "movePlaying") {
            this.duel.logTextObject.setText(this.duel.getAllMessages());
            this.duel.logTextObject.nextFrame();

            if (this.moveList.length > 0) this.updateMovepoolObjects(true);

            if (GlobalVars.get("settings")["battleAutoNext"] && this.duel.logTextObject.isShowingFullText()) {
                this.autoSkipCountdown -= 1;
            }

            if (this.justPressedControl("ENTER") || this.autoSkipCountdown <= 0) {
                if (!this.duel.logTextObject.isShowingFullText()) {
                    return this.duel.logTextObject.showFullText();
                }
                if (!GlobalVars.get("settings")["battleAutoNext"]) {
                    this.playSoundSelect();
                }
                this.duel.triggerNextAttack();
                this.resetStatusIcons();
                this.autoSkipNb += 1;
                this.autoSkipCountdown = Math.max(1, this.autoSkipSpeed - this.autoSkipNb);
            }

            while (this.duel.logTextObject.height > Math.min(500, this.duelStatusFrame.y-60)) {
                this.duel.deleteFirstMessage();
            }
        }
        else if (this.duel.duelState == "turnChange") {
            this.duel.logTextObject.setText(this.duel.getAllMessages());
            this.duel.logTextObject.nextFrame();

            if (GlobalVars.get("settings")["battleAutoNext"] && this.duel.logTextObject.isShowingFullText()) {
                this.autoSkipCountdown -= 1;
            }

            if (this.justPressedControl("ENTER") || this.autoSkipCountdown <= 0) {
                if (!this.duel.logTextObject.isShowingFullText()) {
                    return this.duel.logTextObject.showFullText();
                }
                if (!GlobalVars.get("settings")["battleAutoNext"]) {
                    this.playSoundSelect();
                }
                this.duel.turnChangeNext();
                this.resetStatusIcons();
                this.autoSkipNb += 1;
                this.autoSkipCountdown = Math.max(1, this.autoSkipSpeed - this.autoSkipNb);
            }

            while (this.duel.logTextObject.height > Math.min(500, this.duelStatusFrame.y-60)) {
                this.duel.deleteFirstMessage();
            }
        }
        else if (this.duel.duelState == "eventPlay") {
            this.duel.logTextObject.setText(this.duel.getAllMessages());

            if (GlobalVars.get("settings")["battleAutoNext"] && this.duel.logTextObject.isShowingFullText()) {
                this.autoSkipCountdown -= 1;
            }

            if (this.lastDuelEvent != this.duel.lastEvent && !this.duel.hasParam("forceEvent") && !this.duel.hasParam("forceBasicEvents")) {
                this.eventBackground = this.addImage("ui/blackScreen");
                this.eventBackground.setAlpha(0.5);
                this.eventTitleObj = this.addImage("ui/battle/event_bar", 0, 180);
                this.eventTitle = this.addText(this.duel.lastEvent, 50, 210,  {fontStyle: 'bold', fontSize: '60px'});

                this.isShowingEvent = true;
                this.lastDuelEvent = this.duel.lastEvent

                this.autoSkipNb += 1;
                this.autoSkipCountdown = Math.max(1, this.autoSkipSpeed - this.autoSkipNb);

                this.playSound("battle/event");
                return;
            }

            if (!this.isShowingEvent) this.duel.logTextObject.nextFrame();

            if (this.justPressedControl("ENTER") || this.autoSkipCountdown <= 0) {
                if (!GlobalVars.get("settings")["battleAutoNext"]) {
                    this.playSoundSelect();
                }

                if (this.isShowingEvent) {
                    this.eventTitleObj.destroy();
                    this.eventTitleObj = null;
                    this.eventTitle.destroy();
                    this.eventTitle = null;
                    this.eventBackground.destroy();
                    this.eventBackground = null;

                    this.isShowingEvent = false;
                    return;
                }
                else {
                    if (!this.duel.logTextObject.isShowingFullText()) {
                        return this.duel.logTextObject.showFullText();
                    }
                    this.duel.eventNext();
                    this.resetStatusIcons();
                    this.lastDuelEvent = null;
                }

                this.autoSkipNb += 1;
                this.autoSkipCountdown = Math.max(1, this.autoSkipSpeed - this.autoSkipNb);
            }

            while (this.duel.logTextObject.height > Math.min(500, this.duelStatusFrame.y-60)) {
                this.duel.deleteFirstMessage();
            }
        }
        else if (this.duel.duelState == "victory") {
            this.duel.logTextObject.setText("You won! :)");
            this.duel.logTextObject.nextFrame();

            if (this.forceTint.length == 0) { // runs just once in the loop
                for (var i in this.duel.heroes) {
                    if (this.duel.heroes[i].isAlive()) {
                        this.addToForceTint(this.duel.heroes[i].spriteObject);
                    }
                }

                var t = this.duel.getVictoryTheme();
                if (t != null) {
                    this.resetMusicTimers();
                    this.playMusic(t, false);
                }
            }

            if (this.justPressedControl("ENTER")) {
                if (!ProgressManager.isStepCompleted(parseInt(this.currentQuest[0]), parseInt(this.currentQuest[1]))) {
                    var q = QuestManager.getQuest(parseInt(this.currentQuest[0]));
                    var s = QuestManager.getStep(parseInt(this.currentQuest[0]), parseInt(this.currentQuest[1]));

                    GlobalVars.set("unlocksNext", [q.id, s.id]);

                    if (s.postFightDialogue != undefined) GlobalVars.set("dialogueNext", [q.areaId, s.postFightDialogue]);
                    if (s.postFightCutscene != undefined) GlobalVars.set("cutsceneNext", s.postFightCutscene);
                }

                ProgressManager.unlockStep(parseInt(this.currentQuest[0]), parseInt(this.currentQuest[1]));

                var data = {};
                data["areaId"] = this.duel.ogPlace.id;
                data["currentQuest"] = this.currentQuest;
                return this.switchScene("Area", data);
            }
        }
        else if (this.duel.duelState == "defeat") {
            this.duel.logTextObject.setText("You lost! :(");
            this.duel.logTextObject.nextFrame();

            if (this.forceTint.length == 0) {
                for (var i in this.duel.enemies) {
                    if (this.duel.enemies[i].isAlive()) {
                        this.addToForceTint(this.duel.enemies[i].spriteObject);
                    }
                }
            }

            if (this.justPressedControl("ENTER")) {
                var data = {};
                data["areaId"] = this.duel.ogPlace.id;
                data["currentQuest"] = this.currentQuest;
                return this.switchScene("Area", data);
            }
        }

        for (var i in this.duel.memoryAnimations) {
            if (this.duel.memoryAnimations[i].animObject == null) {
                var animX = this.duel.memoryAnimations[i].fighter.spriteX - 30;
                var animY = this.duel.memoryAnimations[i].fighter.spriteY;
                if (this.duel.memoryAnimations[i].randomized) {
                    animX += Math.floor(getRandomPercent()*this.duel.memoryAnimations[i].fighter.spriteObject.width/100);
                    animY += Math.floor(getRandomPercent()*this.duel.memoryAnimations[i].fighter.spriteObject.height/100);
                }
                else {
                    animX += Math.floor(this.duel.memoryAnimations[i].fighter.spriteObject.width/2);
                    animY += Math.floor(this.duel.memoryAnimations[i].fighter.spriteObject.height/2);
                }
                if (this.duel.memoryAnimations[i].isAbove) {
                    animY -= this.duel.memoryAnimations[i].fighter.spriteObject.height + 50;
                }
                var color = "fff";
                this.duel.memoryAnimations[i].animObject = this.addText("<"+this.duel.memoryAnimations[i].image+">", animX, animY, {"fontStyle": "bold", "fontSize": "28px", "backgroundColor": "#000", "color": "#"+color});
            }
            this.duel.memoryAnimations[i].duration -= 1;
            if (this.duel.memoryAnimations[i].duration < 0) {
                this.duel.memoryAnimations[i].animObject.destroy();
            }
        }
        this.duel.memoryAnimations = this.duel.memoryAnimations.filter(anim => anim.duration >= 0);
        for (var i in this.duel.memorySoundEffects) {
            this.playSound("battle/" + this.duel.memorySoundEffects[i]);
        }
        this.duel.memorySoundEffects = [];

        var duelStatusText = this.duel.getDuelEffects();
        if (duelStatusText == "") {
            this.duelStatus.setText("");
            this.duelStatusFrame.setY(1000);
            this.duelStatusTitle.setY(-1000);
            this.duelStatus.setY(-1000);
        }
        else {
            this.duelStatus.setText(duelStatusText);
            this.duelStatusFrame.setY(497 - this.duelStatus.height);
            this.duelStatusTitle.setY(497 - this.duelStatus.height + 13);
            this.duelStatus.setY(497 - this.duelStatus.height + 57);
        }

        this.updateTint();

        if (this.justPressedControl("MENU")) {
            this.openOptions();
        }
    }

    updateMovepoolObjects(_reset = false) {
        for (var i in this.moveList) {
            this.moveList[i].destroy();
        }
        this.moveList = [];
        if (_reset) return this.moveFrame.setY(-1000);

        try {
            var l = this.duel.heroes[this.currentSelectHero].currentMovepool;
            var yValue = 542; // must change cursor coordinate as well
            for (var i in l) {
                this.moveList.push(this.addText(l[i].newInstance().name, 520, i*18+yValue-(l.length*18), {fontSize: '21px'}));
            }

            this.moveFrame.setY(yValue - (15 + l.length*18));
        }
        catch(e) {
            // out of bound fighter ? :/
        }
    }

    getMainObj() {
        if (["heroChoice", "moveChoice", "targetChoice"].indexOf(this.duel.duelState) > -1) {
            return this.duel.heroes[this.currentSelectHero].spriteObject;
        }
        else if (["movePlaying", "turnChange"].indexOf(this.duel.duelState) > -1) {
            return this.duel.mainFighter.spriteObject;
        }
        return null;
    }

    selectMove(_move) {
        this.playSoundSelect();
        this.selectedMove = _move;
        this.currentSelectTarget = 0;

        if (!this.selectedMove.newInstance().needsTarget) {
            this.duel.duelState = "heroChoice";

            this.duel.fighterSelectsMove(this.selectedHero, this.selectedMove, null);
            this.selectedHero = null;
            this.selectedMove = null;

            this.currentSelectHero = 0;
            this.cursorHero.setX(-1000);
            this.currentSelectMove = 0;
            this.cursorMove.setX(-1000);

            this.selectionDirection = "right";
            this.updateMovepoolObjects();
        }
        else {
            this.duel.duelState = "targetChoice";
        }
    }
    checkEnemiesObjects() {
        // new encounter
        for (var i in this.duel.enemies) {
            if (this.duel.enemies[i].spriteObject != null) continue;
            this.duel.enemies[i].spriteObject = this.addText(this.duel.enemies[i].name, this.duel.enemies[i].spriteX, this.duel.enemies[i].spriteY, {fontStyle: 'bold'});
            this.duel.enemies[i].STRTextObject = this.addText("STR: " + this.duel.enemies[i].STR, this.duel.enemies[i].spriteX, this.duel.enemies[i].spriteY+37);
            this.duel.enemies[i].DEXTextObject = this.addText("DEX: " + this.duel.enemies[i].DEX, this.duel.enemies[i].spriteX, this.duel.enemies[i].spriteY+63);
            this.duel.enemies[i].duel = this.duel;
        }
    }
    resetStatusIcons() {
        this.checkEnemiesObjects();

        for (var i in this.duel.heroes) {
            for (var j in this.duel.heroes[i].statusIconObjects) {
                this.duel.heroes[i].statusIconObjects[j].destroy();
            }
            this.duel.heroes[i].statusIconObjects = [];
            if (this.duel.heroes[i].isAlive()) {
                var counter = 0;
                for (var j in this.duel.heroes[i].getAllStatus()) {
                    if (this.duel.heroes[i].getAllStatus()[j]["icon"] != null) {
                        this.duel.heroes[i].statusIconObjects.push(this.addImage("status/" + this.duel.heroes[i].getAllStatus()[j]["icon"], this.duel.heroes[i].spriteObject.x + 115 + (counter*20), this.duel.heroes[i].spriteObject.y + 3));
                        counter += 1;
                    }
                }
            }

            var bf = this.addImage("ui/battle/hero_frame_blocked", this.duel.heroes[i].spriteObject.x, this.duel.heroes[i].spriteObject.y);
            bf.setAlpha(this.blockedHeroFrames[i]["_alpha"]);
            this.blockedHeroFrames[i].destroy();
            this.blockedHeroFrames[i] = bf;
        }

        for (var i in this.duel.enemies) {
            for (var j in this.duel.enemies[i].statusIconObjects) {
                this.duel.enemies[i].statusIconObjects[j].destroy();
            }
            this.duel.enemies[i].statusIconObjects = [];
            if (this.duel.enemies[i].isAlive()) {
                var counter = 0;
                for (var j in this.duel.enemies[i].getAllStatus()) {
                    if (this.duel.enemies[i].getAllStatus()[j]["icon"] != null) {
                        this.duel.enemies[i].statusIconObjects.push(this.addImage("status/" + this.duel.enemies[i].getAllStatus()[j]["icon"], this.duel.enemies[i].spriteObject.x - 23, this.duel.enemies[i].spriteObject.y + (counter*20)));
                        counter += 1;
                    }
                }
            }
        }
    }
}
