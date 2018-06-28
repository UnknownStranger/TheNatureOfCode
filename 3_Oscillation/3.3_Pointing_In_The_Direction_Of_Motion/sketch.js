let mover;

function setup() {
  createCanvas(600, 600);
  mover = new Mover();
}

function draw() {
  background(255);
  mover.display();
  mover.update();
  mover.checkEdges();
}

class Mover {
  constructor() {
    this.position = createVector(random(width), random(height));
    this.w = random(3, 10);
    this.l = this.w * 5;
    this.acceleration = createVector(0, 0);
    this.velocity = createVector(0, 0);
    this.angle;
  }

  display() {
    stroke(0);
    fill(200);
    push();
    rectMode(CENTER);
    translate(this.position.x, this.position.y);
    rotate(this.angle);
    rect(0, 0, this.l, this.w);
    pop();
  }

  update() {
    let mouseVector = createVector(mouseX, mouseY);
    let direction = p5.Vector.sub(mouseVector, this.position);
    direction.normalize();
    direction.mult(0.5);
    this.acceleration = direction;
    this.velocity.add(this.acceleration);
    this.velocity.limit(10);
    //this.angle = atan2(this.velocity.y, this.velocity.x);
    this.angle = this.velocity.heading();
    this.position.add(this.velocity);
  }

  checkEdges() {
    if (this.position.x < 0) {
      this.position.x = 0;
    } else if (this.position.x > width) {
      this.position.x = width;
    }
    if (this.position.y < 0) {
      this.position.y = 0;
    } else if (this.position.y > height) {
      this.position.y = height;
    }
  }
}