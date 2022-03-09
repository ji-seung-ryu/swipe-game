import {Broken_brick} from './broken_brick.js';

export class Brick {
    constructor(x, y,width,height,status) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.status = status;
	
		this.broken_brick = new Broken_brick(this.x+this.width/2, this.y + this.height/2);
    }

	
   
    draw(ctx) {
		// draw broken brick 
		this.broken_brick.draw(ctx);
		
		
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