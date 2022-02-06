var angle = 0;
var angleIncrease = 0.001;

function setup(){
  createCanvas(windowWidth, windowHeight);
  fill(0, 0, 0, 255);
  stroke(0, 0, 0, 0);
  rectMode(CORNER);
  rect(0, 0, windowWidth, windowHeight); //so black background doesnt fade
}

function draw(){
  //loop counter
  var i;
  background(0, 0, 0, 10); //for trail
  //no outline
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
  angle += angleIncrease;
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}