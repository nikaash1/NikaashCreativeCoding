




var canvasWidth = 720;
var canvasHeight = 540;
var canvas;

const RIGHT = -1;
const LEFT = 1;
const AKEY = 65;
const DKEY = 68;
const WKEY = 87;

var serial;
var xAxis;
var yAxis;
var stickClick;

var player;
var counter = 0;
var cooldown = 0;
var angleSpeed = 0;
var angleFacing = 0;
var shot = false;
var boosted = false;

function setup() {
  angleMode(RADIANS);
  serial = new p5.SerialPort();
  serial.open('/dev/tty.usbmodem1441301');
  canvasWidth = windowWidth - 200;
  canvasHeight = 3*canvasWidth/4;
  canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.position((windowWidth - canvasWidth)/2, (windowHeight - canvasHeight)/2);
  player = new Player();
}

function draw() {


  //updateController();
  background(0, 0, 0, 255);
  if (keyIsDown(LEFT_ARROW)){
    angleSpeed = approach(angleSpeed, -0.2, 0.1);
  }
  else if (keyIsDown(RIGHT_ARROW)){
    angleSpeed = approach(angleSpeed, 0.2, 0.1);
  }
  else{
    angleSpeed = approach(angleSpeed, 0, 0.3);
  }
  if (keyIsDown(UP_ARROW)){
    player.go(20);
  }
  if(!boosted){
    if(keyIsDown(AKEY)){
      player.boost(LEFT, 10);
      boosted = true;
      counter = 0;
      serial.write('H');
    }
    else if(keyIsDown(DKEY)){
      player.boost(RIGHT, 10);
      boosted = true;
      counter = 0;
      serial.write('H');
    }
  }
  else{
    if(counter >= 20){
      serial.write('L');
      //serial.write('B');
    }
    if(counter >= 50){
      boosted = false;
    }
  }
  if(!shot){
    if (keyIsDown(32)){
      serial.write('H');
      player.shoot();
      shot = true;
      cooldown = 0;
    }
  }
  else{
    if(cooldown >= 10){
      serial.write('L');
      shot = false;
    }
  }
  angleFacing += angleSpeed;
  player.turn(angleFacing);
  player.show();
  counter++;
  cooldown++;
}

function approach(current, target, speed){
  var change;
  var updated = current;
  var error = target - current;
  change = error*speed;
  updated += change;
  return updated;
}

function updateController(){
  var data = serial.readLine();
  if(data.length > 0){
    var sensors = split(data, ",");
    xAxis = sensors[0];
    yAxis = sensors[1];
    stickClick = sensors[2];
  }
  fill(255, 255, 255, 255);
  textSize(20);
  text(xAxis, 50, 50);
}

function facePoint(x, y, action) {
  var angle = atan2((mouseY - y), (mouseX - x));
  push();
  translate(x, y);
  rotate(angle);
  action();
  pop();
}

function keyTyped(){
  return key;
}
function keyPressed(){
  return keyCode;
}
function keyReleased(){
  return key;
}

function mousePressed(){
  player.boostSide(RIGHT, 10);
}

function windowResized(){
  canvasWidth = windowWidth - 200;
  canvasHeight = 3*canvasWidth/4;
  canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.position((windowWidth - canvasWidth)/2, (windowHeight - canvasHeight)/2);
}

