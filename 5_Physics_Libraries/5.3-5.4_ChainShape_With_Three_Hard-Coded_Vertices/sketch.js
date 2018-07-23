//Skipped 5.4 as similar principles applied here using a custom shape as the ground instead of chain
let Engine = Matter.Engine,
  World = Matter.World,
  Bodies = Matter.Bodies,
  engine,
  ground,
  circles = [],
  testShape = [];

function setup() {
  createCanvas(800, 800);
  engine = Engine.create();
  Engine.run(engine);

  testShape.push(createVector(0, height / 2));
  testShape.push(createVector(width / 2, height / 2));
  testShape.push(createVector(width, height));

  circles.push(Bodies.circle(random(width), 0, random(5, 50)));

  ground = Matter.Bodies.fromVertices(width / 2, height / 2, testShape, {
    isStatic: true
  });
  World.add(engine.world, ground);
  for (const circle of circles) {
    World.add(engine.world, circle);
  }
}

function draw() {
  background(0);
  fill(0);
  stroke(255);
  strokeWeight(2);
  rectMode(CENTER);
  for (const circle of circles) {
    ellipse(circle.position.x, circle.position.y, circle.circleRadius * 2);
  }
  beginShape();
  for (const v of ground.vertices) {
    vertex(v.x, v.y);
  }
  vertex(ground.vertices[0].x, ground.vertices[0].y);
  endShape();
}

function mouseDragged() {
  let circle = Bodies.circle(mouseX, mouseY, random(5, 20));
  circles.push(circle);
  World.add(engine.world, circle);
}