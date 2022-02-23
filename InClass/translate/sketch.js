var canvasWidth = 600;
var canvasHeight = 600;

class Flower{
  constructor(x, y){
    this.numPetals = random(3, 25);
    this.petalLength = random(30, 70);
    this.petalWidth = random(4, 30);
    this.centerDiameter = random(20, 40);
    this.petalColor = color(random(0, 255), random(0, 255), random(0, 255));
    this.centerColor = color(random(0, 255), random(0, 255), random(0, 255));
    this.speedX = random(-2, 2);
    this.speedY = random(-2, 2);
    this.rotateSpeed = 0;
    this.x = x;
    this.y = y;
  }
  show(alpha){
    push();
    translate(this.x, this.y);
    rotate(this.rotateSpeed);
    for(let i = 0; i < this.numPetals; i++){
      fill(this.petalColor, alpha);
      rotate(360/this.numPetals);
      ellipse(this.centerDiameter, 0, this.petalLength, this.petalWidth);
    }
    fill(this.centerColor, alpha);
    ellipse(0, 0, this.centerDiameter, this.centerDiameter);
    pop();
  }
  move(xFactor, yFactor){
    this.x += xFactor*this.speedX;
    this.y += yFactor*this.speedY;
    if ((this.x >= canvasWidth) || (this.x <= 0)){
      this.speedX *= -1;
    }
    if ((this.y >= canvasHeight) || (this.y <= 0)){
      this.speedY *= -1;
    }
    this.rotateSpeed += 5;
  }
}

var flowers = [];

function setup() {
  createCanvas(600, 600);
  background(0, 0, 0, 255);
  angleMode(DEGREES);
}

function draw() {
  background(0, 0, 0, 255);
  for(let i = 0; i < flowers.length; i++){
    flowers[i].show(random(0, 10));
    flowers[i].move(random(1, 5), random(10, 50));
  }
}

function mouseDragged(){
  flowers.push(new Flower(mouseX, mouseY));
}