app.exitObject = function(x=0, y=0, spr='assets/exit.png') {
    app.onTheMove.call (
        this,
        x,
        y,
        spr,
    );

    this.physics = function() {
        this.hitbox.x = app.exit_x;
        this.hitbox.y = app.exit_y;
    }
}
