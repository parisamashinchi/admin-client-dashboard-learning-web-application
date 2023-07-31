import React from "react";
import Style from "./style";
import ModalImage from "react-modal-image";
import config from "config";
import { replaceAt } from "utils/helpers/stringHelper";
import placeholder from "static/images/placeholder.jpg";

const ImageLoader = ({ style, imageUrl, local }) => {
  if (imageUrl && imageUrl.charAt(0) === "/") {
    imageUrl = replaceAt(imageUrl, 0, "");
  }
  let url = local ? imageUrl : `${config.fileServerUrl}${imageUrl}`;
  if (!imageUrl) {
    url = placeholder;
  }
  return (
    <Style style={style}>
      <ModalImage
        id="modal-image"
        className="media-file"
        small={url}
        large={url}
      />
    </Style>
  );
};
export default ImageLoader;
