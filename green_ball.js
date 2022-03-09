export class Green_ball{
	constructor (x,y,stage_max_height){
		this.x = x;
		this.y = y;
		this.stage_max_height = stage_max_height;
		this.radius = 5; 
		this.survived = 1;
		this.top_down_padding = 22;
		this.brick_width = 52;
		this.brick_height = 20;
				
		
	}	
	
	update (){
		this.y += this.top_down_padding;
		if (this.y >= this.stage_max_height) this.survived = 0;
	}
	
	draw(ctx){
		this.ctx = ctx;
		if (this.survived){
			
			ctx.beginPath();
			ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'green';
            ctx.fill();
            ctx.closePath();
		}
	}
}