let angle = 0,
    angleVelocity = 0,
    angleAcceleration = 0.001;

function setup() {
  createCanvas(600, 600);
}

function draw() {
  background(255);
  fill(200);
  stroke(0);
  translate(width/2, height/2);
  rotate(angle);
  line(-50,0,50,0);
  ellipse(50,0,8);
  ellipse(-50,0,8);
  angleVelocity += angleAcceleration;
  angle += angleVelocity;
}
