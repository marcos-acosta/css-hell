import overlap from "polygon-overlap";

const LEVEL_DATA_PATH = "data/levels.json";

function combineClassNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function doBboxesOverlap(bbox1, bbox2) {
  return bbox1 && bbox2 && overlap(extractPoints(bbox1), extractPoints(bbox2));
}

function extractPoints(bbox) {
  let points = [];
  Object.values(bbox).forEach((coords) => {
    points.push([coords.left, coords.top]);
  });
  return points;
}

function matchingIdToLetter(matchingId) {
  return "ABCDEFGHIJKLMNOPQRSTUVWXYZ"[matchingId];
}

function _average(a, b) {
  return (a + b) / 2;
}

function _getRadiusAndCenterFromBbox(bbox) {
  const { top, left, bottom, right } = bbox;
  const radius = (right - left) / 2;
  const center = [_average(left, right), _average(top, bottom)];
  return [radius, center];
}

function doCirclesIntersect(bbox1, bbox2) {
  const [r1, [x1, y1]] = _getRadiusAndCenterFromBbox(bbox1);
  const [r2, [x2, y2]] = _getRadiusAndCenterFromBbox(bbox2);
  const c1c2 = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
  return c1c2 < r1 + r2;
}

export {
  LEVEL_DATA_PATH,
  combineClassNames,
  doBboxesOverlap,
  matchingIdToLetter,
  doCirclesIntersect,
};
