
let wind, gravity, movers = [], moverCount = 20;

function setup() {
  createCanvas(640, 360);
  for(let i = 0; i < moverCount; i++){
    movers.push(new Mover());
  }
}

function draw() {
  background(255);
  wind = createVector(0.2, 0);
  for (const mover of movers) {
    gravity = createVector(0, 0.1 * mover.mass);
    mover.applyForce(mover.friction);
    mover.applyForce(wind);
    mover.applyForce(gravity);
    mover.update();
    mover.checkEdges();
    mover.display();
  }
}


class Mover{
  constructor(){
    this.location = createVector(0, 0);
    this.acceleration = createVector(0,0);
    this.velocity = createVector(0,0);
    this.friction = createVector(0,0);
    this.mass = random(5, 30);
  }

  display(){
    stroke(0);
    fill(100, 100);
    ellipse(this.location.x, this.location.y, this.mass * 3);
  }

  applyForce(force){
    let f = p5.Vector.div(force, this.mass);
    this.acceleration.add(f);
  }

  update(){
    this.velocity.add(this.acceleration);
    this.friction = p5.Vector.mult(this.velocity, -1);
    this.friction.div(this.mass * 0.5);
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