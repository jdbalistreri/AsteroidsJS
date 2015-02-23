"use strict";

(function () {
  if (window.Asteroids === undefined) {
    window.Asteroids = {};
  }

  Asteroids.GameView = function() {
    this.game = new Asteroids.Game()
  };

  Asteroids.GameView.prototype.start = function(canvasEl) {
    var ctx = canvasEl.getContext("2d");
    this.bindKeyHandlers();

    window.setInterval((function () {
      this.game.step.apply(this.game);
      this.game.draw(ctx);
    }).bind(this), 1000 / 100);
  };

  Asteroids.GameView.prototype.bindKeyHandlers = function() {
    var gameView = this;
    key('up', function() { gameView.game.ship.power(2.5) })
    key('left', function() { gameView.game.ship.turn(-.4) })
    key('right', function() { gameView.game.ship.turn(.4) })
    key('down', function() { gameView.game.ship.power(-2.5) })
    key('space', function() { gameView.game.ship.fireBullet() })
  }

})();
