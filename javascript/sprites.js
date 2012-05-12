var gamejs = require('gamejs');

var Megaman = exports.Megaman = function(rect) {
   // call superconstructor
   Megaman.superConstructor.apply(this, arguments);
   // ever ship has its own scale
   this.originalImage = gamejs.image.load('static/sprites/gu-con.png');
   var dims = this.originalImage.getSize();

   this.image = this.originalImage;
   this.rect = new gamejs.Rect(rect);
   this.speed=[0,0];
   return this;
};

gamejs.utils.objects.extend(Megaman, gamejs.sprite.Sprite);

Megaman.prototype.update = function(msDuration){
  this.rect.moveIp(this.speed[0], this.speed[1]);
};