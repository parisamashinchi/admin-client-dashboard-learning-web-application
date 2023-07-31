import {
  Select,
  SelectMultiple as StyledSelectMultiple,
  Option,
  OptionMultiple
} from "./style";
import withDirection from "utils/withDirection";

export default withDirection(Select);
const SelectMultiple = withDirection(StyledSelectMultiple);
export { SelectMultiple, Option, OptionMultiple };
