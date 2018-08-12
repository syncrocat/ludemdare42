app.collision = function(hitbox, x, y, movement_vector=null) {
    px = hitbox.x;
    py = hitbox.y;
    pvx = movement_vector ? movement_vector[0] : 0;
    pvy = movement_vector ? movement_vector[1] : 0;

    // If collision: return distance from center of player
    // Else: return -1
    dist = (Math.sqrt ((px + pvx - x)**2 + (py + pvy - y)**2) )
    if (dist < 30) {
        return dist;
    } else {
        return -1;
    }
}

// Reflect my vect dude
function reflect (move, normal) {
	let magnitude = Math.sqrt (normal[0]**2+normal[1]**2);
	normal[0] /= magnitude;
	normal[1] /= magnitude;
    let dot_product = move[0] * normal[0] + move[1] * normal[1];
	let new_vel = [
		move[0] - 2 * dot_product * normal[0],
		move[1] - 2 * dot_product * normal[1]
	]
	return new_vel
}

ever = false
app.check_player_collisions = function () {

    // Identify movement vector
    let movement_vector = [app.player.hitbox.vx, app.player.hitbox.vy];
    let movement_vector_magnitude = Math.sqrt(app.player.hitbox.vx**2 + app.player.hitbox.vy**2)

    a = true;
    while (a) {
        // Get the closest point collision, not including pixels you're already in contact with
        let smallest_dist = 1000;
        let smallest_dist_x = -1;
        let smallest_dist_y = -1;
        let px = Math.round(app.player.hitbox.x)
        let py = Math.round(app.player.hitbox.y)
        // Currently checks a square of 200x200 pixels centered around the player
        for (let i = px - 100; i < px + 100; i++) {
            for (let j = py - 100; j < py + 100; j++) {
                if (i >= 0 && j >= 0 && i < app.pixel_map.length && j < app.pixel_map[0].length) {
                    if (app.pixel_map[i][j] !== -1) {
            
                        let collision_distance = app.collision(app.player.hitbox, i, j, movement_vector);
                        let already_collided = app.collision(app.player.hitbox, i, j) !== -1;

                        if (!already_collided && collision_distance !== -1 && collision_distance < smallest_dist) {
                            smallest_dist = collision_distance;
                            
                            smallest_dist_x = i;
                            smallest_dist_y = j;
                        }
                    }
                }
            }
        }
 
        // If no collision, exit A
        if (smallest_dist_x === -1) {
            a = false;
        // Otherwise, respond to collision, update movement vector and repeat loop
        } else {
            smallest_dist = 30 - smallest_dist;
            // Use nearby pixels to find normal
            collision_pixel = app.pixel_map[smallest_dist_x][smallest_dist_y];
            // Check for corner-case
            if (collision_pixel.last == null || collision_pixel.next == null) {
                // Reflect along plane from whenst you came
                normal = movement_vector;
            } else {
                // Get line endpoint 1 (3 pixels back of collision)
                extremity_pixel_1 = collision_pixel;
                counter = 0;
                while (extremity_pixel_1.last !== null && counter < 3) {
                    extremity_pixel_1 = extremity_pixel_1.last;
                    counter += 1;
                }
                // Get line endpoint 2 (3 pixels forward of collision)
                extremity_pixel_2 = collision_pixel;
                counter = 0;
                while (extremity_pixel_2.next !== null && counter < 3) {
                    extremity_pixel_2 = extremity_pixel_2.next;
                    counter += 1;
                }
                // Get normal of line
                line_y = (extremity_pixel_2.y - extremity_pixel_1.y)
                line_x = (extremity_pixel_2.x - extremity_pixel_1.x)
                line_magnitude = Math.sqrt(line_x**2 + line_y**2)
                normal = [line_y / line_magnitude, -line_x/ line_magnitude]
            }

            //console.log("Normal:", normal)
            //console.log("Movement:", movement_vector)
            //console.log("mag:", movement_vector_magnitude)            

            // Find unit vector of normal vector reflected across normal and inverted
            // For reference purpose:
            // movement_vector = [app.player.hitbox.vx, app.player.hitbox.vy];
            // movement_vector_magnitude = Math.sqrt(app.player.hitbox.vx**2 + app.player.hitbox.vy**2)
            reflected_vector = reflect(movement_vector, normal)
            reflected_magnitude = Math.sqrt(reflected_vector[0]**2 + reflected_vector[1]**2);
            reflected_unit_vector = [reflected_vector[0] / reflected_magnitude, reflected_vector[1] / reflected_magnitude]

            //console.log("Reflected unit vect:", reflected_unit_vector)
            //console.log("Ref magnitude:", reflected_magnitude)
            
            // Find new movement vector (reflected unit vector * (original magnitude - distance from collision pixel)
            new_magnitude = movement_vector_magnitude - smallest_dist;
            if (new_magnitude < 15) {
                new_magnitude = 15;
            }
            new_movement_vector = [reflected_unit_vector[0] * new_magnitude, reflected_unit_vector[1] * new_magnitude];

            //console.log("New magnitude:", new_magnitude)
            //console.log("new vector:", new_movement_vector)

            // Move player to collision point
            // Find unit vector of movement vector
            movement_unit_vector = [movement_vector[0] / movement_vector_magnitude, movement_vector[1] / movement_vector_magnitude];
            movement_to_pixel = [movement_unit_vector[0] * smallest_dist, movement_unit_vector[1] * smallest_dist]
            app.player.hitbox.x += movement_to_pixel[0];
            app.player.hitbox.y += movement_to_pixel[1];

            // Set movement vectors to new vectors
            movement_vector = new_movement_vector;
            movement_vector_magnitude = new_magnitude;
        }
    }
    
    // Set player speeds to newest movement vector
    app.player.hitbox.vx = movement_vector[0];
    app.player.hitbox.vy = movement_vector[1];
}