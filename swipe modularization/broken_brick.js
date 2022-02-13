export class Broken_brick{
	constructor(x,y){
		this.x = x;
		this.y = y;
		this.status = 0; 
	}
	
	draw (ctx){
		if (this.status <= 0) return;
		
		
		ctx.beginPath();
        ctx.rect(this.x, this.y+10, 7, 7);				
		ctx.fillStyle = '#ff4651';
        ctx.fill();
		
		ctx.rect(this.x+15, this.y+3, 5, 5);				
		ctx.fillStyle = '#ff4651';
        ctx.fill();
		
		ctx.rect(this.x+20, this.y, 4, 4);				
		ctx.fillStyle = '#ff4651';
        ctx.fill();
		
		ctx.rect(this.x+22, this.y-5, 2, 2);				
		ctx.fillStyle = '#ff4651';
        ctx.fill();
		
		ctx.rect(this.x-10, this.y+5, 4, 4);				
		ctx.fillStyle = '#ff4651';
        ctx.fill();
		
		ctx.rect(this.x-16, this.y+3, 3, 3);				
		ctx.fillStyle = '#ff4651';
        ctx.fill();
		
		ctx.rect(this.x-20, this.y, 2, 2);				
		ctx.fillStyle = '#ff4651';
        ctx.fill();
        ctx.closePath();
		
		this.status -=1; 
		this.y += 1; 
		
	}
}