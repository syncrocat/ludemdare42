app.collision = function(hitbox, x, y) {
    px = hitbox.x;
    py = hitbox.y;
    pvx = hitbox.vx;
    pvy = hitbox.vy;

    dist = (Math.sqrt ((px + pvx - x)**2 + (py + pvy - y)**2) )
    if (dist < 30) {
        return dist;
    } else {
        return -1;
    }
}

app.check_player_collisions = function () {

    let smallest_dist = 1000;
    let smallest_dist_x = -1;
    let smallest_dist_y = -1;
    let px = Math.round(app.player.hitbox.x)
    let py = Math.round(app.player.hitbox.y)
    for (let i = px - 100; i < px + 100; i++) {
        for (let j = py - 100; j < py + 100; j++) {
            if (i >= 0 && j >= 0 && i < app.pixel_map.length && j < app.pixel_map[0].length) {
                if (app.pixel_map[i][j] !== -1) {
                    let dist = (app.collision(app.player.hitbox, i, j));
                    if (dist !== -1 && dist < smallest_dist) {
                        smallest_dist = dist;
                        smallest_dist_x = i;
                        smallest_dist_y = j;
                    }
                }
            }
        }
    }
    
    // If you've got a hot collision
    app.player.hitbox.onGround = false;
    if (smallest_dist_x != -1) {
        let normal = app.line_map[app.pixel_map[smallest_dist_x][smallest_dist_y]].normal;
        

        
        let p = app.player.hitbox;
        let dot_product = p.vx * normal[0] + p.vy * normal[1];
        let new_velocity = [-(-2 * dot_product * normal[0] + p.vx) , -(-2 * dot_product * normal[1] + p.vy)]
        let incoming_magnitude = Math.sqrt(p.vx ** 2 + p.vy ** 2);
        let new_velocity_magnitude = Math.sqrt(new_velocity[0] ** 2 + new_velocity[1] ** 2);
        if (new_velocity_magnitude < 15) {
            new_velocity_magnitude = 15;
        }

        new_velocity[0] = new_velocity[0] / incoming_magnitude * new_velocity_magnitude;
        new_velocity[1] = new_velocity[1] / incoming_magnitude * new_velocity_magnitude;

        if (Math.abs(normal[0]) > 0.7) {
            app.player.hitbox.onGround = true;        
        }
        

        let distance_from_border = 30 - smallest_dist;
        let hypotenoose = Math.sqrt(p.vx**2 + p.vy**2)
        let amountX = p.vx / hypotenoose * distance_from_border;
        let amountY = p.vy / hypotenoose * distance_from_border;
        // signs??
        app.player.hitbox.x -= amountX * 2;
        app.player.hitbox.y -= amountY * 2;

        // Min speed: 5
        // new_v * 0.8 >= 5
        
            let newvx = new_velocity[0] * 0.8;
            let newvy = new_velocity[1] * 0.8;
            let sum = Math.abs(normal[0]) + Math.abs(normal[1])
            /*let coefficient_y = Math.abs(normal[0]) / sum
            let coefficient_x = Math.abs(normal[1]) / sum;
            let sign_y = newvy > 0 ? 1 : -1;
            let sign_x = newvx > 0 ? 1 : -1;*/
            app.player.hitbox.vx = (newvx);
            //if (app.player.hitbox.vy <= 2 && sign_y === -1) {
                
                //app.player.hitbox.vy = 0;
            //} else {
            app.player.hitbox.vy = (newvy);


            
            

            //}
    }
}