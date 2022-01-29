function setup(){
  createCanvas(600, 500);
}

function draw(){
  //loop counter
  var i;
  //black background
  background(0, 0, 0);
  //no outline
  stroke(0, 0, 0, 0);
  //outer glow
  for(i = 0; i <= 520; i++){
    ellipseMode(CENTER);
    fill(100 + i/3, 30 + i/10, 255 - i/2,  1 + i/80);
    ellipse(40 + i, 250, 70, 200);
  }
  //main beam
  for(i = 0; i <= 250; i++){
    ellipseMode(CENTER);
    fill(100 + i/2, 100 + i/9, 255 - i/5, 60);
    ellipse(50 + i*2, 250, 70, 70);
  }
  //inner beam
  for(i = 0; i <= 250; i++){
    ellipseMode(CENTER);
    fill(200, 200, 200, 0+i/7);
    ellipse(50 + i*2, 250, 40, 40);
  }
}