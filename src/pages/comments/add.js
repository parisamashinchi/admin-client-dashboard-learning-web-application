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
import Style from './comments.style';
import * as formConstants from "containers/form/constants";
import Select, {Option} from "components/uiElements/select";
import Checkbox from "components/uiElements/checkBox";
import map from "lodash/map";
import IntlMessages from "utils/intlMessages";
import * as actions from "./actions";
import {bindActionCreators} from "redux";
import isEmpty from 'lodash/isEmpty';

class Add extends Component {
    constructor(props, context) {
        super(props);
        const {push} = props;
        this.state ={
            student_profile_id: props.initialData.student_profile_id  ? props.initialData.student_profile_id : [],
            course_id: props.initialData.course_id ? props.initialData.course_id : [],
        }
        this.addForm = createForm({
            name: constants.COMMENTS,
            url: constants.COMMENTS_URL,
            id: props.match.params.id,
        });
    }
    componentDidMount() {
        const {getCommentData} = this.props;
        getCommentData();

    };
    componentWillReceiveProps(prevProps) {
        if (prevProps.initialData !== this.props.initialData) {
            this.setState({
                student_profile_id: prevProps.initialData.student_profile_id.name,
                course_id: prevProps.initialData.course_id.header_title,
            });
        }
    };
    changeStudents = (value, setData) => {
        setData({student_profile_id: value});
        this.setState({
            student_profile_id: value
        });
    };
    changeCourse = (value, setData) => {
        setData({course_id: value});
        this.setState({
            course_id: value
        });
    };
    onSearch = (value, type, key) => {
        const { getDataCommentByFilter } = this.props;
        getDataCommentByFilter(value, type, key);
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
            commentData,
            filteredData,
        } = this.props;
        const Form = this.addForm;
        return (
            <Style>
                <Spin spinning={dataLoading}>
                    <Form
                        extraData={{
                            course_id: this.state.course_id,
                            student_profile_id: this.state.student_profile_id
                        }}
                    >
                        {(fieldDecorator, handleSubmit, data, form) => {
                            return (
                                <Row>

                                    <Col className="first-item" span={11}>
                                        <FormItem
                                            label={this.context.intl.formatMessage({
                                                id:
                                                    "comments.list.student",
                                            })}
                                        >
                                            <Select
                                                value={this.state.student_profile_id}
                                                onSearch={(value) => this.onSearch(value, 'STUDENTS', 'filter[name]')}
                                                onChange={value => this.changeStudents(value,  form.setFieldsValue)}
                                                showArrow
                                                showSearch
                                                filterOption={false}
                                                notFoundContent={null}
                                                defaultActiveFirstOption={false}
                                            >
                                                {map(isEmpty(filteredData['STUDENTS'])
                                                    ? get(commentData, "STUDENT", "")
                                                    : filteredData['STUDENTS'], (item, index) => {
                                                    return  <Option
                                                        value={item.student_profile_id}
                                                        key={item.student_profile_id}
                                                    >
                                                        {item.name} => {item.mobile_number}
                                                    </Option>
                                                })}
                                            </Select>
                                        </FormItem>
                                        <FormItem
                                            label={this.context.intl.formatMessage({
                                                id:
                                                    "comments.list.course",
                                            })}>
                                            <Select
                                                value={this.state.course_id}
                                                onSearch={(value) => this.onSearch(value, 'COURSE', 'filter[header_title]')}// onChange={value => this.changeSeason(value, index, 'season_id', form.setFieldsValue)}
                                                onChange={value => this.changeCourse(value, form.setFieldsValue)}
                                                showArrow
                                                showSearch
                                                filterOption={false}
                                                notFoundContent={null}
                                                defaultActiveFirstOption={false}
                                                >
                                                {map(isEmpty(filteredData['COURSE'])
                                                    ? get(commentData, "COURSE", "")
                                                    : filteredData['COURSE'], (item, index) => {
                                                    return  <Option
                                                        value={item.id}
                                                        key={item.id}
                                                    >
                                                        {item.header_title}
                                                    </Option>
                                                })}
                                            </Select>
                                        </FormItem>
                                        <FormItem
                                            label={this.context.intl.formatMessage({
                                                id:
                                                    "comments.list.order",
                                            })}
                                        >
                                            {fieldDecorator("order", {
                                                initialValue: get(initialData, "order", ""),
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
                                                    "comments.list.content",
                                            })}
                                        >
                                            {fieldDecorator("content", {
                                                initialValue: get(initialData, "content", ""),
                                            })(
                                                <Input
                                                    disabled={loading}
                                                    onChange={e => form.setFieldsValue({
                                                        content: e.target.value,
                                                    })}

                                                />
                                            )}
                                        </FormItem>
                                        <FormItem>
                                            {fieldDecorator("is_published", {
                                                initialValue: get(initialData, "is_published", ""),
                                            })(
                                                <Checkbox
                                                    checked={this.state.is_published}
                                                    onChange={e => this.changeCheckbox(e, form)}
                                                >
                                                    <IntlMessages id="discount.form.is_published"/>
                                                </Checkbox>
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
        [formConstants.FORM, `${constants.COMMENTS}_data_loading`],
        false
    ),
    initialData: state.getIn(
        [formConstants.FORM, `${constants.COMMENTS}_data`, 'data'],
        false
    ),
    commentData: state.getIn(
        [ `${constants.COMMENTS}`, 'data', 'data'],
        false
    ),
    filteredData: state.getIn(
        [constants.COMMENTS, 'filtered'], {}
    ),
    loading: state.getIn(
        [formConstants.FORM, `${constants.COMMENTS}_loading`],
        false
    ),
});

const mapDispatchToProps = dispatch => {
    const {getCommentData, getDataCommentByFilter} = actions;
    return bindActionCreators({getCommentData, getDataCommentByFilter}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(toJS(Add));

