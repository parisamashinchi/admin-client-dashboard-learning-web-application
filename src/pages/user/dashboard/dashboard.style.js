import styled from "styled-components";
import { palette } from "theme/injectGlobal";

const Style = styled.div`
    .ant-col-1, .ant-col-2, .ant-col-3, .ant-col-4, .ant-col-5, .ant-col-6, .ant-col-7, .ant-col-8, .ant-col-9, .ant-col-10, .ant-col-11, .ant-col-12, .ant-col-13, .ant-col-14, .ant-col-15, .ant-col-16, .ant-col-17, .ant-col-18, .ant-col-19, .ant-col-20, .ant-col-21, .ant-col-22, .ant-col-23, .ant-col-24,
    .ant-col-lg-1, .ant-col-lg-2, .ant-col-lg-3, .ant-col-lg-4, .ant-col-lg-5, .ant-col-lg-6, .ant-col-lg-7, .ant-col-lg-8, .ant-col-lg-9, .ant-col-lg-10, .ant-col-lg-11, .ant-col-lg-12, .ant-col-lg-13, .ant-col-lg-14, .ant-col-lg-15, .ant-col-lg-16, .ant-col-lg-17, .ant-col-lg-18, .ant-col-lg-19, .ant-col-lg-20, .ant-col-lg-21, .ant-col-lg-22, .ant-col-lg-23, .ant-col-lg-24 
    , .ant-col-xl-4,  .ant-col-xl-1, .ant-col-xl-2, .ant-col-xl-3, .ant-col-xl-4, .ant-col-xl-5, .ant-col-xl-6, .ant-col-xl-7, .ant-col-xl-8, .ant-col-xl-9, .ant-col-xl-10, .ant-col-xl-11, .ant-col-xl-12, .ant-col-xl-13, .ant-col-xl-14, .ant-col-xl-15, .ant-col-xl-16, .ant-col-xl-17, .ant-col-xl-18, .ant-col-xl-19, .ant-col-xl-20, .ant-col-xl-21, .ant-col-xl-22, .ant-col-xl-23, .ant-col-xl-24
    {
        float: right;
    }
    .ant-divider{
        @media only screen and (max-width: 575px) {
                text-align: right!important;
            }
        &:after{
            border-top: 1px solid #cac8c8!important;
             @media only screen and (max-width: 575px) {
                width: 0!important;
            }
        }
        &:before {
            display: none!important;
        }
    }
    .more-btn{
        background: lightgray;
        float: left;
        margin-top: 10px;
        cursor: pointer;
    }
    .ant-card {
        height:300px;
        padding: 70px;
        text-align:center;
        box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
        margin: 0 0 20px 0;
        @media only screen and (max-width: 575px) {
         padding: 10px;
        }
        .no-course {
            width: fit-content;
            margin: 0 auto;
            background: #f5f5f5;
            padding: 10px 40px!important;
            border-radius: 5px;
            flex: inherit;
        }
        .ant-btn {
           color:  #68d9a0;
           border: 2px solid #68d9a0;
           float: none;
           padding: 18px;
           line-height: 5px;
           margin: 20px;
           width: 150px;
           cursor: pointer;
        }
    }
    
    .selected-course {
        .ant-col {
            @media only screen and (max-width: 575px) {
                margin-bottom:20px;
            }
        }
        .ant-card {
            height: 350px;
            padding: 0px;
            border-radius:10px 10px 10px 10px ;
            @media only screen and (max-width: 575px) {
                height: 100%;
            }
        }
        .ant-card-body {
            text-align: right;
            background: white;
            padding: 15px;
            .ant-card-meta-title {
                font-size: 14px;
                font-weight: normal;
            }
        }
        .ant-card-cover img {
            border-radius: 10px 10px 0 0;
            height:100%;
             @media only screen and (max-width: 575px) {
                height: 100%;
                width: 80%;
                margin: 10px auto;
             }
        }
        .ant-card-actions {
            border-radius:  0 0 10px 10px;
            padding: 0 15px;
            li {
                text-align: right;
                span {
                    font-size: 12px;
                }
            }
        }
    }
    
    .course {
        margin:0 0 30px 0!important;
        .ant-card {
            height: 200px;
            padding: 0px;
            @media only screen and (max-width: 575px) {
             height: 100%;
            }
            img {
                width: 100%;
                border-radius: 10px;
                height: 150px;
                cursor: pointer;
                @media only screen and (max-width: 575px) {
                   margin-bottom: 23px;
                   height: 100%;
                 }
                }
            h2{
               font-size: 18px;
               text-align: right;
               cursor: pointer;
            }
            .ant-badge-status-text {
                margin-right: 8px;
                font-size: 12px;
            }
            p {
                text-align: right;
                font-size: 12px;
                margin-bottom: 3px;
            }
            .ant-btn {
                background: #68d9a0;
                border-color: #68d9a0;
                color: white; 
                float: left; 
                margin: 0;   
                line-height: 0px;
                width: auto;
                &:hover {
                  border-color: #c7c7c7;
                  background: white;
                  color: #7d7d7d;
                }
            } 
            .ant-progress{
                margin-top: 10px; 
                .ant-progress-inner,  .ant-progress-bg {
                    border-radius: 5px;
                } 
                .ant-progress-outer {
                    margin-right: 0;
                    padding-right: 0;
                }
                .ant-progress-text {
                  display: none;
                }
                .ant-progress-bg {
                    float: left;
                }
            }    
             .ant-progress-newText{
                   line-height:50px;
             }
    }
    .support {
       float: right;
       font-size: 12px;
        b {
            color: #56b383;
        }
    }
  
`;
export default Style;
