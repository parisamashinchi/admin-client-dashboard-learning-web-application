import styled from "styled-components";
import AntTable from "antd/lib/table";
import { palette } from "theme/injectGlobal";
import "antd/lib/spin/style";
import withDirection from "utils/withDirection";

const Table = styled(AntTable)`
  overflow-x: auto;
  .ant-table-body > table {
    width: 100%;
    table-layout: auto;
  }
  thead {
    border-top: 1px solid ${palette.lightGrey};
    & > tr {
      display: table-row;
      border-bottom: 1px solid #eaeaea;
    }
    tr > th {
      padding: 17px 12px;
      font-weight: 400;
      font-size: 14px;
      min-width: 178px;
    }
  }
  tbody {
    & > tr {
      display: table-row;
      background-color: transparent;
      border-bottom: 1px solid #eaeaea;
      &:last-child {
        border-bottom: 1px solid transparent;
      }
      &:nth-child(odd) {
        background-color: rgba(4, 169, 245, 0.05);
      }
      &:hover {
        background-color: rgba(4, 169, 245, 0.05);
        & > td {
          color: ${palette.black};
        }
      }
    }
    & > tr > td {
      padding: 17px 12px;
      font-weight: 300;
      font-size: 14px;
      min-width: 178px;
    }
  }
  .ant-table-placeholder {
    min-height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const WrappedTableWithPaginationStyle = styled(Table)`
  .ant-pagination {
    position: relative;
    list-style: none;
    display: flex;
    flex-direction: row-reverse;
    padding: 0;
    margin: 0;
    margin-top: 20px;
    color: ${palette.blue};
    font-size: 14px;
    .ant-pagination-total-text {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      color: ${palette.grey} !important;
      ${props => (props["data-rtl"] ? "right: 0;" : "left: 0;")};
    }
    .ant-pagination-disabled {
      color: ${palette.grey} !important;
    }
    .ant-pagination-prev {
      order: 10;
      display: flex;
      border: 1px solid #dee2e6 !important;
      border-radius: ${props =>
        props["data-rtl"] ? "0 4px 4px 0" : "4px 0 0 4px"} !important;
      a {
        padding: 7px 15px;
      }
    }
    .ant-pagination-next {
      order: 1;
      display: flex;
      border: 1px solid #dee2e6 !important;
      border-radius: ${props =>
        props["data-rtl"] ? "4px 0 0 4px" : "0 4px 4px 0"} !important;
      a {
        padding: 7px 15px;
      }
    }
    .ant-pagination-item {
      order: 2;
      display: flex;
      border: 1px solid #dee2e6 !important;
      color: ${palette.blue};
      &.ant-pagination-item-active {
        color: ${palette.white};
        background-color: ${palette.blue};
        border-color: ${palette.blue} !important;
      }
      a {
        padding: 7px 15px;
      }
      &:nth-child(1) {
        order: 9;
      }
      &:nth-child(2) {
        order: 8;
      }
      &:nth-child(3) {
        order: 7;
      }
      &:nth-child(4) {
        order: 6;
      }
      &:nth-child(5) {
        order: 5;
      }
      &:nth-child(6) {
        order: 4;
      }
      &:nth-child(7) {
        order: 3;
      }
      &:nth-child(8) {
        order: 2;
      }
      &:nth-child(9) {
        order: 1;
      }
    }
  }
`;
const WrappedTableWithSpinStyle = styled(WrappedTableWithPaginationStyle)`
  .ant-spin-spinning {
    opacity: 1;
  }
  .ant-spin-nested-loading > div > .ant-spin {
    max-height: none;
    .ant-spin-dot i {
      color: ${palette.blue};
    }
  }
`;

export default withDirection(WrappedTableWithSpinStyle);
