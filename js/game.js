import { transform2d } from "./components/com_transform2d.js";
import { sys_collide } from "./systems/sys_collide.js";
import { sys_control_ball } from "./systems/sys_control_ball.js";
import { sys_control_brick } from "./systems/sys_control_brick.js";
import { sys_control_paddle } from "./systems/sys_control_paddle.js";
import { sys_draw2d } from "./systems/sys_draw2d.js";
import { sys_framerate } from "./systems/sys_framerate.js";
import { sys_move } from "./systems/sys_move.js";
import { sys_performance } from "./systems/sys_performance.js";
import { sys_transform2d } from "./systems/sys_transform2d.js";
import { World } from "./world.js";
const MAX_ENTITIES = 10000;
export class Game {
    constructor() {
        this.World = new World();
        this.ViewportWidth = window.innerWidth;
        this.ViewportHeight = window.innerHeight;
        this.UI = document.querySelector("main");
        this.InputState = { mouse_x: 0, mouse_y: 0 };
        this.InputEvent = { mouse_x: 0, mouse_y: 0, wheel_y: 0 };
        this.ClearColor = "#333";
        this.RAF = 0;
        document.addEventListener("visibilitychange", () => document.hidden ? this.Stop() : this.Start());
        window.addEventListener("keydown", evt => (this.InputState[evt.code] = 1));
        window.addEventListener("keyup", evt => (this.InputState[evt.code] = 0));
        this.UI.addEventListener("contextmenu", evt => evt.preventDefault());
        this.UI.addEventListener("mousedown", evt => {
            this.InputState[`mouse_${evt.button}`] = 1;
            this.InputEvent[`mouse_${evt.button}_down`] = 1;
        });
        this.UI.addEventListener("mouseup", evt => {
            this.InputState[`mouse_${evt.button}`] = 0;
            this.InputEvent[`mouse_${evt.button}_up`] = 1;
        });
        this.UI.addEventListener("mousemove", evt => {
            this.InputState.mouse_x = evt.offsetX;
            this.InputState.mouse_y = evt.offsetY;
            this.InputEvent.mouse_x = evt.movementX;
            this.InputEvent.mouse_y = evt.movementY;
        });
        this.UI.addEventListener("wheel", evt => {
            this.InputEvent.wheel_y = evt.deltaY;
        });
        let canvas2d = document.querySelector("canvas");
        canvas2d.width = this.ViewportWidth;
        canvas2d.height = this.ViewportHeight;
        this.Context2D = canvas2d.getContext("2d");
    }
    CreateEntity(mask = 0) {
        for (let i = 0; i < MAX_ENTITIES; i++) {
            if (!this.World.Mask[i]) {
                this.World.Mask[i] = mask;
                return i;
            }
        }
        throw new Error("No more entities available.");
    }
    Update(delta) {
        let now = performance.now();
        sys_control_paddle(this, delta);
        sys_control_ball(this, delta);
        sys_control_brick(this, delta);
        sys_move(this, delta);
        sys_transform2d(this, delta);
        sys_collide(this, delta);
        sys_draw2d(this, delta);
        // Performance.
        sys_framerate(this, delta);
        sys_performance(this, performance.now() - now, document.querySelector("#frame"));
    }
    Start() {
        let last = performance.now();
        let tick = (now) => {
            let delta = (now - last) / 1000;
            this.Update(delta);
            // Reset all input events for the next frame.
            for (let name in this.InputEvent) {
                this.InputEvent[name] = 0;
            }
            last = now;
            this.RAF = requestAnimationFrame(tick);
        };
        this.Stop();
        tick(last);
    }
    Stop() {
        cancelAnimationFrame(this.RAF);
    }
    Add({ Translation, Rotation, Scale, Using = [], Children = [] }) {
        let entity = this.CreateEntity();
        transform2d(Translation, Rotation, Scale)(this, entity);
        for (let mixin of Using) {
            mixin(this, entity);
        }
        let entity_transform = this.World.Transform2D[entity];
        for (let subtree of Children) {
            let child = this.Add(subtree);
            let child_transform = this.World.Transform2D[child];
            child_transform.Parent = entity_transform;
            entity_transform.Children.push(child_transform);
        }
        return entity;
    }
    Destroy(entity) {
        let mask = this.World.Mask[entity];
        if (mask & 32 /* Transform2D */) {
            for (let child of this.World.Transform2D[entity].Children) {
                this.Destroy(child.EntityId);
            }
        }
        this.World.Mask[entity] = 0;
    }
}
//# sourceMappingURL=game.js.map