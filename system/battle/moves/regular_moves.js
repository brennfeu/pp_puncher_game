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

class BigSatan extends Move {
    constructor() {
        super();
        this.name = "Big Satan";
        this.description = "Each fighter plays 5 random moves.";
        this.dexChange = -20;
        this.needsTarget = false;
    }

    execute(_user, _target = null) {
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

class HighFiveBro extends Move {
    constructor() {
        super();
        this.name = "High Five";
        this.description = "When used by 2 fighters, they both get +50 STR and +20 DEX for the next turn!";
        this.needsTarget = false;
        this.autoPass = true;
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
                return;
            }
        }

        _user.duel.addAnimation("highfive", 60, _user);
        _user.duel.addMessage(_user.getName() + " wants an high five...");
        _user.wantsHighFive = true;

        _user.duel.memorySoundEffects.push("hey");
    }

    //alternateExecute TODO
}

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
    }
}

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

        _user.duel.addAnimation("kick", 60, _target, true, false);
        _user.duel.memorySoundEffects.push("thisSucks");
    }
}

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

class SawBlade extends Move {
    constructor() {
        super();
        this.name = "Sawblade";
        this.description = "Target gets a stackable effect that inflicts this.STR/15 damages per turn. Has 10% chance granting scarred PP to the opponent.";
    }

    execute(_user, _target = null) {
        _user.duel.addMessage(_user.getName() + " cuts " + _target.getName() + "'s PP!");
        _target.bleedDamage += Math.floor(_user.STR/15);
        if (getRandomPercent() <= 10 && !_target.hasFightingStyle("scarred")) {
            _user.duel.addMessage(_target.getName() + " gets a scarred PP!");
            _target.addFightingStyle("scarred");
            _target.DEXValue += 10;
        }

        _user.duel.addAnimation("cut", 60, _target, true, false);
        _user.duel.memorySoundEffects.push("cut");
        if (_target.isAlive()) _user.duel.memorySoundEffects.push(_target.getHurtSound());
    }
}

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

class Steel extends Move {
    constructor() {
        super();
        this.name = "Steel";
        this.description = "Makes all damages reduced to 10% for this turn.";
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
    }
}

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

class Yes extends Move {
    constructor() {
        super();
        this.name = "YES";
        this.description = "A random fighter plays random moves on random targets. The number of moves played is random and based upon the number of unlocked moves.";
        this.needsTarget = false;
        this.dexChange = -20;
    }

    execute(_user, _target = null) {
        var random = _user.duel.getRandomFighter();
        var nb = Math.floor(getRandomPercent()/100*_user.getCurrentListOfMoves().length)+1;

        var all = _user.duel.getAllFighters();
        for (var i in all) {
            if (all[i].truffleFriendly || (getRandomPercent() <= 20 && all[i].eldritchFriendly)) {
                random = all[i];
            }
        }
        if (_user.truffleFriendly || (getRandomPercent() <= 20 && _user.eldritchFriendly)) {
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
    }
}

const REGULAR_MOVE_LIST = [AdaptPP, BigGuy, BigSatan, Boomerang, BrocketeerDive, BronanSlam,
    Bullet, DeadBro, EncrustPP, FlexBro, HighFiveBro,
    Hologram, InterrogationPoint, Kick, Pig, PregnantBro, PunchingPP, PunchingPPReallyHard,
    RedPill, RootOfNuisance, Save, SawBlade, Scout,
    ShieldMove, Steel, TrapSign, TurkeyBomb, Yes];
