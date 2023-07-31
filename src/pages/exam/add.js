import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from 'redux';
import {toJS} from "hoc/toJsHoc";
import {Row, Col, Spin, Icon} from "antd";
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
import Style from './exam.style';
import split from 'lodash/split';
import map from "lodash/map";
import isEmpty from "lodash/isEmpty";
import Select, {SelectMultiple, Option} from "components/uiElements/select";
import remove from "lodash/remove";
import * as actions from "./actions";

class Add extends Component {
    constructor(props, context) {
        super(props);
        this.state = {
            is_published: false,
            questions: props.initialData.questions ? props.initialData.questions : [],
            edit_state: false
        };
        this.addForm = createForm({
            name: constants.EXAM,
            url: constants.EXAM_URL,
            id: props.match.params.id,
            title: context.intl.formatMessage({
                id: "exam.add.title",
            }),
        });
        this.examImage = createUpload(constants.FILE_UPLOADER);
    }
    componentDidMount() {
        const {getQuestion} = this.props;
        getQuestion();
        if(window.location.href.includes('edit')){
            this.setState({
                edit_state: true
            })
        }
    };
    componentWillReceiveProps(prevProps) {
        if (prevProps.initialData !== this.props.initialData) {
            this.setState({
                is_published: prevProps.initialData.is_published,
                questions: prevProps.initialData.questions,
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
    changeQuestions = (value, index, type, setData) => {
        let changedShit = this.state.questions;
        const selectedAn = changedShit[index];
        delete selectedAn[type];
        changedShit[index] = {[type]: value, ...changedShit[index]};
        setData({questions: changedShit});
        this.setState({
            questions: changedShit
        });

    };
    removeQuestions = id => {
        const updatedList = this.state.questions;
        remove(updatedList, function (n, i) {
            return i === id;
        });
        this.setState({questions: updatedList});
    };
    onSearch = (value, type, key) => {
        const { getQuestionByFilter } = this.props;
        getQuestionByFilter(value, type, key);
    };
    render() {
        const {loading, dataLoading, initialData, questionData, filteredData} = this.props;
        const Form = this.addForm;
        const ParallelImage = this.examImage;
       return (
            <Style>
                <Spin spinning={dataLoading}>
                    <Form
                        extraData={{
                            questions: this.state.questions
                        }}
                    >
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
                                                id:
                                                    "exam.add.form.description",
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
                                                                "exam.add.form.error.required",
                                                        }),
                                                    },
                                                ],
                                            })(
                                                <TextArea disabled={loading}/>
                                            )}
                                        </FormItem>
                                        <FormItem
                                            label={this.context.intl.formatMessage({
                                                id: "exam.form.dueDate",
                                            })}
                                        >
                                            {fieldDecorator("due_date", {
                                                initialValue: get(initialData, "due_date", 0),
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
                                                id: "exam.form.maxScore",
                                            })}
                                        >
                                            {fieldDecorator("max_score", {
                                                initialValue: get(initialData, "max_score", 0),
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
                                                id: "exam.form.min_req_score",
                                            })}
                                        >
                                            {fieldDecorator("min_req_score", {
                                                initialValue: get(initialData, "min_req_score", 0),
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
                                                id: "exam.form.allowed_time",
                                            })}
                                        >
                                            {fieldDecorator("allowed_time", {
                                                initialValue: get(initialData, "allowed_time",0),
                                            })(
                                                <Input
                                                    disabled={loading}
                                                    type="number"
                                                    min="1"
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
                                        <FormItem
                                            label={this.context.intl.formatMessage({
                                                id: "exam.form.attachment",
                                            })}
                                        >
                                            {isEmpty(get(initialData, "attachment_url", ''))
                                          ?  fieldDecorator("attachment_url", {
                                                    initialValue: get(initialData, "attachment_url", '')
                                                })
                                                (<ParallelImage
                                                url={constants.FILE_URL}
                                                uploadName={constants.UPLOAD_EXAM}
                                                onChanges={value => form.setFieldsValue({
                                                    attachment_url: value,
                                                })}
                                                currentImage={get(initialData, "attachment_url", '')}
                                            />)
                                            : fieldDecorator("attachment_url", {
                                                    initialValue: split(get(initialData, "attachment_url", ''), '/')[6],
                                                })(<ParallelImage
                                                    url={constants.FILE_URL}
                                                    uploadName={constants.UPLOAD_EXAM}
                                                    onChanges={value => form.setFieldsValue({
                                                        attachment_url: value,
                                                    })}
                                                    currentImage={get(initialData, "attachment_url", '')}
                                                />)
                                            }
                                        </FormItem>

                                    </Col>
                                    <Col span={24} >
                                        {
                                            <span>
                                                {map(this.state.questions, (k, index) => (
                                                    <span>
                                                            <div className="wrapper">
                                                                <Col className="first-item form-col" span={11} >
                                                                    <FormItem>
                                                                        <Select
                                                                            placeholder={this.context.intl.formatMessage({
                                                                                id: "exam.question.list",
                                                                            })}
                                                                            value={this.state.questions[index].question_id}
                                                                            onSearch={(value) => this.onSearch(value, 'QUESTION', 'filter[question]')}
                                                                            onChange={value => this.changeQuestions(value, index, 'question_id', form.setFieldsValue)}
                                                                            showArrow
                                                                            showSearch
                                                                            filterOption={false}
                                                                            notFoundContent={null}
                                                                            defaultActiveFirstOption={false}
                                                                        >
                                                                                {map(isEmpty(filteredData['QUESTION'])
                                                                                    ? get(questionData, "QUESTION", "")
                                                                                    : filteredData['QUESTION'], (item, index) => {
                                                                                    return  <Option
                                                                                        value={item.id}
                                                                                        key={item.id}
                                                                                    >
                                                                                        {item.question}
                                                                                    </Option>
                                                                                })}
                                                                        </Select>
                                                                    </FormItem>
                                                                </Col>
                                                                <Col span={11}  className=" form-col">
                                                                    <FormItem>
                                                                        <Input
                                                                            placeholder="weight"
                                                                            onChange={e => this.changeQuestions(e.target.value, index, 'weight', value => form.setFieldsValue({
                                                                                questions: value,
                                                                            }))}
                                                                            value={this.state.questions[index].weight}
                                                                        />
                                                                    </FormItem>
                                                                </Col>
                                                            </div>
                                                            <Col span={24}>
                                                                {this.state.questions.length > 0 ? (
                                                                    <Button
                                                                        className="remove-button"
                                                                        onClick={() => this.removeQuestions(index)}>
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
                                                            questions: [...this.state.questions, {}]
                                                        })}
                                                        style={{width: '60%'}}>
                                                <Icon type="plus"/>  افزودن  سوال
                                            </Button>
                                            </span>
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
                                                id: "exam.add.form.submit",
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
        [formConstants.FORM, `${constants.EXAM}_data_loading`],
        false
    ),
    initialData: state.getIn(
        [formConstants.FORM, `${constants.EXAM}_data`, 'data'],
        false
    ),
    loading: state.getIn(
        [formConstants.FORM, `${constants.EXAM}_loading`],
        false
    ),
    filteredData: state.getIn(
        [constants.EXAM, 'filtered'],
        {}
    ),
    questionData: state.getIn(
        [constants.EXAM, 'data'],
        {}
    )
});
const mapDispatchToProps = dispatch => {
    const {getQuestion, getQuestionByFilter} = actions;
    return bindActionCreators({getQuestion, getQuestionByFilter}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(toJS(Add));
