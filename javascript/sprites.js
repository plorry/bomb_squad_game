var gamejs = require('gamejs');

var Walkman = exports.Walkman = function(rect) {
   // call superconstructor
   Walkman.superConstructor.apply(this, arguments);
   // ever ship has its own scale
   this.originalImage = gamejs.image.load('static/sprites/gu-con.png');
   var dims = this.originalImage.getSize();

   this.image = this.originalImage;
   this.rect = new gamejs.Rect(rect);
   this.speed=[0,0];
   return this;
};

gamejs.utils.objects.extend(Walkman, gamejs.sprite.Sprite);

Walkman.prototype.update = function(msDuration){
  this.rect.moveIp(this.speed[0], this.speed[1]);
};