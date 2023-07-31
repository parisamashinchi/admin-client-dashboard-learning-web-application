import styled from "styled-components";
import { palette, themeVar } from "theme/injectGlobal";
import color from "color";

const Style = styled.div`
  position: relative;
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
  .__react_modal_image__icon_menu {
    a:nth-child(2) {
      display: none;
    }
  }
  .__react_modal_image__modal_container {
    cursor: auto;
   
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
