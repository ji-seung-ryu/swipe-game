import {Balls} from './balls.js';
import {Bricks} from './bricks.js'
class App{
	constructor(){
		this.canvas = document.createElement('canvas');
		this.canvas.width = 320;
		this.canvas.height = 480;

		this.ctx = this.canvas.getContext('2d');
		document.body.appendChild (this.canvas);
		this.top_line_padding = 70;
		this.bottom_line_padding = 410;
		
		this.init_stage();
		
		
		
	//	this.ball = new Ball(1,100,100,1,1);
		this.bricks = new Bricks(this.top_line_padding, this.bottom_line_padding);
		this.balls = new Balls(this.canvas.width/4,this.bottom_line_padding,this.canvas.width/2, this.top_line_padding, this.bottom_line_padding,this.canvas, this.ctx);
		
				
		requestAnimationFrame(this.animate.bind(this));
	}
	
	
	
	init_stage(){	
		this.canvas.width *= 2;
		this.canvas.height *= 2;
		this.ctx.scale(2,2);
			
		
		//this.balls.init_stage(this.canvas.width/2, this.top_line_padding, this.bottom_line_padding);
		
	}
	draw_stage(){
		this.ctx.beginPath();
		this.score = 2;
		this.best = 10;
		this.ctx.font = '10px Georgia';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillStyle = '#000000';
        this.ctx.fillText(`SCORE : ${this.score}          BEST : ${this.best}`, this.canvas.width/4, this.top_line_padding/2); 
		this.ctx.closePath();		

		
		this.ctx.beginPath();
		this.ctx.moveTo(0, this.top_line_padding);
		this.ctx.lineTo(this.canvas.width/2, this.top_line_padding);
		this.ctx.moveTo(0,this.bottom_line_padding);
		this.ctx.lineTo(this.canvas.width/2, this.bottom_line_padding);
		this.ctx.stroke();
	}
	
	animate (t){

		this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);		
		

		
		this.draw_stage();
		this.balls.draw(this.ctx, this.bricks.container);
		this.bricks.draw(this.ctx);
		
		requestAnimationFrame(this.animate.bind(this));
	}
	
}

window.onload = () =>{
	new App();
}