//TODO: add baskets and tweak physics to behave a bit more consistently.
//engine declarations and setup
let Engine = Matter.Engine,
  World = Matter.World,
  Bodies = Matter.Bodies,
  Body = Matter.Body,
  engine,
  plinko,
  testBalls = [],
  total = 0;

let colors = {
  background: [80, 89, 66],
  basketColor: [77, 112, 52],
  pinColor: [14, 33, 65],
  ballColor: [26, 73, 141],
  ballFill: [29, 29, 41]
}

function setup() {
  createCanvas(1280, 720);
  engine = Engine.create();
  Engine.run(engine);
  plinko = new Plinko();
  plinko.buildStage();
}

function draw() {
  background(colors.background);
  plinko.run();
}

class Plinko {
  constructor() {
    this.balls = [];
    this.baskets = [];
    this.pins = [];
    this.mergedBasket;
    this.floor;
    this.rows = 12;
    this.col = 25;
  }

  run() {
    this.showPins();
    this.addBalls();
    this.showBalls();
    this.showFloor();
  }

  buildStage() {
    this.buildPins();
    this.buildFloor();
  }

  buildPins() {
    let scale = 50,
      yoff = 50,
      xoff = 30,
      staggerOff = 0;

    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.col; x++) {
        if (y % 2 === 0) {
          staggerOff = scale / 2;
        } else {
          staggerOff = 0;
        }

        let pin = Bodies.circle(x * scale + xoff + staggerOff, y * scale + yoff, 2, {
          isStatic: true
        });
        this.pins.push(pin);
        World.add(engine.world, pin);
      }
    }
  }

  showPins() {
    for (const pin of this.pins) {
      noStroke();
      fill(colors.pinColor);
      ellipse(pin.position.x, pin.position.y, pin.circleRadius * 2);
    }
  }

  addBalls() {
    if (this.balls.length < 1000 && frameCount % 30 === 0) {
      let tester = Bodies.circle(plinko.pins[12].position.x, -10, 14, {
        restitution: 0.4
      });
      this.balls.push(tester);
      World.add(engine.world, tester);
    }
  }

  showBalls() {
    for (const b of this.balls) {
      stroke(colors.ballColor);
      strokeWeight(2);
      fill(colors.ballFill);
      ellipse(b.position.x, b.position.y, b.circleRadius * 2);
    }
  }

  buildFloor() {
    this.floor = Bodies.rectangle(width / 2, height + 40, width, 100, {
      isStatic: true
    });
    World.add(engine.world, this.floor)
  }

  showFloor() {
    stroke(colors.basketColor);
    fill(colors.basketColor);
    beginShape();
    for (const v of this.floor.vertices) {
      vertex(v.x, v.y);
    }
    vertex(this.floor.vertices[0].x, this.floor.vertices[0].y);
    endShape();
  }
}
