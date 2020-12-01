var win = nw.Window.get();

let http = require('http');
let fs = require('fs');

var GREENWORKS = require("./greenworks");
console.log("Steam API Init: " + GREENWORKS.init());

function TRIGGER_ERROR(_scene, _err) {
    console.log(_err);

    var crash_log_txt = "An error occured :(\nCould you please send this to the dev at pppunchergame@gmail.com,\n" +
        "or at the steam community? ( https://steamcommunity.com/app/1422150/discussions/0/2842291719980876784/ )\n\n" +
        "The Error has been stored in the clipboard, so you can paste it wherever you want.\n\n" +
        "Error: " + _err.stack;
    fs.writeFile("./crash_log.txt", crash_log_txt, function(_a) {});

    if (!DEV_MODE) _scene.switchScene("Crash", { "crashTxt": crash_log_txt });
}

//process.on('uncaughtException', err => {
//    console.error('There was an uncaught error', err)
//    process.exit(1) //mandatory (as per the Node.js docs)
//})
