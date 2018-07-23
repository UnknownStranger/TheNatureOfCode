let Engine = Matter.Engine,
    World = Matter.World,
    Bodies = Matter.Bodies,
    engine,
    boxes = [],
    boundries = [];

function setup() {
  createCanvas(800, 800);
  engine = Engine.create(); 
  Engine.run(engine);
  boundries.push(new Boundry(createVector(width/4, height)));
  boundries.push(new Boundry(createVector(width/4 * 3, height/2)));
  boxes.push(new Box(createVector(width/2, height/2)));
}

function draw() {
  background(0);
  fill(0);
  stroke(255);
  strokeWeight(2);
  rectMode(CENTER);
  for (const b of boxes) {
    b.display();
  }
  for (const b of boundries) {
    b.display();
  }
}

function mouseDragged(){
  boxes.push(new Box(createVector(mouseX, mouseY)));
}

class Boundry{
  constructor(p){
    this.position = p.copy();
    this.w = 10;
    this.h = width/2;
    this.rect = Bodies.rectangle(this.position.x, this.position.y, width/2, 10, { isStatic: true });
    World.add(engine.world, this.rect);
  }

  display(){
    rect(this.position.x, this.position.y, this.h, this.w);
  }
}

class Box{
  constructor(p){
    this.position = p.copy();
    this.h = random(5, 50);
    this.w = random(5, 50);
    this.rect =  Bodies.rectangle(this.position.x, this.position.y, this.h, this.w);
    World.add(engine.world, this.rect);
  }

  display(){
    push();
    translate(this.rect.position.x, this.rect.position.y);
    rotate(this.rect.angle);
    rect(0, 0, this.h, this.w);
    pop();
  }
}