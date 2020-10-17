GodManager.loadList([
    // Regular Gods
    new RegularGod(
        "Brenn",
        function(_user, _target = null) { // regular move
            _user.duel.addMessage(_user.getName() + " plays a guitar solo that makes " + _target.getName() + "'s ears bleed!");
            _target.bleedDamage += Math.floor(_user.STR/20);

            _user.duel.addAnimation("bleed", 60, _target, true, false);
            if (_target.isAlive()) _user.duel.memorySoundEffects.push(_target.getHurtSound());
        },
        function(_user, _target = null) { // special move
            _user.duel.addMessage(_user.getName() + " feels like Jesus!");
            _user.duel.addMessage(_user.getName() + " gets an extra life!");
            _user.extraLife += 1;

            _user.duel.memorySoundEffects.push("jesus");
        }
    ),
    new RegularGod(
        "Chad Brenn",
        function(_user, _target = null) { // regular move
            _user.duel.addMessage(_user.getName() + " needs a new waifu!");

            if (_user.addRandomGod("waifu")) {
                _user.duel.addMessage(_user.godsList[_user.godsList.length-1].name + " joined him!");
            }
            else {
                _user.duel.addMessage("But no one joined him!");
            }
        },
        function(_user, _target = null) { // special move
            if (_target.STR > _user.STR) {
                _user.duel.addMessage(_user.getName() + " gets " + _target.getName() + "'s strength!");
                _user.setSTR(_target.STR);
            }
            else {
                _user.duel.addMessage(_user.getName() + " already is the strongest!");
            }
            if (_target.DEX > _user.DEX) {
                _user.duel.addMessage(_user.getName() + " gets " + _target.getName() + "'s dexterity!");
                _user.setDEX(_target.DEX);
            }
            else {
                _user.duel.addMessage(_user.getName() + " already is the fastest!");
            }
        }
    ),
    new RegularGod(
        "Country Music Brenn",
        function(_user, _target = null) { // regular move
            if (!_user.isCowboy) {
                _user.duel.addMessage(_user.getName() + " becomes a cow-boy!");
                _user.isCowboy = true;

                _user.duel.memorySoundEffects.push("yeehaw");
            }
            else {
                _user.duel.addMessage("But " + _user.getName() + " already is a cow-boy!");
            }
        },
        function(_user, _target = null) { // special move
            if (!_target.hasFightingStyle("hockey puck")) {
                _user.duel.addMessage(_target.getName() + " gets a Hockey Puck PP!");
                _target.addFightingStyle("hockey puck")

                _user.duel.memorySoundEffects.push("yeehaw");
            }
            else {
                _user.duel.addMessage("But " + _user.getName() + " already has a Hockey Puck PP!");
            }
        }
    ),
    new RegularGod(
        "DickDickSon666",
        function(_user, _target = null) { // regular move
            if (!_user.eldritchFriendly) {
                _user.duel.addMessage(_user.getName() + " becomes eldritch friendly!");
                _user.eldritchFriendly = true;

                _user.duel.memorySoundEffects.push("darkMagic");
            }
            else {
                _user.duel.addMessage("But " + _user.getName() + " already is friend with Eldritch Gods!");
            }
        },
        function(_user, _target = null) { // special move
            _user.duel.addMessage(_user.getName() + " releases hell on earth!");
            _user.duel.forceSatan = true;

            _user.duel.memorySoundEffects.push("darkMagic");
        }
    ),
    new RegularGod(
        "Hello There Puds",
        function(_user, _target = null) { // regular move
            _user.duel.addMessage(_user.getName() + " tries to scare " + _target.getName() + "!");
            if (getRandomPercent() <= 50 + _user.STR - _target.STR) {
                _target.damage(100, "inner");
            }
            else {
                _user.duel.addMessage("But it fails...");
            }
        },
        function(_user, _target = null) { // special move
            _user.duel.addMessage(_user.getName() + " gets a sudden body change!");
            _user.DEXValue = _user.STRValue;
        }
    ),
    new RegularGod(
        "Ranger",
        function(_user, _target = null) { // regular move
            new FlexBro().execute(_user, _target);
            new BigGuy().execute(_user, _target);
        },
        function(_user, _target = null) { // special move
            new Bullet().execute(_user, _target);
            new Bullet().execute(_user, _target);
            if (_target.isFurry) {
                _user.duel.addMessage(_user.getName() + " always has more bullet for furries!");
                new Bullet().execute(_user, _target);
                new Bullet().execute(_user, _target);
            }
        }
    ),
    new RegularGod(
        "Salt King",
        function(_user, _target = null) { // regular move
            _user.duel.addMessage(_user.getName() + " makes " + _target.getName() + "'s wounds salty!");
            _target.saltyWounds = true;
        },
        function(_user, _target = null) { // special move
            _user.duel.addMessage(_user.getName() + " bores " + _target.getName() + " by non-stop talking!");
            _target.DEXValue -= Math.floor(_target.DEXValue/5);
        }
    ),
    new RegularGod(
        "UREGonnaGetRAPED",
        function(_user, _target = null) { // regular move
            if (!_user.hasBoner) {
                _user.duel.addMessage(_user.getName() + " gets a boner!");
                _user.hasBoner = true;

                _user.duel.memorySoundEffects.push("mmh");
            }

            _user.duel.addMessage(_user.getName() + " gives a boner punch to " + _target.getName() + "!");
            _user.duel.addAnimation("punch", 60, _target);
			_target.damage(Math.floor((_user.STR - (_user.DEX/2))/5), "attack", _user);
        },
        function(_user, _target = null) { // special move
            if (!_user.hasBoner) {
                _user.duel.addMessage(_user.getName() + " gets a boner!");
                _user.hasBoner = true;

                _user.duel.memorySoundEffects.push("mmh");
            }
            if (!_target.hasBoner) {
                _target.duel.addMessage(_target.getName() + " gets a boner!");
                _target.hasBoner = true;

                _user.duel.memorySoundEffects.push("mmh");
            }

            _user.duel.addMessage(_user.getName() + " gives a boner punch to " + _target.getName() + "!");
            _user.duel.addAnimation("punch", 60, _target);
			_target.damage(Math.floor(_user.STR/2), "attack", _user);
        }
    ),

    // Waifus
    new Waifu(
        "Senjougahara",
        function(_user, _target = null) { // regular move
            // TODO
        },
        function(_user, _target = null) { // special move
            // TODO
        }
    ),
    new Waifu(
        "Ryuko",
        function(_user, _target = null) { // regular move
            // TODO
        },
        function(_user, _target = null) { // special move
            // TODO
        }
    )

    // Eldritch Gods
]);
