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
import TextArea from "components/uiElements/textArea";
import PropTypes from 'prop-types';
import FormItem from "components/uiElements/formItem";
import Input from "components/uiElements/textInput";
import Button from "components/uiElements/button";
import Select, {SelectMultiple, Option} from "components/uiElements/select";
import * as formConstants from "containers/form/constants";
import * as actions from "./actions";
import Style from './season.style';
import map from 'lodash/map';

class Add extends Component {
    constructor(props, context) {
        super(props);
        this.state = {
            typeList: '',
            sortData: [],
            type: '',
            keys: props.initialData.lessons ? props.initialData.lessons : [{weight: null}],
            is_published: false,
            lockable: false
        };
        this.addForm = createForm({
            name: constants.SEASON,
            url: constants.SEASON_URL,
            id: props.match.params.id,
            title: context.intl.formatMessage({
                id: "season.add.title",
            }),
        });
    }

    componentDidMount() {
        const {getLessons} = this.props;
        getLessons();
    };

    componentWillReceiveProps(prevProps) {
        if (prevProps.initialData !== this.props.initialData) {
            this.setState({
                keys: prevProps.initialData.lessons,
                is_published: prevProps.initialData.is_published,
                lockable: prevProps.initialData.lockable,
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
    changeLockCheckbox = (e, form) => {
        this.setState({
            lockable: e.target.checked
        });
        form.setFieldsValue({
            lockable: e.target.checked,
        });
    };

    changeLesson = (value, index, type, setData) => {
        let changedShit = this.state.keys;
        const selectedAn = changedShit[index];
        delete selectedAn[type];
        changedShit[index] = {[type]: value, ...changedShit[index]};
        setData({lessons: changedShit});
        this.setState({
            keys: changedShit
        });
    };

    removeItem = id => {
        const updatedList = this.state.keys;
        remove(updatedList, function (n, i) {
            return i === id;
        });
        this.setState({keys: updatedList});
    };

    onSearch = (value, type, key) => {
        const { getDataByFilter } = this.props;
        getDataByFilter(value, type, key);
    };

    render() {
        const {
            loading,
            dataLoading,
            initialData,
            lessons,
            filteredData,
        } = this.props;
        const types = [
            'VIDEO',
            'EXAM',
            'READING',
            'SURVEY',
            'LIVE',
        ];
        const Form = this.addForm;
        return (
            <Style>
                <Spin spinning={dataLoading}>
                    <Form extraData={{lessons: this.state.keys}}>
                        {(fieldDecorator, handleSubmit, data, form) => {
                            return (
                                <Row>
                                    <Col className="form-col" span={18}>
                                        <FormItem
                                            label={this.context.intl.formatMessage({
                                                id:
                                                    "season.add.form.name",
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
                                                                "season.add.form.error.required",
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
                                                            "season.add.form.name",
                                                    })}
                                                />
                                            )}
                                        </FormItem>
                                        <FormItem
                                            label={this.context.intl.formatMessage({
                                                id:
                                                    "season.add.form.description",
                                            })}
                                        >
                                            {fieldDecorator("descriptions", {
                                                initialValue: get(initialData, "descriptions", ""),
                                                rules: [
                                                    {
                                                        required: true,
                                                        type: "string",
                                                        message: this.context.intl.formatMessage({
                                                            id:
                                                                "season.add.form.error.required",
                                                        }),
                                                    },
                                                ],
                                            })(
                                                <TextArea
                                                    disabled={loading}
                                                    placeholder={this.context.intl.formatMessage({
                                                        id: "deliverType.add.form.descriptionPlaceholder",
                                                    })}
                                                />
                                            )}
                                        </FormItem>
                                        {
                                            <span>
                                                    {map(this.state.keys, (k, index) => (
                                                        <span>
                                                            <div className="wrapper">
                                                                <Col className="first-item" span={11}>
                                                                    <FormItem>
                                                                        <Select
                                                                            placeholder={this.context.intl.formatMessage({
                                                                                id: "season.add.form.seasonableId",
                                                                            })}
                                                                            value={this.state.keys[index].type}
                                                                            onChange={value => this.changeLesson(value, index, 'type', form.setFieldsValue)}
                                                                            showArrow
                                                                        >
                                                                            {map(types, (item) => (
                                                                                        <Option
                                                                                            value={item}
                                                                                            key={item}
                                                                                        >
                                                                                            <IntlMessages id={item}/>
                                                                                        </Option>
                                                                                    ))}
                                                                            </Select>
                                                                    </FormItem>
                                                                </Col>
                                                                <Col span={11}>
                                                                    <FormItem>
                                                                            <Select
                                                                                showSearch
                                                                                placeholder={this.context.intl.formatMessage({
                                                                                    id: "season.add.form.seasonableId",
                                                                                })}
                                                                                value={this.state.keys[index].seasonable_id}
                                                                                onSearch={(value) => this.onSearch(value, this.state.keys[index].type, 'filter[title]')}
                                                                                onChange={value => this.changeLesson(value, index, 'seasonable_id', value => form.setFieldsValue({
                                                                                    lessons: value,
                                                                                }))}
                                                                                defaultActiveFirstOption={false}
                                                                                showArrow={false}
                                                                                filterOption={false}
                                                                                notFoundContent={null}
                                                                            >
                                                                            {map(isEmpty(filteredData[this.state.keys[index].type]) ? lessons[this.state.keys[index].type] : filteredData[this.state.keys[index].type], (item, index) => {
                                                                                return <Option
                                                                                    value={item.id}
                                                                                    key={item.id}
                                                                                >
                                                                                    {item.title}
                                                                                </Option>
                                                                            })}
                                                                        </Select>
                                                                    </FormItem>
                                                                </Col>
                                                            </div>
                                                            <div className="wrapper">
                                                                <Col className="first-item" span={11}>
                                                                    <FormItem>
                                                                        <Input
                                                                            placeholder="order"
                                                                            onChange={e => this.changeLesson(e.target.value, index, 'order', value => form.setFieldsValue({
                                                                                lessons: value,
                                                                            }))}
                                                                            value={this.state.keys[index].order}
                                                                        />
                                                                    </FormItem>
                                                                </Col>
                                                                <Col span={11}>
                                        <FormItem
                                        >
                                                                    <Input
                                                                        placeholder="weight"
                                                                        value={this.state.keys[index].weight}
                                                                        onChange={e => this.changeLesson(parseInt(e.target.value), index, 'weight', value => form.setFieldsValue({
                                                                            lessons: value,
                                                                        }))}
                                                                        disabled={this.state.keys[index].type !== 'EXAM'}
                                                                    />
                                        </FormItem>
                                                                </Col>
                                                            </div>
                                                            <Col span={24}>
                                                                {this.state.keys.length > 1 ? (
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
                                                            keys: [...this.state.keys, {weight: null}]
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
                                                    <IntlMessages id="season.form.is_published"/>
                                                </Checkbox>
                                            )}
                                        </FormItem>
                                        <FormItem>
                                            {fieldDecorator("lockable", {
                                                initialValue: get(initialData, "lockable", false),
                                            })(
                                                <Checkbox
                                                    checked={this.state.lockable}
                                                    onChange={e => this.changeLockCheckbox(e, form)}
                                                >
                                                    <IntlMessages id="season.form.lockable"/>
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
                                                id: "season.add.form.submit",
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
        [formConstants.FORM, `${constants.SEASON}_data_loading`],
        false
    ),
    initialData: state.getIn(
        [formConstants.FORM, `${constants.SEASON}_data`, 'data'],
        false
    ),
    filteredData: state.getIn(
        [constants.LESSONS, 'filtered'],
        {}
    ),
    lessons: state.getIn(
        [constants.LESSONS, 'data'],
        {}
    ),
    loading: state.getIn(
        [formConstants.FORM, `${constants.SEASON}_loading`],
        false
    ),
});

const mapDispatchToProps = dispatch => {
    const {getLessons, getDataByFilter} = actions;
    return bindActionCreators({getLessons, getDataByFilter}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(toJS(Add));
