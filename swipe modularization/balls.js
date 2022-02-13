import {Ball} from './ball.js';
export class Balls{
	constructor(x,y,stageWidth, stage_min_height,stage_max_height,canvas,ctx){ 
		this.x = x;
		this.y = y;
		this.stageWidth = stageWidth;
		this.stage_min_height = stage_min_height;
		this.stage_max_height = stage_max_height;
		this.canvas = canvas;
		this.ctx = ctx; 

		this.container = new Array();
		this.container.push ( new Ball(1,x,y,0,0,this.stageWidth, this.stage_min_height, this.stage_max_height));
		
		document.addEventListener('mousemove', this.dotted_line.bind(this), false);

		//addEventListener // 마우스 회전 및 클릭 감지
	}
	
	dotted_line(e){
		
		var relativeX = e.clientX - this.canvas.offsetLeft;
        var relativeY = e.clientY - this.canvas.offsetTop;
				
        if (relativeY > this.stage_max_height || relativeY < this.stage_min_height || relativeX < 0 ||relativeX > this.stageWidth) return;
		
		var tan = (this.y - relativeY) / (this.x - relativeX);
		console.log ("기울기: ", tan);
        this.theta = Math.atan(tan);
		
		console.log ("각도: ", theta);	
		
		 var arrow_width = 100;
                var arrow_height = 20;
                this.ctx.fillStyle = 'red';
				this.ctx.fillRect (this.x,this.y, arrow_width, arrow_height);
                this.ctx.fillRect(
                    (this.stageWidth - arrow_width) / 2,
                    this.stage_max_height  - arrow_height,
                    arrow_width,
                    arrow_height
                );
			var arrow_width = 100;
                var arrow_height = 20;
				this.ctx.beginPath();
                this.ctx.fillStyle = 'red';
				this.ctx.fillRect (this.x,this.y, arrow_width, arrow_height);
           /*     this.ctx.fillRect(
                    (this.stageWidth - arrow_width) / 2,
                    this.stage_max_height  - arrow_height,
                    arrow_width,
                    arrow_height
                );*/
				
/*
                this.ctx.translate(this.stageWidth / 2, this.stage_max_height  - arrow_height / 2);
                this.ctx.rotate(theta);
                this.ctx.translate(-this.stageWidth / 2, -this.stage_max_height  + arrow_height / 2);

                // Rotated rectangle
                this.ctx.fillStyle = 'red';
                this.ctx.fillRect(
                    (this.stageWidth - arrow_width) / 2,
                    this.stage_max_height - arrow_height,
                    arrow_width,
                    arrow_height
                );
                this.ctx.setTransform(1, 0, 0, 1, 0, 0);
				*/
	}
	
	shoot(){
		
	}
	
	
	draw(ctx,bricks){
	   this.ctx = ctx; 

       this.container.forEach (function(ball){
		   ball.draw(this.ctx, bricks);
	   }.bind(this))
		
		 var arrow_width = 100;
                var arrow_height = 20;
				this.ctx.beginPath();
                this.ctx.fillStyle = 'red';
				this.ctx.fillRect (this.x,this.y, arrow_width, arrow_height);
           /*     this.ctx.fillRect(
                    (this.stageWidth - arrow_width) / 2,
                    this.stage_max_height  - arrow_height,
                    arrow_width,
                    arrow_height
                );*/
				this.ctx.closePath();
	}
}