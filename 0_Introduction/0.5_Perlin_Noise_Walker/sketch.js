let walker;

function setup() {
  createCanvas(600, 600);
  background(0);
  walker = new Walker();
}

function draw() {
  background(0);
  walker.move();
  walker.show();
}

class Walker{
  constructor(){
    this.location = createVector(width/2, height/2),
    this.time = {
      x: 0,
      y: 10000,
      step: 0.01
    }
  }

  move(){
    this.location = createVector(map(noise(this.time.x), 0, 1, 0, width),
                      map(noise(this.time.y), 0, 1, 0, height))
    this.time.x += this.time.step;
    this.time.y += this.time.step;
  }

  show(){
    stroke(255),
    fill(255),
    ellipse(this.location.x, this.location.y, 16);
  }
}