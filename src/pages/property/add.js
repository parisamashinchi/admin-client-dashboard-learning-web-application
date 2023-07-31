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
import Style from './property.style';
import split from 'lodash/split';

class Add extends Component {
    constructor(props, context) {
        super(props);
        this.state = {
            is_published: false
        };
        this.addForm = createForm({
            name: constants.PROPERTY,
            url: constants.PROPERTY_URL,
            id: props.match.params.id,
            title: context.intl.formatMessage({
                id: "property.add.title",
            }),
        });
        this.propertyUpload = createUpload(constants.PROPERTY_UPLOADER);
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
        const PropertyUpload = this.propertyUpload;
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
                                                    "property.add.form.name",
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
                                                                "property.add.form.error.required",
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
                                                            "property.add.form.name",
                                                    })}
                                                />
                                            )}
                                        </FormItem>
                                        <FormItem
                                            label={this.context.intl.formatMessage({
                                                id:
                                                    "property.form.order",
                                            })}
                                        >
                                            {fieldDecorator("order", {
                                                initialValue: get(initialData, "order", 0),
                                                rules: [
                                                    {
                                                        required: true,
                                                        message: this.context.intl.formatMessage({
                                                            id:
                                                                "property.add.form.error.required",
                                                        }),
                                                    },
                                                ],
                                            })(
                                                <Input
                                                    disabled={loading}
                                                    type="number"
                                                    min="1"
                                                    onChange={value => form.setFieldsValue({
                                                        order: value,
                                                    })}
                                                    placeholder={this.context.intl.formatMessage({
                                                        id: "property.form.order",
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
                                                    <IntlMessages id="property.form.is_published"/>
                                                </Checkbox>
                                            )}
                                        </FormItem>
                                        <FormItem
                                            label={this.context.intl.formatMessage({
                                                id: "property.form.media",
                                            })}
                                        >
                                            {fieldDecorator("media_url", {
                                                initialValue: split(get(initialData, "media_url", ''), '/')[5],
                                            })(<PropertyUpload
                                                url={constants.FILE_URL}
                                                uploadName={constants.PROPERTY_FILE}
                                                onChanges={value => form.setFieldsValue({
                                                    media_url: value,
                                                })}
                                                currentImage={get(initialData, "media_url", '')}
                                            />)}
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
                                                id: "property.add.form.submit",
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
        [formConstants.FORM, `${constants.PROPERTY}_data_loading`],
        false
    ),
    initialData: state.getIn(
        [formConstants.FORM, `${constants.PROPERTY}_data`, 'data'],
        false
    ),
    loading: state.getIn(
        [formConstants.FORM, `${constants.PROPERTY}_loading`],
        false
    ),
});

export default connect(mapStateToProps)(toJS(Add));
