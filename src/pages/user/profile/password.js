import React, {Component} from "react";
import {Form, Input, Button, Card, Col} from 'antd';
import profile from '../../../static/images/k.jpg';
import Style from './profile.style';
import IntlMessages from "utils/intlMessages";
import PropTypes from "prop-types";
import * as actions from "./actions";
import * as constants from "./constants";
import connect from "react-redux/es/connect/connect";
import { toJS } from "hoc/toJsHoc";

class Password extends Component {
    handleSubmit = e => {
        const { changePassword } = this.props;
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                changePassword(values);
            } else {
           
            }
        });
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Style>
                <img src={profile} className="back-img" alt="profile back" />
                <Card>
                    <Col span={12}>
                        <Form onSubmit={this.handleSubmit} className="login-form">
                    <Form.Item>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: <IntlMessages id="user.signUp.required" /> }],
                        })(
                            <Input
                                placeholder="گذر واژه"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('newPassword', {
                            rules: [{ required: true, message:<IntlMessages id="user.signUp.required" />  }],
                        })(
                            <Input
                                placeholder="گذرواژه جدید"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('repeatPassword', {
                            rules: [{ required: true, message: <IntlMessages id="user.signUp.required" /> }],
                        })(
                            <Input
                                placeholder="تکرار کذرواژه جدید"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" >
                            <IntlMessages id="user.dashboard.save" />
                        </Button>
                    </Form.Item>
                </Form>
                    </Col>
                </Card>
            </Style>
        );
    }
}
Password.contextTypes = {
    intl: PropTypes.object.isRequired
};
const mapDispatchToProps = {
    changePassword: actions.changePassword
};
const mapStateToProps = state => ({
    loading: state.getIn(["loading", constants.PROFILE, "status"], false),
});
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(toJS(Form.create(`FORM_${constants.PROFILE}`)(Password)));
