var gamejs = require('gamejs');
var sprites = require('./sprites');
var config = require('./config');
var Walkman = sprites.Walkman;

var image_rect = [0,0,320,240];

var Wire = sprites.Wire;
var Pointer = sprites.Pointer;
var font = new gamejs.font.Font('20px monospace');

var sounds = {
  'test': function(){
    (new gamejs.mixer.Sound('static/sounds/testo.ogg')).play();
  },
  'snip': function(){
  	(new gamejs.mixer.Sound('static/sounds/snip.ogg')).play();
  },
  'error': function(){
  	(new gamejs.mixer.Sound('static/sounds/error.ogg')).play();
  }
};
/*
var death_sounds = {
	'death_02': function(){
		(new gamejs.mixer.Sound('static/sounds/death_02.ogg')).play();
	}
}*/

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
		sound = new gamejs.mixer.Sound(cutsceneConfig.sound).play();
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

	var step = 0;

	this.handleEvent = function(event) {
		//Gotta re-position the mouse coords based on the scale of the surface
		event.pos = [event.pos[0] / config.SCALE, event.pos[1] / config.SCALE];

		if (event.type === gamejs.event.MOUSE_DOWN) {
			var wiresClickedOn = wires.collidePoint(event.pos);
			if (wiresClickedOn.length > 0) {
				wiresClickedOn.forEach(function(wire){
					if (!wire.isCut){
						wire.cut();
						if (wire.order != step) {
							timer = 0;
							sounds.error();
						} else {
							sounds.snip();
						}
						step++;
					}
				});
			}
		}

		if (wires.collidePoint(event.pos).length > 0) {
			pointer.setSnippers();
		} else {
			pointer.setNull();
		}

		pointer.setPos(event.pos);
	};

	this.update = function(msDuration) {
		wires.forEach(function(wire){
			wire.update(msDuration);
		});
		pointer.update(msDuration);
		timer -= msDuration;
		if (timer > 0) {
			timer_display = font.render(String(timer), '#333');
		}
		if (timer < 0) {
			timer_display = font.render("0", '#333');
		}
		step_no = font.render(String(step), '#555');

		if (timer < -200) {
			director.replaceScene(new Cutscene(director, 1));
		}

	};

	this.draw = function(display) {
		display.fill("#ffffff");
		display.blit(image);
		wires.draw(display);
		
		display.blit(step_no, [200,10]);
		display.blit(timer_display, [5,10]);

		if (!pointer.isHidden){
			pointer.draw(display);
		}
	};

	function initBomb(bombConfig) {
		image = gamejs.image.load(bombConfig.image);
		pointer = new Pointer(config.pointer[0]);

		wires = new gamejs.sprite.Group();
		bombConfig.traps.forEach(function(w){
			wires.add(new Wire(w));
		});
		timer = bombConfig.timer;
		timer_display = font.render(String(timer), '#333');
		step_no = font.render(String(step), '#555');

	};

	var bombId = bombId || 0;
	var bombConfig = config.bombs[bombId];
	var elapsed = 0;
	var image;
	initBomb(bombConfig);

	return this;
}