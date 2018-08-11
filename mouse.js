// Graphics object to draw lines to
app.myGraph = new PIXI.Graphics();
app.myGraph.position.set(0, 0);
app.myGraph.lineStyle(1, 0xffffff);
app.mouse_pressed = false;

// Mouse click and hold handlers
app.mouseDown = function () {
    app.mouse_pressed = true;
}
app.mouseUp = function () {
    app.mouse_pressed = false;
}

// Pixel representation of this screen bullshit
app.pixel_map = []
for (i=0; i<960;i++) {
    app.pixel_map.push([])
    for (j = 0; j < 720; j++) {
        if (j == 719) {
            app.pixel_map[i].push(0)
        } else {
            app.pixel_map[i].push(-1);
        }
    }
}
// Line representation of this screen bullshit
app.line_map = [[1,0]];
app.line_counter = 1;

app.putpixel = function(x,y, visualize=false) {
    app.pixel_map[x][y] = app.line_counter;

    // For demonstrative/debug purposes
    if (visualize) {
        app.pixiCircle = new PIXI.Graphics();
        app.pixiCircle.lineStyle(2, 0xFF00FF);  //(thickness, color)
        app.pixiCircle.drawCircle(x, y, 1);   
        app.pixiCircle.endFill(); 
        app.stage.addChild(app.pixiCircle);
    }
}

app.draw_line = function(x, y, x2, y2) {
    w = x2 - x ;
    h = y2 - y ;
    dx1 = 0
    dy1 = 0
    dx2 = 0 
    dy2 = 0
    if (w<0) dx1 = -1 ; else if (w>0) dx1 = 1 ;
    if (h<0) dy1 = -1 ; else if (h>0) dy1 = 1 ;
    if (w<0) dx2 = -1 ; else if (w>0) dx2 = 1 ;
    longest = Math.abs(w) ;
    shortest = Math.abs(h) ;
    if (!(longest>shortest)) {
        longest = Math.abs(h) ;
        shortest = Math.abs(w) ;
        if (h<0) dy2 = -1 ; else if (h>0) dy2 = 1 ;
        dx2 = 0 ;            
    }
    numerator = longest >> 1 ;
    for (let i=0;i<=longest;i++) {
        app.putpixel(x,y) ;
        numerator += shortest ;
        if (!(numerator<longest)) {
            numerator -= longest ;
            x += dx1 ;
            y += dy1 ;
        } else {
            x += dx2 ;
            y += dy2 ;
        }
    }
}

app.mouseObject = function (renderer) {
    this.renderer = renderer;

    this.run = function () {
        // Get mouse data
        var mouseposition = this.renderer.plugins.interaction.mouse.global;
        app.last_mouse_x = app.mouse_x;
        app.last_mouse_y = app.mouse_y;
        app.mouse_x = Math.round(mouseposition.x)
        app.mouse_y = Math.round(mouseposition.y)
        
        // Draw line when mouse pressed
        if (app.mouse_pressed) {
            
            if (app.mouse_x != app.last_mouse_x || app.mouse_y != app.last_mouse_y) {
                let slope_y = (app.mouse_y - app.last_mouse_y);
                let slope_x = (app.mouse_x - app.last_mouse_x);
                let magnitude = Math.sqrt(slope_x**2 + slope_y**2)
                let normal = [slope_x / magnitude, slope_y/ magnitude];

                app.line_map.push(normal);
                console.log(normal);
                
                app.draw_line(
                    app.last_mouse_x, 
                    app.last_mouse_y,
                    app.mouse_x,
                    app.mouse_y);
                app.line_counter++;
                
                app.myGraph.moveTo(app.last_mouse_x,app.last_mouse_y).lineTo(app.mouse_x, app.mouse_y);
            }
            
        }
    }
}