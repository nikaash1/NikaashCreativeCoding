class Weapon{
  constructor(type, angle){
    this.pos = createVector(canvasWidth/2, canvasHeight/2);
    this.vel = createVector(0, 0);
    this.bolts = [];
    this.type = type;
    this.angle = angle;
  }
  updateAngle(angle){
    this.angle = angle;
  }
  shoot(speed){
    var force = p5.Vector.fromAngle(this.angle);
    force.mult(speed);
    this.bolts.push(new Bolt(player.pos.x + 20*random(-1, 1), player.pos.y, force));
  }
  saveResources(){
    for(let i = 0; i < this.bolts.length; i++){
      if((this.bolts[i].pos.x < 0) || (this.bolts[i].pos.x > canvasWidth) || (this.bolts[i].pos.y < 0) || (this.bolts[i].pos.y > canvasHeight)){
        this.bolts.shift();
      }
    }
    /*if(this.bolts.length > 20){
      this.bolts.shift();
    }*/
  }
  checkDistFrom(x, y){
    var distVal = dist(this.pos.x, this.pos.y, x, y);
    return distVal;
  }
  draw(){
    this.saveResources();
    for(let i = 0; i < this.bolts.length; i++){
      this.bolts[i].show();
    }
  }
  show(){
    //this.saveResources();
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.angle);
    this.draw();
    pop();
  }
}
