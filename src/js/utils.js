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
  const xDist = x2 - x1;
  const yDist = y2 - y1;

  return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
}

function getDistance(x1, y1, x2, y2) {
  console.log("distance", x1, y1, x2, y2)
  let xd = x2 - x1;
  let yd = y2 - y1;

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
  return { x: x2 - x1, y: y2 - y1 };
}

function getIntercept(x1, y1, x2, y2) {
  // y = mx + b
  // y - mx = b
  const m = getSlope(x1, y1, x2, y2);
  return y1 - m * x1;
}

function getEndpointFromSlopeAndLength(x, y, m, d, xdiff, ydiff) {
  // Math.sqrt(Math.pow(xd, 2) + Math.pow(yd, 2));
  console.log(m * d);
  const angle = getAngleFromSlope(xdiff, ydiff);
  console.log({ angle });
  //   new_x = old_x + cos(angle) * distance
  // new_y = old_y + sin(angle) * distance
  x1 = x + Math.cos(angle) * d;
  y1 = y + Math.sin(angle) * d;
  return { x: x1, y: y1 };
  // return x1, y1
}


function getEndpointFromSlopeAndLength2(x, y, xdiff, ydiff, d) {
  // Math.sqrt(Math.pow(xd, 2) + Math.pow(yd, 2));
  const m = ydiff/xdiff
  console.log(m * d);
  const angle = Math.atan2(xdiff, ydiff);
  console.log({ angle });
  //   new_x = old_x + cos(angle) * distance
  // new_y = old_y + sin(angle) * distance
  x1 = x + Math.cos(angle) * d;
  y1 = y + Math.sin(angle) * d;
  return { x: x1, y: y1 };
  // return x1, y1
}

function getAngleFromSlope(x, y) {
  const slope = y/x
  console.log("tantatnantantantantan", Math.atan(slope), Math.atan2(x, y), slope)
  if (Math.atan2(x, y) < 0) {
    return Math.atan(slope) + 3.14;
  }
  return Math.atan(slope);
}

module.exports = {
  getEndpointFromSlopeAndLength,
  getAngleFromSlope,
  randomIntFromRange,
  getSlope,
  randomColor,
  distance,
  getDistance,
  getIntercept,
  cartToScreen,
  getEndpointFromSlopeAndLength2
};
