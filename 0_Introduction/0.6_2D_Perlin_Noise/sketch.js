
function setup() {
  createCanvas(640, 360);
  background(0);
  loadPixels();
  let xOff = 0.0;
  for(let x = 0; x < width; x++){
    let yOff = 0.0;
    for(let y = 0; y < height; y++){
      let bright = map(noise(xOff, yOff), 0, 1, 0, 255);
      let index = (x + y * width) * 4;
      pixels[index] = bright;
      pixels[index + 1] = bright;
      pixels[index + 2] = bright;
      pixels[index + 3] = 255;
      yOff += 0.01;
    }
    xOff += 0.01;
  }
  updatePixels();
}

function draw() {
}
