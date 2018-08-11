/*
* Skeleton for any object that moves around the map
*/
app.onTheMove = function (x,y,spr) {
    //Sprite
    this.sprite = new PIXI.Sprite(PIXI.loader.resources[spr].texture);
    
    // Hitbox Variables
    this.hitbox = {};
    this.hitbox.x = x;
    this.hitbox.y = y;
    this.hitbox.vx = 0;
    this.hitbox.vy = 0;
    this.hitbox.width = this.sprite.width;
    this.hitbox.height = this.sprite.height;
    this.hitbox.onGround = false;
    this.hitbox.leftCollision = false;
    this.hitbox.rightCollision = false;
    
    //Defaults, can be overwritten in children
    /*this.collideWithJumpThru = true;*/
    
    //Collisions 
    /*this.checkMapCollisions = function () {
        var collisionsData = app.collisions.checkReactObjectMapCollision(
            this.hitbox.x,
            this.hitbox.y,
            this.hitbox.vx,
            this.hitbox.vy,
            this.hitbox.width,
            this.hitbox.height,
            this.collideWithJumpThru,
        );

        this.hitbox.vx = collisionsData.vx;
        this.hitbox.vy = collisionsData.vy;
        this.hitbox.onGround = collisionsData.onGround;
        this.hitbox.rightCollision = collisionsData.rightCollision;
        this.hitbox.leftCollision = collisionsData.leftCollision;
    }
    
    //Colliding with fellow onTheMove object --> probably gonna go in a higher class later
    this.checkObjCollisions = function (e) {
        if (this.hitbox.x < e.hitbox.x + e.hitbox.width && this.hitbox.x + this.hitbox.width > e.hitbox.x
            && this.hitbox.y < e.hitbox.y + e.hitbox.height && this.hitbox.y + this.hitbox.height > e.hitbox.y ) {
            return true;
        }
        return false;
    }*/
    
    //Movement
    this.move = function() {
        this.hitbox.x += this.hitbox.vx;
        this.hitbox.y += this.hitbox.vy;
    };
    
    //Physics
    this.physics = function () {
        /*
        There's no default implementation of physics,
        but this should be here so it doesn't break
        if physics is called and someone made a child 
        without an implementation of physics
        */
    }
    
    //Stage setup
    this.setup = function() {
        app.stage.addChild(this.sprite);
    }
    
    //Camera [Note -- this can probably be added to an even higher parent class which includes everything on the screen]
    this.cameraAdjust = function(x, y) {
        this.sprite.x = this.hitbox.x - x;
        this.sprite.y = this.hitbox.y - y;
    }
}
