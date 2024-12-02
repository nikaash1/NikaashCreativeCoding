var num = 2000;
var noiseScale=500, noiseStrength=1;
var particles = [num];
var canvasWidth = 720;
var canvasHeight = 540;
var canvas;

var video;

var vScale = 10;


function setup() {
  canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.position((windowWidth - canvasWidth)/2, (windowHeight - canvasHeight)/2);
  video = createCapture(VIDEO);
  video.position((windowWidth - canvasWidth)/2, (windowHeight - canvasHeight)/2);
  pixelDensity(1);
  video.size(canvasWidth/vScale, canvasHeight/vScale);
  video.hide();
  noStroke();
  for (let i=0; i<canvasWidth/vScale; i++) {
    //x value start slightly outside the right of canvas, z value how close to viewer
    var loc = createVector(random(0, canvasWidth), random(0, canvasHeight), 2);
    var angle = 0; //any value to initialize
    var dir = createVector(cos(angle), sin(angle));
    var speed = random(0.5,2);
    // var speed = random(5,map(mouseX,0,width,5,20));   // faster
    particles[i]= new Particle(loc, dir, speed);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
function draw() {
  background(0, 0, 0, 255);
  video.loadPixels();
  for(var x = 0; x < video.width; x++){
    for(var y = 0; y < video.height; y++){
      var index = (x + y*video.width)*4;
      var r = video.pixels[index];
      var g = video.pixels[index + 1];
      var b = video.pixels[index + 2];
      var a = video.pixels[index + 3];
      var brightness = (r + g + b)/3;
      particles[x].setFill(r, g, b);
      //particles[x].update();
      particles[x].run();
    }
  }
  //fill(0, 10);
  //noStroke();
  //rect(0, 0, width, height);
}

class Particle{
  constructor(_loc,_dir,_speed){
    this.loc = _loc;
    this.dir = _dir;
    this.speed = _speed;
    this._red = 255;
    this._green = 255;
    this._blue = 255;
  }
  run() {
    this.move();
    this.checkEdges();
    this.update();
  }
  move(){
    let angle=noise(this.loc.x/noiseScale, this.loc.y/noiseScale, frameCount/noiseScale)*TWO_PI*noiseStrength; //0-2PI
    this.dir.x = cos(angle);
    this.dir.y = sin(angle);
    var vel = this.dir.copy();
    var d =1;  //direction change 
    vel.mult(this.speed*d); //vel = vel * (speed*d)
    this.loc.add(vel); //loc = loc + vel
  }
  checkEdges(){
    //float distance = dist(width/2, height/2, loc.x, loc.y);
    //if (distance>150) {
    if (this.loc.x<0 || this.loc.x>width || this.loc.y<0 || this.loc.y>height) {    
      this.loc.x = random(width*1.2);
      this.loc.y = random(height);
    }
  }
  update(){
    fill(this._red, this._green, this._blue);
    ellipse(this.loc.x, this.loc.y, 20 + this.loc.z);
  }
  setFill(_red, _green, _blue){
    this._red = _red;
    this._green = _green;
    this._blue = _blue;
  }
}
