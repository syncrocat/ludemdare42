app.SCREEN_WIDTH = 960;
app.SCREEN_HEIGHT = 720;

app.lineGraphics = new PIXI.Graphics();
app.lineGraphics.position.set(0, 0);
app.lineGraphics.lineStyle(1, 0xffffff);

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

        for (let i = 0; i < gameMapJSON.pixelMap.length; i++) {
            for (let j = 0; j < gameMapJSON.pixelMap[i].length; j++) {
                if (app.pixel_map[i][j][1] === 0) { // If not a drawn line, replace the value
                    app.pixel_map[i][j] = gameMapJSON.pixelMap[i][j];
                }
            }
        }

        //app.pixel_map = gameMapJSON.pixelMap;
        app.line_map = gameMapJSON.lineMap;

        app.exit_x = gameMapJSON.exit.x;
        app.exit_y = gameMapJSON.exit.y;
        // Draw that map back together
        app.lineGraphics.clear();
        app.lineGraphics.position.set(0, 0);
        app.lineGraphics.lineStyle(1, 0xffffff);
        app.line_map.forEach(line => {
            app.lineGraphics.moveTo(line.start.x, line.start.y).lineTo(line.end.x, line.end.y);
        });
        app.drawn_line_map.forEach(line => {
            app.lineGraphics.moveTo(line.start.x, line.start.y).lineTo(line.end.x, line.end.y);
        });
        callback();
    });
}

app.saveMap = function(callback) {
    console.log("Saving");
    var textObj = {
        pixelMap: app.pixel_map,
        exit: {
            x: app.exit_x,
            y: app.exit_y
        }
    };
    var text = JSON.stringify(textObj);
    console.log(text);
}
