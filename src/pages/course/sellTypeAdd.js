import React, {Component} from "react";
import {connect} from "react-redux";
import {toJS} from "hoc/toJsHoc";
import {Row, Col, Spin, Icon} from "antd";
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
import Select, {SelectMultiple, Option} from "components/uiElements/select";
import * as formConstants from "containers/form/constants";
import Style from './course.style';
import map from 'lodash/map';

class SellTypeAdd extends Component {
    constructor(props, context) {
        super(props);
        this.state = {
            is_published: false
        };
        this.addForm = createForm({
            name: constants.COURSE_SELL_TYPE,
            url: `${constants.COURSE_URL}/${props.match.params.courseId}/course_sell_type`,
            id: props.match.params.id,
            title: context.intl.formatMessage({
                id: "course.add.title",
            }),
        });
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
        const {
            loading,
            dataLoading,
            initialData,
        } = this.props;
        const saleTypes = [
            'with_degree',
            'extended_with_degree',
            'non_degree',
            'free',
        ];
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
                                                    "exam.add.form.name",
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
                                                                "exam.add.form.error.required",
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
                                                            "exam.add.form.name",
                                                    })}
                                                />
                                            )}
                                        </FormItem>
                                        <FormItem
                                            label={this.context.intl.formatMessage({
                                                id: "course.form.type",
                                            })}
                                        >
                                            {fieldDecorator("type", {
                                                initialValue: get(initialData, "type", ''),
                                            })(
                                                <Select
                                                    placeholder={this.context.intl.formatMessage({
                                                        id: "course.form.type",
                                                    })}
                                                    value={initialData.type}
                                                    onChange={value => form.setFieldsValue({
                                                        type: value,
                                                    })}
                                                    showArrow
                                                >
                                                    {map(saleTypes, (item) => (
                                                        <Option
                                                            value={item}
                                                            key={item}
                                                        >
                                                            <IntlMessages id={item}/>
                                                        </Option>
                                                    ))}
                                                </Select>
                                            )}
                                        </FormItem>
                                        <FormItem
                                            label={this.context.intl.formatMessage({
                                                id:
                                                    "exam.add.form.description",
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
                                        <FormItem
                                            label={this.context.intl.formatMessage({
                                                id: "course.form.price",
                                            })}
                                        >
                                            {fieldDecorator("price", {
                                                initialValue: get(initialData, "price", 0),
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
                                                id:
                                                    "exam.add.form.properties",
                                            })}
                                        >
                                            {fieldDecorator("properties", {
                                                initialValue: get(initialData, "properties", "")
                                            })(
                                                <TextArea
                                                    onChange={e => form.setFieldsValue({
                                                        properties: e.target.value,
                                                    })}
                                                    placeholder={this.context.intl.formatMessage({
                                                        id:
                                                            "exam.add.form.properties",
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
                                                    <IntlMessages id="exam.form.is_published"/>
                                                </Checkbox>
                                            )}
                                        </FormItem>
                                    <Col span={24} style={{display: "flex", marginTop: "30px"}}>
                                        <Button
                                            className="btn btn-primary shadow-2"
                                            type="primary"
                                            onClick={handleSubmit}
                                            loading={loading}
                                        >
                                            {this.context.intl.formatMessage({
                                                id: "submit",
                                            })}
                                        </Button>
                                    </Col>
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

SellTypeAdd.contextTypes = {
    intl: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    dataLoading: state.getIn(
        [formConstants.FORM, `${constants.COURSE}_data_loading`],
        false
    ),
    initialData: state.getIn(
        [formConstants.FORM, `${constants.COURSE_SELL_TYPE}_data`, 'data'],
        false
    ),
    loading: state.getIn(
        [formConstants.FORM, `${constants.COURSE}_loading`],
        false
    ),
});


export default connect(mapStateToProps)(toJS(SellTypeAdd));
