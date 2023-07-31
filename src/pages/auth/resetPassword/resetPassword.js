import React, { Component } from "react";
import Style from "./resetPassword.style";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "static/scss/style.scss";
import Aux from "hoc/_Aux";
import { toJS } from "hoc/toJsHoc";
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
import { Helmet } from "react-helmet";
import queryStringToJson from "utils/helpers/queryStringToJson";

import get from "lodash/get";

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    const {
      location: { search },
    } = this.props;
    const queryObject = queryStringToJson(search);
    this.activeCode = get(queryObject, "activeCode", "");
  }
  handleSubmit = e => {
    const { resetPasswordRequest } = this.props;
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const activeCode = this.activeCode;
        const password = values["password"];
        resetPasswordRequest({ activeCode, password });
      }
    });
  };
  compareConfirmToPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue("password")) {
      callback(
        this.context.intl.formatMessage({
          id: "resetPassword.form.error.inconsistentPasswords",
        })
      );
    } else {
      callback();
    }
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const { loading, isLoggedIn, rtlLayout } = this.props;
    if (isLoggedIn) {
      this.props.history.push(privateRoutes.ROUTE_DASHBOARD);
    }
    return (
      <Style rtlLayout={rtlLayout}>
        <Aux>
          <Helmet>
            <title>
              {this.context.intl.formatMessage({
                id: "auth.resetPassword.meta.title",
              })}
            </title>
          </Helmet>
          <div className="auth-wrapper">
            <div className="auth-content">
              <div className="auth-bg">
                <span className="r" />
                <span className="r s" />
                <span className="r s" />
                <span className="r" />
              </div>
              <div className="card">
                <Form
                  className="card-body text-center"
                  onSubmit={this.handleSubmit}
                >
                  <h5 className="mb-4">
                    <IntlMessages id="auth.resetPassword" />
                  </h5>
                  <div className="input-group mb-3">
                    <FormItem className="password-form-item">
                      {getFieldDecorator("password", {
                        rules: [
                          {
                            required: true,
                          },
                        ],
                      })(
                        <Input
                          disabled={loading}
                          type="password"
                          placeholder={this.context.intl.formatMessage({
                            id: "auth.resetPassword.form.passwordPlaceholder",
                          })}
                        />
                      )}
                    </FormItem>
                  </div>
                  <div className="input-group mb-3">
                    <FormItem>
                      {getFieldDecorator("confirmPassword", {
                        rules: [
                          {
                            required: true,
                            message: this.context.intl.formatMessage({
                              id:
                                "resetPassword.form.error.inconsistentPasswords",
                            }),
                          },
                          {
                            validator: this.compareConfirmToPassword,
                          },
                        ],
                      })(
                        <Input
                          disabled={loading}
                          type="password"
                          placeholder={this.context.intl.formatMessage({
                            id:
                              "auth.resetPassword.form.confirmPasswordPlaceholder",
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
                    <IntlMessages id="auth.resetPassword.form.submit" />
                  </Button>
                  <p className="mb-0 text-muted back-to-signin">
                    <IntlMessages id="auth.resetPassword.form.haveAccount" />
                    &nbsp;
                    <NavLink to={publicRoutes.ROUTE_AUTH_SIGN_IN}>
                      <IntlMessages id="auth.resetPassword.form.login" />
                    </NavLink>
                  </p>
                </Form>
              </div>
            </div>
          </div>
        </Aux>
      </Style>
    );
  }
}
ResetPassword.contextTypes = {
  intl: PropTypes.object.isRequired,
};
const mapDispatchToProps = {
  resetPasswordRequest: actions.setResetPasswordRequest,
};
const mapStateToProps = state => ({
  rtlLayout: state.getIn([panelConstants.PANEL, "rtlLayout"], false),
  loading: state.getIn(["loading", constants.RESET_PASSWORD, "status"], false),
  isLoggedIn: state.getIn([userConstants.USER, "token"], null) !== null,
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(toJS(Form.create()(ResetPassword)));
