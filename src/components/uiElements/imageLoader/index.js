import React from "react";
import config from "config";
import { replaceAt } from "utils/helpers/stringHelper";
import placeholder from "static/images/placeholder.jpg";

const ImageLoader = ({ src, local, ...rest }) => {
  if (src && src.charAt(0) === "/") {
    src = replaceAt(src, 0, "");
  }
  let imageSrc = { src: local ? src : `${config.fileServerUrl}${src}` };
  if (!src) {
    imageSrc = { src: placeholder };
  }
  return <img {...rest} {...imageSrc} />;
};
export default ImageLoader;
