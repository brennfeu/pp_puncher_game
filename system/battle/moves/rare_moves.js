class EyeOfTruth extends Move {
    constructor() {
        super();
        this.name = "Eye of Truth";
        this.description = "Triggers the move of your inner worth. Each and everyone has a different effect when using this move.";
        this.autoPass = true;

        this.type = "rare";
    }

    execute(_user, _target = null) {
        _user.duel.addMessage(_user.getName() + " summons the Eye of Truth!");
        if (!_user.isHero()) return _user.duel.addMessage("Looks like " + _user.getName() + "'s inner worth isn't worth that much...");
        _user.duel.addMessage(_user.getName() + " uses his signature move!");

        // special legato move
        if (_user.legatoActivated) {
            // happy one
            if (getRandomPercent() <= 90) {
                _user.duel.addMessage(_user.getName() + " sends " + _target.getName() + " into the depths of hell!");
                _target.damage(Math.floor(_target.STR/5), "inner");
                _target.blueFire += Math.floor(_target.STR/5);

                _user.duel.addAnimation("hell", 60, _target, true, false);
                _user.duel.memorySoundEffects.push("flames");
            }
            // sad one
            else {
                var storedMove = {};
                storedMove["user"] = _user;
                storedMove["move"] = MoveManager.createMove(function execute(_user, _target = null) {
                    _user.duel.addMessage(_user.getName() + " loses all consciousness...");
                    _user.isTree = true;

                    var storedMove = {};
                    storedMove["user"] = _user;
                    storedMove["move"] = MoveManager.createMove(function execute(_user, _target = null) {
                        _user.duel.addMessage(_user.getName() + " summons the Blasted Tree of Crucifixion.");

                        var l = _user.duel.getOppsOf(_user);
                        for (var i in l) {
                            l[i].damage(_user.STR*10, "attack", _user);
                            l[i].noDex = 2;

                            _user.duel.addAnimation("damaged", 60, _target, true, false);
                        }

                        _user.duel.memorySoundEffects.push("explosion");
                    });
                    storedMove["target"] = _target;
                    _user.duel.memoryMoves.push(storedMove);

                    _user.duel.memorySoundEffects.push("jesus");
                });
                storedMove["target"] = _target;
                _user.duel.memoryMoves.push(storedMove);
            }
            return;
        }

        switch(_user.name) {
            case("Brenn"):
                _user.duel.addMessage(_user.getName() + " decides to make a game called PP Puncher!");
                _user.duel.addMessage(_user.getName() + " uses his new knowledge to punch " + _target.getName() + "'s PP!");
                _target.damage(_user.STR, "attack", _user);

                _user.duel.addAnimation("punch", 60, _target, true, false);
                _user.duel.memorySoundEffects.push("punchA");
                break;
            case("Pudding"):
                _user.duel.addMessage(_user.getName() + "'s true inner worth is too complex for the Eye of Truth to understand!");
                new InterrogationPoint().execute(_user, _target);
                break;
            case("Eldon"):
                _user.duel.addMessage(_user.getName() + " genderbends!");
                _user.genderBender = !_user.genderBender;
                var l = _user.duel.getOppsOf(_user);
                for (var i in l) {
                    l[i].confusion = 2;
                }

                _user.duel.addAnimation("genderbending", 60, _user);
                _user.duel.memorySoundEffects.push("mmh");
                break;
            case("Valurin"):
                _user.duel.addMessage(_user.getName() + " summons 12 badger spirits!");

                for (var i = 0; i < 12; i++) {
                    var badger = _user.duel.fakeFighter("Badger Spirit " + (i+1), ValurinBadger);
                    _user.duel.addMessage(badger.getName() + " attacks!");
                    _target.damage(10+Math.floor(getRandomPercent()*_user.STR/100), "attack", badger);

                    _user.duel.addAnimation("badger'ed", 40 + (10*i), _user);
                    _user.duel.memorySoundEffects.push("punchA");
                }
                break;
            default:
                _user.duel.addMessage("The Eye of Truth cannot find " + _user.getName() + "'s signature move :(");
                break;
        }
    }
}

class FherlaMove extends Move {
    constructor() {
        super();
        this.name = "Fherla";
        this.description = "All fighters gets insane amounts of damage (or heal if in christian mode).";
        this.autoPass = true;
        this.needsTarget = false;

        this.type = "rare";
    }

    execute(_user, _target = null) {
        _user.duel.addMessage(_user.getName() + " summons Fherla - Strawberry Girl!");

    	if (_user.duel.christianText) {
    		_user.duel.addMessage("PP Punching is so great! Please continue!");

            var l = _user.duel.getAllFighters();
            for (var i in l) {
                if (l[i].isDead()) continue;

                l[i].heal(Math.floor(Math.random() * 10000000000000), "inner");
            }
    	}
    	else {
    		_user.duel.addMessage("PP Punching is so filthy. May the chat be purged of this nonsense.");

            var l = _user.duel.getAllFighters();
            for (var i in l) {
                if (l[i].isDead()) continue;

                l[i].damage(Math.floor(Math.random() * 10000000000000), "attack", _user.duel.fakeFighter("Fherla"));
            }
    	}

        _user.duel.memorySoundEffects.push("darkMagic");
    }
}

class MelodiaMove extends Move {
    constructor() {
        super();
        this.name = "Melodia";
        this.description = "Triggers UwU talk and grants a random debuff to every opponent. UwU Talk may also trigger other speech alterations when other moves are used.";
        this.autoPass = true;
        this.needsTarget = false;

        this.type = "rare";
    }

    execute(_user, _target = null) {
        _user.duel.addMessage(_user.getName() + " summons Melodia!");

        if (!_user.duel.uwuText) {
            _user.duel.uwuText = true;
            _user.duel.addMessage("UwU Talk Activated!");
        }

        var l = _user.duel.getOppsOf(_user);
        for (var i in l) {
            if (!l[i].isDead()) {
                l[i].addRandomDebuff()
                _user.duel.addMessage(l[i].getName() + " gets cursed by Melodia!");
            }
        }

        _user.duel.memorySoundEffects.push("darkMagic");
    }
}

class WoodCutting extends Move {
    constructor() {
        super();
        this.name = "Gather Wood";
        this.autoPass = true;
        this.description = "Gives you lumberjack experience. You can't call yourself a lumberjack before 1 000 000 000 wood things gathered.\n\nCurrent Wood Counter: ";
        this.needsTarget = false;

        this.type = "rare";

        var currentWood = ProgressManager.getValue("wood");
        if (currentWood == undefined) currentWood = 0;
        this.description += currentWood;
    }

    execute(_user, _target = null) {
        var currentWood = ProgressManager.getValue("wood");
        if (currentWood == undefined) currentWood = 0;

        var nb = Math.floor(_user.rollLuckPercentHigh()/10)+1;
        nb += Math.floor((_user.STR+currentWood)/19);
        ProgressManager.setValue("wood", currentWood + nb);

        _user.duel.addMessage(_user.getName() + " gets " + nb + " wood.");
        _user.duel.memorySoundEffects.push("woodcut");

        WoodCutting.saveToSteam();
    }

    static saveToSteam() {
        try {
            GREENWORKS.setStat("WOOD", ProgressManager.getValue("wood"));
            GREENWORKS.storeStats(
                function(_idk) {
                    if (ProgressManager.getValue("wood") > 1000000000) {
                        AchievementManager.unlockAchievement(5);
                    }
                },
                function(_err) {
                    console.log(_err)
                }
            );
        }
        catch(e) {}
    }
}

const RARE_MOVE_LIST = [ EyeOfTruth, FherlaMove, WoodCutting ];
