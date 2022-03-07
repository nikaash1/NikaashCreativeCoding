var canvasWidth;
var canvasHeight;
var canvas;

function setup() {
  canvasWidth = windowWidth - 100;
  canvasHeight = windowHeight - 100;
  canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.position((windowWidth - canvasWidth)/2, (windowHeight - canvasHeight)/2);
}

function windowResized(){
  canvasWidth = windowWidth - 100;
  canvasHeight = windowHeight - 100;
  canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.position((windowWidth - canvasWidth)/2, (windowHeight - canvasHeight)/2);
}

function draw() {
  background(0, 0, 0, 255);
}