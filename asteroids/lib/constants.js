"use strict";

(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  Asteroids.Constants = {
    asteroidRadius: 50,
    asteroidMinRadius: 13,
    asteroidSpeed: .6,

    shipMaxSpeed: 4,
    shipAcceleration: .7,
    shipTurnRadius: .045,
  }



})();
