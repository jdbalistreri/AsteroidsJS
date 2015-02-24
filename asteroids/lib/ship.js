"use strict";

(function() {
  if (window.Asteroids === undefined) {
    window.Asteroids = {};
  }

  Asteroids.Ship = function (properties) {
    var COLOR = "#FF0000";
    var RADIUS = 25;
    this.speed = 0;
    this.theta = -(Math.PI / 2)
    this.facing = this.theta

    Asteroids.MovingObject.call(this, {pos: properties["pos"],
                            vel: Asteroids.Util.makeVec(this.theta, this.speed),
                            radius: RADIUS,
                            color: COLOR,
                            game: properties["game"]});

  }

  Asteroids.Util.inherits(Asteroids.Ship, Asteroids.MovingObject);

  Asteroids.Ship.prototype.turn = function (dTheta) {
    this.facing = (this.facing + dTheta) % (Math.PI * 2);
  }

  Asteroids.Ship.prototype.power = function (dSpeed) {
    var newSpeed = (this.speed + dSpeed);
    this.speed = newSpeed > 10 ? 10 : newSpeed;
    this.theta = this.facing
  }

  Asteroids.Ship.prototype.draw = function(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();

    var tipPos = [this.pos[0], this.pos[1]]
    var offsetVec = Asteroids.Util.makeVec(this.facing, 25)

    ctx.moveTo(tipPos[0] + offsetVec[0], tipPos[1] + offsetVec[1])
    var vec1 = Asteroids.Util.makeVec(this.facing - 2.8, 40)
    vec1[0] = vec1[0] + offsetVec[0]
    vec1[1] = vec1[1] + offsetVec[1]
    ctx.lineTo(vec1[0] + this.pos[0], vec1[1] + this.pos[1])

    var vec2 = Asteroids.Util.makeVec(this.facing + 2.8, 40)
    vec2[0] = vec2[0] + offsetVec[0]
    vec2[1] = vec2[1] + offsetVec[1]
    ctx.lineTo(vec2[0] + this.pos[0], vec2[1] + this.pos[1])

    ctx.fill();
    ctx.closePath();

    // THIS CODE SHOWS THE HIT BOX
    // ctx.beginPath();
    // ctx.arc(
    //   this.pos[0],
    //   this.pos[1],
    //   this.radius,
    //   0,
    //   2 * Math.PI,
    //   false
    // );
    // ctx.strokeStyle = 'rgb(0,128,0)';
    // ctx.lineWidth = 5;
    // ctx.stroke();
  }

  Asteroids.Ship.prototype.tipPos = function () {
    var tipPos = [this.pos[0], this.pos[1]]
    var offsetVec = Asteroids.Util.makeVec(this.facing, 25)

    return [tipPos[0] + offsetVec[0], tipPos[1] + offsetVec[1]]
  }

  Asteroids.Ship.prototype.fireBullet = function() {
    var bullet = new Asteroids.Bullet({ direction: this.facing,
                                        pos: this.tipPos(),
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

  Asteroids.Ship.prototype.relocate = function () {
    this.speed = 0;
    this.theta = 3 / 2 * Math.PI;
    this.vel = [0,0];
    this.pos = this.game.randomPosition();
  }

  Asteroids.Ship.prototype.move = function() {
    this.vel = Asteroids.Util.makeVec(this.theta, this.speed);

    var newPos = this.pos;
    newPos[0] = this.pos[0] + this.vel[0];
    newPos[1] = this.pos[1] + this.vel[1];
    this.pos = this.game.wrap(newPos);

    if (!this.isWrappable && this.game.isOutOfBounds(newPos)) {
      this.game.remove(this);
    }

    this.speed *= .98
  }


})();
