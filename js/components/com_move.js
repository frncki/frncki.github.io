export function move(Speed, Direction) {
    return (game, entity) => {
        game.World.Mask[entity] |= 8 /* Move */;
        game.World.Move[entity] = {
            Direction,
            Speed,
        };
    };
}
//# sourceMappingURL=com_move.js.map