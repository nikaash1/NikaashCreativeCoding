var canvasWidth = 720;
var canvasHeight = 540;
var canvas;

var spiderSymbol;
var spiderMask;
var ironMask;
var angerLevel = 0;

var video;
var classifier;
var faceTracker;
var faceDetection;

var faceX = 0
var faceY = 0;
var faceWidth = 0;
var faceHeight = 0;

var spiderMan = 0;
var ironMan = 0;
var hulk = 0;

var spiderVal = 0;
var ironVal = 1;
var hulkVal = 2;


console.log('ml5 version:', ml5.version);


class Hero{
  constructor(){
    this.confidence = 0;
  }
  setConfidence(amount){
    this.confidence = amount;
  }
}


function preload(){
  spiderSymbol = loadImage('spiderLogo.png');
  spiderMask = loadImage('spiderMask.png');
  ironMask = loadImage('ironMask.png');
  classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/Cq9yQcCDG/model.json')
}

function setup(){
  frameRate(12);
  canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.position((windowWidth - canvasWidth)/2, (windowHeight - canvasHeight)/2);
  video = createCapture(VIDEO);
  video.position((windowWidth - canvasWidth)/2, (windowHeight - canvasHeight)/2);
  pixelDensity(1);
  video.size(canvasWidth, canvasHeight);
  video.hide();
  faceTracker = ml5.faceApi(video);
}

function draw() {
  background(0, 0, 0, 255);
  imageMode(CORNER);
  image(video, 0, 0, canvasWidth, canvasHeight);
  textSize(20);
  fill(255, 0, 0, 255);
  text(spiderMan, 50, 50);
  fill(255, 150, 0, 255);
  text(ironMan, 50, 100);
  fill(0, 255, 0, 255);
  text(hulk, 50, 150);
  applyEffect(selectHero(30));
  classifyVideo();
  findFace();
}

function selectHero(maxError){
  if(spiderMan >= 100 - maxError){
    return spiderVal;
  }
  else if(ironMan >= 100 - maxError){
    return ironVal;
  }
  else if(hulk >= 100 - maxError){
    return hulkVal;
  }
  else{
    return -1;
  }
}

function applyEffect(hero){
  ellipseMode(CORNER);
  imageMode(CENTER);
  fill(255, 0 , 0, 255);
  if(hero == spiderVal){
    angerLevel = 0;
    tint(255, 255, 255, 100);
    image(spiderSymbol, canvasWidth/2, -20 + canvasHeight/2);
    tint(255, 255, 255, 255);
    image(spiderMask, faceX + 100, faceY, faceWidth*2, faceHeight*2);
  }
  else if(hero == ironVal){
    angerLevel = 0;
    tint(255, 255, 255, 255);
    image(ironMask, faceX + 100, faceY, faceWidth*2, faceHeight*2);
  }
  else if(hero == hulkVal){
    angerLevel += 10;
    tint(255 - angerLevel, 255, 255 - angerLevel, 255 - angerLevel/10);
  }
  else{
    angerLevel = 0;
    tint(255, 255, 255, 255);
  }
}

function findFace(){
  faceTracker.detect(getFaceResults);
}

function getFaceResults(error, results){
  if(error){
    console.error(error);
    console.log("o shit");
    return;
  }
  faceDetection = results;
  if(faceDetection.length > 0){
    faceX = faceDetection[0].alignedRect._box._x;
    faceY = faceDetection[0].alignedRect._box._y;
    faceWidth = faceDetection[0].alignedRect._box._width/1.5;
    faceHeight = faceDetection[0].alignedRect._box._height;
  }
  else{
    faceX = 0;
    faceY = 0;
    faceWidth = 0;
    faceHeight = 0;
  }
}

function classifyVideo(){
  classifier.classify(video, getHandResults);
}

function getHandResults(error, results){
  if(error){
    console.error(error);
    console.log("o shit");
    text("fuck", 50, 50);
    return;
  }
  for(let i = 0; i < results.length; i++){
    if(results[i].label == 'spider'){
      spiderMan = 100*results[i].confidence;
    }
    else if(results[i].label == 'iron'){
      ironMan = 100*results[i].confidence;
    }
    else if(results[i].label == 'hulk'){
      hulk = 100*results[i].confidence;
    }
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

function windowResized(){
  canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.position((windowWidth - canvasWidth)/2, (windowHeight - canvasHeight)/2);
}

