class BattleScene extends Scene {
    constructor(_key = "Battle") { try {
        super({key: _key});
    } catch(e) { TRIGGER_ERROR(this, e) } }

    init(_data) { try {
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

        this.selectionDirection = "right";

        this.cursorHero = null;
        this.cursorMove = null;
        this.cursorTarget = null;
        this.currentSelectHero = 0; // array id of the current selection
        this.currentSelectMove = 0; // array id of the current selection
        this.currentSelectTarget = 0; // array id of the current selection
        this.isTargettingHeroes = false;

        this.selectedHero = null;
        this.selectedMove = null;

        this.duelStatusFrame = null;
        this.duelStatusTitle = null;
        this.duelStatus = null;

        this.blockedHeroFrames = [];

        this.autoSkipSpeed = 30;
        this.autoSkipCountdown = this.autoSkipSpeed;
        this.autoSkipNb = 0;
    } catch(e) { TRIGGER_ERROR(this, e) } }

    preload() { try {
        this.startLoadingScreen();

        this.loadImage("ui/cursor.png");
        this.loadImage("ui/battle/hero_frame_blocked.png");
        this.loadImage("ui/battle/hero_move_frame.png");
        this.loadImage("ui/battle/log_frame.png");
        this.loadImage("ui/battle/heroes_bar.png");
        this.loadImage("ui/battle/move_frame.png");
        this.loadImage("ui/battle/event_bar.png");
    } catch(e) { TRIGGER_ERROR(this, e) } }

    create() { try {
        this.moveFrame = this.addImage("ui/battle/move_frame", 488, -1000);
        this.addImage("ui/battle/log_frame", 792, 0);

        this.duelStatusFrame = this.addImage("ui/battle/log_frame", 792, 1000);
        this.duelStatusTitle = this.addText("DUEL EFFECTS", 810, -1000, {fontStyle: 'bold'});
        this.duelStatus = this.addText("", 810, -1000, {fontSize: '21px', wordWrap: {width: 395, height: 550}});

        this.addImage("ui/battle/heroes_bar", 0, 561);

        this.duel.logTitleObject = this.addText(this.duel.messageTitle, 810, 13, {fontStyle: 'bold', backgroundColor: "#000"});
        this.duel.logTextObject = this.addText(this.duel.getAllMessages(), 810, 57, {fontSize: '21px', wordWrap: {width: 395, height: 550}, backgroundColor: "#000"}, getTextSpeed());

        this.cursorHero = this.addImage("ui/cursor", -1000, -1000);
        this.cursorMove = this.addText(">", -1000, -1000, {fontSize: '21px'});
        this.cursorTarget = this.addImage("ui/cursor", -1000, -1000);

        this.playMusic(this.duel.getTheme());

        this.stopLoadingScreen();
        this.checkHeroesObjects();
        this.checkEnemiesObjects();

        var q = QuestManager.getQuest(this.currentQuest[0]);
        var s = q.getStep(this.currentQuest[1]);
        if (!ProgressManager.isStepCompleted(q.id, s.id)) {
            if (s.inFightDialogue != undefined) this.openDialogue(s.inFightDialogue);
        }
    } catch(e) { TRIGGER_ERROR(this, e) } }

    update() { try {
        if (this.isInOptions) {
            return this.optionsUpdate();
        }
        if (this.isInDialogue) {
            return this.dialogueUpdate();
        }
        if (this.isInBible) {
            return this.bibleUpdate();
        }
        if (this.unlockList.length > 0) {
            if (!this.isInUnlock) this.openUnlock();
            return this.unlockUpdate();
        }
        if (this.duel.memoryDialogues.length > 0) {
            this.openDialogue(this.duel.memoryDialogues[0]);
            this.duel.memoryDialogues.splice(0, 1);
        }

        // updates placement of opponents
        if (this.duel.enemies.length == 0 || this.duel.enemies[0].spriteX == undefined || this.duel.enemies[0].spriteX == 0) {
            if (this.duel.enemies.length == 1) {
                this.duel.enemies[0].setSpriteCoordinates(320, 75);
            }
            else if (this.duel.enemies.length == 2) {
                this.duel.enemies[0].setSpriteCoordinates(198, 75);
                this.duel.enemies[1].setSpriteCoordinates(442, 75);
            }
            else if (this.duel.enemies.length == 3) {
                this.duel.enemies[0].setSpriteCoordinates(76, 75);
                this.duel.enemies[1].setSpriteCoordinates(320, 75);
                this.duel.enemies[2].setSpriteCoordinates(561, 75);
            }
            // TODO 4 enemies

            for (var i in this.duel.enemies) {
                // resets game objects
                this.duel.enemies[i].destroyObjects();
            }
        }

        this.checkEnemiesObjects();
        this.checkHeroesObjects();
        if (this.duel.getTheme() != this.currentMusic) this.playMusic(this.duel.getTheme());

        for (var i in this.duel.getAllFighters()) this.duel.getAllFighters()[i].updateTextObjects();
        for (var i in this.duel.heroes) {
            if (this.duel.heroes[i].canPlayThisTurn()) {
                this.blockedHeroFrames[i].setAlpha(0);
            }
            else {
                this.blockedHeroFrames[i].setAlpha(0.5);
            }
        }

        for (var i in this.duel.memoryAnimations) {
            if (this.duel.memoryAnimations[i].animObject == null) {
                if (this.duel.memoryAnimations[i].fighter == undefined || this.duel.memoryAnimations[i].fighter == null) {
                    Logger.warning("Animation User is null", this.duel.memoryAnimations[i]);
                    continue;
                }

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
            if (this.duel.memorySoundEffects[i] == null) continue;
            this.playSound("battle/" + this.duel.memorySoundEffects[i]);
        }
        this.duel.memorySoundEffects = [];

        if (this.duel.duelState == "") {
            this.duel.startDuel();
            this.resetStatusIcons();
        }
        else if (this.duel.duelState == "heroChoice") {
            this.autoSkipCountdown = this.autoSkipSpeed;
            this.autoSkipNb = 0;
            this.duel.logTextObject.speed = getTextSpeed();

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
            if (this.duel.logTextObject.height >= 510) AchievementManager.unlockAchievement(10); // UI Breaker
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
            this.cursorTarget.setX(this.getSelectedTarget().spriteX + 20);
            this.cursorTarget.setY(this.getSelectedTarget().spriteY - 22);

            if (this.justPressedControl("RIGHT") || ((this.getSelectedTarget().isDead() || this.getSelectedTarget().id == this.duel.heroes[this.currentSelectHero].id) && this.selectionDirection == "right")) {
                this.currentSelectTarget += 1;
                this.selectionDirection = "right";
                this.playSoundOK();
            }
            else if (this.justPressedControl("LEFT") || ((this.getSelectedTarget().isDead() || this.getSelectedTarget().id == this.duel.heroes[this.currentSelectHero].id) && this.selectionDirection == "left")) {
                this.currentSelectTarget -= 1;
                this.selectionDirection = "left";
                this.playSoundOK();
            }

            if (!this.isTargettingHeroes) {
                if (this.currentSelectTarget < 0) {
                    this.currentSelectTarget += this.duel.enemies.length;
                }
                if (this.currentSelectTarget >= this.duel.enemies.length) {
                    this.currentSelectTarget -= this.duel.enemies.length;
                }

                if (this.justPressedControl("DOWN")) {
                    var nbValid = 0;
                    for (var i in this.duel.heroes) {
                        if (this.duel.heroes[i].isAlive() && i != this.currentSelectHero) nbValid += 1;
                    }

                    if (nbValid > 0) {
                        if (this.duel.heroes.length <= this.currentSelectTarget) this.currentSelectTarget = this.duel.heroes.length-1;
                        this.isTargettingHeroes = true;

                        return;
                    }
                }
            }
            else {
                if (this.currentSelectTarget < 0) {
                    this.currentSelectTarget += this.duel.heroes.length;
                }
                if (this.currentSelectTarget >= this.duel.heroes.length) {
                    this.currentSelectTarget -= this.duel.heroes.length;
                }

                if (this.justPressedControl("UP")) {
                    if (this.duel.enemies.length <= this.currentSelectTarget) this.currentSelectTarget = this.duel.enemies.length-1;
                    this.isTargettingHeroes = false;

                    return;
                }
            }

            this.duel.logTextObject.setText(this.getSelectedTarget().getDescription(), true);

            if (this.justPressedControl("BACK")) {
                this.playSoundSelect();
                this.duel.duelState = "moveChoice";
                this.cursorTarget.setX(-1000);
            }
            else if (this.justPressedControl("ENTER")) {
                this.playSoundSelect();
                this.duel.duelState = "heroChoice";

                this.duel.fighterSelectsMove(this.selectedHero, this.selectedMove, this.getSelectedTarget());
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

            if ((GlobalVars.get("settings")["battleAutoNext"] || this.sceneName == "MultiplayerBattle") && this.duel.logTextObject.isShowingFullText()) {
                this.autoSkipCountdown -= 1;
            }

            if ((this.justPressedControl("ENTER") && this.sceneName != "MultiplayerBattle") || this.autoSkipCountdown <= 0) {
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
                this.duel.logTextObject.speed = getTextSpeed() - Math.floor(this.autoSkipNb/7);
            }

            while (this.duel.logTextObject.height > Math.min(500, this.duelStatusFrame.y-60)) {
                this.duel.deleteFirstMessage();
                this.duel.logTextObject.setText(this.duel.getAllMessages());
            }
        }
        else if (this.duel.duelState == "turnChange") {
            this.duel.logTextObject.setText(this.duel.getAllMessages());
            this.duel.logTextObject.nextFrame();

            if ((GlobalVars.get("settings")["battleAutoNext"] || this.sceneName == "MultiplayerBattle") && this.duel.logTextObject.isShowingFullText()) {
                this.autoSkipCountdown -= 1;
            }

            if ((this.justPressedControl("ENTER") && this.sceneName != "MultiplayerBattle") || this.autoSkipCountdown <= 0) {
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
                this.duel.logTextObject.speed = getTextSpeed() - Math.floor(this.autoSkipNb/7);
            }

            while (this.duel.logTextObject.height > Math.min(500, this.duelStatusFrame.y-60)) {
                this.duel.deleteFirstMessage();
                this.duel.logTextObject.setText(this.duel.getAllMessages());
            }
        }
        else if (this.duel.duelState == "eventPlay") {
            this.duel.logTextObject.setText(this.duel.getAllMessages());

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

            if (this.isShowingEvent) {
                if (GlobalVars.get("settings")["battleAutoNext"] || this.sceneName == "MultiplayerBattle") {
                    this.autoSkipCountdown -= 0.5;
                }
            }
            else {
                this.duel.logTextObject.nextFrame();
                if ((GlobalVars.get("settings")["battleAutoNext"] || this.sceneName == "MultiplayerBattle") && this.duel.logTextObject.isShowingFullText()) {
                    this.autoSkipCountdown -= 1;
                }
            }

            if ((this.justPressedControl("ENTER") && this.sceneName != "MultiplayerBattle") || this.autoSkipCountdown <= 0) {
                if (!GlobalVars.get("settings")["battleAutoNext"]) {
                    this.playSoundSelect();
                }

                this.autoSkipNb += 1;
                this.autoSkipCountdown = Math.max(1, this.autoSkipSpeed - this.autoSkipNb);
                this.duel.logTextObject.speed = getTextSpeed() - Math.floor(this.autoSkipNb/7);

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
            }

            while (this.duel.logTextObject.height > Math.min(500, this.duelStatusFrame.y-60)) {
                this.duel.deleteFirstMessage();
                this.duel.logTextObject.setText(this.duel.getAllMessages());
            }
        }
        else if (this.duel.duelState == "waiting") {
            if (this.moveList.length > 0) this.updateMovepoolObjects(true);

            if (this.duel.isHost || (this.duel.getAllMessages().length == 0 && !((this.hostUpdateCounter+1) in this.nonHostUpdates))) {
                this.duel.logTitleObject.setText("Waiting...");
                this.duel.logTextObject.setText("Waiting for the opponent to select his moves...");
                this.duel.logTextObject.nextFrame();
            }
            else {
                if (this.duel.logTextObject.isShowingFullText()) {
                    this.autoSkipCountdown -= 1;
                }

                if (this.autoSkipCountdown <= 0) {
                    if ((this.hostUpdateCounter+1) in this.nonHostUpdates) {
                        this.hostUpdateCounter += 1;
                        this.duel.logTextObject.showFullText();
                        this.setUpdateJSON(this.nonHostUpdates[this.hostUpdateCounter]);

                        this.autoSkipNb += 1;
                        this.autoSkipCountdown = Math.max(1, this.autoSkipSpeed - this.autoSkipNb);
                        this.duel.logTextObject.speed = getTextSpeed() - Math.floor(this.autoSkipNb/7);
                        if (this.duel.memoryJSON != null) this.duel.logTextObject.speed -= 2;

                        this.resetStatusIcons();
                    }
                    else if (this.hostUpdateCounter == this.lastHostUpdateCounter && this.duel.memoryJSON != null) {
                        this.duel.setJSON(this.duel.memoryJSON);
                        this.duel.memoryJSON = null;
                        this.duel.messageList = [];
                        this.forceNewTurn = true;
                    }

                    for (var i in this.duel.heroes) {
                        this.duel.heroes[i].updateTextObjects();
                    }
                    return;
                }

                this.duel.logTextObject.setText(this.duel.getAllMessages());
                this.duel.logTextObject.nextFrame();
                while (this.duel.logTextObject.height > Math.min(500, this.duelStatusFrame.y-60)) {
                    this.duel.deleteFirstMessage();
                }
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

                AchievementManager.unlockAchievement(0); // PUNCH_PP

                return this.quitScene();
            }
        }
        else if (this.duel.duelState == "defeat") {
            this.duel.logTextObject.setText("You lost! :(");
            this.duel.logTextObject.nextFrame();

            if (this.forceTint.length == 0) {
                this.musicFadeOut();
                for (var i in this.duel.enemies) {
                    if (this.duel.enemies[i].isAlive()) {
                        this.addToForceTint(this.duel.enemies[i].spriteObject);
                    }
                }
            }

            if (this.justPressedControl("ENTER")) {
                for (var i in this.duel.heroes) {
                    if (this.duel.heroes[i].chosenMove == Yes) {
                        AchievementManager.unlockAchievement(3); // TRUFFLE_CHAOS
                    }
                }

                return this.quitScene();
            }
        }

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
    } catch(e) { TRIGGER_ERROR(this, e) } }

    updateMovepoolObjects(_reset = false) {
        for (var i in this.moveList) {
            this.moveList[i].destroy();
        }
        this.moveList = [];
        if (_reset) {
            return this.moveFrame.setY(-1000);
        }

        try {
            var l = this.duel.heroes[this.currentSelectHero].currentMovepool;
            var yValue = 542; // must change cursor coordinate as well
            for (var i = l.length - 1; i >= 0; i--) {
                this.moveList.push(this.addText(l[i].newInstance().name, 520, i*18+yValue-(l.length*18), {fontSize: '21px', backgroundColor: '#000'}));
            }

            this.moveFrame.setY(yValue - (15 + l.length*18));
        }
        catch(e) {
            // out of bound fighter ? :/
        }
    }

    getMainObj() {
        if (this.getMainObjParent() != null) return this.getMainObjParent().spriteObject;
        return null;
    }
    getMainObjParent() {
        if (["heroChoice", "moveChoice", "targetChoice"].indexOf(this.duel.duelState) > -1) {
            return this.duel.heroes[this.currentSelectHero];
        }
        else if (["movePlaying", "turnChange"].indexOf(this.duel.duelState) > -1) {
            return this.duel.mainFighter;
        }
        return null;
    }

    getSelectedTarget() {
        if (this.isTargettingHeroes) return this.duel.heroes[this.currentSelectTarget];
        return this.duel.enemies[this.currentSelectTarget];
    }

    quitScene() {
        var data = {};
        data["areaId"] = this.duel.ogPlace.id;
        data["currentQuest"] = this.currentQuest;
        return this.switchScene("Area", data);
    }

    selectMove(_move) {
        this.playSoundSelect();
        this.selectedMove = _move;
        this.currentSelectTarget = 0;

        if (this.selectedMove.newInstance().needsTarget && this.selectedHero.chosenTarget == null) {
            this.duel.duelState = "targetChoice";
        }
        else {
            this.duel.duelState = "heroChoice";

            this.duel.fighterSelectsMove(this.selectedHero, this.selectedMove, this.selectedHero.chosenTarget);
            this.selectedHero = null;
            this.selectedMove = null;

            this.currentSelectHero = 0;
            this.cursorHero.setX(-1000);
            this.currentSelectMove = 0;
            this.cursorMove.setX(-1000);

            this.selectionDirection = "right";
            this.updateMovepoolObjects();
        }
    }
    checkEnemiesObjects() {
        // new encounter
        for (var i in this.duel.enemies) {
            if (this.duel.enemies[i].spriteObject != null) continue;
            this.duel.enemies[i].destroyObjects();
            this.duel.enemies[i].duel = this.duel;

            this.duel.enemies[i].spriteObject = this.addText(this.duel.enemies[i].name, this.duel.enemies[i].spriteX, this.duel.enemies[i].spriteY, {fontStyle: 'bold'});
            this.duel.enemies[i].STRTextObject = this.addText("STR: " + this.duel.enemies[i].STR, this.duel.enemies[i].spriteX, this.duel.enemies[i].spriteY+37);
            this.duel.enemies[i].DEXTextObject = this.addText("DEX: " + this.duel.enemies[i].DEX, this.duel.enemies[i].spriteX, this.duel.enemies[i].spriteY+63);

            this.duel.enemies[i].spriteObject.fighter = this.duel.enemies[i];
            this.duel.enemies[i].STRTextObject.fighter = this.duel.enemies[i];
            this.duel.enemies[i].DEXTextObject.fighter = this.duel.enemies[i];
        }
    }
    checkHeroesObjects() {
        for (var i in this.duel.heroes) {
            if (this.duel.heroes[i].spriteObject != null) continue;
            this.duel.heroes[i].destroyObjects();
            this.duel.heroes[i].duel = this.duel;

            var xValue = 20 + i*300;
            var yValue = 574;
            this.duel.heroes[i].spriteObject = this.addText(this.duel.heroes[i].name, xValue, yValue+6, {fontStyle: 'bold'});
            this.duel.heroes[i].STRTextObject = this.addText("STR: " + this.duel.heroes[i].STR, xValue, yValue+6+37);
            this.duel.heroes[i].DEXTextObject = this.addText("DEX: " + this.duel.heroes[i].DEX, xValue, yValue+6+63);

            this.duel.heroes[i].moveFrameObject = this.addImage("ui/battle/hero_move_frame", xValue-6, -1000);
            this.duel.heroes[i].moveFrameText = this.addText("", xValue+1, -1000, {fontSize: '21px'});

            this.duel.heroes[i].spriteX = xValue;
            this.duel.heroes[i].spriteY = yValue;

            if (this.blockedHeroFrames.length <= i) {
                var bf = this.addImage("ui/battle/hero_frame_blocked", xValue, yValue+6);
                bf.setAlpha(0);
                this.blockedHeroFrames.push(bf);
            }

            this.duel.heroes[i].spriteObject.fighter = this.duel.heroes[i];
            this.duel.heroes[i].STRTextObject.fighter = this.duel.heroes[i];
            this.duel.heroes[i].DEXTextObject.fighter = this.duel.heroes[i];
            this.duel.heroes[i].moveFrameObject.fighter = this.duel.heroes[i];
            this.duel.heroes[i].moveFrameText.fighter = this.duel.heroes[i];
        }
    }
    resetStatusIcons() {
        this.checkEnemiesObjects();
        this.checkHeroesObjects();

        for (var i in this.duel.heroes) {
            if (this.duel.heroes[i].spriteObject == null) continue;

            for (var j in this.duel.heroes[i].statusIconObjects) {
                this.duel.heroes[i].statusIconObjects[j].destroy();
            }
            this.duel.heroes[i].statusIconObjects = [];
            if (this.duel.heroes[i].isAlive()) {
                var counter = 0;
                for (var j in this.duel.heroes[i].getAllStatus()) {
                    if (this.duel.heroes[i].getAllStatus()[j]["icon"] != null) {
                        var coordX = this.duel.heroes[i].spriteObject.x + 115 + ((counter%9)*20);
                        var coordY = this.duel.heroes[i].spriteObject.y + 3 + (Math.floor(counter/9)*20);
                        this.duel.heroes[i].statusIconObjects.push(this.addImage("status/" + this.duel.heroes[i].getAllStatus()[j]["icon"], coordX, coordY));
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
            if (this.duel.enemies[i].spriteObject == null) continue;

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
