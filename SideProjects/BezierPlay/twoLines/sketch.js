
function setup() {
  createCanvas(1000, 1000);
  background(255);
  line(50,50,50,950);
  line(50,950,950,950);
  for(let i = 50; i < 950; i += 10){
    line(50, i, i, 950);
  }
}
