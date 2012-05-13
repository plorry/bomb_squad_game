var gamejs = require('gamejs');
var sprites = require('./sprites');
var scenes = require('./scenes');
var Director = require('./game').Director;

var Walkman = sprites.Walkman;

gamejs.preload([
  //backgrounds
  './static/backgrounds/death_01b.png',
  './static/backgrounds/death_02.png',
  './static/backgrounds/death_04.png',
  './static/backgrounds/death_05.png',
  './static/backgrounds/death_06.png',
  './static/backgrounds/death_07.png',
  './static/backgrounds/death_08.png',
  './static/backgrounds/death_10.png',
  './static/backgrounds/death_12.png',
  './static/backgrounds/death_24.png',
  './static/backgrounds/death_27.png',
  './static/backgrounds/death_28.png',
  './static/backgrounds/death_29.png',
  './static/backgrounds/death_30.png',
  './static/backgrounds/death_31.png',
  './static/backgrounds/death_33.png',
  './static/backgrounds/death_35.png',
  './static/backgrounds/death_36.png',
  './static/backgrounds/death_39.png',
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
  './static/bombs/lid_open.png',
  './static/bombs/vial_1.png',
  './static/bombs/vial_2.png',
  './static/bombs/vial_3.png',
  './static/bombs/vial_4.png',
  './static/bombs/vial_2_empty.png',

  './static/bombs/panel_down.png',
  './static/bombs/panel_up.png',
  './static/bombs/screw.png',
  './static/bombs/unscrewed.png',
  //icons
  './static/icons/hand.png',
  './static/icons/snippers_open.png',
  './static/icons/drill.png',

  //sounds
  'static/sounds/testo.ogg',
  'static/sounds/snip.ogg',
  'static/sounds/error.ogg',
  'static/sounds/explosion.ogg',
  //death sequences
  'static/sounds/death_02.ogg',
  'static/sounds/death_04.ogg',
  'static/sounds/death_05.ogg',
  'static/sounds/death_06.ogg',
  'static/sounds/death_07.ogg',
  'static/sounds/death_08.ogg',
  'static/sounds/death_10.ogg',
  'static/sounds/death_12.ogg',
  'static/sounds/death_24.ogg',
  'static/sounds/death_27.ogg',
  'static/sounds/death_28.ogg',
  'static/sounds/death_29.ogg',
  'static/sounds/death_30.ogg',
  'static/sounds/death_31.ogg',
  'static/sounds/death_33.ogg',
  'static/sounds/death_35.ogg',
  'static/sounds/death_36.ogg',
  'static/sounds/death_39.ogg',
]);



function main() {

    var director = new Director();
    var firstScene = new scenes.Bomb(director, 0);
    director.start(firstScene);
    return;

}

gamejs.ready(main);