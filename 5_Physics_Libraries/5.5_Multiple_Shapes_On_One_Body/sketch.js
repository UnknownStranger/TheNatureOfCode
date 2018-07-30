let Engine = Matter.Engine,
  World = Matter.World,
  Bodies = Matter.Bodies,
  Body = Matter.Body,
  engine,
  shapes = [],
  ground;

function setup() {
  createCanvas(800, 800);
  engine = Engine.create();
  Engine.run(engine);
  shapes.push(new Shape(createVector(width / 2, 0)));
  ground = Bodies.rectangle(width / 2, height, width, 5, {
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
  for (const shape of shapes) {
    shape.display();
    if (shape.circle.position.x > width || shape.circle.position.x < 0 || shape.circle.position.y > height || shape.circle.position.y < 0) {
      Matter.Composite.remove(engine.world, shape);
      let i = shapes.indexOf(shape);
      shapes.splice(i, 1);
    }
  }
  beginShape();
  for (const v of ground.vertices) {
    vertex(v.x, v.y);
  }
  vertex(ground.vertices[0].x, ground.vertices[0].y);
  endShape();
}

function mouseDragged() {
  shapes.push(new Shape(createVector(mouseX, mouseY)));
}

class Shape {
  constructor(p) {
    this.position = p.copy();
    this.h = 40;
    this.w = 20;
    this.headSize = 10;
    this.rect = Bodies.rectangle(this.position.x, this.position.y, this.w, this.h);
    this.circle = Bodies.circle(this.position.x, (this.position.y - this.headSize - (this.h / 2)), this.headSize);
    this.compoundBody = Body.create({
      parts: [this.rect, this.circle]
    });
    World.add(engine.world, [this.compoundBody]);
  }

  display() {
    stroke(0, 255, 0);
    this.drawBody();
    this.drawHead();
  }

  drawBody() {
    beginShape();
    for (const v of this.rect.vertices) {
      vertex(v.x, v.y);
    }
    vertex(this.rect.vertices[0].x, this.rect.vertices[0].y)
    endShape();
  }

  drawHead() {
    beginShape();
    for (const v of this.circle.vertices) {
      vertex(v.x, v.y);
    }
    vertex(this.circle.vertices[0].x, this.circle.vertices[0].y)
    endShape();
  }
}