
let walkers = [];
let timer = 0;
function setup() {
  createCanvas(1000, 1000);
  background(0);
  for(let i = 0; i < 100; i++){
    walkers.push(new Walker());
  }
  
}

function draw() {
  for (const walker of walkers) {
    walker.move();
    walker.display();
  }
}

class Walker{
  constructor(){
    this.location = createVector(random(width), random(height))
  }

  display(){
    stroke(255),
    point(this.location.x,this.location.y)
  }

  move(){
    this.acceleration = createVector(random(-1, 1), random(-1, 1));
    this.location.add(this.acceleration);
  }
}
