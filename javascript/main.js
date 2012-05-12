var gamejs = require('gamejs');
var sprites = require('./sprites');
var scenes = require('./scenes');
var Director = require('./game').Director;

var Walkman = sprites.Walkman;

gamejs.preload([
  //backgrounds
  './static/backgrounds/death1b.png',
  './static/backgrounds/death2.png',
  //graphics
  './static/bombs/bomb_1.png',
  './static/bombs/wire_red.png',
  './static/bombs/wire_green.png',
  './static/bombs/wire_green_cut.png',

  'static/sprites/gu-con.png',
  './static/icons/snippers_open.png',
  //sounds
  'static/sounds/testo.ogg'
]);



function main() {
    /*
    var walkman = new Walkman([0,0]);
    t=5;

    var display = gamejs.display.setMode([600, 400]);

    var mainSurface = gamejs.display.getSurface();

    function tick(msDuration) {

            gamejs.event.get().forEach(function(event){
              var direction = {};
              direction[gamejs.event.K_UP] = [0, -speed];
              direction[gamejs.event.K_DOWN] = [0, speed];
              direction[gamejs.event.K_LEFT] = [-speed, 0];
              direction[gamejs.event.K_RIGHT] = [speed, 0];
              if (event.type === gamejs.event.KEY_DOWN){
                walkman.speed = direction[event.key];
                sounds.test();
              }
              else if (event.type === gamejs.event.KEY_UP) {
                walkman.speed = 0;
              }
            });

            display.fill("#FFF")
            t++;
            walkman.update(msDuration);
            walkman.draw(mainSurface);
            display.blit(
                (new gamejs.font.Font('30px Sans-serif')).render(t)
            );
        return;
    }*/
    var director = new Director();
    var firstScene = new scenes.Bomb(director, 0);
    director.start(firstScene);
    return;
}

gamejs.ready(main);