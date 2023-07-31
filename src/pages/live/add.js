import React, {Component} from "react";
import {connect} from "react-redux";
import {toJS} from "hoc/toJsHoc";
import {Row, Col} from "antd";
import * as constants from "./constants";
import {createForm} from "containers/form/form";
import PropTypes from 'prop-types';
import FormItem from "components/uiElements/formItem";
import Button from "components/uiElements/button";
import * as formConstants from "containers/form/constants";
import Style from './live.style';
import Input from "components/uiElements/textInput";

class Add extends Component {
    constructor(props, context) {
        super(props);
        this.addForm = createForm({
            name: constants.LIVE,
            url: '/admin/live',
            id: props.match.params.id,
            title: context.intl.formatMessage({
                id: "live.add"
            }),
        });
    }

    render() {
        const {loading, initialData} = this.props;
        const Form = this.addForm;
        return (
            <Style>
                <Row>
                    <Form >
                        {(fieldDecorator, handleSubmit, data, form) => {
                            return (
                                <Row>
                                    <Col className="form-col" span={24} md={{span: 18}}>

                                        <FormItem
                                            label={this.context.intl.formatMessage({
                                                id:
                                                    "live.title",
                                            })}
                                        >
                                            {fieldDecorator("title", {
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
                                                    "live.url",
                                            })}
                                        >
                                            {fieldDecorator("url" , {
                                            initialValue: initialData.url,
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
                                                id: "discount.add.form.submit",
                                            })}
                                        </Button>
                                    </Col>

                                </Row>
                            );
                        }}
                    </Form>
                </Row>
            </Style>
        );
    }
}

Add.contextTypes = {
    intl: PropTypes.object.isRequired
};
const mapStateToProps = state => ({

    loading: state.getIn(
        [formConstants.FORM, `${constants.LIVE}_loading`],
        false
    ),

    initialData: state.getIn(
        [formConstants.FORM, `${constants.LIVE}_data`, 'data'],
        false
    )
});

export default connect(mapStateToProps)(toJS(Add));
