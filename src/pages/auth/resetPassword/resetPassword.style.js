import styled from "styled-components";

const Style = styled.div`
  ${({ rtlLayout }) =>
    rtlLayout
      ? `
  .back-to-signin {
    font-weight: 300;
    a {
      font-weight: normal;
    }
  }
`
      : ""};
  .password-form-item {
    .ant-form-explain {
      display: none !important;
    }
  }
  .ant-form-item {
    margin-top: 0px !important;
  }
  .btn {
    margin-left: auto !important;
    margin-right: auto !important;
  }
`;
export default Style;
