export class Brick {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 48;
        this.height = 13;
        this.status = 2;
		
    }

   
    draw(ctx) {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
		//low number color#f98966
		//collsion color #ffb8b1
        ctx.fillStyle = '#ff4651';
        ctx.fill();
        ctx.font = '10px Georgia';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = '#000000';
        ctx.fillText(this.status, this.x+ this.width/2, this.y+this.height/2);
		
        ctx.closePath();
    }
}