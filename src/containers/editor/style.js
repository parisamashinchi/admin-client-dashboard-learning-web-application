import styled from "styled-components";
import { palette, themeVar } from "theme/injectGlobal";

const Style = styled.div`
  .rdw-editor-wrapper {
    background-color: ${palette.lightGrey};
    border: 1px solid ${palette.lightGreyQuaternary};
    border-radius: ${themeVar.border};
    .rdw-editor-toolbar {
      border: none;
    }
    .rdw-editor-main {
      padding: 10px;
      min-height: 250px;
      max-height: 1000px;
    }
    .rdw-dropdown-carettoopen {
      ${props =>
        props["data-rtl"]
          ? "left: 10% !important; right: auto !important;"
          : "right: 10% !important; left: auto !important;"};
    }
    .rdw-dropdown-carettoclose {
      ${props =>
        props["data-rtl"]
          ? "left: 10% !important; right: auto !important;"
          : "right: 10% !important; left: auto !important;"};
    }
    .rdw-link-modal {
      height: auto;
      animation: fadeIn;
      animation-duration: 0.5s;
      ${props =>
        props["data-rtl"]
          ? "right: 5px !important; left: auto !important;"
          : ""};
    }
    .rdw-embedded-modal {
      height: auto;
      animation: fadeIn;
      animation-duration: 0.5s;
      ${props =>
        props["data-rtl"]
          ? "right: 5px !important; left: auto !important;"
          : ""};
    }
    .rdw-emoji-modal {
      height: 200px;
      animation: fadeIn;
      animation-duration: 0.5s;
      ${props =>
        props["data-rtl"]
          ? "right: 5px !important; left: auto !important;"
          : ""};
    }
    .rdw-image-modal {
      height: auto;
      animation: fadeIn;
      animation-duration: 0.5s;
      ${props =>
        props["data-rtl"]
          ? "right: 5px !important; left: auto !important;"
          : ""};
    }
  }
`;
export default Style;
