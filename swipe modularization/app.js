import {Ball} from './ball.js';
import {Bricks} from './bricks.js'
class App{
	constructor(){
		this.canvas = document.createElement('canvas');
		this.ctx = this.canvas.getContext('2d');
		document.body.appendChild (this.canvas);
		
		this.ball = new Ball(1,100,100,1,1);
		this.bricks = new Bricks();
	
		this.init_stage();
				
		requestAnimationFrame(this.animate.bind(this));
	}
	
	init_stage(){	
		this.canvas.width *= 2;
		this.canvas.height *= 2;
		this.ctx.scale(2,2);
			
		this.ball.init_stage(this.canvas.width/2, this.canvas.height/2);
	}
	
	animate (t){

		this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);		
		

		this.ball.draw(this.ctx, this.bricks.container);
		this.bricks.draw(this.ctx);
		
		requestAnimationFrame(this.animate.bind(this));
	}
	
}

window.onload = () =>{
	new App();
}