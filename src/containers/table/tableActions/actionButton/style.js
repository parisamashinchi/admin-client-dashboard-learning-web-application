import styled from "styled-components";
import { palette } from "theme/injectGlobal";

const ActionButton = styled.button`
  margin: 0 5px;
  position: relative;
  color: ${palette.white} !important;
  border: none;
  outline: 0 !important;
  border-radius: 4px;
  width: 30px;
  height: 30px;
  transition: background-color 0.3s;
  &::after {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-family: feather !important;
    width: 20px;
    height: 20px;
    font-size: 14px;
  }
`;
export default ActionButton;
