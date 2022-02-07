var platAngle = 0;
var wheelAngle = 0;
var loc = 0;

function setup(){
  createCanvas(windowWidth, windowHeight);
}

function draw(){
  var i;
  background(0, 150, 250, 255);
  rectMode(CORNER);
  stroke(0, 0, 0, 0);
  fill(255, 255, 255, 200);
  translate(-loc/10, 0);
  for(i = 0; i <= 10; i++){
    let spacing = i*250;
    ellipse(120 + spacing, 100, 200, 75);
    ellipse(120 + spacing, 100, 200, 50);
    ellipse(90 + spacing, 75, 75, 50);
    ellipse(130 + spacing, 70, 75, 60);
    ellipse(160 + spacing, 80, 75, 50);
    ellipse(180 + spacing, 90, 75, 50);
    ellipse(50 + spacing, 90, 30, 50);
    ellipse(30 + spacing, 90, 20, 30);
    ellipse(40 + spacing, 110, 50, 40);
    ellipse(80 + spacing, 120, 80, 60);
    ellipse(120 + spacing, 120, 60, 50);
    ellipse(150 + spacing, 120, 70, 50);
    ellipse(180 + spacing, 110, 90, 60);
  }
  for(i = 0; i <= 10; i++){
    let spacing = 200;
    let spacing2 = 110 + i*300;
    ellipse(120 + spacing2, 100 + spacing, 200, 75);
    ellipse(120 + spacing2, 100 + spacing, 200, 50);
    ellipse(90 + spacing2, 75 + spacing, 75, 50);
    ellipse(130 + spacing2, 70 + spacing, 75, 60);
    ellipse(160 + spacing2, 80 + spacing, 75, 50);
    ellipse(180 + spacing2, 90 + spacing, 75, 50);
    ellipse(50 + spacing2, 90 + spacing, 30, 50);
    ellipse(30 + spacing2, 90 + spacing, 20, 30);
    ellipse(40 + spacing2, 110 + spacing, 50, 40);
    ellipse(80 + spacing2, 120 + spacing, 80, 60);
    ellipse(120 + spacing2, 120 + spacing, 60, 50);
    ellipse(150 + spacing2, 120 + spacing, 70, 50);
    ellipse(180 + spacing2, 110 + spacing, 90, 60);
  }
  stroke(0, 0, 0, 0);
  fill(40, 100, 0, 255);
  rect(0, 40 + windowHeight/2, windowWidth*10, windowHeight);
  translate(loc/4, 0);
  strokeWeight(2);
  stroke(30, 90, 0, 255);
  translate(-loc, 0);
  for (var counter = 0; counter <= 100; counter++){
    for (i = 0; i <= windowWidth; i++){
      line(-100 + 10*i + counter*5, counter*5 + 40 + windowHeight/2, -100 + 10*i + counter*5, counter*5 + 38 + windowHeight/2);
    }
  }
  stroke(0, 0, 0, 0);
  fill(40, 100, 0, 255);
  translate(loc/2, 0);
  translate(windowWidth/2, windowHeight/2);
  rectMode(CENTER);
  rotate(platAngle);
  strokeWeight(5);
  stroke(0, 0, 0, 255);
  fill(150, 0, 255, 255);
  rect(0, 0, 200, 50, 3, 3, 3, 3);
  strokeWeight(10);
  stroke(255, 0, 0, 255);
  translate(100, 25);
  rotate(wheelAngle);
  line(0, -15, 0, 15);
  line(-15, 0, 15, 0);
  rotate(-wheelAngle);
  translate(-200, 0);
  rotate(wheelAngle);
  line(0, -15, 0, 15);
  line(-15, 0, 15, 0);
  wheelAngle += 0.5;
  loc += 10;
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}