
let oscillators = [];
function setup() {
  createCanvas(600, 600);
  for(let i = 0; i < 10; i++){
    oscillators.push(new Oscillator());
  }
}

function draw() {
  background(255);
  for (const oscillator of oscillators) {
    oscillator.oscillate();
    oscillator.display();
  }
}

class Oscillator{
  constructor(){
    this.angle = createVector(0,0);
    this.velocity = createVector(random(-0.05, 0.05), random(-0.05, 0.05));
    this.amplitude = createVector(random(width/2), random(height/2));
  }

  oscillate(){
    this.angle.add(this.velocity);
  }

  display(){
    let x = sin(this.angle.x) * this.amplitude.x,
        y = sin(this.angle.y) * this.amplitude.y;

    push();
    translate(width/2, height/2);
    stroke(0);
    strokeWeight(2);
    fill(175);
    line(0,0,x,y);
    ellipse(x,y,32);
    pop();
  }
}