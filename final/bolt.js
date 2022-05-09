class Bolt{
  constructor(x, y, velocity){
    this.pos = createVector(x, y);
    this.vel = velocity;
    this.size = 0.5;
    this.red = 255;
    this.green = 0;
    this.blue = 0;
    this.alpha = 255;
  }
  checkDistFrom(x, y){
    var distVal = dist(this.pos.x, this.pos.y, x, y);
    return distVal;
  }
  setPos(x, y){
    this.pos.set(x, y);
  }
  setSize(size){
    this.size = size;
  }
  setColor(red, green, blue, alpha){
    this.red = red;
    this.green = green;
    this.blue = blue;
    this.alpha = alpha;
  }
  show(){
    this.pos.add(this.vel);
    for (let i = 0; i <= 50; i++){
      push();
      translate(this.pos.x, this.pos.y);
      scale(this.size);
      noStroke();
      ellipseMode(CENTER);
      fill(i*5 + this.red, i*5 + this.green, i*5 + this.blue, this.alpha - 255 + i*2);
      ellipse(0, 0, 30 - i/2, 30 - i/2);
      pop();
    }
    //fill(255, 0, 0, 255);
    //ellipse(this.pos.x, this.pos.y, 30, 30);
  }
}