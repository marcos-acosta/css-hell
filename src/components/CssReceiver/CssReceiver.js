import React, { memo } from 'react'
import Box from '../Box/Box';

const areCssEqual = (oldCss, nextCss) => {
  return JSON.stringify(oldCss) === JSON.stringify(nextCss);
}

export default memo(function CssReceiver(props) {
  return <Box css={props.css} setCornerCenter={props.setCornerCenter} />
}, (prevProps, nextProps) => areCssEqual(prevProps.css, nextProps.css));
