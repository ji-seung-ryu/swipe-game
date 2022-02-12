import {Brick} from './brick.js';

export class Bricks {
    constructor(top_line_padding, bottom_line_padding) {
		this.top_line_padding = top_line_padding + 1; // plus one for padding 
		this.bottom_line_padding = bottom_line_padding;
		
        this.container = new Array();
		this.top_down_padding = 20;
		
		this.container.push(new Brick(1 ,this.top_line_padding));
		this.container.push(new Brick(51, this.top_line_padding));
		this.container.push(new Brick(101, this.top_line_padding));
		this.container.push(new Brick(151, this.top_line_padding));
		this.container.push(new Brick(201, this.top_line_padding));
		this.container.push(new Brick(251, this.top_line_padding));

		
    }
	
	add_line(){
		this.container.forEach(function(brick){
			brick.y += this.top_down_padding;  
		}.bind(this))
		
		this.container.push(new Brick(1 , this.top_line_padding));
		this.container.push(new Brick(51, this.top_line_padding));
		this.container.push(new Brick(101, this.top_line_padding));
		this.container.push(new Brick(151, this.top_line_padding));
		this.container.push(new Brick(201, this.top_line_padding));
		this.container.push(new Brick(251, this.top_line_padding));
	}
	
    draw(ctx) {
	   this.ctx = ctx; 

       this.container.forEach (function(brick){
		   brick.draw(this.ctx);
	   }.bind(this))
    }
}