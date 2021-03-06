import { from_translation, invert, multiply, rotate, scale } from "../math/mat2d.js";
const QUERY = 32 /* Transform2D */;
export function sys_transform2d(game, delta) {
    for (let i = 0; i < game.World.Mask.length; i++) {
        if ((game.World.Mask[i] & QUERY) === QUERY) {
            update(game.World.Transform2D[i]);
        }
    }
}
function update(transform) {
    if (transform.Dirty) {
        transform.Dirty = false;
        set_children_as_dirty(transform);
        from_translation(transform.World, transform.Translation);
        rotate(transform.World, transform.World, transform.Rotation);
        scale(transform.World, transform.World, transform.Scale);
        if (transform.Parent) {
            multiply(transform.World, transform.Parent.World, transform.World);
        }
        invert(transform.Self, transform.World);
    }
}
function set_children_as_dirty(transform) {
    for (let child of transform.Children) {
        child.Dirty = true;
        set_children_as_dirty(child);
    }
}
//# sourceMappingURL=sys_transform2d.js.map