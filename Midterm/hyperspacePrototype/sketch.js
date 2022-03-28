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

class Player{
  constructor(){
    this.x = 20;
    this.y = 20;
  }
  setPos(x, y){
    this.x = x;
    this.y = y;
  }
  moveX(target){
    var change;
    var speed = 0.1;
    var error = target - this.x;
    change = error*speed;
    this.x += change;
    fill(255, 255, 255, 255);
  }
  moveY(target){
    var change;
    var speed = 0.1;
    var error = target - this.y;
    change = error*speed;
    this.y += change;
    fill(255, 255, 255, 255);
  }
  checkDistFrom(x, y){
    var distVal = dist(this.x, this.y, x, y);
    return distVal;
  }
  show(){
    fill(255, 255, 255, 255);
    orientPlayer(this.x, this.y);
  }

}

var video;
var vScale = 20;

var move = 0;
var sinVar = 0;

var started = false;

var counter = 0;
var songCounter = 0;
var score = 0;

var orbChanger = 0;
var orb;
var orbTimer = 0;
var orbSize = 30;
var exceededTime = false;

var player;

var synth;
var env;

var frequency = 0;
var pitch = 0;
var synthVal = 60;
var synthPitch = 0;
var finalFreq = 0;
var volume = 0;
var noteLength = 1;
var songArray = [60, 67, 65, 64, 62, 72, 67, 65, 64, 62, 72, 67, 65, 64, 65, 62];
var timeArray = [1, 1, 0.3, 0.3, 0.3, 1, 0.5, 0.3, 0.3, 0.3, 1, 0.5, 0.3, 0.3, 0.3, 1];


function setup() {
  angleMode(DEGREES);
  canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.position((windowWidth - canvasWidth)/2, (windowHeight - canvasHeight)/2);
  video = createCapture(VIDEO);
  video.position((windowWidth - canvasWidth)/2, (windowHeight - canvasHeight)/2);
  pixelDensity(1);
  video.size(canvasWidth/vScale, canvasHeight/vScale);
  video.hide();
  player = new Player();
  orb = new Orb();
  synth = new p5.TriOsc();
  effect = new p5.TriOsc();
  env = new p5.Envelope();
  synth.start();
  effect.start();
}

function draw() {
  background(0, 0, 0, 255);
  video.loadPixels();

  var sinConst = (4*orbTimer/noteLength) - 180;
  noteLength = timeArray[songCounter];
  synthVal = songArray[songCounter];
  synthPitch = midiToFreq(synthVal);
  volume = (1 + sin(sinConst))/2;
  synth.freq(synthPitch);
  synth.amp(1);
  effect.freq(midiToFreq(synthVal + 12));
  effect.amp(volume*2);
  player.moveX(mouseX);
  player.moveY(mouseY)

  if ((player.checkDistFrom(orb.x, orb.y)) < 20){
    orbTimer = 0;
    pitch = 0;
    orbSize = 30;
    exceededTime = false;
    orb.setPos(random(0, canvasWidth), random(0, canvasHeight));
    score += 10*pow(2*volume, 2);
    songCounter++;
  }
  else if ((player.checkDistFrom(orb.x, orb.y)) < 70){
    orbSize = approach(orbSize, 10, 0.1);
    orb.setPos(approach(orb.x, player.x, 0.05), approach(orb.y, player.y, 0.05));
  }

  if (songCounter > songArray.length - 1){
    songCounter = 0;
  }

  if (exceededTime){
    score--;
    orbChanger = 0;
  }
  else{
    orbChanger = volume;
  }

  if (sinConst >= 350) {
    exceededTime = true;
  }
  else{
    exceededTime = false;
  }
  var posChange;
  frequency = synthPitch*volume + orbTimer;
  for(var x = 0; x < video.width; x++){
    for(var y = 0; y < video.height; y++){
      posChange = frequency*sin(5*sinVar*x/4)/5;
      var index = (x + y*video.width)*4;
      var r = video.pixels[index];
      var g = video.pixels[index + 1];
      var b = video.pixels[index + 2];
      var a = video.pixels[index + 3];
      var brightness = (r + g + b)/3;
      fill(r + y*2, g - x - y, b + x*3 - y*5, 255);
      stroke(x - move + r/30, g/30, y + b, 255);
      fill(r + y*2, g - x - y + frequency/30, b + x*3 - y*5, 255);
      strokeWeight(10 - brightness + frequency/50);
      stroke(x - move + r/30, g/30, y + b, 255);
      fill(r + y*2, g - x - y + frequency/30, b + x*3 - y*5, 255);
      ellipse(x*vScale + move*2 - (frequency - 200)/30, y*vScale + frequency/300, 2 + brightness/20, 2 + frequency/400 + brightness/20);
      noStroke();
      fill(r + y*2, g - x - y, b + x*3 - y*5, 30 - r/b + g);
      rect(x*vScale + (frequency/x - 200)/30, y*vScale + posChange - move*3, 1 + frequency/20 + brightness/40, 1 + brightness/40);
      sinVar += 0.5;
    }
  }
  noStroke();
  fill(0, 0, 0, 255);
  rect(canvasWidth - 150, 30, 130, 100);
  textSize(45);
  textStyle(BOLD);
  noStroke();
  fill(255, 255, 255, 255);
  text(parseInt(score), canvasWidth - 140, 100);
  orb.setColor(255 - orbChanger*255, 0, 0 + orbChanger*255, 255);
  orb.show();
  orb.setSize(orbSize);
  player.show();
  if (!started){
    songCounter = 0;
    score = 0;
    synth.amp(0);
    effect.amp(0);
    image(video, 0, 0, canvasWidth, canvasHeight);
    textStyle(BOLD);
    textSize(20);
    strokeWeight(10);
    stroke(150, 0, 255, 150);
    fill(255, 255, 255, 255);
    text("blue orbs will increase score", 100, 50);
    text("waiting for an orb to turn red will decrease score", 100, 100);
    text("click to enter hyperspace", 100, canvasHeight - 50);
  }
  else{
    pitch++;
    orbTimer++;
    counter++;
  }
}

function approach(current, target, speed){
  var change;
  var updated = current;
  var error = target - current;
  change = error*speed;
  updated += change;
  return updated;
}

function orientPlayer(x, y) {
  var angle = atan2((mouseY - y), (mouseX - x));
  push();
  translate(x, y);
  rotate(angle);
  rectMode(CENTER);
  ellipseMode(CENTER);
  scale(0.5);
  fill(120, 120, 120, 255)
  rect(30, 36, 35, 13, 3, 3);
  fill(100, 100, 100, 255)
  rect(40, 0, 30, 40);
  fill(120, 120, 120, 255)
  triangle(-10, 13, -10, 45, 80, 13);
  triangle(-10, -13, -10, -45, 80, -13);
  fill(150, 150, 150, 255);
  ellipse(0, 0, 100, 90);
  fill(110, 110, 110, 255);
  ellipse(0, 0, 30, 30);
  pop();
}

function mousePressed(){
  started = true;
  userStartAudio();
}

function windowResized(){
  canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.position((windowWidth - canvasWidth)/2, (windowHeight - canvasHeight)/2);
}

