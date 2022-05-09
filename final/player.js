class Player{
  constructor(){
    this.pos = createVector(canvasWidth/2, canvasHeight/2);
    this.vel = createVector(0, 0);
    this.angle = 0;
    this.thrusters = 0;
    this.boosters = 0;
    this.blasters = new Weapon(1, this.angle);
  }
  /*dash(dir, speed){
    var force = p5.Vector.fromAngle(this.angle*dir);
    force.mult(speed*dir);
    this.vel.add(force);
  }*/
  boost(dir, speed){
    var force = p5.Vector.fromAngle((PI/2 + this.angle) + PI*dir);
    force.mult(speed*dir);
    this.vel.add(force);
    this.boosters = approach(this.boosters, 255*dir, 0.5);
  }
  go(speed){
    var speedVal = approach(0, speed, 0.03);
    var force = p5.Vector.fromAngle(this.angle);
    force.mult(speedVal);
    this.vel.add(force);
    this.thrusters = approach(this.thrusters, 255, 0.06);
  }
  turn(angle){
    this.angle = angle;
  }
  checkDistFrom(x, y){
    var distVal = dist(this.pos.x, this.pos.y, x, y);
    return distVal;
  }
  shoot(){
    this.blasters.updateAngle(this.angle);
    this.blasters.shoot(10);
  }
  draw(){
    rectMode(CENTER);
    ellipseMode(CENTER);
    scale(0.5);
    //thrusters
    strokeWeight(4);
    stroke(0, 200, 255, this.thrusters*3);
    fill(0, 200, 255, this.thrusters);
    ellipse(-5 - this.thrusters/10, 0, 120, 80);
    ellipse(-8, 0, 110, 80);
    //boosters
    stroke(255, 100, 0, abs(this.boosters)*3);
    fill(255, 100, 0, abs(this.boosters));
    ellipse(0, this.boosters/5, 100, 90);
    ellipse(0, this.boosters/3, 80, 90);
    //ship
    noStroke();
    fill(120, 120, 120, 255);
    rect(30, 36, 35, 13, 3, 3);
    fill(100, 100, 100, 255);
    rect(40, 0, 30, 40);
    fill(120, 120, 120, 255);
    triangle(-10, 13, -10, 45, 80, 13);
    triangle(-10, -13, -10, -45, 80, -13);
    fill(150, 150, 150, 255);
    ellipse(0, 0, 100, 90);
    fill(110, 110, 110, 255);
    ellipse(0, 0, 30, 30);
  }
  update(){
    this.pos.add(this.vel);
    this.vel.mult(0.9);
    this.thrusters *= 0.9;
    this.boosters *= 0.9;
  }
  show(){
    this.blasters.draw();
    this.update();
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.angle);
    this.draw();
    pop();
    //facePoint(this.x, this.y, drawPlayer);
  }
}