export function control_paddle() {
    return (game, entity) => {
        game.World.Mask[entity] |= 1 /* ControlPaddle */;
        game.World.ControlPaddle[entity] = {
            Direction: [0, 0],
        };
    };
}
//# sourceMappingURL=com_control_paddle.js.map