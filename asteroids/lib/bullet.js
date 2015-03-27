"use strict";

(function () {
  if (window.Asteroids === undefined) {
    window.Asteroids = {};
  }

  Asteroids.Bullet = function(properties) {
    var bulletVelocity = Asteroids.Util.makeVec(properties["direction"], 12)

    Asteroids.MovingObject.call(this, {radius: 5,
                            pos: properties["pos"],
                            vel: bulletVelocity,
                            color: "#fff",
                            game: properties["game"]
    })

    this.isWrappable = false;
  }

  Asteroids.Util.inherits(Asteroids.Bullet, Asteroids.MovingObject)

  Asteroids.Bullet.prototype.isCollidedWith = function(asteroid, game) {
    if (!(asteroid instanceof Asteroids.Asteroid)) { return; }

    var distance = Asteroids.Util.distance(this.pos, asteroid.pos);
    var radiiDist = this.radius + asteroid.radius;

    if (radiiDist > distance) {
      asteroid.hit();
      game.remove(this);
    }
  }

})();
