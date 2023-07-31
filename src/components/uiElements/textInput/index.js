import React, { Component } from "react";
import Input from "./style";
import { connect } from "react-redux";
import isPersianOrASCII from "utils/getters/isPersianOrASCII";
import isEmpty from "lodash/isEmpty";
import withDirection from "utils/withDirection";

export default withDirection(Input);

// class InputWrapper extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       value: "",
//       hasValue: false,
//       isPersian: false
//     };
//   }
//   checkInput = e => {
//     const { value } = e.target;
//     this.setState({
//       value
//     });
//   };
//   render() {
//     const { value } = this.state;
//     return <Input {...this.props} hasValue={!isEmpty(value)} />;
//   }
// }
// const mapStateToProps = state => ({
//   rtlLayout: state.getIn(["PANEL", "rtlLayout"])
// });
// export default connect(mapStateToProps)(InputWrapper);
