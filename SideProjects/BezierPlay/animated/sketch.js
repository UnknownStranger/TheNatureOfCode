let i = 50;
function setup() {
  createCanvas(1000, 1000);
  }
  
function draw(){
  background(255);
  line(50,50,50,950);
  line(50,950,950,950);
  if(i === 950){
    i = 50;
  }
  line(50, i, i, 950);
  i++;
}
