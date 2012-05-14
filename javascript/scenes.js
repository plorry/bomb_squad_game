var gamejs = require('gamejs');
var sprites = require('./sprites');
var config = require('./config');
var Walkman = sprites.Walkman;

var image_rect = [0,0,320,240];

var Wire = sprites.Wire;
var Obstacle = sprites.Obstacle;
var Pointer = sprites.Pointer;
var font = new gamejs.font.Font('20px Lucida Console');

var TIMER_COLOR = '#F00F00';
var TIMER_POS = [125,58];
//Cutscene IDs
var VICTORY_CUTSCENE = 0;
var OPENING_CUTSCENE = 1;
var BOMB1_VICTORY = 2;
var BOMB2_VICTORY = 3;
var TITLE_SCREEN = 4;
var AVAIL_CUTSCENES = [5,18];
var ENDING = 40;

var currentLevel = 0;

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

//Cutscenes

 

var Cutscene = exports.Cutscene = function(director, cutsceneId) {
	
	this.blast = false;
	this.blast_centre = [config.WIDTH / 2, config.HEIGHT / 2];
	this.blast_amount = 0;

	this.handleEvent = function(event) {
		if (event.type === gamejs.event.KEY_DOWN || event.type === gamejs.event.MOUSE_DOWN) {
			if (cutsceneId == TITLE_SCREEN){
				director.replaceScene(new Cutscene(director, OPENING_CUTSCENE));
			}
		}
	};

	this.update = function(msDuration) {
		elapsed += msDuration;
		if ((elapsed >= duration) && cutsceneId != TITLE_SCREEN){
			currentPanel += 1;
			if (currentPanel >= panels.length) {
				if (cutsceneId == VICTORY_CUTSCENE) {
					if (currentLevel == 1) {
						currentPanel=0;
						elapsed=0;
						director.replaceScene(new Cutscene(director, BOMB1_VICTORY));
					}
					if (currentLevel == 2) {
						currentPanel=0;
						elapsed=0;
						director.replaceScene(new Cutscene(director, BOMB2_VICTORY));
					}
					if (currentLevel == 3) {
						currentPanel=0;
						elapsed=0;
						director.replaceScene(new Cutscene(director, ENDING));
					}
				} else {
					director.replaceScene(new Bomb(director, currentLevel));
				}
				if (cutsceneId == ENDING) {
					currentLevel = 0;
					currentPanel = 0;
					elapsed = 0;
					var next_scene = new scenes.Cutscene(director, TITLE_SCREEN);
					director.start(next_scene);
				}
			}
			elapsed = 0;
			image = gamejs.image.load(panels[currentPanel].image);
			if (panels[currentPanel].sound != ''){
				sound = new gamejs.mixer.Sound(panels[currentPanel].sound);
				if (panels[currentPanel].sound == 'static/sounds/explosion.ogg') {
					this.blast = true;
				}
				sound.play();
			}
			duration = panels[currentPanel].duration;

		//	director.replaceScene(new Cutscene(director, cutsceneId));
		}
		if (duration == 'nope'){
			duration = sound.getLength() * 1000;
		}

		if (!(duration > 0 && duration < 7000)){
			duration = sound.getLength() * 1000;
		}

		if (this.blast) {
			this.blast_amount += (msDuration / 2);
		}
	};

	this.draw = function(display) {
		display.blit(image, [0,0], image_rect);
		if (this.blast) {
			gamejs.draw.circle(display, "#ffffff", this.blast_centre, this.blast_amount);
		}
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
		panels = [];
		cutsceneConfig.panels.forEach(function(panel){
			panels.push(panel);
		});
		image = gamejs.image.load(panels[currentPanel].image);
		if (panels[currentPanel].sound != ''){
			sound = new gamejs.mixer.Sound(panels[currentPanel].sound);
			sound.play();
		}
		duration = panels[currentPanel].duration;
		if (duration == null){
			duration = sound.getLength();
		}
		//image = gamejs.image.load('./static/backgrounds/death1b.png');
		return;
	};

	function blast(centre) {
		this.blast = true;
		this.blast_centre = centre;
	};

	var cutsceneId = cutsceneId || 0;
	var cutsceneConfig = config.cutscenes[cutsceneId];
	var elapsed = 0;
	var currentPanel = 0;
	var music, image, sound, duration;
	initCutscene(cutsceneConfig);

	return this;
}

//Bomb scenes

var Bomb = exports.Bomb = function(director, bombId) {

	var step = 0;
	var isDefused = false;

	var test_sound = new gamejs.mixer.Sound('static/sounds/testo.ogg');
	var debug_val = 0;

	this.handleEvent = function(event) {
		//Gotta re-position the mouse coords based on the scale of the surface
		event.pos = [event.pos[0] / config.SCALE, event.pos[1] / config.SCALE];

		if (event.type === gamejs.event.MOUSE_DOWN) {
			var wiresClickedOn = wires.collidePoint(event.pos);
			var obsClickedOn = obstacles.collidePoint(event.pos);
			if (wiresClickedOn.length > 0) {
				wiresClickedOn.forEach(function(wire){
					if (!wire.isCut && wire.isActive){
						wire.cut();
						if (wire.order != step) {
							timer = 0;
							sounds.error();
						} else {
							sounds.snip();
							step++;
						}
					}
				});
			}
			if (obsClickedOn.length > 0) {
				obsClickedOn.forEach(function(obstacle){
					if (!obstacle.isSolved){
						obstacle.solve();
						sounds.snip();
					}
				});
			}
		}
		
		if (wires.collidePoint(event.pos).length > 0){
			wires.collidePoint(event.pos).forEach(function(wire){
				if (pointer.image != wire.icon && wire.isActive){
					//debug_val = 'diff!';
					pointer.setImage(wire.icon);
				}
				if (!wire.isActive) {
					pointer.setNull();
				}
			});
		}

		if (obstacles.collidePoint(event.pos).length > 0){
			obstacles.collidePoint(event.pos).forEach(function(obstacle){
				if (pointer.image != obstacle.icon && !obstacle.isSolved){
					//debug_val = 'diff!';
					pointer.setImage(obstacle.icon);
				}
			});
		}

		if (obstacles.collidePoint(event.pos).length == 0 && wires.collidePoint(event.pos).length == 0) {
			if (pointer.image != null) {
				pointer.setNull();
			}
		}

		pointer.setPos(event.pos);
	};

	this.update = function(msDuration) {
		if (currentLevel == 1) {
			AVAIL_CUTSCENES[1] = 28;
		}
		if (currentLevel == 2) {
			AVAIL_CUTSCENES[1] = 35;
		}
		wires.forEach(function(wire){
			wire.update(msDuration);
		});
		pointer.update(msDuration);
		timer -= (msDuration / 10);
		timer = timer.toFixed(0);
		if (timer > 0) {
			timer_string = String(timer);
			while(timer_string.length < 4){
				timer_string = '0' + timer_string;
			}
			timer_string = timer_string.substring(0,2) + ':' + timer_string.substring(2);
			timer_display = font.render(timer_string, TIMER_COLOR);
		}
		if (timer < 0) {
			timer_display = font.render("00:00", TIMER_COLOR);
		}

		if (timer < -100 && !isDefused) {
			next_cutscene = Math.floor((Math.random() * AVAIL_CUTSCENES[1]) + AVAIL_CUTSCENES[0]);
			director.replaceScene(new Cutscene(director, next_cutscene));
		}

		if (timer < -100 && isDefused) {
			director.replaceScene(new Cutscene(director, VICTORY_CUTSCENE))
		} 

		if (step >= steps_total && !isDefused) {
			isDefused = true;
			currentLevel++;
			timer = 0;
		}

		var num_obstacles;

		wires.forEach(function(wire){
			num_obstacles = 0;
			obstacles.forEach(function(obstacle){
				if (!obstacle.isSolved && wire.order == obstacle.trap_id) {
					num_obstacles++;
				}
				if (!obstacle.isSolved && obstacle.trap_id == 'all'){
					num_obstacles++;				
				}
			});
			debug_val = num_obstacles;
			if (num_obstacles > 0) {
				wire.isActive = false;
			} else {
				wire.activate();
			}
		});

	};

	this.draw = function(display) {
		display.fill("#ffffff");
		display.blit(image);
		wires.forEach(function(wire){
			if (!wire.isHidden){
				wire.draw(display);
			}
		});
		obstacles.draw(display);
		
		debug_val = font.render(debug_val, '#555');
		if (step >= show_timer){
			display.blit(timer_display, TIMER_POS);
		}

		//display.blit(debug_val, [0,0]);

		if (!pointer.isHidden){
			pointer.draw(display);
		}
	};

	function initBomb(bombConfig) {
		image = gamejs.image.load(bombConfig.image);
		pointer = new Pointer(config.pointer[0]);

		if (bombConfig.show_timer != undefined) {
			show_timer = bombConfig.show_timer;
		} else {
			show_timer = 0;
		}

		wires = new gamejs.sprite.Group();
		bombConfig.traps.forEach(function(w){
			wires.add(new Wire(w));
		});

		obstacles = new gamejs.sprite.Group();
		bombConfig.obstacles.forEach(function(o){
			obstacles.add(new Obstacle(o));
		});

		timer = bombConfig.timer;
		timer_string = String(timer);
		timer_display = font.render(timer_string, TIMER_COLOR);
		step_no = font.render(String(step), '#555');
		steps_total = bombConfig.traps.length;

	};

	var bombId = bombId || 0;
	var bombConfig = config.bombs[bombId];
	var elapsed = 0;
	var image;
	initBomb(bombConfig);

	return this;
}