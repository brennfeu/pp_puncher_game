var win = nw.Window.get();

let http = require('http');
let fs = require('fs');

var GREENWORKS = require("./greenworks");
console.log("Steam API Init: " + GREENWORKS.init());
