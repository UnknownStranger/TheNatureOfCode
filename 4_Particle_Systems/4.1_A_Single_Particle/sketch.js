let particle;
function setup() {
  createCanvas(600, 600);
  particle = new Particle(createVector(width/2, height/2));
}

function draw() {
  background(255);
  particle.run();
  if(particle.isDead){
    particle = new Particle(createVector(width/2, height/2));
  }
}

class Particle{
  constructor(pos){
    this.position = pos;
    this.velocity = createVector();
    this.acceleration = createVector(random(-0.1, 0.1), random(-0.1, 0.1));
    this.lifespan = 255;
    this.isDead = false
  }

  run(){
    this.update();
    this.display();
  }

  update(){
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    if(this.lifespan < 0.0){
      this.isDead = true;
    }
    this.lifespan -= 2;
  }

  display(){
    stroke(0, this.lifespan);
    fill(200, this.lifespan);
    ellipse(this.position.x, this.position.y, 32);
  }

}