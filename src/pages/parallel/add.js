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
import Style from './parallel.style';
import split from 'lodash/split';

class Add extends Component {
    constructor(props, context) {
        super(props);
        this.state = {
            is_published: false
        };
        this.addForm = createForm({
            name: constants.PARALLEL,
            url: constants.PARALLEL_URL,
            id: props.match.params.id,
            title: context.intl.formatMessage({
                id: "parallel.add.title",
            }),
        });
        this.parallelImage = createUpload(constants.FILE_UPLOADER);
        this.parallelMobileImage = createUpload(constants.MOBILE_UPLOADER);
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
        const ParallelImage = this.parallelImage;
        const ParallelMobileImage = this.parallelMobileImage;
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
                                                    "parallel.add.form.name",
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
                                                                "parallel.add.form.error.nameRequired",
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
                                                            "parallel.add.form.name",
                                                    })}
                                                />
                                            )}
                                        </FormItem>
                                        <FormItem
                                            label={this.context.intl.formatMessage({
                                                id:
                                                    "parallel.add.form.description",
                                            })}
                                        >
                                            {fieldDecorator("descriptions", {
                                                initialValue: get(initialData, "descriptions", ""),
                                            })(
                                                <TextArea
                                                    disabled={loading}
                                                    placeholder={this.context.intl.formatMessage({
                                                        id: "deliverType.add.form.descriptionPlaceholder",
                                                    })}
                                                />
                                            )}
                                        </FormItem>
                                        <FormItem label="arvan_uuid">
                                            {fieldDecorator("arvan_uuid", {
                                                initialValue: get(initialData, "arvan_uuid", ""),
                                                rules: [
                                                    {
                                                        required: true,
                                                        type: "string",
                                                        message: this.context.intl.formatMessage({
                                                            id:
                                                                "course.add.form.error.required",
                                                        }),
                                                    },
                                                ],
                                            })(
                                                <Input
                                                    disabled={loading}
                                                    onChange={e => form.setFieldsValue({
                                                        arvan_uuid: e.target.value,
                                                    })}
                                                />
                                            )}
                                        </FormItem>
                                        <FormItem
                                            label={this.context.intl.formatMessage({
                                                id: "parallel.form.order",
                                            })}
                                        >
                                            {fieldDecorator("order", {
                                                initialValue: get(initialData, "order", 0),
                                            })(
                                                <Input
                                                    disabled={loading}
                                                    type="number"
                                                    min="1"
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
                                                    <IntlMessages id="parallel.form.is_published"/>
                                                </Checkbox>
                                            )}
                                        </FormItem>
                                        <FormItem
                                            label={this.context.intl.formatMessage({
                                                id:
                                                    "slider.add.form.link",
                                            })}
                                        >
                                            {fieldDecorator("link_url", {
                                                initialValue: get(initialData, "link_url", ""),
                                            })(
                                                <Input
                                                    disabled={loading}
                                                    onChange={e => form.setFieldsValue({
                                                        name: e.target.value,
                                                    })}
                                                    placeholder={this.context.intl.formatMessage({
                                                        id:
                                                            "slider.add.form.link_url",
                                                    })}
                                                />
                                            )}
                                        </FormItem>
                                        <FormItem
                                            label={this.context.intl.formatMessage({
                                                id: "parallel.form.image",
                                            })}
                                        >
                                            {fieldDecorator("media_url", {
                                                initialValue: split(get(initialData, "media_url", ''), '/')[5],
                                            })(<ParallelImage
                                                url={constants.IMAGE_URL}
                                                uploadName={constants.UPLOAD_PARALLEL}
                                                onChanges={value => form.setFieldsValue({
                                                    media_url: value,
                                                })}
                                                currentImage={get(initialData, "media_url", '')}
                                            />)}
                                        </FormItem>
                                        <FormItem
                                            label={this.context.intl.formatMessage({
                                                id:
                                                    "parallel.add.form.meta_media_url",
                                            })}
                                        >
                                            {fieldDecorator("meta_media_url", {
                                                initialValue: get(initialData, "meta_media_url", ""),
                                                rules: [
                                                    {
                                                        required: true,
                                                        type: "string",
                                                        message: this.context.intl.formatMessage({
                                                            id:
                                                                "parallel.add.form.error.nameRequired",
                                                        }),
                                                    },
                                                ],
                                            })(
                                                <Input
                                                    disabled={loading}
                                                    onChange={e => form.setFieldsValue({
                                                        meta_media_url: e.target.value,
                                                    })}
                                                />
                                            )}
                                        </FormItem>
                                        <FormItem
                                            label={this.context.intl.formatMessage({
                                                id: "parallel.form.image.mobile",
                                            })}
                                        >
                                            {fieldDecorator("mobile_media_url", {
                                                initialValue: split(get(initialData, "mobile_media_url", ''), '/')[6],
                                            })(<ParallelMobileImage
                                                url={constants.IMAGE_MOBILE_URL}
                                                uploadName={constants.UPLOAD_MOBILE_PARALLEL}
                                                onChanges={value => form.setFieldsValue({
                                                    mobile_media_url: value,
                                                })}
                                                currentImage={get(initialData, "mobile_media_url", '')}
                                            />)}
                                        </FormItem>
                                        <FormItem
                                            label={this.context.intl.formatMessage({
                                                id:
                                                    "parallel.add.form.meta_mobile_media_url",
                                            })}
                                        >
                                            {fieldDecorator("meta_mobile_media_url", {
                                                initialValue: get(initialData, "meta_mobile_media_url", ""),
                                                rules: [
                                                    {
                                                        required: true,
                                                        type: "string",
                                                        message: this.context.intl.formatMessage({
                                                            id:
                                                                "parallel.add.form.error.nameRequired",
                                                        }),
                                                    },
                                                ],
                                            })(
                                                <Input
                                                    disabled={loading}
                                                    onChange={e => form.setFieldsValue({
                                                        meta_mobile_media_url: e.target.value,
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
                                                id: "parallel.add.form.submit",
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
        [formConstants.FORM, `${constants.PARALLEL}_data_loading`],
        false
    ),
    initialData: state.getIn(
        [formConstants.FORM, `${constants.PARALLEL}_data`, 'data'],
        false
    ),
    loading: state.getIn(
        [formConstants.FORM, `${constants.PARALLEL}_loading`],
        false
    ),
});

export default connect(mapStateToProps)(toJS(Add));
