export class Ball{
	constructor(id,x,y,dx,dy,stageWidth, stage_min_height,stage_max_height){
		
		this.id = id; 
		this.x = x;
		this.y= y;
		this.dx = dx;
		this.dy = dy;
		this.stageWidth = stageWidth;
		this.stage_min_height = stage_min_height;
		this.stage_max_height = stage_max_height;
		this.speed = 5; 
		this.survived = 1;
		// ball.survived 0: died, 1: alive 2: next starting point 
		this.radius = 5;
	}
	
	hit_wall(){
		if (this.x+ this.radius > this.stageWidth || this.x<this.radius) {
			this.dx = -this.dx;
			this.x += this.dx;
		}
		if (this.y<this.radius+this.stage_min_height) {
			this.dy = -this.dy;
			this.y += this.dy;

		}
		
		if (this.y > this.stage_max_height){
			this.survived = 0 ;
			
		}
	}
	
	hit_brick(bricks){
		
		
		bricks.forEach (function (brick){
			if (brick.status <= 0) return;
			const min_x = brick.x - this.radius;
			const max_x = brick.x + brick.width + this.radius;
			const min_y = brick.y - this.radius;
			const max_y = brick.y + brick.height + this.radius;
			
			if (this.x >= min_x && this.x <= max_x && this.y >= min_y && this.y <= max_y){
				const x1 = Math.abs (this.x - min_x);
				const x2 = Math.abs(max_x - this.x);
				const y1 = Math.abs (this.y - min_y);
				const y2 = Math.abs(max_y - this.y);
				
				const min1 = Math.min (x1,x2);
				const min2 = Math.min (y1,y2);
				
				if (min1< min2){
					this.dx *= -1;
					this.x += this.dx;
				}
				else{
					this.dy *= -1;
					this.y += this.dy;
				}
				
				brick.status -= 1;
				brick.collsion_frame = 15;
			}
			
			if (brick.status <= 0) {
				//broken brick event 
				brick.broken_brick.status = 15; 
				
			}
		
			return;
		}.bind(this))
	}
	move_ball(){
		if (this.survived){
		
			this.x += this.dx;
			this.y += this.dy;
		}
		
	}
	
	
	
	
	draw(ctx, bricks){
		this.ctx = ctx;
		if (this.survived){
			
			ctx.beginPath();
			this.hit_brick(bricks);
			this.hit_wall();
			this.move_ball();
			ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = '#59a7f4';
            ctx.fill();
            ctx.closePath();
		}
	}
}