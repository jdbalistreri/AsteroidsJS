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

    window.setInterval((function () {
      this.bindKeyHandlers();
      this.game.step.apply(this.game);
      this.game.draw(ctx);
    }).bind(this), 1000 / 100);
  };

  Asteroids.GameView.prototype.bindKeyHandlers = function() {
    var gameView = this;
    // if (key.isPressed(77)) alert('M key is pressed, can ya believe it!?');
    if (key.isPressed('up'))      { gameView.game.ship.power(.5) }
    if (key.isPressed('down'))    { gameView.game.ship.power(-.5) }
    if (key.isPressed('left'))    { gameView.game.ship.turn(-.1) }
    if (key.isPressed('right'))   { gameView.game.ship.turn(.1) }
    if (key.isPressed('space'))   { gameView.game.ship.fireBullet() }

    // key('up', function() { gameView.game.ship.power(2.5) })
    // key('left', function() { gameView.game.ship.turn(-.4) })
    // key('right', function() { gameView.game.ship.turn(.4) })
    // key('down', function() { gameView.game.ship.power(-2.5) })
    // key('space', function() { gameView.game.ship.fireBullet() })
  };

})();
