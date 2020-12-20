class MultiplayerDuel extends Duel {
    constructor(_heroes, _enemies, _isHost) {
        super(_heroes, new Encounter("multiplayer", _enemies), AreaManager.Multiplayer_Area);

        this.isHost = _isHost;
        this.idHost = null; // init later
        this.hasRecievedAttacks = false;

        this.readyToSendToDB = false;
        this.readyToRecieveFromDB = false;

        this.memoryJSON = null; // non host only
    }

    checkAllFightersAttacks() {
        if (this.getValidHeroesNb() == 0) {
            this.duelState = "waiting";

            if (this.isHost) {
                if (this.hasRecievedAttacks) {
                    console.log("HEY")
                    console.trace();
                    this.triggerAttacks();
                }
            }
            else {
                CURRENT_SCENE.sendToDatabase();
                this.readyToRecieveFromDB = true;
            }
        }
    }
    triggerAttacks() {
        this.hasRecievedAttacks = false;
        super.triggerAttacks();
    }
    startNewTurn(_skipTurnChange = false) {
        super.startNewTurn(_skipTurnChange);

        if (!_skipTurnChange && this.isHost) this.readyToSendToDB = true;
    }
    newTurn() {
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
            this.setTitle("VICTORY");
            this.duelState = "victory";
            return;
        }

        super.newTurn();
    }

    // host only
    rollEvent() {
        if (this.isHost) super.rollEvent();
    }

    getTheme() {
        if (this.duelState == "victory" && this.getVictoryTheme() != null) return this.getVictoryTheme();
        var area = this.getMusicArea();

        // get nb of heroes alive
        var nb = 0;
        for (var i in this.heroes) {
            if (this.heroes[i].isAlive()) {
                nb += 1;
            }
        }

        // if 1 or less alive, boss theme, else battle theme
        if (nb <= 1) {
            return area.getBossTheme();
        }
        return area.getBattleTheme();
    }
    getVictoryTheme() {
        return this.getMusicArea().getVictoryTheme();
    }
    getMusicArea() {
        var area = 0; // default == anime convention

        // dikea = gay
        // TODO
        // high school = ?
        // TODO
        // allfaiths temple = when someone has charges
        var l = this.getAllFighters();
        for (var i in l) {
            if (l[i].regularCharges > 0 || l[i].specialCharges > 0) {
                area = 3;
            }
        }
        // TODO other areas

        return AreaManager.getArea(area);
    }

    getWinPoints() {
        var nb = 0;
        // TODO poopoo universe = 0 points, I'm sorry but that's how it works

        for (var i in this.heroes) {
            if (this.heroes[i].isAlive()) {
                nb += 1;

                if (this.heroes[i].hasFightingStyle("hockey puck")) nb += 3;
            }
        }

        if (this.triggeredChaos) {
			nb += Math.floor(this.moveCount/100)
		}
		else {
			nb += Math.floor(this.moveCount/10)
		}

        return nb;
    }

    getJSON() {
        if (!this.isHost) this.reverseHeroesAndEnemies();

        var obj = Fighter.SPECIAL_OBJECTS;
        var l = this.getAllFighters();
        var cacheList = [];

        for (var i in l) {
            cacheList[i] = {};
            for (var j in obj) {
                cacheList[i][Fighter.SPECIAL_OBJECTS[j]] = l[i][Fighter.SPECIAL_OBJECTS[j]];
                l[i][Fighter.SPECIAL_OBJECTS[j]] = null;
            }
        }

        var json = BrennStyleJSON.exportJSON(this);

        for (var i in l) {
            for (var j in cacheList) {
                l[i][Fighter.SPECIAL_OBJECTS[j]] = cacheList[i][j];
            }
        }

        if (!this.isHost) this.reverseHeroesAndEnemies();
        return JSON.stringify(json);
    }
    setJSON(_json) {
        //console.log(_json); console.trace();

        var isHost = this.isHost
        if (!isHost) this.reverseHeroesAndEnemies();

        var obj = Fighter.SPECIAL_OBJECTS;
        var l = this.getAllFighters();
        var cacheList = [];

        for (var i in this.heroes) {
            cacheList[i] = {};
            this.heroes[i].destroyObjects();
            for (var j in obj) {
                cacheList[i][Fighter.SPECIAL_OBJECTS[j]] = this.heroes[i][Fighter.SPECIAL_OBJECTS[j]];
                this.heroes[i][Fighter.SPECIAL_OBJECTS[j]] = null;
            }
        }

        BrennStyleJSON.setJSON(this, _json);
        this.isHost = isHost;

        for (var i in this.heroes) {
            for (var j in cacheList) {
                this.heroes[i][Fighter.SPECIAL_OBJECTS[j]] = cacheList[i][j];
            }
        }

        // destroy objects
        for (var i in l) {
            l[i].destroyObjects();
        }
        this.forcedDuelEffects = null;

        if (!isHost) this.reverseHeroesAndEnemies();
    }

    getAttackJSON() {
        var json = {};

        for (var i in this.heroes) {
            json[i] = {};
            if (this.heroes[i].chosenMove == null) continue; // DEAD? RIP IN PIECE :(
            json[i]["move"] = this.heroes[i].chosenMove.getClassName();
            json[i]["target"] = null;
            if (this.heroes[i].chosenTarget != null) json[i]["target"] = this.heroes[i].chosenTarget.id;
        }

        return json;
    }
    setAttackJSON(_json) {
        var json = JSON.parse(_json);
        var l = this.getAllFighters();

        for (var i in json) {
            this.enemies[i].chosenMove = eval(json[i]["move"]);
            for (var j in l) {
                if (l[j].id == json[i]["target"]) {
                    this.enemies[i].chosenTarget = l[j];
                }
            }
        }

        this.hasRecievedAttacks = true;
    }

    reverseHeroesAndEnemies() {
        var enemies = [];
        for (var i in this.heroes) {
            var e = new MultiplayerEnemy(this.heroes[i]);
            e.id = this.heroes[i].id;
            enemies.push(e);
        }

        var heroes = [];
        for (var i in this.enemies) {
            var hero = new Hero(this.heroes[0].partyMember);
            for (var j in this.enemies[i]) {
                hero[j] = this.enemies[i][j];
            }
            heroes.push(hero);
            this.enemies[i].destroyObjects();
        }

        this.heroes = heroes;
        this.enemies = enemies;
    }
}

class BrennStyleJSON {
    static exportJSON(_obj) {
        //console.log("NEW OBJ: " + _obj.constructor.name)
        var json = {};

        for (var i in _obj) {
            if (Duel.SPECIAL_OBJECTS.indexOf(i) > -1) continue;
            if (Fighter.SPECIAL_OBJECTS.indexOf(i) > -1) continue;
            //console.log(_obj.constructor.name + ": " + i);
            var subJSON = BrennStyleJSON.exportSingle(_obj[i]);
            if (subJSON != null) json[i] = subJSON;
        }

        return json;
    }
    static exportSingle(_obj) {
        // Skip functions
        if (_obj instanceof Function) return null;
        if (_obj instanceof TextDict) return null;
        // Treat Arrays elements one by one
        else if (_obj instanceof Array) {
            var array = [];
            for (var j in _obj) {
                array.push(BrennStyleJSON.exportSingle(_obj[j]));
            }
            return array;
        }
        // Repeat Process for sub objects
        else if (_obj instanceof Object) {
            var obj = BrennStyleJSON.exportJSON(_obj);
            obj["OG_CLASS_NAME"] = _obj.constructor.name;

            // moves tagged as moves so setJSON knows it has to get it back correctly
            if (_obj instanceof Move) {
                obj["OG_CLASS_NAME"] = "Move";
                obj["MOVE_NAME"] = _obj.newInstance().name;
            }

            return obj
        }
        // Primitives are easy
        else {
            return _obj
        }
    }

    static setJSON(_obj, _json) {
        if (_obj == undefined || _obj == null) {
            _obj = _json;
            return;
        }
        for (var i in _json) {
            // Handle Object
            if (_json[i] instanceof Array) {
                BrennStyleJSON.setJSON(_obj[i], _json[i]);
            }
            else if (_json[i] != null && _json[i] != undefined && _json[i]["OG_CLASS_NAME"] != undefined) {
                switch(_json[i]["OG_CLASS_NAME"]) {
                    case("RegularGod"):
                    case("Waifu"):
                    case("EldritchGod"):
                        _obj[i] = GodManager.getGod(_json[i]["name"]);
                        BrennStyleJSON.setJSON(_obj[i], _json[i]);
                        break;
                    case("Move"):
                        _obj[i] = MoveManager.getMove(_json[i]["MOVE_NAME"])
                        BrennStyleJSON.setJSON(_obj[i], _json[i]);
                        break;
                    case("Area"):
                        _obj[i] = AreaManager.getArea(_json[i]["id"])
                        BrennStyleJSON.setJSON(_obj[i], _json[i]);
                        break;
                    case("Relic"):
                        _obj[i] = RelicManager.getRelic(_json[i]["id"])
                        BrennStyleJSON.setJSON(_obj[i], _json[i]);
                        break;
                    default:
                        var str = "new " + _json[i]["OG_CLASS_NAME"] + "()";
                        _obj[i] = eval(str);
                        BrennStyleJSON.setJSON(_obj[i], _json[i]);
                        break
                }
            }
            else if (i != "OG_CLASS_NAME") {
                _obj[i] = _json[i];
            }
        }
    }
}
