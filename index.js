// Create the renderer
app.SCREEN_WIDTH = 960;
app.SCREEN_HEIGHT = 720;

app.renderer = PIXI.autoDetectRenderer(app.SCREEN_WIDTH, app.SCREEN_HEIGHT);
app.renderer.backgroundColor = 0xff0000;

// Add the canvas to the HTML document
document.body.appendChild(app.renderer.view);

// Create a container object called the `stage`
app.stage = new PIXI.Container();

PIXI.loader
    //.add("assets/placeholder_image.png")
    .load(function () {
        app.setup();
    });

app.setup = function () {
    // Set up keyboard input
    app.bindKeys();

    // Start the game loop
    app.gameLoop();
}

app.gameLoop = function () {
    requestAnimationFrame(app.gameLoop);
    app.play();
    app.renderer.render(app.stage);
}

app.play = function () {
    
}

app.setup();