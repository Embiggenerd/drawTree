import utils from "./utils";

const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
let tree = {};

// break down of building a tree in canvas
// 1. draw one parent node
//    a. how to locate position children (1 vs 2 vs 3)
// 2. create algorithm that draws children, then children's children

console.log({ innerHeight, innerWidth });

canvas.width = innerWidth;
canvas.height = innerHeight;
// c.translate(0, canvas.height);
// c.scale(1, -1);
const radius = 20;
const color = "blue";
const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2,
};

const colors = ["#2185C5", "#7ECEFD", "#FFF6E5", "#FF7F66"];

// Event Listeners
addEventListener("mousemove", (event) => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

addEventListener("resize", () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  init();
});

// Objects
class Particle {
  constructor(x, y, radius, color, name) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.name = name;
    // this.velocity = {
    //   x: Math.random() - .5,
    //   y: Math.random() - .5
    // }
  }

  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = "white";
    c.fill();
    c.stroke();
    c.closePath();
    c.font = "30px Comic Sans MS";
    c.fillStyle = "red";
    c.textAlign = "center";
    c.textBaseline = "middle";
    c.fillText(this.name, this.x, this.y);
  }

  update(particles) {
    this.draw();
    // for (let i = 0; i < particles.length; i++) {
    //   const p = particles[i];
    //   if (this === p){
    //     console.log("this === p")
    //     continue
    //   }
    //   if (utils.distance(this.x, this.y, p.x, p.y) - this.radius * 2 <
    //   0) {
    //     console.log(
    //       'collision detected'
    //     )
    //   }
    // }
    // this.x += this.velocity.x
    // this.y += this.velocity.y
  }
}

const drawTree = (node, count = 0) => {
  const isRootNode = count === 0;
  if (isRootNode) {
    // Root node has a fixed position
    const x = innerWidth / 2;
    const y = radius * 2;
    node.canvasNode = new Particle(x, y, radius, color, node.name);
    node.canvasNode.update();
    node.children.forEach((child) => {
      child.parent = node;
      drawTree(child, count + 1);
    });
  } else {
    // Hard part: determine positioning for children
    // 1. Create level 50px below
    // 2. Divide level by # of children, center divisions
    // 3. Each point is a child, left first
    // How to center: divide total segments by two, start that far to left of parent's x
    const numSublings = node.parent.children.length + 1;
    const segmentLength = node.parent.canvasNode.radius * 3;
    const totalLength = numSublings * segmentLength;
    const leftMargin = node.parent.canvasNode.x - totalLength / 2;
    const whichChild = node.parent.children.indexOf(node) + 1;
    console.log({ whichChild });
    const x = leftMargin + segmentLength * whichChild;
    const y = node.parent.canvasNode.y + node.parent.canvasNode.radius * 4; // Could be based on # of children

    node.canvasNode = new Particle(x, y, radius, color, node.name);
    node.canvasNode.update();
    // const d = utils.getIntercept(x, y, node.parent.canvasNode.x,node.parent.canvasNode.y)
    // const m = utils.getSlope(x, y, node.parent.canvasNode.x,node.parent.canvasNode.y)
    // console.log('distance of edge', d * m)
    c.beginPath();
    // Figure out how to add length
    // const d = utils.distance(x, y, node.parent.canvasNode.x,node.parent.canvasNode.y)
    // const d = utils.getIntercept(x, y, node.parent.canvasNode.x,node.parent.canvasNode.y)
    const slope = utils.getSlope(
      x,
      y,
      node.parent.canvasNode.x,
      node.parent.canvasNode.y
    );

    // let beginpoint = utils.getbeginpointFromSlopeAndLength2(x, y, node.parent.canvasNode.x - x, node.parent.canvasNode.y - y, radius)
    let beginpoint = utils.getEndpointFromSlopeAndLength(
      x,
      y,
      slope,
      radius,
      node.parent.canvasNode.x - x,
      node.parent.canvasNode.y - y
    );

    // Get distance from beginning points to node parents, then subtract radius to get distance of actual line
    let distance =
      utils.getDistance(
        beginpoint.x,
        beginpoint.y,
        node.parent.canvasNode.x,
        node.parent.canvasNode.y
      ) - radius;

    let endpoint = utils.getEndpointFromSlopeAndLength(
      beginpoint.x,
      beginpoint.y,
      slope,
      distance,
      node.parent.canvasNode.x - x,
      node.parent.canvasNode.y - y
    );
    console.log({
      beginpoint2: beginpoint,
      beginpoint1: { x, y },
      slope,
      slope2: utils.getSlope(x, y, beginpoint.x, beginpoint.y),
      distance: radius,
      distance2: utils.getDistance(x, y, beginpoint.x, beginpoint.y),
      parnetName: node.parent.name,
      name: node.name,
    });
    c.moveTo(beginpoint.x, beginpoint.y);
    c.lineTo(endpoint.x, endpoint.y);
    // c.globalCompositeOperation='source-out';
    c.stroke();
    // c.globalCompositeOperation='source-over';
    // c.beginPath();
    // c.arc(this.x, this.y, 5, 0, Math.PI * 2, false);
    // c.fillStyle = "black";
    // c.fill();
    // c.stroke();
    // c.closePath();
    node.children.forEach((child) => {
      child.parent = node;
      drawTree(child, count + 1);
    });
  }
};

// Implementation
let particles;
function init() {
  tree = {
    type: "circle",
    name: "0",
    children: [
      {
        type: "circle",
        name: "1",
        children: [
          {
            type: "circle",
            name: "3",
            children: [],
          },
          {
            type: "circle",
            name: "4",
            children: [],
          },
        ],
      },
      {
        type: "circle",
        name: "2",
        children: [],
      },
    ],
  };
  // particles = [];
  // circle = new Circle(300, 300, 100, 'black')
  // circle2 = new Circle(null, null, 30, 'red')

  // objects = []

  // for (let i = 0; i < 4; i++) {
  //   const radius = 80;
  //   const color = "blue";
  //   let x = utils.randomIntFromRange(radius, canvas.width - radius);
  //   let y = utils.randomIntFromRange(radius, canvas.height - radius);

  //   if (i !== 0) {
  //     for (let j = 0; j < particles.length; j++) {
  //       if (
  //         utils.distance(x, y, particles[j].x, particles[j].y) - radius * 2 <
  //         0
  //       ) {
  //         x = utils.randomIntFromRange(radius, canvas.width - radius * 2);
  //         y = utils.randomIntFromRange(radius, canvas.height - radius);
  //         j = -1;
  //       }
  //     }
  //   }
  //   particles.push(new Particle(x, y, radius, color));
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);
  // circle.update()
  // circle2.x = mouse.x
  // circle2.y = mouse.y
  // circle2.update()

  // if(utils.getDistance(circle.x, circle.y, circle2.x, circle2.y) < circle.radius + circle2.radius) {
  //   circle.color = 'red'
  // } else {
  //   circle.color = 'black'

  // }

  // console.log(utils.getDistance(circle.x, circle.y, circle2.x, circle2.y))

  // c.fillText('HTML CANVAS BOILERPLATE', mouse.x, mouse.y)
  // particles.forEach((particle) => {
  //   particle.update(particles);
  // });
  drawTree(tree);
}

init();
animate();
