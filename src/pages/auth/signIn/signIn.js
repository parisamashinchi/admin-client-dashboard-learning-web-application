import React, { Component } from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import "static/scss/style.scss";
import Aux from "hoc/_Aux";
import { toJS } from "hoc/toJsHoc";
import lock from "static/images/user/lock.png";
import Input from "components/uiElements/textInput";
import Button from "components/uiElements/button";
import Checkbox from "components/uiElements/checkBox";
import IntlMessages from "utils/intlMessages";
import { Form } from "antd";
import FormItem from "components/uiElements/formItem";
import * as actions from "./actions";
import * as constants from "./constants";
import * as userConstants from "utils/globalRedux/user/constants";
import * as panelConstants from "utils/globalRedux/panel/constants";
import { routes as publicRoutes } from "router";
import { routes as privateRoutes } from "router/private";
import { Helmet } from "react-helmet";
import Style from "./signIn.style";

class SignIn extends Component {
  handleSubmit = e => {
    const { loginRequest } = this.props;
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        loginRequest(values);
      } else {
        console.error(err);
      }
    });
  };
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
                id: "auth.signIn.meta.title"
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
                          <h3 className="mb-4">
                            <IntlMessages id="auth.signIn" />
                          </h3>
                          <div className="input-group mb-3">
                            <FormItem>
                              {getFieldDecorator("mobile_number", {
                                rules: [
                                  {
                                    required: true
                                  }
                                ]
                              })(
                                <Input
                                  disabled={loading}
                                  type="text"
                                  placeholder={this.context.intl.formatMessage({
                                    id: "auth.signIn.form.mobilePlaceholder"
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
                            <IntlMessages id="auth.signIn.form.submit" />
                          </Button>
                          {/*<p className="mb-2 text-muted forgot-password">*/}
                            {/*<IntlMessages id="auth.signIn.form.forgotPassword" />*/}
                            {/*&nbsp;*/}
                            {/*<NavLink*/}
                              {/*to={publicRoutes.ROUTE_AUTH_FORGOT_PASSWORD}*/}
                            {/*>*/}
                              {/*<IntlMessages id="auth.signIn.form.resetPassword" />*/}
                            {/*</NavLink>*/}
                          {/*</p>*/}
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
SignIn.contextTypes = {
  intl: PropTypes.object.isRequired
};
const mapDispatchToProps = {
  loginRequest: actions.setLoginRequest
};
const mapStateToProps = state => ({
  rtlLayout: state.getIn([panelConstants.PANEL, "rtlLayout"], false),
  loading: state.getIn(["loading", constants.LOGIN, "status"], false),
  isLoggedIn: state.getIn([userConstants.USER, "token"], null) !== null
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(toJS(Form.create()(SignIn)));
