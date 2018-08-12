app.deathObject = function(x=0, y=0, spr='assets/death2.png') {
    app.onTheMove.call (
        this,
        x,
        y,
        spr,
    );

    this.sprite.z = 10;

    app.dieplz = false;
    this.frameCount = 0;
    this.physics = function() {
        if (app.dieplz) {
            app.death.sprite.visible = true;
            this.frameCount += 1;
            if (this.frameCount > 50) {
                this.hitbox.vy = 0;
                this.sprite.visible = false;
                app.dieplz = false;
                this.frameCount = 0;
            }
        }
    }
}
