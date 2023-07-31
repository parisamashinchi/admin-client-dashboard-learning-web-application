import styled from "styled-components";
import { palette } from "theme/injectGlobal";
import { Collapse as AntCollapse } from "antd";

const Collapse = styled(AntCollapse)``;

const Panel = styled(AntCollapse.Panel)`
  .ant-collapse-header {
    padding: 10px 20px !important;
    background-color: ${palette.lightGrey};
    ${props =>
      props["data-rtl"]
        ? "padding-left: 20px !important; padding-right: 40px !important;"
        : ""};
  }
  .ant-collapse-arrow {
    ${props =>
      props["data-rtl"]
        ? "left: auto !important; right: 20px !important;  transform: translateY(-50%) rotate(180deg) !important;"
        : ""}
  }
  .ant-collapse-item-active {
    .ant-collapse-arrow {
      svg {
        ${props =>
          props["data-rtl"] ? "transform: rotate(-90deg) !important;" : ""}
      }
    }
  }
  .form-item-container {
    .ant-collapse-content-box {
      .ant-form-item:first-child {
        margin-top: 0px !important;
      }
    }
  }
`;

export { Collapse, Panel };
