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
import split from 'lodash/split';
import {createUpload} from "containers/upload/upload";
import TextArea from "components/uiElements/textArea";

class Add extends Component {
    constructor(props, context) {
        super(props);
        const {push} = props;
        this.state = {
            is_published: false,
            has_degree: false,
            typeList: '',
            sortData: [],
            type: 'percent',
            course_sell_types: props.initialData.course_sell_types ? props.initialData.course_sell_types : [],
            teachers: props.initialData.teacher ? props.initialData.teacher : [],
        };
        this.addForm = createForm({
            name: constants.PACKAGE,
            url: constants.PACKAGE_URL,
            id: props.match.params.id,
            title: context.intl.formatMessage({
                id: "package.add.title",
            }),
        });
        this.contentImage = createUpload(constants.CONTENT_UPLOADER);
        this.mobileContentImage = createUpload(constants.MOBILE_CONTENT_UPLOADER);
        this.headerImage = createUpload(constants.HEADER_UPLOADER);
        this.mobileHeaderImage = createUpload(constants.MOBILE_HEADER_UPLOADER);
        this.thumbnailImage = createUpload(constants.THUMBNAIL_UPLOADER);
        this.mobileThumbnailImage = createUpload(constants.MOBILE_THUMBNAIL_UPLOADER);
    }
    componentDidMount() {
        const {getCourse} = this.props;
        getCourse();
    };
    componentWillReceiveProps(prevProps) {
        if (prevProps.initialData !== this.props.initialData) {
            this.setState({
                is_published: prevProps.initialData.is_published,
                has_degree: prevProps.initialData.has_degree,
                course_sell_types: prevProps.initialData.course_sell_types,
                teachers: prevProps.initialData.teacher,
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
    changeDegreeCheckbox = (e, form) => {
        this.setState({
            has_degree: e.target.checked
        });
        form.setFieldsValue({
            has_degree: e.target.checked,
        });
    };

    changeCourseSellType = (value, index, type, setData) => {
        let changedShit = this.state.course_sell_types;
        const selectedAn = changedShit[index];
        delete selectedAn[type];
        changedShit[index] = {[type]: value, ...changedShit[index]};
        setData({course_sell_types: changedShit});
        this.setState({
            course_sell_types: changedShit
        });
        if( type ==='course_id'){
            this.props.getSellType(value);
        }

    };
    changeTeachers = (value, index, type, setData) => {
        let changedShit = this.state.teachers;
        const selectedAn = changedShit[index];
        delete selectedAn[type];
        changedShit[index] = {[type]: value, ...changedShit[index]};
        setData({teachers: changedShit});
        this.setState({
            teachers: changedShit
        });

    };
    removeTeachers = id => {
        const updatedList = this.state.teachers;
        remove(updatedList, function (n, i) {
            return i === id;
        });
        this.setState({teachers: updatedList});
    };
    removeCourseSellType = id => {
        const updatedList = this.state.course_sell_types;
        remove(updatedList, function (n, i) {
            return i === id;
        });
        this.setState({course_sell_types: updatedList});
    };

    onSearch = (value, type, key) => {
        const { getDataByFilter } = this.props;
        getDataByFilter(value, type, key);
    };
    changeCategory = (value) =>{
        this.setState({
            category_id: value
        })
    }
    render() {
        const {
            loading,
            dataLoading,
            initialData,
            packageData,
            filteredData,
        } = this.props;
        const Form = this.addForm;
        const ContentImage = this.contentImage;
        const MobileContentImage = this.mobileContentImage;
        const HeaderImage = this.headerImage;
        const MobileHeaderImage = this.mobileHeaderImage;
        const ThumbnailImage = this.thumbnailImage;
        const MobileThumbnailImage = this.mobileThumbnailImage;
       return (
            <Style>
                <Spin spinning={dataLoading}>
                    <Form extraData={{
                        teachers: this.state.teachers,
                        course_sell_types: this.state.course_sell_types,
                    }}>
                        {(fieldDecorator, handleSubmit, data, form) => {
                            return (
                                <Row>
                                    <Col className="form-col" span={18}>
                                        <FormItem
                                            label={this.context.intl.formatMessage({
                                                id:
                                                    "package.list.header_title",
                                            })}
                                        >
                                            {fieldDecorator("header_title", {
                                                initialValue: get(initialData, "header_title", ""),
                                            })(
                                                <Input
                                                    disabled={loading}
                                                    onChange={e => form.setFieldsValue({
                                                        header_title: e.target.value,
                                                    })}
                                                    placeholder={this.context.intl.formatMessage({
                                                        id:
                                                            "package.list.header_title",
                                                    })}
                                                />
                                            )}
                                        </FormItem>
                                        <FormItem
                                            label={this.context.intl.formatMessage({
                                                id:
                                                    "package.list.meta_title",
                                            })}
                                        >
                                            {fieldDecorator("meta_title", {
                                                initialValue: get(initialData, "meta_title", ""),
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
                                                    "package.list.seo_title",
                                            })}
                                        >
                                            {fieldDecorator("seo_title", {
                                                initialValue: get(initialData, "seo_title", ""),
                                            })(
                                                <Input
                                                    disabled={loading}
                                                    onChange={e => form.setFieldsValue({
                                                        seo_title: e.target.value,
                                                    })}
                                                    placeholder={this.context.intl.formatMessage({
                                                        id:
                                                            "package.list.seo_title",
                                                    })}
                                                />
                                            )}
                                        </FormItem>
                                        <FormItem
                                            label={this.context.intl.formatMessage({
                                                id:
                                                    "package.list.header_descriptions",
                                            })}>
                                            {fieldDecorator("header_descriptions", {
                                                initialValue: get(initialData, "header_descriptions", ""),
                                            })(
                                                <TextArea disabled={loading}/>
                                            )}
                                        </FormItem>
                                        <FormItem
                                            label={this.context.intl.formatMessage({
                                                id:
                                                    "package.list.meta_desc",
                                            })}
                                        >
                                            {fieldDecorator("meta_desc", {
                                                initialValue: get(initialData, "meta_desc", ""),
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
                                                        "package.list.content_title",
                                                })}
                                            >
                                                {fieldDecorator("content_title", {
                                                    initialValue: get(initialData, "content_title", ""),
                                                })(
                                                    <Input
                                                        disabled={loading}
                                                        onChange={e => form.setFieldsValue({
                                                            content_title: e.target.value,
                                                        })}
                                                        placeholder={this.context.intl.formatMessage({
                                                            id: "package.list.content_title",
                                                        })}
                                                    />
                                                )}
                                        </FormItem>
                                        <FormItem
                                            label={this.context.intl.formatMessage({
                                                id:
                                                    "package.list.content_descriptions",
                                            })}>
                                            {fieldDecorator("content_descriptions", {
                                                initialValue: get(initialData, "content_descriptions", ""),
                                            })(
                                                <TextArea disabled={loading}/>
                                            )}
                                        </FormItem>
                                        <FormItem label="content_media">
                                            {isEmpty(get(initialData, "content_media", ''))
                                                ?
                                             fieldDecorator("content_media", {
                                                    initialValue: get(initialData, "content_media", '')
                                                })
                                                (<ContentImage
                                                    url={constants.CONTENT_URL}
                                                    uploadName={constants.CONTENT_IMAGE}
                                                    onChanges={value => form.setFieldsValue({
                                                        content_media: value,
                                                    })}
                                                    currentImage={get(initialData, "content_media", '')}
                                                />)
                                                : fieldDecorator("content_media", {
                                                    initialValue: split(get(initialData, "content_media", ''), '/')[5],
                                                })
                                                (<ContentImage
                                                    url={constants.CONTENT_URL}
                                                    uploadName={constants.CONTENT_IMAGE}
                                                    onChanges={value => form.setFieldsValue({
                                                        content_media: value,
                                                    })}
                                                    currentImage={get(initialData, "content_media", '')}
                                                />)
                                             }
                                        </FormItem>
                                        <FormItem
                                            label={this.context.intl.formatMessage({
                                                id:
                                                    "package.list.meta_content_media",
                                            })}
                                        >
                                            {fieldDecorator("meta_content_media", {
                                                initialValue: get(initialData, "meta_content_media", ""),
                                            })(
                                                <Input
                                                    disabled={loading}
                                                    onChange={e => form.setFieldsValue({
                                                        meta_content_media: e.target.value,
                                                    })}
                                                />
                                            )}
                                        </FormItem>
                                        <FormItem label="mobile_content_media">
                                            {isEmpty(get(initialData, "mobile_content_media", ''))
                                                ?
                                                fieldDecorator("mobile_content_media", {
                                                    initialValue: get(initialData, "mobile_content_media", '')
                                                })
                                                (<MobileContentImage
                                                    url={constants.MOBILE_CONTENT_URL}
                                                    uploadName={constants.MOBILE_CONTENT_IMAGE}
                                                    onChanges={value => form.setFieldsValue({
                                                        mobile_content_media: value,
                                                    })}
                                                    currentImage={get(initialData, "mobile_content_media", '')}
                                                />)
                                                : fieldDecorator("mobile_content_media", {
                                                    initialValue: split(get(initialData, "mobile_content_media", ''), '/')[6],
                                                })
                                                (<MobileContentImage
                                                    url={constants.MOBILE_CONTENT_URL}
                                                    uploadName={constants.MOBILE_CONTENT_IMAGE}
                                                    onChanges={value => form.setFieldsValue({
                                                        mobile_content_media: value,
                                                    })}
                                                    currentImage={get(initialData, "mobile_content_media", '')}
                                                />)
                                            }
                                        </FormItem>
                                        <FormItem
                                            label={this.context.intl.formatMessage({
                                                id:
                                                    "package.list.meta_mobile_content_media",
                                            })}
                                        >
                                            {fieldDecorator("meta_mobile_content_media", {
                                                initialValue: get(initialData, "meta_mobile_content_media", ""),
                                            })(
                                                <Input
                                                    disabled={loading}
                                                    onChange={e => form.setFieldsValue({
                                                        meta_mobile_content_media: e.target.value,
                                                    })}
                                                />
                                            )}
                                        </FormItem>
                                        <FormItem
                                            label={this.context.intl.formatMessage({
                                                id:
                                                    "package.list.discount",
                                            })}
                                        >
                                            {fieldDecorator("discount", {
                                                initialValue: get(initialData, "discount", ""),
                                            })(
                                                <Input
                                                    disabled={loading}
                                                    onChange={e => form.setFieldsValue({
                                                        discount: e.target.value,
                                                    })}
                                                    placeholder={this.context.intl.formatMessage({
                                                        id:
                                                            "package.list.discount",
                                                    })}
                                                />
                                            )}
                                        </FormItem>
                                        <FormItem
                                            label={this.context.intl.formatMessage({
                                                id:
                                                    "package.list.order",
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
                                                    placeholder={this.context.intl.formatMessage({
                                                        id: "package.list.order",
                                                    })}
                                                />
                                            )}
                                        </FormItem>
                                        <FormItem
                                            label={this.context.intl.formatMessage({
                                                id:
                                                    "package.list.sell_type_descriptions",
                                            })}>
                                            {fieldDecorator("sell_type_descriptions", {
                                                initialValue: get(initialData, "sell_type_descriptions", ""),
                                            })(
                                                <TextArea disabled={loading}/>
                                            )}
                                        </FormItem>
                                        <FormItem>
                                            {fieldDecorator("has_degree", {
                                                initialValue: get(initialData, "has_degree", false),
                                            })(
                                                <Checkbox
                                                    checked={this.state.has_degree}
                                                    onChange={e => this.changeDegreeCheckbox(e, form)}
                                                >
                                                    has_degree
                                                </Checkbox>
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
                                                    is_published
                                                </Checkbox>
                                            )}
                                        </FormItem>
                                        <FormItem label="header_media">
                                            {isEmpty(get(initialData, "header_media", ''))
                                                ?
                                                fieldDecorator("header_media", {
                                                    initialValue: get(initialData, "header_media", '')
                                                })
                                                (<HeaderImage
                                                    url={constants.HEADER_URL}
                                                    uploadName={constants.HEADER_IMAGE}
                                                    onChanges={value => form.setFieldsValue({
                                                        header_media: value,
                                                    })}
                                                    currentImage={get(initialData, "header_media", '')}
                                                />)
                                                : fieldDecorator("header_media", {
                                                    initialValue: split(get(initialData, "header_media", ''), '/')[6],
                                                })
                                                (<HeaderImage
                                                    url={constants.HEADER_URL}
                                                    uploadName={constants.HEADER_IMAGE}
                                                    onChanges={value => form.setFieldsValue({
                                                        header_media: value,
                                                    })}
                                                    currentImage={get(initialData, "header_media", '')}
                                                />)
                                            }
                                        </FormItem>
                                        <FormItem
                                            label={this.context.intl.formatMessage({
                                                id:
                                                    "package.list.meta_header_media",
                                            })}
                                        >
                                            {fieldDecorator("meta_header_media", {
                                                initialValue: get(initialData, "meta_header_media", ""),
                                            })(
                                                <Input
                                                    disabled={loading}
                                                    onChange={e => form.setFieldsValue({
                                                        meta_header_media: e.target.value,
                                                    })}
                                                />
                                            )}
                                        </FormItem>
                                        <FormItem label="mobile_header_media">
                                            {isEmpty(get(initialData, "mobile_header_media", ''))
                                                ?
                                                fieldDecorator("mobile_header_media", {
                                                    initialValue: get(initialData, "mobile_header_media", '')
                                                })
                                                (<MobileHeaderImage
                                                    url={constants.MOBILE_HEADER_URL}
                                                    uploadName={constants.MOBILE_HEADER_IMAGE}
                                                    onChanges={value => form.setFieldsValue({
                                                        mobile_header_media: value,
                                                    })}
                                                    currentImage={get(initialData, "mobile_header_media", '')}
                                                />)
                                                : fieldDecorator("mobile_header_media", {
                                                    initialValue: split(get(initialData, "mobile_header_media", ''), '/')[7],
                                                })
                                                (<MobileHeaderImage
                                                    url={constants.MOBILE_HEADER_URL}
                                                    uploadName={constants.MOBILE_HEADER_IMAGE}
                                                    onChanges={value => form.setFieldsValue({
                                                        mobile_header_media: value,
                                                    })}
                                                    currentImage={get(initialData, "mobile_header_media", '')}
                                                />)
                                            }
                                        </FormItem>
                                        <FormItem
                                            label={this.context.intl.formatMessage({
                                                id:
                                                    "package.list.meta_mobile_header_media",
                                            })}
                                        >
                                            {fieldDecorator("meta_mobile_header_media", {
                                                initialValue: get(initialData, "meta_mobile_header_media", ""),
                                            })(
                                                <Input
                                                    disabled={loading}
                                                    onChange={e => form.setFieldsValue({
                                                        meta_mobile_header_media: e.target.value,
                                                    })}
                                                />
                                            )}
                                        </FormItem>
                                        <FormItem label="thumbnail_media">
                                            {isEmpty(get(initialData, "thumbnail_media", ''))
                                                ?
                                                fieldDecorator("thumbnail_media", {
                                                    initialValue: get(initialData, "thumbnail_media", '')
                                                })
                                                (<ThumbnailImage
                                                    url={constants.THUMBNAIL_URL}
                                                    uploadName={constants.THUMBNAIL_IMAGE}
                                                    onChanges={value => form.setFieldsValue({
                                                        thumbnail_media: value,
                                                    })}
                                                    currentImage={get(initialData, "thumbnail_media", '')}
                                                />)
                                                : fieldDecorator("thumbnail_media", {
                                                    initialValue: split(get(initialData, "thumbnail_media", ''), '/')[6],
                                                })
                                                (<ThumbnailImage
                                                    url={constants.THUMBNAIL_URL}
                                                    uploadName={constants.THUMBNAIL_IMAGE}
                                                    onChanges={value => form.setFieldsValue({
                                                        thumbnail_media: value,
                                                    })}
                                                    currentImage={get(initialData, "thumbnail_media", '')}
                                                />)
                                            }
                                        </FormItem>
                                        <FormItem
                                            label={this.context.intl.formatMessage({
                                                id:
                                                    "package.list.meta_thumbnail_media",
                                            })}
                                        >
                                            {fieldDecorator("meta_thumbnail_media", {
                                                initialValue: get(initialData, "meta_thumbnail_media", ""),
                                            })(
                                                <Input
                                                    disabled={loading}
                                                    onChange={e => form.setFieldsValue({
                                                        meta_thumbnail_media: e.target.value,
                                                    })}
                                                />
                                            )}
                                        </FormItem>
                                        <FormItem label="intro_video_arvan_uuid">
                                            {fieldDecorator("intro_video_arvan_uuid", {
                                                initialValue: get(initialData, "intro_video_arvan_uuid", ""),
                                                rules: [
                                                    {
                                                        required: true,
                                                        type: "string",
                                                        message: this.context.intl.formatMessage({
                                                            id:
                                                                "course.add.form.error.required",
                                                        }),
                                                    },
                                                ],
                                            })(
                                                <Input
                                                    disabled={loading}
                                                    onChange={e => form.setFieldsValue({
                                                        intro_video_arvan_uuid: e.target.value,
                                                    })}
                                                />
                                            )}
                                        </FormItem>
                                        <FormItem label="availablePeriodDay">
                                            {fieldDecorator("available_period_day", {
                                                initialValue: get(initialData, "available_period_day", 0),
                                            })(
                                                <Input
                                                    disabled={loading}
                                                    type="number"
                                                    min="1"
                                                />
                                            )}
                                        </FormItem>
                                        <FormItem label="category_id">
                                            {fieldDecorator("category_id", {
                                                initialValue: get(initialData, "category_id.id", ""),
                                                rules: [
                                                    {
                                                        required: true,
                                                        type: "number",
                                                        message: this.context.intl.formatMessage({
                                                            id:
                                                                "course.add.form.error.required",
                                                        }),
                                                    },
                                                ],
                                            })(
                                                <Select
                                                    onChange={value => this.changeCategory(value, 'category_id', form.setFieldsValue)}
                                                >
                                                    {map(isEmpty(filteredData['CATEGORY'])
                                                        ? get(packageData, "courses", "")['CATEGORY']
                                                        : filteredData['CATEGORY'], (item, index) => {
                                                        return <Option value={item.id}>
                                                            <IntlMessages id={item.title}/>
                                                        </Option>
                                                    })}
                                                </Select>
                                            )}
                                        </FormItem>
                                        <FormItem label="mobile_thumbnail_media">
                                            {isEmpty(get(initialData, "mobile_thumbnail_media", ''))
                                                ?
                                                fieldDecorator("mobile_thumbnail_media", {
                                                    initialValue: get(initialData, "mobile_thumbnail_media", '')
                                                })
                                                (<MobileThumbnailImage
                                                    url={constants.MOBILE_THUMBNAIL_URL}
                                                    uploadName={constants.MOBILE_THUMBNAIL_IMAGE}
                                                    onChanges={value => form.setFieldsValue({
                                                        mobile_thumbnail_media: value,
                                                    })}
                                                    currentImage={get(initialData, "mobile_thumbnail_media", '')}
                                                />)
                                                : fieldDecorator("mobile_thumbnail_media", {
                                                    initialValue: split(get(initialData, "mobile_thumbnail_media", ''), '/')[7],
                                                })
                                                (<MobileThumbnailImage
                                                    url={constants.MOBILE_THUMBNAIL_URL}
                                                    uploadName={constants.MOBILE_THUMBNAIL_IMAGE}
                                                    onChanges={value => form.setFieldsValue({
                                                        mobile_thumbnail_media: value,
                                                    })}
                                                    currentImage={get(initialData, "mobile_thumbnail_media", '')}
                                                />)
                                            }
                                        </FormItem>
                                        <FormItem
                                            label={this.context.intl.formatMessage({
                                                id:
                                                    "package.list.meta_mobile_thumbnail_media",
                                            })}
                                        >
                                            {fieldDecorator("meta_mobile_thumbnail_media", {
                                                initialValue: get(initialData, "meta_mobile_thumbnail_media", ""),
                                            })(
                                                <Input
                                                    disabled={loading}
                                                    onChange={e => form.setFieldsValue({
                                                        meta_mobile_thumbnail_media: e.target.value,
                                                    })}
                                                />
                                            )}
                                        </FormItem>
                                        {
                                            <span>

                                                    {map(this.state.course_sell_types, (k, index) => (
                                                        <span>
                                                            <div className="wrapper">
                                                                <Col className="first-item" span={11}>
                                                                    <FormItem
                                                                        label={this.context.intl.formatMessage({
                                                                            id:
                                                                                "package.list.course",
                                                                        })}
                                                                    >
                                                                        <Select
                                                                            placeholder={this.context.intl.formatMessage({
                                                                                id: "package.list.course",
                                                                            })}
                                                                            value={this.state.course_sell_types[index].course_id}
                                                                            onSearch={(value) => this.onSearch(value, 'COURSE', 'filter[header_title]')}
                                                                            onChange={value => this.changeCourseSellType(value, index, 'course_id', form.setFieldsValue)}
                                                                            showArrow
                                                                            showSearch
                                                                            filterOption={false}
                                                                            notFoundContent={null}
                                                                            defaultActiveFirstOption={false}
                                                                        >

                                                                                {map(isEmpty(filteredData['COURSE'])
                                                                                    ? get(packageData, "courses", "")['COURSE']
                                                                                    : filteredData['COURSE'], (item, index) => {

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
                                                                <Col span={11}>
                                                                    <FormItem
                                                                        label={this.context.intl.formatMessage({
                                                                            id:
                                                                                "package.list.course_sell_type",
                                                                        })}
                                                                    >
                                                                          <Select
                                                                              showSearch
                                                                              placeholder={this.context.intl.formatMessage({
                                                                                  id: "package.list.course_sell_type",
                                                                              })}
                                                                              value={this.state.course_sell_types[index].course_sell_type_id}
                                                                              onSearch={(value) => this.onSearch(value, this.state.course_sell_types[index].course_sell_type_id, 'filter[title]')}
                                                                              onChange={value => this.changeCourseSellType(value, index, 'course_sell_type_id', value => form.setFieldsValue({
                                                                                  course_sell_type_id: value,
                                                                              }))}
                                                                              defaultActiveFirstOption={false}
                                                                              showArrow={true}
                                                                              filterOption={false}
                                                                              notFoundContent={null}
                                                                          >
                                                                            {map(isEmpty(filteredData[this.state.course_sell_types[index].course_sell_type_id])
                                                                                ? get(packageData, "Sell_types", "")['Sell_type']
                                                                                 : filteredData[this.state.course_sell_types[index].course_sell_type_id], (item, i) => {
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
                                                                <Col span={24}>
                                                                    <FormItem>
                                                                    <Input
                                                                        placeholder="order"
                                                                        onChange={e => this.changeCourseSellType(e.target.value, index, 'order', value => form.setFieldsValue({
                                                                            course_sell_types: value,
                                                                        }))}
                                                                        value={this.state.course_sell_types[index].order}
                                                                    />
                                                                    </FormItem>
                                                                </Col>
                                                            </div>
                                                            <Col span={24}>
                                                                {this.state.course_sell_types.length > 0 ? (
                                                                    <Button
                                                                        className="remove-button"
                                                                        onClick={() => this.removeCourseSellType(index)}>
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
                                                            course_sell_types: [...this.state.course_sell_types, {}]
                                                        })}
                                                        style={{width: '60%'}}>
                                                <Icon type="plus"/>افزودن  نوع فروش
                                            </Button>
                                            </span>
                                        }
                                        {
                                            <span>

                                                {map(this.state.teachers, (k, index) => (
                                                    <span>
                                                            <div className="wrapper">
                                                                <Col className="first-item" span={11}>
                                                                    <FormItem>
                                                                        <Select
                                                                            placeholder={this.context.intl.formatMessage({
                                                                                id: "package.list.teacher_profile_id",
                                                                            })}
                                                                            value={this.state.teachers[index].teacher_profile_id}
                                                                            onChange={value => this.changeTeachers(value, index, 'teacher_profile_id', form.setFieldsValue)}
                                                                            onSearch={(value) => this.onSearch(value, 'TEACHER', 'filter[name]')}
                                                                            showArrow
                                                                            showSearch
                                                                            filterOption={false}
                                                                            notFoundContent={null}
                                                                            defaultActiveFirstOption={false}
                                                                        >
                                                                            {map(isEmpty(filteredData['TEACHER'])
                                                                                   ? get(packageData, "courses", "")['TEACHER']
                                                                                   : filteredData['TEACHER'], (item, index) => {
                                                                              return <Option
                                                                                   value={item.id}
                                                                                   key={item.id}
                                                                               >
                                                                                   {item.name}
                                                                               </Option>
                                                                               })}
                                                                        </Select>

                                                                </FormItem>
                                                                </Col>
                                                                <Col span={11}>
                                                                    <FormItem>
                                                                    <Input
                                                                        placeholder="order"
                                                                        onChange={e => this.changeTeachers(e.target.value, index, 'order', value => form.setFieldsValue({
                                                                            teachers: value,
                                                                        }))}
                                                                        value={this.state.teachers[index].order}
                                                                    />
                                                                    </FormItem>
                                                                </Col>
                                                            </div>
                                                            <Col span={24}>
                                                                {this.state.teachers.length > 0 ? (
                                                                    <Button
                                                                        className="remove-button"
                                                                        onClick={() => this.removeTeachers(index)}>
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
                                                            teachers: [...this.state.teachers, {}]
                                                        })}
                                                        style={{width: '60%'}}>
                                                <Icon type="plus"/> افزودن  نوع استاد
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
        [formConstants.FORM, `${constants.PACKAGE}_data_loading`],
        false
    ),
    packageData: state.getIn(
        [constants.PACKAGE],
        {}
    ),
    initialData: state.getIn(
        [formConstants.FORM, `${constants.PACKAGE}_data`, 'data'],
        false
    ),
    filteredData: state.getIn(
        [constants.PACKAGE, 'filtered'],
        {}
    ),
    loading: state.getIn(
        [formConstants.FORM, `${constants.PACKAGE}_loading`],
        false
    ),
});

const mapDispatchToProps = dispatch => {
    const {getCourse, getSellType, getDataByFilter} = actions;
    return bindActionCreators({getCourse, getSellType, getDataByFilter}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(toJS(Add));
