app.playerObject = function(x=0, y=0, spr='assets/player.png') {
    app.onTheMove.call (
        this,
        x,
        y,
        spr,
    );

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

    }
}
