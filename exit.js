app.exitObject = function(x=0, y=0, spr='assets/exit.png') {
    app.onTheMove.call (
        this,
        x,
        y,
        spr,
    );

    this.sprite.z = 100;

    this.physics = function() {
        this.hitbox.x = app.exit_x;
        this.hitbox.y = app.exit_y;

        

        //console.log(this.hitbox.width, this.hitbox.height);
        // Check for collisions with player
        let distx = Math.abs(this.hitbox.x - app.player.hitbox.x);
        let disty = Math.abs(this.hitbox.y - app.player.hitbox.y);
        //console.log(distx, disty);
        if (Math.sqrt(distx ** 2 + disty ** 2) <= (app.player.hitbox.width + 20) / 2) {
            // Next level
            //console.log("Intersecting exit:", this.hitbox.x, this.hitbox.y, app.player.hitbox.x, app.player.hitbox.y);
            app.levelNum += 1;
            app.setupLevel();
        }
    }
}
