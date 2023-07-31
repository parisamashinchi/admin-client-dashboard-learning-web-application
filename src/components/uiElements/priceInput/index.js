import React, { PureComponent, Fragment } from "react";
import Style from "./style";
import Input from "../textInput";
import PersianNumber from "components/PersianNumber";
import { wordifyRials } from "utils/numberToWord";

class PriceInput extends PureComponent {
  triggerOnChange = e => {
    const { onChange } = this.props;
    onChange(e.target.value);
  };
  render() {
    const { value } = this.props;
    return (
      <Style>
        <Input
          type="number"
          min="0"
          {...this.props}
          onChange={this.triggerOnChange}
        />
        <div className="hint">
          {value ? (
            <Fragment>
              <PersianNumber moneySign comma>
                {value}
              </PersianNumber>
              {value > 0 ? `/${wordifyRials(value)}` : null}
            </Fragment>
          ) : null}
        </div>
      </Style>
    );
  }
}
export default PriceInput;
