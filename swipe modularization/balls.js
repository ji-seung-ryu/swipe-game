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

		this.line_length = 1000;
		this.all_ball_alive = 0; 
        this.container = new Array();
        

        document.addEventListener('mousemove', this.set_theta.bind(this), false);

        document.addEventListener('click', this.shoot.bind(this), false);
    }

    set_theta(e) {
		if (this.all_ball_alive == 1) return;
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
		if (this.all_ball_alive == 1) return;
		var celing_x = (this.stage_min_height - this.y)/this.tan + this.x;
		
		var line_length_cand = 2*Math.sqrt((celing_x- this.x) * (celing_x - this.x) + (this.stage_min_height - this.y) * (this.stage_min_height-this.y))  ;
		
		this.bricks.forEach(function(brick){
			if (brick.status <= 0) return;
			var x1 = brick.x;
			var y1= brick.y + brick.height;
			var x2 = brick.x + brick.width;
			var y2 = brick.y + brick.height;
			var x3 = brick.x + brick.width;
			var y3 = brick.y;
			var x4 = brick.x;
			var y4 = brick.y;
			
			
			var x_bot = (y1-this.y)/ this.tan + this.x;
			if (x_bot >= x1 && x_bot <= x2){
				line_length_cand = Math.min(line_length_cand, 2*Math.sqrt((x_bot- this.x)* (x_bot-this.x) + (y1-this.y)* (y1-this.y))); 
			}
			
			var y_left = this.tan * (x1-this.x) +this.y;
			
			if (y_left >= y4 && y_left <= y1){
				line_length_cand = Math.min(line_length_cand, 2*Math.sqrt((x1- this.x)* (x1-this.x) + (y_left-this.y)* (y_left-this.y))); 
			}
			
			var y_right = this.tan*(x2-this.x) + this.y;
			
			if (y_right >= y3 && y_right <= y2){
				line_length_cand = Math.min(line_length_cand, 2*Math.sqrt((x2- this.x)* (x2-this.x) + (y_right-this.y)* (y_right-this.y))); 
			}
			
			
			
	
		}.bind(this))
		
		this.line_length = line_length_cand;
	}
    draw_line(ctx) {
		if (this.all_ball_alive == 1) return;
		this.line_width = 2; 

        ctx.fillStyle = 'black';
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
		if (this.all_ball_alive == 1) return;
		
		this.all_ball_alive = 1; 
        this.container.forEach(
            function (ball) {
                ball.dx = ball.speed * Math.cos(this.theta);
                ball.dy = ball.speed * Math.sin(this.theta);
                if (this.theta >= 0){
					ball.dx *= -1;
					ball.dy *= -1;
				}
				
            }.bind(this)
        );
    }
	
	check_all_ball_alive(){
		var all_ball_alive = 0; 
		var all_ball_dead = 0; 
        this.container.forEach(
            function (ball) {
				if (all_ball_dead == 0){
					if (ball.survived == 0 ) this.x = ball.x;
				}
				
				
				all_ball_alive += ball.survived;
				all_ball_dead += !ball.survived;
            }.bind(this)
        );
		
		if (all_ball_alive == 0) this.all_ball_alive = 0; 
	}	
	
	init_balls (){
		// how do i empty an array  ?
		
		this.container = [];
		this.container.push(
            new Ball(1, this.x, this.y, 0, 0, this.stageWidth, this.stage_min_height, this.stage_max_height)
        );
	}
    draw(ctx, bricks) {
        this.ctx = ctx;
		this.bricks = bricks; 
		this.set_line_length();
		this.check_all_ball_alive();
		
        this.container.forEach(
            function (ball) {
				ball.draw(this.ctx, bricks);
            }.bind(this)
        );
		
        this.draw_line(ctx);
		if (this.all_ball_alive == 0) this.init_balls();

    }
}