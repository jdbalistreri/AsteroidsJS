#Cosmos!

Cosmos! is a remake of the game Asteroids inspired by Carl Sagan's classic Cosmos series. It is a browser-based implementation in Node.js that uses HTML5's Canvas for the UI.

<a href="http://www.joebalistreri.net/AsteroidsJS/" target="_blank">Play Cosmos! live now!</a>

##Features
- Tracks lives, level, and high score
- Removes asteroids hit by bullets. Large asteroids break into smaller ones
- Ship accelerates and turns based on key input. Ship physics true to original Asteroids game

##Implementation
- Asteroids, bullets, and ships inherit from [moving object superclass][moving-object] containing draw and move methods
- [Game class][game] calculates collisions and removes appropriate pieces
- [Ship][ship] tracks speed and velocity in order to generate vectors
- Vector math implemented by custom [utility-class]


[moving-object]: ./asteroids/lib/movingObject.js
[utility-class]: ./asteroids/lib/utils.js
[ship]: ./asteroids/lib/ship.js
[game]: ./asteroids/lib/game.js
