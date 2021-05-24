GodManager.loadList([
    // IMPORTANT NOTE:
    // when adding new gods, gotta go through older enemies to see if they could use it

    // Regular Gods
    new RegularGod(
        "Brenn",
        [
            "Wait, is that you...?",
            "Adds this.STR/10 haemorrhage to the target.",
            "Gets an extra life."
        ],
        function(_user, _target = null) { // regular move
            _user.duel.addMessage(_user.getName() + " plays a guitar solo that makes " + _target.getName() + "'s ears bleed!");
            _target.bleedDamage += Math.floor(_user.STR/10);

            _user.duel.addAnimation("bleed", 60, _target, true, false);
            _user.duel.addAnimation("solo", 60, _user);
            _user.duel.memorySoundEffects.push("guitarSolo");
            if (_target.isAlive()) _user.duel.memorySoundEffects.push(_target.getHurtSound());
        },
        function(_user, _target = null) { // special move
            _user.duel.addMessage(_user.getName() + " feels like Jesus!");
            _user.duel.addMessage(_user.getName() + " gets an extra life!");
            _user.extraLife += 1;

            _user.duel.memorySoundEffects.push("jesus");
            _user.duel.addAnimation("amen", 60, _user);
        }
    ), // Brenn
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

                _user.duel.addAnimation("chad", 60, _user);
                _user.duel.memorySoundEffects.push("ohYeah");
            }
            else {
                _user.duel.addAnimation("sad", 60, _user);
                _user.duel.addMessage("But no one joined him!");
            }
        },
        function(_user, _target = null) { // special move
            if (_target.STR > _user.STR) {
                _user.duel.addMessage(_user.getName() + " gets " + _target.getName() + "'s strength!");
                _user.setSTR(_target.STR);

                _user.duel.memorySoundEffects.push("mmh");
            }
            else {
                _user.duel.addMessage(_user.getName() + " already is the strongest!");
            }
            if (_target.DEX > _user.DEX) {
                _user.duel.addMessage(_user.getName() + " gets " + _target.getName() + "'s dexterity!");
                _user.setDEX(_target.DEX);

                _user.duel.memorySoundEffects.push("mmh");
            }
            else {
                _user.duel.addMessage(_user.getName() + " already is the fastest!");
            }
        }
    ), // Chad Brenn
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
    ), // Country Music Brenn
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

                _user.duel.addAnimation("eldritch", 60, _user);
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
    ), // DickDickSon666
    new RegularGod(
        "Hello There Puds",
        [
            "Terrifying alternate version of Pudding",
            "Has [50 + this.STR - target.STR] % chance to inflict 100 damages.",
            "Gets +25% DEX."
        ],
        function(_user, _target = null) { // regular move
            _user.duel.addMessage(_user.getName() + " tries to scare " + _target.getName() + "!");
            if (_user.rollLuckPercentLow() <= 50 + _user.STR - _target.STR) {
                _target.damage(100, "inner");
            }
            else {
                _user.duel.addMessage("But it fails...");
            }

            _user.duel.addAnimation("aah", 60, _user);
            _user.duel.memorySoundEffects.push("scream");
        },
        function(_user, _target = null) { // special move
            _user.duel.addMessage(_user.getName() + " gets a sudden body change!");
            _user.DEXValue += Math.floor(_user.DEX/4);

            _user.duel.memorySoundEffects.push("scream");
            _user.duel.addAnimation("change", 60, _user);
        }
    ), // Hello There Puds
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
    ), // Ranger
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

            _user.duel.memorySoundEffects.push("salt");
            _user.duel.addAnimation("salt", 60, _target, true, false);
        },
        function(_user, _target = null) { // special move
            _user.duel.addMessage(_user.getName() + " bores " + _target.getName() + " by non-stop talking!");
            _target.DEXValue -= Math.floor(_target.DEXValue/5);

            _user.duel.addAnimation("bored", 60, _target, true, false);
            _user.duel.addAnimation("blabla", 60, _user);
        }
    ), // Salt King
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

            _user.duel.addAnimation("punch", 60, _target, true, false);
            _user.duel.memorySoundEffects.push("punchB");
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

            _user.duel.addAnimation("punch", 60, _target, true, false);
            _user.duel.memorySoundEffects.push("punchB");
        }
    ), // UREGonnaGetRAPED
    new RegularGod(
        "STFU Isaac",
        [
            "The very first victim of Espinoza. His trauma was so powerful he became a god.",
            "Gets 1/20 STR of every fighter.",
            "Curses the target with bad luck, making all his illegal moves caught by PP Arbitrator."
        ],
        function(_user, _target = null) { // regular move
            _user.duel.addMessage(_user.getName() + " starts to cry!");
            var l = _user.duel.getAllFighters();
            var nb = 0;
            for (var i in l) {
                if (l[i].isDead() || l[i].id == _user.id) continue;
                var value = Math.floor(l[i].STR/20);
                _user.duel.addMessage(l[i].getName() + " shares some of his STR with " + _user.getName() + "!");
                l[i].STRValue -= value;
                _user.heal(value);
                nb += 1;
            }
            if (nb == 0) {
                _user.duel.addMessage("But no one is willing to share some STR...");
            }

            _user.duel.addAnimation("cry", 60, _user);
            _user.duel.memorySoundEffects.push("cry");
        },
        function(_user, _target = null) { // special move
            _user.duel.addMessage(_user.getName() + " curses " + _target.getName() + " with bad luck!");
            _target.badLuck = true;
            _target.luck = 0;

            _user.duel.addAnimation("cursed", 60, _target);
            _user.duel.memorySoundEffects.push("darkMagic");
        }
    ), // STFU Isaac
    new RegularGod(
        "The Brain",
        [
            "The one-sided god of knowledge. It is said he has ties with higher space beings.",
            "Reduces the DEX of the target by 5.",
            "The target cannot build up DEX Bous anymore."
        ],
        function(_user, _target = null) { // regular move
            _user.duel.addMessage(_user.getName() + " hits " + _target.getName() + "'s weakness!");
            _target.DEXValue -= 5;

            _user.duel.addAnimation("weakness", 60, _target, false, false);
            _user.duel.memorySoundEffects.push("punchBig");
        },
        function(_user, _target = null) { // special move
            _user.duel.addMessage(_target.getName() + "'s plan of attack gets exposed! He can't get any DEX Bonus by missing a move!");
            _target.noDexBonus = true;

            _user.duel.addAnimation("exposed", 60, _target);
            _user.duel.memorySoundEffects.push("hey");
        }
    ), // The Brain
    new RegularGod(
        "The Brawn",
        [
            "The one-sided god of physical strength, once one with The Brain.",
            "Inflicts this.STR/10 and reduces the DEX of the target by 15 for 3 turns.",
            "Building up damages doesn't reduces DEX anymore. Also uses the build-up move."
        ],
        function(_user, _target = null) { // regular move
            _user.duel.addMessage(_user.getName() + " punches " + _target.getName() + "'s PP with his head!");
            var r = _target.damage(10 + Math.floor(_user.STR/10), "attack", _user);

            if (r) {
                _target.disabled = 4;
            }

            _user.duel.addAnimation("dive", 60, _target, true, false);
            _user.duel.memorySoundEffects.push("punchA");
        },
        function(_user, _target = null) { // special move
            _user.duel.addMessage(_user.getName() + " becomes a giga-chad!");
            _user.gigaChad = true;

            var storedMove = {};
            storedMove["user"] = _user;
            storedMove["move"] = BronanSlam;
            storedMove["target"] = _target;
            _user.duel.memoryMoves.push(storedMove);

            _user.duel.addAnimation("man", 60, _user);
            _user.duel.memorySoundEffects.push("ohYeah");
        }
    ), // The Brawn
    new RegularGod(
        "Villager",
        [
            "A square-shaped human with a big nose who likes to trade and most of the time scam people.",
            "Gets a new Special Charge in 5 turns. If already waiting for one, instantly gets it instead.",
            "Gets a new Regular Charge in 3 turns. If already waiting for one, instantly gets it instead."
        ],
        function(_user, _target = null) { // regular move
            if (_user.gettingSpecialCharge > 0) {
                _user.duel.addMessage(_user.getName() + " gets a new special charge!");
                _user.specialCharges += 1;
                _user.gettingSpecialCharge = 0;
            }
            else {
                _user.duel.addMessage(_user.getName() + " will get a new special charge in a few turns!");
                _user.gettingSpecialCharge = 6;
            }

            _user.duel.addAnimation("nose", 60, _user);
            _user.duel.memorySoundEffects.push("mmh");
        },
        function(_user, _target = null) { // special move
            if (_user.gettingRegularCharge > 0) {
                _user.duel.addMessage(_user.getName() + " gets a new regular charge!");
                _user.regularCharges += 1;
                _user.gettingRegularCharge = 0;
            }
            else {
                _user.duel.addMessage(_user.getName() + " will get a new regular charge in a few turns!");
                _user.gettingRegularCharge = 4;
            }

            _user.duel.addAnimation("nose", 60, _user);
            _user.duel.memorySoundEffects.push("mmh");
        }
    ), // Villager

    // Waifus
    new Waifu(
        "Megumin",
        [
            "An isekai girl that got isekai-ed into the PP Punch multiverse.",
            "Grants 5 explosion magic points.",
            "Grants 3 explosion magic points and inflicts this.STR * [magic points] / 10 damages. Has 0 DEX for the next 3 turns."
        ],
        function(_user, _target = null) { // regular move
            _user.duel.addMessage(_user.getName() + " adds 5 points to Explosion Magic!");
            _user.explosionMagic += 5;

            _user.duel.memorySoundEffects.push("flames");
            _user.duel.addAnimation("points", 60, _user);
        },
        function(_user, _target = null) { // special move
			_user.explosionMagic += 3;
            _user.duel.memoryDialogues.push(randomFromList([68, 69, 70, 71]));

			_target.damage(Math.floor(_user.explosionMagic*_user.STR/10), "attack", _user);
			_user.noDex = 4;

            _user.duel.memorySoundEffects.push("explosion");
            _user.duel.addAnimation("explosion", 60, _target);
        }
    ), // Megumin
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

            _user.duel.addAnimation("silenced", 60, _target, true, false);
        }
    ), // Priestess
    new Waifu(
        "Rias",
        [
            "Demon Girl, chess master and the main girl of the Harem King.",
            "Gets +2 DEX and +20 STR. If used again, the amount doubles until reaching 6 uses.",
            "For the remaining turn, all damages dealt to the opponent team are dealt to every opponents. Inflicts <highest opponents STR>/5 damages to every opponents."
        ],
        function(_user, _target = null) { // regular move
            _user.chessPromotion += 1;
			if (_user.chessPromotion > 6) {
				_user.duel.addMessage(_user.getName() + " already is at maximum promotion!");
				_user.chessPromotion -= 1;
			}
			else if (_user.chessPromotion > 1) {
				_user.duel.addMessage(_user.getName() + " gets a promotion!");
                _user.duel.memorySoundEffects.push("ohYeah");
                _user.duel.addAnimation("promotion", 60, _user);
			}
			else {
				_user.duel.addMessage(_user.getName() + "'s becomes Rias' pawn!");
                _user.duel.memorySoundEffects.push("ohYeah");
                _user.duel.addAnimation("rook", 60, _user);
			}
        },
        function(_user, _target = null) { // special move
            _user.duel.addMessage(_user.getName() + " summons the Demonic Star of Destruction - The Extinquished Star!");

            var l = _user.duel.getOppsOf(_user);
            for (var i in l) {
                l[i].trappedInStar = true;
                _user.duel.addMessage(l[i].getName() + " is trapped in the star!");
            }

            _user.duel.memorySoundEffects.push("darkMagic");
            _user.duel.addAnimation("summon", 60, _user);
        }
    ), // Rias
    new Waifu(
        "Ryuko",
        [
            "Wait, isn't she the waifu of a black and red hedgehog?",
            "Stackable Effect that grants +5% critical hit.",
            "Gets +200 STR and +20 DEX. Looses 20 STR per turn. Stops at 40- STR."
        ],
        function(_user, _target = null) { // regular move
            _user.lifeFibers += 1;
			if (_user.lifeFibers > 20) {
				_user.duel.addMessage(_user.getName() + " already is completely fused with life fiber!");
				_user.lifeFibers -= 1;
			}
			else if (_user.lifeFibers > 1) {
				_user.duel.addMessage(_user.getName() + "'s body fuses with more life fibers!");
                _user.duel.memorySoundEffects.push(_user.getHurtSound());
                _user.duel.addAnimation("fiber", 60, _user);
			}
			else {
				_user.duel.addMessage(_user.getName() + "'s body fuses with life fibers!");
                _user.duel.memorySoundEffects.push(_user.getHurtSound());
                _user.duel.addAnimation("fiber", 60, _user);
			}
        },
        function(_user, _target = null) { // special move
            if (!_user.hasKamui) {
				_user.duel.addMessage(_user.getName() + " gets a Kamui!");
                _user.STRValue += 200;
				_user.hasKamui = true;

                _user.duel.memorySoundEffects.push(_user.getHurtSound());
                _user.duel.addAnimation("kamui", 60, _user);
			}
			else {
				_user.duel.addMessage(_user.getName() + " already has a Kamui!");
			}
        }
    ), // Ryuko
    new Waifu(
        "Senjougahara",
        [
            "Purple haired tsundere that will staple your balls.",
            "Inflict this.STR/10 damages, and add this.STR/10 haemorrhage to the opponent.",
            "Opponent loses 20 DEX."
        ],
        function(_user, _target = null) { // regular move
            _user.duel.addMessage(_user.getName() + " staples " + _target.getName() + "'s PP!")
			if (_target.damage(Math.floor(_user.STR/10), "attack", _user)) {
                _target.bleedDamage += Math.floor(_user.STR/10);
            }

            _user.duel.memorySoundEffects.push("staple");
            _user.duel.addAnimation("stapled", 60, _target, true, false);
        },
        function(_user, _target = null) { // special move
            _user.duel.addMessage(_target.getName() + " gets cursed by a Crab Oddity.");
			_target.DEXValue -= 20;

            _user.duel.memorySoundEffects.push("darkMagic");
            _user.duel.addAnimation("cursed", 60, _target, true, false);
        }
    ), // Senjougahara

    // Eldritch Gods

    // Wyndoella
    new God(
        "Wyndoella",
        [
            "The one and only Overgod, Wyndoella is all worlds. She’s everything and everyone, beyond space, time, and every other concept you could think of.",
            "Resurrects all allies.",
            "Grants godhood, increasing STR and DEX by 10000. Only works on important people.",
            "Grants the shield of faith, which reduces direct damages by 5 times the amount of gods you have."
        ],
        "overgod",
        function(_user, _target = null) { // regular move
            var l = _user.duel.getAlliesOf(_user);
            var deadAllies = [];
            for (var i in l) {
                if (l[i].isDead()) {
                    deadAllies.push(l[i]);
                }
            }

            if (deadAllies.length <= 0) {
                _user.duel.addMessage("But no one is in need of a resurrection!");
            }
            else {
                for (var i in deadAllies) {
                    deadAllies[i].setSTR(100);
                    _user.duel.addMessage(deadAllies[i].getName() + " resurrects!");
                    _user.duel.addAnimation("heal", 60, deadAllies[i]);
                }
                _user.duel.memorySoundEffects.push("heal");
            }
        },
        function(_user, _target = null) { // special move
            if (!_user.isOfInterest()) {
                _user.duel.addMessage(_user.getName() + " cannot comprehend Wyndoella, and becomes mad.");
                _user.madnessStacks += 5;
                return false;
            }
            _user.duel.addMessage("Wyndoella grants " + _user.getName() + " Godhood.");

            var storedMove = {};
            storedMove["user"] = _user;
            storedMove["move"] = LivingGod;
            storedMove["target"] = _target;
            _user.duel.memoryMoves.push(storedMove);
        },
        function(_user) { // trigger move
            _user.shieldOfFaith = true;
        }
    )
]);
GodManager.STARTER_GODS = [
    "Brenn", "Country Music Brenn", "Chad Brenn",
    "DickDickSon666", "Hello There Puds", "UREGonnaGetRAPED",
    "Ranger", "Salt King"
];
