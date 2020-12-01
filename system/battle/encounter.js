class Encounter {
    constructor(_id, _otherData = null) {
        this.enemyList = [];
        this.name = _id;

        switch(this.name) {
            // anime convention
            case("weeb"):
                this.addEnemy(new Weeb());
                this.enemyList[0].STRValue = 1;
                break;
            case("3weebs"):
                this.addEnemy(new Weeb(), 76);
                this.addEnemy(new Weeb());
                this.addEnemy(new Weeb(), 561);
                break;
            case("weebTwins"):
                this.addEnemy(new BigWeeb(), 198);
                this.addEnemy(new FastWeeb(), 442);
                break;
            case("weebBoss"):
                this.addEnemy(new Weeb(), 76);
                this.addEnemy(new BossWeeb(), 300);
                this.addEnemy(new Weeb(), 561);
                break;

            case("truffleA"):
                this.addEnemy(new VonTruffle());
                break;
            case("deredereAndWeebs"):
                this.addEnemy(new Weeb(), 76);
                this.addEnemy(new Deredere(), 300);
                this.addEnemy(new Weeb(), 561);
                break;
            case("crystalWeebs"):
                this.addEnemy(new CrystalWeeb(), 198);
                this.addEnemy(new CrystalWeeb(), 442);
                break;
            case("diamondWeebs"):
                this.addEnemy(new DiamondWeeb(), 198);
                this.addEnemy(new DiamondWeeb(), 442);
                break;
            case("blingBlingWeebs"):
                this.addEnemy(new DiamondWeeb(), 76);
                this.addEnemy(new BossWeeb(), 300);
                this.addEnemy(new CrystalWeeb(), 561);
                break;
            case("superWeebs"):
                this.addEnemy(new SuperWeeb(), 198);
                this.addEnemy(new SuperWeeb(), 442);
                break;
            case("megaWeebs"):
                this.addEnemy(new MegaWeeb(), 198);
                this.addEnemy(new MegaWeeb(), 442);
                break;
            case("gigaWeebs"):
                this.addEnemy(new GigaWeeb(), 198);
                this.addEnemy(new GigaWeeb(), 442);
                break;
            case("oppositeTeam"):
                var l = PartyManager.getCurrentParty();
                for (var i in l) {
                    this.addEnemy(new HeroEnemy(l[i]), 0, 0);
                }
                break;

            // IKEA
            case("ikeaGuards"):
                this.addEnemy(new IkeaGuard(), 76);
                this.addEnemy(new IkeaGuard());
                this.addEnemy(new IkeaGuard(), 561);
                break;
            case("ikeaBlades"):
                this.addEnemy(new IkeaSawblade(), 198);
                this.addEnemy(new IkeaSawblade(), 442);
                break;
            case("wallOfBlades"):
                this.addEnemy(new IkeaSawblade(), 76);
                this.addEnemy(new IkeaSawblade());
                this.addEnemy(new IkeaSawblade(), 561);
                break;
            case("ikeaTurret"):
                this.addEnemy(new IkeaTurret());
                break;
            case("ikeaTurrets"):
                this.addEnemy(new IkeaTurret(), 76);
                this.addEnemy(new IkeaSawblade());
                this.addEnemy(new IkeaTurret(), 561);
                break;
            case("steroidGuard"):
                this.addEnemy(new IkeaGuard(), 76);
                this.addEnemy(new SteroidGuard());
                this.addEnemy(new IkeaGuard(), 561);
                break;
            case("steroidGuards"):
                this.addEnemy(new EliteGuard(), 76);
                this.addEnemy(new SteroidGuard());
                this.addEnemy(new EliteGuard(), 561);
                break;
            case("ikeaKitchen"):
                this.addEnemy(new IkeaChef());
                break;
            case("ikeaScout"):
                this.addEnemy(new IkeaScout());
                break;
            case("ikeaPigs"):
                this.addEnemy(new IkeaPig(), 76);
                this.addEnemy(new IkeaPig());
                this.addEnemy(new IkeaPig(), 561);
                break;
            case("ikeaElite"):
                this.addEnemy(new EliteGuard(), 76);
                this.addEnemy(new EliteGuard());
                this.addEnemy(new EliteGuard(), 561);
                break;
            case("freeLives"):
                this.addEnemy(new AfroMan(), 76);
                this.addEnemy(new FreeLivesHQ(), 300);
                this.addEnemy(new AfroMan(), 561);
                break;
            case("ikeaGate"):
                this.addEnemy(new IkeaTurret(), 76);
                this.addEnemy(new IkeaGuard());
                this.addEnemy(new IkeaTurret(), 561);
                break;
            case("ikeaKickers"):
                this.addEnemy(new IkeaKicker(), 198);
                this.addEnemy(new IkeaKicker(), 442);
                break;
            case("ikeaDivers"):
                this.addEnemy(new IkeaDiver(), 198);
                this.addEnemy(new IkeaDiver(), 442);
                break;
            case("ikeaGuardAndCo"):
                this.addEnemy(new IkeaDiver(), 76);
                this.addEnemy(new EliteGuard());
                this.addEnemy(new IkeaKicker(), 561);
                break;
            case("ikeaBoomerang"):
                this.addEnemy(new IkeaBoomerang(), 198);
                this.addEnemy(new IkeaBoomerang(), 442);
                break;
            case("ikeaMaintainers"):
                this.addEnemy(new EvilMaintainer(), 190);
                this.addEnemy(new EvilMaintainer(), 450);
                break;
            case("ikeaHermits"):
                this.addEnemy(new LostHermit(), 198);
                this.addEnemy(new LostHermit(), 442);
                break;
            case("ikeaManager"):
                this.addEnemy(new EliteGuard(), 76);
                this.addEnemy(new IkeaManager());
                this.addEnemy(new EliteGuard(), 561);
                break;
            case("ikeaMonstruosity"):
                this.addEnemy(new IkeaManager(), 76);
                this.addEnemy(new IkeaMonstruosity(), 285);
                this.addEnemy(new IkeaManager(), 561);
                break;

            case("edimo"):
                this.addEnemy(new Edimo());
                break;
            case("swedishPilgrims"):
                this.addEnemy(new SwedishPilgrims(), 198);
                this.addEnemy(new SwedishPilgrims(), 442);
                break;
            case("targetDummy"):
                this.addEnemy(new TargetDummy());
                break;
            case("landmineGuards"):
                this.addEnemy(new LandMineGuard(undefined, true), 198);
                this.addEnemy(new LandMineGuard(undefined, false), 442);
                break;
            case("landmineGuards2"):
                this.addEnemy(new LandMineGuard(undefined, true), 198);
                this.addEnemy(new LandMineGuard(undefined, true), 442);
                break;

            // high school
            case("2tier4students"):
                this.addEnemy(new Tier4Student(), 190);
                this.addEnemy(new Tier4Student(), 450);
                break;
            case("3tier4students"):
                this.addEnemy(new Tier4Student(), 76);
                this.addEnemy(new Tier4Student());
                this.addEnemy(new Tier4Student(), 561);
                break;
            case("2tier3students"):
                this.addEnemy(new Tier3Student(), 190);
                this.addEnemy(new Tier3Student(), 450);
                break;
            case("3tier3students"):
                this.addEnemy(new Tier3Student(), 76);
                this.addEnemy(new Tier3Student());
                this.addEnemy(new Tier3Student(), 561);
                break;
            case("3tier2students"):
                this.addEnemy(new Tier2Student(), 76);
                this.addEnemy(new Tier2Student());
                this.addEnemy(new Tier2Student(), 561);
                break;
            case("councilPresident"):
                this.addEnemy(new Tier2Student(), 76);
                this.addEnemy(new CouncilPresident(), 340);
                this.addEnemy(new Tier2Student(), 561);
                break;
            case("studentCouncil"):
                this.addEnemy(new CouncilSecretary(), 76);
                this.addEnemy(new CouncilVicePresident(), 295);
                this.addEnemy(new CouncilTreasurer(), 561);
                break;
            case("dandere"):
                this.addEnemy(new Tier2Student(), 76);
                this.addEnemy(new Dandere(), 340);
                this.addEnemy(new Tier2Student(), 561);
                break;
            case("yandere"):
                this.addEnemy(new Tier2Student(), 76);
                this.addEnemy(new Yandere(), 340);
                this.addEnemy(new Tier2Student(), 561);
                break;
            case("darudere"):
                this.addEnemy(new Tier2Student(), 76);
                this.addEnemy(new Darudere(), 340);
                this.addEnemy(new Tier2Student(), 561);
                break;
            case("tsundere"):
                this.addEnemy(new Tier2Student(), 76);
                this.addEnemy(new Tsundere(), 340);
                this.addEnemy(new Tier2Student(), 561);
                break;
            case("kuudere"):
                this.addEnemy(new Tier2Student(), 76);
                this.addEnemy(new Kuudere(), 340);
                this.addEnemy(new Tier2Student(), 561);
                break;
            case("deredere"):
                this.addEnemy(new Deredere());
                break;
            case("2tier1students"):
                this.addEnemy(new Tier1Student(), 190);
                this.addEnemy(new Tier1Student(), 450);
                break;
            case("schoolMaintainers"):
                this.addEnemy(new EvilMaintainer(), 76);
                this.addEnemy(new EvilMaintainer());
                this.addEnemy(new EvilMaintainer(), 561);
                break;
            case("2AnimeHighSchoolers"):
                this.addEnemy(new AnimeHighSchooler(), 190);
                this.addEnemy(new AnimeHighSchooler(), 450);
                break;
            case("3AnimeHighSchoolers"):
                this.addEnemy(new AnimeHighSchooler(), 76);
                this.addEnemy(new AnimeHighSchooler());
                this.addEnemy(new AnimeHighSchooler(), 561);
                break;
            case("dereGroup1"):
                this.addEnemy(new Dandere(), 190);
                this.addEnemy(new Yandere(), 450);
                break;
            case("dereGroup2"):
                this.addEnemy(new Darudere(), 76);
                this.addEnemy(new Tsundere());
                this.addEnemy(new Kuudere(), 561);
                break;

            case("gymClubStudents"):
                this.addEnemy(new GymClubStudent(), 190);
                this.addEnemy(new GymClubStudent(), 450);
                break;
            case("gymClubStudentsReady"):
                this.addEnemy(new GymClubStudent(), 190);
                this.addEnemy(new GymClubStudent(), 450);
                this.enemyList[0].damageBuildUp = 5;
                this.enemyList[1].damageBuildUp = 5;
                break;
            case("boardGameClubStudents"):
                this.addEnemy(new BoardGameClubStudent(), 80);
                this.addEnemy(new BoardGameClubStudent(), 450);
                break;
            case("2yanderes"):
                this.addEnemy(new Yandere(), 190);
                this.addEnemy(new Yandere(), 450);
                break;
            case("3yanderes"):
                this.addEnemy(new Yandere(), 76);
                this.addEnemy(new Yandere());
                this.addEnemy(new Yandere(), 561);
                break;
            case("yandereDev"):
                this.addEnemy(new YandereDev());
                break;

            // allfaiths temple
            case("spiritGuardians"):
                this.addEnemy(new SpiritGuardian(), 190);
                this.addEnemy(new SpiritGuardian(), 450);
                break;
            case("guardiansOfFaith"):
                this.addEnemy(new GuardianOfFaith(), 180);
                this.addEnemy(new GuardianOfFaith(), 460);
                break;
            case("2tutorialClerics"):
                this.addEnemy(new TutorialPriest(), 190);
                this.addEnemy(new TutorialPriest(), 450);
                break;
            case("clericMaintainers"):
                this.addEnemy(new ClericMaintainers());
                break;
            case("clericAndSpirits"):
                this.addEnemy(new SpiritGuardian(), 76);
                this.addEnemy(new TutorialPriest(), 330);
                this.addEnemy(new GuardianOfFaith(), 521);
                this.enemyList[0].STRValue = 30;
                this.enemyList[2].STRValue = 30;
                break;
            case("energyBarrier"):
                this.addEnemy(new EnergyBarrier());
                break;
            case("faith"):
                this.addEnemy(new FaithFirstBattle());
                break;
            case("brennClerics"):
                this.addEnemy(new OneGodCleric("Brenn"), 190);
                this.addEnemy(new OneGodCleric("Brenn"), 450);
                break;
            case("countryBrennClerics"):
                this.addEnemy(new OneGodCleric("Country Music Brenn"), 190);
                this.addEnemy(new OneGodCleric("Country Music Brenn"), 450);
                break;
            case("chadBrennClerics"):
                this.addEnemy(new OneGodCleric("Chad Brenn"), 190);
                this.addEnemy(new OneGodCleric("Chad Brenn"), 450);
                break;
            case("highClericBrenn"):
                this.addEnemy(new HighCleric(undefined, ["Brenn", "Country Music Brenn", "Chad Brenn"]));
                break;
            case("helloThereClerics"):
                this.addEnemy(new OneGodCleric("Hello There Puds"), 190);
                this.addEnemy(new OneGodCleric("Hello There Puds"), 450);
                break;
            case("dickDickSonClerics"):
                this.addEnemy(new OneGodCleric("DickDickSon666"), 190);
                this.addEnemy(new OneGodCleric("DickDickSon666"), 450);
                break;
            case("rapistClerics"):
                this.addEnemy(new OneGodCleric("UREGonnaGetRAPED"), 190);
                this.addEnemy(new OneGodCleric("UREGonnaGetRAPED"), 450);
                break;
            case("highClericPuds"):
                this.addEnemy(new HighCleric(undefined, ["Hello There Puds", "DickDickSon666", "UREGonnaGetRAPED"]));
                break;
            case("saltKingClerics"):
                this.addEnemy(new OneGodCleric("Salt King"), 190);
                this.addEnemy(new OneGodCleric("Salt King"), 450);
                break;
            case("rangerClerics"):
                this.addEnemy(new OneGodCleric("Ranger"), 190);
                this.addEnemy(new OneGodCleric("Ranger"), 450);
                break;
            case("highClericEldon"):
                this.addEnemy(new HighCleric(undefined, ["Salt King", "Ranger"]));
                break;
            case("trialBrenn"):
                this.addEnemy(new TempleTrial("Holy Brenn Trinity"))
                break;
            case("trialPudding"):
                this.addEnemy(new TempleTrial("Unholy Pudding Trinity"))
                break;
            case("trialEldon"):
                this.addEnemy(new TempleTrial("Eldon Duality"))
                break;
            case("energyBarrier2"):
                this.addEnemy(new EnergyBarrier2(), 290);
                break;
            case("faithForReal"):
                this.addEnemy(new Faith());
                break;
            case("synergySpirits"):
                this.addEnemy(new SynergySpirit(undefined, "Holy Brenn Trinity"), 76);
                this.addEnemy(new SynergySpirit(undefined, "Eldon Duality"));
                this.addEnemy(new SynergySpirit(undefined, "Unholy Pudding Trinity"), 561);
                break;

            case("3clerics"):
                this.addEnemy(new PriestEnemy(), 76);
                this.addEnemy(new PriestEnemy());
                this.addEnemy(new PriestEnemy(), 561);
                break;
            case("2clerics"):
                this.addEnemy(new PriestEnemy(), 190);
                this.addEnemy(new PriestEnemy(), 450);
                break;
            case("clericsAndWeeb"):
                this.addEnemy(new PriestEnemy(), 56);
                this.addEnemy(new BossWeeb(), 290);
                this.addEnemy(new PriestEnemy(), 561);
                break;
            case("wyndoella"):
                this.addEnemy(new WyndoellaBoss());
                break;

            // multiplayer
            case("multiplayer"):
                for (var i in _otherData) {
                    this.addEnemy(new MultiplayerEnemy(_otherData[i]));
                }
                break;
        }
    }

    addEnemy(_enemy, _x = 320, _y = 75){
        _enemy.setSpriteCoordinates(_x, _y);
        this.enemyList.push(_enemy);
    }
}
