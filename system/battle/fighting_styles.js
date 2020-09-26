class FightingStyles {
    static get(_name) {
        for (var i in FightingStyles.StylesList) {
            if (FightingStyles.StylesList[i].replace(/\s/g, '').toLowerCase() == _name.toLowerCase() + "pp") {
                return FightingStyles.StylesList[i];
            }
        }
        return null;
    }

    static getDesc(_style) {
        switch(_style) {
            case "Big PP":
                return "+20 STR, -5 DEX.";
            case "Fast PP":
                return "+5 DEX, -10 STR.";
            case "Drunken PP":
                return "-15 DEX, has 50% chance to ignore every damage.";
            case "Alien PP":
                return "-10 STR, adds 3 haemorrhage stacks on opponent when attacked.";
            case "Hockey Puck PP":
                return "-45 STR, -45 DEX. Hahaha!";
            case "Versatile PP":
                return "-20 DEX, +1 move slot.";
        }
        return "";
    }
}

FightingStyles.StylesList = [
    "Big PP",
    "Fast PP",
    "Drunken PP",
    "Hockey Puck PP",
    "Alien PP",
    "Versatile PP"
]
