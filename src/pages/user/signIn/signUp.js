import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "static/scss/style.scss";
import { toJS } from "hoc/toJsHoc";
import IntlMessages from "utils/intlMessages";
import * as actions from "./actions";
import * as userConstants from "utils/globalRedux/user/constants";
import Style from "./signIn.style";
import {Form, Input, Button, Select} from 'antd';
import map from 'lodash/map'
import set from 'lodash/set'
import isEmpty from 'lodash/isEmpty';

class SignUp extends Component {
    constructor(props){
        super(props);
        this.state ={
            country_code: '+98',
            telNo: true,
        }
    }
    handleSubmitSignUp = e => {
        const { signUpRequest } = this.props;
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            let mobile = '';
            if(values.mobile_number.startsWith('0')){
                mobile = this.state.country_code + values.mobile_number.slice(1);
            } else {
                mobile = this.state.country_code + values.mobile_number;
            }
           const data=set(values,'mobile_number', mobile);
            if (!err) {
                 signUpRequest(data);
            }
        });
    };
    handleCountryChange = country => {
        this.setState({
            country_code: country
        })
    };
    handleChangeNumber = e => {
        const telNo = e.target.value;
        const re = /^[0-9\b]+$/;
        if(telNo === ""){
            this.setState({ telNo: true });
        } else {
            this.setState({ telNo: re.test(telNo) });
        }
    };
    onSearch = (value, type, key) => {
        const { getCountryByFilter } = this.props;
        getCountryByFilter(value, type, key);
    };
  render() {
      const { getFieldDecorator } = this.props.form;
      const { Option } = Select;
      const {filterCountry} = this.props;
        return (
          <Style>
              <h2><IntlMessages id="user.signUp.welcome" /></h2>
              <Form onSubmit={this.handleSubmitSignUp} className="login-form">
                  <Form.Item>
                      {getFieldDecorator('name', {
                          rules: [{ required: true, message: <IntlMessages id="user.required" /> }],
                      })(
                              <Input placeholder="نام " />,
                      )}
                  </Form.Item>
                  <Form.Item>
                      {getFieldDecorator('family', {
                          rules: [{ required: true, message: <IntlMessages id="user.required" /> }],
                      })(
                          <Input placeholder=" نام خانوادگی" />,
                      )}
                  </Form.Item>
                  <Form.Item>
                      { getFieldDecorator('prefix', {initialValue: 'Iran'})(
                          <Select
                              value={this.state.country_code}
                              onChange={this.handleCountryChange}
                              onSearch={(value) => this.onSearch(value, 'english_name', 'filter[english_name]')}
                              showArrow
                              showSearch
                              filterOption={false}
                              notFoundContent={null}
                              defaultActiveFirstOption={false}
                          >
                              {map(isEmpty(filterCountry['english_name'])
                                  ? this.props.country
                                  : filterCountry['english_name'], (item, index) => {
                                  return <Option
                                      value={item.dial_code}
                                      key={item.dial_code}
                                  >
                                      {item.english_name}
                                  </Option>
                              })}
                          </Select>
                      )}
                  </Form.Item>
                  {/*<Form.Item>*/}
                  {/*    { getFieldDecorator('prefix', {initialValue: 'Iran'})(*/}
                  {/*        <Select*/}
                  {/*            onChange={this.handleCountryChange}*/}
                  {/*            onSearch={(value) => this.onSearch(value, 'english_name', 'filter[english_name]')}*/}
                  {/*            defaultActiveFirstOption={false}*/}
                  {/*            showArrow={false}*/}
                  {/*            filterOption={false}*/}
                  {/*            notFoundContent={null}*/}
                  {/*            showSearch*/}
                  {/*            optionFilterProp="children"*/}
                  {/*        >*/}
                  {/*            {map(isEmpty(this.props.filterCountry)*/}
                  {/*                ? this.props.country*/}
                  {/*                : this.props.filterCountry, (item, index) => {*/}

                  {/*                return <Option value={item.dial_code}>{item.english_name}</Option>*/}

                  {/*            })}*/}
                  {/*        </Select>*/}
                  {/*    )}*/}
                  {/*</Form.Item>*/}
                  <Form.Item
                      help={!this.state.telNo && ' لطفا شماره همراه را به انگلیسی وارد نمایید.'}
                      validateStatus={this.state.telNo  ? 'success' : 'error'}
                  >
                      {getFieldDecorator('mobile_number', {
                          rules: [{ required: true, message:<IntlMessages id="user.required" />  }],
                      })(
                              <Input
                                  placeholder="تلفن همراه"
                                  addonBefore={this.state.country_code}
                                  onChange={ this.handleChangeNumber }
                              />,
                          )}
                      </Form.Item>
                      <Form.Item>
                          {getFieldDecorator('email', {
                              rules: [{ required: true, message: <IntlMessages id="user.required" /> }],
                          })(
                              <Input
                                  placeholder="ایمیل "
                              />,
                          )}
                      </Form.Item>
                      <Form.Item>
                          <Button
                              type="primary"
                              htmlType="submit"
                              disabled={!this.state.telNo}
                          >
                              <IntlMessages id="user.signUp" />
                          </Button>
                      </Form.Item>
                  </Form>
          </Style>
        );
  }
}
SignUp.contextTypes = {
  intl: PropTypes.object.isRequired
};
const mapDispatchToProps = {
    signUpRequest: actions.signUp,
    getCountryByFilter: actions.getCountryByFilter,
};
const mapStateToProps = state => ({
  userValidationCode: state.getIn([userConstants.USER, "validation_code"], null),
    country: state.getIn([userConstants.USER, "country"], null),
    filterCountry: state.getIn([userConstants.USER, 'filterCountry'], {}),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(toJS(Form.create()(SignUp)));
