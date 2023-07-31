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
import Style from './department.style';
import map from 'lodash/map';
import {createUpload} from "containers/upload/upload";
import split from "lodash/split";

class Add extends Component {
    constructor(props, context) {
        super(props);
        this.state = {
            typeList: '',
            sortData: [],
            type: '',
            models: props.initialData.models ? props.initialData.models : [],
        };
        this.addForm = createForm({
            name: constants.DEPARTMENT,
            url: constants.DEPARTMENT_URL,
            id: props.match.params.id,
            title: context.intl.formatMessage({
                id: "department.add.title",
            }),
        });
        this.mediaImage = createUpload(constants.MEDIA_UPLOADER);
        this.mediaMobileImage = createUpload(constants.MEDIA_MOBILE_UPLOADER);
    }

    componentDidMount() {
        const {getCourses} = this.props;
        getCourses();;
    };

    componentWillReceiveProps(prevProps) {
        if (prevProps.initialData !== this.props.initialData) {
            this.setState({
                models: prevProps.initialData.models,
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

    removeItem = id => {
        const updatedList = this.state.models;
        remove(updatedList, function (n, i) {
            return i === id;
        });
        this.setState({models: updatedList});
    };

    onSearch = (value, type, key) => {
        const { getCoursesByFilter } = this.props;
        getCoursesByFilter(value, type, key);
    };

    changeSource = (value, index, type, setData) => {
        let changedShit = this.state.models;

        const selectedAn = changedShit[index];
        delete selectedAn[type];
        changedShit[index] = {[type]: value, ...changedShit[index]};
        setData({models: changedShit});
        this.setState({
            models: changedShit
        });
    };
    render() {
        const {
            loading,
            dataLoading,
            initialData,
            albumData,
            filteredData,
        } = this.props;
        const Form = this.addForm;
        const model_type = [
            'COURSE',
            'PACKAGE',
        ];
        const MediaImage = this.mediaImage;
        const MediaMobileImage = this.mediaMobileImage;
        return (
            <Style>
                <Spin spinning={dataLoading}>
                    <Form extraData={{models: this.state.models}}>
                        {(fieldDecorator, handleSubmit, data, form) => {
                            return (
                                <Row>
                                    <Col className="form-col" span={18}>
                                        <FormItem
                                            label={this.context.intl.formatMessage({
                                                id:
                                                    "department.add.form.title",
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
                                                                "album.add.form.error.required",
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
                                                            "department.add.form.title",
                                                    })}
                                                />
                                            )}
                                        </FormItem>
                                        <FormItem
                                            label={this.context.intl.formatMessage({
                                                id:
                                                    "department.add.form.meta_title",
                                            })}
                                        >
                                            {fieldDecorator("meta_title", {
                                                initialValue: get(initialData, "meta_title", ""),
                                                rules: [
                                                    {
                                                        required: true,
                                                        type: "string",
                                                        message: this.context.intl.formatMessage({
                                                            id:
                                                                "album.add.form.error.required",
                                                        }),
                                                    },
                                                ],
                                            })(
                                                <Input
                                                    disabled={loading}
                                                    onChange={e => form.setFieldsValue({
                                                        meta_title: e.target.value,
                                                    })}
                                                />
                                            )}
                                        </FormItem>
                                        <FormItem
                                            label={this.context.intl.formatMessage({
                                                id:
                                                    "department.add.form.meta_desc",
                                            })}
                                        >
                                            {fieldDecorator("meta_desc", {
                                                initialValue: get(initialData, "meta_desc", ""),
                                                rules: [
                                                    {
                                                        required: true,
                                                        type: "string",
                                                        message: this.context.intl.formatMessage({
                                                            id:
                                                                "album.add.form.error.required",
                                                        }),
                                                    },
                                                ],
                                            })(
                                                <Input
                                                    disabled={loading}
                                                    onChange={e => form.setFieldsValue({
                                                        meta_desc: e.target.value,
                                                    })}
                                                />
                                            )}
                                        </FormItem>
                                        <FormItem
                                            label={this.context.intl.formatMessage({
                                                id:
                                                    "department.add.form.order",
                                            })}
                                        >
                                            {fieldDecorator("order", {
                                                initialValue: get(initialData, "order"),
                                                rules: [
                                                    {
                                                        required: true,
                                                        message: this.context.intl.formatMessage({
                                                            id:
                                                                "album.add.form.error.required",
                                                        }),
                                                    },
                                                ],
                                            })(
                                                <Input
                                                    disabled={loading}
                                                    type="number"
                                                    min="1"
                                                    onChange={e => form.setFieldsValue({
                                                        order: e.target.value,
                                                    })}
                                                    placeholder={this.context.intl.formatMessage({
                                                        id: "department.add.form.order",
                                                    })}
                                                />
                                            )}
                                        </FormItem>
                                        <FormItem
                                            label={this.context.intl.formatMessage({
                                                id:
                                                    "department.add.form.seo_title",
                                            })}
                                        >
                                            {fieldDecorator("seo_title", {
                                                initialValue: get(initialData, "seo_title"),
                                            })(
                                                <Input
                                                    disabled={loading}
                                                    onChange={e => form.setFieldsValue({
                                                        seo_title: e.target.value,
                                                    })}
                                                    placeholder={this.context.intl.formatMessage({
                                                        id: "department.add.form.seo_title",
                                                    })}
                                                />
                                            )}
                                        </FormItem>
                                        <FormItem label="MediaImage" >
                                            {fieldDecorator("media_url", {
                                                initialValue: split(get(initialData, "media_url", ''), '/')[5],
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
                                                uploadName={constants.MEDIA_IMAGE}
                                                onChanges={value => form.setFieldsValue({
                                                    media_url: value,
                                                })}
                                                currentImage={get(initialData, "media_url", '')}
                                            />)}
                                        </FormItem>
                                        <FormItem
                                            label={this.context.intl.formatMessage({
                                                id:
                                                    "department.add.form.meta_media_url",
                                            })}
                                        >
                                            {fieldDecorator("meta_media_url", {
                                                initialValue: get(initialData, "meta_media_url", ""),
                                                rules: [
                                                    {
                                                        required: true,
                                                        type: "string",
                                                        message: this.context.intl.formatMessage({
                                                            id:
                                                                "album.add.form.error.required",
                                                        }),
                                                    },
                                                ],
                                            })(
                                                <Input
                                                    disabled={loading}
                                                    onChange={e => form.setFieldsValue({
                                                        meta_media_url: e.target.value,
                                                    })}
                                                />
                                            )}
                                        </FormItem>
                                        <FormItem label="MediaMobileImage" >
                                            {fieldDecorator("mobile_media_url", {
                                                initialValue: split(get(initialData, "mobile_media_url", ''), '/')[6],
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
                                                uploadName={constants.MEDIA_MOBILE_IMAGE}
                                                onChanges={value => form.setFieldsValue({
                                                    mobile_media_url: value,
                                                })}
                                                currentImage={get(initialData, "mobile_media_url", '')}
                                            />)}
                                        </FormItem>
                                        <FormItem
                                            label={this.context.intl.formatMessage({
                                                id:
                                                    "department.add.form.meta_media_mobile_url",
                                            })}
                                        >
                                            {fieldDecorator("meta_mobile_media_url", {
                                                initialValue: get(initialData, "meta_mobile_media_url", ""),
                                                rules: [
                                                    {
                                                        required: true,
                                                        type: "string",
                                                        message: this.context.intl.formatMessage({
                                                            id:
                                                                "album.add.form.error.required",
                                                        }),
                                                    },
                                                ],
                                            })(
                                                <Input
                                                    disabled={loading}
                                                    onChange={e => form.setFieldsValue({
                                                        meta_mobile_media_url: e.target.value,
                                                    })}
                                                />
                                            )}
                                        </FormItem>
                                        {
                                            <span>
                                                    {map(this.state.models, (k, index) => (
                                                        <div>
                                                            <div className="wrapper">
                                                                <Col className="first-item" span={11}>
                                                                        <FormItem
                                                                            label={this.context.intl.formatMessage({
                                                                                id:
                                                                                    "album.list.model_type",
                                                                            })}
                                                                        >
                                                                        <Select
                                                                            placeholder={this.context.intl.formatMessage({
                                                                                id: "album.list.model_type",
                                                                            })}
                                                                            // disabled={this.state.edit_state ? "disabled" : loading}
                                                                            value={this.state.models[index].type}
                                                                            onChange={value => this.changeSource(value, index, 'type', form.setFieldsValue)}
                                                                            showArrow
                                                                        >
                                                                            {map(model_type, (item) => (
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
                                                                              // disabled={this.state.edit_state ? "disabled" : loading}
                                                                              value={this.state.models[index].departmentables_id}
                                                                              onSearch={(value) => this.onSearch(value, this.state.models[index].type, 'filter[header_title]')}
                                                                              onChange={value => this.changeSource(value, index, 'departmentables_id', value => form.setFieldsValue({
                                                                                  models: value,
                                                                              }))}
                                                                              defaultActiveFirstOption={false}
                                                                              showArrow={false}
                                                                              filterOption={false}
                                                                              notFoundContent={null}
                                                                          >
                                                                            {map(isEmpty(filteredData)
                                                                                ? albumData[this.state.models[index].type]
                                                                                : filteredData, (item, i) => {
                                                                                return <Option
                                                                                    value={item.id}
                                                                                    key={item.id}
                                                                                >
                                                                                        {item.header_title}
                                                                                </Option>
                                                                            })}
                                                                        </Select>
                                                                    </FormItem>
                                                                </Col>
                                                            </div>
                                                            <div className="wrapper">
                                                                <Col span={24}>
                                                                    <FormItem>
                                                                    <Input
                                                                        placeholder="order"
                                                                        onChange={e => this.changeSource(e.target.value, index, 'order', value => form.setFieldsValue({
                                                                            models: value,
                                                                        }))}
                                                                        value={this.state.models[index].order}
                                                                    />
                                                                    </FormItem>
                                                                </Col>
                                                            </div>
                                                            <Col span={24}>
                                                                {this.state.models.length > 0 ? (
                                                                    <Button
                                                                        className="remove-button"
                                                                        onClick={() => this.removeItem(index)}>
                                                                        <Icon
                                                                            type="minus-circle-o"
                                                                        />
                                                                    </Button>
                                                                ) : null}
                                                            </Col>

                                                    </div>
                                                    ))}

                                            </span>
                                        }
                                        <Button type="dashed"
                                                onClick={() => this.setState({
                                                    models: [...this.state.models, {}]
                                                })}
                                                style={{width: '60%'}}>
                                            <Icon type="plus"/> Add field
                                        </Button>
                                        <FormItem>
                                            {fieldDecorator("is_published", {
                                                initialValue: get(initialData, "is_published", false),
                                            })(
                                                <Checkbox
                                                    checked={this.state.is_published}
                                                    onChange={e => this.changeCheckbox(e, form)}
                                                >
                                                    <IntlMessages id="album.form.is_published"/>
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
                                                id: "album.add.form.submit",
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
        [formConstants.FORM, `${constants.DEPARTMENT}_data_loading`],
        false
    ),
    initialData: state.getIn(
        [formConstants.FORM, `${constants.DEPARTMENT}_data`, 'data'],
        false
    ),
    albumData: state.getIn(
        [constants.DEPARTMENT, 'data'],
        {}
    ),
    filteredData: state.getIn(
        [constants.DEPARTMENT, 'filtered'],
        {}
    ),
    loading: state.getIn(
        [formConstants.FORM, `${constants.DEPARTMENT}_loading`],
        false
    ),
});

const mapDispatchToProps = dispatch => {
    const {getCourses, getCoursesByFilter} = actions;
    return bindActionCreators({getCourses, getCoursesByFilter}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(toJS(Add));
