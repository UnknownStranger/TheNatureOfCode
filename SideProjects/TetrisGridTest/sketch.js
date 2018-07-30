//engine declarations and setup
let Engine = Matter.Engine,
  World = Matter.World,
  Bodies = Matter.Bodies,
  Body = Matter.Body,
  Constraint = Matter.Constraint,
  engine,
  squareSize = 20,
  squares = [];

function setup() {
  createCanvas(400, 800);
  engine = Engine.create();
  Engine.run(engine);
  buildFloor();
  addSquare();
}

function draw() {
  background(50);
  stroke(255);
  strokeWeight(2);
  fill(0);
  if(frameCount % 10 === 0){
    addSquare(Math.floor(Math.random() * 20)*20, 0);
  }
  squares.forEach(square => {
    if(square.position.x > width || square.position.x < 0 || square.position.y > height || square.position.y < 0){
      Matter.Composite.remove(engine.world, square);
    }else{
      rect(square.position.x, square.position.y, squareSize, squareSize);
    }
  });
  //console.log(frameRate());
  // if(squares.length > 100){
  //   noLoop();
  // }
}

function addSquare(x,y){
  let square = Bodies.rectangle(x,y,squareSize, squareSize);
  squares.push(square);
  World.add(engine.world, square);
}

function buildFloor() {
  this.floor = Bodies.rectangle(width/2, height + 40, width*2, 100, {
    isStatic: true
  });
  World.add(engine.world, this.floor)
}