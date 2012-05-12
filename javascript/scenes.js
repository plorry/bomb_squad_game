var gamejs = require('gamejs');
var sprites = require('./sprites');
var config = require('./config');
var Walkman = sprites.Walkman;

var image_rect = [0,0,320,240];

var Wire = sprites.Wire;

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

	this.update = function(msDuration) {
		elapsed += msDuration;
		if (elapsed >= duration){
			cutsceneId += 1;
			director.replaceScene(new Cutscene(director, cutsceneId));
		}
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
		image = gamejs.image.load(cutsceneConfig.image);
		//sound = cutsceneConfig.sound;
		duration = cutsceneConfig.duration;
		//image = gamejs.image.load('./static/backgrounds/death1b.png');
		return;
	};

	var cutsceneId = cutsceneId || 0;
	var cutsceneConfig = config.cutscenes[cutsceneId];
	var elapsed = 0;
	var music, image, sound, duration;
	initCutscene(cutsceneConfig);

	return this;
}

var Bomb = exports.Bomb = function(director, bombId) {
	this.handleEvent = function(event){

	};

	this.update = function(msDuration) {

	};

	this.draw = function(display) {
		display.fill("#ffffff");
		display.blit(image);
		wires.draw(display);
	};

	function initBomb(bombConfig) {
		image = gamejs.image.load(bombConfig.image);

		wires = new gamejs.sprite.Group();
		bombConfig.wires.forEach(function(w){
			wires.add(new Wire(w));
		});
	};

	var bombId = bombId || 0;
	var bombConfig = config.bombs[bombId];
	var elapsed = 0;
	var image;
	initBomb(bombConfig);

	return this;
}