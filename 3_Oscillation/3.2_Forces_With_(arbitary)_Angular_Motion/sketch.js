let wind, g = 0.04,
  movers = [],
  moverCount = 20;

function setup() {
  createCanvas(1280, 720);
  for (let i = 0; i < moverCount; i++) {
    movers.push(new Mover());
  }
}

function draw() {
  background(255);
  for (const mover of movers) {
    for (const other of movers) {
      if (other != mover) {
        mover.applyGravity(other);
      }
    }
    mover.update();
    mover.checkEdges();
    mover.display();
  }
}


class Mover {
  constructor() {
    this.location = createVector(random(width), random(height));
    this.acceleration = createVector(0, 0);
    this.angleAcceleration = 0;
    this.angleVelocity = 0;
    this.angle = 0;
    this.velocity = createVector(0, 0);
    this.friction = createVector(0, 0);
    this.mass = random(5, 30);
  }

  display() {
    stroke(0);
    fill(100, 100);
    push();
    translate(this.location.x, this.location.y);
    rotate(this.angle);
    rect(0, 0, this.mass, this.mass);
    pop();
  }

  applyForce(force) {
    let f = p5.Vector.div(force, this.mass);
    this.acceleration.add(f);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.angleAcceleration = this.acceleration.x;
    this.angleVelocity += this.angleAcceleration;
    this.location.add(this.velocity);
    this.angle = constrain(this.angleVelocity, -0.1, 0.1);
    this.acceleration.mult(0);
  }

  checkEdges() {
    if (this.location.x < 0) {
      this.location.x = 0;
      this.velocity.x *= -1;
    } else if (this.location.x > width) {
      this.location.x = width;
      this.velocity.x *= -1;
    }
    if (this.location.y < 0) {
      this.location.y = 0;
      this.location.y *= -1;
    } else if (this.location.y > height) {
      this.location.y = height;
      this.velocity.y *= -1;
    }
  }

  applyGravity(mover) {
    let force = p5.Vector.sub(this.location, mover.location);
    let distance = force.mag();
    distance = constrain(distance, 5, 25);
    let strength = (g * this.mass * mover.mass) / (distance * distance) * -0.5;
    force.normalize();
    force.mult(strength);
    this.applyForce(force);
  }
}