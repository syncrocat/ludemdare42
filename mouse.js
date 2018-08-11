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
            app.myGraph.moveTo(app.last_mouse_x,app.last_mouse_y).lineTo(app.mouse_x, app.mouse_y);
        }
    }
}