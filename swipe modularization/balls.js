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
	set_line_length(){
		this.bricks.forEach(function(brick){
			if (brick.status <= 0) return;
	
		}.bind(this))
	}
    draw_line(ctx) {
		
		this.line_length = 1000;
		this.line_width = 2; 

        ctx.fillStyle = 'blue';
        ctx.fillRect(
            this.x - this.line_length / 2,
            this.y - this.line_width / 2,
            this.line_length,
            this.line_width
        );

        ctx.translate(this.x, this.y);
        ctx.rotate(this.theta);
        ctx.translate(-this.x, -this.y);
        ctx.fillStyle = 'red';

        // Rotated rectangle
        if (this.theta > 0) {
            ctx.fillRect(this.x - this.line_length / 2, this.y - this.line_width / 2, this.line_length / 2, this.line_width);
        } else {
            ctx.fillRect(this.x, this.y - this.line_width / 2, this.line_length / 2, this.line_width);
        }

        ctx.setTransform(2, 0, 0, 2, 0, 0);
    }
    shoot() {
        this.container.forEach(
            function (ball) {
                ball.dx = ball.speed * Math.cos(this.theta);
                ball.dy = ball.speed * Math.sin(this.theta);
                if (this.theta >= 0){
					ball.dx *= -1;
					ball.dy *= -1;
				}
				
				console.log (ball.dx, ball.dy);
            }.bind(this)
        );
    }

    draw(ctx, bricks) {
        this.ctx = ctx;
		this.bricks = bricks; 
		this.set_line_length();
		
        this.container.forEach(
            function (ball) {
                ball.draw(this.ctx, bricks);
            }.bind(this)
        );

        this.draw_line(ctx);
    }
}