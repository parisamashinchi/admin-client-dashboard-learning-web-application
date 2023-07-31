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
import Style from './video.style';
import split from 'lodash/split';

class Add extends Component {
    constructor(props, context) {
        super(props);
        this.state = {
            is_published: false,
            is_free: false,
        };
        this.addForm = createForm({
            name: constants.VIDEO,
            url: constants.VIDEO_URL,
            id: props.match.params.id,
            title: context.intl.formatMessage({
                id: "video.add.title",
            }),
        });
        this.videoAttachment = createUpload(constants.ATTACHMENT_UPLOADER);
    }

    componentWillReceiveProps(prevProps) {
        if (prevProps.initialData !== this.props.initialData) {
            this.setState({
                is_published: prevProps.initialData.is_published,
                is_free: prevProps.initialData.is_free,
                show_link: prevProps.initialData.is_link,

            });
        }
    };

    changeis_free = (e, form) => {
        this.setState({
            is_free: e.target.checked
        });
        form.setFieldsValue({
            is_free: e.target.checked,
        });
    };
    changeAttach= (e, form) => {
        this.setState({
            show_link: e.target.checked
        });
        form.setFieldsValue({
            show_link: e.target.checked,
        });
    };

    changeis_published = (e, form) => {
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
        const VideoAttachment = this.videoAttachment;
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
                                                    "video.add.form.name",
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
                                                                "video.add.form.error.required",
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
                                                            "video.add.form.name",
                                                    })}
                                                />
                                            )}
                                        </FormItem>
                                        <FormItem
                                            label={this.context.intl.formatMessage({
                                                id:
                                                    "video.add.form.videoURL",
                                            })}
                                        >
                                            {fieldDecorator("arvan_uuid", {
                                                initialValue: get(initialData, "arvan_uuid", ""),
                                            })(
                                                <Input
                                                    disabled={loading}
                                                    onChange={e => form.setFieldsValue({
                                                        name: e.target.arvan_uuid,
                                                    })}
                                                    placeholder={this.context.intl.formatMessage({
                                                        id:
                                                            "video.add.form.videoURL",
                                                    })}
                                                />
                                            )}
                                        </FormItem>
                                        <FormItem
                                            label={this.context.intl.formatMessage({
                                                id:
                                                    "video.add.form.description",
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
                                        <FormItem>
                                            {fieldDecorator("is_free", {
                                                initialValue: get(initialData, "is_free", false),
                                            })(
                                                <Checkbox
                                                    checked={this.state.is_free}
                                                    onChange={e => this.changeis_free(e, form)}
                                                >
                                                    <IntlMessages id="video.form.is_free"/>
                                                </Checkbox>
                                            )}
                                        </FormItem>
                                        <FormItem>
                                            {fieldDecorator("is_published", {
                                                initialValue: get(initialData, "is_published", false),
                                            })(
                                                <Checkbox
                                                    checked={this.state.is_published}
                                                    onChange={e => this.changeis_published(e, form)}
                                                >
                                                    <IntlMessages id="video.form.is_published"/>
                                                </Checkbox>
                                            )}
                                        </FormItem>
                                        {/*<FormItem*/}
                                            {/*label={this.context.intl.formatMessage({*/}
                                                {/*id: "video.form.video",*/}
                                            {/*})}*/}
                                        {/*>*/}
                                            {/*{fieldDecorator("media_url", {*/}
                                                {/*initialValue: split(get(initialData, "media_url", ''), '/')[5],*/}
                                            {/*})(<Video*/}
                                                {/*url={constants.VIDEO_FILE_URL}*/}
                                                {/*uploadName={constants.UPLOAD_VIDEO}*/}
                                                {/*onChanges={value => form.setFieldsValue({*/}
                                                    {/*media_url: value,*/}
                                                {/*})}*/}
                                            {/*/>)}*/}
                                        {/*</FormItem>*/}

                                        <Checkbox
                                            checked={this.state.show_link}
                                            onChange={e => this.changeAttach(e, form)}
                                        >
                                            <IntlMessages id="video.form.link"/>
                                        </Checkbox>
                                        {this.state.show_link
                                            ? <FormItem
                                                label={this.context.intl.formatMessage({
                                                    id:
                                                        "video.add.form.videoURL",
                                                })}
                                            >
                                                {fieldDecorator("attachment_url", {
                                                    initialValue: get(initialData, "attachment_url", ""),
                                                })(
                                                    <Input
                                                        disabled={loading}
                                                        onChange={e => form.setFieldsValue({
                                                            attachment_url: e.target.value,
                                                        })}
                                                        placeholder={this.context.intl.formatMessage({
                                                            id:
                                                                "video.form.attachment",
                                                        })}
                                                    />
                                                )}
                                            </FormItem>
                                            : <FormItem
                                                label={this.context.intl.formatMessage({
                                                    id: "video.form.attachment",
                                                })}
                                            >
                                                {fieldDecorator("attachment_url", {
                                                    initialValue: split(get(initialData, "attachment_url", ''), '/')[6],
                                                })(<VideoAttachment
                                                    url={constants.ATTACHMENTFILE_URL}
                                                    uploadName={constants.UPLOAD_ATTACHMENT}
                                                    onChanges={value => form.setFieldsValue({
                                                        attachment_url: value,
                                                    })}
                                                    currentImage={get(initialData, "attachment_url", '')}
                                                />)}
                                            </FormItem>
                                        }
                                    </Col>
                                    <Col span={24} style={{display: "flex", marginTop: "30px"}}>
                                        <Button
                                            className="btn btn-primary shadow-2"
                                            type="primary"
                                            onClick={handleSubmit}
                                            loading={loading}
                                        >
                                            {this.context.intl.formatMessage({
                                                id: "video.add.form.submit",
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
        [formConstants.FORM, `${constants.VIDEO}_data_loading`],
        false
    ),
    initialData: state.getIn(
        [formConstants.FORM, `${constants.VIDEO}_data`, 'data'],
        false
    ),
    loading: state.getIn(
        [formConstants.FORM, `${constants.VIDEO}_loading`],
        false
    ),
});

export default connect(mapStateToProps)(toJS(Add));
