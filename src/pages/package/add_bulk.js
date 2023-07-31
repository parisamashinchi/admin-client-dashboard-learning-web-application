import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from 'redux';
import {toJS} from "hoc/toJsHoc";
import {Row, Col, Spin, Icon} from 'antd';
import get from "lodash/get";
import remove from "lodash/remove";
import isEmpty from "lodash/isEmpty";
import Checkbox from "components/uiElements/checkBox";
import IntlMessages from "utils/intlMessages";
import * as constants from "./constants";
import {createForm} from "containers/form/form";
import PropTypes from 'prop-types';
import FormItem from "components/uiElements/formItem";
import Input from "components/uiElements/textInput";
import Button from "components/uiElements/button";
import Select, {SelectMultiple, Option} from "components/uiElements/select";
import * as formConstants from "containers/form/constants";
import * as actions from "./actions";
import Style from './package.style';
import map from 'lodash/map';

class Add_bulk extends Component {
    constructor(props, context) {
        super(props);
        this.state = {
            typeList: '',
            sortData: [],
            type: 'percent',
            sources: props.initialData.sources ? props.initialData.sources : [{weight: null}],
            students: props.initialData.students ? props.initialData.students : [{}],
        };
        this.addForm = createForm({
            name: constants.DISCOUNT,
            url: constants.DISCOUNT_URL_BULK,
            id: props.match.params.id,
            title: context.intl.formatMessage({
                id: "discount.add.title",
            }),
        });
    }

    componentDidMount() {
        const {getStudents} = this.props;
        getStudents();

    };

    componentWillReceiveProps(prevProps) {
        // if (prevProps.initialData !== this.props.initialData) {
        //     this.setState({
        //         sources: prevProps.initialData.sources,
        //         students: prevProps.initialData.students,
        //         is_published: prevProps.initialData.is_published,
        //     });
        // }
    };

    changeTypes = (value) =>{
        this.setState({
            type: value
        })
    }
    changeCheckbox = (e, form) => {
        this.setState({
            is_published: e.target.checked
        });
        form.setFieldsValue({
            is_published: e.target.checked,
        });
    };

    changeSource = (value, index, type, setData) => {
        let changedShit = this.state.sources;

        const selectedAn = changedShit[index];
        delete selectedAn[type];
        changedShit[index] = {[type]: value, ...changedShit[index]};
        setData({sources: changedShit});
        this.setState({
            sources: changedShit
        });
    };

    changeStudents = (value, index, type, setData) => {
        let changedShit = this.state.students;
        const selectedAn = changedShit[index];
        delete selectedAn[type];
        changedShit[index] = {[type]: value, ...changedShit[index]};
        setData({students: changedShit});
        this.setState({
            students: changedShit
        });

    };

    removeItem = id => {
        const updatedList = this.state.sources;
        remove(updatedList, function (n, i) {
            return i === id;
        });
        this.setState({sources: updatedList});
    };

    removeStudents = id => {
        const updatedList = this.state.students;
        remove(updatedList, function (n, i) {
            return i === id;
        });
        this.setState({students: updatedList});
    };
    onSearch = (value, type, key) => {
        const { getStudentsByFilter } = this.props;
        getStudentsByFilter(value, type, key);
    };

    render() {
        const {
            loading,
            dataLoading,
            initialData,
            discountData,
            filteredData,
        } = this.props;
        const Form = this.addForm;
        const types = [
            'percent',
            'const',
        ];
        const source_type = [
            'COURSE',
            'CATEGORY',
        ];
        return (
            <Style>
                <Spin spinning={dataLoading}>
                    <Form extraData={{
                        sources: this.state.sources,
                        students_ids: this.state.students
                    }}>
                        {(fieldDecorator, handleSubmit, data, form) => {
                            return (
                                <Row>
                                    <Col className="form-col" span={18}>
                                        <FormItem
                                            label={this.context.intl.formatMessage({
                                                id:
                                                    "discount.list.count",
                                            })}
                                        >
                                            {fieldDecorator("count", {
                                                initialValue: get(initialData, "count", ""),
                                            })(
                                                <Input
                                                    disabled={loading}
                                                    onChange={e => form.setFieldsValue({
                                                        count: e.target.value,
                                                    })}
                                                    placeholder={this.context.intl.formatMessage({
                                                        id:
                                                            "discount.list.count",
                                                    })}
                                                />
                                            )}
                                        </FormItem>
                                        <FormItem
                                            label={this.context.intl.formatMessage({
                                                id:
                                                    "discount.list.seed",
                                            })}
                                        >
                                            {fieldDecorator("seed", {
                                                initialValue: get(initialData, "seed", ""),
                                            })(
                                                <Input
                                                    disabled={loading}
                                                    onChange={e => form.setFieldsValue({
                                                        seed: e.target.value,
                                                    })}
                                                    placeholder={this.context.intl.formatMessage({
                                                        id:
                                                            "discount.list.seed",
                                                    })}
                                                />
                                            )}
                                        </FormItem>
                                        <FormItem
                                            label={this.context.intl.formatMessage({
                                                id:
                                                    "discount.list.value",
                                            })}
                                        >
                                            {fieldDecorator("value", {
                                                initialValue: get(initialData, "value", ""),
                                            })(
                                                <Input
                                                    disabled={loading}
                                                    onChange={e => form.setFieldsValue({
                                                        value: e.target.value,
                                                    })}
                                                    placeholder={this.context.intl.formatMessage({
                                                        id:
                                                            "discount.list.value",
                                                    })}
                                                />
                                            )}
                                        </FormItem>
                                        <FormItem
                                            label={this.context.intl.formatMessage({
                                                id:
                                                    "discount.list.type",
                                            })}
                                        >
                                            {fieldDecorator("type", {
                                                initialValue: get(initialData, "type", ""),
                                            })(
                                            <Select
                                                placeholder={this.context.intl.formatMessage({
                                                    id: "discount.list.type",
                                                })}
                                                value={this.state.type}
                                                onChange={value => this.changeTypes(value, 'type', form.setFieldsValue)}
                                                showArrow
                                            >
                                                {map(types, (item) => (
                                                    <Option
                                                        value={item}
                                                        key={item}
                                                    >
                                                        {item}
                                                    </Option>
                                                ))}
                                            </Select>
                                            )}
                                        </FormItem>
                                        <FormItem
                                            label={this.context.intl.formatMessage({
                                                id:
                                                    "discount.list.expired_at",
                                            })}
                                        >
                                            {fieldDecorator("expired_at", {
                                                initialValue: get(initialData, "expired_at", ""),
                                            })(
                                                <Input
                                                    disabled={loading}
                                                    onChange={e => form.setFieldsValue({
                                                        expired_at: e.target.value,
                                                    })}
                                                    placeholder="1398/12/29"
                                                />
                                            )}
                                        </FormItem>
                                        <FormItem
                                            label={this.context.intl.formatMessage({
                                                id:
                                                    "discount.list.threshold",
                                            })}
                                        >
                                            {fieldDecorator("threshold", {
                                                initialValue: get(initialData, "threshold", ""),
                                            })(
                                                <Input
                                                    disabled={loading}
                                                    onChange={e => form.setFieldsValue({
                                                        threshold: e.target.value,
                                                    })}
                                                    placeholder={this.context.intl.formatMessage({
                                                        id: "discount.list.threshold",
                                                    })}
                                                />
                                            )}
                                        </FormItem>

                                        {
                                            <span>
                                                    {map(this.state.sources, (k, index) => (
                                                        <span>
                                                            <div className="wrapper">
                                                                <Col className="first-item" span={11}>
                                                                    <FormItem
                                                                        label={this.context.intl.formatMessage({
                                                                            id:
                                                                                "discount.list.source_type",
                                                                        })}
                                                                    >
                                                                        <Select
                                                                            placeholder={this.context.intl.formatMessage({
                                                                                id: "discount.list.source_type",
                                                                            })}
                                                                            value={this.state.sources[index].source_type}
                                                                            onChange={value => this.changeSource(value, index, 'source_type', form.setFieldsValue)}
                                                                            showArrow
                                                                        >
                                                                            {map(source_type, (item) => (
                                                                                <Option
                                                                                    value={item}
                                                                                    key={item}
                                                                                >
                                                                                   {item}
                                                                                </Option>
                                                                            ))}
                                                                        </Select>
                                                                </FormItem>
                                                                </Col>
                                                                <Col span={11}>
                                                                    <FormItem
                                                                        label={this.context.intl.formatMessage({
                                                                            id:
                                                                                "discount.list.source_id",
                                                                        })}
                                                                    >
                                                                          <Select
                                                                              showSearch
                                                                              placeholder={this.context.intl.formatMessage({
                                                                                  id: "discount.list.source_id",
                                                                              })}
                                                                              value={this.state.sources[index].source_id}
                                                                              onSearch={(value) => this.onSearch(value, this.state.sources[index].source_type, 'filter[title]')}
                                                                              onChange={value => this.changeSource(value, index, 'source_id', value => form.setFieldsValue({
                                                                                  sources: value,
                                                                              }))}
                                                                              defaultActiveFirstOption={false}
                                                                              showArrow={false}
                                                                              filterOption={false}
                                                                              notFoundContent={null}
                                                                          >
                                                                            {map(isEmpty(filteredData[this.state.sources[index].source_type]) ? discountData[this.state.sources[index].source_type] : filteredData[this.state.sources[index].source_type], (item, i) => {
                                                                                return <Option
                                                                                    value={item.id}
                                                                                    key={item.id}
                                                                                >

                                                                                    {this.state.sources[index].source_type === 'COURSE'
                                                                                        ? item.header_title
                                                                                        : item.title
                                                                                    }

                                                                                </Option>
                                                                            })}
                                                                        </Select>
                                                                    </FormItem>
                                                                </Col>
                                                            </div>
                                                            <Col span={24}>
                                                                {this.state.sources.length > 0 ? (
                                                                    <Button
                                                                        className="remove-button"
                                                                        onClick={() => this.removeItem(index)}>
                                                                        <Icon
                                                                            type="minus-circle-o"
                                                                        />
                                                                    </Button>
                                                                ) : null}
                                                            </Col>
                                                    </span>
                                                    ))}
                                                <Button type="dashed"
                                                        onClick={() => this.setState({
                                                            sources: [...this.state.sources, {weight: null}]
                                                        })}
                                                        style={{width: '60%'}}>
                                                <Icon type="plus"/> Add field
                                            </Button>
                                            </span>
                                        }
                                        {
                                            <span>
                                                {map(this.state.students, (k, index) => (
                                                    <span>
                                                            <div className="wrapper">
                                                                <Col className="first-item" span={11}>
                                                                    <FormItem>
                                                                        <Select
                                                                            showSearch
                                                                            placeholder={this.context.intl.formatMessage({
                                                                                id: "course.student.list",
                                                                            })}
                                                                            value={this.state.students[index].student_profile_id}
                                                                            onSearch={(value) => this.onSearch(value, 'STUDENT', 'filter[header_title]')}
                                                                            onChange={value => this.changeStudents(value, index, 'student_profile_id', form.setFieldsValue)}
                                                                            defaultActiveFirstOption={false}
                                                                            showArrow={true}
                                                                            filterOption={false}
                                                                            notFoundContent={null}
                                                                        >
                                                                              {map(discountData['STUDENT'], item => (
                                                                                    <Option
                                                                                        value={item.student_profile_id}
                                                                                        key={item.student_profile_id}
                                                                                    >
                                                                                        {item.name}
                                                                                    </Option>
                                                                                ))}
                                                                        </Select>
                                                                    </FormItem>
                                                                </Col>
                                                                <Col span={11}>
                                                                    <FormItem>
                                                                        <Input
                                                                            placeholder="seed"
                                                                            onChange={e => this.changeStudents(e.target.value, index, 'seed', value => form.setFieldsValue({
                                                                                students: value,
                                                                            }))}
                                                                            value={this.state.students[index].seed}
                                                                        />
                                                                    </FormItem>
                                                                </Col>
                                                            </div>
                                                            <Col span={24}>
                                                                {this.state.students.length > 0 ? (
                                                                    <Button
                                                                        className="remove-button"
                                                                        onClick={() => this.removeStudents(index)}>
                                                                        <Icon
                                                                            type="minus-circle-o"
                                                                        />
                                                                    </Button>
                                                                ) : null}
                                                            </Col>
                                                    </span>
                                                ))}
                                                <Button type="dashed"
                                                        onClick={() => this.setState({
                                                            students: [...this.state.students, {}]
                                                        })}
                                                        style={{width: '60%'}}>
                                                <Icon type="plus"/> Add field
                                            </Button>
                                            </span>
                                        }
                                        <FormItem>
                                            {fieldDecorator("is_published", {
                                                initialValue: get(initialData, "is_published", false),
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

Add_bulk.contextTypes = {
    intl: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    dataLoading: state.getIn(
        [formConstants.FORM, `${constants.DISCOUNT}_data_loading`],
        false
    ),
    initialData: state.getIn(
        [formConstants.FORM, `${constants.DISCOUNT}_data`, 'data'],
        false
    ),
    discountData: state.getIn(
        [constants.DISCOUNT, 'data'],
        {}
    ),
    filteredData: state.getIn(
        [constants.DISCOUNT, 'filtered'],
        {}
    ),
    loading: state.getIn(
        [formConstants.FORM, `${constants.DISCOUNT}_loading`],
        false
    ),
});

const mapDispatchToProps = dispatch => {
    const {getStudents, getStudentsByFilter} = actions;
    return bindActionCreators({getStudents, getStudentsByFilter}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(toJS(Add_bulk));
