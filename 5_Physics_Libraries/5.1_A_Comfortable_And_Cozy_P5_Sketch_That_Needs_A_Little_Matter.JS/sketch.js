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
  ground = Bodies.rectangle(400, 680, width, rectSize, { isStatic: true });
  World.add(engine.world, ground);
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
  for(const body of bodies){
    rect(body.position.x, body.position.y, rectSize, rectSize);
  }
  rect(ground.position.x, ground.position.y, width, rectSize);
}

function mouseDragged(){
  let body = Bodies.rectangle(mouseX, mouseY, 20, 20);
  bodies.push(body);
  World.add(engine.world, body);
}

