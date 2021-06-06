var GAME_CONFIG = {
	type: Phaser.AUTO,
	width: 1200,
	height: 675,
	physics: {
		default: 'arcade'
	},
	input: {
        gamepad: true
    },
	scene: [MenuScene, BattleScene, MapScene, AreaScene, CutsceneScene, MultiplayerScene, MultiplayerBattleScene, CrashScene]
};

// phaser.js + credits.html + greenworks.js = 106238 lines of code(source only)
// CTRL + SHIFT + ALT + L to get total lines of code

const DEV_MODE = true;
const GAME_VERSION = (DEV_MODE ? "DEV " : "") + "Beta 1.4.0"; // Beta x.x --> Release x.x
//const GAME_VERSION = "beta2";

const DEV_TEST_MUSIC = false;
const DISABLE_MUSIC = DEV_MODE && !DEV_TEST_MUSIC;
const SCALE_GAME = true;
var DREAM_LUCK = false;

const FORCE_LOGS = [];
const HIDE_LOGS = ["sceneAddStuff"];
const LOG_TRACE = DEV_MODE;

var CURRENT_SCENE = null; // for console debugging

if (SCALE_GAME) {
	GAME_CONFIG["scale"] = {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    }
}
if (DEV_MODE) {
	win.showDevTools();
}

function getTextSpeed() {
	switch(GlobalVars.get("settings")["textSpeed"]) {
		case 0: return 5; // Slow
		case 1: return 3; // Normal
		case 2: return 0; // Fast
		case 3: return -5; // SuperSonic
	}
	return 3; // Normal - Default
}

function getRandomPercent() {
	var i = Math.floor(Math.random() * 100 + 1);
	return i;
}
function getCurrentTimestamp() {
	return Math.floor(Date.now() / 1000);
}
function getCurrentMilliTimestamp() {
	return Math.floor(Date.now());
}

function shuffleArray(array) {
	for (var i = array.length - 1; i > 0; i--) {
		var j = Math.floor(Math.random() * (i + 1));
		var temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}
	return array;
}
function randomFromList(_list) {
	if (_list.length == 0) {
		return null;
	}
	return shuffleArray(_list.slice())[0];
}
function removeFromList(_list, _element) {
	if (_list.indexOf(_element) > -1) {
		return _list.slice(_list.indexOf(_element), 1);
	}
	return _list;
}

function fibonacciNumber(_n) {
	var a = 1, b = 0, temp;
	while (_n >= 0 ){
		temp = a;
		a = a + b;
		b = temp;
		_n--;
	}
	return b;
}

function cloneObject(obj) {
	obj = obj && obj instanceof Object ? obj : '';

	// Handle Date (return new Date object with old value)
	if (obj instanceof Date) {
		return new Date(obj);
	}

	// Handle Array (return a full slice of the array)
	if (obj instanceof Array) {
		return obj.slice();
	}

	// Handle Object
	if (obj instanceof Fighter || obj instanceof Duel) {
		var copy = new obj.constructor();
		for (var attr in obj) {
			if (obj.hasOwnProperty(attr)){
				if (obj[attr] instanceof Object){
					copy[attr] = cloneObject(obj[attr]);
				}
				else {
					copy[attr] = obj[attr];
				}
			}
		}
		return copy;
	}

	if (obj instanceof Object) {
		return obj; // discord js objects
	}

	throw new Error("Unable to copy obj! Its type isn't supported.");
}

function isInDates(_date1, _date2) {
	return moment().range(_date1, _date2).contains(new Date());
}
var currentyear = new Date().getFullYear();
