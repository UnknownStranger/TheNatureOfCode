
let amplitude,
    period = 120;

function setup() {
  createCanvas(600, 600);
  amplitude = width/2;
}

function draw() {
  let x = amplitude * cos(TWO_PI * frameCount / period);
  background(255);
  stroke(0);
  strokeWeight(2);
  fill(175);
  translate(width/2, height/2);
  line(0, 0, x, 0);
  ellipse(x, 0, 64, 64)

}
