const QUERY = 32 /* Transform2D */ | 16 /* Draw */;
export function sys_draw2d(game, delta) {
    game.Context2D.resetTransform();
    game.Context2D.fillStyle = game.ClearColor;
    game.Context2D.fillRect(0, 0, game.ViewportWidth, game.ViewportHeight);
    for (let i = 0; i < game.World.Mask.length; i++) {
        if ((game.World.Mask[i] & QUERY) == QUERY) {
            let transform = game.World.Transform2D[i];
            game.Context2D.setTransform(transform.World[0], transform.World[1], transform.World[2], transform.World[3], transform.World[4], transform.World[5]);
            draw_rect(game, i);
        }
    }
}
function draw_rect(game, entity) {
    let draw = game.World.Draw[entity];
    game.Context2D.fillStyle = draw.Color;
    game.Context2D.fillRect(-draw.Width / 2, -draw.Height / 2, draw.Width, draw.Height);
}
//# sourceMappingURL=sys_draw2d.js.map