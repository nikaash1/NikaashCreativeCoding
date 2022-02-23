var canvasWidth;
var canvasHeight;
var canvas;

//buttons
var moveRed;
var resetRed;
var moveBlue;
var resetBlue;
var moveGreen;
var resetGreen;
var moveAll;
var resetAll;
var mouseFollow;
var menuToggle;
var startButton;

//orbs
var redOrb;
var greenOrb;
var blueOrb;

//orb inputs
var redColor = 0;
var greenColor = 1;
var blueColor = 2;

var angle = 0;

var following = false;
var isReset = false;
var started = false;

//make it much easier to create a custom buttons
class Button{
  constructor(title, size, textContrast, x, y, width, height, rounded, highlightChange, rVal, gVal, bVal, strokeContrast, strokeSize, alpha, textOffsetX, textOffsetY){
    this.title = title;
    this.size = size;
    this.textContrast = textContrast;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.rounded = rounded;
    this.highlightChange = highlightChange;
    this.red = rVal;
    this.green = gVal;
    this.blue = bVal;
    this.alpha = alpha;
    this.strokeContrast = strokeContrast;
    this.strokeSize = strokeSize;
    this.textOffsetX = textOffsetX;
    this.textOffsetY = textOffsetY;

    this.hovered = false;
    this.highlight = 0;
    this.activated = true;
  }
  show(){
    //only show if button is active
    if (this.activated){
      if((mouseX >= this.x - this.width/2) && (mouseX <= this.x + this.width/2) && (mouseY >= this.y - this.height/2) && (mouseY <= this.y + this.height/2)){
        this.highlight = this.highlightChange;
        this.hovered = true;
      }
      else{
        this.highlight = 0;
        this.hovered = false;
      }
      noStroke();
      textSize(this.size);
      textAlign(CENTER, TOP);
      textStyle(BOLD);
      fill(this.red + this.highlight + this.textContrast, this.green + this.highlight + this.textContrast, this.blue + this.highlight + this.textContrast, this.alpha + this.textContrast + this.highlight);
      text(this.title, this.x + this.textOffsetX, this.y + this.textOffsetY, this.width, this.height);
      stroke(this.red + this.strokeContrast, this.green + this.strokeContrast, this.blue + this.strokeContrast, this.alpha + this.strokeContrast);
      strokeWeight(this.strokeSize);
      fill(this.red + this.highlight, this.green + this.highlight, this.blue + this.highlight, this.alpha + this.highlight);
      rectMode(CENTER);
      rect(this.x, this.y, this.width, this.height, this.rounded, this.rounded, this.rounded, this.rounded);
    }
  }
  activate(){
    this.activated = true;
  }
  deactivate(){
    this.activated = false;
  }
}

//to show that buttons are functional
class Orb{
  constructor(color){
    this.x = canvasWidth/2;
    this.y = canvasHeight/2;
    this.color = color;
  }
  move(){
    this.x = random(0, canvasWidth);
    this.y = random(0, canvasHeight);
  }
  setPos(x, y){
    this.x = x;
    this.y = y;
  }
  show(){
    noStroke();
    for (let i = 0; i <= 50; i++){
      if(this.color == 0){
        fill(255, i*5, i*5, i*2);
      }
      else if(this.color == 1){
        fill(i*5, 255, i*5, i*2);
      }
      else if(this.color == 2){
        fill(i*5, i*5, 255, i*2);
      }
      ellipse(this.x, this.y, 30 - i/2, 30 - i/2);
    }
  }
}

function setup() {
  rectMode(CENTER);
  ellipseMode(CENTER);
  canvasWidth = windowWidth - 100;
  canvasHeight = windowHeight - 100;
  canvas = createCanvas(canvasWidth, canvasHeight);
  //center canvas on screen
  canvas.position((windowWidth - canvasWidth)/2, (windowHeight - canvasHeight)/2);

  //create orbs to interact with buttons
  redOrb = new Orb(redColor);
  greenOrb = new Orb(greenColor);
  blueOrb = new Orb(blueColor);

  //create buttons
  //for red orb
  moveRed = new Button("move red", 26, 200, 100, 100, 80, 60, 10, 80, 255, 0, 0, 100, 1, 100, 3, 2);
  resetRed = new Button("reset red", 23, 200, 190, 100, 80, 55, 5, 80, 255, 0, 0, 100, 1, 50, 3, 2);
  //for green orb
  moveGreen = new Button("move green", 23, 120, 100, 165, 80, 60, 10, 80, 0, 255, 0, 100, 1, 70, 3, 4);
  resetGreen = new Button("reset green", 20, 120, 190, 165, 80, 55, 5, 80, 0, 255, 0, 100, 1, 40, 3, 4);
  //for blue orb
  moveBlue = new Button("move blue", 25, 200, 100, 230, 80, 60, 10, 80, 0, 0, 255, 100, 1, 100, 3, 2);
  resetBlue = new Button("reset blue", 22, 200, 190, 230, 80, 55, 5, 80, 0, 0, 255, 100, 1, 50, 3, 2);
  //for all orbs
  moveAll = new Button("move all", 35, 200, 87, 310, 105, 80, 10, 80, 255, 255, 255, 100, 1, 100, 5, 0);
  resetAll = new Button("orbit center", 28, 200, 196, 310, 90, 72, 5, 80, 255, 255, 255, 100, 1, 50, 4, 5);
  //make all orbs follow mouse
  mouseFollow = new Button("follow mouse toggle", 20, 255, 140, 400, 230, 50, 30, 200, 40, 255, 255, 150, 2, 100, 5, 15);
  //to test activate/deactivate feature
  menuToggle = new Button("toggle buttons", 20, 200, canvasWidth - 100, canvasHeight - 50, 160, 40, 3, 100, 100, 0, 150, 100, 1, 50, 4, 10);
  //to start demo
  startButton = new Button("start", 120, 255, canvasWidth/2, canvasHeight/2, 300, 200, 50, 150, 150, 100, 255, 100, 8, 60, 13, 35);
}

function windowResized(){
  canvasWidth = windowWidth - 100;
  canvasHeight = windowHeight - 100;
  canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.position((windowWidth - canvasWidth)/2, (windowHeight - canvasHeight)/2);
}


function draw() {
  background(0, 0, 0, 255);
  if (started){
    menuScreen();
    if(isReset){
      translate(canvasWidth/2, canvasHeight/2);
      angle += 0.08;
    }
    if(following){
      push();
      translate(mouseX - canvasWidth/2, mouseY - canvasHeight/2);
    }
    rotate(angle);
    redOrb.show();
    greenOrb.show();
    blueOrb.show();
  }
  else{
    noStroke();
    fill(150, 100, 255, 255);
    textSize(24);
    textStyle(BOLD);
    textAlign(LEFT);
    text("this is mainly a demo for a clickable button system", 30, canvasHeight - 150);
    startButton.show();
  }
}

function mouseReleased(){
  if(moveRed.hovered){
    redOrb.move();
  }
  if(moveGreen.hovered){
    greenOrb.move();
  }
  if(moveBlue.hovered){
    blueOrb.move();
  }
  if(moveAll.hovered){
    redOrb.move();
    greenOrb.move();
    blueOrb.move();
  }

  if(resetRed.hovered){
    redOrb.setPos(canvasWidth/2, -11 + canvasHeight/2);
  }
  if(resetGreen.hovered){
    greenOrb.setPos(-11 + canvasWidth/2, 11 + canvasHeight/2);
  }
  if(resetBlue.hovered){
    blueOrb.setPos(11 + canvasWidth/2, 11 + canvasHeight/2);
  }
  if(resetAll.hovered){
    if(!isReset){
      redOrb.setPos(0, -11);
      greenOrb.setPos(-11, 11);
      blueOrb.setPos(11, 11);
      isReset = true;
    }
    else{
      redOrb.setPos(canvasWidth/2, -11 + canvasHeight/2);
      greenOrb.setPos(-11 + canvasWidth/2, 11 + canvasHeight/2);
      blueOrb.setPos(11 + canvasWidth/2, 11 + canvasHeight/2);
      isReset = false;
    }
  }
  else{
    isReset = false;
  }

  if(mouseFollow.hovered){
    if(following){
      following = false;
    }
    else{
      following = true;
    }
  }

  if(menuToggle.hovered){
    if(moveRed.activated){
      moveRed.deactivate();
      resetRed.deactivate();
      moveGreen.deactivate();
      resetGreen.deactivate();
      moveBlue.deactivate();
      resetBlue.deactivate();
      moveAll.deactivate();
      resetAll.deactivate();
      mouseFollow.deactivate();
    }
    else{
      moveRed.activate();
      resetRed.activate();
      moveGreen.activate();
      resetGreen.activate();
      moveBlue.activate();
      resetBlue.activate();
      moveAll.activate();
      resetAll.activate();
      mouseFollow.activate();
    }
  }

  if(startButton.hovered){
    startButton.deactivate();
    started = true;
  }
}

function menuScreen(){
  moveRed.show();
  resetRed.show();
  moveGreen.show();
  resetGreen.show();
  moveBlue.show();
  resetBlue.show();
  moveAll.show();
  resetAll.show();
  mouseFollow.show();
  menuToggle.show();
}
