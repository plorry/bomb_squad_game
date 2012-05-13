var gamejs = require('gamejs');
var sprites = require('./sprites');
var scenes = require('./scenes');
var Director = require('./game').Director;

var Walkman = sprites.Walkman;

gamejs.preload([
  //backgrounds
  './static/backgrounds/death_01b.png',
  './static/backgrounds/death_02.png',
  './static/backgrounds/death_15a.png',
  './static/backgrounds/death_15b.png',
  './static/backgrounds/death_15c.png',
  './static/backgrounds/death_15d.png',
  './static/backgrounds/death_15e.png',
  './static/backgrounds/death_05.png',
  './static/backgrounds/death_06.png',
  './static/backgrounds/death_14.png',
  './static/backgrounds/victory_01.png',
  //graphics
  './static/bombs/bomb_1.png',
  './static/bombs/bomb_2.png',
  './static/bombs/wire_red.png',
  './static/bombs/wire_red_cut.png',
  './static/bombs/wire_green.png',
  './static/bombs/wire_green_cut.png',
  './static/bombs/wire_blue.png',
  './static/bombs/wire_blue_cut.png',
  './static/bombs/wire_yellow.png',
  './static/bombs/wire_yellow_cut.png',
  './static/bombs/lid_closed.png',

  './static/bombs/panel_down.png',
  './static/bombs/panel_up.png',
  './static/bombs/screw.png',
  './static/bombs/unscrewed.png',
  //icons
  './static/icons/snippers_open.png',
  './static/icons/drill.png',
  //sounds
  'static/sounds/testo.ogg',
  'static/sounds/snip.ogg',
  'static/sounds/error.ogg',
  'static/sounds/explosion.ogg',
  //death sequences
  'static/sounds/death_02.ogg',
]);



function main() {

    var director = new Director();
    var firstScene = new scenes.Bomb(director, 0);
    director.start(firstScene);
    return;

}

gamejs.ready(main);