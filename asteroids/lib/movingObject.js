"use strict";

(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var MovingObject = Asteroids.MovingObject = function (properties) {
    this.pos = properties["pos"];
    this.vel = properties["vel"];
    this.radius = properties["radius"];
    this.color = properties["color"];
    this.game = properties["game"];
    this.isWrappable = true
  };

  MovingObject.prototype.draw = function(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();

    ctx.arc(
      this.pos[0],
      this.pos[1],
      this.radius,
      0,
      2 * Math.PI,
      false
    );

    ctx.fill();
  }

  MovingObject.prototype.move = function() {
    var newPos = this.pos;
    newPos[0] = this.pos[0] + this.vel[0];
    newPos[1] = this.pos[1] + this.vel[1];
    this.pos = this.game.wrap(newPos);

    if (!this.isWrappable && this.game.isOutOfBounds(newPos)) {
      this.game.remove(this);
    }
  }

  MovingObject.prototype.isCollidedWith = function(otherObject, game) {
    throw new Error("Not implemented") 
  }
})();
