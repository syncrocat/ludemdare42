app.SCREEN_WIDTH = 960;
app.SCREEN_HEIGHT = 720;

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
        app.pixel_map = gameMapJSON.pixelMap;
        app.line_map = gameMapJSON.lineMap;
        app.line_counter = app.line_map.length;

        // Draw that map back together
        var graphics = new PIXI.Graphics();
        graphics.position.set(0, 0);
        app.myGraph.lineStyle(1, 0xffffff);
        app.line_map.forEach(line => {
            app.myGraph.moveTo(line.start.x, line.start.y).lineTo(line.end.x, line.end.y);
        });
        callback();
    });
}

app.saveMap = function(callback) {
    console.log("Saving");
    var textObj = {
        pixelMap: app.pixel_map,
        lineMap: app.line_map
    };
    var text = JSON.stringify(textObj);
    console.log(text);
}
