import styled from "styled-components";
import { Input as AntInput } from "antd";
import { palette } from "theme/injectGlobal";

const TextArea = styled(AntInput.TextArea)`
  height: auto !important;
  padding: 10px 20px !important;
  background-color: ${palette.lightGrey} !important;
  line-height: 1.5 !important;
  text-align: ${props => (props["data-rtl"] ? "right" : "left")} !important;
  direction: ${props => (props["data-rtl"] ? "rtl" : "ltr")} !important;
`;
export default TextArea;
