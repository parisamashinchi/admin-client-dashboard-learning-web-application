import React, { Component } from "react";
import FormItem from "./style";
import { connect } from "react-redux";
import * as panelContants from "utils/globalRedux/panel/constants";

class FormItemWrapper extends Component {
  render() {
    return <FormItem {...this.props} />;
  }
}
const mapStateToProps = state => ({
  rtlLayout: state.getIn([panelContants.PANEL, "rtlLayout"])
});
export default connect(mapStateToProps)(FormItemWrapper);
