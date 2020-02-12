const QUERY = 32 /* Transform2D */ | 4 /* ControlBrick */;
export function sys_control_brick(game, delta) {
    for (let i = 0; i < game.World.Mask.length; i++) {
        if ((game.World.Mask[i] & QUERY) == QUERY) {
            update(game, i, delta);
        }
    }
}
let acceleration = 0;
function update(game, entity, delta) {
    let collide = game.World.Collide[entity];
    let transform = game.World.Transform2D[entity];
    let move = game.World.Move[entity];
    if (transform.Translation[1] > game.ViewportHeight) {
        game.Destroy(entity);
    }
    if (collide.Collisions.length) {
        move.Speed = 200;
        acceleration = 100;
        move.Direction = [0, 1];
        game.World.Mask[entity] &= ~64 /* Collide */;
        //game.Destroy(entity);
    }
    move.Speed += acceleration;
}
//# sourceMappingURL=sys_control_brick.js.map