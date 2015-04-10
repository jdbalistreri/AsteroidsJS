(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  Asteroids.Constants = {
    asteroidRadius: 50,
    asteroidMinRadius: 13,
    asteroidSpeed: 0.6,

    shipMaxSpeed: 4,
    shipAcceleration: 0.7,
    shipTurnRadius: 0.045,
  };



})();
