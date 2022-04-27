var canvasWidth = 720;
var canvasHeight = 540;
var canvas;

class Orb{
  constructor(){
    this.x = canvasWidth/2;
    this.y = canvasHeight/2;
    this.size = 30;
    this.red = 255;
    this.green = 0;
    this.blue = 0;
    this.alpha = 255;
  }
  setPos(x, y){
    this.x = x;
    this.y = y;
  }
  setSize(size){
    this.size = size;
  }
  setColor(red, green, blue, alpha){
    this.red = red;
    this.green = green;
    this.blue = blue;
    this.alpha = alpha;
  }
  show(){
    for (let i = 0; i <= 50; i++){
      noStroke();
      ellipseMode(CENTER);
      fill(i*5 + this.red, i*5 + this.green, i*5 + this.blue, this.alpha - 255 + i*2);
      ellipse(this.x, this.y, this.size - i/2, this.size - i/2);
    }
  }
}

var player;
var angleSpeed = 0;
var angleFacing = 0;

function setup() {
  angleMode(RADIANS);
  canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.position((windowWidth - canvasWidth)/2, (windowHeight - canvasHeight)/2);
  player = new Player();
}

function draw() {
  background(0, 0, 0, 255);
  if (keyIsDown(LEFT_ARROW)){
    angleSpeed = approach(angleSpeed, -0.3, 0.1);
  }
  else if (keyIsDown(RIGHT_ARROW)){
    angleSpeed = approach(angleSpeed, 0.3, 0.1);
  }
  else{
    angleSpeed = approach(angleSpeed, 0, 0.3);
  }
  if (keyIsDown(32)){
    player.go(20);
  }
  //player.moveTo(mouseX, mouseY, 1);
  angleFacing += angleSpeed;
  player.turn(angleFacing);
  player.show();
}

function approach(current, target, speed){
  var change;
  var updated = current;
  var error = target - current;
  change = error*speed;
  updated += change;
  return updated;
}

function facePoint(x, y, action) {
  var angle = atan2((mouseY - y), (mouseX - x));
  push();
  translate(x, y);
  rotate(angle);
  action();
  pop();
}

function drawPlayer(){
  rectMode(CENTER);
  ellipseMode(CENTER);
  scale(0.5);
  noStroke();
  fill(120, 120, 120, 255);
  rect(30, 36, 35, 13, 3, 3);
  fill(100, 100, 100, 255);
  rect(40, 0, 30, 40);
  fill(120, 120, 120, 255);
  triangle(-10, 13, -10, 45, 80, 13);
  triangle(-10, -13, -10, -45, 80, -13);
  fill(150, 150, 150, 255);
  ellipse(0, 0, 100, 90);
  fill(110, 110, 110, 255);
  ellipse(0, 0, 30, 30);
}

function keyTyped(){
  return key;
}
function keyPressed(){
  return keyCode;
}

function mousePressed(){
  player.boostSide(1, 10);
}

function windowResized(){
  canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.position((windowWidth - canvasWidth)/2, (windowHeight - canvasHeight)/2);
}

