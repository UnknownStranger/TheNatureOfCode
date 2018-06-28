let pendulum;
function setup() {
  createCanvas(1000, 600);
  pendulum = new Pendulum();
}

function draw() {
  background(255);
  pendulum.update();
  pendulum.display();
}

class Pendulum{
  constructor(){
    this.origin = createVector(width/2, 0);
    this.position = createVector(0, 0);
    this.armLength = random(height/2, height-100);
    this.angle = 45;
    this.angularVelocity = 0;
    this.angularAcceleration = 0;
    this.damping = 0.995;
  }

  update(){
    let gravity = 0.4;
    this.angularAcceleration = -1 * (gravity * sin(this.angle)) / this.armLength;
    this.angularVelocity += this.angularAcceleration;
    this.angularVelocity *= this.damping;
    this.angle += this.angularVelocity;
    this.position = createVector(this.armLength * sin(this.angle),
                                  this.armLength * cos(this.angle));
    this.position.add(this.origin);
  }

  display(){
    stroke(0);
    strokeWeight(2);
    fill(175);
    line(this.origin.x, this.origin.y, this.position.x, this.position.y);
    ellipse(this.position.x, this.position.y, 32);
  }
}