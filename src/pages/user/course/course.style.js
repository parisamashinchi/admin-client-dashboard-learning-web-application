import styled from "styled-components";
import { palette } from "theme/injectGlobal";

const Style = styled.div`
    .ant-col-1, .ant-col-2, .ant-col-3, .ant-col-4, .ant-col-5, .ant-col-6, .ant-col-7, .ant-col-8, .ant-col-9, .ant-col-10, .ant-col-11, .ant-col-12, .ant-col-13, .ant-col-14, .ant-col-15, .ant-col-16, .ant-col-17, .ant-col-18, .ant-col-19, .ant-col-20, .ant-col-21, .ant-col-22, .ant-col-23, .ant-col-24,
    .ant-col-xl-1, .ant-col-xl-2, .ant-col-xl-3, .ant-col-xl-4, .ant-col-xl-5, .ant-col-xl-6, .ant-col-xl-7, .ant-col-xl-8, .ant-col-xl-9, .ant-col-xl-10, .ant-col-xl-11, .ant-col-xl-12, .ant-col-xl-13, .ant-col-xl-14, .ant-col-xl-15, .ant-col-xl-16, .ant-col-xl-17, .ant-col-xl-18, .ant-col-xl-19, .ant-col-xl-20, .ant-col-xl-21, .ant-col-xl-22, .ant-col-xl-23, .ant-col-xl-24
    {
        float: right;
    }
    .ant-divider{
        margin: 16px 50px;
        &:after{
            border-top: 1px solid #cac8c8!important;
        }
        &:before {
            display: none!important;
        }
    }
    h4 {
        padding-top: 65px
    }
    .more-btn{
        background: transparent;
        border-radius: 10px;
        float: left;
        margin-top: 10px;
        cursor: pointer;
    }
    .ant-btn[disabled] {
        color: rgba(0, 0, 0, 0.25)!important;
        background-color: #f5f5f5!important;
        border-color: #d9d9d9!important;
        text-shadow: none;
        -webkit-box-shadow: none;
        box-shadow: none;
        cursor: not-allowed!important;
    }
    .ant-card {
        height:500px;
        padding: 70px;
        text-align:center;
        box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
        margin: 0 0 20px 0;
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
           padding: 15px;
           line-height: 5px;
           margin: 20px;
           cursor: pointer;
        }
    }
    .course {
        margin: 0 0 30px 0!important;
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
                     width: 100%;
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
                margin-right: 10px;
            }
        
            .btn-recharge {    
                background: #68d9a0;
                border-color: #68d9a0;
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
            .score {   
                border-bottom: 2px solid #68d9a0;
                font-weight: bold;
                right: 30%;
                position: relative;
                @media only screen and (max-width: 575px) {
                  right: 0;
                }
                .anticon {
                    color: #68d9a0;
                }
            }
        }
    }
    .course-detail {
        height: auto;
         padding: 0;
        .ant-card-body{
            padding: 0;
        }
        img {
            width:100%;
        }
         h4 {
            text-align: right;
            padding: 20px
         }
         a{
            line-height: 50px;
         }
    } 
    .exam { 
        .internal-card{
            padding: 50px;
        }
        .exam-external-card {
            margin: 0;
            box-shadow: none;
            padding: 0;
            border: none;
            height: auto;
        }
         .exam-internal-card {
            padding: 20px 0;
            margin: 20px 50px 50px 50px;
            height: 200px;
            text-align: right;
            .number-icon {
                border: 2px solid #d9d9d9;
                padding: 0px 7px;
                margin-left: 10px;
                font-weight: bold;
                font-size: 12px;
                margin-right: 18px;
                float: left;
            }
        }
        h4 {
            font-size: 20px;
            margin-bottom: 30px;
            white-space: pre-line;
            @media only screen and (max-width: 575px) {
               font-size: 15px;
            }
        }
        p {
            text-align: left;
            direction: ltr;
        }
        
         .ant-btn {
            background: #68d9a0;
            border-color: #68d9a0;
            color: white;
            margin:40px 0 0 0;
        }
        .ant-radio {
            float: left;
        }
        .ant-radio-group {
            width: 100%;
             text-align: left;
         }
           .ant-radio-wrapper {
            padding:0 20px;
            margin-right: 0;
         }
          .ant-radio-wrapper-checked {
                background: #69d9a12e;
         }
         
        .ant-radio-checked .ant-radio-inner {
             border-color: #69d9a1;
          }
         .ant-radio-inner {
               border-radius: 0;
               width: 15px;
               height: 15px;
               &:after {
                background-color: #69d9a1; 
                top: 0px;
                left: 0px;
                border-radius: 0;
                width: 15px;
               height: 15px;
               }
          }
          .correct .ant-radio-inner{
             background-color: #69d9a1;
              &:after{ 
                position: absolute;
                display: table;
                border: 2px solid #fff;
                border-top: 0;
                border-left: 0;
                transform: rotate(45deg) scale(1) translate(-50%,-50%);
                opacity: 1;
                transition: all .2s cubic-bezier(.12,.4,.29,1.46) .1s;
                content: " ";
                background-color: transparent;
                width: 7px;
                height: 15px;
                top: 5px;
              } 
          }
          .incorrect .ant-radio-inner{
             
             &:after{ 
               background-color: red;
             }
          }
          .exam-btn {
            margin: 0 0 50px 50px;
            float: left;
          }
          .exam-score {
            margin: 0 50px 0;
            font-size: 20px;
            font-weight: bold;
            float: right;
            padding: 5px;
          }
          .counter {
            text-align: left;
            margin: 0 0 0 50px;
          }
    }
    .upload-line {
        height: 120px;
        padding: 20px 50px;
        text-align: right;
        border-top: 0;
        border: 1px solid #e8e8e8;
        margin: 0 100px 100px 100px;
        border-radius: 0 0 5px 5px;
         @media only screen and (max-width: 575px) {
            margin: 10px;
            padding: 20px;
            height: 160px;
         }
        .choose-btn {
            margin: 0;
            background: #fafafa;
            color: black;
            color: rgba(0, 0, 0, 0.65);
            border-color: #e8e8e8;
            line-height: -2px;
            padding: 8px;
            margin: 0!important;
        }
        .ant-btn {
            margin: 10px 0;
            float: left;
        }
        p {
            margin: 5px;
        }
        .dzu-dropzone{
            width: 100px ;
            min-height: 30px;
            margin: 0;
            overflow: hidden;
            .dzu-inputLabel{
                font-size: 14px;
                font-family: inherit;
                margin: 0;
                background: #fafafa;
                color: rgba(0, 0, 0, 0.65);
                border-color: #e8e8e8;
                padding: 8px;
                margin: 0!important;
            }
        }
    }   
    .internal-card{
        margin: 100px 100px 100px 100px;
        border-radius: 5px 5px 0 0;
        background: #fafafa;
        text-align: right;
        height: auto;
        border-bottom:0;
        text-align: justify;
        @media only screen and (max-width: 575px) {
           margin: 10px;
           padding: 10px!important;
        }
        h3, .question-num{
            color: #747474;
            font-weight: 400!important;
            font-size: 18px;
            margin-bottom: 15px;
            text-align: right;
        }
        h2 {
            margin-bottom: 15px;
            font-size: 23px;
            padding: 0 0 0 20px;
             @media only screen and (max-width: 575px) {
               font-size: 17px;
            }
        }
        .ant-divider-vertical {
            margin: 0px;
            height: 150px;
        }
        p , a{
            font-size: 16px;
            padding: 0 0 0 20px;
             @media only screen and (max-width: 575px) {
               font-size: 15px;
            
            }
        }
         a{
             @media only screen and (max-width: 575px) {
              font-size: 15px;
               overflow-x: scroll;
               width: 100%;
               display: block;
            }
        }
        .ant-btn {
            background: #68d9a0;
            border-color: #68d9a0;
            color: white;
            margin:40px 0 0 0;
        }
    }
    .empty-line{
        border-top: 0;
        height: 50px;
        border: 1px solid #e8e8e8;
        margin: 0 100px 100px 100px;
        border-radius: 0 0 5px 5px;
    }
    .ant-divider-inner-text {
        margin-right: 20px;
        @media only screen and (max-width: 575px) {
          margin-right: 0px;
         }
    }
  }
  .video-react-control-bar {
    direction: ltr;
  }
    .completed-btn {
        border:none;
        background:none;
        display:block;
        &:hover , &:focus{
         outline:none;,
        }
        
    }
    .certificate-btn {
        background-color: deepskyblue!important;
        border-color: deepskyblue!important;
    }
    .download-btn {
            background: transparent!important;
            border-color: transparent!important;
            color: rgb(0, 123, 255)!important;
            margin: 0!important;
            padding: 0!important;
            font-size: 17px;
            i {
                margin-left:5px;
                font-size: 20px;
              }
    }
   .reading{
        padding: 20px;
        .reading-desc{
            font-size: 17px;
            margin-left: 20px;
        }
   }  
   .m-20 {
      margin: 20px!important;
   }  
   .video-responsive{
    overflow:hidden;
    padding-bottom:56.25%;
    position:relative;
    height:0;
    margin-bottom: 20px;
}
.video-responsive iframe{
    left:0;
    top:0;
    height:100%;
    width:100%;
    position:absolute;
}
.disappear {
    display : none
}
.vjs-big-play-button {
    top: 47%!important;
    left: 47%!important;
    width: 2.5em!important;
    border: none!important;
    background-color: #68d9a0!important;
     @media only screen and (max-width: 575px) {
        top: 40%!important;
        left: 40%!important;
     }
}
    .next-btn {
        text-align: right;
        display:inline-block;
        .ant-btn {
            color: white ;
            background: black
        }
    }
    .previous-btn{
        float: left;
        display:inline-block;
        .ant-btn {
            color: white ;
            background: black
        }
    }

  & .vjs-seek-button {
    font-family: 'Material Icons';
    cursor: pointer;
    &.skip-back.skip-10 .vjs-icon-placeholder::before {
      content: '\\e059';
    } 
    &.skip-forward.skip-10 .vjs-icon-placeholder::before {
      content: '\\e056';
    }
  }

  .video-js .vjs-current-time, .vjs-no-flex .vjs-current-time , .vjs-time-divider {
    display: block;
    }
    .video-js .vjs-duration, .vjs-no-flex .vjs-duration {
     display: block;
    }
  
     .support {
       float: right;
       font-size: 12px;
        b {
            color: #56b383;
        }
    }
    .question-img {
        width: 600px!important;
        height: auto;
        position: relative;
          @media only screen and (max-width: 575px) {
            width: 100%!important;
            margin-top: 20px;
        }
    }
    .card-with-img {
        height: auto!important;
        @media only screen and (max-width: 575px) {
           height:  auto!important;
        } 
    }
    .ant-checkbox-wrapper {
        margin-top:10px;
    }
 
    .support-btn {
        float: right;
        background: #68d9a0;
        border-color: #68d9a0;
        color: white;
        border-radius: 4px;
        margin-bottom: 20px;
        padding: 18px;
        line-height: 5px;
    }
    .return {
        float: left;
        color: blue;
        &:after {
         content: "\\e843";
         font-family: "feather";
         font-size: 15px;
         }
    }
   
`;
export default Style;
