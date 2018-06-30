let systems = [];

function setup() {
  createCanvas(600, 600);
  systems.push(new ParticleSystem(createVector(width / 2, height / 2)));
}

function draw() {
  background(255);
  for (const ps of systems) {
    ps.addParticles();
    ps.run();
  }
}

function mouseClicked() {
  origin = createVector(mouseX, mouseY);
  systems.push(new ParticleSystem(origin));
}

class ParticleSystem {
  constructor(pos) {
    this.particles = [];
    this.origin = pos;
    this.addParticles();
  }

  run() {
    this.updateParticles();
    console.log(this.origin);
  }

  updateParticles() {
    for (const particle of this.particles) {
      particle.run();
    }
    this.removeDead();
  }

  addParticles() {
    this.particles.push(new Particle(this.origin));
  }

  removeDead() {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      if (this.particles[i].isDead) {
        this.particles.splice(i, 1);
      }
    }
  }
}

class Particle{
  constructor(pos) {
    this.position = pos.copy();
    this.velocity = createVector(random(-1, 1), random(-1,0));
    this.acceleration = createVector(0, 0.05);
    this.lifespan = 255;
    this.isDead = false;

  }

  run() {
    this.update();
    this.display();

  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);

    if (this.lifespan <= 0.0) {
      this.isDead = true;
    }

    this.lifespan -= 2;
  }

  display() {
    stroke(0, this.lifespan);
    fill(200, this.lifespan);
    ellipse(this.position.x, this.position.y, 8);
  }
}