// Create the renderer
app.renderer = new PIXI.CanvasRenderer(app.SCREEN_WIDTH, app.SCREEN_HEIGHT);
app.renderer.backgroundColor = 0x000000;

app.state = 'Menu';
app.sound = 'on';

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
app.stage.addChild(app.dev_graphics);
app.stage.addChild(app.drawn_graphics);
app.dev_graphics.z = 100;
app.lineGraphics.z = 100;
app.drawn_graphics.z = 100;

app.spawnX = 100;
app.spawnY = 100;

// Load sprites
// Load hamster sprites
for (let i = 1; i<=6;i++) PIXI.loader.add("assets/player/" + i + ".png")
for (let i = 1; i<=8;i++) PIXI.loader.add("assets/player/ball_" + i + '.png')
PIXI.loader.add("assets/player/wheel_bg.png")
PIXI.loader.add("assets/player/wheel_fg.png")
PIXI.loader
    .add("assets/temp.png")
    .add("assets/door.png")
    .add("assets/reset.png")
    .add("assets/death2.png")
    .add('assets/bg_2.png')
    .add('assets/menu_title.png')
    .add('assets/start_clicked.png')
    .add('assets/start_unclicked.png')
    .add('assets/sfx_on.png')
    .add('assets/sfx_off.png')
    .add('assets/sfx_on_clicked.png')
    .add('assets/sfx_off_clicked.png')
    .add('assets/reset_clicked.png')
    .add('assets/reset_unclicked.png')
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
    // Set up mouse
    app.menu_clicked_flag = false;
    app.sfx_clicked_flag = false;
    app.mouse = new app.mouseObject(app.renderer);
    app.run_title_plz = true;

    // Set up keyboard input
    app.exit_x = 100;
    app.exit_y = 100; 

    app.bindKeys();

    // Add a bg
    app.bg = new PIXI.Sprite(PIXI.loader.resources['assets/bg_2.png'].texture);
    app.bg.z = -10;
    app.bg.x = 0;
    app.bg.y = 0;
    app.stage.addChild(app.bg);

    // Title screen
    app.title = new PIXI.Sprite(PIXI.loader.resources['assets/menu_title.png'].texture);
    app.title.x = 0;
    app.title.y = 0;
    app.title.z = 10;
    app.title.vy = -10;
    app.stage.addChild(app.title);

    // Buttons
    app.startButton = new PIXI.Sprite(PIXI.loader.resources['assets/start_unclicked.png'].texture);
    app.startButton.x = 960 / 2 - app.startButton.width / 2 - 30;
    app.startButton.y = 720 / 2 + 100 - app.startButton.height/ 2;
    app.startButton.z = 10;
    app.stage.addChild(app.startButton)

    app.soundButton = new PIXI.Sprite(PIXI.loader.resources['assets/sfx_on.png'].texture);
    app.soundButton.x = 960 / 2 - app.soundButton.width / 2 + 80;
    app.soundButton.y = 720 / 2 + 100 - app.soundButton.height/ 2;
    app.soundButton.z = 11;
    app.stage.addChild(app.soundButton)
    

    app.levelNum = 0;
    // Start the game loop
    app.gameLoop();
}

app.gameLoop = function () {
    requestAnimationFrame(app.gameLoop);
    if (app.state == 'Menu') {
        app.menu();
    } else if (app.state == 'game') {
        app.play();
    }
    app.renderer.render(app.stage);
}

app.setup_level = function () {
    
    
    // Set up player
    app.player = new app.playerObject(100, 100, "assets/player/1.png");
    app.player.setup();

    app.death = new app.deathObject(100, 100, "assets/death2.png");
    app.death.setup();
    app.death.sprite.visible = false;
    app.death.sprite.alpha = 0.6;

    // Temp garbage
    app.pixiCircle = new PIXI.Graphics();
    app.pixiCircle.lineStyle(2, 0x000000);  //(thickness, color)
    app.pixiCircle.drawCircle(0, 0, 32);
    app.pixiCircle.endFill();
    app.stage.addChild(app.pixiCircle);

    app.exit = new app.exitObject(0, 0, "assets/door.png");
    app.exit.setup();
}

app.menu_teardown = function () {
    app.stage.removeChild(app.startButton)
    app.soundButton.x = 10;
    app.soundButton.y = 10;
}
app.menu = function () {
    app.stage.children.sort(depthCompare);
    app.mouse.get_mouse_position();
    console.log(app.mouse_y)
    // Button
    if (app.mouse_x > app.startButton.x 
        && app.mouse_y > app.startButton.y 
        && app.mouse_x < app.startButton.x + app.startButton.width 
        && app.mouse_y < app.startButton.y + app.startButton.height) {
        app.startButton.texture = PIXI.loader.resources['assets/start_clicked.png'].texture;
        if (app.mouse_pressed && !app.menu_clicked_flag) {
            app.setup_level()
            app.menu_teardown();
            app.state = 'game';
            app.menu_clicked_flag = true;
        } else {
            app.menu_clicked_flag = false
        }
    } else {
        app.menu_clicked_flag = false;
        app.startButton.texture = PIXI.loader.resources['assets/start_unclicked.png'].texture;
    }
    // Sound
    if (app.mouse_x > app.soundButton.x 
        && app.mouse_y > app.soundButton.y 
        && app.mouse_x < app.soundButton.x + app.soundButton.width 
        && app.mouse_y < app.soundButton.y + app.soundButton.height) {
        
            console.log(app.mouse_pressed)
            console.log(app.sfx_clicked_flag)
        app.soundButton.texture = PIXI.loader.resources['assets/sfx_'  + app.sound +  '_clicked.png'].texture;
        if (app.mouse_pressed) {
            if (!app.sfx_clicked_flag) {
                app.sound = app.sound == 'on' ? 'off' : 'on';
                app.sfx_clicked_flag = true;
            }
        } else {
            app.sfx_clicked_flag = false;
        }
        
    } else {
        app.sfx_clicked_flag = false;
        console.log(app.sound)
        console.log('assets/sfx_' + app.sound + '.png')
        app.soundButton.texture = PIXI.loader.resources['assets/sfx_' + app.sound + '.png'].texture;
    }
}

app.run_title = function () {
    if (app.run_title_plz) {
        app.title.vy += 1;
        app.title.y += app.title.vy;
        if (app.title.y > 960 ) {
            app.stage.removeChild(app.title)
            app.run_title_plz = false;
        }
    }
}

app.ready = true;

app.play = function () {
    if (app.ready) {

        app.run_title();
        // Sort sprites by depth
        app.stage.children.sort(depthCompare);

        app.death.physics();
        app.death.move();
        app.death.cameraAdjust(Math.round(app.death.hitbox.width / 2), Math.round(app.death.hitbox.height / 2));
        app.player.animate();
        app.pixiCircle.x = app.player.hitbox.x
        app.pixiCircle.y = app.player.hitbox.y
        app.player.wheelAdjust();
        app.mouse.get_mouse_position();
        app.mouse.run();
        // Player reacts to inputs for this frame from keybinds.js
        app.player.physics();
        app.check_player_collisions();
        app.player.move();
        app.player.cameraAdjust(0,0);

        app.exit.physics();
        app.exit.cameraAdjust(Math.round(app.exit.hitbox.width / 2), Math.round(app.exit.hitbox.height / 2));

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

        if (app.movement.v) {
            
        }

        if (app.movement.one) {
            
        }

        if (app.movement.two) {
            
        }

        if (app.movement.three) {
            
        }

        if (app.movement.four) {
            
        }

        if (app.movement.five) {
            
        }

        if (app.movement.six) {
            
        }

        if (app.movement.seven) {
            
        }

        if (app.movement.eight) {
            
        }

        if (app.movement.nine) {
            
        }

        if (app.movement.zero) {
            
        }

        if (app.movement.space) {
            
        }
    }
}
