import styled from "styled-components";
import { palette } from "theme/injectGlobal";

const Style = styled.div`
    .ant-col-1, .ant-col-2, .ant-col-3, .ant-col-4, .ant-col-5, .ant-col-6, .ant-col-7, .ant-col-8, .ant-col-9, .ant-col-10, .ant-col-11, .ant-col-12, .ant-col-13, .ant-col-14, .ant-col-15, .ant-col-16, .ant-col-17, .ant-col-18, .ant-col-19, .ant-col-20, .ant-col-21, .ant-col-22, .ant-col-23, .ant-col-24
    ,.ant-col-xl-1, .ant-col-xl-2, .ant-col-xl-3, .ant-col-xl-4, .ant-col-xl-5, .ant-col-xl-6, .ant-col-xl-7, .ant-col-xl-8, .ant-col-xl-9, .ant-col-xl-10, .ant-col-xl-11, .ant-col-xl-12, .ant-col-xl-13, .ant-col-xl-14, .ant-col-xl-15, .ant-col-xl-16, .ant-col-xl-17, .ant-col-xl-18, .ant-col-xl-19, .ant-col-xl-20, .ant-col-xl-21, .ant-col-xl-22, .ant-col-xl-23, .ant-col-xl-24
    {
        float: right;
    }
    .back-img {
        width: 100%;
    }
    .profile-img {
        border-radius: 50%;
        width: 80%; 
    }
    th, td {
        border: 1px solid rgba(0,0,0,0.125);
    }
    .ant-btn {
        background: #68d9a0;
        border-color: #68d9a0;
        float: left;
    }
    .resume-btn {
        color: rgba(0, 0, 0, 0.65);
        background: none;
        border-color: #ebebed;
        margin-left:10px
    }
    h3 {
        margin: 35px 10px 0 0;
        font-size: 15px;
        font-weight: 500!important;
        color: rgba(53, 53, 53, 0.65);
    }
     .anticon-star {
        font-size: 8px;
     }
    .ant-divider {
        margin: 10px 10px 20px ;
    }
    .ant-input, .ant-select-selection--single {
        height: 45px;
    }
    textarea.ant-input {
        height: auto!important;
    }
    .ant-form-item {
        padding: 0 10px!important;
        margin: 15px 0!important;;
    }  
    .anticon-star {
        color: red;
        font-size: 6px;
        top: -2px;
        position: relative;
        margin-left: 5px;
    } 
    p {
        font-size: 12px;
        color: #cecece; 
        padding: 0 10px;  
    }
    .ant-select-arrow {
        left: 11px;
        right: inherit;
    }
    .avatar-uploader{
        margin-top: 0!important
    }
    .ant-btn {
        line-height: 10px;
    }
    .ant-select-selection__placeholder {
        display: block!important;
    }
`;
export default Style;
