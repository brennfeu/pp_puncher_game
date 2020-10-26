GodManager.loadList([
    // IMPORTANT NOTE:
    // when adding new gods, gotta go through older enemies to see if they could use it

    // Regular Gods
    new RegularGod(
        "Brenn",
        [
            "Wait, is that you...?",
            "Adds this.STR/10 haemorrhage to the opponent.",
            "Gets an extra life."
        ],
        function(_user, _target = null) { // regular move
            _user.duel.addMessage(_user.getName() + " plays a guitar solo that makes " + _target.getName() + "'s ears bleed!");
            _target.bleedDamage += Math.floor(_user.STR/10);

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
        [
            "Brenn except he looks good this time.",
            "Adds a random waifu to the current list of worshipped gods.",
            "Gets the best stats out of the user and the target."
        ],
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
        [
            "Brenn except he makes Country music. Also kinda is a cow-boy.",
            "Makes the Pig buff 5 times more powerful.",
            "Grants the opponent an Hockey Puck PP (-45 to both stats)."
        ],
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
                _user.duel.addMessage("But " + _target.getName() + " already has a Hockey Puck PP!");
            }
        }
    ),
    new RegularGod(
        "DickDickSon666",
        [
            "Demonic alternate version of Pudding.",
            "Makes the user Eldritch Friendly, which grants +20% power when using YES.",
            "Big Satan is the only available move until its 50% chance to stop."
        ],
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
        [
            "Terrifying alternate version of Pudding",
            "Has [50 + this.STR - target.STR] % chance to inflict 100 damages.",
            "Gets +25% DEX."
        ],
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
            _user.DEXValue += Math.floor(_user.DEX/4);
        }
    ),
    new RegularGod(
        "Ranger",
        [
            "Eldon from another universe, in which he is a survivor of an apocalypse.",
            "Use both Flex and Big Guy moves.",
            "Fire 2 bullets, twice the number of bullets if the enemy is a furry."
        ],
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
        [
            "Eldon from another universe, in which his salt grew so strong he became a God.",
            "Target's bleed damage are 5 times stronger.",
            "Removes 1/5 of the target's DEX."
        ],
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
        [
            "Uh, we don't talk about that alternate version of Pudding",
            "Gets a boner (+50 STR and -20 DEX). Inflicts (this.STR-(this.DEX/2))/5 damages.",
            "Both fighters gets a boner. Inflicts STR/2 damages."
        ],
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
    // TOUSE description for a waifu "An isekai girl that got isekai-ed into the PP Punch universe."
    new Waifu(
        "Priestess",
        [
            "She almost lost her purity to goblin PP, please treat her right.",
            "Heals 10 HP.",
            "Opponent cannot use his gods' powers."
        ],
        function(_user, _target = null) { // regular move
            _user.duel.memoryDialogues.push(28);
            _user.heal(10);
        },
        function(_user, _target = null) { // special move
            _user.duel.memoryDialogues.push(29);
            _target.isSilenced = true;
            _user.duel.addMessage(_target.getName() + " is silenced!");
        }
    ),
    new Waifu(
        "Ryuko",
        [
            "Wait, isn't she the waifu of a black and red hedgehog?",
            "Stackable Effect that grants +5% critical hit.",
            "Gets +200 STR and +20 DEX. Looses 20 STR per turn. Stops at 40- STR."
        ],
        function(_user, _target = null) { // regular move
            _user.lifeFibers += 1;
			if (_user.lifeFibers >= 20) {
				_user.duel.addMessage(_user.getName() + " already is completely fused with life fiber!");
				_user.lifeFibers -= 1;
			}
			if (_user.lifeFibers > 1) {
				_user.duel.addMessage(_user.getName() + "'s body fuses with more life fibers!");
			}
			else {
				_user.duel.addMessage(_user.getName() + "'s body fuses with life fibers!");
			}
        },
        function(_user, _target = null) { // special move
            if (!_user.hasKamui) {
				_user.duel.addMessage(_user.getName() + " gets a Kamui!");
				_user.hasKamui = true;
			}
			else {
				_user.duel.addMessage(_user.getName() + " already has a Kamui!");
			}
        }
    ),
    new Waifu(
        "Senjougahara",
        [
            "Purple haired tsundere that will staple your balls.",
            "Inflict this.STR/10 damages, and add this.STR/10 haemorrhage to the opponent.",
            "Opponent loses 20 DEX."
        ],
        function(_user, _target = null) { // regular move
            _user.duel.addMessage(_user.getName() + " staples " + _target.getName() + "'s PP!")
			if (_target.damage(Math.floor(_user.STR/10))) {
                _target.bleedDamage += Math.floor(_user.STR/10);
            }
        },
        function(_user, _target = null) { // special move
            _user.duel.addMessage(_target.getName() + " gets cursed by a Crab Oddity.");
			_target.DEXValue -= 20;
        }
    )

    // Eldritch Gods
]);
GodManager.STARTER_GODS = [
    "Brenn", "Country Music Brenn", "Chad Brenn",
    "DickDickSon666", "Hello There Puds", "UREGonnaGetRAPED",
    "Ranger", "Salt King"
];
