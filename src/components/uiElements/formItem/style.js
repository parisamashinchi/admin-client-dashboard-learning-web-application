import styled from "styled-components";
import { Form } from "antd";

const FormItem = styled(Form.Item)`
  width: 100%;
  text-align: ${({ rtlLayout }) => (rtlLayout ? "right" : "left")} !important;
  direction: ${({ rtlLayout }) => (rtlLayout ? "rtl" : "ltr")} !important;
  margin-top: 30px !important;
  margin-bottom: 0px !important;
  .ant-form-explain {
    margin-top: 5px;
  }
  .ant-form-item-control {
    line-height: inherit;
  }
  .ant-form-item-label {
    label {
      position: relative;
      line-height: initial;
      display: flex;
      align-items: center;
      &::before {
        margin: ${({ rtlLayout }) => (rtlLayout ? "0 0 0 4px;" : "0 4px 0 0;")};
      }
      &::after {
        content: none;
      }
    }
  }
`;
export default FormItem;
