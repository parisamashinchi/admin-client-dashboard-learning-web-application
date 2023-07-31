import styled from "styled-components";
import { Descriptions as AntDesriptions } from "antd";
import withDirection from "utils/withDirection";

const Descriptions = styled(AntDesriptions)``;

const DescriptionsItem = withDirection(styled(AntDesriptions.Item)``);

export default withDirection(Descriptions);

export { DescriptionsItem };
