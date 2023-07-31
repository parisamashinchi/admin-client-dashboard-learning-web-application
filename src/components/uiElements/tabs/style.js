import styled from "styled-components";
import { Tabs as AntTabs } from "antd";
import withDirection from "utils/withDirection";

const { TabPane: AntTabPane } = AntTabs;

const Tabs = withDirection(
  styled(AntTabs).attrs(props => ({
    tabPosition: props["data-rtl"] ? "right" : "left",
  }))``
);
const TabPane = styled(AntTabPane)``;

export { Tabs, TabPane };
