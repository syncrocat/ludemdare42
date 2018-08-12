// Create the renderer
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
app.stage.on('mousedown', app.mouseDown);
app.stage.on('mouseup', app.mouseUp);
app.stage.addChild(app.lineGraphics);
app.lineGraphics.z = 100;

// Load sprites
// Load hamster sprites
for (let i = 1; i<=6;i++) PIXI.loader.add("assets/player/" + i + ".png")
for (let i = 1; i<=8;i++) PIXI.loader.add("assets/player/ball_" + i + '.png')
PIXI.loader.add("assets/player/wheel_bg.png")
PIXI.loader.add("assets/player/wheel_fg.png")
PIXI.loader
    .add("assets/temp.png")
    .add("assets/exit.png")
    .add("assets/reset.png")
    .add('assets/bg_1_small.png')
    .load(function () {
        app.setup();
    });

function depthCompare(a, b) {  
    if (a.z < b.z)     
        return -1;  
    if (a.z > b.z)    
        return 1;  
    return 0;
}

app.setup = function () {
    // Set up keyboard input
    app.bindKeys();

    // Add a bg
    app.bg = new PIXI.Sprite(PIXI.loader.resources['assets/bg_1_small.png'].texture);
    app.bg.z = -10;
    app.bg.x = 0;
    app.bg.y = 0;
    app.stage.addChild(app.bg);

    // Set up mouse
    app.mouse = new app.mouseObject(app.renderer);
    
    // Set up player
    app.player = new app.playerObject(100, 100, "assets/player/1.png");
    app.player.setup();

    // Temp garbage
    app.pixiCircle = new PIXI.Graphics();
    app.pixiCircle.lineStyle(2, 0x000000);  //(thickness, color)
    app.pixiCircle.drawCircle(0, 0, 32);   
    app.pixiCircle.endFill(); 
    app.stage.addChild(app.pixiCircle);

    app.exit = new app.exitObject(0, 0, "assets/exit.png");
    app.exit.setup();

    app.levelNum = 0;
    // Start the game loop
    app.gameLoop();
}

app.renderer.view.addEventListener("click", (event) => {
    let x
    app.pixiCircle.y = app.player.y
     = app.mouse_x;
    let y = app.mouse_y;
});

app.gameLoop = function () {
    requestAnimationFrame(app.gameLoop);
    app.play();
    app.renderer.render(app.stage);
}

app.play = function () {
    if (app.ready || true) {
        // Sort sprites by depth
        app.stage.children.sort(depthCompare);

        app.player.animate();
        app.pixiCircle.x = app.player.hitbox.x
        app.pixiCircle.y = app.player.hitbox.y
        app.player.wheelAdjust();

        app.mouse.run();
        // Player reacts to inputs for this frame from keybinds.js
        app.player.physics();
        app.check_player_collisions();
        app.player.move();
        app.player.cameraAdjust(0,0);

        app.exit.physics();
        app.exit.cameraAdjust(0, 0);

        if (app.movement.x) {
            app.saveMap(() => console.log("Map has been saved"));
        }

        if (app.movement.z) {
            app.player.hitbox.x = app.mouse_x;
            app.player.hitbox.y = app.mouse_y;
        }

        if (app.movement.c) {
            app.exit_x = app.mouse_x;
            app.exit_y = app.mouse_y;
        }

        if (app.movement.space) {
            app.levelNum += 1;
            app.ready = false;
            app.loadMap(app.levelNum, () => {
                console.log("loaded");
                app.ready = true
            });
        }
    }
}
