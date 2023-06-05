import overlap from "polygon-overlap";

function combineClassNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function doBboxesOverlap(bbox1, bbox2) {
  return bbox1 && bbox2 && overlap(extractPoints(bbox1), extractPoints(bbox2));
}

function extractPoints(bbox) {
  let points = []
  Object.values(bbox).forEach(coords => {
    points.push([coords.left, coords.top])
  });
  return points;
}

export {
  combineClassNames,
  doBboxesOverlap
}