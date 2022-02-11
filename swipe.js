/*var rightPressed = false;
            var leftPressed = false;
            var brickRowCount = 5;
            var brickColumnCount = 3;
            var brickWidth = 75;
            var brickHeight = 20;
            var brickPadding = 10;
            var brickOffsetTop = 30;
            var brickOffsetLeft = 30;
			*/
            /*
            var bricks = [];
            for (var c = 0; c < brickColumnCount; c++) {
                bricks[c] = [];
                for (var r = 0; r < brickRowCount; r++) {
                    bricks[c][r] = { x: 0, y: 0, status: 1 };
                }
            }*/

            /*
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
			document.addEventListener("mousemove", mouseMoveHandler, false);
			
			function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth/2;
		
		console.log((Math.PI * paddleX) / canvas.width); 
    }
}

function keyDownHandler(e) {
  if(e.keyCode == 39) {
    rightPressed = true;
  }
  else if(e.keyCode == 37) {
    leftPressed = true;
  }
}
function keyUpHandler(e) {
  if(e.keyCode == 39) {
    rightPressed = false;
  }
  else if(e.keyCode == 37) {
    leftPressed = false;
  }
}
function collisionDetection() {
  for(var c=0; c<brickColumnCount; c++) {
    for(var r=0; r<brickRowCount; r++) {
      var b = bricks[c][r];
      if(b.status == 1) {
        if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
          dy = -dy;
          b.status = 0;
        }
      }
    }
  }
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI*2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}
function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}
function drawBricks() {
  for(var c=0; c<brickColumnCount; c++) {
    for(var r=0; r<brickRowCount; r++) {
      if(bricks[c][r].status == 1) {
        var brickX = (r*(brickWidth+brickPadding))+brickOffsetLeft;
        var brickY = (c*(brickHeight+brickPadding))+brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBricks();
  drawBall();
  drawPaddle();
  collisionDetection();

  if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }
  if(y + dy < ballRadius) {
    dy = -dy;
  }
  else if(y + dy > canvas.height-ballRadius) {
    if(x > paddleX && x < paddleX + paddleWidth) {
      dy = -dy;
    }
    else {
      alert("GAME OVER");
      document.location.reload();
    }
  }

  if(rightPressed && paddleX < canvas.width-paddleWidth) {
    paddleX += 7;
  }
  else if(leftPressed && paddleX > 0) {
    paddleX -= 7;
  }

  x += dx;
  y += dy;
}

setInterval(draw, 10);
*/

            // Non-rotated rectangle
            var canvas = document.getElementById('myCanvas');
            var ctx = canvas.getContext('2d');
            var ballRadius = 10;
            var ball_speed = 5;

            var rotated_radian = 0.1;
            var actived = false;
            var clicked = false;
			var finished = false; 
            var score = 0;
			var prev_ball_length = 0; 
            var all_ball = [];

            function makeStruct(names) {
                var names = names.split(' ');
                var count = names.length;
                function constructor() {
                    for (var i = 0; i < count; i++) {
                        this[names[i]] = arguments[i];
                    }
                }
                return constructor;
            }

            var Ball = makeStruct('id x y dx dy survived');

            function create_ball() {
                //	console.log ("id ",id);
               

                var dx, dy;
                if (rotated_radian > 0) {
                    dx = -ball_speed * Math.cos(rotated_radian);
                    dy = -ball_speed * Math.sin(rotated_radian);
                } else {
                    dx = ball_speed * Math.cos(rotated_radian);
                    dy = ball_speed * Math.sin(rotated_radian);
                }
               

                var ball = new Ball(1, canvas.width / 2, canvas.height - ballRadius, dx, dy, 1);
                all_ball.push(ball);
				
            }

            function move_ball() {
                all_ball.forEach(function (ball) {
                    if (ball.survived) {
                        ball.x += ball.dx;
                        ball.y += ball.dy;
                    }
                });
            }

            function rotate_arrow(radian) {
                var arrow_width = 100;
                var arrow_height = 20;

                ctx.fillStyle = '#eee';
                ctx.fillRect(
                    (canvas.width - arrow_width) / 2,
                    canvas.height - arrow_height,
                    arrow_width,
                    arrow_height
                );

                ctx.translate(canvas.width / 2, canvas.height - arrow_height / 2);
                ctx.rotate(radian);
                ctx.translate(-canvas.width / 2, -canvas.height + arrow_height / 2);

                // Rotated rectangle
                ctx.fillStyle = 'red';
                ctx.fillRect(
                    (canvas.width - arrow_width) / 2,
                    canvas.height - arrow_height,
                    arrow_width,
                    arrow_height
                );
                ctx.setTransform(1, 0, 0, 1, 0, 0);
            }

            document.addEventListener('mousemove', mouseMoveHandler, false);
            document.addEventListener('click', clickHandler, false);

            function mouseMoveHandler(e) {
                if (actived) {
                  
                    return;
                }

                var relativeX = e.clientX - canvas.offsetLeft;
                var relativeY = e.clientY - canvas.offsetTop;

                if (
                    relativeY > canvas.height - 20 ||
                    relativeY < 0 ||
                    relativeX < 0 ||
                    relativeX > canvas.width
                )
                    return;
                var arrowX = canvas.width / 2;
                var arrowY = canvas.height - 10;

                var tan = (arrowY - relativeY) / (relativeX - arrowX);
                var theta = Math.atan(tan);

                rotated_radian = -theta;

                //		rotate_arrow(-theta);
            }

            function clickHandler(e) {
			
                if (actived) {
					console.log ('aleady actived!');
					return;
				}
                else {
                    clicked = true;
                    actived = true;
                }
            }

            function drawBalls() {
                all_ball.forEach(function (ball) {
					if (ball.survived == 0) return;
                    ctx.beginPath();
                    ctx.arc(ball.x, ball.y, ballRadius, 0, Math.PI * 2);
                    ctx.fillStyle = '#0095DD';
                    ctx.fill();
                    ctx.closePath();
                });
            }

            function hit_wall() {
                all_ball.forEach(function (ball) {
                    if (
                        ball.x + ball.dx > canvas.width - ballRadius ||
                        ball.x + ball.dx < ballRadius
                    ) {
                        ball.dx = -ball.dx;
                    }
                    if (ball.y + ball.dy < ballRadius) {
                        ball.dy = -ball.dy;
                    } else if (ball.y + ball.dy > canvas.height - ballRadius) {
					
                        ball.survived = 0;
                    }
                });
            }

            var brickColumnCount = 8;
            var brickRowCount = 5;
            var brickWidth = 75;
            var brickHeight = 20;
            var brickPadding = 10;
            var brickOffsetTop = 30;
            var brickOffsetLeft = 30;

            var brick_status = 3;
            var bricks = [];
            for (var c = 0; c < brickColumnCount; c++) {
                bricks[c] = [];
                brick_status -= 1;
                for (var r = 0; r < brickRowCount; r++) {
					
					if (Math.floor((Math.random() * 10))% 5 == 0 ) {
					
						
						bricks[c][r] = { x: 0, y: 0, status: 0 };
					}
                    else bricks[c][r] = { x: 0, y: 0, status: brick_status };
                }
            }
			brick_status = 3; 

            function drawBricks() {
                for (var c = 0; c < brickColumnCount; c++) {
                    for (var r = 0; r < brickRowCount; r++) {
                        if (bricks[c][r].status >= 1) {
                            var brickX = r * (brickWidth + brickPadding) + brickOffsetLeft;
                            var brickY = c * (brickHeight + brickPadding) + brickOffsetTop;
                            bricks[c][r].x = brickX;
                            bricks[c][r].y = brickY;
                            ctx.beginPath();
                            ctx.rect(brickX, brickY, brickWidth, brickHeight);
                            ctx.fillStyle = '#0095DD';
                            ctx.fill();
                            ctx.font = '20px Georgia';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'middle';
                            ctx.fillStyle = '#000000';
                            ctx.fillText(
                                bricks[c][r].status,
                                brickX + brickWidth / 2,
                                brickY + brickHeight / 2
                            );
                            ctx.closePath();
                        }
                    }
                }
            }

            function breaker(brick, ball) {
				var brick_center_x = brick.x + brickWidth / 2;
                var brick_center_y = brick.y + brickHeight / 2;
				
                var circleDistanceX = Math.abs(ball.x - brick_center_x);
                var circleDistanceY = Math.abs(ball.y -  brick_center_y);

                if (circleDistanceX > brickWidth / 2 + ballRadius) {
                    return false;
                }
                if (circleDistanceY > brickHeight / 2 + ballRadius) {
                    return false;
                }

                if (circleDistanceX <= brickWidth / 2) {
					ball.dy *= -1;
                    return true;
                }
                if (circleDistanceY <= (brickHeight / 2)) {				
					ball.dx *= -1;
                    return true;
                }

                var cornerDistance_sq = (circleDistanceX - brickWidth / 2) ** 2 + (circleDistanceY - brickHeight / 2) ** 2;

				if (cornerDistance_sq <= ballRadius**2) {
					ball.dy *= -1;
				//	ball.dx *= -1;
					return true;
				}
    			return false;
            }

            function collision_detect() {
				hit_wall();
				
                for (var c = 0; c < brickColumnCount; c++) {
                    for (var r = 0; r < brickRowCount; r++) {
                        var brick = bricks[c][r];
						if (brick.status <= 0) continue;
						
                        all_ball.forEach(function (ball) {

                            if (breaker(brick, ball)) {
							
								
								brick.status -= 1; 
							}
                        });
                    }
                }
            }
			
			function shoot_ball(){
				if (clicked) {
                    clicked = false;
                    var interval = 300;

                    for (var i = 0; i < score; i++) {
                        setTimeout(() => create_ball(), interval * i);
                    }

                   
                   
                }

			} 

			function down_brick(){
				 for (var c = brickColumnCount-1; c >= 1; c--) {
                 	for (var r = 0;r <brickRowCount;r++){
                   	 bricks[c][r] = JSON.parse(JSON.stringify(bricks[c-1][r]));
					}
                }
				
				for (var r=0;r<brickRowCount; r++){
					if (Math.floor((Math.random() * 10))% 5 == 0 ) bricks[0][r].status = 0;
					else bricks[0][r].status = brick_status;
					 
                        
				}
				brick_status += 1;
			}
			function is_finished(){
				
				
				if (prev_ball_length+score != all_ball.length) finished = false;
					
				else{
					
					finished = true; 
					
					all_ball.forEach(function(ball){
						if (ball.survived){
							finished = false; 
						}
					})
					
					if (!finished) return finished; 
					
					finished = true; 
					prev_ball_length = all_ball.length; 
				}
				
			return finished; 
			}
			
			function update_score(){
				var div_score = document.getElementById('score');
				score += 1;
				div_score.innerText = score;
				
			}
			
			function game_over(){
				for (var r= 0; r<brickRowCount;r++){
					if (bricks[brickColumnCount-1][r].status > 0) return true;
				}
				return false; 
			}
			function update_game(){
				
				if (is_finished()){
					if (game_over()) alert('game over!');
					actived = false; 
					update_score();
					down_brick();					
				}
				
			}
            function draw() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                rotate_arrow(rotated_radian);
                drawBricks();
                drawBalls();              
                collision_detect();
				shoot_ball();               
                move_ball();
				update_game();
				
            }

			
            setInterval(draw, 10);