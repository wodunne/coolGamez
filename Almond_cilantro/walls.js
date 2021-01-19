let walls = [];

function createWalls(){
  walls.push(new Wall(width/2-100,height/3,200,45,0));
  walls.push(new Wall(width/2-100,height-height/3,200,45,0));
  walls.push(new Wall(width/2-100,0,200,45,0));
  walls.push(new Wall(0,0,45,150,0));
  walls.push(new Wall(width-45,height-150,45,150,0));
}

function runWalls(){
  for(let i = 0; i < walls.length; i++){
    walls[i].run();
    walls[i].id = i;
  }
}

class Wall{
  constructor(X,Y,W,H,ID){
    this.x = X;
    this.y = Y;
    this.h = H;
    this.w = W;
    this.id = ID;
  }
  
  run(){
    this.show();
  }
  
  show(){
    fill("purple");
    noStroke();
    rect(this.x,this.y,this.w,this.h,8);
  }
}