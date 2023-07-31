import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "static/scss/style.scss";
import Aux from "hoc/_Aux";
import { toJS } from "hoc/toJsHoc";
import lock from "static/images/user/lock.png";
import Input from "components/uiElements/textInput";
import Button from "components/uiElements/button";
import IntlMessages from "utils/intlMessages";
import { Form } from "antd";
import { NavLink } from "react-router-dom";
import FormItem from "components/uiElements/formItem";
import * as actions from "./actions";
import * as constants from "./constants";
import * as userConstants from "utils/globalRedux/user/constants";
import * as panelConstants from "utils/globalRedux/panel/constants";
import { routes as publicRoutes } from "router";
import { routes as privateRoutes } from "router/private";
import Style from "./forgotPassword.style";
import { Helmet } from "react-helmet";

class ForgotPassword extends Component {
  handleSubmit = e => {
    const { forgotPasswordRequest } = this.props;
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        forgotPasswordRequest(values);
      }
    });
  };
  componentDidUpdate(prevProps) {
    const { status: prevStatus } = prevProps;
    const { status, form } = this.props;
    console.log(prevStatus);
    console.log(status);
    if (prevStatus !== status && status === constants.FORGOT_PASSWORD_SENT) {
      form.resetFields();
    }
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { rtlLayout, loading, isLoggedIn } = this.props;
    if (isLoggedIn) {
      this.props.history.push(privateRoutes.ROUTE_DASHBOARD);
    }
    return (
      <Style rtlLayout={rtlLayout}>
        <Aux>
          <Helmet>
            <title>
              {this.context.intl.formatMessage({
                id: "auth.forgotPassword.meta.title"
              })}
            </title>
          </Helmet>
          <div className="auth-wrapper">
            <div className="auth-content subscribe">
              <div className="card">
                <div className="row no-gutters">
                  <div className="col-md-4 col-lg-6 d-none d-md-flex d-lg-flex theme-bg align-items-center justify-content-center">
                    <img src={lock} alt="lock images" className="img-fluid" />
                  </div>
                  <div className="col-md-8 col-lg-6">
                    <Form
                      onSubmit={this.handleSubmit}
                      className="card-body text-center"
                    >
                      <div className="row justify-content-center">
                        <div className="col-sm-10">
                          <div className="mb-4">
                            <i className="feather icon-mail auth-icon" />
                          </div>
                          <h3 className="mb-4">
                            <IntlMessages id="auth.forgotPassword" />
                          </h3>
                          <div className="input-group mb-3">
                            <FormItem>
                              {getFieldDecorator("email", {
                                rules: [
                                  {
                                    required: true
                                  }
                                ]
                              })(
                                <Input
                                  disabled={loading}
                                  type="email"
                                  placeholder={this.context.intl.formatMessage({
                                    id:
                                      "auth.forgotPassword.form.emailPlaceholder"
                                  })}
                                />
                              )}
                            </FormItem>
                          </div>
                          <Button
                            className="btn btn-primary shadow-2 mb-4"
                            type="primary"
                            onClick={this.handleSubmit}
                            loading={loading}
                          >
                            <IntlMessages id="auth.forgotPassword.form.submit" />
                          </Button>
                          <p className="mb-2 text-muted back-to-signin">
                            <IntlMessages id="auth.forgotPassword.form.haveAccount" />
                            &nbsp;
                            <NavLink to={publicRoutes.ROUTE_AUTH_SIGN_IN}>
                              <IntlMessages id="auth.forgotPassword.form.login" />
                            </NavLink>
                          </p>
                        </div>
                      </div>
                    </Form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Aux>
      </Style>
    );
  }
}
ForgotPassword.contextTypes = {
  intl: PropTypes.object.isRequired
};
const mapDispatchToProps = {
  forgotPasswordRequest: actions.setForgotPasswordRequest
};
const mapStateToProps = state => ({
  rtlLayout: state.getIn([panelConstants.PANEL, "rtlLayout"], false),
  loading: state.getIn(["loading", constants.FORGOT_PASSWORD, "status"], false),
  status: state.getIn(
    [constants.FORGOT_PASSWORD, "status"],
    constants.FORGOT_PASSWORD_IDLE
  ),
  isLoggedIn: state.getIn([userConstants.USER, "token"], null) !== null
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(toJS(Form.create()(ForgotPassword)));
