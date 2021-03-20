AchievementManager.loadList([
    { // 0
        "name": "Punch PP",
        "description": "Win your first battle.",
        "steamName": "PUNCH_PP"
    },
    { // 1
        "name": "Vital Point",
        "description": "Kill an opponent using the Hologram move.",
        "steamName": "VITAL_POINT"
    },
    { // 2
        "name": "Taste of Illegality",
        "description": "Successfully perform a Kick.",
        "steamName": "KICK_PP"
    },
    { // 3
        "name": "Blessed by the Fungus",
        "description": "Lose by using the YES move.",
        "steamName": "TRUFFLE_CHAOS"
    },
    { // 4
        "name": "Unkillable",
        "description": "Get the Undeath Energy status.",
        "steamName": "FLEX",
        "isHidden": true
    },
    { // 5
        "name": "Saved the World?",
        "description": "...nop, but I’m a great Lumberjack!\nGet 1 000 000 000 wood planks.",
        "steamName": "WOOD_CUTTER"
    },
    { // 6
        "name": "HACKING TO THE GAME",
        "description": "Cheat a move.",
        "steamName": "HACKER",
        "isHidden": true
    },
    { // 7
        "name": "Lucky",
        "description": "Has 1% chance to be unlocked when starting the game.",
        "steamName": "LUCKY",
        "isHidden": true
    },
    { // 8
        "name": "Why",
        "description": "Reset Data when you are at 100% completion.",
        "steamName": "WHY"
    },
    { // 9
        "name": "World Tour",
        "description": "Complete the main quest of every area.",
        "steamName": "WORLD_TOUR"
    },
    { // 10
        "name": "UI Breaker",
        "description": "Get a character description that’s as huge as your PP.",
        "steamName": "UI_BREAKER",
        "isHidden": true
    },
]);
AchievementManager.ACHIEVEMENT_LIST = AchievementManager.ACHIEVEMENT_LIST.sort(
    function (a, b) {
        var na = a.name;
        var nb = b.name;
        if (na < nb) return -1;
        else if (na > nb) return 1;
        return 0;
    }
);
AchievementManager.init();
