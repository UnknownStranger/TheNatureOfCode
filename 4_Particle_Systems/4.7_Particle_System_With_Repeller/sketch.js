let systems = [], repeller;

function setup() {
  createCanvas(600, 600);
  systems.push(new ParticleSystem(createVector(width / 2, height/2 - 50)));
  repeller = new Repeller(createVector(width / 2, height / 2));
}

function draw() {
  background(255);
  let gravity = createVector(0, 0.1);
  repeller.display();
  for (const ps of systems) {
    ps.applyForce(gravity);
    ps.addParticles();
    ps.run();
    ps.applyRepeller(repeller);
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
  }

  updateParticles() {
    for (const particle of this.particles) {
      particle.run();
    }
    this.removeDead();
  }

  applyForce(force){
    for(const particle of this.particles){
      particle.applyForce(force);
    }
  }

  applyRepeller(r){
    for(const particle of this.particles){
      let force = r.repel(particle).copy();
      particle.applyForce(force);
    }
  }

  addParticles() {
    let rand = random(0, 1);
    if(rand <= 0.5){
      this.particles.push(new Particle(this.origin));
    }
    if(rand > 0.5){
      this.particles.push(new Confeti(this.origin));
    }
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
    this.lifespan = 400;
    this.isDead = false;
    this.mass = 1;
  }

  run() {
    this.update();
    this.display();

  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
    if (this.lifespan <= 0.0) {
      this.isDead = true;
    }else{
      this.lifespan -= 2;
    }
  }

  applyForce(force){
    let f = force.copy();
    f.div(this.mass);
    this.acceleration.add(f);

  }

  display() {
    stroke(0, this.lifespan);
    strokeWeight(2);
    fill(200, this.lifespan);
    ellipse(this.position.x, this.position.y, 8);
  }
}

class Confeti extends Particle{
  display(){
    stroke(0, this.lifespan);
    strokeWeight(2);
    fill(200, this.lifespan);
    rect(this.position.x, this.position.y, 8, 8);
  }
}

class Repeller{
  constructor(l){
    this.position = l;
    this.diameter = 50;
    this.strength = 100;
  }

  display(){
    stroke(0);
    strokeWeight(2);
    fill(200);
    ellipse(this.position.x, this.position.y, this.diameter);
  }

  repel(p){
    let dir = p5.Vector.sub(this.position, p.position);
    let d = dir.mag();
    dir.normalize();
    d = constrain(d, 5, 100);
    let force = -1 * this.strength / (d * d);
    dir.mult(force);
    return dir;
  }
}

