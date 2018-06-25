
function setup() {
  createCanvas(1000, 1000);
  background(0);
}

function draw() {
  background(0);
  let mouseVector = createVector(mouseX, mouseY),
      centerVector = createVector(width/2, height/2);
  mouseVector.sub(centerVector);
  let magnitude = mouseVector.mag();
  fill(255);
  stroke(255);
  strokeWeight(4);
  rect(0,0,magnitude,10);
  translate(width/2, height/2);
  line(0,0,mouseVector.x, mouseVector.y);
}
