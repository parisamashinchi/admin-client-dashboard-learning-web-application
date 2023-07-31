import styled from "styled-components";
import { palette } from "theme/injectGlobal";
import ActionButton from "./actionButton";

const TableActionWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const ActionDelete = styled(ActionButton)`
  background-color: ${palette.red};
  &:hover {
  }
  &::after {
    content: "\\e8f6";
  }
`;
const ActionEdit = styled(ActionButton)`
  background-color: ${palette.lightGreyTertiary};
  &:hover {
  }
  &::after {
    content: "\\e866";
  }
`;

export { TableActionWrapper, ActionDelete, ActionEdit };
