export function control_ball() {
    return (game, entity) => {
        game.World.Mask[entity] |= 2 /* ControlBall */;
        game.World.ControlBall[entity] = {
        //Direction: [Math.cos(angle), Math.sin(angle)],
        };
    };
}
//# sourceMappingURL=com_control_ball.js.map