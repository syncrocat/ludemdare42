app.SCREEN_WIDTH = 960;
app.SCREEN_HEIGHT = 720;

app.lineGraphics = new PIXI.Graphics();
app.lineGraphics.position.set(0, 0);
app.lineGraphics.lineStyle(1, 0xffffff);

app.dev_graphics = new PIXI.Graphics();
app.dev_graphics.position.set(0,0);
app.dev_graphics.lineStyle(1,0xffffff);

app.drawn_graphics = new PIXI.Graphics();
app.drawn_graphics.position.set(0,0);

app.loadJSON = function(file, callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', file, true);
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
          }
    };
    xobj.send(null);
 }

app.loadMap = function(levelNumber, callback) {
    app.loadJSON("levels/level" + levelNumber + ".json", function(response) {
        var gameMapJSON = JSON.parse(response);

        app.line_map = gameMapJSON.lineMap;

        for (let i = 0; i < app.SCREEN_WIDTH; i++) {
            for (let j = 0; j < app.SCREEN_HEIGHT; j++) {
                try {
                    if ((app.pixel_map[i][j] === -1 || app.pixel_map[i][j].drawn === 0) && gameMapJSON.pixelMap[i][j].drawn === 0) { // If not a drawn line, replace the value
                        app.pixel_map[i][j] = gameMapJSON.pixelMap[i][j];
                    }
                } catch {
                    var xd = 'nice';
                }
                
            }
        }

/*
        //app.pixel_map = gameMapJSON.pixelMap;
        app.line_map = gameMapJSON.lineMap;
*/
        app.exit_x = gameMapJSON.exit.x;
        app.exit_y = gameMapJSON.exit.y;
        // Draw that map back together
        // app.lineGraphics.clear();
        app.lineGraphics.position.set(0, 0);
        app.lineGraphics.lineStyle(5, app.level_color_map[app.levelNum - 1]);
        for (let i=0; i<app.line_map.length;i++) {
            for (let j=0; j<app.line_map[i].length-1;j++) {
                app.lineGraphics.moveTo(app.line_map[i][j].x, app.line_map[i][j].y).lineTo(app.line_map[i][j+1].x,app.line_map[i][j+1].y);
                app.dev_graphics.moveTo(app.line_map[i][j].x, app.line_map[i][j].y).lineTo(app.line_map[i][j+1].x,app.line_map[i][j+1].y);
            }
        }
        /*for (let i=0; i<app.drawn_line_map.length;i++) {
            for (let j=0; j<app.drawn_line_map[i].length-1;j++) {
                app.lineGraphics.moveTo(app.drawn_line_map[i][j].x, app.drawn_line_map[i][j].y).lineTo(app.drawn_line_map[i][j+1].x,app.drawn_line_map[i][j+1].y);
                app.dev_graphics.moveTo(app.drawn_line_map[i][j].x, app.drawn_line_map[i][j].y).lineTo(app.drawn_line_map[i][j+1].x,app.drawn_line_map[i][j+1].y);
            }
        }*/

        callback();
    });
}

app.clear_undrawn_pixels = function() {
    for (let i = 0; i < app.SCREEN_WIDTH; i++) {
        for (let j = 0; j < app.SCREEN_HEIGHT; j++) {
            try {
                if (app.pixel_map[i][j].drawn === 0) { // If not a drawn line, replace the value
                    app.pixel_map[i][j] = -1;
                }
            } catch {
                var xd = 'nice';
            }
            
        }
    }
}

app.saveMap = function(callback) {
    //console.log("Saving");
    var textObj = {
        pixelMap: app.pixel_map,
        lineMap: app.line_map,
        exit: {
            x: app.exit_x,
            y: app.exit_y
        }
    };
    var text = JSON.stringify(textObj);
    //console.log(text);
}

app.setupLevel = function(exit_x=app.exit_x, exit_y=app.exit_y) {

    if (app.levelNum == 7) {
        app.end_screen_setup();
        app.state = 'end'   
    } else {
        app.ready = false;

        app.lineGraphics.clear();
        app.dev_graphics.clear();
        app.player.hitbox.vx = 0;
        app.player.hitbox.vy = 0;
        app.spawnX = exit_x;
        app.spawnY = exit_y;
        app.player.hitbox.x = app.spawnX;
        app.player.hitbox.y = app.spawnY;
        app.clear_undrawn_pixels();
        app.loadMap(app.levelNum, () => {
            app.ready = true;
        });
    }
}
