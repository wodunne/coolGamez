class Bimp {
  constructor() {
    this.bSize = 20;
    this.size = this.bSize;
    this.gSize = this.bSize * 3;
    
    this.x = width / 4;
    this.y = height / 2;
    this.accX = 0;
    this.accY = 0;
    this.forceX = 0;
    this.forceY = 0;
    this.pSpd = 3.5;
    this.fric = 0.25;
    this.spd = 0.5;
    this.topSpd = 8;
    
    this.growing = 0;
    this.shrinking = 0;
    
    this.words = "Some kinda stuff aaa"
    this.showingText = 0;
  }

  run() {
    this.show();
    //this.showLine();
    if (p == 0) {
      this.move();
      this.pulse();
    }
    this.wallBounce();
    //this.canvasBounce()
    this.canvasLoop();
  }

  show() {
    ellipseMode(RADIUS);
    strokeWeight(6);
    stroke("purple");
    fill(2, 266, 200);
    ellipse(this.x, this.y, this.size);
    
    //this.showText();
  }

  showText() {
    if(dist(this.x,this.y,mouseX,mouseY)<this.size){
      this.showingText = 1;
    }
    
    let smod = 1.5;
    if (this.showingText == 1) {
      strokeWeight(4)
      text(this.words,this.x+this.size*smod,this.y-this.size*smod);
    }
  }

  move() {
    this.forceX = (keyIsDown(right) - keyIsDown(left));
    if (keyIsDown(right)) this.accX += this.spd;
    if (keyIsDown(left)) this.accX -= this.spd;
    this.x += this.forceX + this.accX;

    this.forceY = (keyIsDown(up) - keyIsDown(down));
    if (keyIsDown(down)) this.accY += this.spd;
    if (keyIsDown(up)) this.accY -= this.spd;
    this.y += this.forceY + this.accY;

    this.accX = constrain(this.accX, -this.topSpd, this.topSpd);
    this.accY = constrain(this.accY, -this.topSpd, this.topSpd);

    this.friction();
    this.breaks();
  }

  canvasBounce() {
    this.x = constrain(this.x, 0 + this.size, width - this.size);
    this.y = constrain(this.y, 0 + this.size, height - this.size);

    if (this.x - this.size <= 0 || this.x + this.size >= width) {
      this.accX *= -1;
    }
    if (this.y - this.size <= 0 || this.y + this.size >= height) {
      this.accY *= -1;
    }
  }
  
  canvasLoop(){
    if(this.x - this.size > width) this.x = -this.size;
    if(this.x + this.size < 0) this.x = width + this.size;
    if(this.y - this.size > height) this.y = -this.size;
    if(this.y + this.size < 0) this.y = height + this.size;
  }

  wallBounce() {
    for (let wall of walls) {
      if (dToWall(this, wall) < this.size) {
        if (this.x >= wall.x && this.x <= wall.x + wall.w) {
          this.accY *= -1;
          if (this.y <= wall.y) {
            this.y = min(this.y, wall.y - this.size);
          } else if (this.y >= wall.y + wall.h) {
            this.y = max(this.y, (wall.y + wall.h) + this.size);
          }
        } else {
          this.accX *= -1;
          if (this.x <= wall.x) {
            this.x = min(this.x, wall.x - this.size);
          } else if (this.x >= wall.x + wall.w) {
            this.x = max(this.x, (wall.x + wall.w) + this.size);
          }
        }
      }
    }
  }

  pulse() {
    if (this.growing == 1) {
      if (this.size < this.gSize) {
        this.size += this.pSpd * 1.5;
      } else {
        this.growing = 0;
        this.shrinking = 1;
      }
    } else if (this.shrinking == 1) {
      if (this.size > this.bSize) {
        this.size -= this.pSpd;
      } else this.shrinking = 0;
    }
    if (keyIsDown(pulse)) {
      this.growing = 1;
    }
    this.size = constrain(this.size, this.bSize, this.gSize);
  }

  breaks() {
    if (keyIsDown(halt)) {
      this.accX = 0;
      this.accY = 0;
    }
  }

  showLine() {
    strokeWeight(5);
    stroke("blue");
    for (let wall of walls) {
      if (this.y < wall.y) {
        line(this.x, this.y, constrain(this.x, wall.x, wall.x + wall.w), wall.y);
      } else if (this.x < wall.x) {
        line(this.x, this.y, wall.x, constrain(this.y, wall.y, wall.y + wall.h));
      } else if (this.x > wall.x + wall.w) {
        line(this.x, this.y, wall.x + wall.w, constrain(this.y, wall.y, wall.y + wall.h));
      } else if (this.y > wall.y + wall.h) {
        line(this.x, this.y, constrain(this.x, wall.x, wall.x + wall.w), wall.y + wall.h);
      }
    }
  }

  friction() {
    if (!keyIsDown(right) && !keyIsDown(left)) {
      if (this.accX > 0) this.accX -= this.fric;
      else if (this.accX < 0) this.accX += this.fric;
    }
    if (!keyIsDown(up) && !keyIsDown(down)) {
      if (this.accY > 0) this.accY -= this.fric;
      else if (this.accY < 0) this.accY += this.fric;
    }
  }

}

function dToWall(self, wall) {
  let di;
  if (self.y <= wall.y) {
    di = dist(self.x, self.y, constrain(self.x, wall.x, wall.x + wall.w), wall.y);
  } else if (self.x <= wall.x) {
    di = dist(self.x, self.y, wall.x, constrain(self.y, wall.y, wall.y + wall.h));
  } else if (self.x >= wall.x + wall.w) {
    di = dist(self.x, self.y, wall.x + wall.w, constrain(self.y, wall.y, wall.y + wall.h));
  } else if (self.y >= wall.y + wall.h) {
    di = dist(self.x, self.y, constrain(self.x, wall.x, wall.x + wall.w), wall.y + wall.h);
  }
  return di
}

function inWall(self, wall) {
  return self.x + self.size >= wall.x && self.x - self.size <= wall.x + wall.w && self.y + self.size >= wall.y && self.y - self.size <= wall.y + wall.h
}