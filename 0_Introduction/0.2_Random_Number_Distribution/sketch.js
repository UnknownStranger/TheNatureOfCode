
let randCount = [],
    randSize = 50;

function setup() {
  createCanvas(640, 240);
  background(255);
  for(let i = 0; i < randSize; i++){
    randCount[i] = 1;
  }
}

function draw() {
  for(let i = 0; i < 5; i++){
    addRandoms();
  }
  stroke(0);
  fill(100);
  let rectWidth = width/randSize;
  for(let i = 0; i < randSize; i++){
    rect(i * rectWidth, height - randCount[i], rectWidth - 1, randCount[i] )
  };
}

function addRandoms(){
  let rand = floor(random(0, randSize));
  randCount[rand] += 1;
}