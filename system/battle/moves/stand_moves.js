class SwordMove extends Move {
    constructor() {
        super();
        this.name = "Sword";
        this.description = "If the user has more STR than the opponent, inflicts this.STR-opponent.STR damages. If not, inflicts 10 + this.STR/10 damages.";
    }

    execute(_user, _target = null) {
        _user.duel.addMessage(_user.getName() + " attacks " + _target.getName() + " with a sword !");
		if (_user.STR > _target.STR) {
			_target.damage(_user.STR - _target.STR, "attack", _user);
		}
		else {
			_target.damage(Math.floor(10 + _user.STR / 10), "attack", _user);
		}

        _user.duel.addAnimation("punch", 60, _target, true, false);
        _user.duel.memorySoundEffects.push("protect");
    }
}

const STAND_MOVE_LIST = [
    SwordMove
]
