import React, { Component } from "react";
import Style from "./style";
import { fa } from "./locale";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import { Editor as DraftEditor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import withDirection from "utils/withDirection";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import superagent from "superagent";
import * as constants from "./constants";
import { reduxGetter } from "utils/reduxGetter";
import config from "config";

class Editor extends Component {
  static getDerivedStateFromProps(nextProps, nextState) {
    if ("value" in nextProps && nextProps.value && !nextState.loaded) {
      const contentBlock = htmlToDraft(nextProps.value);
      return {
        editorState: contentBlock
          ? EditorState.createWithContent(
              ContentState.createFromBlockArray(contentBlock.contentBlocks)
            )
          : EditorState.createEmpty(),
        loaded: true,
      };
    }
    return null;
  }
  constructor(props) {
    super(props);
    const { editorToolbar } = props;
    this.defaultEditorProps = {
      locale: "fa",
      localization: {
        locale: "fa",
        translations: fa,
      },
    };
    const defaultEditorToolbar = {
      options: [
        "inline",
        "blockType",
        "list",
        "textAlign",
        "link",
        "embedded",
        "emoji",
        "image",
        "remove",
        "history",
      ],
      image: {
        urlEnabled: true,
        uploadEnabled: true,
        uploadCallback: this.uploadCallback,
        alignmentEnabled: true,
        previewImage: true,
        inputAccept: "image/gif,image/jpeg,image/jpg,image/png,image/svg",
        alt: { present: false, mandatory: false },
        defaultSize: {
          height: "auto",
          width: "auto",
        },
      },
    };
    this.toolbar = { ...defaultEditorToolbar, ...editorToolbar };
    this.textAlignment = props["data-rtl"] ? "right" : "left";
    this.state = {
      editorState: EditorState.createEmpty(),
      loaded: false,
    };
  }
  // componentDidUpdate(prevProps) {
  //   const { value: prevValue } = prevProps;
  //   const { value } = this.props;
  //   const { loaded } = this.state;
  //   if (prevValue !== value && !loaded) {
  //     const contentBlock = htmlToDraft(value);
  //     this.setState({
  //       editorState: contentBlock
  //         ? EditorState.createWithContent(
  //             ContentState.createFromBlockArray(contentBlock.contentBlocks)
  //           )
  //         : EditorState.createEmpty(),
  //       loaded: true,
  //     });
  //   }
  // }
  onEditorStateChange = editorState => {
    this.setState({
      editorState,
    });
    this.triggerChange(editorState);
  };
  triggerChange = editorState => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(draftToHtml(convertToRaw(editorState.getCurrentContent())));
    }
  };
  handlePastedText = (text, html, editorState) => {
    const contentBlock = htmlToDraft(text);
    this.setState({
      editorState: EditorState.createWithContent(
        ContentState.createFromBlockArray(contentBlock.contentBlocks)
      ),
    });
    return true;
  };
  uploadCallback(file) {
    return new Promise((resolve, reject) => {
      var reader = new FileReader();

      reader.onloadend = function() {
        const accessToken = reduxGetter(state =>
          state.getIn(["USER", "token"])
        );
        const locale = reduxGetter(state =>
          state.getIn(["LanguageSwitcher", "language", "locale"])
        );
        const formData = new FormData();
        formData.append("Files", file);
        formData.append("Type", "image");
        formData.append("IsPrivate", false);
        superagent
          .post(config.apiUrl + constants.FILE_UPLOAD_API_URL)
          .send(formData)
          .set("Authorization", `Bearer ${accessToken}`)
          .set("Accept-Language", locale)
          .end(function(err, res) {
            if (err) {
              reject(err);
            } else {
              resolve({
                data: { link: config.fileServerUrl + res.body.data[0].url },
              });
            }
          });
      };
      reader.readAsDataURL(file);
    });
  }
  render() {
    const { editorState } = this.state;
    return (
      <Style data-rtl={this.props["data-rtl"]}>
        <DraftEditor
          editorState={editorState}
          {...this.defaultEditorProps}
          {...this.props}
          toolbar={this.toolbar}
          textAlignment={this.textAlignment}
          onEditorStateChange={this.onEditorStateChange}
          // handlePastedText={this.handlePastedText}
          onChange={() => {}}
        />
      </Style>
    );
  }
}
export default withDirection(Editor);
