const LEVEL_DATA_PATH = "data/levels.json";
const ELEMENT_TYPE = {
  peg: "p",
  hole: "h",
  div: "d",
  text: "t",
};
const ELEMENTS_WITH_LETTERS = [ELEMENT_TYPE.peg, ELEMENT_TYPE.hole];
const TARGET_COLORS = ["#ff3e30", "#176bef", "#f7b529", "##44FFD2"];
const NERFED_PROPERTIES = [
  "offset",
  "perspective",
  "scale",
  "transform",
  "translate",
];

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
    elementType: type,
    letter: ELEMENTS_WITH_LETTERS.includes(type) && matchingIdToLetter(index),
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
  } else if (elementType == ELEMENT_TYPE.hole) {
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
  } else {
    return {
      cursor: "pointer",
    };
  }
}

export {
  LEVEL_DATA_PATH,
  ELEMENT_TYPE,
  NERFED_PROPERTIES,
  combineClassNames,
  interpretId,
  testForOverlapRandom,
  isHole,
  getIndexFromId,
};
