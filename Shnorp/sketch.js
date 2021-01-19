let s, bumb, bumbo;
let boops = [];

let bumbis = 1;

function createButtons(){
  bumb = createButton("shnorp");
  bumb.mousePressed(Bumbo);
}

function setup() {
  createCanvas(500, 400);
  s = new Shnorp();
  createButtons();
  //createBoops();
}

function draw() {
  if(!keyIsPressed)background(247,224,139);
  s.run();
  runBoops();
}

class Shnorp {
  constructor() {
    this.x = width/2;
    this.y = height/2;
    this.size = 18;
    this.xto = this.x;
    this.yto = this.y;
    this.spd = 0.05;
    this.accX = 0;
    this.accY = 0;
    this.topAcc = 25;
    this.fric = 1;
    this.color = color(random(255),random(255),random(255));
  }

  run() {
    this.show();
    this.move();
    this.follow();
  }

  show() {
    ellipseMode(RADIUS);
    fill(this.color);
    noStroke();
    ellipse(this.x, this.y, this.size);
    stroke(this.color);
    strokeWeight(5);
    line(this.x, this.y, this.xto, this.yto);
  }

  follow(){
    if (mouseY < height && mouseIsPressed) {
      this.xto = mouseX;
      this.yto = mouseY;
    }
  }
  
  move() {
    this.accX += (this.xto - this.x) * this.spd;
    this.accY += (this.yto - this.y) * this.spd;
    if (this.accX > 0) {
      this.accX -= this.fric;
    } else if (this.accX < 0) {
      this.accX += this.fric;
    }
    if (this.accY > 0) {
      this.accY -= this.fric;
    } else if (this.accX < 0) {
      this.accY += this.fric;
    }
    
    this.x += this.accX;
    this.y += this.accY;
    
    this.accX = constrain(this.accX,-this.topAcc,this.topAcc);
    this.accY = constrain(this.accY,-this.topAcc,this.topAcc);
  }
}

class Boop extends Shnorp{
  constructor(ID){
    super();
    this.size = 10;
    this.id = ID;
  }
  
  follow(){
    if(this.id == 0){
      this.xto = s.x;
      this.yto = s.y;
    } else{
      this.xto = boops[this.id-1].x;
      this.yto = boops[this.id-1].y;
    }
  }
}

function createBoops(){
  for(let i = 0; i < 2; i ++){
    boops.push(new Boop(i));
  }
}

function runBoops(){
  for(let b of boops){
    b.run();
  }
}

function Bumbis(){
  if(bumbis == 0) bumbis = 1;
  else if(bumbis == 1) bumbis = 0;
}

function Bumbo(){
  boops.push(new Boop(boops.length));
}