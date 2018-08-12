app.playerObject = function(x=0, y=0, spr='assets/player/1.png') {
    app.onTheMove.call (
        this,
        x,
        y,
        spr,
    );

    // Animation
    this.sprite_state = 1; // 0 = Idle, 1 = Running;
    this.sprite_frame = 1;
    this.wheel_frame = 1;
    this.sprite.z = 0;
    this.wheel_back = new PIXI.Sprite(PIXI.loader.resources['assets/player/wheel_bg.png'].texture);
    this.wheel_front = new PIXI.Sprite(PIXI.loader.resources['assets/player/wheel_bg.png'].texture)
    this.wheel_border = new PIXI.Sprite(PIXI.loader.resources['assets/player/wheel_bg.png'].texture)
    this.wheel_back.z = -10;
    this.wheel_front.z = -10;
    this.wheel_border.z = 20;

    this.animate = function () {
        //Direction
        if (this.hitbox.vx > 0) {
            this.sprite.scale.x = 1;
            this.wheel_border.scale.x = 1;
        } else {
            this.sprite.scale.x = -1;
            this.wheel_border.scale.x = -1;
        }
        // Idle or not idle
        if (this.hitbox.vx < 2 && this.hitbox.vx > -2) {
            this.sprite_state = 0;
            this.sprite.texture = PIXI.loader.resources['assets/player/1.png'].texture;
        } else {
            this.sprite_state = 1;
        }
        // Running
        if (this.sprite_state == 1) {
            this.sprite_frame += 0.5;
            this.wheel_frame += 0.25
            if (this.sprite_frame >= 7) this.sprite_frame = 1;
            if (this.wheel_frame >= 5) this.wheel_frame = 1;
            this.sprite.texture = PIXI.loader.resources['assets/player/' + Math.floor(this.sprite_frame) + '.png'].texture;
           // this.wheel_border.texture = PIXI.loader.resources['assets/player/spoke' + Math.floor(this.wheel_frame) + '.png'].texture;
        }
        
        

    }

    this.wheelAdjust = function (x,y) {
        this.wheel_back.x = this.hitbox.x - 32;
        this.wheel_back.y = this.hitbox.y - 32;
        this.wheel_front.x = this.hitbox.x - 32;
        this.wheel_front.y = this.hitbox.y - 32;
        this.wheel_border.x = this.hitbox.x - 32 * this.wheel_border.scale.x;
        this.wheel_border.y = this.hitbox.y - 32;
    }

    this.cameraAdjust = function(x, y) {
        this.sprite.x = this.hitbox.x - 32 * this.sprite.scale.x;;
        this.sprite.y = this.hitbox.y - 32;
    }

     //Stage setup
     this.setup = function() {
        app.stage.addChild(this.sprite);
        app.stage.addChild(this.wheel_front);
        app.stage.addChild(this.wheel_back);
        //app.stage.addChild(this.wheel_border);
    }


    // "Constants"
    this.uravity = 1;
    this.groundFriction = 0;
    this.airFriction = 0;
    this.maxXSpd = 12;
    this.maxYSpd = 20;
    this.acceleration = 1;
    this.jumpHeight = 20;


    // State Variables
    this.upPressed = false;

    this.physics = function() {
        // Right Movement
        if ((app.movement.right) && !(app.movement.left)) {
            this.hitbox.vx += this.acceleration;
            if (this.hitbox.vx > this.maxXSpd) this.hitbox.vx = this.maxXSpd;
        }
        // Left Movement
        if ((app.movement.left) && !(app.movement.right)) {
            this.hitbox.vx -= this.acceleration;
            if (this.hitbox.vx < -this.maxXSpd) this.hitbox.vx = -this.maxXSpd;
        }

        // Gravity
        if (!this.hitbox.onGround) {
            this.hitbox.vy += this.uravity;
        }
        if (this.hitbox.vy > this.maxYSpd) this.hitbox.vy = this.maxYSpd;


        // Death
        if (this.hitbox.x < 0 || this.hitbox.x > app.SCREEN_WIDTH || this.hitbox.y < 0 || this.hitbox.y > app.SCREEN_HEIGHT) {
            if (app.sound === "on") {
                let deathSound = new Audio("assets/sounds/death.wav");
                deathSound.play();
            }
            
            app.dieplz = true;
            app.death.hitbox.vy = -2;
            app.death.hitbox.x = this.hitbox.x;
            app.death.hitbox.y = this.hitbox.y;
            
            this.hitbox.x = app.spawnX;
            this.hitbox.y = app.spawnY;
            this.hitbox.vx = 0;
            this.hitbox.vy = 0;
        }
    }
}
