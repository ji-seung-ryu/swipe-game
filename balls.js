import { Blue_ball } from './blue_ball.js';
import {Green_ball} from './green_ball.js';
export class Balls {
    constructor(x, y, stageWidth, stage_min_height, stage_max_height, canvas, ctx, bricks,record) {
        this.x = x;
        this.y = y;
        this.stageWidth = stageWidth;
        this.stage_min_height = stage_min_height;
        this.stage_max_height = stage_max_height;
        this.canvas = canvas;
        this.ctx = ctx;
		this.bricks = bricks;
		this.record = record; 
		
		this.dead_green_cnt = 0; 
		this.initiated = 0; 
        this.line_length = 1000;
        this.all_ball_alive = 0;
        this.blue_container = new Array();
		this.green_container = new Array();
        this.blue_ball_cnt = 0;
		this.brick_width = bricks.brick_width;
		this.brick_height = bricks.brick_height;

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
    set_line_length() {
        if (this.all_blue_ball_alive == 1) return;
        var celing_x = (this.stage_min_height - this.y) / this.tan + this.x;

        var line_length_cand =
            2 *
            Math.sqrt(
                (celing_x - this.x) * (celing_x - this.x) +
                    (this.stage_min_height - this.y) * (this.stage_min_height - this.y)
            );

        this.bricks.container.forEach(
            function (brick) {
                if (brick.status <= 0) return;
                var x1 = brick.x;
                var y1 = brick.y + brick.height;
                var x2 = brick.x + brick.width;
                var y2 = brick.y + brick.height;
                var x3 = brick.x + brick.width;
                var y3 = brick.y;
                var x4 = brick.x;
                var y4 = brick.y;

                var x_bot = (y1 - this.y) / this.tan + this.x;
                if (x_bot >= x1 && x_bot <= x2) {
                    line_length_cand = Math.min(
                        line_length_cand,
                        2 *
                            Math.sqrt(
                                (x_bot - this.x) * (x_bot - this.x) + (y1 - this.y) * (y1 - this.y)
                            )
                    );
                }

                var y_left = this.tan * (x1 - this.x) + this.y;

                if (y_left >= y4 && y_left <= y1) {
                    line_length_cand = Math.min(
                        line_length_cand,
                        2 *
                            Math.sqrt(
                                (x1 - this.x) * (x1 - this.x) +
                                    (y_left - this.y) * (y_left - this.y)
                            )
                    );
                }

                var y_right = this.tan * (x2 - this.x) + this.y;

                if (y_right >= y3 && y_right <= y2) {
                    line_length_cand = Math.min(
                        line_length_cand,
                        2 *
                            Math.sqrt(
                                (x2 - this.x) * (x2 - this.x) +
                                    (y_right - this.y) * (y_right - this.y)
                            )
                    );
                }
            }.bind(this)
        );

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
            ctx.fillRect(
                this.x - this.line_length / 2,
                this.y - this.line_width / 2,
                this.line_length / 2,
                this.line_width
            );
        } else {
            ctx.fillRect(
                this.x,
                this.y - this.line_width / 2,
                this.line_length / 2,
                this.line_width
            );
        }

        ctx.setTransform(2, 0, 0, 2, 0, 0);
    }
    shoot() {
        if (this.all_blue_ball_alive == 1) return;

		this.initiated = 0; 
        this.all_blue_ball_alive = 1;
		this.line_length = 0;
		
		var blue_ball_cnt = 0; 
        this.blue_container.forEach(
            function (blue_ball) {
				var shoot_blue_ball = () => {
					
					blue_ball.dx = blue_ball.speed * Math.cos(this.theta);
                	blue_ball.dy = blue_ball.speed * Math.sin(this.theta);
                	if (this.theta >= 0) {
                		blue_ball.dx *= -1;
                    	blue_ball.dy *= -1;
               		 }
				}		
			
				setTimeout (shoot_blue_ball, blue_ball_cnt * 100);
				blue_ball_cnt += 1; 

                
            }.bind(this)
        );
    }

    check_all_blue_ball_alive() {
		if (this.initiated) return;
		
        var all_blue_ball_alive = 0;
        var all_blue_ball_dead = 0;
        this.blue_container.forEach(
            function (blue_ball) {
                if (all_blue_ball_dead == 0) {
                    if (blue_ball.survived == 0)
					{
						this.x = blue_ball.x;
						blue_ball.y = this.y;
						blue_ball.dx = 0;
						blue_ball.dy = 0; 
						blue_ball.survived = 2; 
					}
                }

                all_blue_ball_alive += (blue_ball.survived == 1);
                all_blue_ball_dead += (blue_ball.survived != 1);
            }.bind(this)
        );

        if (all_blue_ball_alive == 0) this.all_blue_ball_alive = 0;
			
    }

    update() {
        // how do i empty an array  ?
		if (this.initiated) return;
		this.initiated = 1; 
		
		this.dead_green_cnt = 0;
		this.green_container.forEach(green_ball=>{
			green_ball.update()
			if (!green_ball.survived) this.dead_green_cnt += 1;
		});
									 
		
		this.green_ball_pos = 0; 
		while (this.green_ball_pos ==0){
			this.green_ball_pos = Math.floor(Math.random()*10)% 7;
		}
		
		this.green_container.push (new Green_ball(this.green_ball_pos* this.stageWidth/6-this.brick_width/2,this.stage_min_height+this.brick_height/2,this.stage_max_height));
		
		
		
        this.blue_ball_cnt = this.dead_green_cnt+1;
		
		
        this.blue_container = [];

        for (var blue_ball = 0; blue_ball < this.blue_ball_cnt; blue_ball += 1) {
            this.blue_container.push(
                new Blue_ball(this.ball_cnt, this.x, this.y, 0, 0, this.stageWidth, this.stage_min_height, this.stage_max_height, this.bricks, this.green_container)
            );
        }
		
		this.record.score = this.blue_ball_cnt;
		this.record.best = Math.max (this.record.score, this.record.best);
		
		this.bricks.update(this.green_ball_pos);
		
		
    }
	
	
    draw(ctx) {
        this.ctx = ctx;
        
        this.set_line_length();
        this.check_all_blue_ball_alive();

        this.blue_container.forEach(
            function (blue_ball) {
                blue_ball.draw(this.ctx);
            }.bind(this)
        );
		
		this.green_container.forEach(
			function (green_ball){
				green_ball.draw(this.ctx);
			}.bind(this)
		);

        this.draw_line(ctx);
        if (this.all_blue_ball_alive == 0) this.update();
    }
}