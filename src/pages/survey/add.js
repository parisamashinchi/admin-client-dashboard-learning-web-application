import React, {Component} from "react";
import {connect} from "react-redux";
import {toJS} from "hoc/toJsHoc";
import {Row, Col, Spin} from 'antd';
import get from "lodash/get";
import * as constants from "./constants";
import {createForm} from "containers/form/form";
import PropTypes from 'prop-types';
import FormItem from "components/uiElements/formItem";
import Input from "components/uiElements/textInput";
import Button from "components/uiElements/button";
import Style from './survey.style';
import * as formConstants from "containers/form/constants";

class Add extends Component {
    constructor(props, context) {
        super(props);
        this.addForm = createForm({
            name: constants.SURVEY,
            url: constants.SURVEY_URL,
            id: props.match.params.id,
        });
    }
    render() {
        const {
            loading,
            dataLoading,
            initialData,
        } = this.props;
        const Form = this.addForm;
        return (
            <Style>
                <Spin spinning={dataLoading}>
                    <Form>
                        {(fieldDecorator, handleSubmit, data, form) => {
                            return (
                                <Row>
                                    <Col className="first-item" span={11}>
                                        <FormItem
                                            label={this.context.intl.formatMessage({
                                                id: "survey.title",
                                            })}
                                        >
                                            {fieldDecorator("title", {
                                                initialValue: get(initialData, "title", ""),
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
                                                    "survey.url",
                                            })}
                                        >
                                            {fieldDecorator("url", {
                                                initialValue: get(initialData, "url", ""),
                                            })(
                                                <Input
                                                    disabled={loading}
                                                    onChange={e => form.setFieldsValue({
                                                        url: e.target.value,
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
                                                id: "package.add.form.submit",
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
        [formConstants.FORM, `${constants.SURVEY}_data_loading`],
        false
    ),
    initialData: state.getIn(
        [formConstants.FORM, `${constants.SURVEY}_data`, 'data'],
        false
    ),
    loading: state.getIn(
        [formConstants.FORM, `${constants.SURVEY}_loading`],
        false
    ),
});


export default connect(mapStateToProps)(toJS(Add));

