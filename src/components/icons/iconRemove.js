import React from "react";
import { palette } from "theme/injectGlobal";

const IconRemove = ({ color }) => (
  <svg
    version="1.1"
    id="Capa_1"
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    width="100%"
    height="100%"
    viewBox="0 0 357 357"
    fill={color || palette.white}
  >
    <polygon
      points="357,35.7 321.3,0 178.5,142.8 35.7,0 0,35.7 142.8,178.5 0,321.3 35.7,357 178.5,214.2 321.3,357 357,321.3 
			214.2,178.5 		"
    />
  </svg>
);
export default IconRemove;
