import { createGlobalStyle } from "styled-components";
export const themeVar = {
  border: "4px",
  borderCircle: "50%",
  borderNone: 0,
};

export const palette = {
  white: "#ffffff",
  black: "#000000",
  blue: "#04a9f5",
  lightGrey: "#f4f7fa",
  lightGreySecondary: "#ced4da",
  lightGreyTertiary: "#b6bfc8",
  lightGreyQuaternary: "#d1d1d1",
  borderGrey: "#d9d9d9",
  grey: "#6c757d",
  darkGrey: "#748892",
  darkGreySecondary: "#62747d",
  darkGreyTertiary: "#5d6e76",
  red: "#f44236",
  green: "#00cc66",
  orange: "#faad14",
};

const GlobalStyle = createGlobalStyle`
@font-face {
  font-family: IRANSans;
  src: url('/assets/fonts/iransans/eot/IRANSansWeb.eot');
  src: url('/assets/fonts/iransans/eot/IRANSansWeb.eot?#iefix') format('embedded-opentype'),
       url('/assets/fonts/iransans/woff2/IRANSansWeb.woff2') format('woff2'),
       url('/assets/fonts/iransans/woff/IRANSansWeb.woff') format('woff'),
       url('/assets/fonts/iransans/ttf/IRANSansWeb.ttf') format('truetype');
  font-weight: normal;
}

@font-face {
  font-family: IRANSans;
  src: url('/assets/fonts/iransans/eot/IRANSansWeb_Bold.eot');
  src: url('/assets/fonts/iransans/eot/IRANSansWeb_Bold.eot?#iefix') format('embedded-opentype'),
       url('/assets/fonts/iransans/woff2/IRANSansWeb_Bold.woff2') format('woff2'),
       url('/assets/fonts/iransans/woff/IRANSansWeb_Bold.woff') format('woff'),
       url('/assets/fonts/iransans/ttf/IRANSansWeb_Bold.ttf') format('truetype');
  font-weight: bold;
}

@font-face {
  font-family: IRANSans;
  src: url('/assets/fonts/iransans/eot/IRANSansWeb_Light.eot');
  src: url('/assets/fonts/iransans/eot/IRANSansWeb_Light.eot?#iefix') format('embedded-opentype'),
       url('/assets/fonts/iransans/woff2/IRANSansWeb_Light.woff2') format('woff2'),
       url('/assets/fonts/iransans/woff/IRANSansWeb_Light.woff') format('woff'),
       url('/assets/fonts/iransans/ttf/IRANSansWeb_Light.ttf') format('truetype');
  font-weight: 300;
}

@font-face {
  font-family: IRANSans;
  src: url('/assets/fonts/iransans/eot/IRANSansWeb_Medium.eot');
  src: url('/assets/fonts/iransans/eot/IRANSansWeb_Medium.eot?#iefix') format('embedded-opentype'),
       url('/assets/fonts/iransans/woff2/IRANSansWeb_Medium.woff2') format('woff2'),
       url('/assets/fonts/iransans/woff/IRANSansWeb_Medium.woff') format('woff'),
       url('/assets/fonts/iransans/ttf/IRANSansWeb_Medium.ttf') format('truetype');
  font-weight: 500;
}

@font-face {
  font-family: IRANSans;
  src: url('/assets/fonts/iransans/eot/IRANSansWeb_UltraLight.eot');
  src: url('/assets/fonts/iransans/eot/IRANSansWeb_UltraLight.eot?#iefix') format('embedded-opentype'),
       url('/assets/fonts/iransans/woff2/IRANSansWeb_UltraLight.woff2') format('woff2'),
       url('/assets/fonts/iransans/woff/IRANSansWeb_UltraLight.woff') format('woff'),
       url('/assets/fonts/iransans/ttf/IRANSansWeb_UltraLight.ttf') format('truetype');
  font-weight: 100;
}

@font-face {
  font-family: IRANSans;
  src: url('/assets/fonts/iransans/eot/IRANSansWeb_Black.eot');
  src: url('/assets/fonts/iransans/eot/IRANSansWeb_Black.eot?#iefix') format('embedded-opentype'),
       url('/assets/fonts/iransans/woff2/IRANSansWeb_Black.woff2') format('woff2'),
       url('/assets/fonts/iransans/woff/IRANSansWeb_Black.woff') format('woff'),
       url('/assets/fonts/iransans/ttf/IRANSansWeb_Black.ttf') format('truetype');
  font-weight: 900;
}

  @font-face {
  font-family: FontAwesome;
  src: url('/static/fonts/font-awesome/eot/fa-regular-400.eot');
  src: url('/static/fonts/font-awesome/eot/fa-regular-400.eot?#iefix') format('embedded-opentype'),
       url('/static/fonts/font-awesome/woff2/fa-regular-400.woff2') format('woff2'),
       url('/static/fonts/font-awesome/woff/fa-regular-400.woff') format('woff'),
       url('/static/fonts/font-awesome/ttf/fa-regular-400.ttf') format('truetype');
  font-weight: normal;
}
@font-face {
  font-family: FontAwesomeSolid;
  src: url('/static/fonts/font-awesome/eot/fa-solid-900.eot');
  src: url('/static/fonts/font-awesome/eot/fa-solid-900.eot?#iefix') format('embedded-opentype'),
       url('/static/fonts/font-awesome/woff2/fa-solid-900.woff2') format('woff2'),
       url('/static/fonts/font-awesome/woff/fa-solid-900.woff') format('woff'),
       url('/static/fonts/font-awesome/ttf/fa-solid-900.ttf') format('truetype');
  font-weight: 900;
  }

  body {
    font-family: IRANSans !important;
    font-weight: normal;
    font-size: 14px;
  }

  h1, h2, h3, h4, h5, h6 {
  font-family: IRANSans;
  font-weight: 300 !important;
}

input[type=number]::-webkit-inner-spin-button, 
input[type=number]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

  /*Common Anims*/
   .anim-fade-in {
   animation-name: fadeIn;
   animation-duration: 0.5s;
 }

  @keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
      opacity: 1;
    }
}

 @keyframes spinner {
    to {
        transform: rotate(360deg);
    }
}


/*---------------------------
|| Ant Dropdown
-----------------------------*/
 .ant-select-dropdown {
    .ant-select-dropdown-menu {
      padding: 0 !important;
    }
  }

  .ant-empty {
    height: 10px;
    & > div {
      display: none;
    }
    & > p {
      display: none;
    }
  }

  /*---------------------------
|| Ant Message
-----------------------------*/
.ant-message-custom-content {
  display: flex;
  align-items: "center";
  span {
    margin: 0 5px;
  }
  .anticon {
    margin: 0 5px;
  }
}


  /*---------------------------
|| Ant Popover
-----------------------------*/
.ant-popover-message {
  display: flex;
  align-items: center;
}
.ant-popover-buttons {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.input-wrapper {
    margin-top: 30px;
    &.small {
      max-width: 300px;
    }
    &.large {
      max-width: 400px;
    }
    &:first-child {
      margin-top: 0px;
    }
  }

 /*---------------------------
|| HighCharts
-----------------------------*/ 

.highcharts-credits {
  display: none;
}
`;
export default GlobalStyle;
