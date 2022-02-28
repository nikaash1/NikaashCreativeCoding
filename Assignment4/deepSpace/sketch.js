var canvasWidth;
var canvasHeight;

var xMouseVal = [];
var yMouseVal = [];
var xVal = [];
var yVal = [];
var xAdd = 0;
var yAdd = 0;

var xMouseDif;
var yMouseDif;
var xDif;
var yDif;

var snakeThickness = 50;
var snakeThinning = 50;
var snakeSize = 10;
var score = 0;
var counter = 0;

var eaten = false;
var appleColor = snakeSize;
var appleCounter = 0;
var appleSpawn = -255;
var orbColor;
var orbColor2;
var appleX = canvasWidth/2;
var appleY = canvasHeight/2;

var bgFade = 0;

var canvas;

var started = false;

let x = [];
let y = [];

for (let maxScore = 0; maxScore < 10000; maxScore++) {
  x[maxScore] = 0;
  y[maxScore] = 0;
}

var bgImage;

function preload(){
  bgImage = loadImage('assets/spacebg1.jpg');
}

function setup() {
  frameRate(60);
  canvasWidth = windowWidth - 100;
  canvasHeight = windowHeight - 100;
  appleX = random(0, canvasWidth);
  appleY = random(0, canvasHeight);
  canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.position((windowWidth - canvasWidth)/2, (windowHeight - canvasHeight)/2);
  angleMode(DEGREES);
  imageMode(CORNER);
  background(0, 0, 0, 255);
}

function windowResized(){
  canvasWidth = windowWidth - 100;
  canvasHeight = windowHeight - 100;
  canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.position((windowWidth - canvasWidth)/2, (windowHeight - canvasHeight)/2);
}

function draw() {
  var lost = false;
  var xBody = [];
  var yBody = [];

  image(bgImage, 0, 0, canvasWidth + 50, canvasHeight + 50);
  background(0 + bgFade/4, 0 + bgFade/2, 0 + bgFade*2, 255 - pow(bgFade, 2)/100);

  //display score
  if (score >= 0){
    orbColor = 0;
    textStyle(BOLD);
    textSize(50);
    fill(100, 100, 255, 255);
    strokeWeight();
    stroke(100, 100, 100,  score*10);
    text(score, canvasWidth - 75, 80);
    bgFade++;
  }
  else{
    orbColor = 100;
    textStyle(BOLD);
    textSize(20);
    fill(100, 100, 255, 255);
    strokeWeight(7);
    stroke(0, 0, 0, 0);
    text("use the mouse to enter Deep Space", 75, canvasHeight - 100);
  }
  if((bgFade >= 200) || (score > 0)){
    orbColor2 = 0;
  }
  else{
    orbColor2 = 255;
  }

  //this could probably be done better
  strokeWeight(1);
  stroke(0, 0, 0, 0);
  fill(100 - orbColor, 0, 0 + orbColor, 255 + appleSpawn);
  ellipse(appleX, appleY, 25 + orbColor/2, 25 + orbColor/2);
  fill(255 - orbColor*2, 50, 50 + orbColor, 150 + appleSpawn);
  ellipse(appleX, appleY, 20 + orbColor/3, 20 + orbColor/3);
  fill(255 - orbColor*2, 50, 50 + orbColor, 200 + appleSpawn);
  ellipse(appleX, appleY, 16 + orbColor/3, 16 + orbColor/3);
  fill(255 - orbColor*1.5, 100, 100 + orbColor, 255 + appleSpawn);
  ellipse(appleX, appleY, 15 + orbColor/4, 15 + orbColor/4);
  fill(255 - orbColor*1.5, 120, 120, 255 + appleSpawn);
  ellipse(appleX, appleY, 13 + orbColor/5, 13 + orbColor/5);
  fill(255 - orbColor*2, 200, 200, 255 + appleSpawn);
  ellipse(appleX, appleY, 10 + orbColor/7, 10 + orbColor/7);
  fill(255, 255, 255, 255 + appleSpawn);
  ellipse(appleX, appleY, 5 + orbColor/10, 5 + orbColor/10);

  xMouseVal[counter] = mouseX;
  yMouseVal[counter] = mouseY;
  xMouseDif = xMouseVal[counter] - xMouseVal[counter - 1];
  yMouseDif = yMouseVal[counter] - yMouseVal[counter - 1];
  xDif = xMouseVal[counter] - xVal[counter - 1];
  yDif = yMouseVal[counter] - yVal[counter - 1];

  xVal[counter] = xAdd;
  yVal[counter] = yAdd;

  strokeWeight(2 + appleColor/5);
  stroke(50, 70, 60, 20);
  fill(20 + appleColor, 40 - appleColor, 90 - appleColor, 255);
  snakeSegment(0, xVal[counter], yVal[counter], snakeThickness, snakeThickness/1.8);

  for (let i = 0; i < snakeSize - 1; i++) {
    stroke(0, 0, 0, 0);
    fill(70, 0, 140, 100 - ((abs(xDif) + abs(yDif))/10) - i*50/snakeSize);
    snakeSegment(i + 1, x[i], y[i], 1*snakeThickness + (abs(xDif) + abs(yDif))/20 - i/snakeSize, (1*snakeThickness/2) + (abs(xDif) + abs(yDif))/20 - i*20/snakeSize);
  }
  for (let i = 0; i < snakeSize - 1; i++) {
    if (appleCounter == i){
      strokeWeight(10 - i);
      stroke(255 - orbColor2, 100, 100 + orbColor2, 255);
      fill(255 - orbColor2, 100, 100 + orbColor2, 255);
    }
    else{
      strokeWeight(2);
      stroke(50 + i/5, 40 - i/2, 100 + i*2, 50 + i);
      fill(60 + i/2, 100 - i, 100 + i/2, 255 - i*5);
    }
    snakeSegment(i + 1, x[i], y[i], snakeThickness - i/snakeSize, snakeThickness/2 - i*20/snakeSize);
  }

  strokeWeight(2 + appleColor/5);
  stroke(50, 70, 60, 20);
  fill(20 + appleColor, 20, 100, 50);
  snakeSegment(0, xVal[counter], yVal[counter], snakeThickness/1.2, snakeThickness/3);

  if(lost){
    textStyle(BOLD);
    textSize(20);
    fill(100, 100, 255, 255);
    strokeWeight(7);
    stroke(0, 0, 0, 0);
    text("you touched your tail", 75, canvasHeight - 100);
  }

  if((xVal[counter] >= appleX - snakeThickness/2) && (xVal[counter] <= appleX + snakeThickness/2) && (yVal[counter] >= appleY - snakeThickness/2) && (yVal[counter] <= appleY + snakeThickness/2)){
    eaten = true;
  }
  else{
    eaten = false;
  }
  if(eaten){
    snakeSize++;
    appleX = random(0, canvasWidth);
    appleY = random(0, canvasHeight);
    appleColor = 255;
    appleCounter = 0;
    appleSpawn = -255;
  }
  else{
    appleColor = 0;
    appleX = appleX;
    appleY = appleY;
  }

  if ((abs(xDif) >= 17) || (abs(yDif) >= 17)){
    if (xAdd < 0){
      xAdd = 0 + 1;
    }
    else if(xAdd > canvasWidth){
      xAdd = canvasWidth - 1;
    }
    else{
      xAdd += xDif/15;
    }
    if (yAdd < 0){
      yAdd = 0 + 1;
    }
    else if(yAdd > canvasHeight){
      yAdd = canvasHeight - 1;
    }
    else{
      yAdd += yDif/15;
    }
  }
  else if ((abs(xDif) < 17) || (abs(yDif) < 17)){
    xAdd += 0;
    yAdd += 0;
  }
  else{
    xAdd += 0;
    yAdd += 0;
  }
  counter++;
  appleCounter++;
  appleSpawn += 10;
  score = snakeSize - 11;
}

function snakeSegment(arrayPos, x1, y1 , xSize, ySize) {
  var xDist = x1 - x[arrayPos];
  var yDist = y1 - y[arrayPos];
  var angle = atan2(yDist, xDist);
  x[arrayPos] = x1 - cos(angle) * (snakeThickness - 43);
  y[arrayPos] = y1 - sin(angle) * (snakeThickness - 43);
  push();
  translate(x[arrayPos], y[arrayPos]);
  rotate(angle);
  ellipse(0, 0, xSize, ySize);
  pop();
}