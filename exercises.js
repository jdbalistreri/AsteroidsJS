"use strict"

var sum = function() {
  var result = 0;
  for (var i = 0; i < arguments.length; i++) {
    result += arguments[i];
  }
  return result;
}

Function.prototype.myBind = function(obj) {
  var fn = this;
  var args = Array.prototype.slice.apply(arguments);
  return function() {
    var totalArgs = args.concat(Array.prototype.slice.apply(arguments));
    return fn.apply(obj, totalArgs);
  };
}

var cat = {
  meow: function(){
    console.log("meow" + sum.apply(null, arguments))
  }
}

var dog = {}

cat.meow.myBind(dog, 1, 2);


var curriedSum = function (numArgs) {
  var numbers = []
  var _curriedSum = function(num) {
    numbers.push(num)

    if (numbers.length === numArgs) {
      return sum.apply(null, numbers)
    } else {
      return _curriedSum
    }
  };

  return _curriedSum
}

Function.prototype.curry = function(numArgs) {
  var args = [];
  var fn = this;
  var _curried = function(arg) {
    var cloneArgs = args.slice();
    cloneArgs.push(arg);
    if (cloneArgs.length === numArgs) {
      return fn.apply(null, cloneArgs)
    } else {
      return _curried;
    }
  }
  return _curried;
}

Function.prototype.inherits = function(parent) {
  var Surrogate = function() {};

  Surrogate.prototype = parent.prototype;
  this.prototype = new Surrogate();
}
