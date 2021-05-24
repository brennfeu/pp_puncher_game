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
            case("bleachCoveredWeeb"):
                this.addEnemy(new BleachCoveredWeeb(), 290);
                break;
            case("weebAssistant"):
                this.addEnemy(new Weeb());
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
            case("managerGang"):
                this.addEnemy(new IkeaManager(), 76);
                this.addEnemy(new IkeaManager());
                this.addEnemy(new IkeaManager(), 561);
                break;
            case("dualMonstruosity"):
                this.addEnemy(new IkeaMonstruosity(), 158);
                this.addEnemy(new IkeaMonstruosity(), 462);
                this.enemyList[0].nextPhase = null;
                this.enemyList[1].nextPhase = null;
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
            case("notYuki"):
                this.addEnemy(new NotYuki());
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
            case("minorDemon"):
                this.addEnemy(new MinorDemon());
                break;
            case("3demonicSouls"):
                this.addEnemy(new DemonicSoul(), 76);
                this.addEnemy(new DemonicSoul());
                this.addEnemy(new DemonicSoul(), 561);
                break;

            // christian settlement
            case("introPriest"):
                this.addEnemy(new ChristianPriest());
                break;
            case("templars"):
                this.addEnemy(new Templar(), 190);
                this.addEnemy(new Templar(), 450);
                break;
            case("templarsAndPriest"):
                this.addEnemy(new Templar(), 76);
                this.addEnemy(new ChristianPriest());
                this.addEnemy(new Templar(), 561);
                break;
            case("inquisitor"):
                this.addEnemy(new Inquisitor());
                break;
            case("inquisitorArmyA"):
                this.addEnemy(new ChristianPriest(), 76);
                this.addEnemy(new Inquisitor());
                this.addEnemy(new ChristianPriest(), 561);
                break;
            case("inquisitorArmyB"):
                this.addEnemy(new Templar(), 76);
                this.addEnemy(new Inquisitor());
                this.addEnemy(new Templar(), 561);
                break;
            case("bishopArmyA"):
                this.addEnemy(new ChristianPriest(), 76);
                this.addEnemy(new ChristianBishop());
                this.addEnemy(new ChristianPriest(), 561);
                break;
            case("bishopArmyB"):
                this.addEnemy(new ChristianPriest(), 76);
                this.addEnemy(new ChristianArchBishop());
                this.addEnemy(new ChristianPriest(), 561);
                break;
            case("bishopArmyC"):
                this.addEnemy(new ChristianBishop(), 76);
                this.addEnemy(new ChristianArchBishop());
                this.addEnemy(new ChristianBishop(), 561);
                break;
            case("blindGuardian"):
                this.addEnemy(new ChristianPriest(), 76);
                this.addEnemy(new BlindGuardian(), 290);
                this.addEnemy(new ChristianPriest(), 561);
                break;
            case("eternalChampion"):
                this.addEnemy(new ChristianPriest(), 76);
                this.addEnemy(new EternalChampion(), 290);
                this.addEnemy(new ChristianPriest(), 561);
                break;
            case("christianSpirits"):
                this.addEnemy(new ChristianSpirit(), 170);
                this.addEnemy(new ChristianSpirit(), 450);
                break;
            case("trueCrossSprit"):
                this.addEnemy(new ChristianSpirit(), 76);
                this.addEnemy(new TrueCross(), undefined, 50);
                this.addEnemy(new ChristianSpirit(), 541);
                break;
            case("fearMePls"):
                this.addEnemy(new FearMePls());
                break;
            case("onis"):
                this.addEnemy(new Oni(), 170);
                this.addEnemy(new Oni(), 450);
                break;
            case("onisTroll"):
                this.addEnemy(new FakeOni());
                break;
            case("odditiesCrab"):
                this.addEnemy(new OdditySpirit(), 76);
                this.addEnemy(new CrabOddity());
                this.addEnemy(new OdditySpirit(), 561);
                break;
            case("odditiesSnail"):
                this.addEnemy(new OdditySpirit(), 76);
                this.addEnemy(new SnailOddity());
                this.addEnemy(new OdditySpirit(), 561);
                break;
            case("odditiesMonkey"):
                this.addEnemy(new OdditySpirit(), 76);
                this.addEnemy(new MonkeyOddity());
                this.addEnemy(new OdditySpirit(), 561);
                break;
            case("sadako"):
                this.addEnemy(new Sadako());
                break;
            case("odditiesCat"):
                this.addEnemy(new OdditySpirit(), 76);
                this.addEnemy(new CatOddity());
                this.addEnemy(new OdditySpirit(), 561);
                break;
            case("odditiesSnake"):
                this.addEnemy(new OdditySpirit(), 76);
                this.addEnemy(new SnakeOddity());
                this.addEnemy(new OdditySpirit(), 561);
                break;
            case("odditiesDarkness"):
                this.addEnemy(new OdditySpirit(), 76);
                this.addEnemy(new DarknessOddity());
                this.addEnemy(new OdditySpirit(), 561);
                break;
            case("shinigamiIntro"):
                this.addEnemy(new Weeb(), 76);
                this.addEnemy(new Shinigami());
                this.addEnemy(new Weeb(), 561);
                this.enemyList[0].bleedDamage = this.enemyList[0].STRValue;
                this.enemyList[2].bleedDamage = this.enemyList[2].STRValue;
                this.enemyList[1].STRValue = 50;
                break;
            case("2shinigamis"):
                this.addEnemy(new Shinigami(), 190);
                this.addEnemy(new Shinigami(), 450);
                break;
            case("epicShinigami"):
                this.addEnemy(new Weeb(), 76);
                this.addEnemy(new EpicShinigami(), 290);
                this.addEnemy(new Weeb(), 561);
                this.enemyList[0].bleedDamage = this.enemyList[0].STRValue;
                this.enemyList[2].bleedDamage = this.enemyList[2].STRValue;
                break;
            case("chrsitianMaintainers"):
                this.addEnemy(new ChristianMaintainer(), 190);
                this.addEnemy(new ChristianMaintainer(), 450);
                break;
            case("chrsitianMaintainers2"):
                this.addEnemy(new ChristianMaintainer(), 76);
                this.addEnemy(new ChristianMaintainer());
                this.addEnemy(new ChristianMaintainer(), 561);
                break;
            case("onisNPriests"):
                this.addEnemy(new Oni(), 170);
                this.addEnemy(new ChristianPriest(), 450);
                break;
            case("onisNPriestsReversed"):
                this.addEnemy(new ChristianPriest(), 170);
                this.addEnemy(new Oni(), 450);
                break;
            case("evilCardinal1"):
                this.addEnemy(new ChristianCardinal("Ajari, Cardinal of Higo Province", 1), 230);
                break;
            case("evilCardinal2"):
                this.addEnemy(new ChristianCardinal("Saburō, Cardinal of Mount Iizuna", 5), 230);
                break;
            case("evilCardinal3"):
                this.addEnemy(new ChristianCardinal("Sagamibō, Cardinal of Shiramine", 6), 230);
                break;
            case("evilCardinal4"):
                this.addEnemy(new ChristianCardinal("Naigubu, Cardinal of Mount Takao", 7), 230);
                break;
            case("evilCardinal5"):
                this.addEnemy(new ChristianCardinal("Daranibō, Cardinal of Mount Fuji", 10), 230);
                break;
            case("nunsAndYokai"):
                this.addEnemy(new Dokkaebi(), 76);
                this.addEnemy(new Nun());
                this.addEnemy(new Dokkaebi(), 561);
                break;
            case("doubleNuns"):
                this.addEnemy(new Nun(), 170);
                this.addEnemy(new Nun(), 450);
                break;
            case("nunsBossAndYokai"):
                this.addEnemy(new Dokkaebi(), 76);
                this.addEnemy(new Canoness());
                this.addEnemy(new Dokkaebi(), 561);
                break;
            case("evilCardinal6"):
                this.addEnemy(new ChristianCardinal("Tsukuba-hōin, Cardinal of Hitachi Province", 12), 180);
                break;
            case("evilCardinal7"):
                this.addEnemy(new ChristianCardinal("Kōtenbō, Cardinal of Katsuragi", 13), 230);
                break;
            case("evilCardinal8"):
                this.addEnemy(new ChristianCardinal("Zenkibō, Cardinal of Mount Ōmine", 14), 230);
                break;
            case("evilCardinal9"):
                this.addEnemy(new ChristianCardinal("Sankibō, Cardinal of Itsukushima", 15), 230);
                break;
            case("evilCardinal10"):
                this.addEnemy(new ChristianCardinal("Myōgibō, Cardinal of Mount Ueno", 11), 230);
                break;
            case("evilCardinal11"):
                this.addEnemy(new ChristianCardinal("Hōkibō, Cardinal of Mount Daisen", 4), 230);
                break;
            case("evilCardinal12"):
                this.addEnemy(new ChristianCardinal("Hōkibō, Cardinal of Mount Daisen", 2), 230);
                break;
            case("benedictNDemon"):
                this.addEnemy(new ThePope(), 170);
                this.addEnemy(new EpicShinigami(), 450);
                break;
            case("powerOfGodAndAnime"):
                this.addEnemy(new ChristianPriest(), 76);
                this.addEnemy(new ThePopeFinal(), 290);
                this.addEnemy(new ChristianPriest(), 561);
                break;

            case("goatDemon"):
                this.addEnemy(new GoatDemon());
                break;
            case("goatDemonNSmallerOnes"):
                this.addEnemy(new MinorDemon(), 76);
                this.addEnemy(new GoatDemon());
                this.addEnemy(new MinorDemon(), 561);
                break;
            case("evilCardinalKing"):
                this.addEnemy(new TenguCardinalBoss(), 230);
                break;
            case("inquisitionGrandmaster"):
                this.addEnemy(new Inquisitor(), 76);
                this.addEnemy(new GrandMaster());
                this.addEnemy(new Inquisitor(), 561);
                break;
            case("2christians"):
                this.addEnemy(new ChristianGuy(), 190);
                this.addEnemy(new ChristianGuy(), 450);
                break;
            case("3christians"):
                this.addEnemy(new ChristianGuy(), 76);
                this.addEnemy(new ChristianGuy());
                this.addEnemy(new ChristianGuy(), 561);
                break;
            case("timmy"):
                this.addEnemy(new Timmy());
                break;
            case("familyFriendly"):
                this.addEnemy(new FamilyFriendly());
                break;
            case("pikamee"):
                this.addEnemy(new ElectricKettleAlien());
                break;
            case("2saxonMen"):
                this.addEnemy(new SaxonMan(), 190);
                this.addEnemy(new SaxonMan(), 450);
                break;
            case("3saxonMen"):
                this.addEnemy(new SaxonMan(), 76);
                this.addEnemy(new SaxonMan());
                this.addEnemy(new SaxonMan(), 561);
                break;

            // opstein island
            case("2opsteinGuards"):
                this.addEnemy(new OpsteinGuard(), 190);
                this.addEnemy(new OpsteinGuard(), 450);
                break;
            case("3opsteinGuards"):
                this.addEnemy(new OpsteinGuard(), 76);
                this.addEnemy(new OpsteinGuard());
                this.addEnemy(new OpsteinGuard(), 561);
                break;
            case("2opsteinMaintainers"):
                this.addEnemy(new OpsteinMaintainer(), 190);
                this.addEnemy(new OpsteinMaintainer(), 450);
                break;
            case("3opsteinMaintainers"):
                this.addEnemy(new OpsteinMaintainer(), 76);
                this.addEnemy(new OpsteinMaintainer());
                this.addEnemy(new OpsteinMaintainer(), 561);
                break;
            case("badgers"):
                this.addEnemy(new ValurinBadger(), 76);
                this.addEnemy(new ValurinBadger());
                this.addEnemy(new ValurinBadger(), 561);
                break;
            case("valurin"):
                this.addEnemy(new ValurinBadger(), 76);
                this.addEnemy(new Valurin());
                this.addEnemy(new ValurinBadger(), 561);
                break;
            case("standFight1"):
                this.addEnemy(new EnemyStand(3), 300);
                break;
            case("standFight2"):
                this.addEnemy(new EnemyStand(24), 170);
                this.addEnemy(new EnemyStand(25), 450);
                break;
            case("standFight3"):
                this.addEnemy(new EnemyStand(4), 300);
                break;
            case("standFight4"):
                this.addEnemy(new EnemyStand(2), 90);
                this.addEnemy(new EnemyStand(11), 450);
                break;
            case("standUsers1"):
                this.addEnemy(new EnemyStandUser(24), 76);
                this.addEnemy(new EnemyStandUser(3));
                this.addEnemy(new EnemyStandUser(25), 561);
                break;
            case("standUsers2"):
                this.addEnemy(new EnemyStandUser(2), 76);
                this.addEnemy(new EnemyStandUser(4));
                this.addEnemy(new EnemyStandUser(11), 561);
                break;
            case("standUserBoss"):
                this.addEnemy(new BossStandUser());
                break;
            case("theThinker"):
                this.addEnemy(new TheThinker());
                break;
            case("molbols"):
                this.addEnemy(new Molbol(), 190);
                this.addEnemy(new Molbol(), 450);
                break;
            case("greatMolbol"):
                this.addEnemy(new Molbol(), 76);
                this.addEnemy(new GreatMolbol(), 300);
                this.addEnemy(new Molbol(), 561);
                break;
            case("standFight5"):
                this.addEnemy(new EnemyStand(27), 300);
                break;
            case("standFight6"):
                this.addEnemy(new EnemyStand(8), 300);
                break;
            case("windowsGuards"):
                this.addEnemy(new WindowsGuard(), 190);
                this.addEnemy(new WindowsGuard(), 450);
                break;
            case("5gGuards"):
                this.addEnemy(new FiveGGuard(), 190);
                this.addEnemy(new FiveGGuard(), 450);
                break;
            case("billDoors"):
                this.addEnemy(new BillDoors());
                break;
            case("leverPuzzle1"):
                this.addEnemy(new LeverEnemy(0, [ 0, 2 ]), 76);
                this.addEnemy(new LeverEnemy(1, [ 1 ]));
                this.addEnemy(new LeverEnemy(2, [ 0 ]), 561);
                break;
            case("leverPuzzle2"):
                this.addEnemy(new LeverEnemy(0, [ 1, 2 ]), 76);
                this.addEnemy(new LeverEnemy(1, [ 0 ]));
                this.addEnemy(new LeverEnemy(2, [ 0, 2 ], true), 561);
                break;
            case("standFight7"):
                this.addEnemy(new EnemyStand(23), 280);
                break;
            case("standFight8"):
                this.addEnemy(new EnemyStand(6), 280);
                break;
            case("opsteinBoss"):
                this.addEnemy(new OpsteinBoss());
                break;
            case("2opteinGuests"):
                this.addEnemy(new OpsteinGuest(), 190);
                this.addEnemy(new OpsteinGuest(), 450);
                break;
            case("3opteinGuests"):
                this.addEnemy(new OpsteinGuest(), 76);
                this.addEnemy(new OpsteinGuest());
                this.addEnemy(new OpsteinGuest(), 561);
                break;
            case("chickenGuards"):
                this.addEnemy(new ChickenGuard(), 190);
                this.addEnemy(new ChickenGuard(), 450);
                break;
            case("soupGuards"):
                this.addEnemy(new SoupGuard(), 190);
                this.addEnemy(new SoupGuard(), 450);
                break;
            case("johnSoup"):
                this.addEnemy(new JohnSoup());
                break;
            case("loliconNota"):
                this.addEnemy(new LoliconNota());
                break;
            case("theHamburglar"):
                this.addEnemy(new TheHamburglarPhase1());
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
