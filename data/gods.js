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
            // TODO
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
            // TODO
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
