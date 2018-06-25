let mover;

function setup() {
  createCanvas(1280, 720);
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
    this.velocity = createVector(random(-2,2), random(-2,2));
  }

  update(){
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