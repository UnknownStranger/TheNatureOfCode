let mover;
function setup() {
  createCanvas(1000, 1000);
  background(0);
  mover = new Mover();
}

function draw() {
  background(0);
  mover.update();
  mover.display();
}

class Mover{
  constructor(){
    this.location = createVector(width/2, height/2);
    this.acceleration = createVector(0,0);
    this.velocity = createVector(0,0);
  }

  display(){
    stroke(255);
    fill(255);
    ellipse(this.location.x, this.location.y, 32);
  }

  update(){
    let mouseVector = createVector(mouseX, mouseY);
    let direction = p5.Vector.sub(mouseVector, this.location);
    direction.normalize();
    direction.mult(0.5);
    this.acceleration = direction;
    this.velocity.add(this.acceleration);
    this.location.add(this.velocity)
  }
}