this.focus();

let bimp;

let right, left, up, down, pulse, halt, pauseButton;

let p = 0;

function mapKeysArrows() {
  right = RIGHT_ARROW;
  left = LEFT_ARROW;
  up = UP_ARROW;
  down = DOWN_ARROW; 
  pulse = 32;
  halt = 66;
  pauseButton = 27;
}

function mapKeysWASD() {
  right = 68;
  left = 65;
  up = 87;
  down = 83;
  pulse = 32;
  halt = 66;
  pauseButton = 80;
}

function setup() {
  //mapKeysWASD();
  mapKeysArrows();
  createCanvas(600, 400);
  createWalls();
  bimp = new Bimp();
}

function draw() {
  background(2, 266, 200);
  if (walls.length > 0) runWalls();
  bimp.run();
}

function pauseSwitch(){
  if(keyCode == pauseButton){
    if(p == 0) p = 1;
    else if(p == 1) p = 0;
  }
}

function keyPressed(){
  pauseSwitch();
}
