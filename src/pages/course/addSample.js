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

class AddSample extends Component {
    constructor(props, context) {
        super(props);
        this.addForm = createForm({
            name: constants.SAMPLE,
            url: constants.COURSE_URL + '/' + this.props.location.state + '/user_sample',
            id: props.match.params.id,
            title: context.intl.formatMessage({
                id: "course.sample.add"
            }),
        });
        this.mediaImage = createUpload(constants.MEDIA_UPLOADER);
        this.mediaMobileImage = createUpload(constants.MEDIA_MOBILE_UPLOADER);
    }

    render() {
        const {
            loading,
            initialData,
        } = this.props;
        const Form = this.addForm;
        const MediaImage = this.mediaImage;
        const MediaMobileImage = this.mediaMobileImage;
        return (
            <Style>
                <Form >
                        {(fieldDecorator, handleSubmit, data, form) => {
                            return (
                                <Row>
                                    <Col className="form-col" span={24} md={{span: 14}}>
                                        <FormItem
                                            label={this.context.intl.formatMessage({
                                                id:
                                                    "sample.list.title",
                                            })}
                                        >   {fieldDecorator("title", {
                                            initialValue: initialData.title,
                                        })(
                                                <Input
                                                    disabled={loading}
                                                    onChange={e => form.setFieldsValue({
                                                        title: e.target.value,
                                                    })}
                                                />
                                        )}
                                        </FormItem>
                                        <FormItem
                                            label={this.context.intl.formatMessage({
                                                id:
                                                    "sample.list.name",
                                            })}
                                        >   {fieldDecorator("name", {
                                            initialValue: initialData.name,
                                        })(
                                            <Input
                                                disabled={loading}
                                                onChange={e => form.setFieldsValue({
                                                    name: e.target.value,
                                                })}
                                            />
                                        )}
                                        </FormItem>
                                        <FormItem
                                            label={this.context.intl.formatMessage({
                                                id:
                                                    "sample.list.family",
                                            })}
                                        >   {fieldDecorator("family", {
                                            initialValue: initialData.family,
                                        })(
                                            <Input
                                                disabled={loading}
                                                onChange={e => form.setFieldsValue({
                                                    family: e.target.value,
                                                })}
                                            />
                                        )}
                                        </FormItem>
                                        <FormItem
                                            label={this.context.intl.formatMessage({
                                                id:
                                                    "sample.list.order",
                                            })}
                                        >   {fieldDecorator("order", {
                                            initialValue: initialData.order,
                                        })(
                                            <Input
                                                disabled={loading}
                                                onChange={e => form.setFieldsValue({
                                                    order: e.target.value,
                                                })}
                                            />
                                        )}
                                        </FormItem>
                                        <FormItem
                                            label={this.context.intl.formatMessage({
                                                id:
                                                    "sample.list.finished_at",
                                            })}
                                        >  {fieldDecorator("finished_at", {
                                            initialValue: initialData.finished_at,
                                        })(
                                            <Input
                                                disabled={loading}
                                                onChange={e => form.setFieldsValue({
                                                    finished_at: e.target.value,
                                                })}
                                            />
                                        )}
                                        </FormItem>
                                        <FormItem label="mediaUrl">
                                            {fieldDecorator("media_url", {
                                                initialValue: split(get(initialData, "media_url", ''), '/')[6],
                                                rules: [
                                                    {
                                                        required: true,
                                                        message: this.context.intl.formatMessage({
                                                            id:
                                                                "course.add.form.error.required",
                                                        }),
                                                    },
                                                ],
                                            })(<MediaImage
                                                url={constants.MEDIA_URL}
                                                uploadName={constants.MEDIA}
                                                onChanges={value => form.setFieldsValue({
                                                    media_url: value,
                                                })}
                                                currentImage={get(initialData, "media_url", '')}
                                            />)}
                                        </FormItem>
                                        <FormItem label="media_url_mobile">
                                            {fieldDecorator("media_url_mobile", {
                                                initialValue: split(get(initialData, "media_url_mobile", ''), '/')[7],
                                                rules: [
                                                    {
                                                        required: true,
                                                        message: this.context.intl.formatMessage({
                                                            id:
                                                                "course.add.form.error.required",
                                                        }),
                                                    },
                                                ],
                                            })(<MediaMobileImage
                                                url={constants.MEDIA_MOBILE_URL}
                                                uploadName={constants.MEDIA_MOBILE}
                                                onChanges={value => form.setFieldsValue({
                                                    media_url_mobile: value,
                                                })}
                                                currentImage={get(initialData, "media_url_mobile", '')}
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

AddSample.contextTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(toJS(AddSample));
