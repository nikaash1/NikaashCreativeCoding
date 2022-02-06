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

//mouse click
var released = 2; //weird way to check if click is released
var clickPrompt = 3; //how many times to display click instructions
var clickAlpha = 0; //click feedback

var score = 0;

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  ellipseMode(CENTER);
  angleMode(DEGREES);
  rectMode(CORNER);
  rect(0, 0, canvasWidth, canvasHeight); //so black background doesnt fade
}

function draw() {
  var xFactor = yFactor*(canvasWidth/canvasHeight); //horizontal and vertical ball speeds are proportional
  var bgAlpha = 255 + pow(2, (-1*score/10) + 8) - 280; //trail increases with score on a curve: f(x) = 255 + 2^((-x/10) + 8) - 280
  var rectSpeed = 1; //mouse sensitivity
  var rectPos; //paddle position (center)
  var rectHeight = 20;
  var rectWidth = 70;
  var paddleError = 0; //where ball lands on paddle
  var paddleSquish = 0; //paddle feedback
  var ballSquish = 0; //ball feedback
  var lost = false;

  //background
  background(0, 0, 0, bgAlpha);
  //display score
  textSize(50 + score/20);
  fill(255 - score*10, 255 - score*15, 255 - score*20, 255);
  strokeWeight(5 + score/5);
  stroke(0 + score*17, 0 + score*2, 0 + score*25,  score*10);
  text(score, 530, 70);
  //display spinner prompt
  rectMode(CORNER);
  strokeWeight(2);
  stroke(255, 255, 255, clickPrompt*(255 - clickAlpha));
  fill(50, 0 + clickAlpha/5, 0 + clickAlpha/3, clickPrompt*(100 - clickAlpha/4));
  rect(30, 30, 235, 75);
  stroke(0, 0, 0, 0);
  fill(255, 255, 255, clickPrompt*(255 - clickAlpha));
  textSize(29);
  text('click anywhere to toggle spinner', 40, 34, 230, 120);
  rectMode(CENTER);

  //spinner toggle
  if (mouseIsPressed){
    clickAlpha = 255;
    released = 0;
  }
  else{
    released++;
    clickAlpha -= 5;
  }
  if (released == 1){
    clickPrompt--;
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