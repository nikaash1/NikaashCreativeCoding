class Player{
  constructor(){
    this.x = canvasWidth/2;
    this.y = canvasHeight/2;
    this.pos = createVector(this.x, this.y);
    this.vel = createVector(0, 0);
    this.angle = 0;
  }
  setPos(x, y){
    this.x = x;
    this.y = y;
  }
  moveX(target, speed){
    var speedVal = 0.1*speed;
    this.x = approach(this.x, target, speedVal);
  }
  moveY(target, speed){
    var speedVal = 0.1*speed;
    this.y = approach(this.y, target, speedVal);
  }
  moveTo(targetX, targetY, speed){
    this.moveX(targetX, speed);
    this.moveY(targetY, speed);
  }
  boost(dir, speed){
    var force = p5.Vector.fromAngle(this.angle*dir);
    force.mult(speed*dir);
    this.vel.add(force);
  }
  boostSide(dir, speed){
    var force = p5.Vector.fromAngle((PI/2 + this.angle)*dir);
    force.mult(speed*dir);
    this.vel.add(force);
  }
  go(speed){
    var speedVal = approach(0, speed, 0.03);
    var force = p5.Vector.fromAngle(this.angle);
    force.mult(speedVal);
    this.vel.add(force);
  }
  turn(angle){
    this.angle = angle;
  }
  checkDistFrom(x, y){
    var distVal = dist(this.x, this.y, x, y);
    return distVal;
  }
  update(){
    this.pos.add(this.vel);
    this.vel.mult(0.9);
  }
  show(){
    this.update();
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.angle);
    drawPlayer();
    pop();
    //facePoint(this.x, this.y, drawPlayer);
  }
}
