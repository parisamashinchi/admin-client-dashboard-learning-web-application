import styled from "styled-components";

const Style = styled.div`
    .hide {
       display: none;
     }
     .steps-action {
       button {
         display: inline-block!important;
       } 
     }
     .ant-steps-item-title::after {
         right: 100%
     }
    .ant-steps-item-title {
        padding: 0 16px;
     }
     .form-col {
       float: right !important;
     }
  
    .first-item {
      float: right;
    }
    .remove-button {
        float: left;
        margin-top: 20px;
        display: block!important;
          i {
        color: red;
      }
    }
    h6 {
        font-size: 14px;
        margin-top: 20px;
    }
    .ant-select-selection__rendered {
      line-height: 2.5 !important;
    }

`;
export default Style;
