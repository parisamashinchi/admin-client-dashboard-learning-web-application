import React, { PureComponent } from "react";
import { toJS } from "hoc/toJsHoc";
import AntForm from "antd/lib/form";
import { connect } from "react-redux";
import isFunction from "lodash/isFunction";
import * as actions from "./actions";
import * as constants from "./constants";
import { Card } from "react-bootstrap";
import { Row, Col } from "antd";
import { animations } from "react-animation";

export function createForm({
  name,
  url,
  title,
  id = -1,
  redirectUrl,
  doneCallback,
  failCallback,
}) {
  class Form extends PureComponent {
    constructor(props) {
      super(props);
        this.state = {
        edit: id !== -1,
      };
    }
    componentDidMount() {
      const { edit } = this.state;
      if (edit) {
        const { getRequest } = this.props;
        getRequest(name, url, id);
      }
    }
    componentWillUnmount() {
      const { resetState } = this.props;
      resetState(name);
    }
    handleSubmit = e => {
      const { addRequest, editRequest, mutateFields, extraData } = this.props;
      const { edit } = this.state;
      e && e.preventDefault();
      this.props.form.validateFields(async (err, values) => {
        if (mutateFields) {
          values = mutateFields(values);
        }
        if (!err) {
          if (edit) {
            editRequest(
              name,
              url,
              redirectUrl,
              id,
              {...values, ...extraData},
              doneCallback,
              failCallback
            );
          } else {
            addRequest(
              name,
              url,
              redirectUrl,
              {...values, ...extraData},
              doneCallback,
              failCallback
            );
          }
        } else {
          console.error(err);
        }
      });
    };
    render() {
      const { data, children, raw } = this.props;
      const { form } = this.props;
      console.log(data,'here')
      const { getFieldDecorator } = form;
      const formChildren = isFunction(children)
        ? children(getFieldDecorator, this.handleSubmit, data, form)
        : children;
      const rawRender = () => <AntForm>{formChildren}</AntForm>;
      const cardRender = () => (
        <Card style={{ animation: animations.fadeIn }}>
          <Card.Header>
            <Card.Title as="h5">{title}</Card.Title>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col span={24}>{rawRender()}</Col>
            </Row>
          </Card.Body>
        </Card>
      );
      return raw ? rawRender() : cardRender();
    }
  }
  const mapDispatchToProps = {
    setData: actions.setData,
    getRequest: actions.setGetDataRequest,
    addRequest: actions.setAddRequest,
    editRequest: actions.setEditRequest,
    resetState: actions.resetState,
  };
  const mapStateToProps = state => ({
    data: state.getIn([constants.FORM, `${name}_data`], {}),
    loading: state.getIn([constants.FORM, `${name}_loading`], false),
    failed: state.getIn([constants.FORM, `${name}_failed`], false),
  });
  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(toJS(AntForm.create(`${constants.FORM}_${name}`)(Form)));
}
