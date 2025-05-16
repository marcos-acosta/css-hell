const LEVEL_DATA_PATH = "data/levels.json";
const ELEMENT_TYPE = {
  peg: "p",
  hole: "h",
  div: "d",
  text: "t",
};
const ELEMENTS_WITH_LETTERS = [ELEMENT_TYPE.peg, ELEMENT_TYPE.hole];
const TARGET_COLORS = ["#ff3e30", "#176bef", "#f7b529", "#44FFD2"];
const NERFED_PROPERTIES = [
  "animation",
  "offset",
  "perspective",
  "scale",
  "transform",
  "translate",
];
const STYLE_CONFLICTS = {
  background: new Set([
    "backgroundAttachment",
    "backgroundClip",
    "backgroundColor",
    "backgroundImage",
    "backgroundOrigin",
    "backgroundPosition",
    "backgroundRepeat",
    "backgroundSize",
  ]),
  border: new Set(["borderWidth", "borderStyle", "borderColor"]),
  container: new Set(["containerName", "containerType"]),
  flex: new Set(["flexGrow", "flexShrink", "flexBasis"]),
  font: new Set([
    "fontFamily",
    "fontSize",
    "fontStretch",
    "fontStyle",
    "fontVariant",
    "fontWeight",
    "lineHeight",
  ]),
  grid: new Set([
    "gridAutoColumns",
    "gridAutoFlow",
    "gridAutoRows",
    "gridTemplateAreas",
    "gridTemplateColumns",
    "gridTemplateRows",
  ]),
  inset: new Set(["top", "right", "bottom", "left"]),
  margin: new Set([
    "marginTop",
    "marginRight",
    "marginBottom",
    "marginLeft",
    "marginBlock",
    "marginBlockEnd",
    "marginBlockStart",
    "marginInline",
    "marginInlineEnd",
    "marginInlineStart",
  ]),
  mask: new Set([
    "maskClip",
    "maskComposite",
    "maskImage",
    "maskMode",
    "maskOrigin",
    "maskPosition",
    "maskRepeat",
    "maskSize",
  ]),
  outline: new Set(["outlineColor", "outlineStyle", "outlineWidth"]),
  overflow: new Set(["overflowX", "overflowY"]),
  padding: new Set([
    "paddingTop",
    "paddingRight",
    "paddingBottom",
    "paddingLeft",
    "paddingBlock",
    "paddingBlockEnd",
    "paddingBlockStart",
    "paddingInline",
    "paddingInlineEnd",
    "paddingInlineStart",
  ]),
  transition: new Set([
    "transitionDelay",
    "transitionDuration",
    "transitionProperty",
    "transitionTimingFunction",
  ]),
};
const LAST_LEVEL_NUMBER = 16;

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
  } else if (elementType === ELEMENT_TYPE.hole) {
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

function cssStyleToJsxStyle(propertyName) {
  return propertyName.replace(/-\w/g, (x) => x.slice(1).toUpperCase());
}

function sanitizePropertyName(propertyName) {
  return propertyName.replace(/[0-9-]/g, "");
}

function preparePropertyName(propertyName) {
  return sanitizePropertyName(cssStyleToJsxStyle(propertyName));
}

function preparePropertyValue(propertyValue) {
  return propertyValue.replace(/;/g, "");
}

function jsxPropertyToCssProperty(propertyName) {
  return propertyName.replace(/(\w)([A-Z])/g, "$1-$2").toLowerCase();
}

function filterNerfedProperties(styles) {
  const filteredStyles = Object.fromEntries(
    Object.entries(styles).filter(
      ([propertyName, _]) => !NERFED_PROPERTIES.includes(propertyName)
    )
  );
  const wasAltered =
    Object.keys(filteredStyles).length !== Object.keys(styles).length;
  return [filteredStyles, wasAltered];
}

function _isShorthandOfOtherProperty(propertyName, otherPropertyName) {
  return (
    STYLE_CONFLICTS[propertyName] &&
    STYLE_CONFLICTS[propertyName].has(otherPropertyName)
  );
}

function _areConflicting(propertyName1, propertyName2) {
  return (
    _isShorthandOfOtherProperty(propertyName1, propertyName2) ||
    _isShorthandOfOtherProperty(propertyName2, propertyName1) ||
    propertyName1 === propertyName2
  );
}

function doesPropertyNameConflictWithStyles(propertyName, styles) {
  const cleanedPropertyName = preparePropertyName(propertyName);
  for (const existingPropertyName in styles) {
    if (_areConflicting(cleanedPropertyName, existingPropertyName)) {
      return true;
    }
  }
  return false;
}

function filterConflictingProperties(customStyles, defaultStyles) {
  const filteredStyles = Object.fromEntries(
    Object.keys(customStyles)
      .filter(
        (propertyName) =>
          !doesPropertyNameConflictWithStyles(propertyName, defaultStyles)
      )
      .map((propertyName) => [propertyName, customStyles[propertyName]])
  );
  const wasAltered =
    Object.keys(filteredStyles).length !== Object.keys(customStyles).length;
  return [filteredStyles, wasAltered];
}

export {
  LEVEL_DATA_PATH,
  ELEMENT_TYPE,
  NERFED_PROPERTIES,
  LAST_LEVEL_NUMBER,
  combineClassNames,
  interpretId,
  testForOverlapRandom,
  isHole,
  getIndexFromId,
  preparePropertyName,
  preparePropertyValue,
  jsxPropertyToCssProperty,
  filterConflictingProperties,
  filterNerfedProperties,
  doesPropertyNameConflictWithStyles,
};
