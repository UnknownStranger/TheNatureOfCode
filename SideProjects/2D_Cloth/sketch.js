//engine declarations and setup
let Engine = Matter.Engine,
  World = Matter.World,
  Bodies = Matter.Bodies,
  Body = Matter.Body,
  Constraint = Matter.Constraint,
  engine,
  rows = 20,
  col = 20,
  particles = [],
  offset = 100,
  spacing = 25;

function setup() {
  createCanvas(680, 800);
  engine = Engine.create();
  Engine.run(engine);
  engine.world.gravity.y = 2;
  createParticles();
  particlePhysicsOn();
  createConstraints();
}

function draw() {
  background(50);
  stroke(255);
  strokeWeight(2);
  showParticles();
}

function mouseClicked(){
  for (const pset of particles) {
    for (const p of pset) {
      let force = p5.Vector.sub(createVector(mouseX, mouseY), createVector(width/2, height/2));
      force.normalize();
      force.mult(0.0002);
      Body.applyForce(p, p.position, force);
    }
  }
}

// function wind(){
//   let rand = random();
//   if(rand < 0.01){
//     for (const pset of particles) {
//       for (const p of pset) {
//         let force = p5.Vector.sub(createVector(0, random[-1, 1]), createVector(width/2, height/2));
//         force.normalize();
//         force.mult(0.0001);
//         Body.applyForce(p, p.position, force);
//       }
//     }
//   }
// }

function createParticles() {
  for (let y = 0; y < rows; y++) {
    let rowSet = [];
    for (let x = 0; x < col; x++) {
      if ((y === 0 && x === 0) || (y === 0 && x === col - 1)) {
        rowSet.push(Bodies.circle(x * spacing + offset, y * spacing + offset, 1, {
          isStatic: true
        }));
      } else {
        rowSet.push(Bodies.circle(x * spacing + offset, y * spacing + offset, 1));
      }
    }
    particles.push(rowSet);
  }
}

function createConstraints() {
  for (let x = 0; x < col; x++) {
    for (let y = 0; y < rows; y++) {
      let p1 = particles[x][y];
      if (x < col - 1) {
        let p2 = particles[x + 1][y];
        World.add(engine.world, Constraint.create({
          bodyA: p1,
          bodyB: p2,
          length: 25,
          stiffness: 1
        }));
      }
      if (y < rows - 1) {
        let p2 = particles[x][y + 1];
        World.add(engine.world, Constraint.create({
          bodyA: p1,
          bodyB: p2,
          length: 25,
          stiffness: 1
        }));
      }
    }
  }
}

function showParticles() {
  for (let x = 0; x < col; x++) {
    for (let y = 0; y < rows; y++) {
      let p1 = particles[x][y].position;
      ellipse(p1.x, p1.y, particles[x][y].circleRadius * 2);
      if (x < col - 1) {
        let p2 = particles[x + 1][y].position;
        line(p1.x, p1.y, p2.x, p2.y);
      }
      if (y < rows - 1) {
        let p3 = particles[x][y + 1].position;
        line(p1.x, p1.y, p3.x, p3.y);
      }
    }
  }
}

function particlePhysicsOn() {
  for (const pset of particles) {
    for (const p of pset) {
      World.add(engine.world, p);
    }
  }
}
