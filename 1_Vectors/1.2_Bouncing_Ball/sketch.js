
function setup() {
  createCanvas(800, 800);
  background(0);
  ball = new Ball();
}

function draw() {
  background(0);
  ball.move();
  ball.display();
}

class Ball{
  constructor(){
    this.location = createVector(width/2, height/2);
    this.velocity = createVector(3, 5);
  }

  move(){
    if(this.location.x > width || this.location.x < 0){
      this.velocity.x *= -1;
      this.location.add(this.velocity);
    }else if(this.location.y > height || this.location.y < 0){
      this.velocity.y *= -1;
      this.location.add(this.velocity);
    }else{
      this.location.add(this.velocity);
    }
  }

  display(){
    stroke(255);
    fill(255);
    ellipse(this.location.x, this.location.y, 10)
  }
}


