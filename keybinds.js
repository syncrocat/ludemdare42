app.movement = {
    left : false,
    right : false,
    up : false,
    down : false,
    z : false,
    x : false
};

app.bindKeys = function() {
    app.key = {};

    // Movement Keys
    app.key["LEFT"] = app.keyboard(37);
    app.key["LEFT"].press = function() {
        app.movement.left = true;
    };
    app.key["LEFT"].release = function() {
        app.movement.left = false;
    };

    app.key["DOWN"] = app.keyboard(40);
    app.key["DOWN"].press = function() {
        app.movement.down = true;
    };
    app.key["DOWN"].release = function() {
        app.movement.down = false;
    };

    app.key["RIGHT"] = app.keyboard(39);
    app.key["RIGHT"].press = function() {
        app.movement.right = true;
    };
    app.key["RIGHT"].release = function() {
        app.movement.right = false;
    };

    app.key["UP"] = app.keyboard(38);
    app.key["UP"].press = function() {
        app.movement.up = true;
    };
    app.key["UP"].release = function() {
        app.movement.up = false;
    };

    app.key["SPACE"] = app.keyboard(32);
    app.key["SPACE"].press = function() {
        app.movement.throwingSpear = true;
    };
    app.key["SPACE"].release = function() {
        app.movement.throwingSpear = false;
    };
    
    app.key["Z"] = app.keyboard(90);
    app.key["Z"].press = function() {
        app.movement.z = true;
    };
    app.key["Z"].release = function() {
        app.movement.z = false;
    };
    
    app.key["X"] = app.keyboard(88);
    app.key["X"].press = function() {
        app.movement.x = true;
    };
    app.key["X"].release = function() {
        app.movement.x = false;
    };

};

/**
* Cheeky little function stolen from the internet
* https://github.com/kittykatattack/learningPixi/
*
* Binds a keycode to listen for down and up events
* Usage:
*     var aKey = keyboard(65);
*     aKey.press = function() { // do whatever };
*     aKey.release = function() { // do whatever };
*/
app.keyboard = function(keyCode) {
  var key = {};
  key.code = keyCode;
  key.isDown = false;
  key.isUp = true;
  key.press = undefined;
  key.release = undefined;
  //The `downHandler`
  key.downHandler = function(event) {
    if (event.keyCode === key.code) {
      if (key.isUp && key.press) key.press();
      key.isDown = true;
      key.isUp = false;
    }
    event.preventDefault();
  };

  // The `upHandler`
  key.upHandler = function(event) {
    if (event.keyCode === key.code) {
      if (key.isDown && key.release) key.release();
      key.isDown = false;
      key.isUp = true;
    }
    event.preventDefault();
  };

  // Attach event listeners
  window.addEventListener(
    "keydown", key.downHandler.bind(key), false
  );
  window.addEventListener(
    "keyup", key.upHandler.bind(key), false
  );
  return key;
}
