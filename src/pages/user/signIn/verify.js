import React, {Component, Fragment} from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "static/scss/style.scss";
import { toJS } from "hoc/toJsHoc";
import IntlMessages from "utils/intlMessages";
import * as actions from "./actions";
import * as userConstants from "utils/globalRedux/user/constants";
import Style from "./signIn.style";
import {Form, Input, Button, Select} from 'antd';
import isEmpty from 'lodash/isEmpty';
import PersianNumber from "components/PersianNumber";
import * as constants from "./constants";
import qs from 'qs';
import axios from 'axios';
import config from "config";

class Verify extends Component {
    constructor(props){
        super(props);
        this.state = {
           resend :false,
            minutes: 1,
            seconds: 0
        }
    }
    componentDidMount() {
        this.countdown();
    }
    countdown = () =>{
        this.myInterval = setInterval(() => {
            const { seconds, minutes } = this.state;
            if (minutes > 0) {
                this.setState({
                    resend: false,
                })
            }
            if (seconds > 0) {
                this.setState(({ seconds }) => ({
                    seconds: seconds - 1,
                }))
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(this.myInterval)
                    this.setState({
                        minutes: 0,
                        resend: true,
                    })
                } else {
                    this.setState(({ minutes }) => ({
                        minutes: minutes - 1,
                        seconds: 59
                    }))
                }
            }
        }, 1000)
    }
    handleSubmitVerifyNumber = e =>{
        const {verifyNumberRequest, auth, product_id} = this.props;
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                const sms = values.sms_code;
                const data = {
                    sms_code: sms,
                    validation_code: this.props.userValidationCode,
                    type: auth === "signIn" ? "login" : "signUp",
                    product_id: product_id,
                }

                axios.post(config.apiUrl + constants.VERIFY_NUM_REQUEST_URL,  qs.stringify(data))
                    .then(res => {
                        verifyNumberRequest(data,res);
                    })
            }
        });
    }

    reSend = ()=>{
        const {signInRequest} = this.props;
        this.countdown();
        signInRequest({mobile_number:this.props.mobile});
        this.setState({
            minutes:1,
            seconds: 0
        })
    }
    handleChange = () =>{
        this.setState({
            resend: false,
        })
    }

  render() {
      const { getFieldDecorator } = this.props.form;
      const { minutes, seconds } = this.state;
        return (
          <Style>
              <div>
                <h2>
                    <IntlMessages id="user.signUp.sms1" />
                      {!isEmpty(this.props.mobile) &&
                      <PersianNumber>{ this.props.mobile.slice(3)}</PersianNumber>
                      }
                    <IntlMessages id="user.signUp.sms2" />
                </h2>
              </div>
                  <Form onSubmit={this.handleSubmitVerifyNumber} className="login-form">
                      <Form.Item>
                          {getFieldDecorator('sms_code', {
                              rules: [{ required: true, message:<IntlMessages id="user.required" />  }],
                          })(
                              <Input
                                  placeholder="کد"
                                  onChange={this.handleChange}
                              />,
                          )}
                      </Form.Item>
                          <h4 className="counter">
                              <PersianNumber>{seconds}</PersianNumber>
                              { seconds <= 9 && <PersianNumber>0</PersianNumber>}
                               : &nbsp;
                              <PersianNumber>{minutes}</PersianNumber>
                              <PersianNumber>0</PersianNumber>
                          </h4>

                      <Form.Item>
                          {!this.state.resend
                              ? <Button type="primary" htmlType="submit">
                                  <IntlMessages id="user.send"/>
                              </Button>
                              : <Button type="primary" onClick={this.reSend}>
                                  <IntlMessages id="user.resend"/>
                              </Button>
                          }
                      </Form.Item>
                  </Form>
          </Style>
        );
  }
}
Verify.contextTypes = {
  intl: PropTypes.object.isRequired
};
const mapDispatchToProps = {
    verifyNumberRequest: actions.verifyNumberRequest,
    signInRequest: actions.signIn,
};
const mapStateToProps = state => ({
    userValidationCode: state.getIn([userConstants.USER, "validation_code"], null),
    product_id: state.getIn([userConstants.USER, "product_id"],null),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(toJS(Form.create()(Verify)));
