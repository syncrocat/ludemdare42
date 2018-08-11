// Create the renderer
app.SCREEN_WIDTH = 960;
app.SCREEN_HEIGHT = 720;

app.renderer = new PIXI.CanvasRenderer(app.SCREEN_WIDTH, app.SCREEN_HEIGHT);
app.renderer.backgroundColor = 0x000000;

// Add the canvas to the HTML document
document.body.appendChild(app.renderer.view);

// Create a container object called the `stage`
app.stage = new PIXI.Container();
// Allow the stage to interact with the mouse
app.stage.interactive = true;
app.stage.buttonMode = true;
app.stage.hitArea = new PIXI.Rectangle(0, 0, app.SCREEN_WIDTH, app.SCREEN_HEIGHT);
app.stage.on('mousedown', app.mouseDown)
app.stage.on('mouseup', app.mouseUp)
app.stage.addChild(app.myGraph);

/** Probably not needed code bc we're using whatdogcolor
app.pixel_map = []
for (i=0; i<app.SCREEN_WIDTH;i++) {
    app.pixel_map.push([])
    for (j = 0; j < app.SCREEN_HEIGHT; j++) {
        app.pixel_map[i].push(0)
    }
}*/

// Load sprites
PIXI.loader
    .add("assets/player.png")
    .load(function () {
        app.setup();
    });

app.setup = function () {
    // Set up keyboard input
    app.bindKeys();

    // Set up mouse
    app.mouse = new app.mouseObject(app.renderer);

    // Set up player
    app.player = new app.playerObject(100, 100);
    app.player.setup();

    // Start the game loop
    app.gameLoop();
}

app.renderer.view.addEventListener("click", (event) => {
    let x = app.mouse_x;
    let y = app.mouse_y;
    console.log(app.whatdotcolor(x, y, 50, 50)); // sample width
});

app.gameLoop = function () {
    requestAnimationFrame(app.gameLoop);
    app.play();
    app.renderer.render(app.stage);
}

app.play = function () {
    app.mouse.run();
    // Player reacts to inputs for this frame from keybinds.js
    app.player.physics();
    app.player.move();
    app.player.cameraAdjust(0,0);
}
