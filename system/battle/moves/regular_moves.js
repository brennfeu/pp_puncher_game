// UNLOCKED
class AcidCover extends Move {
    constructor() {
        super();
        this.name = "Acid Cover";
        this.description = "For 3 turns, every attack will deal back 1/10 of your post-damage STR to the one who attacked you.";
        this.needsTarget = false;
        this.autoPass = true;
    }

    execute(_user, _target = null) {
        _user.duel.addMessage(_user.getName() + " gets covered in acid!");
        _user.acidCover = 4;

        _user.duel.memorySoundEffects.push("acid");
        _user.duel.addAnimation("acid", 60, _user);
    }
}

// UNLOCKED
class AdaptPP extends Move {
    constructor() {
        super();
        this.name = "PP Adaptation";
        this.description = "Grants Versatile PP and +10 DEX. Apply this on all living allies";
        this.autoPass = true;
        this.needsTarget = false;
    }

    execute(_user, _target = null) {
        _user.duel.addMessage(_user.getName() + " wants his group to have Versatile PPs...");
        var l = _user.duel.getAlliesOf(_user, true);

        for (var i in l) {
            if (l[i].isDead()) continue;
            if (l[i].hasFightingStyle("versatile")) {
                _user.duel.addMessage("...but " + l[i].getName() + " already had one!");
            }
            else {
                _user.duel.addMessage("...and now " + l[i].getName() + " got it!");
                l[i].addFightingStyle("versatile");
                l[i].DEXValue += 10;

                _user.duel.addAnimation("versatile", 60, l[i]);
                _user.duel.memorySoundEffects.push("mmh");
            }
        }
    }
}

// UNLOCKED
class Barrel extends Move {
    constructor() {
        super();
        this.name = "Barrel";
        this.description = "Increases all damages to 300% for this turn.";
        this.autoPass = true;
        this.priority = true;
        this.needsTarget = false;
    }

    execute(_user, _target = null) {
        _user.duel.addMessage(_user.getName() + " makes everyone weaker!");
        if (_user.duel.barrelWeakening) {
            _user.duel.addMessage("But there already was a weakening!");
        }
        else {
            _user.duel.memorySoundEffects.push("protect");
            for (var i in _user.duel.getAllFighters()) {
                _user.duel.addAnimation("weakening", 60, _user.duel.getAllFighters()[i]);
            }
        }
        _user.duel.barrelWeakening = true;
    }
}

// UNLOCKED
class BigGuy extends Move {
    constructor() {
        super();
        this.name = "Big Guy";
        this.description = "Remove your opponent's DEX for next turn.";
        this.autoPass = true;
    }

    execute(_user, _target = null) {
        _user.duel.addMessage(_user.getName() + " intimidates " + _target.getName() + "!");
        _target.noDex = 2;

        _user.duel.memorySoundEffects.push("flex");
        _user.duel.addAnimation("intimidates", 60, _user);
        _user.duel.addAnimation("intimidated", 60, _target);
    }
}

// TO UNLOCK
class BigSatan extends Move {
    constructor() {
        super();
        this.name = "Big Satan";
        this.description = "Each fighter plays 5 random moves.";
        this.dexChange = -20;
        this.needsTarget = false;
    }

    execute(_user, _target = null) {
        _user.duel.triggeredChaos = true;
        _user.duel.addMessage(_user.getName() + " summons Satan's chaotic powers!");

        var l = _user.duel.getAllFighters();
        for (var i in l) {
            if (l[i].isDead()) continue;
            for (var j = 0; j < 5; j++) {
                var storedMove = {};
                storedMove["user"] = l[i];
                storedMove["move"] = l[i].getRandomMove();
                while (storedMove["move"] == BigSatan) {
                    storedMove["move"] = l[i].getRandomMove();
                }
                storedMove["target"] = _user.duel.getRandomFighter();
                _user.duel.memoryMoves.push(storedMove);
            }
        }

        _user.duel.memorySoundEffects.push("darkMagic");
        _user.duel.addAnimation("summon", 60, _user);
    }
}

// UNLOCKED
class Boomerang extends Move {
    constructor() {
        super();
        this.name = "Boomerang";
        this.description = "All your moves are triggered twice for 3 turns.";
        this.needsTarget = false;
    }

    execute(_user, _target = null) {
        _user.duel.addMessage(_user.getName() + " gets a boomerang!");
        _user.boomerang = 4;

        _user.duel.memorySoundEffects.push("woohoo");
        _user.duel.addAnimation("boomerang", 60, _user);
    }
}

// UNLOCKED
class BrocketeerDive extends Move {
    constructor() {
        super();
        this.name = "Head Dive";
        this.description = "Inflicts 10 + this.STR damages/10. Target has no DEX next turn.";
        this.illegal = 25;
    }

    execute(_user, _target = null) {
        _user.duel.addMessage(_user.getName() + " punches " + _target.getName() + "'s PP with his head!");
        var r = _target.damage(10 + Math.floor(_user.STR/10), "attack", _user);

        if (r) {
            _target.noDex = 2;
        }

        _user.duel.addAnimation("dive", 60, _target, true, false);
        _user.duel.memorySoundEffects.push("punchA");
    }
}

// UNLOCKED
class BronanSlam extends Move {
    constructor() {
        super();
        this.name = "Build-Up";
        this.description = "The next attack will deal 5 times the damages, but the user has -30 DEX until the damages are unleashed. The multiplicator stacks if used multiple times.";
        this.needsTarget = false;
    }

    execute(_user, _target = null) {
        _user.duel.addMessage(_user.getName() + " builds up!");
        _user.damageBuildUp += 5;

        _user.duel.memorySoundEffects.push("flex");
        _user.duel.addAnimation("build-up", 60, _user);
    }
}

// UNLOCKED
class Bullet extends Move {
    constructor() {
        super();
        this.name = "Bullet";
        this.description = "Inflicts 20 + this.STR/5 damages, both user and target get -5 DEX.";
        this.dexChange = -20;
    }

    execute(_user, _target = null) {
        _user.duel.addMessage(_user.getName() + " shoots " + _target.getName() + "'s PP!");
        var r = _target.damage(20 + Math.floor(_user.STR/5), "attack", _user);

        _user.DEXValue -= 5;
        _user.duel.addMessage(_user.getName() + " loses 5 DEX!");
        _user.duel.addAnimation("-5dex", 60, _user);
        if (r) {
            _target.DEXValue -= 5;
            _user.duel.addMessage(_target.getName() + " loses 5 DEX!");
            _user.duel.addAnimation("-5dex", 60, _user);
        }

        _user.duel.memorySoundEffects.push("gun");
        _user.duel.addAnimation("fire", 60, _target, true, false);
    }
}

// UNLOCKED
class DeadBro extends Move {
    constructor() {
        super();
        this.name = "PP Acceleration";
        this.description = "Grants Fast PP and +10 DEX.";
        this.autoPass = true;
        this.needsTarget = false;
    }

    execute(_user, _target = null) {
        _user.duel.addMessage(_user.getName() + " wants a Fast PP...");
        if (_user.hasFightingStyle("fast")) {
            _user.duel.addMessage("...but he already had one!");
        }
        else {
            _user.duel.addMessage("...and now he got it!");
            _user.addFightingStyle("fast");
            _user.DEXValue += 10;

            _user.duel.addAnimation("fast", 60, _user);
            _user.duel.memorySoundEffects.push("mmh");
        }
    }
}

// UNLOCKED
class PPDefibrilation extends Move {
    constructor() {
        super();
        this.name = "PP Defibrilation";
        this.description = "Grants Electric PP and +10 DEX.";
        this.autoPass = true;
        this.needsTarget = false;
    }

    execute(_user, _target = null) {
        _user.duel.addMessage(_user.getName() + " wants an Electric PP...");
        if (_user.hasFightingStyle("electric")) {
            _user.duel.addMessage("...but he already had one!");
        }
        else {
            _user.duel.addMessage("...and now he got it!");
            _user.addFightingStyle("electric");
            _user.DEXValue += 10;

            _user.duel.addAnimation("electric", 60, _user);
            _user.duel.memorySoundEffects.push("quickening");
        }
    }
}

// UNLOCKED
class EncrustPP extends Move {
    constructor() {
        super();
        this.name = "PP Encrustation";
        this.description = "Grants randomly either Crystal PP or Diamond PP. If fighter already has one of them, the other one is chosen.";
        this.autoPass = true;
        this.needsTarget = false;
    }

    execute(_user, _target = null) {
        _user.duel.addMessage(_user.getName() + " encrusts his PP...");
        var hasCrystal = _user.hasFightingStyle("crystal");
        var hasDiamond = _user.hasFightingStyle("diamond");

        if (hasCrystal && hasDiamond) {
            _user.duel.addMessage("...with nothing!");
        }
        else if (hasCrystal || getRandomPercent() <= 50) {
            _user.duel.addMessage("...with diamond!");
            _user.addFightingStyle("diamond");
            _user.DEXValue += 10;

            _user.duel.memorySoundEffects.push("mmh");
            _user.duel.addAnimation("diamond", 60, _user);
        }
        else {
            _user.duel.addMessage("...with crystal!");
            _user.addFightingStyle("crystal");
            _user.DEXValue += 10;

            _user.duel.memorySoundEffects.push("mmh");
            _user.duel.addAnimation("crystal", 60, _user);
        }
    }
}

// UNLOCKED
class FlexBro extends Move {
    constructor() {
        super();
        this.name = "Flex";
        this.description = "Grants between 30 and 200 STR.";
        this.needsTarget = false;
        this.dexChange = -20;
    }

    execute(_user, _target = null) {
        _user.duel.addMessage(_user.getName() + " flexes!");
        _user.heal(Math.floor(Math.random() * 170 + 30));

        _user.duel.addAnimation("flex", 60, _user);
        _user.duel.memorySoundEffects.push("flex");
    }
}

// UNLOCKED
class HighFiveBro extends Move {
    constructor() {
        super();
        this.name = "High Five";
        this.description = "When used by 2 fighters, they both get +50 STR and +20 DEX for the next turn!";
        this.needsTarget = false;
        this.autoPass = true;

        if (CURRENT_SCENE != null && CURRENT_SCENE.duel != null) {
            this.description += "\n\nHigh Five Ready:"

            var txt = "";
            for (var i in CURRENT_SCENE.duel.heroes) {
                if (CURRENT_SCENE.duel.heroes[i].isDead()) continue;
                if (CURRENT_SCENE.duel.heroes[i].currentMovepool.indexOf(HighFiveBro) > -1) txt += "\n" + CURRENT_SCENE.duel.heroes[i].getName();
            }

            if (txt == "") this.description += " None";
            else this.description += txt;

            this.description += "\n"
        }
    }

    execute(_user, _target = null) {
        var l = _user.duel.getAlliesOf(_user);
        for (var i in l) {
            if (l[i].wantsHighFive && l[i].highFiveBuff < 2) {
                _user.duel.addMessage(_user.getName() + " high fives " + _user.duel.getAlliesOf(_user)[i].getName() + "!");
                _user.highFiveBuff = 2;
                _user.duel.getAlliesOf(_user)[i].highFiveBuff = 2;

                _user.duel.addAnimation("highfive", 60, _user);
                _user.duel.addAnimation("highfive", 60, _user.duel.getAlliesOf(_user)[i]);
                _user.duel.memorySoundEffects.push("ohYeahDouble");

                for (var j in _user.duel.heroes) if (_user.duel.heroes[j].highFiveBuff < 0) return;
                AchievementManager.unlockAchievement(13);
                return;
            }
        }

        _user.duel.addAnimation("highfive", 60, _user);
        _user.duel.addMessage(_user.getName() + " wants a high five...");
        _user.wantsHighFive = true;

        _user.duel.memorySoundEffects.push("hey");
    }

    //alternateExecute TODO
}

// UNLOCKED
class Hologram extends Move {
    constructor() {
        super();
        this.name = "Hologram";
        this.description = "Inflicts 500 damages.";
        this.dexChange = -40;
    }

    execute(_user, _target = null) {
        _user.duel.addMessage(_user.getName() + " touches " + _target.getName() + "'s PP vital point!");
        _target.damage(500, "attack", _user);

        _user.duel.addAnimation("finger", 60, _target, false, false);
        _user.duel.memorySoundEffects.push("punchBig");
    }
}

// UNLOCKED
class InterrogationPoint extends Move {
    constructor() {
        super();
        this.name = "(?)";
        this.description = "Plays a random known move.";
    }

    execute(_user, _target = null) {
        _user.duel.addMessage(_user.getName() + " plays a random move!");

        var storedMove = {};
        storedMove["user"] = _user;
        storedMove["move"] = _user.getRandomMove();
        while (storedMove["move"] == InterrogationPoint) {
            storedMove["move"] = _user.getRandomMove();
        }
        storedMove["target"] = _target;
        _user.duel.memoryMoves.push(storedMove);

        _user.duel.addAnimation("?", 60, _user);
        _user.duel.memorySoundEffects.push("thinks");
    }
}

// UNLOCKED
class KidneyShoot extends Move {
    constructor() {
        super();
        this.name = "Kidney Shoot";
        this.description = "Target and user takes 50 damages. Has 33% chance to force the target's movepool to only 'Kidney Shoot' and 'Super Kidney Shoot' for the next turn.";
    }

    execute(_user, _target = null) {
        _user.duel.addMessage(_user.getName() + " shoots a kidney stone!");
        _user.damage(50, "inner")
        if (_target.damage(50, "attack", _user) && _user.rollLuckPercentLow() <= 33) {
            _target.kidneyCurse = 2;
        }

        _user.duel.memorySoundEffects.push("punchA");
        _user.duel.addAnimation("shoot", 60, _user);
    }
}

// UNLOCKED
class Kick extends Move {
    constructor() {
        super();
        this.name = "Roundhouse Kick";
        this.description = "Inflicts (20 + this.STR/5)*3 damages.";
        this.dexChange = -10;
        this.illegal = 30;
    }

    execute(_user, _target = null) {
        _user.duel.addMessage(_user.getName() + " kicks " + _target.getName() + "'s PP!");
        _target.damage(20 + Math.floor(_user.STR/5)*3, "attack", _user);

        _user.duel.addAnimation("kick", 60, _target, true, false);
        _user.duel.memorySoundEffects.push("punchBig");

        if (_user.isHero()) {
            AchievementManager.unlockAchievement(2); // KICK_PP
        }
    }
}

// UNLOCKED
class LaughingSoul extends Move {
    constructor() {
        super();
        this.name = "Laughing Soul";
        this.description = "Uses a random gods' regular and special moves.";
        this.illegal = 20;
    }

    execute(_user, _target = null) {
        var randomGod = shuffleArray(ProgressManager.getUnlockedGods())[0];
        _user.duel.addMessage(_user.getName() + " summonds the powers of " + randomGod.name + ".");

        var storedMoveA = {};
        storedMoveA["user"] = _user;
        storedMoveA["move"] = randomGod.getRegularAttackAsMove();
        storedMoveA["target"] = _target;
        var storedMoveB = {};
        storedMoveB["user"] = _user;
        storedMoveB["move"] = randomGod.getSpecialAttackAsMove();
        storedMoveB["target"] = _target;

        _user.duel.memoryMoves.push(storedMoveA);
        _user.duel.memoryMoves.push(storedMoveB);

        _user.duel.addAnimation("laugh", 60, _user);
        _user.duel.memorySoundEffects.push("laugh");
    }
}

// TO UNLOCK
class LivingGod extends Move {
    constructor() {
        super();
        this.name = "Living God";
        this.description = "Gets 10 000 STR and 10 000 DEX. Non-stackable.";
        this.illegal = 99;
        this.needsTarget = false;
        this.autoPass = true;
    }

    execute(_user, _target = null) {
        _user.duel.addMessage(_user.getName() + " ascends!");
		if (!_user.livingGod) {
			_user.duel.addMessage("Behold " + _user.getName() + " the living God!");
			_user.livingGod = true;
		}
		else {
			_user.heal(10000);
		}

        _user.duel.addAnimation("godhood", 60, _user);
        _user.duel.memorySoundEffects.push("jesus");

        if (_user.duel.uwuText) {
            _user.duel.randomCapTextCountdown = 1;
        }
    }
}

// UNLOCKED
class Martini extends Move {
    constructor() {
        super();
        this.name = "PP Alcohol";
        this.description = "If doesn't have Drunken PP, grants Drunken PP and +10 DEX. Else, grants 5 DEX.";
        this.autoPass = true;
        this.needsTarget = false;
    }

    execute(_user, _target = null) {
        _user.duel.addMessage(_user.getName() + " drinks a martini...");
        if (_user.hasFightingStyle("drunken")) {
            _user.duel.addMessage("...and gets 5 DEX!");
            _user.DEXValue += 5;
        }
        else {
            _user.duel.addMessage("...and gets a drunken PP!");
            _user.addFightingStyle("drunken");
            _user.DEXValue += 10;
        }

        _user.duel.addAnimation("drunken", 60, _user);
        _user.duel.memorySoundEffects.push("drink");
    }
}

// UNLOCKED
class Perhaps extends Move {
    constructor() {
        super();
        this.name = "Perhaps";
        this.description = "Skips your turn.";
        this.autoPass = true;
        this.needsTarget = false;
    }

    execute(_user, _target = null) {
        _user.duel.addMessage(_user.getName() + " thinks about life and the universe...");
        _user.duel.addMessage("Wait he forgot about the battle!");

        _user.duel.addAnimation("perhaps", 60, _user);
        _user.duel.memorySoundEffects.push("thinks");
    }
}

// UNLOCKED
class Pig extends Move {
    constructor() {
        super();
        this.name = "Pig";
        this.description = "Heals some STR per turn. Using the move again makes the effect stack based on the Fibonacci sequence. Starts at 5 per turn.";
        this.needsTarget = false;
    }

    execute(_user, _target = null) {
        _user.duel.addMessage(_user.getName() + " squeezes hog yeah yeah!");
		if (_user.pigHeal < 5) {
			_user.pigHeal = 5;
		}
		else {
			var i = 0;
			while (fibonacciNumber(i) < _user.pigHeal) {
				i += 1;
			}
			_user.pigHeal += fibonacciNumber(i-1);
		}

        _user.duel.memorySoundEffects.push("mmh");
        _user.duel.addAnimation("squeeze", 60, _user);

		if (_user.hasBoner) {
			_user.duel.addMessage(_user.getName() + " loses his boner!");
            _user.hasBoner = false;
		}
    }
}

// UNLOCKED
class PregnantBro extends Move {
    constructor() {
        super();
        this.name = "PP Growth";
        this.description = "Grants Big PP and +10 DEX.";
        this.autoPass = true;
        this.needsTarget = false;
    }

    execute(_user, _target = null) {
        _user.duel.addMessage(_user.getName() + " wants a Big PP...");
        if (_user.hasFightingStyle("big")) {
            _user.duel.addMessage("...but he already had one!");
        }
        else {
            _user.duel.addMessage("...and now he got it!");
            _user.addFightingStyle("big");
            _user.DEXValue += 10;

            _user.duel.addAnimation("big", 60, _user);
            _user.duel.memorySoundEffects.push("mmh");
        }
    }
}

// UNLOCKED
class PunchingPP extends Move {
    constructor() {
        super();
        this.name = "Punch PP";
        this.description = "Inflicts 10 + this.STR/10 damages.";
    }

    execute(_user, _target = null) {
        _user.duel.addMessage(_user.getName() + " punches " + _target.getName() + "'s PP!");
        _target.damage(10 + Math.floor(_user.STR/10), "attack", _user);

        _user.duel.addAnimation("punch", 60, _target, true, false);
        _user.duel.memorySoundEffects.push("punchA");
    }
}

// UNLOCKED
class PunchingPPReallyHard extends Move {
    constructor() {
        super();
        this.name = "Punch PP Really Hard";
        this.description = "Inflicts 20 + this.STR/8 damages.";
        this.dexChange = -10;
    }

    execute(_user, _target = null) {
        _user.duel.addMessage(_user.getName() + " punches " + _target.getName() + "'s PP really hard!");
        _target.damage(20 + Math.floor(_user.STR/8), "attack", _user);

        _user.duel.addAnimation("punch", 60, _target, true, false);
        _user.duel.memorySoundEffects.push("punchB");
    }
}

// UNLOCKED
class RedPill extends Move {
    constructor() {
        super();
        this.name = "Red Pill";
        this.description = "Gets +5 STR and +3 DEX. Both values are multiplied by the number of times this move has been used by the fighter.";
        this.needsTarget = false;
    }

    execute(_user, _target = null) {
        _user.duel.addMessage(_user.getName() + " gets a pill!");
		_user.redPillAddiction += 1;
		_user.STRValue += 5*_user.redPillAddiction;
		_user.DEXValue += 3*_user.redPillAddiction;

        _user.duel.memorySoundEffects.push("flex");
        _user.duel.addAnimation("pill", 60, _user);
    }
}

// TO UNLOCK
class RootOfNuisance extends Move {
    constructor() {
        super();
        this.name = "Root Of Nuisance";
        this.description = "Abandons the battle by setting the user's STR at -9999999999.";
        this.needsTarget = false;
    }

    execute(_user, _target = null) {
        _user.duel.addMessage(_user.getName() + " abandons the battle!");
		_user.setSTR(-9999999999);

        _user.duel.addAnimation("adios", 60, _user);
        _user.duel.memorySoundEffects.push("thisSucks");
    }
}

// TO UNLOCK
class SatanMove extends Move {
    constructor() {
        super();
        this.name = "Satan";
        this.description = "Possess the enemy's PP, he will use the next attack as you, on the same target, in the next turn.";
        this.dexChange = -10;
    }

    execute(_user, _target = null) {
        if (_target.possessCountdown > 0 && _target.possessedBy != null && _target.possessedBy.isAlive()) {
            if (_target.possessedBy.STR > _user.STR) {
                _user.duel.addMessage(_user.getName() + " cannot break " + _target.possessedBy.getName() + "'s possession on' " + _target.getName());
                return;
            }
            _user.duel.addMessage(_user.getName() + " breaks " + _target.possessedBy.getName() + "'s possession on' " + _target.getName());
        }

        _user.duel.addMessage(_user.getName() + " possesses " + _target.getName());
        _target.possessedBy = _user;
        _target.possessCountdown = 2;

        _user.duel.addAnimation("possessed", 60, _target, true, false);
        _user.duel.memorySoundEffects.push("darkMagic");
    }
}

// TO UNLOCK
class Save extends Move {
    constructor() {
        super();
        this.name = "Save";
        this.description = "Every dead allies gets back up with 50 STR. If no ally is dead, heals the user 50 STR.";
        this.needsTarget = false;
    }

    execute(_user, _target = null) {
        var l = _user.duel.getAlliesOf(_user);
        var deadAllies = [];
        for (var i in l) {
            if (l[i].isDead()) {
                deadAllies.push(l[i]);
            }
        }

        if (deadAllies.length <= 0) {
            _user.duel.addMessage(_user.getName() + " heals himself!");
            _user.duel.addAnimation("ohYeahDouble", 60, _user);
            _user.duel.memorySoundEffects.push("thisSucks");
            _user.heal(50);
        }
        else {
            for (var i in deadAllies) {
                deadAllies[i].setSTR(0);
                _user.duel.addMessage(_user.getName() + " saves " + deadAllies[i].getName() + "!");
                _user.duel.addAnimation("save", 60, deadAllies[i]);
                if (!deadAllies[i].heal(50)) {
                    _user.duel.addMessage("Or not lmao.");
                }
            }
        }
    }
}

// UNLOCKED
class SawBlade extends Move {
    constructor() {
        super();
        this.name = "Sawblade";
        this.description = "Target gets a stackable effect that inflicts this.STR/15 damages per turn. Has 10% chance granting scarred PP to the opponent.";
    }

    execute(_user, _target = null) {
        _user.duel.addMessage(_user.getName() + " cuts " + _target.getName() + "'s PP!");
        _target.bleedDamage += Math.floor(_user.STR/15);
        if (_target.rollLuckPercentLow() <= 10 && !_target.hasFightingStyle("scarred")) {
            _user.duel.addMessage(_target.getName() + " gets a scarred PP!");
            _target.addFightingStyle("scarred");
            _target.DEXValue += 10;
        }

        _user.duel.addAnimation("cut", 60, _target, true, false);
        _user.duel.memorySoundEffects.push("cut");
        if (_target.isAlive()) _user.duel.memorySoundEffects.push(_target.getHurtSound());
    }
}

// UNLOCKED
class Scout extends Move {
    constructor() {
        super();
        this.name = "Scout";
        this.description = "Grants +20 DEX next turn.";
        this.needsTarget = false;
        this.autoPass = true;
    }

    execute(_user, _target = null) {
        _user.duel.addMessage(_user.getName() + " examines the qualities of his opponents' PP!");
        if (_user.scoutBuff >= 2) {
            _user.duel.addMessage("And he learns... not that much.");
        }
        else {
            _user.duel.addMessage("And he learns a lot!");
        }
        _user.scoutBuff = 2;

        _user.duel.memorySoundEffects.push("mmh");
        _user.duel.addAnimation("examines", 60, _user);
        var l = _user.duel.getOppsOf(_user);
        for (var i in l) {
            _user.duel.addAnimation("examinated", 60, l[i]);
        }
    }
}

// TO UNLOCK
class ShieldMove extends Move {
    constructor() {
        super();
        this.name = "Riot Shield";
        this.description = "Gets a shield that will reflect the next attack on the opponent.";
        this.dexChange = -20;
    }

    execute(_user, _target = null) {
        if (_user.riotShield) {
            _user.duel.addMessage(_user.getName() + " gets a brand new shield!");
        }
        else {
            _user.duel.addMessage(_user.getName() + " gets a shield!");
            _user.riotShield = true;
        }

        _user.duel.addAnimation("shield", 60, _user);
        _user.duel.memorySoundEffects.push("protect");
    }
}

// UNLOCKED
class Steel extends Move {
    constructor() {
        super();
        this.name = "Steel";
        this.description = "Reduces all damages to 10% for this turn.";
        this.autoPass = true;
        this.priority = true;
        this.needsTarget = false;
    }

    execute(_user, _target = null) {
        _user.duel.addMessage(_user.getName() + " protects everyone!");
        if (_user.duel.steelProtection) {
            _user.duel.addMessage("But there already was a protection!");
        }
        else {
            _user.duel.memorySoundEffects.push("protect");
            for (var i in _user.duel.getAllFighters()) {
                _user.duel.addAnimation("protection", 60, _user.duel.getAllFighters()[i]);
            }
        }
        _user.duel.steelProtection = true;
    }
}

// UNLOCKED
class Swap extends Move {
    constructor() {
        super();
        this.name = "Swap";
        this.description = "Swaps STR with the target.";
        this.dexChange = -20;
    }

    execute(_user, _target = null) {
        _user.duel.addMessage(_user.getName() + " swaps STR with " + _target.getName() + "!");

        // before swap STR, check who says something
        if (_user.isAlive()) _user.duel.memorySoundEffects.push(_user.getHurtSound());
        if (_target.isAlive()) _user.duel.memorySoundEffects.push(_target.getHurtSound());

        var strMemory = _user.STR;
        _user.setSTR(_target.STR);
        _target.setSTR(strMemory);

        _user.duel.addAnimation("swap", 60, _user);
        _user.duel.addAnimation("swap", 60, _target);
    }
}

// UNLOCKED
class SuperKidneyShoot extends Move {
    constructor() {
        super();
        this.name = "Super Kidney Shoot";
        this.description = "Target and user takes 500 damages. Has 66% chance to force the target's movepool to only 'Kidney Shoot' and 'Super Kidney Shoot' for the next turn.";
    }

    execute(_user, _target = null) {
        _user.duel.addMessage(_user.getName() + " shoots a super kidney stone!");
        _user.damage(500, "inner")
        if (_target.damage(500, "attack", _user) && _user.rollLuckPercentLow() <= 66) {
            _target.kidneyCurse = 2;
        }

        _user.duel.memorySoundEffects.push("punchB");
        _user.duel.addAnimation("shoot", 60, _user);
    }
}

// UNLOCKED
class TurkeyBomb extends Move {
    constructor() {
        super();
        this.name = "Turkey";
        this.description = "Every living opponent gets 500 STR, but they all explode in 5 turns, inflicting 1000 damages. Eating again resets the countdown.";
        this.needsTarget = false;
    }

    execute(_user, _target = null) {
        _user.duel.addMessage(_user.getName() + " starts a feast!");

        var l = _user.duel.getOppsOf(_user);
        for (var i in l) {
            if (l[i].isDead()) continue;
            l[i].heal(500);
            l[i].turkeyBomb = 6;

            _user.duel.addAnimation("yum", 60, l[i]);
        }

        if (_user.duel.uwuText) {
            _user.duel.sexyTextCountdown = 6;
        }
    }
}

// UNLOCKED
class TrapSign extends Move {
    constructor() {
        super();
        this.name = "Trap Sign";
        this.description = "If an opponent uses a move targetting you for this turn, every opponent gets no DEX for next turn.";
        this.autoPass = true;
        this.priority = true;
        this.needsTarget = false;
    }

    execute(_user, _target = null) {
        if (_user.readyToBurst) _user.duel.addMessage(_user.getName() + " gets ready to burst!");
        else _user.duel.addMessage(_user.getName() + " is ready to burst!");
        _user.readyToBurst = true;

        _user.duel.addAnimation("ready", 60, _user);
        _user.duel.memorySoundEffects.push("protect");
    }
}

// UNLOCKED
class Yes extends Move {
    constructor() {
        super();
        this.name = "YES";
        this.description = "A random fighter plays random moves on random targets. The number of moves played is random and based upon the number of unlocked moves.";
        this.needsTarget = false;
        this.dexChange = -20;
    }

    execute(_user, _target = null) {
        _user.duel.triggeredChaos = true;
        var random = _user.duel.getRandomFighter();
        var nb = Math.floor(random.rollLuckPercentHigh()/100*_user.getCurrentListOfMoves().length)+1;

        var all = _user.duel.getAllFighters();
        for (var i in all) {
            if (all[i].truffleFriendly || (all[i].rollLuckPercentLow() <= 20 && all[i].eldritchFriendly)) {
                random = all[i];
            }
        }
        if (_user.truffleFriendly || (_user.rollLuckPercentLow() <= 20 && _user.eldritchFriendly)) {
            random = _user;
        }

        if (_user.eldritchFriendly) nb += 20;

        _user.duel.addMessage(_user.getName() + " calls the Ancient Fungus!");
        _user.duel.addMessage("He will use " + nb + "% of his power in " + random.getName() + "!");
        nb = Math.floor(nb/4)+1;
        for (var i = 0; i < nb; i++) {
            var storedMove = {};
            storedMove["user"] = random;
            storedMove["move"] = random.getRandomMove();
            while (storedMove["move"] == Yes) {
                storedMove["move"] = _user.getRandomMove();
            }
            storedMove["target"] = _user.duel.getRandomFighter();
            _user.duel.memoryMoves.push(storedMove);
        }

        _user.duel.memorySoundEffects.push("darkMagic");
        _user.duel.addAnimation("summons", 60, _user);
        _user.duel.addAnimation("truffled", 60, _user, false, false);

        if (_user.duel.uwuText) {
            _user.duel.russianTextCountdown = 1;
        }
    }
}

const REGULAR_MOVE_LIST = [AcidCover, AdaptPP, Barrel, BigGuy, BigSatan,
    Boomerang, BrocketeerDive, BronanSlam,
    Bullet, DeadBro, EncrustPP, FlexBro, HighFiveBro,
    Hologram, InterrogationPoint, KidneyShoot, Kick, LaughingSoul, LivingGod,
    Martini, Pig, PregnantBro, PunchingPP, PunchingPPReallyHard,
    RedPill, RootOfNuisance, Save, SawBlade, Scout,
    ShieldMove, Steel, Swap, TrapSign, TurkeyBomb, Yes];
