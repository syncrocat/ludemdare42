app.mouse_pressed = false;
app.creatingMaps = false;

// Mouse click and hold handlers
app.mouseDown = function () {
    app.mouse_pressed = true;
}
app.mouseUp = function () {
    app.mouse_pressed = false;
}

app.pixel = function (x, y, line, pos) {
    this.x = x;
    this.y = y;
    this.line = line;
    this.pos = pos;
}

// Pixel representation of this screen bullshit
app.pixel_map = []
app.line_map = []

for (i=0; i<app.SCREEN_WIDTH;i++) {
    app.pixel_map.push([])
    for (j = 0; j < app.SCREEN_HEIGHT; j++) {
        app.pixel_map[i].push(-1);
    }
}
app.drawn_line_counter  = 0;

app.putpixel = function(x,y, line,pos, visualize=false) {
    let pixel = new app.pixel(x,y,line,pos);
    app.pixel_map[x][y] = pixel;
    app.line_map[line].push(pixel);

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
    app.line_map.push([]);
    w = x2 - x ;
    h = y2 - y ;
    dx1 = 0
    dy1 = 0
    dx2 = 0 
    dy2 = 0
    let pos = 0;
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
        app.putpixel(x,y, app.drawn_line_counter, pos) ;
        pos += 1;
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
    app.drawn_line_counter++;
}

app.draw_line(0,0,0,app.SCREEN_HEIGHT-1);
app.draw_line(0,app.SCREEN_HEIGHT-1, app.SCREEN_WIDTH-1, app.SCREEN_HEIGHT-1)

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
               /* let slope_y = (app.mouse_y - app.last_mouse_y);
                let slope_x = (app.mouse_x - app.last_mouse_x);
                let magnitude = Math.sqrt(slope_x**2 + slope_y**2)
                let normal = [slope_x / magnitude, slope_y/ magnitude];

                app.line_map.push(normal);
                console.log(normal);*/
                
                app.draw_line(
                    app.last_mouse_x, 
                    app.last_mouse_y,
                    app.mouse_x,
                    app.mouse_y);

                app.lineGraphics.moveTo(app.last_mouse_x,app.last_mouse_y).lineTo(app.mouse_x, app.mouse_y);
            }
            
        }
    }
}
