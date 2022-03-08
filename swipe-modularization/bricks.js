import {Brick} from './brick.js';

export class Bricks {
    constructor(top_line_padding, bottom_line_padding) {
		this.top_line_padding = top_line_padding + 1; // plus one for padding 
		this.bottom_line_padding = bottom_line_padding;
		
        this.container = new Array();
		this.top_down_padding = 22;
		this.right_padding = 2; 
		this.brick_width = 52;
		this.brick_height = 20;
		this.brick_status = 0; 
		
		
	

		
    }
	
	add_line(){
		this.container.forEach(function(brick){
			brick.y += this.top_down_padding;  
			brick.broken_brick.y += this.top_down_padding; 
		}.bind(this))
		
		this.brick_status += 1;
		
		for (var b=0;b<6;b++){
			if (this.half_chance())this.container.push(new Brick((this.brick_width + this.right_padding) * b , this.top_line_padding, this.brick_width, this.brick_height,this.brick_status));
		}
	}
	
    draw(ctx) {
	   this.ctx = ctx; 

       this.container.forEach (function(brick){
		   brick.draw(this.ctx);
	   }.bind(this))
    }
	
	half_chance (){
		return Math.floor((Math.random()*10))%2;
	}
}