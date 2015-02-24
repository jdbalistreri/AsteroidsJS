
(function () {

  if (window.Asteroids === undefined) {
    window.Asteroids = {};
  }

  Asteroids.Asteroid = function(properties) {
    var COLOR = "#338585";
    var RADIUS = 50;

    Asteroids.MovingObject.call(this, {pos: properties["pos"],
                            vel: properties["vel"] || Asteroids.Util.randomVec(1),
                            radius: properties["radius"] || RADIUS,
                            color: COLOR,
                            game: properties["game"]});


  };

  Asteroids.Util.inherits(Asteroids.Asteroid, Asteroids.MovingObject);

  Asteroids.Asteroid.prototype.hit = function() {

    if (this.radius > 13) {
      this.createSmallerAsteroids();
    }
    this.game.remove(this);
  }

  Asteroids.Asteroid.prototype.createSmallerAsteroids = function() {
    var largerAsteroid = this
    var newTheta = Math.random() * Math.PI / 2;

    for (var i = 0; i < 4; i++) {
      newTheta = newTheta + (i * Math.PI / 2);
      var newVector = Asteroids.Util.makeVec(newTheta, 1);

      var smallerAsteroid = new Asteroids.Asteroid({radius: largerAsteroid.radius / 2,
                                                    pos: largerAsteroid.pos,
                                                    vel: newVector,
                                                    game: largerAsteroid.game});
      largerAsteroid.game.add(smallerAsteroid);
      debugger
    }
  };

})();
