"use strict";

(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  Asteroids.Util = {

    inherits: function (ChildClass, ParentClass) {
        function Surrogate () {};
        Surrogate.prototype = ParentClass.prototype;
        ChildClass.prototype = new Surrogate();
    },

    randomVec: function (length) {
      var x = (Math.random() * 2 - 1) * length;
      var y = Math.sqrt( Math.pow(length, 2) - Math.pow(x, 2) );
      y = y * ((Math.random() >= 0.5) ? 1 : -1);
      return [x, y];
    },

    distance: function(pos1, pos2) {
      return Math.sqrt( Math.pow(pos1[0]-pos2[0],2) + Math.pow(pos1[1]-pos2[1],2) )
    },

    // note: theta is in radians
    makeVec: function(theta, velocity) {
      var xPos = velocity * Math.cos(theta);
      var yPos = velocity * Math.sin(theta);
      return [xPos, yPos]
    }
  }



})();
