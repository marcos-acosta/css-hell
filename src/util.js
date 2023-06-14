const LEVEL_DATA_PATH = "data/levels.json";
const ELEMENT_TYPE = {
  peg: "p",
  hole: "h",
  div: "d",
};

function combineClassNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function matchingIdToLetter(matchingId) {
  return "ABCDEFGHIJKLMNOPQRSTUVWXYZ"[matchingId];
}

function interpretId(id) {
  const [type, matchingId] = id;
  return {
    hasContents: type === ELEMENT_TYPE.div,
    elementType: type,
    letter: type !== ELEMENT_TYPE.div && matchingIdToLetter(matchingId),
    index: parseInt(matchingId),
  };
}

function getIndexFromId(id) {
  return parseInt(id.slice(1));
}

function getPegIdFromHoleId(holeId) {
  return `${ELEMENT_TYPE.peg}${getIndexFromId(holeId)}`;
}

function testForOverlapRandom(holeElement, numPoints) {
  if (!holeElement) {
    return false;
  }
  const _numPoints = numPoints || 225;
  const { left, top, height, width } = holeElement.getBoundingClientRect();
  const holeId = holeElement.id;
  const pegId = getPegIdFromHoleId(holeId);
  let x, y, overlappingElements;
  for (let i = 0; i < _numPoints; i++) {
    x = left + Math.random() * width;
    y = top + Math.random() * height;
    overlappingElements = document.elementsFromPoint(x, y);
    if (
      overlappingElements.some((element) => element.id === pegId) &&
      overlappingElements.some((element) => element.id === holeId)
    ) {
      return true;
    }
  }
  return false;
}

function isHole(id) {
  return id && id[0] === ELEMENT_TYPE.hole;
}

export {
  LEVEL_DATA_PATH,
  ELEMENT_TYPE,
  combineClassNames,
  interpretId,
  testForOverlapRandom,
  isHole,
  getIndexFromId,
};
