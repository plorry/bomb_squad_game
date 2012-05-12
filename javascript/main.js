var gamejs = require('gamejs');
var sprites = require('./sprites');
var scenes = require('./scenes');
var Director = require('./game').Director;

var Walkman = sprites.Walkman;

gamejs.preload([
  //graphics
  'static/sprites/gu-con.png',
  //sounds
  'static/sounds/testo.ogg'
]);
var speed = 7;

var sounds = {
  'test': function(){
    (new gamejs.mixer.Sound('static/sounds/testo.ogg')).play();
  }
};

function main() {
    var megaman = new Megaman([0,0]);
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
                megaman.speed = direction[event.key];
                sounds.test();
              }
              else if (event.type === gamejs.event.KEY_UP) {
                megaman.speed = 0;
              }
            });

            display.fill("#FFF")
            t++;
            megaman.update(msDuration);
            megaman.draw(mainSurface);
            display.blit(
                (new gamejs.font.Font('30px Sans-serif')).render(t)
            );
        return;
    }
    gamejs.time.fpsCallback(tick, this, 30);
}

gamejs.ready(main);