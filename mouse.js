app.mouse_pressed = false;
app.creatingMaps = false;
app.level_color_map = [
    0xff0065, // pink
    0x65FF00, // green
    0x2B8DFC, // blue
    0xFF0000, // red
    0xFF8300, // orange
    0xBA55D3, // purple
    0xfff00, // yellow
    0xE0FFFF, // cyan
    0xffffff, // white
    0x000000, //black
]

// Mouse click and hold handlers
app.mouseDown = function () {
    app.mouse_pressed = true;
}
app.mouseUp = function () {
    app.mouse_pressed = false;
}

app.pixel = function (x, y, line, pos, drawn, level) {
    this.x = x;
    this.y = y;
    this.line = line;
    this.pos = pos;
    this.drawn = drawn;
    this.level = level;
}

// Pixel representation of this screen bullshit
app.pixel_map = []
app.line_map = []
app.drawn_line_map = []

for (i=0; i<app.SCREEN_WIDTH;i++) {
    app.pixel_map.push([])
    for (j = 0; j < app.SCREEN_HEIGHT; j++) {
        app.pixel_map[i].push(-1);
    }
}

app.putpixel = function(x,y, pos, drawn, visualize=false) {
    let line;
    let pixel;
    if (drawn === 1) {
        line = app.drawn_line_map.length - 1;
        pixel = new app.pixel(x,y,line,pos, drawn, app.levelNum);
        app.drawn_line_map[line].push(pixel);
    } else {
        line = app.line_map.length - 1;
        pixel = new app.pixel(x,y,line,pos, drawn);
        app.line_map[line].push(pixel);
    }
    
    app.pixel_map[x][y] = pixel;

    // For demonstrative/debug purposes
    if (visualize) {
        app.pixiCircle = new PIXI.Graphics();
        app.pixiCircle.lineStyle(6, 0xFF00FF);  //(thickness, color)
        app.pixiCircle.drawCircle(x, y, 1);   
        app.pixiCircle.endFill(); 
        app.stage.addChild(app.pixiCircle);
    }
}

app.draw_line = function(x, y, x2, y2, drawn) {
    if (drawn === 1) {
        app.drawn_line_map.push([]);
    } else {
        app.line_map.push([]);
    }

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
        app.putpixel(x,y, pos, drawn) ;
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
}

app.draw_line(0,0,0,app.SCREEN_HEIGHT-1, 0);
app.draw_line(0,app.SCREEN_HEIGHT-1, app.SCREEN_WIDTH-1, app.SCREEN_HEIGHT-1, 0)

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
                let normal = [slope_x / magnitude, - slope_y/ magnitude];
                
                app.draw_line(
                    app.last_mouse_x, 
                    app.last_mouse_y,
                    app.mouse_x,
                    app.mouse_y,
                    1);
                        
                console.log(app.levelNum)
                app.lineGraphics.lineStyle(6, app.level_color_map[app.levelNum - 1]);
                app.lineGraphics.moveTo(app.last_mouse_x,app.last_mouse_y).lineTo(app.mouse_x, app.mouse_y);
            }
            
        }
    }
}
