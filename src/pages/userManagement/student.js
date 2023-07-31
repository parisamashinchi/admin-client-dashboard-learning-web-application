import React, {Component} from "react";
import {createTable} from "containers/table/table";
import * as constants from "./constants";
import LocaleNumber from "utils/localeNumber";
import PropTypes from 'prop-types';
import {Button, Col, Input, Modal, Row, Form} from "antd";
import { routes as privateRoutes } from "router/private";
import FormItem from "components/uiElements/formItem";
import {createForm} from "containers/form/form";
import get from "lodash";

class Student extends Component {
    constructor(props, context) {
        super(props);
        this.state ={
            visible: false
        }
        this.table = createTable(constants.STUDENT);
        this.tableConf = {
            url: `/admin/student`,
            columns: [
                {
                    title: context.intl.formatMessage({
                        id: "course.list.id"
                    }),
                    dataIndex: "student_profile_id",
                    key: "student_profile_id",
                    render: record => <LocaleNumber>{record}</LocaleNumber>
                },
                {
                    title: context.intl.formatMessage({
                        id: "course.student.list.name"
                    }),
                    dataIndex: "name",
                    key: "name"
                },
                {
                    title: context.intl.formatMessage({
                        id: "course.student.list.mobile"
                    }),
                    dataIndex: "mobile_number",
                    key: "mobile_number",
                },
                {
                    title: context.intl.formatMessage({
                        id: "course.student.list.email"
                    }),
                    dataIndex: "email",
                    key: "email"
                },
                {
                    render: (data) =>
                        <Button onClick={() => this.props.history.push(
                            privateRoutes.ROUTE_USER_MANAGEMENT_WALLET.replace(":id", data.student_profile_id || -1)
                            , data.student_profile_id
                        )}
                        >
                            {context.intl.formatMessage({
                                id: "course.student.wallet.report"
                            })}
                        </Button>
                },
                {
                    render: (data) =>
                        <Button  onClick={() =>  this.changeNum(data)}
                        >
                            {context.intl.formatMessage({
                                id: "course.student.list.number.change"
                            })}
                        </Button>
                },
            ],
        };
    }

    changeNum = (data) => {
        this.setState({
            visible: true,
            old_number: data.mobile_number
        });
        this.modalForm = createForm({
            name: constants.CHANGE_NUM,
            url: `/admin/student/replace_number`,
            title: this.context.intl.formatMessage({
                id: "course.student.list.number.change",
            }),
        });
        this.table = createTable(constants.STUDENT);
    }
    handleCancel = e => {
        this.setState({
            visible: false,
        });
    };

    render() {
        const Table = this.table;
        let Form = this.modalForm;
        return (
            <div>
                <Table
                    {...this.tableConf}
                    {...this.props}
                    titleBox={this.context.intl.formatMessage({
                        id: "course.student.list"
                    })}
                />
                <Modal
                    title={[]}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    footer={[]}
                    width="700px"
                >
                    <Form>
                        {(fieldDecorator, handleSubmit, data, form) => {
                            return (
                                <Row>
                                    <Col className="form-col" span={24}>
                                        <FormItem
                                            label='old_number'
                                        >
                                            {fieldDecorator("old_number", {
                                                initialValue: this.state.old_number,
                                                rules: [
                                                    {
                                                        required: true,
                                                        type: "string",
                                                    },
                                                ],
                                            })(
                                                <Input
                                                    onChange={e => form.setFieldsValue({
                                                        old_number: e.target.value,
                                                    })}
                                                    placeholder={this.context.intl.formatMessage({
                                                        id:
                                                            "course.student.old_number",
                                                    })}
                                                />
                                            )}
                                        </FormItem>
                                    </Col>
                                    <Col className="form-col" span={24}>
                                        <FormItem
                                            label='new_number'
                                        >
                                            {fieldDecorator("new_number", {
                                                rules: [
                                                    {
                                                        required: true,
                                                        type: "string",
                                                    },
                                                ],
                                            })(
                                                <Input
                                                    onChange={e => form.setFieldsValue({
                                                        new_number: e.target.value,
                                                    })}
                                                    placeholder={this.context.intl.formatMessage({
                                                        id:
                                                            "course.student.new_number",
                                                    })}
                                                />
                                            )}
                                        </FormItem>
                                    </Col>
                                    <Col span={24} style={{display: "flex", marginTop: "30px"}}>
                                        <Button
                                            className="btn btn-primary shadow-2"
                                            type="primary"
                                            onClick={handleSubmit}
                                        >
                                            {this.context.intl.formatMessage({
                                                id: "submit",
                                            })}
                                        </Button>
                                    </Col>
                                </Row>
                            )
                        }}
                    </Form>
                </Modal>
            </div>
        );
    }
}

Student.contextTypes = {
    intl: PropTypes.object.isRequired
};

export default Student;
