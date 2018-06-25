
function setup() {
  createCanvas(1000, 1000);
  background(0);
}

function draw() {
  background(0);
  stroke(255);
  strokeWeight(4);
  let mouseVector = createVector(mouseX, mouseY),
      centerVector = createVector(width/2, height/2);
  mouseVector.sub(centerVector);
  mouseVector.mult(.67);
  translate(width/2, height/2);
  line(0, 0, mouseVector.x, mouseVector.y);
}
