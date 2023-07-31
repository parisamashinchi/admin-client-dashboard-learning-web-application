import React, { PureComponent } from "react";
import Style from "./style";
import PropTypes from "prop-types";
import map from "lodash/map";
import { Row, Col } from "antd";
import IntlMessages from "utils/intlMessages";
import Button from "components/uiElements/button";
import basicStyle from "theme/style";
import Icon from "antd/lib/icon";

const { rowStyle } = basicStyle;

export default class Repeater extends PureComponent {
  constructor(props) {
    super(props);
    const { initialValue } = props;
    this.keyIndex = initialValue
      ? initialValue.length > 0
        ? initialValue.length
        : 1
      : 1;
    this.state = {
      keys: [...Array(this.keyIndex).keys()],
      loaded: false,
    };
  }
  componentDidUpdate(prevProps) {
    const { initialValue: prevInitialValue } = prevProps;
    const { initialValue } = this.props;
    const { loaded } = this.state;
    if (
      prevInitialValue !== initialValue &&
      initialValue &&
      initialValue.length > 0 &&
      !loaded
    ) {
      this.keyIndex = initialValue.length > 0 ? initialValue.length : 1;
      this.setState({
        keys: [...Array(this.keyIndex).keys()],
        loaded: true,
      });
    }
  }
  add = () => {
    let { keys } = this.state;
    keys = [...keys, this.keyIndex++];
    this.setState({ keys });
  };
  remove = k => {
    let { keys } = this.state;
    keys = keys.filter(key => key !== k);
    this.setState({ keys });
  };
  render() {
    const {
      loading,
      addable,
      renderAdd,
      initialValue,
      children,
      onKeysChange,
    } = this.props;
    const { keys } = this.state;
    onKeysChange(keys);
    const renderFarm = map(keys, key =>
      children(key, initialValue[key], this.remove)
    );
    return (
      <Style>
        <Row style={rowStyle}>
          <Col span={24}>{renderFarm}</Col>
          <Col span={24}>
            {addable ? (
              renderAdd ? (
                renderAdd(this.add)
              ) : (
                <Button
                  dark
                  loading={loading}
                  style={{ marginTop: 30 }}
                  onClick={e => (e.preventDefault(), this.add())}
                  type="primary"
                >
                  <Icon type="plus" />
                  &nbsp;
                  <IntlMessages id="form.repeate.add" />
                </Button>
              )
            ) : null}
          </Col>
        </Row>
      </Style>
    );
  }
}
Repeater.propTypes = {
  renderItem: PropTypes.func.isRequired,
  renderAdd: PropTypes.func,
  initialValue: PropTypes.array.isRequired,
};
Repeater.defaultProps = {
  initialValue: [],
  addable: true,
};
