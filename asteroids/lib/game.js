"use strict";

(function () {
  if (window.Asteroids === undefined) {
    window.Asteroids = {};
  }

  Asteroids.Game = function() {
    this.DIM_X = 700;
    this.DIM_Y = 500;
    this.NUM_ASTEROIDS = 2;
    this.level = 1;
    this.score = 0;
    this.lives = 10;
    this.asteroids = [];
    this.addAsteroids();
    this.bullets = [];
    this.ship = new Asteroids.Ship({pos: [this.DIM_X / 2, this.DIM_Y / 2],
                                    game: this})
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

    this.allObjects().forEach( function(object) {
      object.draw(ctx);
    })
    ctx.font = "30px sans-serif";
    ctx.fillStyle = "#eee";
    ctx.fillText("Lives: " + this.lives, 10, 30);
    ctx.fillText("Score: " + this.score, 260, 30);
    ctx.fillText("Level: " + this.level, 510, 30);
  };

  Asteroids.Game.prototype.moveObjects = function () {
    if (this.lives <= 0) {
      alert("Congratulations, your score was " + this.score + ". Let's play again.")
      location.reload(true);
    }
    this.allObjects().forEach( function(object) {
      object.move();
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
    var nonAsteroids = this.nonAsteroids();
    var asteroids = this.asteroids

    for (var i = 0; i < nonAsteroids.length; i++) {
      for (var j = 0; j < asteroids.length; j++) {
        nonAsteroids[i].isCollidedWith(asteroids[j], this)
      };
    };
  }

  Asteroids.Game.prototype.step = function () {
    this.moveObjects();
    this.checkCollisions();
  }

  Asteroids.Game.prototype.remove = function (object) {
    var updatedObjects = [];

    if (object instanceof Asteroids.Asteroid) {
      for (var i = 0; i < this.asteroids.length; i++) {
        if (this.asteroids[i] !== object) {
          updatedObjects.push(this.asteroids[i]);
        }
      }
      this.asteroids = updatedObjects;
    } else {
      for (var i = 0; i < this.bullets.length; i++) {
        if (this.bullets[i] !== object) {
          updatedObjects.push(this.bullets[i]);
        }
      }
      this.bullets = updatedObjects;
    }

    if (this.asteroids.length === 0) {
      this.NUM_ASTEROIDS += 1;
      this.level += 1;
      this.addAsteroids();
    }
  };

  Asteroids.Game.prototype.allObjects = function () {
    return [this.ship].concat(this.asteroids).concat(this.bullets);
  }

  Asteroids.Game.prototype.nonAsteroids = function () {
    return [this.ship].concat(this.bullets);
  }

  Asteroids.Game.prototype.add = function (obj) {
    if (obj instanceof Asteroids.Bullet) {
      this.bullets.push(obj);
    } else {
      this.asteroids.push(obj);
    }
  }

  Asteroids.Game.prototype.isOutOfBounds = function (pos) {
    return (pos[0] > this.DIM_X) || (pos[0] < 0) ||
            (pos[1] > this.DIM_Y) || (pos[1] < 0)
  }

})();
