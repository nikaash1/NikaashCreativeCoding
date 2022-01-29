function setup(){
  createCanvas(600, 500);
}

function draw(){
  var i;
  var xChangeRate = 20;
  var yChangeRate = 16;
  var straightChangeRate = 23;
  var circlesStraightX = 23;
  var circlesStraightY = 19;
  var circlesDiag = 27;
  background(0, 0, 0);
  strokeWeight(100);
  //red line
  stroke(255, 0, 0, 150);
  line(0, 0, 300, 250);
  //green line
  stroke(0, 255, 0, 100);
  line(300, 0, 300, 250);
  //blue line
  stroke(0, 0, 255, 120);
  line(600, 0, 300, 250);
  //white line
  strokeWeight(100);
  stroke(255, 255, 255, 200);
  line(300, 250, 300, 500);
}