import React, { PureComponent } from "react";
import Style from "./style";
import { DateInput } from "react-hichestan-datetimepicker";
import withDirection from "utils/withDirection";

class DatePicker extends PureComponent {
  constructor(props) {
    super(props);
    const { value, noDefaultValue } = this.props;
    this.state = {
      dateTime:
        value ||
        (noDefaultValue
          ? undefined
          : new Date(new Date().setHours(0, 0, 0, 0))),
      loaded: false,
      inputVisible: false,
      inputValue: "",
    };
  }
  componentDidUpdate(prevProps) {
    const { value: prevValue } = prevProps;
    const { value, loaded, noDefaultValue } = this.props;
    if (prevValue !== value && !loaded) {
      this.setState({
        dateTime:
          value ||
          (noDefaultValue
            ? undefined
            : new Date(new Date().setHours(0, 0, 0, 0))),
        loaded: true,
      });
    }
  }
  onDateTimeChange = e => {
    this.setState({
      dateTime: e.target.value,
    });
    this.triggerOnChange(e.target.value);
  };
  triggerOnChange = newDateTime => {
    const { onChange } = this.props;
    onChange(newDateTime);
  };
  render() {
    const { placeholder } = this.props;
    const { dateTime } = this.state;
    return (
      <Style {...this.props}>
        <DateInput
          placeholder={placeholder}
          value={dateTime}
          onChange={this.onDateTimeChange}
          autoOk={true}
        />
      </Style>
    );
  }
}
export default withDirection(DatePicker);
