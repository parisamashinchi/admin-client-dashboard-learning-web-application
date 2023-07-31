import styled from "styled-components";
import AntTag from "antd/lib/tag";
import { palette } from "theme/injectGlobal";

const Tag = styled(AntTag)`
  border: none;
  background-color: ${palette.blue};
  border-radius: 2px;
  margin: 5px 10px;
  padding: 5px 12px;
  font-size: 14px;
  color: ${palette.white};
  .anticon-close {
    margin: ${props => (props["data-rtl"] ? "0 5px 0 0" : "0 0 0 5px")};
  }
`;
export default Tag;
