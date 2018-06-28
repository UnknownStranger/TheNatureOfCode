

let r = 150,
    theta = 0;

function setup() {
  createCanvas(600, 600);
}

function draw() {
  background(255);
  let x = r * cos(theta);
  let y = r * sin(theta);
  stroke(0);
  strokeWeight(2);
  fill(175);
  translate(width/2, height/2);
  line(0, 0, x, y);
  ellipse(x, y, 64, 64)
  theta += 0.01;
}
