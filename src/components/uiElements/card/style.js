import styled from "styled-components";
import { Card as AntCard } from "antd";
import { palette } from "theme/injectGlobal";

const Card = styled(AntCard)`
  box-shadow: 0 1px 20px 0 rgba(69, 90, 100, 0.08);
  border: none !important;
  .ant-card-head {
    position: relative;
    &:before {
      position: absolute;
      content: "";
      top: 50%;
      transform: translateY(-50%);
      ${props =>
        props["data-rtl"] ? "right: 0; left: auto;" : "left: 0; rigth: auto;"};
      width: 4px;
      height: 20px;
      background-color: ${palette.blue};
    }
  }
`;
export default Card;
