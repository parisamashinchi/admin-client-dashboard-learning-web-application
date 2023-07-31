import styled from "styled-components";
import { Button as AntButton } from "antd";
import { palette } from "theme/injectGlobal";

const Button = styled(AntButton)`
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
  position: relative !important;
  height: auto !important;
  width: auto !important;
  padding: 10px 20px !important;
  font-weight: 300 !important;
  ${({ dark }) =>
    dark
      ? `
    background-color: ${palette.darkGrey} !important;
    border: none !important;
    &:hover {
      background-color: ${palette.darkGreySecondary} !important;
    }
  `
      : ""};
  .anticon-loading {
    margin: ${props =>
      props["data-rtl"] ? "0 0 0 16px" : "0 16px 0 0"} !important;
  }
`;
export default Button;

// ${
//   ({ loading, dark }) =>
//     loading
//       ? `
//         color: ${dark ? palette.darkGrey : palette.blue} !important;
//         overflow: hidden;
//         cursor: wait !important;
//         pointer-events: none !important;

//         .anticon {
//           display: none;
//           opacity: 0 !important;
//         }

//         &:before {
//             content: '';
//             box-sizing: border-box;
//             position: absolute;
//             top: 50% !important;
//             left: 50% !important;
//             bottom: 0 !important;
//             right: auto !important;
//             width: 20px !important;
//             height: 20px !important;
//             margin-top: -10px !important;
//             margin-left: -10px !important;
//             border-radius: 50% !important;
//             border: 2px solid transparent !important;
//             border-top-color: ${palette.white} !important;
//             background: transparent !important;
//             opacity: 1 !important;
//             animation: spinner .6s linear infinite !important;
//         }`
//       : ""
// };
