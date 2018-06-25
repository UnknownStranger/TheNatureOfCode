let mover,
    movers = [],
    moverCount = 20;

function setup() {
  createCanvas(1000, 1000);
  background(0);
  for(let i = 0; i < moverCount; i++){
    mover = new Mover();
    movers.push(mover);
  }
}

function draw() {
  background(0);
  for (const mover of movers) {
    mover.checkEdges();
    mover.update();
    mover.display();
  }
}

class Mover{
  constructor(){
    this.location = createVector(random(1000), random(1000));
    this.acceleration = createVector(0,0);
    this.velocity = createVector(0,0);
    this.topSpeed = 4;
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
    this.velocity.limit(this.topSpeed);
    this.location.add(this.velocity)
  }

  checkEdges(){
    if(this.location.x < 0){
      this.location.x = width;
    }else if(this.location.x > width){
      this.location.x = 0;
    }
    if(this.location.y < 0){
      this.location.y = height;
    }else if(this.location.y > height){
      this.location.y = 0;
    }
  }
}