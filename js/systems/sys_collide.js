const QUERY = 32 /* Transform2D */ | 64 /* Collide */;
export function sys_collide(game, delta) {
    // Collect all colliders.
    let all_colliders = [];
    for (let i = 0; i < game.World.Mask.length; i++) {
        if ((game.World.Mask[i] & QUERY) === QUERY) {
            let transform = game.World.Transform2D[i];
            let collider = game.World.Collide[i];
            // Prepare the collider for this tick.
            collider.Collisions = [];
            compute_aabb(transform, collider);
            all_colliders.push(collider);
        }
    }
    for (let i = 0; i < all_colliders.length; i++) {
        check_collisions(all_colliders[i], all_colliders);
    }
}
function compute_aabb(transform, collide) {
    //obliczyc min, max, center
    collide.Center = [transform.Translation[0], transform.Translation[1]];
    collide.Min = [
        collide.Center[0] - collide.Size[0] / 2,
        collide.Center[1] - collide.Size[1] / 2,
    ];
    collide.Max = [
        collide.Center[0] + collide.Size[0] / 2,
        collide.Center[1] + collide.Size[1] / 2,
    ];
}
function check_collisions(collider, colliders) {
    //wywoluje intersectaabb jezeli true wykonac penetrate
    for (let i = 0; i < colliders.length; i++) {
        if (collider != colliders[i] && intersect_aabb(collider, colliders[i])) {
            collider.Collisions.push({
                Other: colliders[i],
                Hit: penetrate_aabb(collider, colliders[i]),
            });
        }
    }
}
function penetrate_aabb(a, b) {
    let distance_x = a.Center[0] - b.Center[0];
    let penetration_x = a.Size[0] / 2 + b.Size[0] / 2 - Math.abs(distance_x);
    let distance_y = a.Center[1] - b.Center[1];
    let penetration_y = a.Size[1] / 2 + b.Size[1] / 2 - Math.abs(distance_y);
    if (penetration_x < penetration_y) {
        return [penetration_x * Math.sign(distance_x), 0];
    }
    else {
        return [0, penetration_y * Math.sign(distance_y)];
    }
}
function intersect_aabb(a, b) {
    return a.Min[0] < b.Max[0] && a.Max[0] > b.Min[0] && a.Min[1] < b.Max[1] && a.Max[1] > b.Min[1];
}
//# sourceMappingURL=sys_collide.js.map