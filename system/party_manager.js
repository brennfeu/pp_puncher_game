class PartyMember {
    constructor(_id, _name) {
        this.id = _id;
        this.name = _name;

        this.fightingStyles = [];
        this.relics = null;
        this.gods = [];
    }

    getDescription(_currentSelect = null) {
        var txt = this.name;

        if (ProgressManager.getUnlockedGameMechanics().indexOf("Fighting Styles") > -1 &&
          [null, "fs"].indexOf(_currentSelect) > -1) {
            txt += "\n\nFighting Styles:";

            var fs = ""
            for (var i in this.fightingStyles) {
                fs += "\n - " + this.fightingStyles[i];
            }
            if (fs == "") fs += "\nNone";

            txt += fs;
        }
        if (ProgressManager.getUnlockedGameMechanics().indexOf("Gods") > -1 &&
          [null, "gods"].indexOf(_currentSelect) > -1) {
            txt += "\n\nGods:";

            var gods = ""
            for (var i in this.gods) {
                gods += "\n - " + this.gods[i];
            }
            if (gods == "") gods += "\nNone";

            txt += gods;
        }
        if (ProgressManager.getUnlockedGameMechanics().indexOf("Synergies") > -1 &&
          [null, "gods"].indexOf(_currentSelect) > -1) {
            txt += "\n\nSynergies:";
            var hero = new Hero(this);

            var synergies = ""
            for (var i in GodManager.SYNERGY_LIST) {
                if (hero.hasSynergy(GodManager.SYNERGY_LIST[i].name)) {
                    synergies += "\n - " + GodManager.SYNERGY_LIST[i].name
                }
            }
            if (synergies == "") synergies += "\nNone";

            txt += synergies;
        }

        return txt;
    }
}

class PartyManager {
    static addPartyMember(_name) {
        PartyManager.HEROES_LIST.push(new PartyMember(PartyManager.HEROES_LIST.length, _name));
    }

    static getPartyMember(_id) {
        for (var i in PartyManager.HEROES_LIST) {
            if (PartyManager.HEROES_LIST[i].id == _id) return PartyManager.HEROES_LIST[i];
        }
        return null;
    }
    static getPartyMemberByName(_name) {
        for (var i in PartyManager.HEROES_LIST) {
            if (PartyManager.HEROES_LIST[i].name == _name) return PartyManager.HEROES_LIST[i];
        }
        return null;
    }

    static getCurrentParty() {
        var l = ProgressManager.getUnlockedPartyMembers();
        var p = [];
        for (var i in l) {
            p.push(new Hero(l[i]));
        }
        return p;
    }

    static getHeroDescription(_hero) {
        switch(_hero) {
            case "Brenn":
                return "Main Character, and a scientist that managed to make waifus real, using body pillows. He also makes music under the name of “Brennfeu Cthulhu”, which angered Cthulhu.\n\nHis waifu is Kurisu.";
            case "Pudding":
                return "A swedish dude that happened to be very good friend with Brenn. He seems to know a lot about PP Punching, but even him doesn't know why he knows this much.\n\nHis waifu is Mongo.";
            case "Eldon":
                return "A very old friend of Brenn, master of painting miniatures and related board games. He also played a bunch of tabletop rpg campaigns with Brenn and other friends of him.\n\nHis waifu is Astolfo.";
        }
        return "No Description :("
    }
    static getHeroDialogueLine(_hero) {
        switch(_hero) {
            case "Brenn":
                return 34;
            case "Pudding":
                return 35;
            case "Eldon":
                return 36;
        }
        return null
    }

    static updateLocalStorage() {
        var l = [];
        for (var i in PartyManager.HEROES_LIST) {
            var f = {};
            f["fightingStyles"] = PartyManager.HEROES_LIST[i].fightingStyles;
            f["gods"] = PartyManager.HEROES_LIST[i].gods;
            l.push(f);
        }
        var data = {};
        data["pm"] = l;
        localStorage.setItem("partyMembers", JSON.stringify(data));
    }
    static loadLocalStorage() {
        var l = JSON.parse(localStorage.getItem("partyMembers"))["pm"];
        for (var i in l) {
            PartyManager.HEROES_LIST[i].fightingStyles = l[i]["fightingStyles"];
            PartyManager.HEROES_LIST[i].gods = l[i]["gods"];

            if (PartyManager.HEROES_LIST[i].gods == undefined) PartyManager.HEROES_LIST[i].gods = []; // for older versions savefiles
        }
    }
}

PartyManager.HEROES_LIST = [];
var l = ["Brenn", "Pudding", "Eldon", "Valurin", "Country Music Brenn"];
for (var i in l) PartyManager.addPartyMember(l[i]);
// TODO: Eye of Truth moves for all these guys

if (JSON.parse(localStorage.getItem("partyMembers")) == null) PartyManager.updateLocalStorage();
PartyManager.loadLocalStorage();
