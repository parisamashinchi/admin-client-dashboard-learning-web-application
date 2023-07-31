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
import Style from './teacher.style';
import split from 'lodash/split';

class Add extends Component {
    constructor(props, context) {
        super(props);
        this.addForm = createForm({
            name: constants.TEACHER,
            url: constants.TEACHER_URL,
            id: props.match.params.id,
            title: context.intl.formatMessage({
                id: "teacher.add.title",
            }),
        });
        this.teacherImage = createUpload(constants.FILE_UPLOADER);
        this.teacherImageMobile = createUpload(constants.FILE_UPLOADER_MOBILE);
    }

    render() {
        const {loading, dataLoading, initialData} = this.props;
        const Form = this.addForm;
        const ParallelImage = this.teacherImage;
        const ParallelImageMobile = this.teacherImageMobile;
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
                                                    "teacher.add.form.name",
                                            })}
                                        >
                                            {fieldDecorator("name", {
                                                initialValue: get(initialData, "name", ""),
                                                rules: [
                                                    {
                                                        required: true,
                                                        type: "string",
                                                        message: this.context.intl.formatMessage({
                                                            id:
                                                                "teacher.add.form.error.required",
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
                                                            "teacher.add.form.name",
                                                    })}
                                                />
                                            )}
                                        </FormItem>
                                        <FormItem
                                            label={this.context.intl.formatMessage({
                                                id: "teacher.form.mobileNumber",
                                            })}
                                        >
                                            {fieldDecorator("mobile_number", {
                                                initialValue: get(initialData, "mobile_number", ''),
                                                rules: [
                                                    {
                                                        required: true,
                                                        type: "string",
                                                        message: this.context.intl.formatMessage({
                                                            id:
                                                                "teacher.add.form.error.required",
                                                        }),
                                                    },
                                                ],
                                            })(
                                                <Input
                                                    disabled={loading}
                                                    type="number"
                                                    min="1"
                                                />
                                            )}
                                        </FormItem>
                                        <FormItem
                                            label={this.context.intl.formatMessage({
                                                id: "teacher.form.role",
                                            })}
                                        >
                                            {fieldDecorator("role", {
                                                initialValue: get(initialData, "role", ""),
                                            })(
                                                <Input
                                                    disabled={loading}
                                                />
                                            )}
                                        </FormItem>
                                        <FormItem
                                            label={this.context.intl.formatMessage({
                                                id:
                                                    "teacher.add.form.bio",
                                            })}
                                        >
                                            {fieldDecorator("bio", {
                                                initialValue: get(initialData, "bio", ""),
                                            })(
                                                <TextArea
                                                    disabled={loading}
                                                    placeholder={this.context.intl.formatMessage({
                                                        id: "teacher.add.form.bio",
                                                    })}
                                                />
                                            )}
                                        </FormItem>
                                        <FormItem
                                            label={this.context.intl.formatMessage({
                                                id: "teacher.form.profile",
                                            })}
                                        >
                                            {fieldDecorator("profile_media", {
                                                initialValue: split(get(initialData, "profile_media", ''), '/')[6],
                                                rules: [
                                                    {
                                                        required: true,
                                                        type: "string",
                                                        message: this.context.intl.formatMessage({
                                                            id:
                                                                "teacher.add.form.error.required",
                                                        }),
                                                    },
                                                ],
                                            })(<ParallelImage
                                                url={constants.IMAGE_URL}
                                                uploadName={constants.UPLOAD_TEACHER}
                                                onChanges={value => form.setFieldsValue({
                                                    profile_media: value,
                                                })}
                                                currentImage={get(initialData, "profile_media", '')}
                                            />)}
                                        </FormItem>
                                        <FormItem
                                            label={this.context.intl.formatMessage({
                                                id: "teacher.form.profile.mobile",
                                            })}
                                        >
                                            {fieldDecorator("mobile_profile_media", {
                                                initialValue: split(get(initialData, "mobile_profile_media", ''), '/')[6],
                                                rules: [
                                                    {
                                                        required: true,
                                                        type: "string",
                                                        message: this.context.intl.formatMessage({
                                                            id:
                                                                "teacher.add.form.error.required",
                                                        }),
                                                    },
                                                ],
                                            })(<ParallelImageMobile
                                                url={constants.IMAGE_URL_MOBILE}
                                                uploadName={constants.UPLOAD_TEACHER_MOBILE}
                                                onChanges={value => form.setFieldsValue({
                                                    mobile_profile_media: value,
                                                })}
                                                currentImage={get(initialData, "mobile_profile_media", '')}
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
                                                id: "teacher.add.form.submit",
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
        [formConstants.FORM, `${constants.TEACHER}_data_loading`],
        false
    ),
    initialData: state.getIn(
        [formConstants.FORM, `${constants.TEACHER}_data`, 'data'],
        false
    ),
    loading: state.getIn(
        [formConstants.FORM, `${constants.TEACHER}_loading`],
        false
    ),
});

export default connect(mapStateToProps)(toJS(Add));
