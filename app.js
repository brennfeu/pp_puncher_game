var win = nw.Window.get();

let http = require('http');
let fs = require('fs');

var GREENWORKS = require("./greenworks");
console.log("Steam API Init: " + GREENWORKS.init());

function TRIGGER_ERROR(_err) {
    fs.writeFile("./crash_log.txt",
        "An error occured :(\nCould you please send this to the dev at pp_puncher_game@gmail.com,\n" +
        "or at the steam community? ( https://steamcommunity.com/app/1422150/discussions/0/2842291719980876784/ )\n\n" +
        "Error: " + _err.stack,
        function(_a) {}
    );
    console.log(_err);
}
