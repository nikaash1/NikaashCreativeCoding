var canvasWidth;
var canvasHeight;
var canvas;

var testSound;

function preload(){
  soundFormats('mp3');
  testSound = loadSound('ono.mp3');
}

function setup() {
  canvasWidth = windowWidth - 100;
  canvasHeight = windowHeight - 100;
  canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.position((windowWidth - canvasWidth)/2, (windowHeight - canvasHeight)/2);
  angleMode(DEGREES);
}

function windowResized(){
  background(0, 0, 0, 255);
  canvasWidth = windowWidth - 100;
  canvasHeight = windowHeight - 100;
  canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.position((windowWidth - canvasWidth)/2, (windowHeight - canvasHeight)/2);
}

function draw() {
  background(0, 0, 0, 255);
}

function mouseReleased(){
  testSound.play();
}