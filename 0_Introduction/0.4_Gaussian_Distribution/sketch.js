
function setup() {
  createCanvas(640, 360);
  background(0);
}

function draw() {
  let num = randomGaussian(),
      sd = 60,
      mean = 320;

  let x = sd * num + mean;

  noStroke();
  fill(255,10);
  ellipse(x, 180, 16, 16);
  
}
