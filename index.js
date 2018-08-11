// Create the renderer
app.SCREEN_WIDTH = 960;
app.SCREEN_HEIGHT = 720;

app.renderer = new PIXI.CanvasRenderer(app.SCREEN_WIDTH, app.SCREEN_HEIGHT);
app.renderer.backgroundColor = 0x000000;

// Add the canvas to the HTML document
document.body.appendChild(app.renderer.view);

app.myGraph = new PIXI.Graphics();
app.myGraph.position.set(0, 0);


app.mouse_up = function () {
    app.mouse_pressed = false;
}
app.mouse_down = function () {
    app.myGraph.lineStyle(1, 0xffffff)
    app.mouse_pressed = true;
}

// Create a container object called the `stage`
app.stage = new PIXI.Container();
app.stage.interactive = true;
app.stage.buttonMode = true;
app.stage.hitArea = new PIXI.Rectangle(0, 0, app.SCREEN_WIDTH, app.SCREEN_HEIGHT);
app.stage.on('mousedown', app.mouse_down)
app.stage.on('mouseup', app.mouse_up)
app.stage.addChild(app.myGraph);

app.pixel_map = []
for (i=0; i<app.SCREEN_WIDTH;i++) {
    app.pixel_map.push([])
    for (j = 0; j < app.SCREEN_HEIGHT; j++) {
        app.pixel_map[i].push(0)
    }
}
console.log(app.pixel_map.length, app.pixel_map[0].length);

PIXI.loader
    .add("assets/player.png")
    .load(function () {
        app.setup();
    });

app.setup = function () {
    // Set up keyboard input
    app.bindKeys();

    // Set up player
    app.test = new PIXI.Sprite(PIXI.loader.resources["assets/player.png"].texture);
    app.test.x = 340;
    app.stage.addChild(app.test);
    app.mouse_state = 'off';
    app.mouse_pressed = false;

    app.c = 0;
    app.player = new app.playerObj(100, 100);
    app.player.setup();

    // Start the game loop
    app.gameLoop();
}

app.renderer.view.addEventListener("click", (event) => {
    let x = app.mouse_x;
    let y = app.mouse_y;
    let context = app.renderer.context;
    let rgba = context.getImageData(x, y, 1, 1).data;
    // let rgba = extract.pixels(app.stage);
    let count = 0;
    rgba.forEach(r => {
        if (r != 0) {
            count += 1;
            
        }
        
    });
    console.log(count);
    // And here's components of a pixel on (x, y):
    let pixelR = rgba[4 * (y * app.SCREEN_WIDTH + x)];
    let pixelG = rgba[4 * (y * app.SCREEN_WIDTH + x) + 1];
    let pixelB = rgba[4 * (y * app.SCREEN_WIDTH + x) + 2];
    let pixelA = rgba[4 * (y * app.SCREEN_WIDTH + x) + 3];
    console.log(x, y);
    console.log(pixelR, pixelG, pixelB, pixelA);
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
    // Player reacts to inputs for this frame from keybinds.js
    app.player.physics();
    app.player.move();
    app.player.cameraAdjust(0,0);
}
