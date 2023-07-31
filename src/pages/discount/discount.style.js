import styled from "styled-components";

const Style = styled.div`
  .form-col {
    float: right !important;
  }
  .drag {
  background-color: transparent !important;
  display: flex;
  width: 100%;
  flex-direction: column;
}

.drag-icon {
  width: 30px;
  margin-right: 1px;
  height: 38px;
  background-color: #ffffff;
  color: #ff7c00;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  margin: 0 1px 0 10px;
  border-radius: 4px;
}

.drag-list {
  display: flex;
  align-content: center;
  align-items: center;
  height: 40px;
  padding: 0;
  border-radius: 3px;
  margin-bottom: 2px;
  background-color: #cccccc;
}

.drag-hint {
  font-size: 12px;
  margin: 0;
  padding: 7px;
  line-height: 11px;
  margin-bottom: 5px;
  font-weight: 300;
  border-bottom: 1px solid #ff7c00;
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
.ant-select-selection__rendered {
  line-height: 2.5 !important;
}
.ant-btn-dashed {
    margin: 20px 0;
    }
`;
export default Style;
