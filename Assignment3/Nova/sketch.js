var angle = 0;
var angleIncrease = 0.0001;
var instructionsTime = 255;
var bgFade = 255;

function setup(){
  createCanvas(windowWidth, windowHeight);
  fill(0, 0, 0, 255);
  stroke(0, 0, 0, 0);
  rectMode(CORNER);
  rect(0, 0, windowWidth, windowHeight);
}

function draw(){
  var i;
  textSize(16);
  fill(0, 0, 0, 100 + instructionsTime);
  text("click to increase speed; press any key to decrease speed", -60 + windowWidth/2, -20 + windowHeight/2, 215, 100);
  fill(255, 0, 0, instructionsTime);
  text("click to increase speed; press any key to decrease speed", -60 + windowWidth/2, -20 + windowHeight/2, 215, 100);
  background(0, 0, 0, bgFade);
  if (bgFade < 10){
    bgFade = 10;
  }
  rotate(angle);
  stroke(0, 0, 0, 0);
  translate(windowWidth/2, windowHeight/2 - angle/2);
  for(i = 0; i <= 250; i++){
    rotate(angle/7);
    ellipseMode(CENTER);
    fill(255 + i*2, 100 + i*4, 100 - i*3, 2);
    ellipse(50 + i*10, 250, 70, 70);
  }
  for(i = 0; i <= 250; i++){
    rotate(angle/2);
    ellipseMode(CENTER);
    fill(200, 200, 200, 0+i/7);
    ellipse(50 + i*2, 250, 40, 40);
  }
  for(i = 0; i <= 520; i++){
    rotate(angle);
    ellipseMode(CENTER);
    fill(100 + i/3, 30 + i/10, 255 - i/2,  1 + i/80);
    ellipse(40 + i, 250, 70, 200);
  }
  if(mouseIsPressed){
    angleIncrease += 0.001;
  }
  else if (keyIsPressed){
    angleIncrease -= 0.001;
  }
  instructionsTime--;
  bgFade--;
  angle += angleIncrease;
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}