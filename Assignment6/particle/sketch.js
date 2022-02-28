var canvasWidth;
var canvasHeight;
var canvas;

class Flare {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D();
    this.vel.mult(random(0.5, 2));
    this.acc = createVector(0, 0);
    this.r = 64;
    this.lifetime = 255;
    this.red = 255;
    this.green = 255;
    this.blue = 255;
  }
  setRadius(size){
    this.r = size;
  }
  setColor(red, green, blue){
    this.red = red;
    this.green = green;
    this.blue = blue;
  }
  finished() {
    return this.lifetime < 150;
  }
  applyForce(force) {
    this.acc.add(force);
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.set(0, 0);

    this.lifetime -= 15;
  }

  show() {
    tint(this.red, this.green, this.blue, this.lifetime);
    imageMode(CENTER);
    image(img, this.pos.x, this.pos.y, this.r, this.r);
  }
}

class Flame {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.particles = [];
    this.radius = 64;
    this.red = 255;
    this.green = 255;
    this.blue = 255;
  }
  setRadius(size){
    this.radius = size;
  }
  setColor(red, green, blue){
    this.red = red;
    this.green = green;
    this.blue = blue;
  }
  moveTo(x, y){
    this.position.x = x;
    this.position.y = y;
  }
  emit(num) {
    for (let i = 0; i < num; i++) {
      this.particles.push(new Flare(this.position.x, this.position.y));
    }
  }

  applyForce(force) {
    for (let particle of this.particles) {
      particle.applyForce(force);
    }
  }

  update() {
    for (let particle of this.particles) {
      particle.update();
    }

    for (let i = this.particles.length - 1; i >= 0; i--) {
      if (this.particles[i].finished()) {
        this.particles.splice(i, 1);
      }
    }
  }

  show() {
    for (let particle of this.particles) {
      particle.setRadius(this.radius);
      particle.setColor(this.red, this.green, this.blue);
      particle.show();
    }
  }
}

class Particle{
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D();
    this.vel.mult(random(0.5, 2));
    this.acc = createVector(0, 0);
    this.radius = 2;
    this.lifetime = 255;
    this.red = 255;
    this.green = 255;
    this.blue = 255;
    this.alpha = 255;
  }
  setColor(red, green, blue, alpha){
    this.red = red;
    this.green = green;
    this.blue = blue;
    this.alpha = alpha;
  }
  finished() {
    return this.lifetime < 0;
  }
  applyForce(force) {
    this.acc.add(force);
  }
  edges() {
    if (this.pos.y >= height - this.r) {
      this.pos.y = height - this.r;
      this.vel.y *= -1;
    }
    if (this.pos.x >= width - this.r) {
      this.pos.x = width - this.r;
      this.vel.x *= -1;
    }
    else if (this.pos.x <= this.r) {
      this.pos.x = this.r;
      this.vel.x *= -1;
    }
  }
  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.set(0, 0);
    this.lifetime -= 5;
  }
  show() {
    noStroke();
    fill(this.red, this.green, this.blue, this.lifetime*this.alpha/255);
    ellipse(this.pos.x, this.pos.y, 2*this.radius, 2*this.radius);
  }
}

class Emitter{
  constructor(x, y) {
    this.position = createVector(x, y);
    this.particles = [];
    this.red = 255;
    this.green = 255;
    this.blue = 255;
    this.alpha = 255;
  }
  setColor(red, green, blue, alpha){
    this.red = red;
    this.green = green;
    this.blue = blue;
    this.alpha = alpha;
  }
  emit(num) {
    for (let i = 0; i < num; i++) {
      this.particles.push(new Particle(this.position.x, this.position.y));
    }
  }
  update() {
    for (let particle of this.particles) {
      let gravity = createVector(0, 0.2);
      particle.applyForce(gravity);
      particle.update();
    }
    for (let i = this.particles.length - 1; i >= 0; i--) {
      if (this.particles[i].finished()) {
        this.particles.splice(i, 1);
      }
    }
  }
  getPos(){
    return this.position;
  }
  show() {
    for (let particle of this.particles) {
      particle.setColor(this.red, this.green, this.blue, this.alpha);
      particle.show();
    }
  }
}

var counter = 0;
var counter2 = 0;
var fade = 0;
var endFade = 0;
var released = false;

var emitters = [];
var mouseXVals = [];
var mouseYVals = [];
var xPos = [];
var yPos = [];
var flame;

var error = 0;

var currentX = 0;
var currentY = 0;

var radius = 1;

function preload() {
  img = loadImage('texture32.png');
}

function setup() {
  frameRate(60);
  canvasWidth = windowWidth - 100;
  canvasHeight = windowHeight - 100;
  canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.position((windowWidth - canvasWidth)/2, (windowHeight - canvasHeight)/2);
  flame = new Flame(mouseX, mouseY);
}

function draw() {
  clear();
  background(0, 0, 0, 255);
  blendMode(ADD);
  let force = createVector(random(-1, 1), -1);
  flame.applyForce(force);
  flame.emit(1);
  flame.setRadius(radius);
  flame.setColor(255, 80, 50);
  mouseXVals[counter] = mouseX;
  mouseYVals[counter] = mouseY;
  xPos[counter] = currentX;
  yPos[counter] = currentY;

  if(mouseIsPressed){
    flame.moveTo(mouseX, mouseY);
    fade = 0;
    var mouseDist = dist(mouseXVals[counter], mouseYVals[counter], mouseXVals[counter - 1], mouseYVals[counter - 1]);
    var distFromFirst = dist(xPos[counter - emitters.length], yPos[counter - emitters.length], currentX, currentY);
    error = dist(currentX, currentY, mouseX, mouseY);
    if(emitters.length < 20){
      currentX = mouseX;
      currentY = mouseY;
      emitters.push(new Emitter(currentX, currentY));
    }
    else{
      endFade += 10;
      if(endFade >= 500/emitters.length){
        emitters.shift();
        endFade = 0;
      }
    }
    if(radius < 50){
      radius++;
    }
    counter2 = counter;
  }
  else{
    if(radius > 1){
      radius--;
    }
  }

  for (let i = 0; i < emitters.length; i++){
    emitters[i].setColor(255, 50 + i*12, 0 + i*12, i*500/emitters.length - fade - endFade);
    emitters[i].emit(10);
    emitters[i].show();
    emitters[i].update();
  }
  if(radius > 5){
    flame.show();
  }
  flame.update();
  if (released){
    fade += 10;
  }
  if (fade >= 500){
    fade = 0;
    released = false;
    emitters = [];
  }
  counter++;
}

function windowResized(){
  canvasWidth = windowWidth - 100;
  canvasHeight = windowHeight - 100;
  canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.position((windowWidth - canvasWidth)/2, (windowHeight - canvasHeight)/2);
}

function mousePressed(){
  emitters = [];
}

function mouseReleased(){
  released = true;
}