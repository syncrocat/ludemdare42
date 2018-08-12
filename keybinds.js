app.movement = {
    left : false,
    right : false,
    up : false,
    down : false,
    z : false,
    x : false,
    q : false
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

    app.key["Q"] = app.keyboard(81);
    app.key["Q"].press = function() {
        app.movement.q = true;
        app.lineDrawStartX = app.mouse_x;
        app.lineDrawStartY = app.mouse_y;
    };
    app.key["Q"].release = function() {
        app.movement.q = false;
        app.drawLinePlz = true;
    };

    app.key["SPACE"] = app.keyboard(32);
    app.key["SPACE"].press = function() {
        app.movement.space = true;
        app.lineGraphics.clear();
        app.pixel_map = []
        app.line_map = []
        app.drawn_line_map = []

        for (i=0; i<app.SCREEN_WIDTH;i++) {
            app.pixel_map.push([])
            for (j = 0; j < app.SCREEN_HEIGHT; j++) {
                app.pixel_map[i].push(-1);
            }
        }
    };
    app.key["SPACE"].release = function() {
        app.movement.space = false;
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

    app.key["C"] = app.keyboard(67);
    app.key["C"].press = function() {
        app.movement.c = true;
    };
    app.key["C"].release = function() {
        app.movement.c = false;
    };

    app.key["V"] = app.keyboard(87);
    app.key["V"].press = function() {
        app.movement.v = true;
        app.drawingLines = !app.drawingLines;
        console.log("Drawing lines:", app.drawingLines);
    };
    app.key["V"].release = function() {
        app.movement.v = false;
    }

    app.key["1"] = app.keyboard(49);
    app.key["1"].press = function() {
        app.movement.one = true;
        app.levelNum = 1;
        app.ready = false;
        app.loadMap(app.levelNum, () => {
            console.log("loaded");
            app.ready = true;
        });
    };
    app.key["1"].release = function() {
        app.movement.one = false;
    };

    app.key["2"] = app.keyboard(50);
    app.key["2"].press = function() {
        app.movement.two = true;
        app.levelNum = 2;
        app.ready = false;
        app.loadMap(app.levelNum, () => {
            console.log("loaded");
            app.ready = true;
        });
    };
    app.key["2"].release = function() {
        app.movement.two = false;
    };

    app.key["3"] = app.keyboard(51);
    app.key["3"].press = function() {
        app.movement.three = true;
        app.levelNum = 3;
        app.ready = false;
        app.loadMap(app.levelNum, () => {
            console.log("loaded");
            app.ready = true;
        });
    };
    app.key["3"].release = function() {
        app.movement.three = false;
    };

    app.key["4"] = app.keyboard(52);
    app.key["4"].press = function() {
        app.movement.four = true;
        app.levelNum = 4;
        app.ready = false;
        app.loadMap(app.levelNum, () => {
            console.log("loaded");
            app.ready = true;
        });
    };
    app.key["4"].release = function() {
        app.movement.four = false;
    };

    app.key["5"] = app.keyboard(53);
    app.key["5"].press = function() {
        app.movement.five = true;
        app.levelNum = 5;
        app.ready = false;
        app.loadMap(app.levelNum, () => {
            console.log("loaded");
            app.ready = true;
        });
    };
    app.key["5"].release = function() {
        app.movement.five = false;
    };

    app.key["6"] = app.keyboard(54);
    app.key["6"].press = function() {
        app.movement.six = true;
        app.levelNum = 6;
        app.ready = false;
        app.loadMap(app.levelNum, () => {
            console.log("loaded");
            app.ready = true;
        });
    };
    app.key["6"].release = function() {
        app.movement.six = false;
    };

    app.key["7"] = app.keyboard(55);
    app.key["7"].press = function() {
        app.movement.seven = true;
        app.levelNum = 7;
        app.ready = false;
        app.loadMap(app.levelNum, () => {
            console.log("loaded");
            app.ready = true;
        });
    };
    app.key["7"].release = function() {
        app.movement.seven = false;
    };

    app.key["8"] = app.keyboard(56);
    app.key["8"].press = function() {
        app.movement.eight = true;
        app.levelNum = 8;
        app.ready = false;
        app.loadMap(app.levelNum, () => {
            console.log("loaded");
            app.ready = true;
        });
    };
    app.key["8"].release = function() {
        app.movement.eight = false;
    };

    app.key["9"] = app.keyboard(57);
    app.key["9"].press = function() {
        app.movement.nine = true;
        app.levelNum = 9;
        app.ready = false;
        app.loadMap(app.levelNum, () => {
            console.log("loaded");
            app.ready = true;
        });
    };
    app.key["9"].release = function() {
        app.movement.nine = false;
    };

    app.key["0"] = app.keyboard(48);
    app.key["0"].press = function() {
        app.movement.zero = true;
        app.levelNum = 10;
        app.ready = false;
        app.loadMap(app.levelNum, () => {
            console.log("loaded");
            app.ready = true;
        });
    };
    app.key["0"].release = function() {
        app.movement.zero = false;
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
