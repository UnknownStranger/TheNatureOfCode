
let angle = 0,
    angleVelocity = 0.2, 
    amplitude = 100;

function setup() {
  createCanvas(600, 200);
  background(255);
  stroke(0);
  strokeWeight(2);
  noFill();

  beginShape();
  for(let x = 0; x <= width; x+= 10){
    let y = map(sin(angle), -1, 1, 0, height);
    vertex(x, y);
    angle += angleVelocity;
  }
  endShape();
}
