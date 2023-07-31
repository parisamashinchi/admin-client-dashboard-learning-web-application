import styled from "styled-components";
import { palette, themeVar } from "theme/injectGlobal";
import color from "color";

const Style = styled.div`
  position: relative;
  height: 100px;
  ${({ multiple }) => (multiple ? "width: 25%;" : "width: 100%;")}
  margin: 10px;
  border-radius: ${themeVar.border};
  cursor: zoom-in;
  overflow: hidden;
  & > div {
    width: 100%;
    height: 100%;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .btn-delete {
    cursor: pointer;
    position: absolute;
    width: 20px;
    height: 20px;
    top: 8px;
    left: ${props => (props["data-rtl"] ? "8px" : "auto")};
    right: ${props => (props["data-rtl"] ? "auto" : "8px")};
    background: ${palette.red};
    border-radius: ${themeVar.border};
    border: none;
    outline: 0;
    transition: background-color 0.3s;
    &:hover {
      background: ${color(palette.red).darken(0.2)};
    }
    &::after {
      content: "\\e8f6";
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-family: "feather";
      color: ${palette.white};
      font-size: 12px;
    }
  }
  .__react_modal_image__icon_menu {
    a:nth-child(2) {
      display: none;
    }
  }
  .__react_modal_image__modal_container {
    cursor: auto;
    z-index: 1100 !important;
    position: fixed;
    .__react_modal_image__modal_content {
      .__react_modal_image__medium_img {
        width: auto !important;
        height: auto !important;
        max-width: 70%;
        max-height: 70%;
      }
    }
  }
`;
export default Style;
