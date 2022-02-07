var canvasWidth = 600;
var canvasHeight = 800;

//ball
var ballSize = 20;
//ball location
var locX = canvasWidth/2;
var locY = 10;
//ball speed
var speedX = 0;
var speedY = 1;
//factors of ball speed
var gravity = 1;
var yFactor = 5;

//spinner
var angle = 1; //rotate counter
var spinner = false; //spinner or ball
var spinAlpha = 0; //turns on/off spinner
var spinSpeed = 0;

//mouse
var released = 10; //weird way to check if click is released
var clickPrompt = 1;
var clickAlpha = 0; //click feedback
var highlight = 0; //highlight dismiss button
var highlight2 = 0; //highlight restart button
var dismissHover = false; //checking if mouse is on dismiss button

//claw
var clawLeft = 0;
var clawRight = 0;
var clawUp = 0;
var squishFactor = 0;

var score = 0;
var started = false;
var canvas; //variable to center the canvas in the window

function setup() {
  canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.position((windowWidth - canvasWidth)/2, (windowHeight - canvasHeight)/2);
  ellipseMode(CENTER);
  angleMode(DEGREES);
  rectMode(CORNER);
  rect(0, 0, canvasWidth, canvasHeight); //so black background doesnt fade
}

function windowResized(){
  canvas.position((windowWidth - canvasWidth)/2, (windowHeight - canvasHeight)/2);
}

function draw() {
  var xFactor = yFactor*(canvasWidth/canvasHeight); //horizontal and vertical ball speeds are proportional
  var bgAlpha = 255 + pow(2, (-1*score/10) + 8) - 280; //trail increases with score based on the curve: f(x) = 255 + 2^((-x/10) + 8) - 280
  var rectSpeed = 1; //mouse sensitivity
  var rectPos; //paddle position (center)
  var rectHeight = 20; //paddle height
  var rectWidth = 70; //paddle width
  var paddleError = 0; //where ball lands on paddle
  var paddleSquish = 0; //paddle feedback
  var ballSquish = 0; //ball feedback
  var lost = false;

  //background
  background(0, 0, 0, bgAlpha);
  //display score
  textStyle(NORMAL);
  textSize(50 + score/20);
  fill(255 - score*10, 255 - score*5, 255 - score*2, 255);
  strokeWeight(7);
  stroke(0 + score*17, 0 + score*2, 0 + score*25,  score*10);
  text(score, 530, 70);
  //restart button
  rectMode(CENTER);
  strokeWeight(1);
  stroke(50, 50, 50, 120);
  fill(50, 90, 50, 40 + highlight2);
  rect(531, 100, 80, 30, 5, 5, 5, 5);
  stroke(0, 0, 0, 0);
  textSize(20);
  textStyle(BOLD);
  fill(100 + highlight2/2, 100 + highlight2, 100 + highlight2, 100 + highlight2);
  text('restart', 500, 106);
  //display spinner prompt
  rectMode(CORNER);
  textStyle(NORMAL);
  strokeWeight(2);
  stroke(255 - highlight*2, 255 - highlight*2, 255 - highlight*2, clickPrompt*(255 - clickAlpha));
  fill(50 - highlight/2, 0 + clickAlpha/5, 0 + clickAlpha/3, clickPrompt*(100 - clickAlpha/4));
  rect(30, 30, 235, 75, 10, 10, 10, 10);
  stroke(0, 0, 0, 0);
  fill(255 - highlight*2, 255 - highlight*2, 255 - highlight*2.5, clickPrompt*(255 - clickAlpha));
  textSize(29);
  text('click anywhere to toggle spinner', 40, 34, 230, 120);
  //dismiss button
  strokeWeight(1);
  stroke(50, 50, 50, clickPrompt*255);
  fill(15 + highlight, 0 + highlight, 25 + highlight, clickPrompt*255);
  rect(40, 115, 200, 40, 5, 5, 5, 5);
  stroke(0, 0, 0, 0);
  textSize(19);
  textStyle(BOLD);
  fill(100 + highlight/4, 100 , 100 + highlight, clickPrompt*255);
  text('click here to dismiss', 47, 142);
  rectMode(CENTER);
  
  //check for mouse release
  if (mouseIsPressed){
    clickAlpha = 255;
    released = 0;
  }
  else{
    released++;
    clickAlpha -= 40;
  }

  //highlight dismiss button
  if ((mouseX >= 40) && (mouseX <= 240) && (mouseY >= 115) && (mouseY <= 155)){
    highlight = 20;
    if (released == 2){
      clickPrompt = 0;
    }
    if (clickPrompt < 1){
      dismissHover = false;
    }
    else{
      dismissHover = true;
    }
  }
  else{
    highlight = 0;
    dismissHover = false;
  }
  //start screen
  if (!started){
    background(0, 0, 0, 255);
    stroke(0, 0, 0, 0);
    fill(200, 200, 200, 255);
    text("press any key to open the claw", canvasWidth/2, canvasHeight/2);
    spinner = 0;
    ballSquish = -10 + clawRight*squishFactor;
    dismissHover = true;
    paddleError = 0;
    speedX = 0;
    speedY = 1;
    locX = canvasWidth/2;
    locY = 30;
    yFactor = 5;
    score = 0;
    if (keyIsPressed){
      squishFactor = 1;
    }
    clawRight += squishFactor*2;
    clawLeft += squishFactor*2;
  }
  //draw claw
  strokeWeight(10);
  stroke(100, 100, 100, 255);
  noFill();
  arc(-clawLeft + 5 - ballSize/2 + canvasWidth/2, -10 - clawUp, 30, 100, 90, 270);
  arc(clawRight - 5 + ballSize/2 + canvasWidth/2, -10 - clawUp, 30, 100, 270, 90);
  //start if clicked
  if (ballSquish >= 0){
    clawUp += 1;
    clawLeft += 1;
    clawRight += 1;
    started = true;
  }
  //highlight restart button
  if ((mouseX >= 480) && (mouseX <= 576) && (mouseY >= 80) && (mouseY <= 121)){
    highlight2 = 100;
    if (released == 1){
      clawLeft = 0;
      clawRight = 0;
      clawUp = 0;
      squishFactor = 0;
      started = false;
    }
  }
  else{
    highlight2 = 0;
  }

  //spiner toggle
  if ((released == 1) && (!dismissHover)){
    if (spinner){
      spinner = false;
    }
    else{
      spinner = true;
    }
  }
  if (spinner){
    spinAlpha += 50;
  }
  else{
    spinAlpha -= 50;
  }
  if (clickPrompt < 1){
    clickPrompt = 0;
  }
  if (spinAlpha > 255){
    spinAlpha = 255;
  }
  else if (spinAlpha < 0){
    spinAlpha = 0;
  }

  //paddle controls
  rectPos = mouseX*rectSpeed;
  //paddle restrictions
  if(rectPos > canvasWidth - rectWidth/2){
    rectPos = canvasWidth - rectWidth/2;
  }
  else if (rectPos < rectWidth/2){
    rectPos = rectWidth/2;
  }

  if ((locX > rectPos - rectWidth/2) && (locX < 10 + rectPos + rectWidth/2)){
    //bounce if hit paddle
    if (locY >= canvasHeight - rectHeight*1.6){
      speedY = -1*gravity;
      ballSquish = 7;
      paddleError = locX - rectPos - 10;
      paddleSquish = 2;
      speedX = paddleError/(rectWidth/2);
      spinSpeed = speedX;
      score++;
      if (yFactor <= 10){
        yFactor += score/100;
      }
    }
    //bounce if hit ceiling
    else if (locY <= ballSize/2){
      speedY = gravity;
      ballSquish = 7;
      spinSpeed = -speedX;
    }
  }
  else{
    //lose if passes paddle
    if (locY > canvasHeight){
      lost = true;
    }
    //dont go through ceiling if paddle is not in position
    else if (locY < ballSize/2){
      speedY *= -1;
      ballSquish = 7;
      spinSpeed = -speedX;
    }
  }

  //side walls
  if (locX >= canvasWidth - ballSize/2){
    ballSquish = -7;
    speedX *= -1;
  }
  else if (locX <= ballSize/2){
    ballSquish = -7;
    speedX *= -1;
  }

  rectWidth += paddleSquish;
  rectHeight += paddleSquish*1.2;

  locY += speedY*yFactor;
  locX += speedX*xFactor;

  //reset if lost
  if (lost){
    paddleError = 0;
    speedX = 0;
    locX = canvasWidth/2;
    locY = ballSize/2;
    yFactor = 5;
    score = 0;
    background(100, 10, 150);
  }

  //paddle back color
  fill(150, 0, 255, 100);
  stroke(100, 0, 250, 100);
  strokeWeight(2);
  //draw paddle back
  rect(rectPos + 10, -10 + canvasHeight - rectHeight/2, rectWidth, rectHeight);
  //paddle front color
  fill(150, 0, 255, 200);
  stroke(100, 0, 250, 255);
  strokeWeight(2);
  rect(rectPos, canvasHeight - rectHeight/2, rectWidth, rectHeight);
  quad(rectPos + 10 + rectWidth/2, -10 + canvasHeight - rectHeight, rectPos + 10 - rectWidth/2, -10 + canvasHeight - rectHeight, rectPos - rectWidth/2, canvasHeight - rectHeight, rectPos + rectWidth/2, canvasHeight - rectHeight);
  //ball color
  fill(20 + locY/2, 200 - locY/8, 200 - locY, 255 - spinAlpha/4);
  stroke(0, 0, 0, 0);
  //draw ball
  ellipse(locX, locY, ballSize + ballSquish, ballSize - ballSquish);

  //draw spinner
  translate(locX, locY);
  rotate(angle);
  strokeWeight(5);
  stroke(0 + score*10 + locY/3 + locX/2, 0 + score*5 + locX/2 - locY/4, 200 + score*2 - locX + locY, spinAlpha);
  line(-15 + ballSquish/2, 0, 15 - ballSquish/2, 0);
  stroke(0 + score*10 + locY/9 + locX/4, 200 + score*5 + locX/2 - locY/2, 10 + score*2 - locX + locY, spinAlpha);
  line(0, -15 + ballSquish/2, 0, 15 - ballSquish/2);
  angle += 1.5*spinSpeed*(score + 2);
}