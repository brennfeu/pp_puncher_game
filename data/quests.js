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
            //{ // 5
            //    "name": "UNLOCKED NG+ QUEST",
            //    "description": "ALL OTHER QUESTS HAVE BEEN COMPLETED",
            //    "unlockQuests": [ 28 ]
            //}
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
                "encounter": "yandere"
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
            },
            { // 4
                "name": AreaManager.getArea(4).name,
                "description": AreaManager.getArea(4).description,
                "unlockNextStep": false,
                "duelParam": {
                    "arcadeMode": true,
                    "arcadeQuestStarter": 32
                }
            }
        ]
    },
    { // 13 - Hatesick
        "name": "Hatesick",
        "description": "A new game finally released after 23 years of development. It's so successful people are acting like the main character of this game.",
        "isMain": false,
        "areaId": 2,

        "questSteps": [
            { // 0
                "name": "Consume",
                "description": "Now there are 2 schoolgirls acting like yanderes. They want your PP, don't let this 3D trash win.",
                "encounter": "2yanderes"
            },
            { // 1
                "name": "The",
                "description": "You hear rumors about a legendary item that helped in the making of the game. It made its user so powerful, it made everyone in love with his game.",
                "encounter": "3yanderes"
            },
            { // 2
                "name": "Cum",
                "description": "A big tree is catching your attention, it has many texts carved in it, such as 'kawaii' or 'yandere'. It makes you want to punch it.",
                "encounter": "notYuki",
                "preFightDialogue": 51
            },
            { // 3
                "name": "Chalice",
                "description": "The dev of the game himself is here to challenge you. He is super buff, probably thanks to drinking from the sacred chalice every day.",
                "encounter": "yandereDev",
                "unlockRelics": [ 0 ],
                "unlockMoves": [ DrinkFromChalice ]
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
                "description": "So the rumors about enchanted crystals that make your PP faster, but more fragile were true after all...",
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
                "name": "Defenders of...",
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
                "description": "What would the world be without maintainers? Probably would end up a dirty place. It's a good thing maintainers are there to keep things clean.",
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
                "unlockAreas": [ 4 ],
                "unlockQuests": [ 29, 32 ],
                "unlockQuestSteps": [ [12, 3] ],
                "saveWaifu": "Priestess",
                "postFightCutscene": 7
            }
        ]
    },
    { // 18 - Altars of B
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
                "encounter": "swedishPilgrims"
            },
            { // 1
                "name": "Cheater Shame",
                "description": "You can't pass this challenge without thinking outside the box. Do not be restricted by your movepool.",
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
                "unlockMoves": [ EyeOfTruth ],
                "unlockNextStep": false
            },
            { // 3
                "name": "Survey",
                "description": "Maybe you could convince the Eye of Truth to let you use the Ultimate Bleach?",
                "preFightDialogue": 50,
                "encounter": "bleachCoveredWeeb",
                "unlockRelics": [ 4 ]
            }
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
        "areaId": -1,
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
    },
    { // 32 - The Holy Prepuce
        "name": "The Holy Prepuce",
        "description": "This christian settlement is known for having the Holy Prepuce, the foreskin of Jesus Christ. This is a real thing, look it up!",
        "isMain": true,
        "areaId": 4,

        "questSteps": [
            { // 0
                "name": "Confession",
                "description": "You should confess all you did to a Priest. This should hopefully help your mental state, which doesn't seem very stable.",
                "encounter": "introPriest",
                "preFightDialogue": 45,
                "inFightDialogue": 46,
                "postFightDialogue": 47,
                "unlockGameMechanics": [ "Alternative Talks" ]
            },
            { // 1
                "name": "Holy Defenders",
                "description": "Of course this place wasn't left unguarded. Since holy wars aren't a thing anymore, you've got some NEET templars in need of violence to punch.",
                "encounter": "templars",
                "duelParam": { "nextEncounters": [ "templarsAndPriest" ] }
            },
            { // 2
                "name": "The Unexpected",
                "description": "Wait what? Are they really here? This is totally unexpected!",
                "encounter": "inquisitor",
                "duelParam": { "nextEncounters": [ "inquisitorArmyA", "inquisitorArmyB" ] },
                "unlockEvents": [ 7 ]
            },
            { // 3
                "name": "Rank++",
                "description": "You're going too far in the settlement, higher ranked priests are needed to stop you in your PP Punching madness! We both know they won't be enough though haha!",
                "encounter": "bishopArmyA",
                "duelParam": { "nextEncounters": [ "bishopArmyB", "bishopArmyC" ] }
            },
            { // 4
                "name": "He Who Cannot See",
                "description": "A holy warrior has been sent to stop you! They really dislike pp punching it seems, gotta make them pay for that!",
                "encounter": "blindGuardian"
            },
            { // 5
                "name": "He Who Cannot Die",
                "description": "Legends about a warrior who has been proven to be unbeatable in fair combat have been told for centuries. And now you witness the legend himself.",
                "encounter": "eternalChampion"
            },
            { // 6
                "name": "True Cross",
                "description": "Not many people know this, but the True Cross has been restored years ago. It has been hidden in this settlement for years, and probably has the power needed to make relics actually useful.",
                "encounter": "christianSpirits",
                "duelParam": { "nextEncounters": [ "trueCrossSprit" ] },
                "postFightDialogue": 49,
                "unlockGameMechanics": [ "Relics" ],
                "unlockRelics": [ 1, 2, 3 ],
                "unlockMoves": [ PPBibleMove ],
                "unlockQuests": [ 13, 33, 35 ],
                "unlockQuestSteps": [ [25, 3] ]
            }
        ]
    },
    { // 33 - Weeb Shop
        "name": "Weeb Shop",
        "description": "A weeb just opened his shop. He seems to be selling relics, this could be interesting!",
        "isMain": true,
        "areaId": 0,

        "questSteps": [
            { // 0
                "name": "Weeb Shop",
                "description": "This is a convention, so obviously there are shops, but this one seems different. Even if the owner is a weeb, it doesn't really sell anime-related merch.",
                "encounter": "weebAssistant",
                "preFightDialogue": 52,
                "unlockGameMechanics": [ "PP Coins" ]
            }
        ]
    },
    { // 34 - Weeb Shop Unlocks - HIDDEN
        "name": "WEEB SHOP UNLOCKS",
        "description": "YOU SHOULD NOT BE ABLE TO SEE THIS!",
        "isMain": false,
        "areaId": -1,

        "questSteps": [
            {
                "ppCoinsPrice": 100,
                "unlockMoves": [ AcidCover ]
            },
            {
                "ppCoinsPrice": 300,
                "unlockRelics": [ 5 ] // Kiwi
            },
            {
                "ppCoinsPrice": 500,
                "unlockMoves": [ Barrel ]
            },
            {
                "ppCoinsPrice": 1000,
                "unlockMoves": [ KidneyShoot, SuperKidneyShoot ]
            },
            {
                "ppCoinsPrice": 1500,
                "unlockMoves": [ Martini ],
                "unlockFightingStyles": [ "Drunken PP" ]
            },
            {
                "ppCoinsPrice": 2000,
                "unlockMoves": [ Swap ]
            },
            {
                "ppCoinsPrice": 3000,
                "unlockGods": [ "Villager" ]
            }
        ]
    },
    { // 35 - Sealed Evils
        "name": "Sealed Evils",
        "description": "This area's waifu has been kept hidden in the same place a gate to Hell was left open. Her presence might have had an influence on the demons in here, and 'japanized' them.",
        "isMain": true,
        "areaId": 4,

        "questSteps": [
            { // 0
                "name": "Fear",
                "description": "A pair of floating sunglasses suddenly appear before you, and a very loud scream seems to be coming from them. Let's be honest, the scream was more annoying than scary.",
                "encounter": "fearMePls",
                "inFightDialogue": 53,
                "unlockArtworks": [ "fear me pls" ]
            },
            { // 1
                "name": "問題?",
                "description": "Japanese tales talk about Onis, which are similar to our western trolls. Though when I first read that, I thought it was about the monsters, not the internet trolls.",
                "encounter": "onis",
                "duelParam": { "nextEncounters": [ "onisTroll", "onis" ] },
                "unlockQuests": [ 38 ]
            },
            { // 2
                "name": "Oddities I",
                "description": "Rather strange beings have appeared, holding the shape of animals, but there seems to be more to it. And they have the instinct to make people their victims, so punching them makes us the good guys.",
                "encounter": "odditiesSnail",
                "duelParam": { "nextEncounters": [ "odditiesCrab", "odditiesMonkey" ] }
            },
            { // 3
                "name": "Tomboy Melon",
                "description": "Let me tell you the tragic tale of the tomboy melon. It used to have a great life until the day she watched a cursed tape. She now takes the form of a Sadako, and haunts whoever she stumbles upon. Once you're too scared to move, she gets you.",
                "encounter": "sadako"
            },
            { // 4
                "name": "Oddities II",
                "description": "The last of the oddities are there, that means that now comes the time of the oddity pp punching. And here's a bit of advice, avoid contact with the darkness.",
                "encounter": "odditiesSnake",
                "duelParam": { "nextEncounters": [ "odditiesCat", "odditiesDarkness" ] }
            },
            { // 5
                "name": "Gods of Death",
                "description": "...or so they pretend to be. Shinigamis are just a bunch of edgy otakus that became part of the japanese culture, and then literaly changed into evil creatures. That doesn't mean they are weak, you should deal with them with extreme brute force.",
                "encounter": "shinigamiIntro",
                "duelParam": { "nextEncounters": [ "2shinigamis", "epicShinigami" ] },
                "unlockQuests": [ 36 ],
                "postFightCutscene": 8
            }
        ]
    },
    { // 36 - Conspiracy
        "name": "Conspiracy",
        "description": "Christians and weeb folklore have united against you! How can you kidnap anime girls with all those annoyances? Kill them all, there should not be even one person leaving this place alive.",
        "isMain": true,
        "areaId": 4,

        "questSteps": [
            { // 0
                "name": "Allies at Odds",
                "description": "How touching! Christians and demons managed to set their differences aside to fight their common threat: you. As if that was going to work.",
                "encounter": "onisNPriests",
                "duelParam": { "nextEncounters": [ "onisTroll", "onisNPriestsReversed" ] }
            },
            { // 1
                "name": "Dirty Work",
                "description": "Maintainers truly are everywhere, even in this christian settlement. If they like to wipe the floor that much, let's do it with their bodies.",
                "encounter": "chrsitianMaintainers",
                "duelParam": { "nextEncounters": [ "chrsitianMaintainers2" ] }
            },
            { // 2
                "name": "Tengu Cardinals I",
                "description": "The Tengu Cardinals is the name given to the cardinals in charge of japanese regions. They harbor the power of the Tengus, legendary creatures known as harbingers of war.",
                "encounter": "evilCardinal1",
                "duelParam": { "nextEncounters": [ "evilCardinal2", "evilCardinal3", "evilCardinal4", "evilCardinal5" ] }
            },
            { // 3
                "name": "Yokai Nuns",
                "description": "If you mess with the nuns, you suffer the wrath of the guns. If you mess with the yokais (in this case, dokkaebis), you get, uuuuuuuh, blue fire which inflicts damage over time but also dies out after some time.",
                "encounter": "nunsAndYokai",
                "duelParam": { "nextEncounters": [ "doubleNuns", "nunsBossAndYokai" ] }
            },
            { // 4
                "name": "Tengu Cardinals II",
                "description": "Another bunch of Tengu Cardinals has been sent after you. And it feels like it's not going to be the end of all Tengu Cardinals either. Is there no end to them?",
                "encounter": "evilCardinal6",
                "duelParam": { "nextEncounters": [ "evilCardinal7", "evilCardinal8", "evilCardinal9", "evilCardinal10" ] },
                "unlockQuests": [ 39 ]
            },
            { // 5
                "name": "Tengu Cardinals III",
                "description": "And they brought friends this time! This is the last of them until you reach the final area, where the fate of christianity and pp punching will change forever.",
                "encounter": "templars",
                "duelParam": { "nextEncounters": [ "evilCardinal11", "odditiesSnake", "evilCardinal12", "bishopArmyC", "introPriest" ] }
            },
            { // 6
                "name": "Final Sin",
                "description": "The origin of the holy/demonic alliance, the kings of christianity and hell, are here ready to fight you. Get ready to wreck their pp, and show them that nothing will ever stop you.",
                "encounter": "introPriest",
                "duelParam": { "nextEncounters": [ "bishopArmyA", "benedictNDemon", "powerOfGodAndAnime" ] },
                "saveWaifu": "Rias",
                "postFightCutscene": 9,
                "unlockQuests": [ 37, 40 ],
                "unlockQuestSteps": [ [ 12, 4] ],
                "unlockEvents": [ 8 ],
                "unlockAreas": [ 5 ]
            }
        ]
    },
    { // 37 - Fherla
        "name": "Fherla",
        "description": "Fherla needs your help to restore christian values in this now evil settlement! Destroy demons and other creatures alike!",
        "isMain": false,
        "areaId": 4,

        "questSteps": [
            { // 0
                "name": "Demon Activity",
                "description": "Some demons here are regular demons that aren't from japanese tales. And they deserve the same treatment as everyone: some good old pp punching.",
                "encounter": "goatDemon",
                "duelParam": { "nextEncounters": [ "minorDemon", "goatDemonNSmallerOnes" ] },
                "preFightDialogue": 56
            },
            { // 1
                "name": "Tengu King",
                "description": "The king of the corrupted Tengu Cardinals is known to have immense powers. The legends says he can use the powers of every other Tengu Cardinals.",
                "encounter": "evilCardinalKing",
                "unlockMoves": [ FherlaMove ]
            }
        ]
    },
    { // 38 - Melodia
        "name": "Melodia",
        "description": "Melodia needs your help to grow demonic values in this christian settlement! Destroy christians and other holy people!",
        "isMain": false,
        "areaId": 4,

        "questSteps": [
            { // 0
                "name": "Holy Activities",
                "description": "Some christians here are regular christians that didn't ally with demons. And they deserve the same treatment as everyone: some good old pp punching.",
                "encounter": "templars",
                "duelParam": { "nextEncounters": [ "inquisitorArmyB" ] },
                "preFightDialogue": 57
            },
            { // 1
                "name": "Inquisition'ed",
                "description": "Wouldn't it be funny if you did to the inquisition what they did to innocent people centuries ago? I think that would be hilarious, don't you think that way too?.",
                "encounter": "inquisitorArmyA",
                "duelParam": { "nextEncounters": [ "inquisitionGrandmaster", "2christians", "3christians", "timmy" ] },
                "unlockMoves": [ MelodiaMove ]
            }
        ]
    },
    { // 39 - Tea Kettle
        "name": "Tea Kettle",
        "description": "An electric alien is attacking the area! No one knows what it is seeking but it must be destroyed!",
        "isMain": false,
        "areaId": 4,

        "questSteps": [
            { // 0
                "name": "Virtual Alien",
                "description": "You stumble upon what the creature might have been seeking here. The alien should be here soon.",
                "encounter": "familyFriendly",
                "duelParam": { "nextEncounters": [ "pikamee" ] },
                "unlockFightingStyles": [ "Electric PP" ]
            }
        ]
    },
    { // 40 - Strange Journey
        "name": "Strange Journey",
        "description": "Your weird travels aren't going to stop soon. You've seen blood, battles, crusades, unbreakable wills, golden spirits, an ocean of pps, balls of steel and... no lions yet but who knows what will happen next.",
        "isMain": true,
        "areaId": 5,

        "questSteps": [
            { // 0
                "name": "Security",
                "description": "As you arrive on the island, guards starts coming your way to stop you. Since you've acquired a bad reputation, there's no way they'll let you go without fighting.",
                "encounter": "2opsteinGuards",
                "duelParam": { "nextEncounters": [ "3opsteinGuards" ] }
            },
            { // 1
                "name": "Mopsters",
                "description": "On an island where law is not respected, only the strongest survive. And of course the order of the evil maintainers has a branch in here, terrorizing the people.",
                "encounter": "2opsteinMaintainers",
                "duelParam": { "nextEncounters": [ "3opsteinMaintainers" ] }
            },
            { // 2
                "name": "Badger Master",
                "description": "As you progress on the island, you suddenly get attacked by badgers! Who would train badgers to attack, and why would they be here?",
                "encounter": "badgers",
                "duelParam": { "nextEncounters": [ "valurin" ] },
                "unlockQuests": [ 41, 42 ],
                "unlockPartyMembers": [ "Valurin" ],
                "unlockGods": [ "The Brain", "The Brawn" ],
                "postFightDialogue": 59
            },
            { // 3
                "name": "Majesty",
                "description": "Now that Valurin joined your party, it's time to continue to explore the island. You now stumble upon mysterious enemies...",
                "encounter": "standFight1",
                "duelParam": { "nextEncounters": [ "2opsteinGuards", "standFight2" ] },
                "postFightDialogue": 58
            },
            { // 4
                "name": "Destiny Warning",
                "description": "Those enemies are strong. It'll be really useful once you can master their powers, but you're starting to doubt your own capabilities. Can you really defeat Espinoza?",
                "encounter": "standFight3",
                "duelParam": { "nextEncounters": [ "3opsteinGuards", "standFight4" ] }
            },
            { // 5
                "name": "Symphony Z",
                "description": "Opstein guards were found near stands. Are those allies? Or are they trying to master the powers of stands as well? There's only one way to find out!",
                "encounter": "standUsers1",
                "duelParam": { "nextEncounters": [ "standUsers2", "standUserBoss" ] },
                "postFightDialogue": 60,
                "unlockGameMechanics": [ "Stands" ],
                "unlockMoves": BASIC_STAND_MOVE_LIST
            }
        ]
    },
    { // 41 - The Dungeon
        "name": "The Dungeon",
        "description": "TODO",
        "isMain": true,
        "areaId": 5,

        "questSteps": [
            { // 0
                "name": "The Thinker",
                "description": "A statue is guarding the entrance. You get a strange feeling when close by to the man made of bronze. Even if it can't move, it won't let you go easily.",
                "encounter": "theThinker",
                "unlockMoves": [ Perhaps ]
            },
            { // 1
                "name": "Bad Breath",
                "description": "This is a dungeon, of course it has monsters in it. Let's kill those weird alien tentacled creatures. I won't there won't be shit-ass puzzles though.",
                "encounter": "molbols",
                "duelParam": { "nextEncounters": [ "greatMolbol" ] }
            },
            { // 2
                "name": "idk lol",
                "description": "As you encounter a new enemy, you notice christmas-y karl marx on the side that seems to be searching for something. He's probably friendly, and a funny guy at that!",
                "encounter": "standFight5",
                "duelParam": { "nextEncounters": [ "standFight6" ] },
                "postFightDialogue": 62
            },
            { // 3
                "name": "Bill Doors",
                "description": "Hey this guy a celebrity! He made a fortune selling windows, and now he sells 5G implants to be hidden in vaccines! Let's punch some famous PP!",
                "encounter": "5gGuards",
                "duelParam": { "nextEncounters": [ "windowsGuards", "billDoors" ] }
            },
            { // 4
                "name": "Lever Puzzle",
                "description": "Dungeons are famous for their epic battles and their either super simple, either super hard puzzles. Let's hope this puzzle is a simple one.",
                "encounter": "leverPuzzle1",
                "duelParam": { "nextEncounters": [ "leverPuzzle2" ] },
                "unlockMoves": [ ActivateLeverMove ]
            },
            { // 5
                "name": "Hints",
                "description": "Bedrooms could be a huge help in telling if the hamburglar went here or not. If there's shit on the bed, the culprit was near at some point.",
                "encounter": "standFight7",
                "duelParam": { "nextEncounters": [ "standFight8" ] },
                "postFightDialogue": 63
            },
            { // 6
                "name": "Island Boss",
                "description": "The ruler of the island is near. He must be the true identity of the hamburglar! Let's defeat him!",
                "encounter": "2opsteinGuards",
                "duelParam": { "nextEncounters": [ "3opsteinGuards", "opsteinBoss" ] },
                "postFightDialogue": 64
            },
            { // 7
                "name": "Hunts",
                "description": "The hamburglar must still be near! At this point, we could just kill everyone in here so we're sure the hamburglar dies!",
                "encounter": "2opteinGuests",
                "duelParam": { "nextEncounters": [ "3opteinGuests" ] }
            },
            { // 8
                "name": "John Soup",
                "description": "Hey this guy a celebrity! He made a fortune by inventing the soup when he accidentally drank a chicken! Let's punch some famous PP!",
                "encounter": "chickenGuards",
                "duelParam": { "nextEncounters": [ "soupGuards", "johnSoup" ] }
            },
            { // 9
                "name": "Lolicon Heaven",
                "description": "You've seen your fait share of weird people, but this one takes the cake! Not only is she a lolicon, she also is a huge fan of 'the sensei of eromangas'...",
                "encounter": "loliconNota",
                "preFightDialogue": 65
            },
            { // 10
                "name": "The Hamburglar",
                "description": "Hey, is that the humburglar just here? Quick, let's catch him and make him pay! He's probably ready to fight, so let's not underestimate him.",
                "encounter": "theHamburglar",
                "inFightDialogue": 66,
                "duelParam": { "waifuDetermination": true },
                "postFightCutscene": 10,
                "saveWaifu": "Megumin"
            },
        ]
    },
    { // 42 - Verden
        "name": "Verden",
        "description": "Ancient spirits of the massacre of verden wander here. Behold, the bloody verdict of verden.",
        "isMain": false,
        "areaId": 4,

        "questSteps": [
            { // 0
                "name": "Saxon Men",
                "description": "Does a man have to fight all his life? Only in death to take flight to the skies. Warmongers vie to take my throne, no respect is ever shown.",
                "encounter": "2saxonMen",
                "duelParam": { "nextEncounters": [ "3saxonMen" ] }
                // TODO GIVE VALURIN A RELIC
            }
        ]
    },
    // bonus puzzle quest
]);
