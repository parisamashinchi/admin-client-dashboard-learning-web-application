
import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from 'redux';
import {toJS} from "hoc/toJsHoc";
import {Row, Col, Spin, Icon} from 'antd';
import get from "lodash/get";
import Checkbox from "components/uiElements/checkBox";
import * as constants from "./constants";
import {createUpload} from "containers/upload/upload";
import {createForm} from "containers/form/form";
import PropTypes from 'prop-types';
import FormItem from "components/uiElements/formItem";
import Input from "components/uiElements/textInput";
import Button from "components/uiElements/button";
import * as actions from "./actions";
import Style from './question.style';
import map from "lodash/map";
import remove from "lodash/remove";
import * as formConstants from "containers/form/constants";
import split from 'lodash/split';
import isEmpty from "lodash/isEmpty";

class Add extends Component {
    constructor(props, context) {
        super(props);
        const {push} = props;
        this.state = {
            options: props.initialData.options ? props.initialData.options : [],
            edit_state: false,
        };
        this.addForm = createForm({
            name: constants.QUESTION,
            url: constants.QUESTION_URL,
            id: props.match.params.id,
            title: context.intl.formatMessage({
                id: "question.add.title",
            }),
        });
        this.mediaImage = createUpload(constants.MEDIA_UPLOADER);

    }
    componentDidMount() {

        if(window.location.href.includes('edit')){
            this.setState({
                edit_state: true
            })
        }
    };
    componentWillReceiveProps(prevProps) {
        if (prevProps.initialData !== this.props.initialData) {
            this.setState({
                options: prevProps.initialData.options,
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
    changeOptions = (value, index, type, setData) => {
        let changedShit = this.state.options;
        const selectedAn = changedShit[index];
        delete selectedAn[type];
        changedShit[index] = {[type]: value, ...changedShit[index]};
        setData({options: changedShit});
        this.setState({
            options: changedShit
        });
    };
    removeOptions = id => {
        const updatedList = this.state.options;
        remove(updatedList, function (n, i) {
            return i === id;
        });
        this.setState({options: updatedList});
    };
    render() {
        const {
            loading,
            dataLoading,
            initialData,
        } = this.props;
        const Form = this.addForm;
        const MediaImage = this.mediaImage;
        return (
            <Style>
                <Spin spinning={dataLoading}>
                    <Form extraData={{
                        options: this.state.options,
                    }}>
                        {(fieldDecorator, handleSubmit, data, form) => {
                            return (
                                <Row>
                                    <Col className="form-col" span={18}>
                                        <FormItem
                                            label={this.context.intl.formatMessage({
                                                id:
                                                    "question.question",
                                            })}
                                        >
                                            {fieldDecorator("question", {
                                                initialValue: get(initialData, "question", ""),
                                            })(
                                                <Input
                                                    disabled={loading}
                                                    onChange={e => form.setFieldsValue({
                                                        question: e.target.value,
                                                    })}
                                                    placeholder={this.context.intl.formatMessage({
                                                        id:
                                                            "question.question",
                                                    })}
                                                />
                                            )}
                                        </FormItem>
                                        <FormItem label="mediaImage">
                                            {isEmpty(get(initialData, "question_media", ''))
                                           ?   fieldDecorator("question_media", {
                                                    initialValue: get(initialData, "question_media", '')
                                                })
                                                (<MediaImage
                                                url={constants.MEDIA_URL}
                                                uploadName={constants.MEDIA_IMAGE}
                                                onChanges={value => form.setFieldsValue({
                                                    question_media: value,
                                                })}
                                                currentImage={get(initialData, "question_media", '')}
                                            />)
                                            : fieldDecorator("question_media", {
                                                initialValue: split(get(initialData, "question_media", ''), '/')[6]
                                            })(<MediaImage
                                                url={constants.MEDIA_URL}
                                                uploadName={constants.MEDIA_IMAGE}
                                                onChanges={value => form.setFieldsValue({
                                                question_media: value,
                                            })}
                                                currentImage={get(initialData, "question_media", '')}
                                                />)}
                                        </FormItem>
                                        <FormItem>
                                            {fieldDecorator("is_published", {
                                                initialValue: get(initialData, "is_published", false),
                                            })(
                                                <Checkbox
                                                    checked={this.state.is_published}
                                                    onChange={e => this.changeCheckbox(e, form)}
                                                >
                                                    is_published
                                                </Checkbox>
                                            )}
                                        </FormItem>
                                        {
                                            <span>
                                                {map(this.state.options, (k, index) => (
                                                    <span>
                                                            <div className="wrapper">
                                                                <Col className="first-item" span={11}>
                                                                   <FormItem
                                                                       label={this.context.intl.formatMessage({
                                                                       id:
                                                                           "question.option.question",
                                                                        })}
                                                                   >
                                                                        <Input
                                                                            placeholder=" گزینه سوال "
                                                                            disabled={this.state.edit_state ? "disabled" : loading}
                                                                            onChange={e => this.changeOptions(e.target.value, index, 'option', value => form.setFieldsValue({
                                                                                option: value,
                                                                            }))}
                                                                            value={this.state.options[index].option}
                                                                        />
                                                                    </FormItem>
                                                                </Col>
                                                                <Col span={11}>
                                                                     <FormItem
                                                                         label={this.context.intl.formatMessage({
                                                                             id:
                                                                                 "question.selected.question",
                                                                         })}
                                                                     >
                                                                           <Input
                                                                               placeholder="0, 1"
                                                                               disabled={this.state.edit_state ? "disabled" : loading}
                                                                               onChange={e => this.changeOptions(e.target.value, index, 'is_correct', value => form.setFieldsValue({
                                                                                   is_correct: value,
                                                                               }))}
                                                                               type="number"
                                                                               value={this.state.options[index].is_correct}
                                                                           />
                                                                    </FormItem>
                                                                </Col>
                                                            </div>
                                                            <Col span={24}>
                                                                {this.state.options.length > 0 ? (
                                                                    <Button
                                                                        className="remove-button"
                                                                        onClick={() => this.removeOptions(index)}>
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
                                                            options: [...this.state.options, {}]
                                                        })}
                                                        style={{width: '60%'}}>
                                                <Icon type="plus"/>  افزودن  گزینه ها
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
        [formConstants.FORM, `${constants.QUESTION}_data_loading`],
        false
    ),
    initialData: state.getIn(
        [formConstants.FORM, `${constants.QUESTION}_data`, 'data'],
        false
    ),
    loading: state.getIn(
        [formConstants.FORM, `${constants.QUESTION}_loading`],
        false
    ),
});

const mapDispatchToProps = dispatch => {
    const { } = actions;
    return bindActionCreators({}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(toJS(Add));
