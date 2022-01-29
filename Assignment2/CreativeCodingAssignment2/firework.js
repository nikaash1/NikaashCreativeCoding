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
  stroke(0, 0, 30, 0);
  for(i = 0; i <= circlesStraightX; i++){
    ellipseMode(CENTER);
    fill(0 + i*5, 100 + i*2, 255 - i*20, 60);
    ellipse(35 + i*straightChangeRate, 250, 70, 67);
  }
  for(i = 0; i <= circlesStraightY; i++){
    ellipseMode(CENTER);
    fill(30 + i*10, 100 - i*4, 80, 60);
    ellipse(300, 32 + i*straightChangeRate, 67, 64);
  }
  for(i = 0; i <= circlesDiag; i++){
    ellipseMode(CORNER);
    let rChangeRate = -5;
    let gChangeRate = 4;
    let bChangeRate = -30;
    fill(130 + i*rChangeRate, 0 + i*gChangeRate, 0 + i*bChangeRate, 100);
    ellipse(542 - i*xChangeRate, 0 + i*yChangeRate, 58, 67);
  }
  for(i = 0; i <= circlesDiag; i++){
    ellipseMode(CORNER);
    let rChangeRate = 20;
    let gChangeRate = 6;
    let bChangeRate = -20;
    fill(130 + i*rChangeRate, 0 + i*gChangeRate, 255 + i*bChangeRate, 100);
    ellipse(0 + i*xChangeRate, 0 + i*yChangeRate, 58, 67);
  }
}