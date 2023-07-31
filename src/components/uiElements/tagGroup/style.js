import styled from "styled-components";
import { palette, themeVar } from "theme/injectGlobal";
import { Input } from "antd";

const TagHost = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 5px 10px;
  background-color: ${palette.lightGrey};
  border: 1px solid ${palette.borderGrey};
  border-radius: ${themeVar.border};
  box-shadow: none;
  transition: border-color 0.3s, box-shadow 0.3s;
  &:hover {
    border-color: ${palette.blue};
  }
  &:focus {
    box-shadow: 0 0 0 2px rgba(4, 169, 245, 0.2);
  }
`;
const TagInput = styled(Input)`
  height: auto !important;
  width: auto !important;
  max-width: 180px;
  margin: 0 !important;
  padding: 5px 10px !important;
  font-size: 14px !important;
  border: none !important;
  background: transparent !important;
  &:hover,
  &:focus {
    border: none !important;
    box-shadow: none !important;
  }
`;

export default TagHost;

export { TagInput };
