var gamejs = require('gamejs');
var sprites = require('./sprites');
var config = require('./config');
var Walkman = sprites.Walkman;

var image_rect = [0,0,320,240];

var sounds = {
  'test': function(){
    (new gamejs.mixer.Sound('static/sounds/testo.ogg')).play();
  }
};

var Cutscene = exports.Cutscene = function(director, cutsceneId) {
	this.handleEvent = function(event) {
		if (event.type === gamejs.event.KEY_DOWN) {
			sounds.test();
		}
	};

	this.update = function() {
	};

	this.draw = function(display) {
		display.blit(image, [0,0], image_rect);
	};

	this.setLevelDump = function(dump) {
		try {
			var cutsceneConfig = JSON.parse(dump);
			initCutscene(cutsceneConfig);
		} catch (e) {
			gamejs.log(e);
		}
		return;
	};

	function initCutscene(cutsceneConfig) {
		//music = cutsceneConfig.music;
		//image = cutsceneConfig.image;
		//sound = cutsceneConfig.sound;
		//duration = cutsceneConfig.duration;
		image = gamejs.image.load('./static/backgrounds/death1b.png');
		return;
	};

	var cutsceneId = cutsceneId || 0;
	var cutsceneConfig = config.cutscenes[cutsceneId];

	var music, image, sound, duration;
	initCutscene(cutsceneConfig);

	return this;
}