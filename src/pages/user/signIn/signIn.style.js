import styled from "styled-components";
import back from "../../../static/images/login-back.jpg"

const Style = styled.div`
    .signUp-back{
        background-image: url(${back});
        background-size: cover;
        height:100vh;
     
        .back-btn{
            float: left;
            border: none;
            background: none;
            color: white;
            margin: 10px;
            .anticon {
                margin-right: 10px;
            }
        }
     }
    .ant-card {
        width: 500px;
        border-radius: 10px;
        height: auto;
        margin: 100px auto;
        @media only screen and (max-width: 500px) {
             width: 300px;
            }
        .ant-card-body {
            padding 0; 
            .ant-tabs-content {
                padding: 24px
            }
            .ant-tabs-nav-container-scrolling {
                padding: 0;
            }
            .ant-tabs-tab-prev ,.ant-tabs-tab-next {
                display: none;
            } 
            .ant-tabs-nav {
                width: 100%;
                 .ant-tabs-nav.div {
                    border-radius: 10px 10px 0 0;
                 }
                .ant-tabs-tab {
                    border: none;
                    background: #f0f0f0;
                    width:50%;
                    text-align:center;
                    margin-right:0;
                     border-radius: 10px 10px 0 0;
                }
                .ant-tabs-tab-active {
                    color: rgba(0, 0, 0, 0.65);
                    background: white;
                }
            }
            h2 {
                font-size: 18px;
                font-weight: bold!important;
                text-align: center;
                color: #7a7a7a;
            } 
            .ant-input {
                background-color: #f7f7f7; 
                height: 40px;   
            } 
            .ant-btn {
                text-align: center;
                background-color: #59b283;
                border-color: #59b283;
                width: 200px;
                height: 40px
            }
            .ant-form-item {
                margin: 30px;
            }
            .ant-form-explain {
                text-align: right;
                margin-top: 5px;
            }
            .ant-form-item-control {
                text-align: center;
            }
            .ant-form-item-with-help {
                margin-bottom: 10px;
            }
    }    
    .ant-input-group {
        direction: ltr;
        .ant-input-group-addon {
            background-color: white
        }
       .ant-select-arrow {
           right: 5px;
        }
    }
   .ant-statistic {
        margin: 30px;
    }
    .counter{
        text-align: center;
    }
`;
export default Style;
