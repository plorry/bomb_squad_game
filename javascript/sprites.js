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

var Obstacle = exports.Obstacle = function(options) {
   Obstacle.superConstructor.apply(this, arguments);
   this.image = gamejs.image.load(options.image);
   this.image_solved = gamejs.image.load(options.disarmed);
   this.isSolved = false;
   this.icon = options.icon;
   this.pos = options.pos;
   this.hidden = false;
   this.trap_id = options.trap_id;
   this.rect = new gamejs.Rect(this.pos, [this.image.rect.width, this.image.rect.height]);
   return this;
};
gamejs.utils.objects.extend(Obstacle, gamejs.sprite.Sprite);

Obstacle.prototype.solve = function() {
   this.image = this.image_solved;
   this.isSolved = true;
   return;
};

Obstacle.prototype.update = function() {
   return;
};

var Wire = exports.Wire = function(options) {
   Wire.superConstructor.apply(this, arguments);

   this.elapsed = 0;
   this.current_frame = 0;
   this.animation = options.image;
   this.disarmed_frames = options.disarmed;
   this.image = gamejs.image.load(this.animation[this.current_frame]);
   this.image_cut = gamejs.image.load(this.disarmed_frames[this.current_frame]);
   this.pos = options.pos;
   this.icon = options.icon;
   this.order = options.order;

   if (options.hidden == undefined) {
      this.isHidden = false;
   } else {
      this.isHidden = true;
   }

   if (options.inactive == undefined) {
      this.isActive = true;
   } else {
      this.isActive = false;
   }

   this.rect = new gamejs.Rect(options.pos, [this.image.rect.width, this.image.rect.height]);

   this.isCut = false;

   return this;
};
gamejs.utils.objects.extend(Wire, gamejs.sprite.Sprite);

Wire.prototype.update = function(msDuration) {
   if (this.isCut) {
      this.animation = this.disarmed_frames;
      this.image = gamejs.image.load(this.animation[this.current_frame]);
   }

   if (this.elapsed >= 333 && this.animation.length > 1) {
      this.elapsed = 0;
      if (this.current_frame < (this.animation.length - 1)) {
         this.current_frame++;
      } else {
         this.current_frame = 0;
      }
   }
   this.elapsed += msDuration;
   this.rect = new gamejs.Rect(this.pos, [this.image.rect.width, this.image.rect.height]);

   return;
};

Wire.prototype.cut = function() {
   if (this.isCut === true) {
      return;
   }
   this.isCut = true;
   this.isActive = false;
   this.current_frame = 0;
   return;
};

Wire.prototype.activate = function() {
   if (this.isActive === true) {
      return;
   }
   this. isActive = true;
   return;
};

Wire.prototype.show = function() {
   if (this.isHidden === false) {
      return;
   }
   this.isHidden = false;
   return;
};

var Pointer = exports.Pointer = function(options) {
   Pointer.superConstructor.apply(this, arguments);

   this.image_static = null;
   this.rect = new gamejs.Rect([0,0,72,72]);
   this.isHidden = true;
   //this.isSnippers = false;

   return this;
};
gamejs.utils.objects.extend(Pointer, gamejs.sprite.Sprite);

Pointer.prototype.update = function(msDuration) {

   if (this.image != null) {
      document.body.style.cursor = "none";
      this.isHidden = false;
   } else {
      this.image = this.image_static;
      document.body.style.cursor = "default";
      this.isHidden = true;
   }
   return;
};

Pointer.prototype.setImage = function(new_image) {
   this.image = gamejs.image.load(new_image);
   return;
};

Pointer.prototype.setNull = function() {
   this.image = null;
   this.isHidden = true;
   return;
};

Pointer.prototype.setPos = function(position) {
   this.rect.topleft = [position[0], position[1]-65];
   return;
};