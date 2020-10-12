class PartyMember {
    constructor(_id, _name) {
        this.id = _id;
        this.name = _name;

        this.fightingStyles = [];
        this.relics = null;
        this.gods = [];
    }

    getDescription() {
        var txt = this.name;

        if (ProgressManager.getUnlockedGameMechanics().indexOf("Fighting Styles") > -1) {
            txt += "\n\nFighting Styles:";

            var fs = ""
            for (var i in this.fightingStyles) {
                fs += "\n - " + this.fightingStyles[i];
            }
            if (fs == "") fs += "\n - None";

            txt += fs;
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
                return "A swedish dude that happened to be very good friend with Brenn. He seems to know a lot about PP Punching, but even him doesn't know why he knows this much\n\nHis waifu is Mongo.";
        }
        return "No Description :("
    }

    static updateLocalStorage() {
        var l = [];
        for (var i in PartyManager.HEROES_LIST) {
            var f = {};
            f["fightingStyles"] = PartyManager.HEROES_LIST[i].fightingStyles;
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
        }
    }
}

PartyManager.HEROES_LIST = [];
var l = ["Brenn", "Pudding", "Eldon", "Valurin", "Country Music Brenn"];
for (var i in l) PartyManager.addPartyMember(l[i]);

if (JSON.parse(localStorage.getItem("partyMembers")) == null) PartyManager.updateLocalStorage();
PartyManager.loadLocalStorage();
