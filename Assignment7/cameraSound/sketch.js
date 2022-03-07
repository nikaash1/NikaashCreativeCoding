var keyWhite = 0;
var keyBlack = 1;

var keyScale = 1;
var whiteWidth = 40*keyScale;
var whiteHeight = 130*keyScale;
var blackWidth = 15*keyScale;
var blackHeight = 75*keyScale;

var whiteKeys = [];
var blackKeys = [];
var allKeys = [];

class Key{
  constructor(x, y, type){
    this.x = x;
    this.y = y;
    this.type = type;
    this.highlightColor = 0;
    this.keyWidth = 0;
    this.keyHeight = 0;
  }
  show(){
    rectMode(CORNER);
    if (this.type == 0){
      this.keyWidth = whiteWidth;
      this.keyHeight = whiteHeight;
      strokeWeight(1);
      stroke(150, 150, 150, 255);
      fill(255 - this.highlightColor, 255 - this.highlightColor, 255 - this.highlightColor, 255);
    }
    else if (this.type == 1){
      this.keyWidth = blackWidth;
      this.keyHeight = blackHeight;
      strokeWeight(1);
      stroke(150, 150, 150, 255);
      fill(0 + this.highlightColor, 0 + this.highlightColor, 0 + this.highlightColor, 255);
    }
    rect(this.x, this.y, this.keyWidth, this.keyHeight, 0, 0, 5, 5);
  }
  highlight(amount){
    this.highlightColor = amount;
  }
  check(xInput, yInput){
    if((xInput >= this.x) && (xInput <= this.x + this.keyWidth) && (yInput >= this.y) && (yInput <= this.y + this.keyHeight)){
      return true;
    }
    else{
      return false;
    }
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
      for(var black = 0; black < 7; black++){
        if((black != 2) && (black != 6)){
          blackKeys.push(new Key(33 + this.x + black*40 + 40*offset*7, this.y, keyBlack));
        }
        else{
          blackKeys.push(false);
        }
      }
    }
    var whiteCounter = 0;
    var blackCounter = 0;
    for(var all = 0; all < whiteKeys.length + blackKeys.length; all++){
      if (whiteCounter < whiteKeys.length){
        allKeys.push(whiteKeys[whiteCounter]);
        whiteCounter++;
      }
      if(blackCounter < blackKeys.length){
        if(blackKeys[blackCounter] != false){
          allKeys.push(blackKeys[blackCounter]);
        }
        blackCounter++;
      }
    }
  }
  show(){
    for(let i = 0; i < whiteKeys.length; i++){
      whiteKeys[i].show();
    }
    for(let i = 0; i < blackKeys.length; i++){
      if(blackKeys [i] != false){
        blackKeys[i].show();
      }
    }
  }
  keySelectHighlight(xInput, yInput, amount){
    var whiteHighlight = true;
    for(let i = 0; i < blackKeys.length; i++){
      if(blackKeys[i] != false){
        if(blackKeys[i].check(xInput, yInput)){
          blackKeys[i].highlight(amount);
          whiteHighlight = false;
        }
        else{
          blackKeys[i].highlight(0);
        }
      }
    }
    for(let i = 0; i < whiteKeys.length; i++){
      if((whiteKeys[i].check(xInput, yInput)) && whiteHighlight){
        whiteKeys[i].highlight(amount);
      }
      else{
        whiteKeys[i].highlight(0);
      }
    }
  }
  whiteSelected(xInput, yInput){
    let selected = false;
    for(let i = 0; i < whiteKeys.length; i++){
      if(whiteKeys[i].check(xInput, yInput)){
        selected = true;
      }
    }
    return selected;
  }
  blackSelected(xInput, yInput){
    let selected = false;
    for(let i = 0; i < blackKeys.length; i++){
      if(blackKeys[i] != false){
        if(blackKeys[i].check(xInput, yInput)){
          selected = true;
        }
      }
    }
    return selected;
  }
  allSelected(xInput, yInput){
    let selected = false;
    for(let i = 0; i < allKeys.length; i++){
      if(allKeys[i].check(xInput, yInput)){
        selected = true;
      }
    }
    return selected;
  }
  getWhiteKey(){
    let selected = 0;
    for(let i = 0; i < whiteKeys.length; i++){
      if(whiteKeys[i].check(mouseX, mouseY)){
        selected = i;
      }
    }
    return selected;
  }
  getBlackKey(){
    let selected = 0;
    for(let i = 0; i < blackKeys.length; i++){
      if(blackKeys[i].check(mouseX, mouseY)){
        selected = i;
      }
    }
    return selected;
  }
  getKey(){
    let selected = 0;
    for(let i = 0; i < allKeys.length; i++){
      if(allKeys[i].check(mouseX, mouseY)){
        selected = i;
      }
    }
    return selected;
  }
}

var canvasWidth = 720;
var canvasHeight = 540;
var canvas;

var video;

var vScale = 20;

var piano;

var frequency = 0;

var move = 0;

var scalesAmount = 2;

var synth;

function setup() {
  rectMode(CORNER);
  ellipseMode(CORNER);
  canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.position((windowWidth - canvasWidth)/2, (windowHeight - canvasHeight)/2);
  video = createCapture(VIDEO);
  video.position((windowWidth - canvasWidth)/2, (windowHeight - canvasHeight)/2);
  pixelDensity(1);
  video.size(canvasWidth/vScale, canvasHeight/vScale);
  video.hide();
  piano = new Piano((canvasWidth - scalesAmount*7*40)/2, 10, scalesAmount);
  synth = new p5.TriOsc();
  env = new p5.Envelope();
}

function draw() {
  background(0 + pow(frequency/50, 2), 0 - frequency/30, 0 + frequency/50, 255);
  video.loadPixels();
  for(var x = 0; x < video.width; x++){
    for(var y = 0; y < video.height; y++){
      var index = (x + y*video.width)*4;
      var r = video.pixels[index];
      var g = video.pixels[index + 1];
      var b = video.pixels[index + 2];
      var a = video.pixels[index + 3];
      var brightness = (r + g + b)/3;

      fill(r + y*2, g - x - y, b + x*3 - y*5, 255);
      strokeWeight(10 - brightness + frequency/50);
      stroke(x - move + r/30, g/30, y + b, 255);
      fill(r + y*2, g - x - y + frequency/30, b + x*3 - y*5, 255);
      ellipse(x*vScale + move*2 - (frequency - 200)/30, y*vScale + frequency/300, 2 + brightness/20, 2 + frequency/400 + brightness/20);
      noStroke();
      fill(r + y*2, g - x - y, b + x*3 - y*5, 30 - r/b + g);
      rect(x*vScale + (frequency - 200)/30, y*vScale - move*3, 1 + frequency/20 + brightness/40, 1 + brightness/40);
    }
  }
  if (frequency >= 400){
    if(move >= 30){
      move -= 10;
    }
    else{
      move += 15
    }
  }
  else if(frequency >= 100){
    if(move >= 10){
      move -= 3*frequency/30;
    }
    else{
      move += 1*frequency/50;
    }
  }
  else{
    if(move > 0){
      move -= 0.1;
    }
    else{
      move = 0;
    }
  }
  piano.keySelectHighlight(mouseX, mouseY, 50);
  piano.show();
}

function windowResized(){
  canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.position((windowWidth - canvasWidth)/2, (windowHeight - canvasHeight)/2);
}

function mousePressed(){
  var midiVal = piano.getKey() + 60;
  if(piano.allSelected(mouseX, mouseY)){
    synth.start();
    frequency = midiToFreq(midiVal);
    synth.freq(frequency);
    env.ramp(synth, 0, 1, 0);
  }
  userStartAudio();
}

function mouseReleased(){
  frequency = 0;
}