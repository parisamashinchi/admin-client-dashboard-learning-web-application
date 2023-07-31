import React, {Component} from "react";
import {connect} from "react-redux";
import {toJS} from "hoc/toJsHoc";
import {Row, Col, Spin} from "antd";
import get from "lodash/get";
import split from "lodash/split";
import {createUpload} from "containers/upload/upload";
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
import Style from './slider.style';
import ReactHtmlParser from 'react-html-parser'

class Add extends Component {
    constructor(props, context) {
        super(props);
        this.state = {
            is_published: false
        };
        this.addForm = createForm({
            name: constants.SLIDER,
            url: constants.SLIDER_URL,
            id: props.match.params.id,
            title: context.intl.formatMessage({
                id: "slider.add.title",
            }),
        });
        this.sliderImage = createUpload(constants.FILE_UPLOADER);
        this.mobileImage = createUpload(constants.MOBILE_UPLOADER);
        this.logoImage = createUpload(constants.LOGO_UPLOADER);
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
        const SliderImage = this.sliderImage;
        const MobileImage = this.mobileImage;
        const LogoImage = this.logoImage;
        return (
            <Style>
                <Spin spinning={dataLoading}>
                    <Form>
                        {(fieldDecorator, handleSubmit, data={initialData}, form) => {
                            return (
                                <Row>
                                    <Col className="form-col" span={24} md={{span: 14}}>
                                        <FormItem
                                            label={this.context.intl.formatMessage({
                                                id:
                                                    "slider.add.form.title",
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
                                                                "slider.add.form.error.required",
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
                                                            "slider.add.form.title",
                                                    })}
                                                />
                                            )}
                                        </FormItem>
                                        <FormItem
                                            label={this.context.intl.formatMessage({
                                                id:
                                                    "slider.add.form.order",
                                            })}
                                        >
                                            {fieldDecorator("order", {
                                                initialValue: get(initialData, "order", ""),
                                                rules: [
                                                    {
                                                        required: true,
                                                        type: "string",
                                                        message: this.context.intl.formatMessage({
                                                            id:
                                                                "slider.add.form.error.required",
                                                        }),
                                                    },
                                                ],
                                            })(
                                                <Input
                                                    disabled={loading}
                                                    type="number"
                                                    min="1"
                                                    onChange={e => form.setFieldsValue({
                                                        order: e.target.value,
                                                    })}
                                                    placeholder={this.context.intl.formatMessage({
                                                        id: "slider.add.form.order",
                                                    })}
                                                />
                                            )}
                                        </FormItem>
                                        <FormItem
                                            label={this.context.intl.formatMessage({
                                                id:
                                                    "slider.add.form.description",
                                            })}
                                        >
                                            {fieldDecorator("descriptions", {
                                                initialValue: get(initialData, "descriptions", "").toString('htm'),
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
                                                    <IntlMessages id="parallel.form.is_published" />
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
                                                id:
                                                    "slider.add.form.btn.back.color",
                                            })}
                                        >
                                            {fieldDecorator("button_background_color", {
                                                initialValue: get(initialData, "button_background_color", ""),
                                                rules: [
                                                    {
                                                        required: true,
                                                        type: "string",
                                                        message: this.context.intl.formatMessage({
                                                            id:
                                                                "slider.add.form.error.required",
                                                        }),
                                                    },
                                                ],
                                            })(
                                                <Input
                                                    disabled={loading}
                                                    onChange={e => form.setFieldsValue({
                                                        button_background_color: e.target.value,
                                                    })}
                                                    placeholder={this.context.intl.formatMessage({
                                                        id:
                                                            "slider.add.form.btn.back.color",
                                                    })}
                                                />
                                            )}
                                        </FormItem>
                                        <FormItem
                                            label={this.context.intl.formatMessage({
                                                id:
                                                    "slider.add.form.btn.text.color",
                                            })}
                                        >
                                            {fieldDecorator("button_text", {
                                                initialValue: get(initialData, "button_text", ""),
                                                rules: [
                                                    {
                                                        required: true,
                                                        type: "string",
                                                        message: this.context.intl.formatMessage({
                                                            id:
                                                                "slider.add.form.error.required",
                                                        }),
                                                    },
                                                ],
                                            })(
                                                <Input
                                                    disabled={loading}
                                                    onChange={e => form.setFieldsValue({
                                                        button_text: e.target.value,
                                                    })}
                                                    placeholder={this.context.intl.formatMessage({
                                                        id:
                                                            "slider.add.form.btn.text.color",
                                                    })}
                                                />
                                            )}
                                        </FormItem>
                                        <FormItem
                                            label={this.context.intl.formatMessage({
                                                id:
                                                    "slider.add.form.logo.pos",
                                            })}
                                        >
                                            {fieldDecorator("logo_position", {
                                                initialValue: get(initialData, "logo_position", ""),
                                            })(
                                                <Input
                                                    disabled={loading}
                                                    onChange={e => form.setFieldsValue({
                                                        logo_position: e.target.value,
                                                    })}
                                                    placeholder={this.context.intl.formatMessage({
                                                        id:
                                                            "slider.add.form.logo.pos",
                                                    })}
                                                />
                                            )}
                                        </FormItem>
                                        <FormItem
                                            label={this.context.intl.formatMessage({
                                                id:
                                                    "slider.add.form.btn.color",
                                            })}
                                        >
                                            {fieldDecorator("button_color", {
                                                initialValue: get(initialData, "button_color", ""),
                                                rules: [
                                                    {
                                                        required: true,
                                                        type: "string",
                                                        message: this.context.intl.formatMessage({
                                                            id:
                                                                "slider.add.form.error.required",
                                                        }),
                                                    },
                                                ],
                                            })(
                                                <Input
                                                    disabled={loading}
                                                    onChange={e => form.setFieldsValue({
                                                        button_color: e.target.value,
                                                    })}
                                                    placeholder={this.context.intl.formatMessage({
                                                        id:
                                                            "slider.add.form.btn.color",
                                                    })}
                                                />
                                            )}
                                        </FormItem>
                                        <FormItem
                                            label={this.context.intl.formatMessage({
                                                id:
                                                    "slider.add.form.logo.link",
                                            })}
                                        >
                                            {fieldDecorator("logo_media", {
                                                initialValue: split(get(initialData, "logo_media", ''), '/')[6],
                                            })(
                                                <LogoImage
                                                    url={constants.LOGO_URL}
                                                    uploadName={constants.UPLOAD_LOGO}
                                                    onChanges={value => form.setFieldsValue({
                                                        logo_media: value,
                                                    })}
                                                    currentImage={get(initialData, "logo_media", '')}
                                                />
                                            )}
                                        </FormItem>
                                        <FormItem
                                            label={this.context.intl.formatMessage({
                                                id: "slider.form.image",
                                            })}
                                        >
                                            {fieldDecorator("media_url", {
                                                initialValue: split(get(initialData, "media_url", ''), '/')[5],
                                            })(<SliderImage
                                                url={constants.IMAGE_URL}
                                                uploadName={constants.UPLOAD_SLIDER}
                                                onChanges={value => form.setFieldsValue({
                                                    media_url: value,
                                                })}
                                                currentImage={get(initialData, "media_url", '')}
                                            />)}
                                        </FormItem>
                                        <FormItem
                                            label={this.context.intl.formatMessage({
                                                id:
                                                    "slider.add.form.meta_media_url",
                                            })}
                                        >
                                            {fieldDecorator("meta_media_url", {
                                                initialValue: get(initialData, "meta_media_url", ""),
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
                                                id: "slider.form.mobileImage",
                                            })}
                                        >
                                            {fieldDecorator("mobile_media_url", {
                                                initialValue: split(get(initialData, "mobile_media_url", ''), '/')[6],
                                            })(<MobileImage
                                                url={constants.MOBILE_URL}
                                                uploadName={constants.MOBILE_SLIDER}
                                                onChanges={value => form.setFieldsValue({
                                                    mobile_media_url: value,
                                                })}
                                                currentImage={get(initialData, "mobile_media_url", '')}
                                            />)}
                                        </FormItem>
                                        <FormItem
                                            label={this.context.intl.formatMessage({
                                                id:
                                                    "slider.add.form.meta_mobile_media_url",
                                            })}
                                        >
                                            {fieldDecorator("meta_mobile_media_url", {
                                                initialValue: get(initialData, "meta_mobile_media_url", ""),
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
                                                id: "slider.add.form.submit",
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
        [formConstants.FORM, `${constants.SLIDER}_data_loading`],
        false
    ),
    initialData: state.getIn(
        [formConstants.FORM, `${constants.SLIDER}_data`, 'data'],
        false
    ),
    loading: state.getIn(
        [formConstants.FORM, `${constants.SLIDER}_loading`],
        false
    ),
});

export default connect(mapStateToProps)(toJS(Add));
