import {Ball} from './ball.js';
import {Brick} from './brick.js';
class App{
	constructor(){
		this.canvas = document.createElement('canvas');
		this.ctx = this.canvas.getContext('2d');
		document.body.appendChild (this.canvas);
		
		this.ball = new Ball(1,200,100,10,10);
		this.bricks = new Array();
		
		window.addEventListener ('resize', this.resize.bind(this),false);
		this.resize();
	
		for (var b = 0; b<10;b++) this.bricks.push(new Brick(Math.random()*this.stageWidth , Math.random()*this.stageHeight));
		
			
		requestAnimationFrame(this.animate.bind(this));
	}
	
	resize(){
		console.log ('resize');
		this.stageWidth = document.body.clientWidth;
		this.stageHeight = document.body.clientHeight;
		
		
		this.canvas.width = this.stageWidth*2;
		this.canvas.height = this.stageHeight*2;
		this.ctx.scale(2,2);
		
		this.ball.resize(this.stageWidth, this.stageHeight);
		
	}
	
	animate (t){

		this.ctx.clearRect(0,0,this.stageWidth,this.stageHeight);		
		
		
		this.ball.draw(this.ctx, this.bricks);
		this.bricks.forEach (function(brick){
			brick.draw(this.ctx);
		}.bind(this))
		
		requestAnimationFrame(this.animate.bind(this));
	}
	
}

window.onload = () =>{
	new App();
}