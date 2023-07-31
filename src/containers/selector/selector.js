import React, { Component } from "react";
import StyledSelect, {
  SelectMultiple as StyledMultipleSelect,
  Option,
  OptionMultiple
} from "components/uiElements/select";
import { connect } from "react-redux";
import * as actions from "./actions";
import * as constants from "./constants";
import map from "lodash/map";
import withDirection from "utils/withDirection";

export function createSelector(name, url, renderOption, multiple = false) {
  class Select extends Component {
    componentDidMount() {
      const { getData } = this.props;
      getData(name, url, null);
    }
    onSearch = query => {
      const { getData } = this.props;
      getData(name, url, { query });
    };
    render() {
      const { data } = this.props;
      const renderOptions = () => map(data, option => renderOption(option));
      return (
        <StyledSelect {...this.props} onSearch={this.onSearch}>
          {renderOptions()}
        </StyledSelect>
      );
    }
  }
  class SelectMultiple extends Component {
    componentDidMount() {
      const { getData } = this.props;
      getData(name, url, null);
    }
    onSearch = query => {
      const { getData } = this.props;
      getData(name, url, { query });
    };
    render() {
      const { data } = this.props;
      const renderOptions = () => map(data, option => renderOption(option));
      return (
        <StyledMultipleSelect {...this.props} onSearch={this.onSearch}>
          {renderOptions()}
        </StyledMultipleSelect>
      );
    }
  }
  const mapDispatchToProps = {
    getData: actions.getDataRequest
  };
  const mapStateToProps = state => ({
    loading: state.getIn([constants.SELECTOR, `${name}_loading`], false),
    failed: state.getIn([constants.SELECTOR, `${name}_failed`], false),
    data: state.getIn([constants.SELECTOR, name], [])
  });
  return multiple
    ? connect(
        mapStateToProps,
        mapDispatchToProps
      )(withDirection(SelectMultiple))
    : connect(
        mapStateToProps,
        mapDispatchToProps
      )(withDirection(Select));
}
export { Option, OptionMultiple };
