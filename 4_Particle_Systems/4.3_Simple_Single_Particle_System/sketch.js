let ps;

function setup() {
  createCanvas(600, 600);
  ps = new ParticleSystem(createVector(width / 2, height / 2));
  ps.addParticle();
}

function draw() {
  background(255);
  ps.run();
}

function mouseClicked() {
  ps.origin = createVector(mouseX, mouseY);
  ps.addParticle();
}

function mouseDragged() {
  ps.origin = createVector(mouseX, mouseY);
  ps.addParticle();
}

class ParticleSystem {
  constructor(l) {
    this.particles = [];
    this.origin = l;
  }

  run() {
    this.updateParticles();
  }

  updateParticles() {
    for (const particle of this.particles) {
      particle.run();
    }
    this.removeDead();
  }

  addParticle() {
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

class Particle {
  constructor(pos) {
    this.position = pos;
    this.velocity = createVector();
    this.acceleration = createVector(random(-0.1, 0.1), random(-0.1, 0.1));
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
    ellipse(this.position.x, this.position.y, 32);
  }

}