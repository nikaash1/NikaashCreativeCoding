let angle = 0;
let counter = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
}

function draw() {
  background(0, 0, 0, 5);
  //rect(50, 50, 20, 80);
  stroke(255, 255, 255);

  translate(width/2, height/2);
  rotate(angle);
  rect(55, 55, 40, 30);
  line(0, 0, 55, 55);

  translate(55+counter, 55+counter);
  rotate(angle);
  scale(1.2);
  rect(55, 55, 40, 30);
  line(0, 0, 55, 55);

  translate(55+counter, 55+counter);
  rotate(angle);
  scale(1.2);
  rect(55, 55, 40, 30);
  line(0, 0, 55, 55);

  translate(55+counter, 55+counter);
  rotate(angle);
  scale(1.2);
  rect(55, 55, 40, 30);
  line(0, 0, 55, 55);

  counter++;
  angle ++;
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}