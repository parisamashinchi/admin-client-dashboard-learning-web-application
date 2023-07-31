import React, { Component } from "react";
import { connect } from "react-redux";
import withDirection from "../../utils/withDirection";
import * as constants from "./constants";
import map from "lodash/map";
import pullAt from "lodash/pullAt";
import Dropzone from "react-dropzone";
import Style, { DropzoneRootWrapper } from "./upload.style";
import { Spin } from "antd";
import IconInbox from "components/icons/iconInbox";
import IntlMessages from "utils/intlMessages";
import UploadItem from "./uploadItem";
import * as actions from "./actions";
import uuid from "uuid/v1";
import isEmpty from "lodash/isEmpty";
import { bindActionCreators } from "redux";

export function createUpload(name) {
  class Upload extends Component {
    constructor(props) {
      super(props);
      const { value, multiple, setLocalFiles } = props;
      // if (value) {
      //   setLocalFiles(
      //     name,
      //     !isEmpty(value)
      //       ? Array.isArray(value)
      //         ? value.map(val => ({ id: uuid(), url: val }))
      //         : [{ id: uuid(), url: value }]
      //       : []
      //   );
      // }
      this.state = {
        allowUpload: multiple || (!multiple && isEmpty(value)),
        loaded: false,
        currentImage: "",
      };
    }
    componentDidUpdate(prevProps) {
      const { images: prevImages, value: prevValue, currentImage } = prevProps;
      const { images, multiple, value, setLocalFiles } = this.props;
      const { loaded } = this.state;
      // if (prevValue !== value && !isEmpty(value) && !loaded) {
      //   this.setState({ loaded: true }, () =>
      //     setLocalFiles(
      //       name,
      //       !isEmpty(value)
      //         ? Array.isArray(value)
      //           ? value.map(val => ({ id: uuid(), url: val }))
      //           : [{ id: uuid(), url: value }]
      //         : []
      //     )
      //   );
      // }
      if (
        ((prevImages && prevImages.length > 0) ||
          (images && images.length > 0)) &&
        prevImages !== images
      ) {
        this.setState({
          allowUpload: multiple || (!multiple && isEmpty(images)),
        });
        this.triggerChange();
      }
        if (prevProps.currentImage !== this.state.currentImage && this.state.currentImage !== "deleted") {
        this.setState({
            currentImage: prevProps.currentImage,
        });
      }
    }
    componentWillUnmount() {
      const { images, resetState } = this.props;
      if (images && images.length > 0) {
        resetState(name);
      }
    }
    addFiles = files => {
      const localFiles = map(files, file => ({
        url: URL.createObjectURL(file),
        name: file.name,
        size: file.size,
        local: true,
      }));
      this.requestUpload(files, localFiles);
    };
    requestUpload = (files, localAssigns) => {
      const { uploadFiles, url, uploadName, onChanges, type= 'image', images } = this.props;
      const formData = new FormData();
        files.forEach(file => formData.append(uploadName, file));
      formData.append("Type", type);
      formData.append("IsPrivate", false);
      formData.append("name", uploadName);
      this.setState({
          currentImage: "deleted"
      });
      uploadFiles(name, formData, localAssigns, url, onChanges);
    };
      deleteFile = (id) => {
      const { deleteFile } = this.props;
      if(id) {
          deleteFile(name, id);
      } else {
        this.setState({
            currentImage: "deleted",
        });
      }
    };
    triggerChange = () => {
      const { onChange, images, multiple } = this.props;
      if (onChange) {
        const uploadedImages = images
          .filter(image => !image.local)
          .map(image => image.url);
        onChange(multiple ? uploadedImages : uploadedImages[0]);
      }
    };
    render() {
      const { className, style, loading, images, multiple } = this.props;
      const { allowUpload } = this.state;
      const renderFarm = () => {
        return this.state.currentImage === "deleted" ? map(images, (image, index) => {
          return (
            <UploadItem
              key={index}
              imageUrl={image.url}
              local={image.local}
              multiple={false}
              onDelete={() => this.deleteFile(image.id)}
            />
          );
        }) : this.state.currentImage === "" ? map(images, (image, index) => {
            return (
                <UploadItem
                    key={index}
                    imageUrl={image.url}
                    local={image.local}
                    multiple={false}
                    onDelete={() => this.deleteFile(image.id)}
                />
            );
        }) : <UploadItem
            imageUrl={this.state.currentImage}
            local={true}
            multiple={false}
            onDelete={() => this.deleteFile()}
        />
      };
      return (
        <Style className={className} style={style}>
          <Spin spinning={loading}>
            <Dropzone
              //accept={constants.ACCEPT_MIME_TYPES}
              onDrop={this.addFiles}
              //disabled={!allowUpload}
            >
              {({ getRootProps, getInputProps }) => (
                <section>
                  <DropzoneRootWrapper
                    {...getRootProps()}
                    allowed={allowUpload}
                    multiple={false}
                  >
                    <input {...getInputProps()} />
                    {images.length === 0 &&  (
                      <div className="drop-zone-message-wrapper">
                        <div className="upload-icon">
                          <IconInbox />
                        </div>
                        <p className="upload-text">
                          <IntlMessages
                            id={
                              multiple
                                ? "upload.multiple.titleDrag"
                                : "upload.titleDrag"
                            }
                          />
                        </p>
                      </div>
                    )}
                    <div className="image-list">{renderFarm()}</div>
                  </DropzoneRootWrapper>
                </section>
              )}
            </Dropzone>
          </Spin>
        </Style>
      );
    }
  }
  Upload.defaultProps = {
    multiple: false,
  };
  const mapDispatchToProps = dispatch => {
    const {
      setLocalFiles,
      setUploadRequest,
      setDeleteFile,
      resetState,
    } = actions;
    return bindActionCreators(
      {
        //setLocalFiles,
        uploadFiles: setUploadRequest,
        deleteFile: setDeleteFile,
        resetState,
      },
      dispatch
    );
  };
  const mapStateToProps = state => ({
    images: state.getIn([constants.UPLOAD, `${name}_files`], []),
    loading: state.getIn([constants.UPLOAD, `${name}_loading`], false),
    failed: state.getIn([constants.UPLOAD, `${name}_failed`], false),
  });
  return withDirection(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(Upload)
  );
}
