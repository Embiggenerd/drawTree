/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/canvas.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/canvas.js":
/*!**************************!*\
  !*** ./src/js/canvas.js ***!
  \**************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/js/utils.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_utils__WEBPACK_IMPORTED_MODULE_0__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }


var canvas = document.querySelector("canvas");
var c = canvas.getContext("2d");
var tree = {}; // break down of building a tree in canvas
// 1. draw one parent node
//    a. how to locate position children (1 vs 2 vs 3)
// 2. create algorithm that draws children, then children's children

console.log({
  innerHeight: innerHeight,
  innerWidth: innerWidth
});
canvas.width = innerWidth;
canvas.height = innerHeight; // c.translate(0, canvas.height);
// c.scale(1, -1);

var radius = 20;
var color = "blue";
var mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
};
var colors = ["#2185C5", "#7ECEFD", "#FFF6E5", "#FF7F66"]; // Event Listeners

addEventListener("mousemove", function (event) {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});
addEventListener("resize", function () {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  init();
}); // Objects

var Particle = /*#__PURE__*/function () {
  function Particle(x, y, radius, color, name) {
    _classCallCheck(this, Particle);

    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.name = name; // this.velocity = {
    //   x: Math.random() - .5,
    //   y: Math.random() - .5
    // }
  }

  _createClass(Particle, [{
    key: "draw",
    value: function draw() {
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
  }, {
    key: "update",
    value: function update(particles) {
      this.draw(); // for (let i = 0; i < particles.length; i++) {
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
  }]);

  return Particle;
}();

var drawTree = function drawTree(node) {
  var count = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var isRootNode = count === 0;

  if (isRootNode) {
    // Root node has a fixed position
    var x = innerWidth / 2;
    var y = radius * 2;
    node.canvasNode = new Particle(x, y, radius, color, node.name);
    node.canvasNode.update();
    node.children.forEach(function (child) {
      child.parent = node;
      drawTree(child, count + 1);
    });
  } else {
    // Hard part: determine positioning for children
    // 1. Create level 50px below
    // 2. Divide level by # of children, center divisions
    // 3. Each point is a child, left first
    // How to center: divide total segments by two, start that far to left of parent's x
    var numSublings = node.parent.children.length + 1;
    var segmentLength = node.parent.canvasNode.radius * 3;
    var totalLength = numSublings * segmentLength;
    var leftMargin = node.parent.canvasNode.x - totalLength / 2;
    var whichChild = node.parent.children.indexOf(node) + 1;
    console.log({
      whichChild: whichChild
    });

    var _x = leftMargin + segmentLength * whichChild;

    var _y = node.parent.canvasNode.y + node.parent.canvasNode.radius * 4; // Could be based on # of children


    node.canvasNode = new Particle(_x, _y, radius, color, node.name);
    node.canvasNode.update(); // const d = utils.getIntercept(x, y, node.parent.canvasNode.x,node.parent.canvasNode.y)
    // const m = utils.getSlope(x, y, node.parent.canvasNode.x,node.parent.canvasNode.y)
    // console.log('distance of edge', d * m)

    c.beginPath(); // Figure out how to add length
    // const d = utils.distance(x, y, node.parent.canvasNode.x,node.parent.canvasNode.y)
    // const d = utils.getIntercept(x, y, node.parent.canvasNode.x,node.parent.canvasNode.y)

    var slope = _utils__WEBPACK_IMPORTED_MODULE_0___default.a.getSlope(_x, _y, node.parent.canvasNode.x, node.parent.canvasNode.y); // let beginpoint = utils.getbeginpointFromSlopeAndLength2(x, y, node.parent.canvasNode.x - x, node.parent.canvasNode.y - y, radius)

    var beginpoint = _utils__WEBPACK_IMPORTED_MODULE_0___default.a.getEndpointFromSlopeAndLength(_x, _y, slope, radius, node.parent.canvasNode.x - _x, node.parent.canvasNode.y - _y); // Get distance from beginning points to node parents, then subtract radius to get distance of actual line

    var distance = _utils__WEBPACK_IMPORTED_MODULE_0___default.a.getDistance(beginpoint.x, beginpoint.y, node.parent.canvasNode.x, node.parent.canvasNode.y) - radius;
    var endpoint = _utils__WEBPACK_IMPORTED_MODULE_0___default.a.getEndpointFromSlopeAndLength(beginpoint.x, beginpoint.y, slope, distance, node.parent.canvasNode.x - _x, node.parent.canvasNode.y - _y);
    console.log({
      beginpoint2: beginpoint,
      beginpoint1: {
        x: _x,
        y: _y
      },
      slope: slope,
      slope2: _utils__WEBPACK_IMPORTED_MODULE_0___default.a.getSlope(_x, _y, beginpoint.x, beginpoint.y),
      distance: radius,
      distance2: _utils__WEBPACK_IMPORTED_MODULE_0___default.a.getDistance(_x, _y, beginpoint.x, beginpoint.y),
      parnetName: node.parent.name,
      name: node.name
    });
    c.moveTo(beginpoint.x, beginpoint.y);
    c.lineTo(endpoint.x, endpoint.y); // c.globalCompositeOperation='source-out';

    c.stroke(); // c.globalCompositeOperation='source-over';
    // c.beginPath();
    // c.arc(this.x, this.y, 5, 0, Math.PI * 2, false);
    // c.fillStyle = "black";
    // c.fill();
    // c.stroke();
    // c.closePath();

    node.children.forEach(function (child) {
      child.parent = node;
      drawTree(child, count + 1);
    });
  }
}; // Implementation


var particles;

function init() {
  tree = {
    type: "circle",
    name: "0",
    children: [{
      type: "circle",
      name: "1",
      children: [{
        type: "circle",
        name: "3",
        children: []
      }, {
        type: "circle",
        name: "4",
        children: []
      }]
    }, {
      type: "circle",
      name: "2",
      children: []
    }]
  }; // particles = [];
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
} // Animation Loop


function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height); // circle.update()
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

/***/ }),

/***/ "./src/js/utils.js":
/*!*************************!*\
  !*** ./src/js/utils.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

function cartToScreen(px, py) {
  return [px, -py + innerHeight];
}

function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colors) {
  return colors[Math.floor(Math.random() * colors.length)];
}

function distance(x1, y1, x2, y2) {
  var xDist = x2 - x1;
  var yDist = y2 - y1;
  return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
}

function getDistance(x1, y1, x2, y2) {
  console.log("distance", x1, y1, x2, y2);
  var xd = x2 - x1;
  var yd = y2 - y1;
  return Math.sqrt(Math.pow(xd, 2) + Math.pow(yd, 2));
}

function getSlope(x1, y1, x2, y2) {
  // [x1, y1] = cartToScreen(x1, y1)
  // [x2, y2] = cartToScreen(x2, y2)
  return (y2 - y1) / (x2 - x1);
}

function getSlope2(x1, y1, x2, y2) {
  // [x1, y1] = cartToScreen(x1, y1)
  // [x2, y2] = cartToScreen(x2, y2)
  return {
    x: x2 - x1,
    y: y2 - y1
  };
}

function getIntercept(x1, y1, x2, y2) {
  // y = mx + b
  // y - mx = b
  var m = getSlope(x1, y1, x2, y2);
  return y1 - m * x1;
}

function getEndpointFromSlopeAndLength(x, y, m, d, xdiff, ydiff) {
  // Math.sqrt(Math.pow(xd, 2) + Math.pow(yd, 2));
  console.log(m * d);
  var angle = getAngleFromSlope(xdiff, ydiff);
  console.log({
    angle: angle
  }); //   new_x = old_x + cos(angle) * distance
  // new_y = old_y + sin(angle) * distance

  x1 = x + Math.cos(angle) * d;
  y1 = y + Math.sin(angle) * d;
  return {
    x: x1,
    y: y1
  }; // return x1, y1
}

function getEndpointFromSlopeAndLength2(x, y, xdiff, ydiff, d) {
  // Math.sqrt(Math.pow(xd, 2) + Math.pow(yd, 2));
  var m = ydiff / xdiff;
  console.log(m * d);
  var angle = Math.atan2(xdiff, ydiff);
  console.log({
    angle: angle
  }); //   new_x = old_x + cos(angle) * distance
  // new_y = old_y + sin(angle) * distance

  x1 = x + Math.cos(angle) * d;
  y1 = y + Math.sin(angle) * d;
  return {
    x: x1,
    y: y1
  }; // return x1, y1
}

function getAngleFromSlope(x, y) {
  var slope = y / x;
  console.log("tantatnantantantantan", Math.atan(slope), Math.atan2(x, y), slope);

  if (Math.atan2(x, y) < 0) {
    return Math.atan(slope) + 3.14;
  }

  return Math.atan(slope);
}

module.exports = {
  getEndpointFromSlopeAndLength: getEndpointFromSlopeAndLength,
  getAngleFromSlope: getAngleFromSlope,
  randomIntFromRange: randomIntFromRange,
  getSlope: getSlope,
  randomColor: randomColor,
  distance: distance,
  getDistance: getDistance,
  getIntercept: getIntercept,
  cartToScreen: cartToScreen,
  getEndpointFromSlopeAndLength2: getEndpointFromSlopeAndLength2
};

/***/ })

/******/ });
//# sourceMappingURL=canvas.bundle.js.map