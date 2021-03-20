class Logger {
    static log(_txt, _logId = null, _optionalObj = null) {
        if (!DEV_MODE) return;

        var l = new CustomLog(_txt, _logId, _optionalObj);
        Logger.allLogs.push(l);
        if (FORCE_LOGS.indexOf(_logId) > -1) l.log();
    }
    static warning(_txt, _optionalObj = null) {
        if (!DEV_MODE) return;

        var l = new CustomLog(_txt, "warning", _optionalObj);
        Logger.allLogs.push(l);
        l.log();
    }

    static getAllLogs(_cat = null) {
        if (!DEV_MODE) return console.log("No logs if DEV_MODE is set to false");

        var l = [];

        for (var i in Logger.allLogs) {
            if (((_cat == null || Logger.allLogs[i].logId == _cat) && HIDE_LOGS.indexOf(Logger.allLogs[i].logId) < 0) || Logger.allLogs[i].logId == "warning") {
                l.push(Logger.allLogs[i]);
            }
        }

        for (var i in l) l[i].log();
    }
}
class CustomLog {
    constructor(_txt, _logId, _optionalObj = null) {
        this.txt = _txt;
        this.logId = _logId;
        this.timestamp = getCurrentTimestamp();

        this.optionalObj = _optionalObj;
    }

    log() {
        if (this.logId != null) console.log(this.logId.toUpperCase() + " (" + this.timestamp + "): " + this.txt);
        else console.log("??? (" + this.timestamp + "): " + this.txt);
        if (this.optionalObj != null) console.log(this.optionalObj)
        if (LOG_TRACE) console.trace();
    }
}
Logger.allLogs = [];
