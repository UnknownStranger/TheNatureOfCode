
let pointsX = [],
    pointsY = [],
    i = 0,
    divisions = 20;

function setup() {
  createCanvas(1000, 1000);
  stitchSetup();
}

function draw(){
  background(255);
  fill(255);
  translate(500,500);
  ellipse(0,0,800);
  stitchDraw();
  spinningArm();
}
//setup is out here for performance. Obviously don't want to just keep pushing points to the array.
function stitchSetup(){
  for(let i = 0; i < divisions; i++){
    let x = 400 * Math.cos(2 * Math.PI * i / divisions);
    let y = 400 * Math.sin(2 * Math.PI * i / divisions);
    pointsX.push(x);
    pointsY.push(y);
  }
}
//manually drawing circle shape with set divisions for smoothness.
function stitchDraw(){
  for(let i = 0; i <= pointsX.length; i++){
    if(i < pointsX.length - 1){
      line(pointsX[i], pointsY[i], pointsX[i + 1], pointsY[i + 1]);
    }else{
      line(pointsX[i], pointsY[i], pointsX[0], pointsY[0]);
    }
  }
}

function spinningArm(){
  i += 1;
  if(i === 360){
    i = 1;
  }
  let x = (400 * Math.cos(2 * Math.PI * i / 360));
  let y = (400 * Math.sin(2 * Math.PI * i / 360));
  line(0,0,x,y);
}