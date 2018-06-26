
let wind, gravity, liquid, movers = [], moverCount = 20;

function setup() {
  createCanvas(640, 360);
  liquid = new Liquid();

  for(let i = 0; i < moverCount; i++){
    movers.push(new Mover());
  }
}

function draw() {
  background(255);
  liquid.display();
  wind = createVector(0.2, 0);
  for (const mover of movers) {
    gravity = createVector(0, 0.1 * mover.mass);
    if(mover.isInside(liquid)){
      mover.drag(liquid);
    }
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

  isInside(liquid){
    if(this.location.x > liquid.topLeft.x && this.location.x < liquid.bottomRight.x && this.location.y > liquid.topLeft.y && this.location.y < liquid.bottomRight.y){
      return true;
    }else{
      return false;
    }
  }

  drag(liquid){
    let speed = this.velocity.mag();
    let dragMagnitude = liquid.c * speed * speed;
    let drag = p5.Vector.mult(this.velocity, -1);
    drag.normalize();
    drag.mult(dragMagnitude);
    this.applyForce(drag);
  }
}

class Liquid{
  constructor(){
    this.topLeft = createVector(0, height/2);
    this.bottomRight = createVector(width, height);
    this.c = 0.1;
  }

  display(){
    stroke(0);
    fill(100, 150);
    rect(this.topLeft.x, this.topLeft.y, this.bottomRight.x, this.bottomRight.y);
  }
}