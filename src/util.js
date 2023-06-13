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

function testForOverlap(targetElement, searchId, granularity) {
  if (!targetElement) {
    return false;
  }
  const _granularity = granularity || 10;
  const { left, right, top, bottom, height, width } =
    targetElement.getBoundingClientRect();
  for (let x = left; x <= right; x += width / _granularity) {
    for (let y = top; y <= bottom; y += height / _granularity) {
      if (
        document
          .elementsFromPoint(x, y)
          .some((element) => element.id === searchId)
      ) {
        return true;
      }
    }
  }
  return false;
}

export {
  LEVEL_DATA_PATH,
  combineClassNames,
  doBboxesOverlap,
  matchingIdToLetter,
  testForOverlap,
};
