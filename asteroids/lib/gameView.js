"use strict";

(function () {
  if (window.Asteroids === undefined) {
    window.Asteroids = {};
  }

  Asteroids.GameView = function() {
    this.game = new Asteroids.Game()
    this.fireCount = 0
  };

  Asteroids.GameView.prototype.start = function(canvasEl) {
    var ctx = canvasEl.getContext("2d");

    window.setInterval((function () {
      this.bindKeyHandlers();
      this.game.step.apply(this.game);
      this.game.draw(ctx);
    }).bind(this), 1000 / 100);
  };

  Asteroids.GameView.prototype.bindKeyHandlers = function() {
    var gameView = this;

    if (key.isPressed('up'))      { gameView.game.ship.power(Asteroids.Constants.shipAcceleration) }
    // if (key.isPressed('down'))    { gameView.game.ship.power(-.5) }
    if (key.isPressed('left'))    { gameView.game.ship.turn(-1 * Asteroids.Constants.shipTurnRadius) }
    if (key.isPressed('right'))   { gameView.game.ship.turn(Asteroids.Constants.shipTurnRadius) }

    if (key.isPressed('space')) {
      if (this.fireCount > 1) {
        gameView.game.ship.fireBullet();
        this.fireCount = 0;
      } else {
        this.fireCount += 1;
      }
    }
  };

})();
