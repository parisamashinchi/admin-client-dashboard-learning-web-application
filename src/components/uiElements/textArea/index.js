import React, { Component } from "react";
import TextArea from "./style";
import { connect } from "react-redux";
import isPersianOrASCII from "utils/getters/isPersianOrASCII";
import isEmpty from "lodash/isEmpty";
import withDirection from "utils/withDirection";
import RichTextEditor from 'react-rte';

export default withDirection(TextArea);

// class TextAreaWrapper extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       value: RichTextEditor.createEmptyValue(),
//       hasValue: false,
//       isPersian: false
//     };
//   }
//   onChange = (value) => {
//     this.setState({value});
//     if (this.props.onChange) {
//       this.props.onChange(
//           value.toString('html')
//       );
//     }
//   };
//   render() {
//     const { value } = this.state;
//     return (
//         <RichTextEditor
//             value={value}
//             onChange={this.onChange}
//         />
//     );
//   }
// }

// const mapStateToProps = state => ({
//   rtlLayout: state.getIn(["PANEL", "rtlLayout"])
// });
// export default connect(mapStateToProps)(TextAreaWrapper);
