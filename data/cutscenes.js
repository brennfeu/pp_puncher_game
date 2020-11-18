const CUTSCENE_LIST = [
    { // 0 - First Time Launching the game
        "dialogueId": 0,
        "nextSceneKey": "Menu",
        "music": "Arbitrator",
        "distantMusic": true
    },
    { // 1 - Intro Cutscene
        "dialogueId": 1,
        "areaName": "Brenn's Room",
        "nextSceneKey": "Battle",
        "music": "CinematicIntro",
        "nextSceneData": {
            "quest": [1, 0]
        }
    },
    { // 2 - Out of Anime Convention
        "dialogueId": 7,
        "areaName": "Anime Convention's Outside",
        "music": "AnimeConvention_area",
        "distantMusic": true,
        "nextSceneKey": "Map",
        "nextSceneData": {
            "areaSelect": 0
        }
    },
    { // 3 - Out of IKEA
        "dialogueId": 10,
        "areaName": "IKEA's Outside",
        "music": "IKEA_area",
        "distantMusic": true,
        "nextSceneKey": "Map",
        "nextSceneData": {
            "areaSelect": 1
        }
    },
    { // 4 - Credits
        "dialogueId": 15,
        "areaName": "Credits",
        "music": "TitleScreen",
        "distantMusic": true,
        "nextSceneKey": "Menu"
    },
    { // 5 - Out of Beta
        "dialogueId": 20,
        "areaName": "The End",
        "music": "CinematicIntro",
        "nextSceneKey": "Map",
        "nextSceneData": {
            "areaSelect": 3
        }
    },
    { // 6 - Out of High School
        "dialogueId": 24,
        "areaName": "High School's Outside",
        "music": "HighSchool_area",
        "distantMusic": true,
        "nextSceneKey": "Map",
        "nextSceneData": {
            "areaSelect": 2
        }
    },
];
