let Engine = Matter.Engine,
  World = Matter.World,
  Bodies = Matter.Bodies,
  bodies = [],
  ground,
  rectSize = 20,
  engine;

function setup() {
  createCanvas(800, 800);
  engine = Engine.create();
  Engine.run(engine);
  bodies.push(Bodies.rectangle(400, 200, rectSize, rectSize));
  bodies.push(Bodies.rectangle(350, 100, rectSize, rectSize));
  bodies.push(Bodies.rectangle(400, 680, width, rectSize, {
    isStatic: true
  }));
  for (const body of bodies) {
    World.add(engine.world, body);
  }
}

function draw() {
  background(0);
  fill(0);
  stroke(255);
  strokeWeight(2);
  rectMode(CENTER);
  for (const body of bodies) {
    if (body.isStatic) {
      rect(body.position.x, body.position.y, width, rectSize);
    } else {
      rect(body.position.x, body.position.y, rectSize, rectSize);
    }
  }

  bodies.forEach(body => {
    if (body.position.x > width || body.position.x < 0 || body.position.y > height || body.position.y < 0) {
      Matter.Composite.remove(engine.world, body);
      let i = bodies.indexOf(body);
      bodies.splice(i, 1);
    }
  });
}

function mouseDragged() {
  let body = Bodies.rectangle(mouseX, mouseY, 20, 20);
  bodies.push(body);
  World.add(engine.world, body);
}