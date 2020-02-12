export function draw_rect(Width, Height, Color) {
    return (game, entity) => {
        game.World.Mask[entity] |= 16 /* Draw */;
        game.World.Draw[entity] = {
            Width,
            Height,
            Color,
        };
    };
}
//# sourceMappingURL=com_draw.js.map