import React, {Component} from "react";
import {connect} from "react-redux";
import {toJS} from "hoc/toJsHoc";
import {Row, Col, Spin} from "antd";
import get from "lodash/get";
import Checkbox from "components/uiElements/checkBox";
import IntlMessages from "utils/intlMessages";
import * as constants from "./constants";
import {createForm} from "containers/form/form";
import TextArea from "components/uiElements/textArea";
import PropTypes from 'prop-types';
import FormItem from "components/uiElements/formItem";
import Input from "components/uiElements/textInput";
import Button from "components/uiElements/button";
import * as formConstants from "containers/form/constants";
import Style from './faq.style';
import split from 'lodash/split';

class Add extends Component {
    constructor(props, context) {
        super(props);
        this.addForm = createForm({
            name: constants.FAQ,
            url: constants.FAQ_URL,
            id: props.match.params.id,
            title: context.intl.formatMessage({
                id: "faq.add.title",
            }),
        });
    }

    render() {
        const {loading, dataLoading, initialData} = this.props;
        const Form = this.addForm;
        return (
            <Style>
                <Spin spinning={dataLoading}>
                    <Form>
                        {(fieldDecorator, handleSubmit, data, form) => {
                            return (
                                <Row>
                                    <Col className="form-col" span={24} md={{span: 14}}>
                                        <FormItem
                                            label={this.context.intl.formatMessage({
                                                id:
                                                    "question.list.name",
                                            })}
                                        >
                                            {fieldDecorator("question", {
                                                initialValue: get(initialData, "question", ""),
                                                rules: [
                                                    {
                                                        required: true,
                                                        type: "string",
                                                        message: this.context.intl.formatMessage({
                                                            id:
                                                                "faq.add.form.error.required",
                                                        }),
                                                    },
                                                ],
                                            })(
                                                <Input
                                                    disabled={loading}
                                                    onChange={e => form.setFieldsValue({
                                                        question: e.target.value,
                                                    })}
                                                    placeholder={this.context.intl.formatMessage({
                                                        id:
                                                            "question.list.name",
                                                    })}
                                                />
                                            )}
                                        </FormItem>
                                        <FormItem
                                            label={this.context.intl.formatMessage({
                                                id:
                                                    "answer.list.name",
                                            })}
                                        >
                                            {fieldDecorator("answer", {
                                                initialValue: get(initialData, "answer", ""),
                                                rules: [
                                                    {
                                                        required: true,
                                                        type: "string",
                                                        message: this.context.intl.formatMessage({
                                                            id:
                                                                "tag.add.form.error.required",
                                                        }),
                                                    },
                                                ],
                                            })(
                                                <Input
                                                    disabled={loading}
                                                    onChange={e => form.setFieldsValue({
                                                        answer: e.target.value,
                                                    })}
                                                    placeholder={this.context.intl.formatMessage({
                                                        id:
                                                            "answer.list.name",
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
                                            loading={loading}
                                        >
                                            {this.context.intl.formatMessage({
                                                id: "faq.add.form.submit",
                                            })}
                                        </Button>
                                    </Col>
                                </Row>
                            );
                        }}
                    </Form>
                </Spin>
            </Style>
        );
    }
}

Add.contextTypes = {
    intl: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    dataLoading: state.getIn(
        [formConstants.FORM, `${constants.FAQ}_data_loading`],
        false
    ),
    initialData: state.getIn(
        [formConstants.FORM, `${constants.FAQ}_data`, 'data'],
        false
    ),
    loading: state.getIn(
        [formConstants.FORM, `${constants.FAQ}_loading`],
        false
    ),
});

export default connect(mapStateToProps)(toJS(Add));
