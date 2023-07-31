import React from "react";
import Style from "./style";
import withDirection from "utils/withDirection";
import ModalImage from "react-modal-image";
import config from "config";
import { replaceAt } from "utils/helpers/stringHelper";
import isEmpty from 'lodash/isEmpty';

const UploadItem = ({ imageUrl, local, multiple, onDelete, onPreview }) => {
    if (imageUrl && imageUrl.charAt(0) === "/") {
        imageUrl = replaceAt(imageUrl, 0, "");
    }

  const url = local ? imageUrl : `${config.fileServerUrl}${imageUrl}`;
  return (
    <Style multiple={multiple}>
      <ModalImage
        id="modal-image"
        className="media-file"
        onClick={onPreview}
        small={url}
        large={url}
      />
      <button
        className="btn-delete"
        onClick={e => (e.preventDefault(), onDelete())}
      />
    </Style>
  );
};
export default withDirection(UploadItem);
