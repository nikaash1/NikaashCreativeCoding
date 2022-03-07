var keyWhite = 0;
var keyBlack = 1;

var keyScale = 1;
var whiteWidth = 40*keyScale;
var whiteHeight = 130*keyScale;
var blackWidth = 15*keyScale;
var blackHeight = 75*keyScale;

var whiteKeys = [];
var blackKeys = [];

class Key{
  constructor(x, y, type){
    this.x = x;
    this.y = y;
    this.type = type;
    this.highlightColor = 0;
  }
  show(){
    rectMode(CORNER);
    let keyWidth;
    let keyHeight;
    if (this.type == 0){
      keyWidth = whiteWidth;
      keyHeight = whiteHeight;
      strokeWeight(1);
      stroke(150, 150, 150, 255);
      fill(255, 255, 255, 255 - this.highlightColor);
    }
    else if (this.type == 1){
      keyWidth = blackWidth;
      keyHeight = blackHeight;
      strokeWeight(1);
      stroke(150, 150, 150, 255);
      fill(0, 0, 0, 255 - this.highlightColor);
    }
    rect(this.x, this.y, keyWidth, keyHeight, 0, 0, 5, 5);
  }
  highlight(){
    this.highlightColor = 100;
  }
  unhighlight(){
    this.highlightColor = 0;
  }
}

class Piano{
  constructor(x, y, scales){
    this.x = x;
    this.y = y;
    this.scales = scales;
    for (var offset = 0; offset < this.scales; offset++){
      for(var white = 0; white < 7; white++){
        whiteKeys.push(new Key(this.x + white*40 + 40*offset*7, this.y, keyWhite));
      }
      for(var black = 0; black < 6; black++){
        if(black != 2){
          blackKeys.push(new Key(33 + this.x + black*40 + 40*offset*7, this.y, keyBlack));
        }
      }
    }
  }
  show(){
    for(let i = 0; i < whiteKeys.length; i++){
      whiteKeys[i].show();
    }
    for(let i = 0; i < blackKeys.length; i++){
      blackKeys[i].show();
    }

  }
  highlight(keySelected){
    whiteKeys[keySelected].highlight();
    blackKeys[keySelected].highlight();
  }
  unhighlight(keySelected){
    whiteKeys[keySelected].unhighlight();
    blackKeys[keySelected].unhighlight();
  }
  press(){

  }

}



var canvasWidth = 720;
var canvasHeight = 540;
var canvas;

var video;

var vScale = 10;

var piano;

var scalesAmount = 2;

function setup() {
  rectMode(CORNER);
  ellipseMode(CORNER);
  //canvasWidth = windowWidth - 100;
  //canvasHeight = windowWidth*0.75 - 100;
  canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.position((windowWidth - canvasWidth)/2, (windowHeight - canvasHeight)/2);
  video = createCapture(VIDEO);
  video.position((windowWidth - canvasWidth)/2, (windowHeight - canvasHeight)/2);
  pixelDensity(1);
  video.size(canvasWidth/vScale, canvasHeight/vScale);
  video.hide();
  piano = new Piano((canvasWidth - scalesAmount*7*40)/2, 10, scalesAmount);
}

function windowResized(){
  //canvasWidth = windowWidth - 100;
  //canvasHeight = windowWidth*0.75 - 100;
  canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.position((windowWidth - canvasWidth)/2, (windowHeight - canvasHeight)/2);
  //video.position((windowWidth - canvasWidth)/2, (windowHeight - canvasHeight)/2);
  //video.size(canvasWidth/vScale, canvasHeight/vScale);
}

function draw() {
  background(0, 50, 20, 255);
  video.loadPixels();
  //image(video, 0, 0, canvasWidth, canvasHeight);
  for(var x = 0; x < video.width; x++){
    for(var y = 0; y < video.height; y++){
      var index = (x + y*video.width)*4;
      //var index = 4*(y*canvasWidth) + (x/5);
      var r = video.pixels[index];
      var g = video.pixels[index + 1];
      var b = video.pixels[index + 2];
      var a = video.pixels[index + 3];
      var brightness = (r + g + b)/3;

      fill(r + y*2, g - x - y, b + x*3 - y*5, 255);
      strokeWeight(5 - brightness);
      stroke(x + r/30, g/30, y + b, 255);
      fill(r + y*2, g - x - y, b + x*3 - y*5, 255);
      ellipse(x*vScale, y*vScale, 2 + brightness/20, 2 + brightness/20);
      noStroke();
      fill(r + y*2, g - x - y, b + x*3 - y*5, 30 - r/b + g);
      rect(x*vScale, y*vScale, 1 + brightness/40, 1 + brightness/40);
    }
  }
  piano.show();
  //updatePixels();
}

function mousePressed(){
  //piano.highlight();
}