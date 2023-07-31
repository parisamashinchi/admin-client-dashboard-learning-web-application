import styled from "styled-components";
import "antd/lib/spin/style";
import media from "theme/MediaQuery";

export const Header = styled.div`
  margin-bottom: 30px;
  .toolbar {
    display: flex;
    flex-flow: row wrap;
  }
  .toolbar-left {
    display: flex;
    justify-content: flex-start;
  }
  .toolbar-right {
    display: flex;
    justify-content: flex-end;
    .search-input {
      max-width: 250px;
    }
  }
  .second-button {
    margin-right: 10px
  }
  ${media.largePhone`
  .toolbar-right {.search-input {max-width: 100%;} order: 1;}
  .toolbar-left {order: 2; margin-top: 20px;}
  `};
`;
