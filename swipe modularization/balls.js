import { Ball } from './ball.js';
export class Balls {
    constructor(x, y, stageWidth, stage_min_height, stage_max_height, canvas, ctx) {
        this.x = x;
        this.y = y;
        this.stageWidth = stageWidth;
        this.stage_min_height = stage_min_height;
        this.stage_max_height = stage_max_height;
        this.canvas = canvas;
        this.ctx = ctx;

        this.container = new Array();
        this.container.push(
            new Ball(1, x, y, 0, 0, this.stageWidth, this.stage_min_height, this.stage_max_height)
        );

        document.addEventListener('mousemove', this.set_theta.bind(this), false);
        document.addEventListener('click', this.shoot.bind(this), false);
    }

    set_theta(e) {
        var relativeX = e.clientX - this.canvas.offsetLeft;
        var relativeY = e.clientY - this.canvas.offsetTop;

        if (
            relativeY > this.stage_max_height ||
            relativeY < this.stage_min_height ||
            relativeX < 0 ||
            relativeX > this.stageWidth
        )
            return;

        this.tan = (this.y - relativeY) / (this.x - relativeX);

        this.theta = Math.atan(this.tan);
    }
    draw_line(ctx) {
        var arrow_width = 100;
        var arrow_height = 2;

        ctx.fillStyle = 'blue';
        ctx.fillRect(
            this.x ,
            this.y - arrow_height / 2,
            arrow_width,
            arrow_height
        );

        ctx.translate(this.x , this.y);
        ctx.rotate(this.theta);
        ctx.translate(-this.x, -this.y);

        // Rotated rectangle
        ctx.fillStyle = 'red';
        ctx.fillRect(
            this.x ,
            this.y - arrow_height / 2,
            arrow_width,
            arrow_height
        );

        ctx.setTransform(2, 0, 0, 2, 0, 0);
    }
    shoot() {
        this.container.forEach(
            function (ball) {
	            ball.dx = ball.speed * Math.cos (this.theta);
				ball.dy = ball.speed * Math.sin (this.theta);
				if (this.theta >= 0) ball.dx *= -1;				
            }.bind(this)
        );
    }

    draw(ctx, bricks) {
        this.ctx = ctx;

        this.container.forEach(
            function (ball) {
                ball.draw(this.ctx, bricks);
            }.bind(this)
        );

        this.draw_line(ctx);
    }
}