"use strict";

(function() {
  if (window.Asteroids === undefined) {
    window.Asteroids = {};
  }

  Asteroids.Ship = function (properties) {
    var COLOR = "#FF0000";
    var RADIUS = 50;
    this.speed = 0;
    this.theta = -(Math.PI / 2)

    Asteroids.MovingObject.call(this, {pos: properties["pos"],
                            vel: Asteroids.Util.makeVec(this.theta, this.speed),
                            radius: RADIUS,
                            color: COLOR,
                            game: properties["game"]});

  }

  Asteroids.Util.inherits(Asteroids.Ship, Asteroids.MovingObject);

  Asteroids.Ship.prototype.turn = function (dTheta) {
    this.theta = (this.theta + dTheta) % (Math.PI * 2);
    this.vel = Asteroids.Util.makeVec(this.theta, this.speed);
  }

  Asteroids.Ship.prototype.power = function (dSpeed) {
    var newSpeed = (this.speed + dSpeed);
    this.speed = newSpeed > 10 ? 10 : newSpeed;
    this.vel = Asteroids.Util.makeVec(this.theta, this.speed);
  }

  Asteroids.Ship.prototype.draw = function(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();

    ctx.moveTo(this.pos[0], this.pos[1])
    var vec1 = Asteroids.Util.makeVec(this.theta - 2.8, 40)
    ctx.lineTo(vec1[0] + this.pos[0], vec1[1] + this.pos[1])

    var vec2 = Asteroids.Util.makeVec(this.theta + 2.8, 40)
    ctx.lineTo(vec2[0] + this.pos[0], vec2[1] + this.pos[1])
    ctx.fill();
  }

  Asteroids.Ship.prototype.fireBullet = function() {
    var bullet = new Asteroids.Bullet({ direction: this.theta,
                                        pos: this.pos,
                                        game: this.game });
    this.game.add(bullet);
    console.log(bullet);
  }

  Asteroids.Ship.prototype.isCollidedWith = function(asteroid, game) {
    if (!(asteroid instanceof Asteroids.Asteroid)) { return; }

    var distance = Asteroids.Util.distance(this.pos, asteroid.pos);
    var radiiDist = this.radius + asteroid.radius;

    if (radiiDist > distance) {
      this.relocate();
    }
  }

  // THIS IS NOT DONE!!
  Asteroids.Ship.prototype.relocate = function () {
    this.speed = 0;
    this.theta = 3 / 2 * Math.PI;
    this.vel = [0,0];
    this.pos = this.game.randomPosition();
  }


})();
