"use strict";

(function () {
  if (window.Asteroids === undefined) {
    window.Asteroids = {};
  }

  Asteroids.Game = function() {
    this.DIM_X = 800;
    this.DIM_Y = 800;
    this.NUM_ASTEROIDS = 10;
    this.asteroids = [];
    this.addAsteroids();
  }

  Asteroids.Game.prototype.addAsteroids = function() {
    while (this.asteroids.length < this.NUM_ASTEROIDS) {
      this.asteroids.push(new Asteroids.Asteroid(
        {pos: this.randomPosition(),
         game: this}))
    }
  };

  Asteroids.Game.prototype.randomPosition = function() {
    return [Math.random() * this.DIM_X, Math.random() * this.DIM_Y]
  };

  Asteroids.Game.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
    this.asteroids.forEach( function(asteroid) {
      asteroid.draw(ctx);
    })
  };

  Asteroids.Game.prototype.moveObjects = function () {
    this.asteroids.forEach( function(asteroid) {
      asteroid.move();
    })
  };

  Asteroids.Game.prototype.wrap = function (pos) {
    var newPos = [];

    newPos[0] = (pos[0] > this.DIM_X) ? pos[0] - this.DIM_X : pos[0];
    newPos[0] = (newPos[0] < 0) ? newPos[0] + this.DIM_X : newPos[0];

    newPos[1] = (pos[1] > this.DIM_Y) ? pos[1] - this.DIM_Y : pos[1];
    newPos[1] = (newPos[1] < 0) ? newPos[1] + this.DIM_Y : newPos[1];

    return newPos
  }

  Asteroids.Game.prototype.checkCollisions = function () {
    for (var i = 0; i < this.asteroids.length; i++) {
      for (var j = i + 1; j < this.asteroids.length - 1; j++) {
      this.asteroids[i].isCollidedWith(this.asteroids[j], this)
      };
    };
  }

  Asteroids.Game.prototype.step = function () {
    this.moveObjects();
    this.checkCollisions();
  }

  Asteroids.Game.prototype.remove = function (asteroid) {
    var updatedObjects = [];

    for (var i = 0; i < this.asteroids.length; i++) {
      if (this.asteroids[i] !== asteroid) {
        updatedObjects.push(this.asteroids[i]);
      }
    }
    this.asteroids = updatedObjects;
  }


})();
