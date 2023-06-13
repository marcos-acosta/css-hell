import overlap from "polygon-overlap";

const LEVEL_DATA_PATH = "data/levels.json";
const ELEMENT_TYPE = {
  peg: "p",
  hole: "h",
  div: "d",
};

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

function interpretId(id) {
  const [type, matchingId] = id;
  return {
    hasContents: type === ELEMENT_TYPE.div,
    letter: type !== ELEMENT_TYPE && matchingIdToLetter(matchingId),
  };
}

function testForOverlapRandom(targetElement, searchId, numPoints) {
  if (!targetElement) {
    return false;
  }
  const _numPoints = numPoints || 225;
  const { left, top, height, width } = targetElement.getBoundingClientRect();
  let x, y, overlappingElements;
  for (let i = 0; i < _numPoints; i++) {
    x = left + Math.random() * width;
    y = top + Math.random() * height;
    overlappingElements = document.elementsFromPoint(x, y);
    if (
      overlappingElements.some((element) => element.id === searchId) &&
      overlappingElements.some((element) => element.id === targetElement.id)
    ) {
      return true;
    }
  }
  return false;
}

function testForOverlap(targetElement, searchId, granularity) {
  if (!targetElement) {
    return false;
  }
  const _granularity = granularity || 15;
  const { left, right, top, bottom, height, width } =
    targetElement.getBoundingClientRect();
  let overlappingElements;
  for (let x = left; x <= right; x += width / _granularity) {
    for (let y = top; y <= bottom; y += height / _granularity) {
      overlappingElements = document.elementsFromPoint(x, y);
      if (
        overlappingElements.some((element) => element.id === searchId) &&
        overlappingElements.some((element) => element.id === targetElement.id)
      ) {
        return true;
      }
    }
  }
  return false;
}

function isHole(id) {
  return id && id[0] === ELEMENT_TYPE.hole;
}

export {
  LEVEL_DATA_PATH,
  combineClassNames,
  doBboxesOverlap,
  interpretId,
  testForOverlap,
  testForOverlapRandom,
  isHole,
};
