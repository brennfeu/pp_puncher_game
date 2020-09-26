class Encounter {
    constructor(_id) {
        this.enemyList = [];
        this.name = _id;

        // anime convention
        if (this.name == "weeb") {
            this.addEnemy(new Weeb());
            this.enemyList[0].STRValue = 1;
        }
        else if (this.name == "3weebs") {
            this.addEnemy(new Weeb(), 76);
            this.addEnemy(new Weeb());
            this.addEnemy(new Weeb(), 561);
        }
        else if (this.name == "weebTwins") {
            this.addEnemy(new BigWeeb(), 198);
            this.addEnemy(new FastWeeb(), 442);
        }
        else if (this.name == "weebBoss") {
            this.addEnemy(new Weeb(), 76);
            this.addEnemy(new BossWeeb(), 300);
            this.addEnemy(new Weeb(), 561);
        }

        else if (this.name == "truffleA") {
            this.addEnemy(new VonTruffle());
        }
        else if (this.name == "deredereAndWeebs") {
            this.addEnemy(new Weeb(), 76);
            this.addEnemy(new Deredere(), 300);
            this.addEnemy(new Weeb(), 561);
        }

        // IKEA
        else if (this.name == "ikeaGuards") {
            this.addEnemy(new IkeaGuard(), 76);
            this.addEnemy(new IkeaGuard());
            this.addEnemy(new IkeaGuard(), 561);
        }
        else if (this.name == "ikeaBlades") {
            this.addEnemy(new IkeaSawblade(), 198);
            this.addEnemy(new IkeaSawblade(), 442);
        }
        else if (this.name == "wallOfBlades") {
            this.addEnemy(new IkeaSawblade(), 76);
            this.addEnemy(new IkeaSawblade());
            this.addEnemy(new IkeaSawblade(), 561);
        }
        else if (this.name == "ikeaTurret") {
            this.addEnemy(new IkeaTurret());
        }
        else if (this.name == "ikeaTurrets") {
            this.addEnemy(new IkeaTurret(), 76);
            this.addEnemy(new IkeaSawblade());
            this.addEnemy(new IkeaTurret(), 561);
        }
        else if (this.name == "steroidGuard") {
            this.addEnemy(new IkeaGuard(), 76);
            this.addEnemy(new SteroidGuard());
            this.addEnemy(new IkeaGuard(), 561);
        }
        else if (this.name == "steroidGuards") {
            this.addEnemy(new EliteGuard(), 76);
            this.addEnemy(new SteroidGuard());
            this.addEnemy(new EliteGuard(), 561);
        }
        else if (this.name == "ikeaKitchen") {
            this.addEnemy(new IkeaChef());
        }
        else if (this.name == "ikeaScout") {
            this.addEnemy(new IkeaScout());
        }
        else if (this.name == "ikeaPigs") {
            this.addEnemy(new IkeaPig(), 76);
            this.addEnemy(new IkeaPig());
            this.addEnemy(new IkeaPig(), 561);
        }
        else if (this.name == "ikeaElite") {
            this.addEnemy(new EliteGuard(), 76);
            this.addEnemy(new EliteGuard());
            this.addEnemy(new EliteGuard(), 561);
        }
        else if (this.name == "freeLives") {
            this.addEnemy(new AfroMan(), 76);
            this.addEnemy(new FreeLivesHQ(), 300);
            this.addEnemy(new AfroMan(), 561);
        }
        else if (this.name == "ikeaGate") {
            this.addEnemy(new IkeaTurret(), 76);
            this.addEnemy(new IkeaGuard());
            this.addEnemy(new IkeaTurret(), 561);
        }
        else if (this.name == "ikeaKickers") {
            this.addEnemy(new IkeaKicker(), 198);
            this.addEnemy(new IkeaKicker(), 442);
        }
        else if (this.name == "ikeaDivers") {
            this.addEnemy(new IkeaDiver(), 198);
            this.addEnemy(new IkeaDiver(), 442);
        }
        else if (this.name == "ikeaGuardAndCo") {
            this.addEnemy(new IkeaDiver(), 76);
            this.addEnemy(new EliteGuard());
            this.addEnemy(new IkeaKicker(), 561);
        }
        else if (this.name == "ikeaBoomerang") {
            this.addEnemy(new IkeaBoomerang(), 198);
            this.addEnemy(new IkeaBoomerang(), 442);
        }
        else if (this.name == "ikeaMaintainers") {
            this.addEnemy(new EvilMaintainer(), 190);
            this.addEnemy(new EvilMaintainer(), 450);
        }
        else if (this.name == "ikeaHermits") {
            this.addEnemy(new LostHermit(), 198);
            this.addEnemy(new LostHermit(), 442);
        }
        else if (this.name == "ikeaManager") {
            this.addEnemy(new EliteGuard(), 76);
            this.addEnemy(new IkeaManager());
            this.addEnemy(new EliteGuard(), 561);
        }
        else if (this.name == "ikeaMonstruosity") {
            this.addEnemy(new IkeaManager(), 76);
            this.addEnemy(new IkeaMonstruosity(), 285);
            this.addEnemy(new IkeaManager(), 561);
        }

        // high school
        else if (this.name == "2tier4students") {
            this.addEnemy(new Tier4Student(), 190);
            this.addEnemy(new Tier4Student(), 450);
        }
        else if (this.name == "3tier4students") {
            this.addEnemy(new Tier4Student(), 76);
            this.addEnemy(new Tier4Student());
            this.addEnemy(new Tier4Student(), 561);
        }
        else if (this.name == "2tier3students") {
            this.addEnemy(new Tier3Student(), 190);
            this.addEnemy(new Tier3Student(), 450);
        }
        else if (this.name == "3tier3students") {
            this.addEnemy(new Tier3Student(), 76);
            this.addEnemy(new Tier3Student());
            this.addEnemy(new Tier3Student(), 561);
        }
        else if (this.name == "3tier2students") {
            this.addEnemy(new Tier2Student(), 76);
            this.addEnemy(new Tier2Student());
            this.addEnemy(new Tier2Student(), 561);
        }
        else if (this.name == "councilPresident") {
            this.addEnemy(new Tier2Student(), 76);
            this.addEnemy(new CouncilPresident(), 340);
            this.addEnemy(new Tier2Student(), 561);
        }
        else if (this.name == "studentCouncil") {
            this.addEnemy(new CouncilSecretary(), 76);
            this.addEnemy(new CouncilVicePresident(), 295);
            this.addEnemy(new CouncilTreasurer(), 561);
        }
        else if (this.name == "dandere") {
            this.addEnemy(new Tier2Student(), 76);
            this.addEnemy(new Dandere(), 340);
            this.addEnemy(new Tier2Student(), 561);
        }
        else if (this.name == "yandere") {
            this.addEnemy(new Tier2Student(), 76);
            this.addEnemy(new Yandere(), 340);
            this.addEnemy(new Tier2Student(), 561);
        }
        else if (this.name == "darudere") {
            this.addEnemy(new Tier2Student(), 76);
            this.addEnemy(new Darudere(), 340);
            this.addEnemy(new Tier2Student(), 561);
        }
        else if (this.name == "tsundere") {
            this.addEnemy(new Tier2Student(), 76);
            this.addEnemy(new Tsundere(), 340);
            this.addEnemy(new Tier2Student(), 561);
        }
        else if (this.name == "kuudere") {
            this.addEnemy(new Tier2Student(), 76);
            this.addEnemy(new Kuudere(), 340);
            this.addEnemy(new Tier2Student(), 561);
        }
        else if (this.name == "deredere") {
            this.addEnemy(new Deredere());
        }
        else if (this.name == "2tier1students") {
            this.addEnemy(new Tier1Student(), 190);
            this.addEnemy(new Tier1Student(), 450);
        }
        else if (this.name == "schoolMaintainers") {
            this.addEnemy(new EvilMaintainer(), 76);
            this.addEnemy(new EvilMaintainer());
            this.addEnemy(new EvilMaintainer(), 561);
        }
        else if (this.name == "2AnimeHighSchoolers") {
            this.addEnemy(new AnimeHighSchooler(), 190);
            this.addEnemy(new AnimeHighSchooler(), 450);
        }
        else if (this.name == "3AnimeHighSchoolers") {
            this.addEnemy(new AnimeHighSchooler(), 76);
            this.addEnemy(new AnimeHighSchooler());
            this.addEnemy(new AnimeHighSchooler(), 561);
        }
        else if (this.name == "dereGroup1") {
            this.addEnemy(new Dandere(), 190);
            this.addEnemy(new Yandere(), 450);
        }
        else if (this.name == "dereGroup2") {
            this.addEnemy(new Darudere(), 76);
            this.addEnemy(new Tsundere());
            this.addEnemy(new Kuudere(), 561);
        }

        else if (this.name == "gymClubStudents") {
            this.addEnemy(new GymClubStudent(), 190);
            this.addEnemy(new GymClubStudent(), 450);
        }
        else if (this.name == "gymClubStudentsReady") {
            this.addEnemy(new GymClubStudent(), 190);
            this.addEnemy(new GymClubStudent(), 450);
            this.enemyList[0].damageBuildUp = 5;
            this.enemyList[1].damageBuildUp = 5;
        }
        else if (this.name == "boardGameClubStudents") {
            this.addEnemy(new BoardGameClubStudent(), 100);
            this.addEnemy(new BoardGameClubStudent(), 450);
        }
    }

    addEnemy(_enemy, _x = 320, _y = 75) {
        _enemy.setSpriteCoordinates(_x, _y);
        this.enemyList.push(_enemy);
    }
}
