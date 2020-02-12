export function control_brick() {
    return (game, entity) => {
        game.World.Mask[entity] |= 4 /* ControlBrick */;
    };
}
//# sourceMappingURL=com_control_brick.js.map