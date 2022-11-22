import utils from "./utils";

const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
let tree = {};
let treeFinishedDrawing = false;
const animationOrder = [];
const EDGE_Z_INDEX = 0;
const NODE_Z_INDEX = 10;
const newAnimation = (drawFunc, type) => {
  let zindex = 0;
  if (type === "NODE") {
    zindex = NODE_Z_INDEX;
  }
  if (type === "EDGE") {
    zindex = EDGE_Z_INDEX;
  }
  return {
    drawFunc,
    zindex,
  };
};

// break down of building a tree in canvas
// 1. draw one parent node
//    a. how to locate position children (1 vs 2 vs 3)
// 2. create algorithm that draws children, then children's children

console.log({ innerHeight, innerWidth });

canvas.width = innerWidth;
canvas.height = innerHeight;
// c.translate(0, canvas.height);
// c.scale(1, -1);
const radius = 50;
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
    const anim = newAnimation(() => {
      this.draw();
    }, "NODE");
    animationOrder.push(anim);
  }
}

const drawTree = (node, count = 0) => {
  const isRootNode = count === 0;
  console.log("drawRree()", count);
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
    const drawEdge = () => {
      c.beginPath();
      c.moveTo(x, y);
      c.lineTo(node.parent.canvasNode.x, node.parent.canvasNode.y);
      // c.globalCompositeOperation='source-out';
      c.stroke();
    };
    const anim = newAnimation(drawEdge, "EDGE");
    animationOrder.push(anim);
    node.children.forEach((child) => {
      child.parent = node;
      drawTree(child, count + 1);
    });
  }
  treeFinishedDrawing = true;
};

// Implementation
let particles;
function init() {
  tree = {
    type: "circle",
    name: "Martin",
    children: [
      {
        type: "circle",
        name: "Phillip",
        children: [
          {
            type: "circle",
            name: "Robert",
            children: [],
          },
          {
            type: "circle",
            name: "Igor",
            children: [],
          },
        ],
      },
      {
        type: "circle",
        name: "Asal",
        children: [],
      },
    ],
  };
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  if (!treeFinishedDrawing) {
    c.clearRect(0, 0, canvas.width, canvas.height);
    drawTree(tree);
    console.log(" animationOrder", animationOrder);
    animationOrder
      .sort((a, b) => {
        return a.zindex - b.zindex;
      })
      .forEach((v) => {
        v.drawFunc();
      });
      console.log(" animationOrder2", animationOrder);

    console.log("tree was drawn");
  }
}

init();
animate();
