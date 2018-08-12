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
    
    //Movement
    this.move = function() {
        this.hitbox.x += this.hitbox.vx;
        this.hitbox.y += this.hitbox.vy;
    };
    
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
