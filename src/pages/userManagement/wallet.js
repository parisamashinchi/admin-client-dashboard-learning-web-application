import React, {Component} from "react";
import {connect} from "react-redux";
import {toJS} from "hoc/toJsHoc";
import {createTable} from "containers/table/table";
import * as constants from "./constants";
import LocaleNumber from "utils/localeNumber";
import PropTypes from 'prop-types';
import {Button, Col, Input, Modal, Row} from "antd";
import {createForm} from "containers/form/form";
import FormItem from "components/uiElements/formItem";
import * as formConstants from "containers/form/constants";

class Wallet extends Component {
    constructor(props, context) {
        super(props);
        this.state = {
            visible: false,
            visible_unCharge: false,
        }
        this.table = createTable(constants.WALLET);
        this.tableConf = {
            url: `/admin/student/${props.match.params.id}/wallet`,
            buttonWithAction: () => {
               this.chargeWallet()
            },
            secondButtonWithAction: () => {
                this.unChargeWallet()
            },
            customTextButtonWithAction: context.intl.formatMessage({
                id: "student.wallet.charge"
            }),
            secondCustomTextButtonWithAction: context.intl.formatMessage({
                id: "student.wallet.unCharge"
            }),
            addButtonText: context.intl.formatMessage({
                id: "create"
            }),
            columns: [
                {
                    title: context.intl.formatMessage({
                        id: "student.wallet.amount"
                    }),
                    dataIndex: "amount",
                    key: "amount",
                    render: record => <LocaleNumber>{record}</LocaleNumber>
                },
                {
                    title: context.intl.formatMessage({
                        id: "student.wallet.source"
                    }),
                    dataIndex: "source",
                    key: "source"
                },
                {
                    title: context.intl.formatMessage({
                        id: "student.wallet.type"
                    }),
                    dataIndex: "type",
                    key: "type",
                },
                {
                    title: context.intl.formatMessage({
                        id: "student.wallet.descriptions"
                    }),
                    dataIndex: "descriptions",
                    key: "descriptions"
                },
                {
                    title: context.intl.formatMessage({
                        id: "student.wallet.created_at"
                    }),
                    dataIndex: "created_at",
                    key: "created_at"
                },
            ],
        };
    }
    chargeWallet = () => {
        this.setState({
            visible: true,
        });
        this.modalForm = createForm({
            name: constants.CHARGE,
            url: `/admin/student/${this.props.match.params.id}/wallet/charge`,
            title: this.context.intl.formatMessage({
                id: "student.wallet.charge",
            }),
        });
    }
    unChargeWallet= () => {
        this.setState({
            visible_unCharge: true,
        });
        this.modalForm = createForm({
            name: constants.UNCHARGE,
            url: `/admin/student/${this.props.match.params.id}/wallet/decharge`,
            title: this.context.intl.formatMessage({
                id: "student.wallet.unCharge",
            }),
        });
    }
    handleCancel = e => {
        this.setState({
            visible: false,
            visible_unCharge: false,
        });
        this.table = createTable(constants.WALLET);
    };
    render() {
        const Table = this.table;
        let Form = this.modalForm;
        const {loading} = this.props;
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
                                    <Col className="form-col" span={24} >
                                            <FormItem
                                                label='amount'
                                            >
                                                {fieldDecorator("amount", {
                                                    rules: [{required: true}]
                                                })(
                                                    <Input
                                                        onChange={e => form.setFieldsValue({
                                                            amount: e.target.value,
                                                        })}
                                                    />
                                                )}
                                            </FormItem>
                                            <Col span={24} style={{display: "flex", marginTop: "30px"}}>
                                                <Button
                                                    className="btn btn-primary shadow-2"
                                                    type="primary"
                                                    onClick={handleSubmit}
                                                    loading={loading}
                                                >
                                                    {this.context.intl.formatMessage({
                                                        id: "student.wallet.submit",
                                                    })}
                                                </Button>
                                            </Col>
                                        </Col>
                                </Row>

                            )
                        }}
                    </Form>
                </Modal>
                <Modal
                    title={[]}
                    visible={this.state.visible_unCharge}
                    onCancel={this.handleCancel}
                    footer={[]}
                    width="700px"
                >
                    <Form>
                        {(fieldDecorator, handleSubmit, data, form) => {
                            return (
                                <Row>
                                    <Col className="form-col" span={24} >
                                        <FormItem
                                            label='amount'
                                        >
                                            {fieldDecorator("amount", {
                                                rules: [{required: true}]
                                            })(
                                                <Input
                                                    onChange={e => form.setFieldsValue({
                                                        amount: e.target.value,
                                                    })}
                                                />
                                            )}
                                        </FormItem>
                                        <Col span={24} style={{display: "flex", marginTop: "30px"}}>
                                            <Button
                                                className="btn btn-primary shadow-2"
                                                type="primary"
                                                onClick={handleSubmit}
                                                loading={loading}
                                            >
                                                {this.context.intl.formatMessage({
                                                    id: "student.wallet.submit",
                                                })}
                                            </Button>
                                        </Col>
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

Wallet.contextTypes = {
    intl: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    loading: state.getIn([formConstants.FORM, `${constants.WALLET}_loading`], false),

});
export default connect(mapStateToProps)(toJS(Wallet));

