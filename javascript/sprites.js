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

var Wire = exports.Wire = function(options) {
   Wire.superConstructor.apply(this, arguments);

   this.image = gamejs.image.load(options.image[0]);

   this.image_cut = gamejs.image.load(options.image[1]);
   this.rect = new gamejs.Rect(options.pos, [this.image.rect.width, this.image.rect.height]);

   this.isCut = false;

   return this;
};
gamejs.utils.objects.extend(Wire, gamejs.sprite.Sprite);

Wire.prototype.update = function(msDuration) {
   if (this.isCut) {
      this.image = this.image_cut;
   }
   return;
};

Wire.prototype.cut = function() {
   if (this.isCut === true) {
      return;
   }
   this.isCut = true;
   return;
};



var Pointer = exports.Pointer = function(options) {
   Pointer.superConstructor.apply(this, arguments);

   this.image_static = null;
   this.image_snippers_open = gamejs.image.load(options.snippers);
   this.rect = new gamejs.Rect([0,0,72,72]);
   this.isHidden = true;
   this.isSnippers = false;

   return this;
};
gamejs.utils.objects.extend(Pointer, gamejs.sprite.Sprite);

Pointer.prototype.update = function(msDuration) {
   if (this.isSnippers) {
      this.image = this.image_snippers_open;
      document.body.style.cursor = "none";
      this.isHidden = false;
   } else {
      this.image = this.image_static;
      document.body.style.cursor = "default";
      this.isHidden = false;
   }
   return;
};

Pointer.prototype.setSnippers = function() {
   if (this.isSnippers === true){
      return;
   }
   this.isSnippers = true;
   return;
};

Pointer.prototype.setNull = function() {
   this.isSnippers = false;
   this.isHidden = true;
   return;
};

Pointer.prototype.setPos = function(position) {
   this.rect.topleft = [position[0], position[1]-65];
   return;
};