import styled from "styled-components";
import { palette } from "theme/injectGlobal";

const Style = styled.div`
  .is-parent-select {
    margin-top: 10px;
  }
  .form-col {
    .ant-form-item:first-child {
      margin-top: 0px !important;
    }
  }
  .profile-picture {
    width: 140px;
    .image-list {
      & > div {
        width: 100px;
      }
    }
    .upload-text {
      display: none;
    }
    .upload-icon {
      position: relative;
      margin: 0 !important;
      svg {
        display: none;
      }
      &:before {
        position: absolute;
        width: 100%;
        height: 100%;
        content: "\\e8b1";
        font-size: 48px;
        font-family: "feather";
        top: 0;
        left: 0;
        line-height: 1;
        color: ${palette.blue};
      }
    }
  }
`;
export default Style;
