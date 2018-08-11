// Create the renderer
app.SCREEN_WIDTH = 960;
app.SCREEN_HEIGHT = 720;

app.renderer = PIXI.autoDetectRenderer(app.SCREEN_WIDTH, app.SCREEN_HEIGHT);
app.renderer.backgroundColor = 0xff0000;

// Add the canvas to the HTML document
document.body.appendChild(app.renderer.view);

app.myGraph = new PIXI.Graphics();
app.myGraph.position.set(0, 0);


app.mouse_up = function () {
    app.mouse_pressed = false;
}
app.mouse_down = function () {
    app.myGraph.lineStyle(5, 0xffffff)
    app.mouse_pressed = true;
}

// Create a container object called the `stage`
app.stage = new PIXI.Container();
app.stage.interactive = true;
app.stage.buttonMode = true;
app.stage.hitArea = new PIXI.Rectangle(0, 0, 960, 720);
app.stage.on('mousedown', app.mouse_down)
app.stage.on('mouseup', app.mouse_up)
app.stage.addChild(app.myGraph);

app.pixel_map = []
for (i=0; i<960;i++) {
    app.pixel_map.push([])
    for (j = 0; j < 720; j++) {
        app.pixel_map[i].push(0)
    }
}
console.log(app.pixel_map.length, app.pixel_map[0].length);

PIXI.loader
    .add("placeholder_image.png")
    .load(function () {
        app.setup();
    });

app.setup = function () {
    // Set up keyboard input
    app.bindKeys();

    // Set up player
    app.test = new PIXI.Sprite(PIXI.loader.resources["placeholder_image.png"].texture);
    app.test.x = 340;
    app.stage.addChild(app.test);
    app.mouse_state = 'off';
    app.mouse_pressed = false;

    app.c = 0;

    // Start the game loop
    app.gameLoop();
}

app.renderer.view.addEventListener("click", (event) => {
    var extract = app.renderer.plugins.extract;
    var canvas = extract.canvas();
    const context = canvas.getContext("2d");
    var rgba = context.getImageData(event.clientx, event.clienty, 1, 1).data;
    console.log(rgba);
});


app.gameLoop = function () {

    // Get mouse data
    var mouseposition = app.renderer.plugins.interaction.mouse.global;
    app.last_mouse_x = app.mouse_x;
    app.last_mouse_y = app.mouse_y;
    app.mouse_x = Math.round(mouseposition.x)
    app.mouse_y = Math.round(mouseposition.y)
    
    // Draw line when mouse pressed
    if (app.mouse_pressed) {
        app.myGraph.moveTo(app.last_mouse_x,app.last_mouse_y).lineTo(app.mouse_x, app.mouse_y);
    }

    requestAnimationFrame(app.gameLoop);
    app.play();
    app.renderer.render(app.stage);
}

app.play = function () {
    
}

app.setup();