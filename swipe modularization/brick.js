export class Brick {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 48;
        this.height = 13;
        this.status = 2;
	
		
    }

	
   
    draw(ctx) {
		if (this.status <= 0) return;
		 
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
		
		if (this.collsion_frame) {
			ctx.fillStyle = '#ffb8b1';
			this.collsion_frame -= 1; 
		}
        else ctx.fillStyle = '#ff4651';
        ctx.fill();
        ctx.font = '10px Georgia';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = '#000000';
        ctx.fillText(this.status, this.x+ this.width/2, this.y+this.height/2);
		
        ctx.closePath();
    }
}