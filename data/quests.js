QuestManager.loadList([
    { // 0
        "name": "SPECIAL UNLOCKS",
        "description": "Shouldn't appear in the final game",
        "isMain": false,
        "areaId": -1,

        "questSteps": [
            { // 0
                "name": "BASE UNLOCKS",
                "description": "EVERYTHING UNLOCKED AT THE START",

                "unlockPartyMembers": [ "Brenn" ],
                "unlockMoves": [ PunchingPP, PunchingPPReallyHard, Hologram, FlexBro, HighFiveBro ],
                "unlockAreas": [ 0 ],
                "unlockQuests": [ 1 ],
                "unlockGameMechanics": [ "Game Mechanics", "Moves" ]
            },
            { // 1
                "name": "CHEATING",
                "description": "FIRST TIME CHEATING CHECK",
                "unlockQuests": [ 10, 15 ],
                "unlockGameMechanics": [ "Cheating" ]
            },
            { // 2
                "name": "AREA SCENE DIALOGUE",
                "description": "FIRST TIME SEEEING THE AREA SCENE"
            },
            { // 3
                "name": "MOVE PREFERENCES",
                "description": "ONCE x THINGS HAVE BEEN UNLOCKED",
                "unlockGameMechanics": [ "Move Preferences" ]
            }
        ]
    },
    { // 1
        "name": "Tutorial",
        "description": "Learn how to punch pp while trying to escape the anime convention!",
        "isMain": true,
        "areaId": 0,

        "questSteps": [
            { // 0
                "name": "Weeb",
                "description": "Just a poor weeb in the wild. He immediately attacked you for your waifus.",
                "encounter": "weeb",
                "unlockGameMechanics": [ "Party Members" ],
                "unlockPartyMembers": [ "Pudding" ],
                "duelParam": { "autoPunch": true },
                "postFightDialogue": 2
            },
            { // 1
                "name": "Tutorial Friend",
                "description": "Pudding will help you understand how you punch PP, against 3 weebs",
                "encounter": "3weebs",
                "inFightDialogue": 3
            },
            { // 2
                "name": "Fighting Styles",
                "description": "There probably is something to learn from those twin weebs.",
                "encounter": "weebTwins",
                "unlockGameMechanics": [ "Fighting Styles" ],
                "unlockMoves": [ PregnantBro, DeadBro ],
                "unlockFightingStyles": [ "Big PP", "Fast PP" ],
                "postFightDialogue": 4,
                "unlockQuests": [ 14 ]
            },
            { // 3
                "name": "Weeb King",
                "description": "The only thing between you and the exit, is now the Ultimate Weeb, Master of Anime.",
                "encounter": "weebBoss",
                "unlockQuests": [ 2, 3, 12 ],
                "unlockAreas": [ 1 ],
                "postFightCutscene": 2
            }
        ]
    },
    { // 2
        "name": "Truffle Chaos",
        "description": "This shady russian guy is standing there in the convention. You only noticed him after your battle against the Weeb Boss",
        "isMain": false,
        "areaId": 0,

        "questSteps": [
            { // 0
                "name": "Truffle Chaos",
                "description": "You can't really understand him nor completely see his face, but for some reason you know this guy is russian.",
                "encounter": "truffleA",
                "unlockMoves": [ Yes ],
                "preFightDialogue": 6
            }
        ]
    },
    { // 3
        "name": "PP Training",
        "description": "Pudding's home has been invaded! This sounds like neat training to learn new pp punch moves.",
        "isMain": true,
        "areaId": 1,

        "questSteps": [
            { // 0
                "name": "IKEA Guards",
                "description": "Some kind of swedish military organisation seized the place. Now you can't enter without beating guards.",
                "encounter": "ikeaGuards",
                "postFightDialogue": 8
            },
            { // 1
                "name": "The Scout",
                "description": "Kill the scout before he manages to trigger the alarm system. You have one turn.",
                "encounter": "ikeaScout",
                "duelParam": { "turnCountdown": 2 },
                "unlockMoves": [ Scout ]
            },
            { // 2
                "name": "Swedish Machines",
                "description": "Who doesn't know about IKEA's famous sawblades security against invaders, that cut their enemies in half, and rip their organs?",
                "encounter": "ikeaBlades",
                "unlockMoves": [ SawBlade ],
                "unlockFightingStyles": [ "Scarred PP" ],
                "unlockQuests": [ 5 ]
            },
            { // 3
                "name": "Vitamins",
                "description": "You've been spotted by a patrol. One of the guards opens a can of pills as you arrive!",
                "encounter": "steroidGuard",
                "unlockMoves": [ RedPill ]
            },
            { // 4
                "name": "IKEA's Kitchen",
                "description": "You're now in the IKEA's restaurant. Today's menu is stuffed turkey!",
                "encounter": "ikeaKitchen",
                "unlockMoves": [ TurkeyBomb ]
            },
            { // 5
                "name": "Pig Enclosure",
                "description": "The kitchen is linked to a special Pig Breeding area. They seem to be violent and ready to punch your PP!",
                "encounter": "ikeaPigs",
                "unlockMoves": [ Pig ]
            },
            { // 6
                "name": "Elite Guard",
                "description": "A bunch of video game developers are hidden in the IKEA, and they hired elite guard to be sure to be alone.",
                "encounter": "ikeaElite"
            },
            { // 7
                "name": "Free Lives",
                "description": "You're in front of their HQ. Let's raid them to show them who's the boss here!",
                "encounter": "freeLives",
                "unlockQuests": [ 4 ],
                "postFightDialogue": 11
            }
        ]
    },
    { // 4
        "name": "Senjougahara",
        "description": "Senjougahara has been spotted in the IKEA's basement! This is a rescue mission! She must be retrieved!",
        "isMain": true,
        "areaId": 1,

        "questSteps": [
            { // 0
                "name": "Basement Gates",
                "description": "The gate of the basement is guarded by 2 turrets and a guard.",
                "encounter": "ikeaGate"
            },
            { // 1
                "name": "Holy Divers",
                "description": "You see a bunch of people hitting themselves on the head, while singing about an 'Iron Head' technique.",
                "encounter": "ikeaDivers",
                "unlockMoves": [ BrocketeerDive ],
                "postFightDialogue": 9
            },
            { // 2
                "name": "Illegal Kicks",
                "description": "You see a bunch of people hitting themselves in the legs, while singing about a 'Mighty Steel Leg' technique.",
                "encounter": "ikeaKickers",
                "unlockMoves": [ Kick ]
            },
            { // 3
                "name": "Training Session",
                "description": "A guard seems to be taking lessons from both a kicker and a diver. You're the one who's gonna teach a lesson.",
                "encounter": "ikeaGuardAndCo"
            },
            { // 4
                "name": "Vitamin Storage",
                "description": "You found where all the red pills are stored. Unfortunately, this place is guarded.",
                "encounter": "steroidGuards"
            },
            { // 5
                "name": "Boomerangs",
                "description": "Looks like it is the australian section of the storage area. And it looks like you aren't alone here.",
                "encounter": "ikeaBoomerang",
                "unlockMoves": [ Boomerang ]
            },
            { // 6
                "name": "Maintainer Cult",
                "description": "You didn't put your shoes in the closet as Pudding told you to. Now the maintainers want you dead for making the place dirty.",
                "encounter": "ikeaMaintainers"
            },
            { // 7
                "name": "You are Food",
                "description": "As you explore the maze that is IKEA, it is no surprise you encounter lost clients, now hermits seeking food at all cost.",
                "encounter": "ikeaHermits"
            },
            { // 8
                "name": "The Mighty One",
                "description": "He was busy taking care of the annoying people stuck in the IKEA. And now he has to take you out? Poor guy.",
                "encounter": "ikeaManager"
            },
            { // 9
                "name": "The Ritual",
                "description": "You see Senjougahara tied up in the background. As you enter the room, furnitures start floating and assembling into one big monstruosity. Being so close to your goal fills you with determination.",
                "encounter": "ikeaMonstruosity",
                "duelParam": { "waifuDetermination": true },
                "unlockAreas": [ 2 ],
                "unlockQuests" : [ 6 ],
                "unlockQuestSteps": [[12, 1]],
                "postFightCutscene": 3,
                "saveWaifu": "Senjougahara"
            }
        ]
    },
    { // 5
        "name": "IKEA Machines",
        "description": "This whole area of the IKEA is full of defense systems. It'll be difficult to go through.",
        "isMain": false,
        "areaId": 1,

        "questSteps": [
            { // 0
                "name": "Turrets",
                "description": "As you enter a room, you hear a robotic voice. 'Target Acquired'. A turret is targeting you with a lazer, and is ready to shoot.",
                "encounter": "ikeaTurret"
            },
            { // 1
                "name": "Wall of Blades",
                "description": "As if your previous encounter against 2 Sawblades wasn't enough, you now face 3 of them!",
                "encounter": "wallOfBlades"
            },
            { // 2
                "name": "Blade and Bullets",
                "description": "This seems to be the last room. And it is protected by both turrets and sawblades machines.",
                "encounter": "ikeaTurrets",
                "unlockMoves": [ Steel ]
            }
        ]
    },
    { // 6
        "name": "School of Cock",
        "description": "Students here seems okay with sharing their knowledge with you, as long as you manage to beat them.",
        "isMain": true,
        "areaId": 2,

        "questSteps": [
            { // 0
                "name": "Worthy?",
                "description": "They won't let you learn from them if you don't prove your worth.",
                "encounter": "2tier4students",
                "postFightDialogue": 12
            },
            { // 1
                "name": "Surroundings",
                "description": "Now starts the real training. They finally accepted to share what they know, as long as you can defend yourself.",
                "encounter": "3tier4students",
                "inFightDialogue": 13,
                "duelParam": { "forceBasicEvents": true },
                "postFightDialogue": 14,
                "unlockGameMechanics": [ "Events" ],
                "unlockQuests": [ 9 ],
                "unlockQuestSteps": [ [10, 1] ]
            },
            { // 2
                "name": "PP Equality",
                "description": "You have 5 turns to beat 2 students. Use the event at your advantage to win this battle in this short amount of time!",
                "encounter": "2tier4students",
                "duelParam": { "forceEvent": 0, "forceEventLoop": 1, "turnCountdown": 6 },
                "unlockEvents": [ 0 ]
            },
            { // 3
                "name": "PP Purge",
                "description": "Tier 4 students aren't enough for you anymore. You're now training against tier 3 students, while learning about PP Purge!",
                "encounter": "3tier3students",
                "duelParam": { "forceEvent": 1, "forceEventLoop": 1 },
                "unlockEvents": [ 1 ]
            },
            { // 4
                "name": "Sexual Confusion",
                "description": "Now that you've learned to master helpful events, you've now to learn how to master unhelpful events, such as the sexual confusion!",
                "encounter": "2tier3students",
                "duelParam": { "forceEvent": 2, "forceEventLoop": 3 },
                "unlockEvents": [ 2 ],
                "unlockMoves": [ InterrogationPoint ]
            },
            { // 5
                "name": "Tier 2 Students",
                "description": "The way you manage to beat everyone made higher graded students pissed. This is no training, they just want to beat the shit out of you.",
                "encounter": "3tier2students"
            },
            { // 6
                "name": "Student Boss",
                "description": "Your arrival meant too many damage for the school. The student council president wants you to leave, and is ready to attack you.",
                "encounter": "councilPresident",
                "postFightDialogue": 16,
                "unlockQuests": [ 7 ]
            }
        ]
    },
    { // 7
        "name": "PP Harem",
        "description": "Save PP Arbitrator's harem by punching the PP of everyone who's a part of it! You have no idea if this will help though, but it might be fun.",
        "isMain": true,
        "areaId": 2,

        "questSteps": [
            { // 0
                "name": "Childhood Friend",
                "description": "PP Arbitrator's childhood friend has become a dandere. She looks too shy to do anything, but you have to punch her PP.",
                "encounter": "dandere"
            },
            { // 1
                "name": "Retarded Twin",
                "description": "The childhood friend had a retarded twin. Unfortunately for you, she's a yandere, and she doesn't like the fact that PP Arbitrator shares his time with you.",
                "encounter": "yandere",
                "unlockQuests": [ 13 ]
            },
            { // 2
                "name": "Rich Girl",
                "description": "PP Arbitrator was friend with a rich girl, who became a darudere. She may be too lazy to attack as long as she's unharmed, but she still has a gun.",
                "encounter": "darudere"
            },
            { // 3
                "name": "Tragic Backstory",
                "description": "Now's the turn to the tsundere with a tragic backstory. Now that you're here, the rest of her life will be a tragic story as well.",
                "encounter": "tsundere"
            },
            { // 4
                "name": "Foreign Exchange",
                "description": "PP Arbitrator's favorite girl, the foreign exchange student, became a kuudere. She is the last one of the harem that you need to take care of.",
                "encounter": "kuudere"
            },
            { // 5
                "name": "Otaku Club Pres",
                "description": "Nota doesn't seem to be really happy about what you've done. You just wanted to help and punch PP.",
                "encounter": "deredere",
                "preFightDialogue": 17,
                "unlockQuests": [ 8 ]
            }
        ]
    },
    { // 8
        "name": "Ryuko",
        "description": "Ryuko has been spotted in the High School! This is a rescue mission! She must be retrieved!",
        "isMain": true,
        "areaId": 2,

        "questSteps": [
            { // 0
                "name": "Top Tier",
                "description": "You've killed too many students, you're now public enemy number 1 here. Even top tier students want you dead.",
                "encounter": "2tier1students"
            },
            { // 1
                "name": "Maintainer Cult",
                "description": "Maintainers now see you as a threat for their job. You'll have to defeat them before getting access to the main building.",
                "encounter": "schoolMaintainers",
                "postFightDialogue": 19
            },
            { // 2
                "name": "Anime Students",
                "description": "High schoolers from animes always are super strong for some reasons. And you have to fight a bunch of them to get to your waifu.",
                "encounter": "2AnimeHighSchoolers"
            },
            { // 3
                "name": "Deres Group A",
                "description": "The deres you killed weren't the only ones! And now they work together to defeat you.",
                "encounter": "dereGroup1"
            },
            { // 3
                "name": "Deres Group B",
                "description": "The remaining of the deres are ambushing you. No dere shall leave this place alive!",
                "encounter": "dereGroup2",
                "unlockQuests": [ 11 ]
            },
            { // 5
                "name": "More Anime Students",
                "description": "The last students are there, guarding the door of the student council room. Ryuko is behind this door.",
                "encounter": "3AnimeHighSchoolers"
            },
            { // 6
                "name": "Student Council",
                "description": "Ryuko is indeed in this room, but the remaing of the student council won't let you take her.",
                "encounter": "studentCouncil",
                "duelParam": { "waifuDetermination": true },
                "unlockQuestSteps": [ [12, 2] ],
                "unlockQuests": [ 16 ],
                "unlockAreas": [ 3 ],
                "saveWaifu": "Ryuko",
                "postFightCutscene": 5
            },
        ]
    },
    { // 9
        "name": "Gym Club",
        "description": "The gym club is now open!",
        "isMain": false,
        "areaId": 2,

        "questSteps": [
            { // 0
                "name": "Steel isn't Strong",
                "description": "You stumble upon a bunch of guys flexing together. Interrupting a flex session is considered a crime, you gotta do something about the witnesses.",
                "encounter": "gymClubStudents"
            },
            { // 1
                "name": "Flesh is Stronger",
                "description": "The last members of the gym club have seen your fight, and they got ready even before the fight. Defeat the last of the witnesses!",
                "encounter": "gymClubStudentsReady",
                "unlockMoves": [ BronanSlam ]
            }
        ]
    },
    { // 10
        "name": "Board Game Club",
        "description": "The board game club is now open!",
        "isMain": false,
        "areaId": 2,

        "questSteps": [
            { // 0
                "name": "Welcome Aboard",
                "description": "A new club has opened, for the top tier students only! Entering the room probably means having to fight whoever is inside.",
                "encounter": "boardGameClubStudents",
                "duelParam": { "forceEvent": 3, "forceEventLoop": 1 },
                "unlockNextStep": false
            },
            { // 1
                "name": "Bored Members",
                "description": "Other members now know your tricks, you won't be able to pull that off as often as you'd want against them.",
                "encounter": "boardGameClubStudents",
                "duelParam": { "forceEvent": 3, "forceEventLoop": 2 },
                "unlockEvents": [ 3 ]
            }
        ]
    },
    { // 11
        "name": "Versatility",
        "description": "A dere escaped high school and took refuge in the anime convention. She must be terminated!",
        "isMain": false,
        "areaId": 0,

        "questSteps": [
            { // 0
                "name": "Ultimate Dere",
                "description": "The most dere of the deres is here, talking with 2 weebs. Beating them should increase your versatility.",
                "encounter": "deredereAndWeebs",
                "unlockFightingStyles": [ "Versatile PP" ],
                "unlockMoves": [ AdaptPP ]
            }
        ]
    },
    { // 12
        "name": "Arcade Mode",
        "description": "Allows you to play multiple battles without being interrupted!",
        "isMain": false,
        "areaId": 0,

        "questSteps": [
            { // 0
                "name": AreaManager.getArea(0).name,
                "description": AreaManager.getArea(0).description,
                "unlockNextStep": false,
                "duelParam": {
                    "arcadeMode": true,
                    "arcadeQuestStarter": 1
                }
            },
            { // 1
                "name": AreaManager.getArea(1).name,
                "description": AreaManager.getArea(1).description,
                "unlockNextStep": false,
                "duelParam": {
                    "arcadeMode": true,
                    "arcadeQuestStarter": 3
                }
            },
            { // 2
                "name": AreaManager.getArea(2).name,
                "description": AreaManager.getArea(2).description,
                "unlockNextStep": false,
                "duelParam": {
                    "arcadeMode": true,
                    "arcadeQuestStarter": 6
                }
            }
        ]
    },
    { // 13
        "name": "TODO",
        "description": "A new game finally released after 23 years of development. It's so successful people are acting like the main character of this game.",
        "isMain": false,
        "areaId": 3,
        "ignoreMe": true,

        "questSteps": [
            { // 0
                "name": "Consume",
                "description": "Now there are 2 schoolgirls acting like yanderes. They want your PP, don't let them win.",
                "encounter": "2yanderes"
            },
            { // 1
                "name": "The",
                "description": "You're hearing rumors about a legendary item that can ???.",
                "encounter": ""
            },
            { // 2
                "name": "Cum",
                "description": "a kawaii tree that’s definitely not yuki that says ‘I am twee :3’ w/ yandere vibes TODO.",
                "encounter": "3yanderes"
            },
            { // 3
                "name": "Chalice",
                "description": ".",
                "encounter": "yandereDev"
            }
        ]
    },
    { // 14
        "name": "Bling Bling Weebs",
        "description": "A bunch of rich people joined the convention. You don't know if they are here for the weeb shit, or to make fun of weebs, but you do know you can punch their PP.",
        "isMain": false,
        "areaId": 0,

        "questSteps": [
            { // 0
                "name": "Crystal Style",
                "description": "So the rumors about enchented crystals that make your PP faster, but more fragile were true after all...",
                "encounter": "crystalWeebs"
            },
            { // 1
                "name": "Shine on you...",
                "description": "Not only does diamond grants a lot of charisma, those weebs also gain additional protection from it.",
                "encounter": "diamondWeebs"
            },
            { // 2
                "name": "Another Weeb King",
                "description": "This anime convention has more than one weeb king. This usually only occurs once every 112 years. This is your chance!",
                "encounter": "blingBlingWeebs",
                "unlockFightingStyles": [ "Crystal PP", "Diamond PP" ],
                "unlockMoves": [ EncrustPP ]
            }
        ]
    },
    { // 15
        "name": "Lumberjack Job",
        "description": "Just in case you wanted to max out the lumberjack job instead of punching pp, well you can do that here.",
        "isMain": false,
        "areaId": 1,

        "questSteps": [
            { // 0
                "name": "The Wood Gatherer",
                "description": "The best lumberjack of the whole world is visiting the IKEA. This is the perfect moment to learn his latest wood cutting techniques.",
                "encounter": "edimo",
                "preFightDialogue": 23,
                "unlockMoves": [ WoodCutting ]
            }
        ]
    },
    { // 16
        "name": "idk",
        "description": ".",
        "isMain": false,
        "areaId": 3,

        "questSteps": [
            { // 0
                "name": "priest test",
                "description": "idk lol.",
                "encounter": "2randomPriests"
            }
        ]
    }
]);
