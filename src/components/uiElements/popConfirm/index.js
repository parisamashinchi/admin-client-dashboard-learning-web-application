import { Popconfirm as AntPopConfirm } from "antd";
import PopWrapper from "./style";
import WithDirection from "utils/withDirection";

const PopConfirm = PopWrapper(AntPopConfirm);
const PopConfirmBox = WithDirection(PopConfirm);

export default PopConfirmBox;
