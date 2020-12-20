QuestManager.loadList([
    { // 0 - SPECIAL UNLOCKS
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
                "unlockGameMechanics": [ "Game Mechanics", "Moves" ],
                "unlockArtworks": [ "Brenn", "Espinoza", "Weeb" ]
            },
            { // 1
                "name": "CHEATING",
                "description": "FIRST TIME CHEATING CHECK",
                "unlockQuests": [ 10, 15 ],
                "unlockQuestSteps": [ [24, 1] ],
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
            },
            { // 4
                "name": "MULTIPLAYER TUTORIAL",
                "description": "FIRST TIME SEEEING THE MULTIPLAYER SCENE"
            },
            { // 5
                "name": "UNLOCKED NG+ QUEST",
                "description": "ALL OTHER QUESTS HAVE BEEN COMPLETED",
                "unlockQuests": [ 28 ]
            }
        ]
    },
    { // 1 - Tutorial
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
    { // 2 - Truffle Chaos
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
    { // 3 - PP Training
        "name": "PP Training",
        "description": "Pudding's home has been invaded! This sounds like neat training to learn new pp punch moves.",
        "isMain": true,
        "areaId": 1,

        "questSteps": [
            { // 0
                "name": "IKEA Guards",
                "description": "Some kind of swedish military organisation seized the place. Now you can't enter without beating guards.",
                "encounter": "ikeaGuards",
                "postFightDialogue": 8,
                "unlockQuests": [ 26 ]
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
    { // 4 - The Beginning
        "name": "The Beginning",
        "description": "Senjougahara has been spotted in the IKEA's basement! This is the first waifu you found, you have to succeed!",
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
                "encounter": "ikeaGuardAndCo",
                "unlockQuests": [ 24 ]
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
                "encounter": "ikeaManager",
                "unlockQuests": [ 25 ]
            },
            { // 9
                "name": "The Ritual",
                "description": "You see Senjougahara tied up in the background. As you enter the room, furnitures start floating and assembling into one big monstrosity. Being so close to your goal fills you with determination.",
                "encounter": "ikeaMonstruosity",
                "duelParam": { "waifuDetermination": true },
                "unlockAreas": [ 2 ],
                "unlockQuests" : [ 6, 27 ],
                "unlockQuestSteps": [[12, 1]],
                "postFightCutscene": 3,
                "saveWaifu": "Senjougahara"
            }
        ]
    },
    { // 5 - DIKEA Machines
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
    { // 6 - School of Cock
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
    { // 7 - PP Harem
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
    { // 8 - Rescue Mission
        "name": "Rescue Mission",
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
                "unlockEvents": [ 6 ],
                "saveWaifu": "Ryuko",
                "postFightCutscene": 6
            },
        ]
    },
    { // 9 - Gym Club
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
    { // 10 - Board Game Club
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
    { // 11 - Versatility
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
    { // 12 - Arcade Mode
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
            },
            { // 3
                "name": AreaManager.getArea(3).name,
                "description": AreaManager.getArea(3).description,
                "unlockNextStep": false,
                "duelParam": {
                    "arcadeMode": true,
                    "arcadeQuestStarter": 16
                }
            }
        ]
    },
    { // 13 - TODO Yandere Dev Questline
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
    { // 14 - Bling Bling Weebs
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
    { // 15 - Lumberjack Job
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
    { // 16 - Temple Gates
        "name": "Temple Gates",
        "description": "This is the entry of the Allfaiths Temple. Your goal is to reach the center of the building, where Eldon usually is.",
        "isMain": true,
        "areaId": 3,

        "questSteps": [
            { // 0
                "name": "Hehe",
                "description": "The temple has lots of magic protections placed by the different priests. You can't even approach it, without triggering a bunch of spirits, summoned here by divine powers.",
                "encounter": "spiritGuardians"
            },
            { // 1
                "name": "The Blind Guardian",
                "description": "As you open the entry door, a spirit materializes before you. A large spectral guardian appears, with a gleaming sword in one hand, and a giant shield in the other.",
                "encounter": "guardiansOfFaith"
            },
            { // 2
                "name": "In the Name Of",
                "description": "You enter the temple, and are then attacked by 2 clerics that were passing by. You don't even need excuses to punch their PPs, they all start to fight before you trigger them.",
                "encounter": "2tutorialClerics"
            },
            { // 3
                "name": "Worldwide Cleaners",
                "description": "What would be the world without maintainers? Probably would end up a dirty place. It's a good thing maintainers are there to keep thing clean.",
                "encounter": "clericMaintainers"
            },
            { // 4
                "name": "The Summoner",
                "description": "You finally found the cleric that summoned the guardians at the entrance. Punching the guy's PP should prevent any more guardian to appear.",
                "encounter": "clericAndSpirits"
            },
            { // 5
                "name": "Forcefield",
                "description": "An energy barrier is preventing you to go further. Destroy it, and you'll be able to enter the center of the temple!",
                "encounter": "energyBarrier",
                "unlockQuests": [ 17 ],
                "postFightDialogue": 25,
                "unlockPartyMembers": [ "Eldon" ]
            }
        ]
    },
    { // 17 - Trials of Faith
        "name": "Trials of Faith",
        "description": "The next waifu, Priestess, is in this temple. She is at the end of this corridor, though you feel a holy presence watching you.",
        "isMain": true,
        "areaId": 3,

        "questSteps": [
            { // 0
                "name": "Faith",
                "description": "Everything around you turns white. As you try to continue to walk, you hurt yourself against an invisible wall. Behold, the faith you hold onto the Gods of this world.",
                "encounter": "faith",
                "unlockQuests": [ 18, 19, 20, 21, 22, 30 ],
                "inFightDialogue": 26,
                "unlockGameMechanics": [ "Gods" ],
                "unlockMoves": [ RegularPriestMove, SpecialPriestMove ],
                "unlockEvents": [ 4, 5 ],
                "unlockNextStep": false
            },
            { // 1
                "name": "Trial of Brenn",
                "description": "Now that you have proven your faith toward the Holy Brenn Trinity, you may now pass the trial of Brenn.",
                "encounter": "trialBrenn",
                "unlockNextStep": false
            },
            { // 2
                "name": "Trial of Pudding",
                "description": "Now that you have proven your faith toward the Unholy Pudding Trinity, you may now pass the trial of Pudding.",
                "encounter": "trialPudding",
                "unlockNextStep": false
            },
            { // 3
                "name": "Trial of Eldon",
                "description": "Now that you have proven your faith toward the Eldon Duality, you may now pass the trial of Eldon",
                "encounter": "trialEldon",
                "unlockQuests": [ 23 ],
                "unlockNextStep": false
            },
            { // 4
                "name": "Trial of Energy",
                "description": "An energy barrier is preventing you to reach Priestess! This one seems to be different, it seems to have some kind of... intellect?",
                "encounter": "energyBarrier2"
            },
            { // 5
                "name": "Trial of Faith",
                "description": "Did you think it would be that easy? Here comes the last trial. Prove your faith, and you shall be rewareded.",
                "encounter": "faithForReal",
                "duelParam": { "waifuDetermination": true },
                "unlockQuests": [ 29 ],
                "unlockQuestSteps": [ [12, 3] ],
                "saveWaifu": "Priestess",
                "postFightCutscene": 5
            }
        ]
    },
    { // 18 - Alters of B
        "name": "Altars of B",
        "description": "This area of the temple is dedicated to the Holy Brenn Trinity.",
        "isMain": true,
        "areaId": 3,

        "questSteps": [
            { // 0
                "name": "Brenn",
                "description": "To truly understand Brenn, you must fight clerics that worship Brenn.",
                "encounter": "brennClerics",
                "unlockGods" : [ "Brenn" ]
            },
            { // 1
                "name": "Country Music Brenn",
                "description": "To truly understand Country Music Brenn, you must fight clerics that worship Country Music Brenn.",
                "encounter": "countryBrennClerics",
                "unlockArtworks": [ "Country Music Brenn" ],
                "unlockGods" : [ "Country Music Brenn" ]
            },
            { // 2
                "name": "Chad Brenn",
                "description": "To truly understand Chad Brenn, you must fight clerics that worship Chad Brenn.",
                "encounter": "chadBrennClerics",
                "unlockGods" : [ "Chad Brenn" ]
            },
            { // 3
                "name": "Holy Trinity",
                "description": "Here comes the High Priest of the Holy Brenn Trinity. Defeat him, and you'll be ready for the Trial of Brenn.",
                "encounter": "highClericBrenn",
                "unlockQuestSteps": [ [ 17, 1 ] ]
            }
        ]
    },
    { // 19 - Altars of P
        "name": "Altars of P",
        "description": "This area of the temple is dedicated to the Unholy Pudding Trinity.",
        "isMain": true,
        "areaId": 3,

        "questSteps": [
            { // 0
                "name": "Hello There Puds",
                "description": "To truly understand Hello There Puds, you must fight clerics that worship Hello There Puds.",
                "encounter": "helloThereClerics",
                "unlockGods" : [ "Hello There Puds" ]
            },
            { // 1
                "name": "DickDickSon666",
                "description": "To truly understand DickDickSon666, you must fight clerics that worship DickDickSon666.",
                "encounter": "dickDickSonClerics",
                "unlockGods" : [ "DickDickSon666" ]
            },
            { // 2
                "name": "UREGonnaGetRAPED",
                "description": "To truly understand UREGonnaGetRAPED, you must fight clerics that worship UREGonnaGetRAPED.",
                "encounter": "rapistClerics",
                "unlockGods" : [ "UREGonnaGetRAPED" ]
            },
            { // 3
                "name": "Unholy Trinity",
                "description": "Here comes the High Priest of the Unholy Pudding Trinity. Defeat him, and you'll be ready for the Trial of Pudding.",
                "encounter": "highClericPuds",
                "unlockQuestSteps": [ [ 17, 2 ] ]
            }
        ]
    },
    { // 20 - Altars of E
        "name": "Altars of E",
        "description": "This area of the temple is dedicated to the Eldon Duality.",
        "isMain": true,
        "areaId": 3,

        "questSteps": [
            { // 0
                "name": "Salt King",
                "description": "To truly understand Salt King, you must fight clerics that worship Salt King.",
                "encounter": "saltKingClerics",
                "unlockGods" : [ "Salt King" ]
            },
            { // 1
                "name": "Ranger",
                "description": "To truly understand Ranger, you must fight clerics that worship Ranger.",
                "encounter": "rangerClerics",
                "unlockGods" : [ "Ranger" ]
            },
            { // 2
                "name": "Eldon Duality",
                "description": "Here comes the High Priest of the Eldon Duality. Defeat him, and you'll be ready for the Trial of Eldon.",
                "encounter": "highClericEldon",
                "unlockQuestSteps": [ [ 17, 3 ] ]
            }
        ]
    },
    { // 21 - Another Way
        "name": "Another Way",
        "description": "What if there was a way to worship waifus as gods? The answer probably lies somewhere in this temple.",
        "isMain": false,
        "areaId": 3,

        "questSteps": [
            { // 0
                "name": "Pray the Waifus",
                "description": "You've started praying to your waifus, but the people here aren't happy with that. Kill their PP to reduce world unhappiness.",
                "encounter": "3clerics"
            },
            { // 1
                "name": "Weeb Clerics",
                "description": "Let's see if you can bring an ultimate weeb in here to see what happens. Nothing would go wrong.",
                "encounter": "clericsAndWeeb",
                "postFightDialogue": 27
            }
        ]
    },
    { // 22 - True Clerics
        "name": "True Clerics",
        "description": "Being able to pray one god is useful, but not enough. You must learn to have multiple gods by your side.",
        "isMain": true,
        "areaId": 3,

        "questSteps": [
            { // 0
                "name": "2",
                "description": "2 clerics are guarding the area, this shouldn't be much an issue.",
                "encounter": "2clerics"
            },
            { // 1
                "name": "2x2",
                "description": "2 waves of clerics to see if you can handle 2 times the powers of gods.",
                "encounter": "2clerics",
                "duelParam": { "nextEncounters": [ "2clerics" ] },
                "postFightDialogue": 30
            },
            { // 2
                "name": "3",
                "description": "3 clerics are guarding the area, you can do it! Don't forget to use your newfound powers!",
                "encounter": "3clerics"
            },
            { // 3
                "name": "3x3",
                "description": "Okay, I think you got the point, you're going to fight 9 clerics in total.",
                "encounter": "3clerics",
                "duelParam": { "nextEncounters": [ "3clerics", "3clerics" ] },
                "postFightDialogue": 31,
                "unlockQuestSteps": [ [ 23, 1 ] ]
            }
        ]
    },
    { // 23 - Synergies
        "name": "Synergies",
        "description": "Learn to combine Gods effectively.",
        "isMain": true,
        "areaId": 3,

        "questSteps": [
            { // 0
                "name": "Spirits... Again",
                "description": "As you enter yet another area of this huge temple, you stumble upon sprits. Defeat all 3 of them to gain access to the real challenge.",
                "encounter": "synergySpirits",
                "unlockNextStep": false
            },
            { // 1
                "name": "High Cleric Waves",
                "description": "Defeat all 3 High Clerics, respectively of the Eldon Duality, the Holy Brenn Trinity and the Unholy Pudding Trinity, one after another.",
                "encounter": "highClericEldon",
                "duelParam": { "nextEncounters": [ "highClericBrenn", "highClericPuds" ] },
                "unlockNextStep": false,
                "unlockGameMechanics": [ "Synergies" ],
                "unlockQuestSteps": [ [17, 4] ]
            }
        ]
    },
    { // 24 - Cheater Gate
        "name": "Cheater Gate",
        "description": "The original swedish pilgrims that made the IKEA are angry about how you treat their brothers! Give them a good punch in the PP.",
        "isMain": false,
        "areaId": 1,

        "questSteps": [
            { // 0
                "name": "Illegal Pilgrims",
                "description": "Deceive your narrator. Deceive the world. That is what you must do to reach the next step. Good Luck.",
                "encounter": "swedishPilgrims",
                "unlockNextStep": false
            },
            { // 1
                "name": "Cheater Shame",
                "description": "So now that you know you can cheat, and you know how, let's see if you can beat this stage.",
                "encounter": "targetDummy",
                "duelParam": {
                    "forceRootOfNuisance": true
                },
                "unlockFightingStyles": [ "Small PP" ]
            }
        ]
    },
    { // 25 - Eye of Truth
        "name": "Eye of Truth",
        "description": "The Eye of Truth needs your help! As an all-seeing eye, he saw unspeakable things he wishes to forget! Fetch the Ultimate Bleach to free him from this curse.",
        "isMain": false,
        "areaId": 0,

        "questSteps": [
            { // 0
                "name": "See",
                "description": "The Ultimate Bleach was last seen in this Anime Convention. Weebs should be stronger when closer to the relic we're seeking.",
                "encounter": "superWeebs"
            },
            { // 1
                "name": "Behold",
                "description": "Weebs are acting weird, probably because they couldn't handle the power of the Ultimate Bleach. Punch them  until this behaviour stops.",
                "encounter": "megaWeebs"
            },
            { // 2
                "name": "Contemplate",
                "description": "Those Giga Weebs are going to drink the Ultimate Bleach, thinking this is old milk. Stop them before they commit the sin of drinking this holy bleach!",
                "encounter": "gigaWeebs",
                "postFightDialogue": 33,
                "unlockArtworks": [ "Eye of Truth" ],
                "unlockMoves": [ EyeOfTruth ]
            }
            // TODO last step unlocked after relics to keep the bleach (fight against eye of truth?)
        ]
    },
    { // 26 - Explosive Traps
        "name": "Explosive Traps",
        "description": "Watch out! This area of the IKEA has landmines hidden all over the place. We just have to steal one, it might be useful.",
        "isMain": false,
        "areaId": 1,

        "questSteps": [
            { // 0
                "name": "It Must Be a Sign",
                "description": "The workers that made the landmines don't want you here. You could blow up their whole work! You don't want them here either.",
                "encounter": "landmineGuards"
            },
            { // 1
                "name": "Sign of the Winner",
                "description": "You know what? Getting a landmine is too much effort. We should get back and get the warning sign, it'll work the same way.",
                "encounter": "landmineGuards2",
                "unlockMoves": [ TrapSign ]
            }
        ]
    },
    { // 27 - Otherworlds
        "name": "Otherworlds",
        "description": "A portal appeared in the Anime Convention. It seems to lead to different alternate realities.",
        "isMain": true,
        "areaId": 0,

        "questSteps": [
            { // 0
                "name": "Vexovoid",
                "description": "As you approach the portal. You see a bunch of people coming out of it. Wait, those people are you from another dimension!",
                "encounter": "oppositeTeam",
                "unlockGameMechanics": [ "Multiplayer" ]
            },
            { // 1
                "name": "Multiplayer",
                "description": "Enter the Portal, and punch PPs from other dimensions!",
                "goToMultiplayerScene": true
            }
        ]
    },
    { // 28 - TODO Wyndoella Bridge
        "name": "Wyndoella Bridge",
        "description": "A new area appeared in the temple. All of it looks like empty space, except for one bridge made of light.",
        "isMain": true,
        "areaId": 3,
        "ignoreMe": true,

        "questSteps": [
            { // 0
                "name": "The Overgod",
                "description": "TODO",
                "encounter": "wyndoella",
                "unlockGameMechanics": [ "New Game Plus" ]
            }
        ]
    },
    { // 29 - Hell Gate
        "name": "Hell Gate",
        "description": "A Hell Gate opened in the temple! \"Dealt with a Hell Gate and punched demonic PP.\" would sound great in your resume, wouldn't it?",
        "isMain": false,
        "areaId": 3,

        "questSteps": [
            { // 0
                "name": "D Minor",
                "description": "Minor demons are known for not being authorized to order alcohol in a bar, and vote. This bit of knowledge sadly won't help you in your battle.",
                "encounter": "minorDemon"
            },
            { // 1
                "name": "Demon Souls",
                "description": "All that's left of the Hell Gate are 3 demonic souls. If only you could reproduce their evil laugh, that would be EPIC.",
                "encounter": "3demonicSouls",
                "unlockMoves": [ LaughingSoul ]
            }
        ]
    },
    { // 30 - No Bullying
        "name": "No Bullying",
        "description": "A kid is getting bullied in the school. You have no idea what a young kid is doing here, but you gotta help him.",
        "isMain": false,
        "areaId": 2,

        "questSteps": [
            { // 0
                "name": "Isaac",
                "description": "The poor kid is lying on the ground, crying, as 3 students kick him repeatedly. Make the bullies pay with their blood!",
                "encounter": "3AnimeHighSchoolers",
                "postFightDialogue": 38,
                "unlockQuests": [ 31 ]
            }
        ]
    },
    { // 31 - A Home for Isaac
        "name": "A Home for Isaac",
        "description": "Convince the swedish in the IKEA to have Isaac stay in here in peace. Convincing by PP Punching of course.",
        "isMain": false,
        "areaId": 1,

        "questSteps": [
            { // 0
                "name": "Unhappy Residents",
                "description": "The people here doesn't look happy to see you. The havoc you caused here has been noticed. The Managers want to have a talk with you.",
                "encounter": "managerGang"
            },
            { // 1
                "name": "Double Trouble",
                "description": "Now that you've beaten up people, they start listening to you. You probably will be able to ask a room for Isaac.",
                "encounter": "dualMonstruosity",
                "preFightDialogue": 39,
                "postFightDialogue": 40,
                "unlockGods": [ "STFU Isaac" ]
            }
        ]
    }
]);
