const QUERY = 32 /* Transform2D */ | 8 /* Move */;
export function sys_move(game, delta) {
    for (let i = 0; i < game.World.Mask.length; i++) {
        if ((game.World.Mask[i] & QUERY) == QUERY) {
            update(game, i, delta);
        }
    }
}
function update(game, entity, delta) {
    let direction = [
        game.World.Move[entity].Direction[0],
        game.World.Move[entity].Direction[1],
    ];
    let speed = game.World.Move[entity].Speed;
    let transform = game.World.Transform2D[entity];
    transform.Translation[0] += direction[0] * speed * delta;
    transform.Translation[1] += direction[1] * speed * delta;
    transform.Dirty = true;
}
//# sourceMappingURL=sys_move.js.map