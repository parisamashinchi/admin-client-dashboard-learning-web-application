import styled from "styled-components";
import { Select as AntSelect } from "antd";
import { palette, themeVar } from "theme/injectGlobal";
import Color from "color";

const Select = styled(AntSelect)`
  box-shadow: none;
  border-radius: ${themeVar.border};
  border: 1px solid ${palette.lightGreyQuaternary};
  background-color: ${palette.lightGrey} !important;
  height: auto;
  .ant-select {
    &:hover {
      border: 1px solid ${palette.blue} !important;
    }
  }
  .ant-select-selection {
    background-color: transparent !important;
    height: auto;
    border: none !important;
  }
  .ant-select-selection__rendered {
    padding: 10px 15px !important;
    line-height: 1.5 !important;
    margin: ${props =>
      props["data-rtl"] ? "0 0 0 36px" : "0 36px 0 0"} !important;
    .ant-select-selection__placeholder {
      right: ${props => (props["data-rtl"] ? "15px" : "auto")} !important;
      left: ${props => (props["data-rtl"] ? "auto" : "15px")} !important;
    }
    .ant-select-selection-selected-value {
      float: ${props => (props["data-rtl"] ? "right" : "left")} !important;
    }
  }
  .ant-select-arrow {
    right: ${props => (props["data-rtl"] ? "auto" : "11px")} !important;
    left: ${props => (props["data-rtl"] ? "11px" : "auto")} !important;
    &::before {
      position: absolute;
      right: ${props => (props["data-rtl"] ? "22px" : "auto")} !important;
      left: ${props => (props["data-rtl"] ? "auto" : "22px")} !important;
      width: 1px;
      height: 16px;
    }
  }
`;
const Option = styled(AntSelect.Option)``;
const SelectMultiple = styled(AntSelect).attrs(() => ({
  mode: "multiple"
}))`
  padding: 10px 15px;
  box-shadow: none;
  border-radius: 4px;
  background-color: ${palette.lightGrey} !important;
  border: 1px solid ${palette.lightGreyQuaternary};
  .ant-select-selection {
    background-color: transparent;
    border: none !important;
    padding: 0;
    margin: 0;
    .ant-select-selection__rendered {
      padding: 0;
      margin: 0;
      .ant-select-selection__placeholder {
        right: ${props => (props["data-rtl"] ? "15px" : "auto")} !important;
        left: ${props => (props["data-rtl"] ? "auto" : "15px")} !important;
      }
      ul {
        display: flex;
        flex-wrap: wrap;
        align-items: flex-start;
        .ant-select-selection__choice {
          height: auto;
          margin: 5px;
          padding: 5px 12px;
          border-radius: 4px;
          display: flex;
          justify-content: center;
          align-items: center;
          color: ${palette.white};
          background-color: ${palette.blue};
          transition: background-color 0.3s ease;
          .ant-select-selection__choice__content {
            margin: 0 4px;
          }
          .ant-select-selection__choice__remove {
            position: initial;
            font-size: 16px;
            margin: 0 4px;
            color: ${palette.white};
          }
          &:hover {
            background-color: ${Color(palette.blue).darken(0.2)};
          }
        }
        .ant-select-search {
          &.ant-select-search--inline {
            margin: 0 8px;
          }
        }
      }
    }
  }
  .ant-select-arrow {
    right: ${props => (props["data-rtl"] ? "auto" : "11px")} !important;
    left: ${props => (props["data-rtl"] ? "11px" : "auto")} !important;
    &::before {
      position: absolute;
      right: ${props => (props["data-rtl"] ? "22px" : "auto")} !important;
      left: ${props => (props["data-rtl"] ? "auto" : "22px")} !important;
      width: 1px;
      height: 16px;
    }
  }
`;
const OptionMultiple = styled(AntSelect.Option)``;

export { Select, Option, SelectMultiple, OptionMultiple };
