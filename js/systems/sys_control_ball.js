import { normalize } from "../math/vec2.js";
const QUERY = 32 /* Transform2D */ | 2 /* ControlBall */;
export function sys_control_ball(game, delta) {
    for (let i = 0; i < game.World.Mask.length; i++) {
        if ((game.World.Mask[i] & QUERY) == QUERY) {
            update(game, i, delta);
        }
    }
}
let once = false;
function update(game, entity, delta) {
    let move = game.World.Move[entity];
    let transform = game.World.Transform2D[entity];
    let collide = game.World.Collide[entity];
    const left = game.InputState.ArrowLeft;
    const right = game.InputState.ArrowRight;
    if ((left || right) && !once) {
        move.Speed = 400;
        once = true;
    }
    if (transform.Translation[0] > game.ViewportWidth - 1 || transform.Translation[0] < 1) {
        move.Direction[0] *= -1;
    }
    if (transform.Translation[1] < 1) {
        move.Direction[1] *= -1;
    }
    if (transform.Translation[1] > game.ViewportHeight) {
        game.Destroy(entity);
    }
    if (collide.Collisions.length) {
        let rand = Math.random();
        if (rand < 0.01)
            move.Speed += 100;
        else if (rand > 0.01 && rand < 0.26)
            move.Speed += 20;
        else
            move.Speed += 5;
        let collision = collide.Collisions[0];
        if (collision.Hit[0]) {
            transform.Translation[0] += collision.Hit[0];
            move.Direction[0] *= -1;
        }
        if (collision.Hit[1]) {
            transform.Translation[1] += collision.Hit[1];
            move.Direction[1] *= -1;
        }
    }
    normalize(move.Direction, move.Direction);
}
//# sourceMappingURL=sys_control_ball.js.map