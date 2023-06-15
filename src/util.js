const LEVEL_DATA_PATH = "data/levels.json";
const ELEMENT_TYPE = {
  peg: "p",
  hole: "h",
  div: "d",
};
const TARGET_COLORS = ["#ff3e30", "#176bef", "#f7b529", "##44FFD2"];

function combineClassNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function matchingIdToLetter(matchingId) {
  return "ABCDEFGHIJKLMNOPQRSTUVWXYZ"[matchingId];
}

function interpretId(id) {
  const [type, indexStr] = id;
  const index = parseInt(indexStr);
  return {
    hasContents: type === ELEMENT_TYPE.div,
    elementType: type,
    letter: type !== ELEMENT_TYPE.div && matchingIdToLetter(index),
    index: index,
    baseStyles: getBaseStyles(type, index),
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

function getBaseStyles(elementType, index) {
  if (elementType === ELEMENT_TYPE.div) {
    return {
      border: "1vw solid black",
      cursor: "pointer",
    };
  } else if (elementType === ELEMENT_TYPE.peg) {
    return {
      height: "5vw",
      width: "5vw",
      color: "white",
      textAlign: "center",
      backgroundColor: TARGET_COLORS[index],
      fontSize: "2vw",
      fontWeight: "bold",
      cursor: "pointer",
      borderRadius: "50%",
    };
  } else {
    return {
      height: "4.5vw",
      width: "4.5vw",
      textAlign: "center",
      color: TARGET_COLORS[index],
      border: `0.25vw dashed ${TARGET_COLORS[index]}`,
      backgroundColor: "rgb(255,255,255,0.5)",
      fontSize: "2vw",
      fontWeight: "bold",
      cursor: "pointer",
      borderRadius: "50%",
    };
  }
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
