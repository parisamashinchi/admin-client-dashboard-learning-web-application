import styled from "styled-components";
import { palette } from "theme/injectGlobal";

const BooleanIcon = styled.i`
  width: 30px;
  height: 30px;
  font-style: normal;
  &::after {
    font-family: "feather";
    ${({ bool }) => (bool ? 'content: "\\e83e";' : 'content: "\\e8f7";')};
    color: ${({ bool }) => (bool ? palette.green : palette.red)};
    width: 30px;
    height: 30px;
    font-size: 18px;
  }
`;

export { BooleanIcon };
