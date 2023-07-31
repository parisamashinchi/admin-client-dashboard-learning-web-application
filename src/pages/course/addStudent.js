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
import map from "lodash/map";
import isEmpty from "lodash/isEmpty";
import Select, { Option} from "components/uiElements/select";
import Input from "components/uiElements/textInput";
import * as actions from "../discount/actions";
import * as discountConstants from "../discount/constants";

import {bindActionCreators} from "redux";

class AddStudent extends Component {
    constructor(props, context) {
        super(props);
        this.state={
            mobile_number: [],
            type: 'free',
        }

        this.addForm = createForm({
            name: constants.STUDENT,
            url: constants.COURSE_URL + '/' + this.props.location.state + '/student_profile/access_manually/',
            id: props.match.params.id,
            title: context.intl.formatMessage({
                id: "course.new.student"
            }),
        });
    }
    componentDidMount() {
        const {getStudents} = this.props;
        getStudents();
    };
    onSearch = (value, type, key) => {
        const { getStudentsByFilter } = this.props;
        getStudentsByFilter(value, type, key);
    };
    changeStudents = (value, setData) => {
        setData({mobile_number: value});
        this.setState({
            mobile_number: value
        });
    };
    changeSource = (value, setData) => {
        setData({type: value});
        this.setState({
            type: value
        });
    };
    render() {
        const {
            loading,
            dataLoading,
            studentData,
            filteredData,
        } = this.props;
        const Form = this.addForm;
        const degree = [
            'free',
            'non_degree',
            'with_degree',
        ]
        return (
            <Style>
                <Spin spinning={dataLoading}>
                    <Form extraData={{
                        mobile_number: this.state.mobile_number,
                        type: this.state.type
                    }}>
                        {(fieldDecorator, handleSubmit, data, form) => {
                            return (
                                <Row>
                                    <Col className="form-col" span={24} md={{span: 14}}>
                                        <FormItem
                                            label={this.context.intl.formatMessage({
                                                id:
                                                    "course.student.list.mobile",
                                            })}
                                        >
                                            <Select
                                                 value={this.state.mobile_number}
                                                 onSearch={(value) => this.onSearch(value, 'STUDENTS', 'filter[mobile_number]')}
                                                 onChange={value => this.changeStudents(value,  form.setFieldsValue)}
                                                showArrow
                                                showSearch
                                                filterOption={false}
                                                notFoundContent={null}
                                                defaultActiveFirstOption={false}
                                            >
                                                {map(isEmpty(filteredData['STUDENTS'])
                                                    ? get(studentData, "STUDENT", "")
                                                    : filteredData['STUDENTS'], (item, index) => {
                                                    return  <Option
                                                        value={item.mobile_number}
                                                        key={item.mobile_number}
                                                    >
                                                        {item.name} => {item.mobile_number}
                                                    </Option>
                                                })}
                                            </Select>
                                        </FormItem>
                                        <FormItem
                                            label={this.context.intl.formatMessage({
                                                id:
                                                    "course.student.list.degree",
                                            })}
                                        >
                                            <Select
                                                value={this.state.type}
                                                onChange={value => this.changeSource(value,  form.setFieldsValue)}
                                                showArrow
                                            >
                                                {map(degree, (item) => (
                                                    <Option
                                                        value={item}
                                                        key={item}
                                                    >
                                                        {item}
                                                    </Option>
                                                ))}
                                            </Select>
                                        </FormItem>
                                        <FormItem
                                            label={this.context.intl.formatMessage({
                                                id:
                                                    "course.student.list.price",
                                            })}
                                        > {fieldDecorator("price")(
                                                <Input
                                                    disabled={loading}
                                                    onChange={e => form.setFieldsValue({
                                                        price: e.target.value,
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
                </Spin>
            </Style>
        );
    }
}

AddStudent.contextTypes = {
    intl: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    dataLoading: state.getIn(
        [formConstants.FORM, `${constants.COURSE}_data_loading`],
        false
    ),
    loading: state.getIn(
        [formConstants.FORM, `${constants.COURSE}_loading`],
        false
    ),
    studentData: state.getIn(
        [discountConstants.DISCOUNT, 'data'],
        {}
    ),
    filteredData: state.getIn(
        [discountConstants.DISCOUNT, 'filtered'],
        {}
    ),
});
const mapDispatchToProps = dispatch => {
    const {getStudents, getStudentsByFilter} = actions;
    return bindActionCreators({getStudents, getStudentsByFilter}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(toJS(AddStudent));
