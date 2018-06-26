
let wind, gravity, mover;

function setup() {
  createCanvas(640, 360);
  background(0);
  mover = new Mover();
}

function draw() {
  background(0);
  wind = createVector(0.1, 0);
  gravity = createVector(0, 1);
  mover.applyForce(wind);
  mover.applyForce(gravity);
  mover.update();
  mover.checkEdges();
  mover.display();
}


class Mover{
  constructor(){
    this.location = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.velocity = createVector(0, 0);
    this.mass = random(5, 30);
  }

  display(){
    stroke(255);
    fill(255, 100);
    ellipse(this.location.x, this.location.y, this.mass);
  }

  applyForce(force){
    let f = p5.Vector.div(force, this.mass);
    this.acceleration.add(f);
  }

  update(){
    this.velocity.add(this.acceleration);
    this.location.add(this.velocity);
    this.acceleration.mult(0);
  }

  checkEdges(){
    if(this.location.x < 0){
      this.location.x = 0;
      this.velocity.x *= -1;
    }else if(this.location.x > width){
      this.location.x = width;
      this.velocity.x *= -1;
    }
    if(this.location.y < 0){
      this.location.y = 0;
      this.location.y *= -1;
    }else if(this.location.y > height){
      this.location.y = height;
      this.velocity.y *= -1;
    }
  }
}