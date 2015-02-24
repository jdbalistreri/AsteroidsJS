
(function () {

  if (window.Asteroids === undefined) {
    window.Asteroids = {};
  }

  Asteroids.Asteroid = function(properties) {
    var COLOR = "#338585";
    var RADIUS = 50;

    Asteroids.MovingObject.call(this, {pos: properties["pos"],
                            vel: Asteroids.Util.randomVec(1),
                            radius: RADIUS,
                            color: COLOR,
                            game: properties["game"]});


  };

  Asteroids.Util.inherits(Asteroids.Asteroid, Asteroids.MovingObject);

})();
