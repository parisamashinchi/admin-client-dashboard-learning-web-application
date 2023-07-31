import styled from "styled-components";
import { palette, themeVar } from "theme/injectGlobal";

const Style = styled.div`
  .date-input-with-dialog-input {
    height: auto !important;
    padding: 10px 20px !important;
    background-color: ${palette.lightGrey} !important;
    line-height: 1.5 !important;
    border: 1px solid ${palette.borderGrey} !important;
    border-radius: ${themeVar.border};
    transition: border 0.3s ease, box-shadow 0.3s ease !important;
    &:hover {
      border: 1px solid ${palette.blue} !important;
    }
    &:focus {
      border-color: ${palette.blue};
      box-shadow: 0 0 0 2px rgba(4, 169, 245, 0.2);
    }
  }

  .date-input-with-dialog-input {
    &::placeholder {
      /* Chrome, Firefox, Opera, Safari 10.1+ */
      color: ${palette.lightGreyTertiary};
      opacity: 1; /* Firefox */
    }

    &:-ms-input-placeholder {
      /* Internet Explorer 10-11 */
      color: ${palette.lightGreyTertiary};
    }

    &::-ms-input-placeholder {
      /* Microsoft Edge */
      color: ${palette.lightGreyTertiary};
    }
  }
  .date-input-with-dialog-empty {
    display: none;
  }
  .date-input-with-dialog-calendar {
    ${props =>
      props["data-rtl"]
        ? "left: 10px !important; right: auto !important"
        : "right: 10px !important; left: auto !important"};
    svg {
      fill: ${palette.grey};
    }
  }
  .date-input-with-dialog-input-buttons {
    top: 50% !important;
    transform: translateY(-50%) !important;
    background: none !important;
    border: none !important;
  }

  .JDatePicker {
    & > div {
      padding-bottom: 10px;
    }
    & > div:nth-child(1) {
      & > div:nth-child(1) {
        &::after {
          ${props =>
            props["data-rtl"] ? 'content: "\\e847"' : 'content: "\\e849"'}
        }
      }
      & > div:nth-child(2) {
        &:after {
          ${props =>
            props["data-rtl"] ? 'content: "\\e844"' : 'content: "\\e843"'}
        }
      }
      & > div:nth-child(4) {
        &:after {
          ${props =>
            props["data-rtl"] ? 'content: "\\e843"' : 'content: "\\e844"'}
        }
      }
      & > div:nth-child(5) {
        &::after {
          ${props =>
            props["data-rtl"] ? 'content: "\\e849"' : 'content: "\\e847"'}
        }
      }
    }
    & > div:nth-child(2) {
      margin-bottom: 10px;
      border-bottom: 1px solid ${palette.borderGrey};
      & > div:nth-child(1) {
        &:after {
          ${props =>
            props["data-rtl"] ? 'content: "\\e844"' : 'content: "\\e843"'}
        }
      }
      & > div:nth-child(3) {
        &:after {
          ${props =>
            props["data-rtl"] ? 'content: "\\e843"' : 'content: "\\e844"'}
        }
      }
    }
    .JC-Nav {
      position: relative;
      cursor: pointer;
      color: transparent;
      &:after {
        font-family: "feather";
        color: ${palette.grey};
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
    .JC-days {
      background: none !important;
    }
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
    .today {
      border: 1px solid ${palette.blue};
      border-radius: ${themeVar.border};
      color: ${palette.blue} !important;
    }
    .selected {
      background-color: ${palette.blue};
      border-radius: ${themeVar.border};
      color: ${palette.white} !important;
    }

    & > div:last-child {
      display: none !important;
      margin-top: 10px;
      border-top: 1px solid ${palette.borderGrey};
      display: flex;
      justify-content: center;
      align-items: center;
      button:first-child {
      }
      button:last-child {
        display: none;
      }
    }
  }
`;
export default Style;
