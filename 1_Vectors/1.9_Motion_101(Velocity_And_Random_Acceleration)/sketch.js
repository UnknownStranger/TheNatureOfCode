let mover;
function setup() {
  createCanvas(1000, 1000);
  mover = new Mover();
}

function draw() {
  background(0);
  mover.update();
  mover.checkEdges();
  mover.display();
}

class Mover{
  constructor(){
    this.location = createVector(width/2, height/2);
    this.velocity = createVector(0,0);
    this.maxVelocity = 10;
    this.acceleration = createVector(-0.01, 0.1);
    
  }

  update(){
    this.acceleration = p5.Vector.random2D();
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxVelocity);
    this.location.add(this.velocity);
  }

  display(){
    stroke(255);
    fill(255);
    ellipse(this.location.x, this.location.y, 32);
  }

  checkEdges(){
    if(this.location.x > width){
      this.location.x = 0;
    }else if(this.location.x < 0){
      this.location.x = width;
    }
    if(this.location.y > height){
      this.location.y = 0;
    }else if(this.location.y < 0){
      this.location.y = height;
    }
  }
}