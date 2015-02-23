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
      this.game.step.apply(this.game);
      this.game.draw(ctx);
    }).bind(this), 1000 / 60);
  };

})();
