import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "static/scss/style.scss";
import { toJS } from "hoc/toJsHoc";
import IntlMessages from "utils/intlMessages";
import * as actions from "./actions";
import * as constants from "./constants";
import * as userConstants from "utils/globalRedux/user/constants";
import * as userAction from "utils/globalRedux/user/actions";
import {Form, Input, Button,Select} from 'antd';
import map from 'lodash/map';
import isEmpty from 'lodash/isEmpty';
import qs from 'qs';
import axios from 'axios';
import config from "config";

class SignIn extends Component {
    constructor(props){
        super(props);
        this.state ={
            country_code: '+98',
            telNo: true,
        }
    }
    handleSubmitSignIn = e => {
        const { setUser } = this.props;
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            let data = '';
            if(values.mobile_number.startsWith('0')){
                 data = this.state.country_code + values.mobile_number.slice(1);
            } else {
                 data = this.state.country_code + values.mobile_number;
            }
            if (!err) {
                axios.post(config.apiUrl + constants.API_URL,  qs.stringify({mobile_number:data})  )
                    .then(res => {
                        const newData = {
                          validation_code: res.data.data.validation_code,
                          auth: 'signIn',
                          mobile_number: data.mobile_number
                        }
                        setUser(newData )
                    })
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
            <Form onSubmit={this.handleSubmitSignIn} className="login-form" >
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
                <Form.Item
                    help={!this.state.telNo && ' لطفا شماره همراه را به انگلیسی وارد نمایید.'}
                    validateStatus={this.state.telNo  ? 'success' : 'error'}
                >
                    {getFieldDecorator('mobile_number', {
                        rules: [{required: true, message: <IntlMessages id="user.required"/>},],
                    })(
                        <Input
                            placeholder="تلفن همراه"
                            addonBefore={this.state.country_code}
                            onChange={ this.handleChangeNumber }
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="login-form-button"
                        disabled={!this.state.telNo}
                        >
                        <IntlMessages id="auth.signIn"/>
                    </Button>
                </Form.Item>
            </Form>
        )
    }
}
SignIn.contextTypes = {
    intl: PropTypes.object.isRequired
};
const mapDispatchToProps = {
    signInRequest: actions.signIn,
    getCountryByFilter: actions.getCountryByFilter,
    setUser: userAction.setUser
};
const mapStateToProps = state => ({
    userValidationCode: state.getIn([userConstants.USER, "validation_code"], null),
    country: state.getIn([userConstants.USER, "country"], null),
    loading: state.getIn(["loading","SIGN_IN", "status"],null),
    filterCountry: state.getIn([userConstants.USER, 'filterCountry'], {}),
});
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(toJS(Form.create()(SignIn)));