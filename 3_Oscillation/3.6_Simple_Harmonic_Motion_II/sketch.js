
let angle = 0,
    angleVelocity = 0.05;

function setup() {
  createCanvas(600, 600);
  amplitude = width/2;
}

function draw() {
  angle += angleVelocity;
  let x = amplitude * cos(angle);
  background(255);
  stroke(0);
  strokeWeight(2);
  fill(175);
  translate(width/2, height/2);
  line(0, 0, x, 0);
  ellipse(x, 0, 64, 64)

}
