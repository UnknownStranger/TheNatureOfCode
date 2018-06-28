

let spring, bob;

function setup() {
  createCanvas(1000, 600);
  bob = new Bob(width/2, 100);
  spring = new Spring(width/2, 10, 250);
}

function draw() {
  background(255);
  line(width/2, 0, width/2, height);
  let gravity = createVector(0, 2);
  bob.applyForce(gravity);
  spring.connect(bob);
  spring.constrainLength(bob, 30, height);
  bob.update();
  spring.displayLine(bob);
  bob.display();
  spring.display();
}

function mousePressed(){
  bob.handleClick(mouseX, mouseY);
}

function mouseDragged(){
  bob.handleDrag(mouseX, mouseY);
}

function mouseReleased(){
  bob.stopDragging();
}

class Spring{
  constructor(x, y, l){
    this.anchor = createVector(x, y);
    this.restLength = l;
    this.k = 0.2;
  }
  
  connect(b){
    let force = p5.Vector.sub(b.position, this.anchor);
    let d = force.mag();
    let stretch = d - this.restLength;
    force.normalize();
    force.mult(-1 * this.k * stretch);
    b.applyForce(force);
  }

  constrainLength(b, minLength, maxLength){
    let dir = p5.Vector.sub(b.position, this.anchor);
    let d = dir.mag();

    if(d < minLength){
      dir.normalize();
      dir.mult(minLength);
      b.position = p5.Vector.add(this.anchor, dir);
      b.velocity.mult(0);
    }
    else if(d > maxLength){
      dir.normalize();
      dir.mult(maxLength);
      b.position = p5.Vector.add(this.anchor, dir);
      b.velocity.mult(0)
    }
  }

  display(){
    stroke(0);
    strokeWeight(2);
    fill(200);
    rectMode(CENTER);
    rect(this.anchor.x, this.anchor.y, 10,10);
  }

  displayLine(b){
    stroke(0);
    strokeWeight(2);
    line(b.position.x, b.position.y, this.anchor.x, this.anchor.y);
  }
}

class Bob{
  constructor(x, y){
    this.position = createVector(x, y);
    this.velocity = createVector();
    this.acceleration = createVector();
    this.mass = 24;
    this.damping = .98;
    this.dragOffset = createVector();
    this.dragging = false;
  }

  update(){
    this.velocity.add(this.acceleration);
    this.velocity.mult(this.damping);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  applyForce(force){
    let f = p5.Vector.div(force, this.mass);
    this.acceleration.add(f);
  }

  display(){
    stroke(0);
    strokeWeight(2);
    fill(200);
    if(this.dragging) {
      fill(50);
    }
    ellipse(this.position.x, this.position.y, this.mass*2);
  }

  handleClick(mx, my){
    let d = dist(mx, my, this.position.x, this.position.y);
    if(d < this.mass) {
      this.dragging = true;
      this.dragOffset.x = this.position.x-mx;
      this.dragOffset.y = this.position.y-my;
    }
  }

  stopDragging(){
    this.dragging = false;
  }

  handleDrag(mx, my){
    if(this.dragging){
      this.position.x = mx + this.dragOffset.x;
      this.position.y = my + this.dragOffset.y;
    }
  }
}