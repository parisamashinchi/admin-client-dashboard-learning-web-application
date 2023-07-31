import React, {Component} from "react";
import {connect} from "react-redux";
import {toJS} from "hoc/toJsHoc";
import {Row, Col, Spin} from "antd";
import get from "lodash/get";
import Checkbox from "components/uiElements/checkBox";
import IntlMessages from "utils/intlMessages";
import {createUpload} from "containers/upload/upload";
import * as constants from "./constants";
import {createForm} from "containers/form/form";
import TextArea from "components/uiElements/textArea";
import PropTypes from 'prop-types';
import FormItem from "components/uiElements/formItem";
import Input from "components/uiElements/textInput";
import Button from "components/uiElements/button";
import * as formConstants from "containers/form/constants";
import Style from './reading.style';
import split from 'lodash/split';
import isEmpty from 'lodash/isEmpty';

class Add extends Component {
    constructor(props, context) {
        super(props);
        this.state = {
            is_published: false
        };
        this.addForm = createForm({
            name: constants.READING,
            url: constants.READING_URL,
            id: props.match.params.id,
            title: context.intl.formatMessage({
                id: "reading.add.title",
            }),
        });
        this.pdfUpload = createUpload(constants.PDF_UPLOADER);
        this.attachmentUpload = createUpload(constants.ATTACHMENT_UPLOADER);
    }

    componentWillReceiveProps(prevProps) {
        if (prevProps.initialData !== this.props.initialData) {
            this.setState({
                is_published: prevProps.initialData.is_published,
            });
        }
    };

    changeCheckbox = (e, form) => {
        this.setState({
            is_published: e.target.checked
        });
        form.setFieldsValue({
            is_published: e.target.checked,
        });
    };

    render() {
        const {loading, dataLoading, initialData} = this.props;
        const Form = this.addForm;
        const PdfUpload = this.pdfUpload;
        const AttachmentUpload = this.attachmentUpload;
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
                                                    "reading.add.form.name",
                                            })}
                                        >
                                            {fieldDecorator("title", {
                                                initialValue: get(initialData, "title", ""),
                                                rules: [
                                                    {
                                                        required: true,
                                                        type: "string",
                                                        message: this.context.intl.formatMessage({
                                                            id:
                                                                "reading.add.form.error.required",
                                                        }),
                                                    },
                                                ],
                                            })(
                                                <Input
                                                    disabled={loading}
                                                    onChange={e => form.setFieldsValue({
                                                        name: e.target.value,
                                                    })}
                                                    placeholder={this.context.intl.formatMessage({
                                                        id:
                                                            "reading.add.form.name",
                                                    })}
                                                />
                                            )}
                                        </FormItem>
                                        <FormItem
                                            label={this.context.intl.formatMessage({
                                                id:
                                                    "reading.add.form.description",
                                            })}
                                        >
                                            {fieldDecorator("descriptions", {
                                                initialValue: get(initialData, "descriptions", ""),
                                                rules: [
                                                    {
                                                        required: true,
                                                        type: "string",
                                                        message: this.context.intl.formatMessage({
                                                            id:
                                                                "reading.add.form.error.required",
                                                        }),
                                                    },
                                                ],
                                            })(
                                                <TextArea
                                                    disabled={loading}
                                                    placeholder={this.context.intl.formatMessage({
                                                        id: "deliverType.add.form.descriptionPlaceholder",
                                                    })}
                                                />
                                            )}
                                        </FormItem>
                                        <FormItem>
                                            {fieldDecorator("is_published", {
                                                initialValue: get(initialData, "is_published", false),
                                            })(
                                                <Checkbox
                                                    checked={this.state.is_published}
                                                    onChange={e => this.changeCheckbox(e, form)}
                                                >
                                                    <IntlMessages id="reading.form.is_published"/>
                                                </Checkbox>
                                            )}
                                        </FormItem>
                                        <FormItem
                                            label={this.context.intl.formatMessage({
                                                id: "reading.form.pdf",
                                            })}
                                        >
                                            {fieldDecorator("pdf_url", {
                                                initialValue: split(get(initialData, "pdf_url", ''), '/')[6],
                                            })(<PdfUpload
                                                url={constants.PDF_URL}
                                                uploadName={constants.PDF_READING}
                                                type="pdf"
                                                onChanges={value => form.setFieldsValue({
                                                    pdf_url: value,
                                                })}
                                            />)}
                                        </FormItem>
                                        <FormItem
                                            label={this.context.intl.formatMessage({
                                                id: "reading.form.attachment",
                                            })}
                                        >
                                            {isEmpty(get(initialData, "attachment_url", ''))
                                                ? fieldDecorator("attachment_url", {
                                                        initialValue: get(initialData, "attachment_url", '')
                                                    })
                                                    (<AttachmentUpload
                                                    url={constants.ATTACHMENT_URL}
                                                    uploadName={constants.ATTACHMENT_READING}
                                                    onChanges={value => form.setFieldsValue({
                                                    attachment_url: value,
                                                })}
                                                    currentImage={get(initialData, "attachment_url", '')}
                                                    />)


                                               : fieldDecorator("attachment_url", {
                                                    initialValue: split(get(initialData, "attachment_url", ''), '/')[6],
                                                })
                                                    (<AttachmentUpload
                                                    url={constants.ATTACHMENT_URL}
                                                    uploadName={constants.ATTACHMENT_READING}
                                                    onChanges={value => form.setFieldsValue({
                                                    attachment_url: value,
                                                })}
                                                    currentImage={get(initialData, "attachment_url", '')}
                                                    />)
                                            }

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
                                                id: "reading.add.form.submit",
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
        [formConstants.FORM, `${constants.READING}_data_loading`],
        false
    ),
    initialData: state.getIn(
        [formConstants.FORM, `${constants.READING}_data`, 'data'],
        false
    ),
    loading: state.getIn(
        [formConstants.FORM, `${constants.READING}_loading`],
        false
    ),
});

export default connect(mapStateToProps)(toJS(Add));
