app.playerObj = function(x, y) {
    app.onTheMove.call (
        this,
        x,
        y,
        "assets/player.png",
    );

    // "Constants"
    this.uravity = 1;
    this.groundFriction = 1;
    this.airFriction = 1;
    this.maxXSpd = 12;
    this.maxYSpd = 20;
    this.acceleration = 1;
    this.jumpHeight = 20;

    // State Variables
    this.upPressed = false;

    this.physics = function() {
        // Temp
        this.hitbox.onGround = true;

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

        // Left/Right Friction
        if (((!app.movement.right && this.hitbox.vx > 0) || (!app.movement.left && this.hitbox.vx < 0)) && this.hitbox.vx != 0) {
            movementSign = (this.hitbox.vx / Math.abs(this.hitbox.vx));
            var friction = this.airFriction;
            if (this.hitbox.onGround) friction = this.groundFriction;
            if (Math.abs(this.hitbox.vx) - Math.abs(friction) >= 0) {
                this.hitbox.vx -= friction * movementSign;
            } else {
                this.hitbox.vx = 0;
            }
        }

        // Jumping
        if (app.movement.up) {
            if (!(this.upPressed)) {
                //Ground jump
                if (this.hitbox.onGround) {
                    this.hitbox.vy = -this.jumpHeight;
                }
            }
            this.upPressed = true;
        } else {
            this.upPressed = false;
        }

        // Gravity
        this.hitbox.vy += this.uravity;
        if (this.hitbox.vy > this.maxYSpd) this.hitbox.vy = this.maxYSpd;
    }
}
