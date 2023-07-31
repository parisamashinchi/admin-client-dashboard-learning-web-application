import styled from "styled-components";
import { Col } from "antd";
import { palette, themeVar } from "theme/injectGlobal";
import withDirection from "utils/withDirection";

const Style = withDirection(styled.div`
  .step-body {
  }
  .step-footer {
    .step-footer-button-container {
      display: flex;
      .ant-btn {
        border-radius: ${props =>
          props["data-rtl"]
            ? `0 ${themeVar.border} ${themeVar.border} 0`
            : `${themeVar.border} 0 0 ${themeVar.border}`};
      }
      .ant-btn-primary {
        border-radius: ${props =>
          props["data-rtl"]
            ? `${themeVar.border} 0 0 ${themeVar.border}`
            : `0 ${themeVar.border} ${themeVar.border} 0`};
      }
    }
  }
`);

const StepHead = withDirection(styled(Col)`
  position: relative;
  padding: 0 20px;
  ${({ active }) => (active ? `color: ${palette.blue}` : "")}
  &::after {
    content: "";
    position: absolute;
    bottom: -30px;
    width: 100%;
    height: 2px;
    background-color: ${({ active }) =>
      active ? palette.blue : palette.borderGrey};
    left: 0;
  }
  &:first-child {
    &::after {
      ${props =>
        props["data-rtl"] ? "left: 0; right: auto;" : "left: auto; right: 0;"}
      width: calc(100% + 25px);
    }
  }
  &:last-child {
    &::after {
      ${props =>
        props["data-rtl"] ? "right: 0; left: auto;" : "left: 0; right: auto;"}
      ${props => (props["data-rtl"] ? "" : "")}
      width: calc(100% + 25px);
    }
  }
`);

export default Style;
export { StepHead };
