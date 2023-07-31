import styled from "styled-components";
import { palette, themeVar } from "theme/injectGlobal";

const Style = styled.div``;

const DropzoneRootWrapper = styled.div`
  ${({ multiple }) =>
    multiple
      ? "width: 100%; min-height: 140px;"
      : "width: 140px; height: 140px;"};
  outline: 0;
  border: 1px dashed ${palette.borderGrey};
  position: relative;
  background-color: ${palette.lightGrey};
  border-radius: ${themeVar.border};
  transition: border-color 0.3s;
  &:hover {
    border-color: ${palette.blue};
  }
  cursor: ${({ allowed }) => (allowed ? "pointer" : "not-allowed")};
  .drop-zone-message-wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .upload-icon {
      width: 48px;
      height: 48px;
      margin-bottom: 20px;
    }
    .upload-text {
      margin: 0 0 4px;
      color: rgba(0, 0, 0, 0.4);
      font-size: 14px;
      font-weight: 300;
      white-space: nowrap;
    }
  }
  .image-list {
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
  }
`;

export default Style;
export { DropzoneRootWrapper };
