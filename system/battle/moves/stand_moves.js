class AcidShot extends Move {
    constructor() {
        super();
        this.name = "Acid Shot";
        this.description = "Target gets a stackable effect that inflicts this.STR/10 damages per turn, but gets the acid cover buff for 5 turns.";

        this.type = "stand";
    }

    execute(_user, _target = null) {
        _user.duel.addMessage(_user.getName() + " shoots acid on " + _target.getName() + "'s PP!");
        _target.acidDamage += Math.floor(_user.STR/10);
        _target.acidCover = 6;

        _user.duel.addAnimation("acid", 60, _target, true, false);
        _user.duel.memorySoundEffects.push("acid");
        if (_target.isAlive()) _user.duel.memorySoundEffects.push(_target.getHurtSound());
    }
}

class AmmoCrate extends Move {
    constructor() {
        super();
        this.name = "Ammo Crate";
        this.description = "Next used move will be triggered 3 times.";
        this.needsTarget = false;

        this.type = "stand";
    }

    execute(_user, _target = null) {
        _user.duel.addMessage(_user.getName() + " gets an ammo crate!");
        _user.fullOfAmmos = true;

        _user.duel.addAnimation("ammo", 60, _user);
        _user.duel.memorySoundEffects.push("ammo");
    }
}

class Brolander extends Move {
    constructor() {
        super();
        this.name = "Quickening";
        this.description = "Grants +2 DEX and increases heals' values by 50%.";
        this.needsTarget = false;

        this.type = "stand";
    }

    execute(_user, _target = null) {
        _user.duel.addMessage(_user.getName() + " gets a quickening charge!");
        _user.quickeningCharges += 1;

        _user.duel.addAnimation("quickening", 60, _user);
        _user.duel.memorySoundEffects.push("quickening");
    }
}

class LostSoulMove extends Move {
    constructor() {
        super();
        this.name = "Lost Soul";
        this.description = "Sends a flying skull to the enemy, inflicting 5+this.STR/10 damage. Each use adds a new skull for the next time.";

        this.type = "stand";
    }

    execute(_user, _target = null) {
        _user.duel.addMessage(_user.getName() + " summons raging spirits!");

        _user.lostSoulCount += 1;
        for (var i = 0; i < _user.lostSoulCount; i++) {
            _target.damage(5 + Math.floor(_user.STR/10), "attack", _user);
            _user.duel.addAnimation("quickening", 60, _target, true, false);
        }

        _user.duel.memorySoundEffects.push("flames");
        _user.duel.memorySoundEffects.push("laugh");
    }
}

class MechSkull extends Move {
    constructor() {
        super();
        this.name = "Mech Skull";
        this.description = "If the user dies during this turn, every opponent takes 3 times the damages that killed him.";
        this.needsTarget = false;
        this.autoPass = true;

        this.type = "stand";
    }

    execute(_user, _target = null) {
        _user.duel.addMessage(_user.getName() + " gets a mech skull!");
        _user.mechSkull = true;

        _user.duel.addAnimation("mech", 60, _user);
        _user.duel.memorySoundEffects.push("scream");
        _user.duel.memorySoundEffects.push("darkMagic");
        _user.duel.memorySoundEffects.push("protect");
    }
}

class SignpostMove extends Move {
    constructor() {
        super();
        this.name = "Signpost";
        this.description = "The target gets 25% chance to get a critical hit when attacked.";
        this.autoPass = true;

        this.type = "stand";
    }

    execute(_user, _target = null) {
        _user.duel.addMessage(_user.getName() + " summons the knowledge signpost and exposes " + _target.getName() + "!");
        if (_target.signpostCurse*25 > 100) {
            _user.duel.addMessage("But every single ones of " + _target.getName() + "'s weaknesses have been spread!");
        }
        else {
            _user.duel.addMessage("Knowledge about " + _target.getName() + "'s weaknesses starts to spread!");
            _target.signpostCurse += 1;
        }

        _user.duel.addAnimation("exposed", 60, _target, true, false);
        _user.duel.memorySoundEffects.push("laugh");
    }
}

class SwordMove extends Move {
    constructor() {
        super();
        this.name = "Sword";
        this.description = "If the user has more STR than the opponent, inflicts this.STR-opponent.STR damages. If not, inflicts 10 + this.STR/10 damages.";

        this.type = "stand";
    }

    execute(_user, _target = null) {
        _user.duel.addMessage(_user.getName() + " attacks " + _target.getName() + " with a sword!");

        var damage = 0;
		if (_user.STR > _target.STR) {
            damage = _user.STR - _target.STR;
		}
		else {
			damage = 10 + Math.floor(_user.STR/10);
		}

        if (_target.damage(damage, "attack", _user) && _user.hasStand(10)) {
            _user.heal(Math.floor(damage/4));
        }

        _user.duel.addAnimation("sword", 60, _target, true, false);
        _user.duel.memorySoundEffects.push("protect");
    }
}

const BASIC_STAND_MOVE_LIST = [
    AcidShot, AmmoCrate, Brolander, LostSoulMove, MechSkull, SignpostMove, SwordMove
];
const STAND_MOVE_LIST = [
    // ADD OTHER MOVES
].concat(BASIC_STAND_MOVE_LIST)
