import {Brick} from './brick.js';

export class Bricks {
    constructor() {
        this.container = new Array();
		
		this.top_down_padding = 20;
		
		this.container.push(new Brick(1 , 0));
		this.container.push(new Brick(51, 0));
		this.container.push(new Brick(101, 0));
		this.container.push(new Brick(151, 0));
		this.container.push(new Brick(201, 0));
		this.container.push(new Brick(251, 0));

		this.add_line();
		
    }
	
	add_line(){
		this.container.forEach(function(brick){
			brick.y += this.top_down_padding;  
		}.bind(this))
		
		this.container.push(new Brick(1 , 0));
		this.container.push(new Brick(51, 0));
		this.container.push(new Brick(101, 0));
		this.container.push(new Brick(151, 0));
		this.container.push(new Brick(201, 0));
		this.container.push(new Brick(251, 0));
	}
	
    draw(ctx) {
	   this.ctx = ctx; 

       this.container.forEach (function(brick){
		   brick.draw(this.ctx);
	   }.bind(this))
    }
}