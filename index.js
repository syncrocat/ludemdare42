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
//app.stage.addChild(app.dev_graphics);
app.stage.addChild(app.drawn_graphics);
//app.dev_graphics.z = 100;
app.lineGraphics.z = 100;
app.drawn_graphics.z = 100;

app.spawnX = 100;
app.spawnY = 100;

// Load sprites
// Load hamster sprites
for (let i = 1; i<=6;i++) PIXI.loader.add("assets/player/" + i + ".png")
for (let i = 1; i<=4;i++) PIXI.loader.add("assets/player/spoke" + i + '.png')
for (let i = 1; i<=8;i++) PIXI.loader.add("assets/" + i + '.png')
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
    .add('assets/death_clicked.png')
    .add('assets/death_unclicked.png')
    .add('assets/end_bg.png')
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
    app.reset_clicked_flag = false;
    app.death_clicked_flag = false;
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

    app.resetButton = new PIXI.Sprite(PIXI.loader.resources['assets/reset_unclicked.png'].texture);
    app.resetButton.x = 70;
    app.resetButton.y = 10;
    app.resetButton.z = 10;

    app.deathButton = new PIXI.Sprite(PIXI.loader.resources['assets/death_unclicked.png'].texture);
    app.deathButton.x = 130;
    app.deathButton.y = 10;
    app.deathButton.z = 10;
    

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
    } else if (app.state == 'end') {
        app.end_screen();
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


    // Set up reset button
    
    app.stage.addChild(app.resetButton)
    app.stage.addChild(app.deathButton)

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
    //console.log(app.mouse_y)
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
        
            //console.log(app.mouse_pressed)
            //console.log(app.sfx_clicked_flag)
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
        //console.log(app.sound)
       // console.log('assets/sfx_' + app.sound + '.png')
        app.soundButton.texture = PIXI.loader.resources['assets/sfx_' + app.sound + '.png'].texture;
    }
}

app.end_screen_setup = function () {
    for (var i = app.stage.children.length - 1; i >= 0; i--) {	
        app.stage.removeChild(app.stage.children[i]);
    };
    // Add a bg
    app.bgbg = new PIXI.Sprite(PIXI.loader.resources['assets/end_bg.png'].texture);
    app.bgbg.z = -10;
    app.bgbg.x = 0;
    app.bgbg.y = 0;
    app.stage.addChild(app.bgbg);
    // Add a bg

    app.danceman = new PIXI.Sprite(PIXI.loader.resources['assets/1.png'].texture);
    app.danceman.z = 10;
    app.danceman.x = 600;
    app.danceman.y = 450;
    app.stage.addChild(app.danceman);
    
}
app.frameyframey = 1;
app.end_screen = function () {
    app.frameyframey += 0.25;
    if (app.frameyframey >= 9) app.frameyframey = 1;
    app.danceman.texture = PIXI.loader.resources['assets/' + Math.floor(app.frameyframey) + '.png'].texture;
}

app.game_buttons = function () {
    
    // Sound
    if (app.mouse_x > app.soundButton.x 
        && app.mouse_y > app.soundButton.y 
        && app.mouse_x < app.soundButton.x + app.soundButton.width 
        && app.mouse_y < app.soundButton.y + app.soundButton.height) {
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
        app.soundButton.texture = PIXI.loader.resources['assets/sfx_' + app.sound + '.png'].texture;
    }

    // Reset Button
    if (app.mouse_x > app.resetButton.x 
        && app.mouse_y > app.resetButton.y 
        && app.mouse_x < app.resetButton.x + app.resetButton.width 
        && app.mouse_y < app.resetButton.y + app.resetButton.height) {
        app.resetButton.texture = PIXI.loader.resources['assets/reset_clicked.png'].texture;
        if (app.mouse_pressed) {
            if (!app.reset_clicked_flag) {
                app.levelNum = 1;
                
                app.reset_pixel_map();
                app.line_map = []
                app.drawn_line_map = []
                

                app.drawn_graphics.clear();
                
                app.setupLevel(100,100);
                app.reset_clicked_flag = true;
            }
        } else {
            app.reset_clicked_flag = false;
        }
    } else {
        app.reset_clicked_flag = false;
        app.resetButton.texture = PIXI.loader.resources['assets/reset_unclicked.png'].texture;
    }

    // Reset Button
    if (app.mouse_x > app.deathButton.x 
        && app.mouse_y > app.deathButton.y 
        && app.mouse_x < app.deathButton.x + app.deathButton.width 
        && app.mouse_y < app.deathButton.y + app.deathButton.height) {
        app.deathButton.texture = PIXI.loader.resources['assets/death_clicked.png'].texture;
        if (app.mouse_pressed) {
            if (!app.death_clicked_flag) {
                //die
                app.dieplz = true;
                app.death.hitbox.vy = -2;
                app.death.hitbox.x = app.player.hitbox.x;
                app.death.hitbox.y = app.player.hitbox.y;
                
                app.player.hitbox.x = app.spawnX;
                app.player.hitbox.y = app.spawnY;
                app.player.hitbox.vx = 0;
                app.player.hitbox.vy = 0;
                app.death_clicked_flag = true;
            }
        } else {
            app.death_clicked_flag = false;
        }
    } else {
        app.death_clicked_flag = false;
        app.deathButton.texture = PIXI.loader.resources['assets/death_unclicked.png'].texture;
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
    app.stage.children.sort(depthCompare);
    if (app.ready) {

        app.run_title();
        // Sort sprites by depth
        app.stage.children.sort(depthCompare);
        app.game_buttons();

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
