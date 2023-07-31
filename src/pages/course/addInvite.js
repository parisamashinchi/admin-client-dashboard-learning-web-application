import React, {Component} from "react";
import {connect} from "react-redux";
import {toJS} from "hoc/toJsHoc";
import {Row, Col, Spin} from "antd";
import get from "lodash/get";
import * as constants from "./constants";
import {createForm} from "containers/form/form";
import PropTypes from 'prop-types';
import FormItem from "components/uiElements/formItem";
import Button from "components/uiElements/button";
import * as formConstants from "containers/form/constants";
import Style from './course.style';
import Input from "components/uiElements/textInput";
import * as actions from "../discount/actions";
import {createUpload} from "containers/upload/upload";
import {bindActionCreators} from "redux";
import split from 'lodash/split';
import Checkbox from "components/uiElements/checkBox";
import IntlMessages from "utils/intlMessages";

class AddInvite extends Component {
    constructor(props, context) {
        super(props);
        this.state = {
            is_vip: false,
        };
        this.addForm = createForm({
            name: constants.SAMPLE,
            url: constants.COURSE_URL + '/' + this.props.location.state + '/invite_link',
            id: props.match.params.id,
            title: context.intl.formatMessage({
                id: "course.invite.add"
            }),
        });
    }
    componentWillReceiveProps(prevProps) {
        if (prevProps.initialData !== this.props.initialData) {
            this.setState({
                is_vip: prevProps.initialData.is_vip,
            });
        }
    };
    changeCheckbox = (e, form) => {
        this.setState({
            is_vip: e.target.checked
        });
        form.setFieldsValue({
            is_vip: e.target.checked,
        });
    };

    render() {
        const {
            loading,
            initialData,
        } = this.props;
        const Form = this.addForm;
        console.log(this.props.location.pathname.includes('edit'))
        return (
            <Style>
                <Form >
                        {(fieldDecorator, handleSubmit, data, form) => {
                            return (
                                <Row>

                                    {this.props.location.pathname.includes('edit')
                                        ?
                                        <Col className="form-col" span={24} md={{span: 14}}>
                                            <FormItem
                                                label={this.context.intl.formatMessage({
                                                    id:
                                                        "invite.list.link",
                                                })}
                                            >   {fieldDecorator("link", {
                                                initialValue: initialData.link,
                                            })(
                                                <Input
                                                    disabled={loading}
                                                    onChange={e => form.setFieldsValue({
                                                        link: e.target.value,
                                                    })}
                                                />
                                            )}
                                            </FormItem>
                                        </Col>
                                        :
                                        <Col className="form-col" span={24} md={{span: 14}}>
                                            <FormItem
                                                label={this.context.intl.formatMessage({
                                                    id:
                                                        "invite.list.link",
                                                })}
                                            >   {fieldDecorator("link", {
                                                initialValue: initialData.link,
                                            })(
                                                <Input
                                                    disabled={loading}
                                                    onChange={e => form.setFieldsValue({
                                                        link: e.target.value,
                                                    })}
                                                />
                                            )}
                                            </FormItem>
                                            <FormItem
                                                label={this.context.intl.formatMessage({
                                                    id:
                                                        "invite.list.capacity",
                                                })}
                                            >   {fieldDecorator("capacity", {
                                                initialValue: initialData.capacity,
                                            })(
                                                <Input
                                                    disabled={loading}
                                                    onChange={e => form.setFieldsValue({
                                                        capacity: e.target.value,
                                                    })}
                                                />
                                            )}
                                            </FormItem>
                                            <FormItem>
                                                {fieldDecorator("is_vip", {
                                                    initialValue: get(initialData, "is_vip", false),
                                                })(
                                                    <Checkbox
                                                        checked={this.state.is_vip}
                                                        onChange={e => this.changeCheckbox(e, form)}
                                                    >
                                                        <IntlMessages id="invite.list.vip"/>
                                                    </Checkbox>
                                                )}
                                            </FormItem>
                                        </Col>
                                    }
                                    <Col span={24} style={{display: "flex", marginTop: "30px"}}>
                                        <Button
                                            className="btn btn-primary shadow-2"
                                            type="primary"
                                            onClick={handleSubmit}
                                            loading={loading}
                                        >
                                            {this.context.intl.formatMessage({
                                                id: "discount.add.form.submit",
                                            })}
                                        </Button>
                                    </Col>

                                </Row>
                            );
                        }}
                    </Form>
            </Style>
        );
    }
}

AddInvite.contextTypes = {
    intl: PropTypes.object.isRequired
};
const mapStateToProps = state => ({

    loading: state.getIn(
        [formConstants.FORM, `${constants.SAMPLE}_loading`],
        false
    ),

    initialData: state.getIn(
        [formConstants.FORM, `${constants.SAMPLE}_data`, 'data'],
        false
    )
});
const mapDispatchToProps = dispatch => {
    const {getStudents, getStudentsByFilter} = actions;
    return bindActionCreators({getStudents, getStudentsByFilter}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(toJS(AddInvite));
