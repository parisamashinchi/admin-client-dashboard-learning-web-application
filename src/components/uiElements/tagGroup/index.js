import React, { Component } from "react";
import PropTypes from "prop-types";
import Tag from "./tag";
import TagHost, { TagInput } from "./style";
import { Tooltip } from "antd";
import textDots from "utils/getters/textDots";
import map from "lodash/map";

export default class TagGroup extends Component {
  static getDerivedStateFromProps(nextProps, nextState) {
    if ("value" in nextProps) {
      return {
        tags: nextProps.value,
      };
    }
    return null;
  }
  constructor(props) {
    super(props);
    this.state = {
      inputVisible: false,
      inputValue: "",
    };
  }
  handleClose = removedTag => {
    const tags = this.state.tags.filter(tag => tag !== removedTag);
    this.triggerOnChange(tags);
  };
  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  };
  handleInputChange = e => {
    this.setState({ inputValue: e.target.value });
  };
  handleInputConfirm = () => {
    const { inputValue } = this.state;
    let { tags } = this.state;
    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue];
    }
    this.setState({
      inputVisible: false,
      inputValue: "",
    });
    this.triggerOnChange(tags);
  };
  saveInputRef = input => (this.input = input);
  triggerOnChange = tags => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(tags);
    }
  };
  render() {
    const { placeholder = "tagGroup.addTagPlaceholder" } = this.props;
    const { tags, inputValue } = this.state;
    return (
      <TagHost>
        {map(tags, (tag, index) => {
          const isLongTag = tag.length > 20;
          const tagElem = (
            <Tag key={tag} closable onClose={() => this.handleClose(tag)}>
              {isLongTag ? textDots(tag, 20) : tag}
            </Tag>
          );
          return isLongTag ? (
            <Tooltip title={tag} key={tag}>
              {tagElem}
            </Tooltip>
          ) : (
            tagElem
          );
        })}
        <TagInput
          ref={this.saveInputRef}
          size="small"
          type="text"
          placeholder={this.context.intl.formatMessage({
            id: placeholder,
          })}
          value={inputValue}
          onChange={this.handleInputChange}
          onBlur={this.handleInputConfirm}
          onPressEnter={this.handleInputConfirm}
        />
      </TagHost>
    );
  }
}
TagGroup.contextTypes = {
  intl: PropTypes.object.isRequired,
};
