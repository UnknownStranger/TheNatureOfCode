
let points = [];
let x = 1,
    y = 0,
    z = 0,
    a = 10,
    b = 28,
    c = 8.0/3.0,
    dt = .01,
    rotY = 0,
    trailLength = 1000;

function setup() {
  createCanvas(1000, 1000, WEBGL);
}

function draw() {
	background(0);
  stroke(255);

  push();
  rotateY(rotY);
  scale(5)
  points.push(newPoint());
  let previous = null;
  for (const vector of points) {
    if(previous != null){
      line(vector.x, vector.y, vector.z, previous.x, previous.y, previous.z);
    }
    previous = vector;
  }
  previous = null;
  pop();

  if(points.length > trailLength){
    points.shift();
  }
  rotY += .005;
}

function newPoint(){
  let newX = (a * (y - x)) * dt;
  let newY = (x * (b - z) - y) * dt;
  let newZ = ((x * y) - (c * z)) * dt;
  x += newX;
  y += newY;
  z += newZ;
  return createVector(x, y, z);
}