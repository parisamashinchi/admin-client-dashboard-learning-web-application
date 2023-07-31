import styled from "styled-components";
import { palette } from "theme/injectGlobal";

const Style = styled.div`
    .ant-col-1, .ant-col-2, .ant-col-3, .ant-col-4, .ant-col-5, .ant-col-6, .ant-col-7, .ant-col-8, .ant-col-9, .ant-col-10, .ant-col-11, .ant-col-12, .ant-col-13, .ant-col-14, .ant-col-15, .ant-col-16, .ant-col-17, .ant-col-18, .ant-col-19, .ant-col-20, .ant-col-21, .ant-col-22, .ant-col-23, .ant-col-24,
    .ant-col-xl-1, .ant-col-xl-2, .ant-col-xl-3, .ant-col-xl-4, .ant-col-xl-5, .ant-col-xl-6, .ant-col-xl-7, .ant-col-xl-8, .ant-col-xl-9, .ant-col-xl-10, .ant-col-xl-11, .ant-col-xl-12, .ant-col-xl-13, .ant-col-xl-14, .ant-col-xl-15, .ant-col-xl-16, .ant-col-xl-17, .ant-col-xl-18, .ant-col-xl-19, .ant-col-xl-20, .ant-col-xl-21, .ant-col-xl-22, .ant-col-xl-23, .ant-col-xl-24
    {
        float: right;
    }
    .ant-divider-horizontal.ant-divider-with-text-left{
        &::before {
            display: none;
        }
        .ant-divider-inner-text {
            padding-right: 0;
        }
    }
    .ant-card {
        height:300px;
        padding: 70px;
        text-align:center;
    }
    .not-found {
        height:500px!important;
        img {
            margin-top: 100px;
            width: 200px!important;
        }
        p {
            text-align: center!important;
            font-size: 25px!important;
            color: #d1d1d1;
            margin-top: 10px;
        }
    }
   
    .certificate {
        margin: 0 0 30px 0!important;
        .certificate-card {
            border-right: 4px solid #5bc5c9;
            padding-right: 10px;
        }
        .ant-card {
            height: 180px;
            padding: 15px 0px;
            img {
                width: 150px;
                border-radius: 10px;
                height: 100px;
                @media only screen and (max-width: 575px) {
                    margin-top: 20px;
                }
            }
            h2{
               font-size: 14px;
               text-align: right;
               font-weight: 500 !important;
            }
           
            p {
                text-align: right;
                font-size: 12px;
                margin-bottom: 3px;
            }
            .ant-btn {
                background: #c7c7c7;
                border-color: #c7c7c7;
                color: white; 
                float: left; 
                margin: 0;   
                line-height: 0px;
                margin-right: 10px;
                margin-top:65px;
                 @media only screen and (max-width: 575px) {
                    margin-top:10px;
                 }
            }
            .btn-recharge {    
                background: #68d9a0;
                border-color: #68d9a0;
            }           
        }
        .first-card {
              padding:0!important;
              height: 220px!important;
               @media only screen and (max-width: 575px) {
                    height: 300px!important;
                }
        }
        
    }
`;
export default Style;
