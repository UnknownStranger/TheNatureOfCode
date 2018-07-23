let Engine = Matter.Engine,
  World = Matter.World,
  Bodies = Matter.Bodies,
  Constraint = Matter.Constraint,
  engine,
  pairs = [],
  ground;

function setup() {
  createCanvas(800, 800);
  engine = Engine.create();
  Engine.run(engine);
  pairs.push(new Pair(createVector(width / 2, 0)));
  ground = Bodies.rectangle(width / 2, height, width, 50, {
    isStatic: true
  });
  World.add(engine.world, ground);
}

function draw() {
  background(0);
  fill(0);
  stroke(255);
  strokeWeight(2);
  rectMode(CENTER);

  beginShape();
  for (const v of ground.vertices) {
    vertex(v.x, v.y);
  }
  vertex(ground.vertices[0].x, ground.vertices[0].y);
  endShape();

  for (const p of pairs) {
    p.display();
  }
}

function mouseDragged() {
  pairs.push(new Pair(createVector(mouseX, mouseY)));
}

class Pair {
  constructor(p) {
    this.particleA = new Particle(p.copy());
    this.particleB = new Particle(createVector(p.x + random(-1, 1), p.y + random(-1, 1)));
    this.options = {
      bodyA: this.particleA.body,
      bodyB: this.particleB.body,
      length: 50,
      stiffness: 1
    }
    this.constraint = Constraint.create(this.options);
    World.add(engine.world, this.constraint);

  }

  display(){
    stroke(0, 255, 0);
    let refA = this.particleA.body;
    let refB = this.particleB.body;
    ellipse(refA.position.x, refA.position.y, refA.circleRadius * 2);
    ellipse(refB.position.x, refB.position.y, refB.circleRadius * 2);
    line(refA.position.x, refA.position.y, refB.position.x, refB.position.y);
  }

}

class Particle{
  constructor(p){
    this.position = p.copy();
    this.radius = 10;
    this.body = Bodies.circle(this.position.x, this.position.y, this.radius);
    World.add(engine.world, this.body)
  }
}