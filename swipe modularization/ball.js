export class Ball{
	constructor(id,x,y,dx,dy){
		this.id = id; 
		this.x = x;
		this.y= y;
		this.dx = dx;
		this.dy = dy;
		this.survived = 1;
		this.radius = 20;
	
	}
	
	hit_wall(){
		if (this.x+ this.radius > this.stageWidth || this.x<this.radius) this.dx = -this.dx;
		if (this.y+ this.radius > this.stageHeight || this.y<this.radius) this.dy = -this.dy;
	}
	
	hit_brick(bricks){
		
		console.log (bricks);
		bricks.forEach (function (brick){
		var mid_x = brick.x + brick.width/2;
		var mid_y = brick.y + brick.height/2;
		
		var relativeX = Math.abs(mid_x - this.x);
		var relativeY = Math.abs(mid_y - this.y);
		
		if (relativeX >this.radius+brick.width/2) return;
		if (relativeY >this.radius+brick.height/2) return;
		
		if (relativeX <=brick.width/2) {
			this.dy = -this.dy;
		}
		if (relativeY <=brick.height/2) {
			this.dx = - this.dx;
		}
		
		brick.status -= 1;
		return;
		}.bind(this))
	}
	move_ball(){
		if (this.survived){
		
			this.x += this.dx;
			this.y += this.dy;
		}
		
	}
	
	resize(stageWidth, stageHeight){
		this.stageWidth = stageWidth;
		this.stageHeight = stageHeight;
	
		this.x = stageWidth / 2;
		this.y = stageHeight / 2;
		
		
	}
	
	
	
	draw(ctx, bricks){
		if (this.survived){
			console.log ('draw');
			console.log (this);
			ctx.beginPath();
			this.hit_brick(bricks);
			this.hit_wall();
			this.move_ball();
			ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'red';
            ctx.fill();
            ctx.closePath();
		}
	}
}