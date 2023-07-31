import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from 'redux';
import {toJS} from "hoc/toJsHoc";
import {Row, Col, Spin, Icon, Steps} from "antd";
import get from "lodash/get";
import Checkbox from "components/uiElements/checkBox";
import IntlMessages from "utils/intlMessages";
import * as constants from "./constants";
import {createUpload} from "containers/upload/upload";
import {createForm} from "containers/form/form";
import TextArea from "components/uiElements/textArea";
import PropTypes from 'prop-types';
import FormItem from "components/uiElements/formItem";
import Input from "components/uiElements/textInput";
import Button from "components/uiElements/button";
import Select, {SelectMultiple, Option} from "components/uiElements/select";
import * as formConstants from "containers/form/constants";
import * as actions from "./actions";
import Style from './course.style';
import map from 'lodash/map';
import split from 'lodash/split';
import remove from 'lodash/remove';
import isEmpty from "lodash/isEmpty";

class Add extends Component {
    constructor(props, context) {
        super(props);
        this.state = {
            current: 0,
            typeList: '',
            tags: props.initialData.tags ? props.initialData.tags : [],
            faqs: props.initialData.faqs ? props.initialData.faqs : [],
            properties: props.initialData.properties ? props.initialData.properties : [],
            teachers: props.initialData.teachers ? props.initialData.teachers : [],
            seasons: props.initialData.seasons ? props.initialData.seasons : [],
            sell_types: props.initialData.sell_types ? props.initialData.sell_types : [],
            prerequisites: props.initialData.prerequisites ? props.initialData.prerequisites : [],
            is_published: false,
            show_price: false,
            university_access: false,
        };
        this.addForm = createForm({
            name: constants.COURSE,
            url: constants.COURSE_URL,
            id: props.match.params.id,
            title: context.intl.formatMessage({
                id: "course.add.title",
            }),
        });
        this.headerImage = createUpload(constants.HEADER_UPLOADER);
        this.headerMobileImage = createUpload(constants.HEADER_MOBILE_UPLOADER);
        this.thumbnailImage = createUpload(constants.THUMBNAIL_UPLOADER);
        this.thumbnailMobileImage = createUpload(constants.THUMBNAIL_MOBILE_UPLOADER);
        this.contentImage = createUpload(constants.CONTENT_UPLOADER);
        this.contentMobileImage = createUpload(constants.CONTENT_MOBILE_UPLOADER);
        this.syllabusImage = createUpload(constants.SYLLABUS_UPLOADER);
        this.syllabusAttachmentImage = createUpload(constants.SYLLABUS_ATTACHMENT_UPLOADER);
        this.certificateImage = createUpload(constants.CERTIFICATE_UPLOADER);
    }

    componentDidMount() {
        const {getData} = this.props;
        getData();
    };

    componentWillReceiveProps(prevProps) {
        if (prevProps.initialData !== this.props.initialData) {
            this.setState({
                tags: prevProps.initialData.tags,
                faqs: prevProps.initialData.faqs,
                properties: prevProps.initialData.properties,
                teachers: prevProps.initialData.teachers,
                seasons: prevProps.initialData.seasons,
                sell_types: prevProps.initialData.sell_types,
                prerequisites: prevProps.initialData.prerequisites,
                is_published: prevProps.initialData.is_published,
                show_price: prevProps.initialData.show_price,
                university_access: prevProps.initialData.university_access,
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

    changeCheckboxPrice = (e, form) => {
        this.setState({
            show_price: e.target.checked
        });
        form.setFieldsValue({
            show_price: e.target.checked,
        });
    };

    changeCheckboxUni = (e, form) => {
        this.setState({
            university_access: e.target.checked
        });
        form.setFieldsValue({
            university_access: e.target.checked,
        });
    };

    changeTag = (value, index, type, setData) => {
        let changedItem = this.state.tags;
        const selectedItem = changedItem[index];
        delete selectedItem[type];
        changedItem[index] = {[type]: value, ...changedItem[index]};
        setData({tags: changedItem});
        this.setState({
            tags: changedItem
        });
    };

    changeFaq = (value, index, type, setData) => {
        let changedItem = this.state.faqs;
        const selectedItem = changedItem[index];
        delete selectedItem[type];
        changedItem[index] = {[type]: value, ...changedItem[index]};
        setData({faqs: changedItem});
        this.setState({
            faqs: changedItem
        });
    };

    changeProperty = (value, index, type, setData) => {
        let changedItem = this.state.properties;
        const selectedItem = changedItem[index];
        delete selectedItem[type];
        changedItem[index] = {[type]: value, ...changedItem[index]};
        setData({properties: changedItem});
        this.setState({
            properties: changedItem
        });
    };

    changeTeacher = (value, index, type, setData) => {
        let changedItem = this.state.teachers;
        const selectedItem = changedItem[index];
        delete selectedItem[type];
        changedItem[index] = {[type]: value, ...changedItem[index]};
        setData({teachers: changedItem});
        this.setState({
            teachers: changedItem
        });
    };

    changeSeason = (value, index, type, setData) => {
        let changedItem = this.state.seasons;
        const selectedItem = changedItem[index];
        delete selectedItem[type];
        changedItem[index] = {[type]: value, ...changedItem[index]};
        setData({seasons: changedItem});
        this.setState({
            seasons: changedItem
        });
    };

    changeSaleType = (value, index, type, setData) => {
        let changedItem = this.state.sell_types;
        const selectedItem = changedItem[index];
        delete selectedItem[type];
        changedItem[index] = {[type]: value, ...changedItem[index]};
        setData({sell_types: changedItem});
        this.setState({
            sell_types: changedItem
        });
    };

    changePrerequisites = (value, index, type, setData) => {
        let changedItem = this.state.prerequisites;
        const selectedItem = changedItem[index];
        delete selectedItem[type];
        changedItem[index] = {[type]: value, ...changedItem[index]};
        setData({prerequisites: changedItem});
        this.setState({
            prerequisites: changedItem
        });
    };

    removeTeachers = id => {
        const updatedList = this.state.teachers;
        remove(updatedList, function (n, i) {
            return i === id;
        });
        this.setState({teachers: updatedList});
    };

    removeProperties = id => {
        const updatedList = this.state.properties;
        remove(updatedList, function (n, i) {
            return i === id;
        });
        this.setState({properties: updatedList});
    };

    removeTag = id => {
        const updatedList = this.state.tags;
        remove(updatedList, function (n, i) {
            return i === id;
        });
        this.setState({tags: updatedList});
    };
    removeFaq = id => {
        const updatedList = this.state.faqs;
        remove(updatedList, function (n, i) {
            return i === id;
        });
        this.setState({faqs: updatedList});
    };

    removePrerequisites = id => {
        const updatedList = this.state.prerequisites;
        remove(updatedList, function (n, i) {
            return i === id;
        });
        this.setState({prerequisites: updatedList});
    };

    removeSeasons = id => {
        const updatedList = this.state.seasons;
        remove(updatedList, function (n, i) {
            return i === id;
        });
        this.setState({seasons: updatedList});
    };

    removeSaleType = id => {
        const updatedList = this.state.sell_types;
        remove(updatedList, function (n, i) {
            return i === id;
        });
        this.setState({sell_types: updatedList});
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

    next() {
        const current = this.state.current + 1;
        this.setState({ current });
    }

    prev() {
        const current = this.state.current - 1;
        this.setState({ current });
    }
    onChangeStep = current => {
        console.log('onChange:', current);
        this.setState({ current });
    };

    render() {
        const {
            loading,
            dataLoading,
            initialData,
            detailData,
            filteredData,
        } = this.props;
        const levels = [
            'basic',
            'intermediate',
            'advance',
        ];
        const saleTypes = [
            'with_degree',
            'extended_with_degree',
            'non_degree',
            'free',
        ];
        const Form = this.addForm;
        const HeaderImage = this.headerImage;
        const HeaderMobileImage = this.headerMobileImage;
        const ThumbnailImage = this.thumbnailImage;
        const ThumbnailMobileImage = this.thumbnailMobileImage;
        const ContentImage = this.contentImage;
        const ContentMobileImage = this.contentMobileImage;
        const SyllabusImage = this.syllabusImage;
        const SyllabusAttachmentImage = this.syllabusAttachmentImage;
        const CertificateImage = this.certificateImage;
        const { Step } = Steps;
        const {current } = this.state;
        const steps = [
            {
                title: 'اول',
            },
            {
                title: 'دوم',
            },
            {
                title: 'سوم',
            },
            {
                title: 'چهارم',
            },
            {
                title: 'آخر',
            },
        ];
        return (
            <Style>

                <Spin spinning={dataLoading}>
                    <Form extraData={{
                        tags: this.state.tags,
                        faqs: this.state.faqs,
                        properties: this.state.properties,
                        teachers: this.state.teachers,
                        seasons: this.state.seasons,
                        sell_types: this.state.sell_types,
                        prerequisites: this.state.prerequisites,
                    }}>
                        {(fieldDecorator, handleSubmit, data, form) => {
                            return (
                                <Row>
                                    <Col className="form-col" span={24} md={{span: 14}}>
                                        <Steps current={current} onChange={this.onChangeStep}>
                                            {steps.map(item => (
                                                <Step key={item.title} title={item.title} />
                                            ))}
                                        </Steps>
                                        <div className="steps-content">
                                            <FormItem label="headerTitle" className={current > 0 && "hide"}>
                                                    {fieldDecorator("header_title", {
                                                        initialValue: get(initialData, "header_title", ""),
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
                                                                header_title: e.target.value,
                                                            })}
                                                        />
                                                    )}
                                                </FormItem>
                                            <FormItem label="metaTitle" className={current > 0 && "hide"}>
                                                {fieldDecorator("meta_title", {
                                                    initialValue: get(initialData, "meta_title", ""),
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
                                                            meta_title: e.target.value,
                                                        })}
                                                    />
                                                )}
                                            </FormItem>
                                            <FormItem label="seoTitle" className={current > 0 && "hide"}>
                                                    {fieldDecorator("seo_title", {
                                                        initialValue: get(initialData, "seo_title", ""),
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
                                                                seo_title: e.target.value,
                                                            })}
                                                        />
                                                    )}
                                                </FormItem>
                                            <FormItem label="headerDescription" className={current > 0 && "hide"} >
                                                    {fieldDecorator("header_descriptions", {
                                                            initialValue: get(initialData, "header_descriptions", ""),
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
                                                            <TextArea disabled={loading}/>
                                                        )}
                                            </FormItem>
                                            <FormItem label="metaDesc" className={current > 0 && "hide"}>
                                                {fieldDecorator("meta_desc", {
                                                    initialValue: get(initialData, "meta_desc", ""),
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
                                                            meta_desc: e.target.value,
                                                        })}
                                                    />
                                                )}
                                            </FormItem>
                                            <FormItem label="contentTitle" className={current > 0 && "hide"}>
                                                {fieldDecorator("content_title", {
                                                    initialValue: get(initialData, "content_title", ""),
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
                                                            content_title: e.target.value,
                                                        })}
                                                    />
                                                )}
                                            </FormItem>
                                            <FormItem label="contentDescription" className={current > 0 && "hide"}>
                                                {fieldDecorator("content_descriptions", {
                                                    initialValue: get(initialData, "content_descriptions", ""),
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
                                                    <TextArea disabled={loading}/>
                                                )}
                                            </FormItem>
                                            <FormItem label="intro_video_arvan_uuid" className={current > 0 && "hide"}>
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
                                            <FormItem label="syllabusTitle" className={current > 0 && "hide"}>
                                                {fieldDecorator("syllabus_title", {
                                                    initialValue: get(initialData, "syllabus_title", ""),
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
                                                            syllabus_title: e.target.value,
                                                        })}
                                                    />
                                                )}
                                            </FormItem>
                                            <FormItem label="syllabusDescription" className={current > 0 && "hide"}>
                                                {fieldDecorator("syllabus_descriptions", {
                                                    initialValue: get(initialData, "syllabus_descriptions", ""),
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
                                                    <TextArea
                                                        disabled={loading}
                                                    />
                                                )}
                                            </FormItem>

                                            <FormItem label="headerImage" className={current === 0 || current > 1 ? "hide" : ''}>
                                                {fieldDecorator("header_media", {
                                                    initialValue: split(get(initialData, "header_media", ''), '/')[6],
                                                    rules: [
                                                        {
                                                            required: true,
                                                            message: this.context.intl.formatMessage({
                                                                id:
                                                                    "course.add.form.error.required",
                                                            }),
                                                        },
                                                    ],
                                                })(<HeaderImage
                                                    url={constants.HEADER_URL}
                                                    uploadName={constants.HEADER_IMAGE}
                                                    onChanges={value => form.setFieldsValue({
                                                        header_media: value,
                                                    })}
                                                    currentImage={get(initialData, "header_media", '')}
                                                />)}
                                            </FormItem>
                                            <FormItem label="meta_header_media" className={current === 0 || current > 1 ? "hide" : ''}>
                                                {fieldDecorator("meta_header_media", {
                                                    initialValue: get(initialData, "meta_header_media", ""),
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
                                                            meta_header_media: e.target.value,
                                                        })}
                                                    />
                                                )}
                                            </FormItem>
                                            <FormItem label="headerMobileImage" className={current === 0 || current > 1 ? "hide" : ''}>
                                                {fieldDecorator("mobile_header_media", {
                                                    initialValue: split(get(initialData, "mobile_header_media", ''), '/')[7],
                                                    rules: [
                                                        {
                                                            required: true,
                                                            message: this.context.intl.formatMessage({
                                                                id:
                                                                    "course.add.form.error.required",
                                                            }),
                                                        },
                                                    ],
                                                })(<HeaderMobileImage
                                                    url={constants.HEADER_MOBILE_URL}
                                                    uploadName={constants.HEADER_MOBILE_IMAGE}
                                                    onChanges={value => form.setFieldsValue({
                                                        mobile_header_media: value,
                                                    })}
                                                    currentImage={get(initialData, "mobile_header_media", '')}
                                                />)}
                                            </FormItem>
                                            <FormItem label="meta_mobile_header_media" className={current === 0 || current > 1 ? "hide" : ''}>
                                                {fieldDecorator("meta_mobile_header_media", {
                                                    initialValue: get(initialData, "meta_mobile_header_media", ""),
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
                                                            meta_mobile_header_media: e.target.value,
                                                        })}
                                                    />
                                                )}
                                            </FormItem>
                                            <FormItem label="thumbnailImage" className={current === 0 || current > 1 ? "hide" : ''}>
                                                {fieldDecorator("thumbnail_media", {
                                                    initialValue: split(get(initialData, "thumbnail_media", ''), '/')[6],
                                                    rules: [
                                                        {
                                                            required: true,
                                                            message: this.context.intl.formatMessage({
                                                                id:
                                                                    "course.add.form.error.required",
                                                            }),
                                                        },
                                                    ],
                                                })(<ThumbnailImage
                                                    url={constants.THUMBNAIL_URL}
                                                    uploadName={constants.THUMBNAIL_IMAGE}
                                                    onChanges={value => form.setFieldsValue({
                                                        thumbnail_media: value,
                                                    })}
                                                    currentImage={get(initialData, "thumbnail_media", '')}
                                                />)}
                                            </FormItem>
                                            <FormItem label="meta_thumbnail_media" className={current === 0 || current > 1 ? "hide" : ''}>
                                                {fieldDecorator("meta_thumbnail_media", {
                                                    initialValue: get(initialData, "meta_thumbnail_media", ""),
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
                                                            meta_thumbnail_media: e.target.value,
                                                        })}
                                                    />
                                                )}
                                            </FormItem>
                                            <FormItem label="thumbnailMobileImage" className={current === 0 || current > 1 ? "hide" : ''}>
                                                {fieldDecorator("mobile_thumbnail_media", {
                                                    initialValue: split(get(initialData, "mobile_thumbnail_media", ''), '/')[7],
                                                    rules: [
                                                        {
                                                            required: true,
                                                            message: this.context.intl.formatMessage({
                                                                id:
                                                                    "course.add.form.error.required",
                                                            }),
                                                        },
                                                    ],
                                                })(<ThumbnailMobileImage
                                                    url={constants.THUMBNAIL_MOBILE_URL}
                                                    uploadName={constants.THUMBNAIL_MOBILE_IMAGE}
                                                    onChanges={value => form.setFieldsValue({
                                                        mobile_thumbnail_media: value,
                                                    })}
                                                    currentImage={get(initialData, "mobile_thumbnail_media", '')}
                                                />)}
                                            </FormItem>
                                            <FormItem label="meta_mobile_thumbnail_media" className={current === 0 || current > 1 ? "hide" : ''}>
                                                {fieldDecorator("meta_mobile_thumbnail_media", {
                                                    initialValue: get(initialData, "meta_mobile_thumbnail_media", ""),
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
                                                            meta_mobile_thumbnail_media: e.target.value,
                                                        })}
                                                    />
                                                )}
                                            </FormItem>
                                            <FormItem label="contentImage" className={current === 0 || current > 1 ? "hide" : ''}>
                                                {fieldDecorator("content_media", {
                                                    initialValue: split(get(initialData, "content_media", ''), '/')[6],
                                                    rules: [
                                                        {
                                                            required: true,
                                                            message: this.context.intl.formatMessage({
                                                                id:
                                                                    "course.add.form.error.required",
                                                            }),
                                                        },
                                                    ],
                                                })(<ContentImage
                                                    url={constants.CONTENT_URL}
                                                    uploadName={constants.CONTENT_IMAGE}
                                                    onChanges={value => form.setFieldsValue({
                                                        content_media: value,
                                                    })}
                                                    currentImage={get(initialData, "content_media", '')}
                                                />)}
                                            </FormItem>
                                            <FormItem label="meta_content_media" className={current === 0 || current > 1 ? "hide" : ''}>
                                                {fieldDecorator("meta_content_media", {
                                                    initialValue: get(initialData, "meta_content_media", ""),
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
                                                            meta_content_media: e.target.value,
                                                        })}
                                                    />
                                                )}
                                            </FormItem>
                                            <FormItem label="contentMobileImage" className={current === 0 || current > 1 ? "hide" : ''}>
                                                {fieldDecorator("mobile_content_media", {
                                                    initialValue: split(get(initialData, "mobile_content_media", ''), '/')[7],
                                                    rules: [
                                                        {
                                                            required: true,
                                                            message: this.context.intl.formatMessage({
                                                                id:
                                                                    "course.add.form.error.required",
                                                            }),
                                                        },
                                                    ],
                                                })(<ContentMobileImage
                                                    url={constants.CONTENT_MOBILE_URL}
                                                    uploadName={constants.CONTENT_MOBILE_IMAGE}
                                                    onChanges={value => form.setFieldsValue({
                                                        mobile_content_media: value,
                                                    })}
                                                    currentImage={get(initialData, "mobile_content_media", '')}
                                                />)}
                                            </FormItem>
                                            <FormItem label="meta_mobile_content_media" className={current === 0 || current > 1 ? "hide" : ''}>
                                                {fieldDecorator("meta_mobile_content_media", {
                                                    initialValue: get(initialData, "meta_mobile_content_media", ""),
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
                                                            meta_mobile_content_media: e.target.value,
                                                        })}
                                                    />
                                                )}
                                            </FormItem>
                                            <FormItem label="syllabusImage" className={current === 0 || current > 1 ? "hide" : ''}>
                                                {fieldDecorator("syllabus_media", {
                                                    initialValue: split(get(initialData, "syllabus_media", ''), '/')[6],
                                                    rules: [
                                                        {
                                                            required: true,
                                                            message: this.context.intl.formatMessage({
                                                                id:
                                                                    "course.add.form.error.required",
                                                            }),
                                                        },
                                                    ],
                                                })(<SyllabusImage
                                                    url={constants.SYLLABUS_URL}
                                                    uploadName={constants.SYLLABUS_IMAGE}
                                                    onChanges={value => form.setFieldsValue({
                                                        syllabus_media: value,
                                                    })}
                                                    currentImage={get(initialData, "syllabus_media", '')}
                                                />)}
                                            </FormItem>
                                            <FormItem label="meta_syllabus_media" className={current === 0 || current > 1 ? "hide" : ''}>
                                                {fieldDecorator("meta_syllabus_media", {
                                                    initialValue: get(initialData, "meta_syllabus_media", ""),
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
                                                            meta_syllabus_media: e.target.value,
                                                        })}
                                                    />
                                                )}
                                            </FormItem>
                                            <FormItem label="syllabusAttachment" className={current === 0 || current > 1 ? "hide" : ''}>
                                                {fieldDecorator("syllabus_file", {
                                                    initialValue: split(get(initialData, "syllabus_file", ''), '/')[6],
                                                    rules: [
                                                        {
                                                            required: true,
                                                            message: this.context.intl.formatMessage({
                                                                id:
                                                                    "course.add.form.error.required",
                                                            }),
                                                        },
                                                    ],
                                                })(<SyllabusAttachmentImage
                                                    url={constants.SYLLABUS_ATTACHMENT_URL}
                                                    uploadName={constants.SYLLABUS_ATTACHMENT}
                                                    onChanges={value => form.setFieldsValue({
                                                        syllabus_file: value,
                                                    })}
                                                    currentImage={get(initialData, "syllabus_file", '')}
                                                />)}
                                            </FormItem>
                                            <FormItem label="certificate" className={current === 0 || current > 1 ? "hide" : ''}>
                                                {isEmpty(get(initialData, "certificate_by_media", ''))
                                                    ? fieldDecorator("certificate_by_media", {
                                                        initialValue: get(initialData, "certificate_by_media", '')
                                                    })
                                                    (<CertificateImage
                                                        url={constants.CERTIFICATE_IMAGE_URL}
                                                        uploadName={constants.CERTIFICATE_IMAGE}
                                                        onChanges={value => form.setFieldsValue({
                                                            certificate_by_media: value,
                                                        })}
                                                        currentImage={get(initialData, "certificate_by_media", '')}
                                                    />)
                                                    : fieldDecorator("certificate_by_media", {
                                                        initialValue: split(get(initialData, "certificate_by_media", ''), '/')[6],
                                                    })
                                                    (<CertificateImage
                                                        url={constants.CERTIFICATE_IMAGE_URL}
                                                        uploadName={constants.CERTIFICATE_IMAGE}
                                                        onChanges={value => form.setFieldsValue({
                                                            certificate_by_media: value,
                                                        })}
                                                        currentImage={get(initialData, "certificate_by_media", '')}
                                                    />)
                                                }
                                            </FormItem>

                                            <FormItem label="level" className={current < 2 || current >= 3 ? "hide" : ''}>
                                                {fieldDecorator("level", {
                                                    initialValue: get(initialData, "level", ""),
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
                                                    <Select>
                                                        {map(levels, (item) => (
                                                            <Option value={item}>
                                                                <IntlMessages id={item}/>
                                                            </Option>
                                                        ))}
                                                    </Select>
                                                )}
                                            </FormItem>
                                            <FormItem label="availablePeriodDay" className={current < 2 || current >= 3 ? "hide" : ''}>
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
                                            <FormItem label="category_id" className={current < 2 || current >= 3 ? "hide" : ''}>
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
                                                        {map(detailData['CATEGORY'], (item) => (
                                                            <Option value={item.id}>
                                                                <IntlMessages id={item.title}/>
                                                            </Option>
                                                        ))}
                                                    </Select>
                                                )}
                                            </FormItem>
                                            <FormItem label="order" className={current < 2 || current >= 3 ? "hide" : ''}>
                                                {fieldDecorator("order", {
                                                    initialValue: get(initialData, "order", 0),
                                                })(
                                                    <Input
                                                        disabled={loading}
                                                        type="number"
                                                        min="1"
                                                    />
                                                )}
                                            </FormItem>
                                            <FormItem className={current < 2 || current >= 3 ? "hide" : ''}>
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
                                            <FormItem className={current < 2 || current >= 3 ? "hide" : ''}>
                                                {fieldDecorator("show_price", {
                                                    initialValue: get(initialData, "show_price", false),
                                                })(
                                                    <Checkbox
                                                        checked={this.state.show_price}
                                                        onChange={e => this.changeCheckboxPrice(e, form)}
                                                    >
                                                        show_price
                                                    </Checkbox>
                                                )}
                                            </FormItem>
                                            <FormItem className={current < 2 || current >= 3 ? "hide" : ''}>
                                                {fieldDecorator("university_access", {
                                                    initialValue: get(initialData, "university_access", false),
                                                })(
                                                    <Checkbox
                                                        checked={this.state.university_access}
                                                        onChange={e => this.changeCheckboxUni(e, form)}
                                                    >
                                                        university_access
                                                    </Checkbox>
                                                )}
                                            </FormItem>

                                            {
                                                <span className={ current < 3 || current === 4 ? "hide" : ''}>
                                                <h6>
                                                    tags
                                                </h6>
                                                    {map(this.state.tags, (k, index) => (
                                                        <span>
                                                            <div className="wrapper">
                                                                <Col className="first-item" span={11}>
                                                                    <FormItem>
                                                                        <Select
                                                                            showSearch
                                                                            placeholder={this.context.intl.formatMessage({
                                                                                id: "tags",
                                                                            })}
                                                                            value={this.state.tags[index].tag_id}
                                                                            onSearch={(value) => this.onSearch(value, 'TAGS', 'filter[tag_name]')}
                                                                            onChange={value => this.changeTag(value, index, 'tag_id', form.setFieldsValue)}
                                                                            defaultActiveFirstOption={false}
                                                                            showArrow={false}
                                                                            filterOption={false}
                                                                            notFoundContent={null}
                                                                        >
                                                                            {map(filteredData['TAGS'] || detailData['TAGS'], ({id, tag_name}) => (
                                                                                <Option
                                                                                    value={id}
                                                                                    key={id}
                                                                                >
                                                                                    {tag_name}
                                                                                </Option>
                                                                            ))}
                                                                        </Select>
                                                                    </FormItem>
                                                                </Col>
                                                                <Col span={11}>
                                                                    <FormItem>
                                                                    <Input
                                                                        placeholder="order"
                                                                        onChange={e => this.changeTag(e.target.value, index, 'order', value => form.setFieldsValue({
                                                                            tags: value,
                                                                        }))}
                                                                        value={this.state.tags[index].order}
                                                                    />
                                                                    </FormItem>
                                                                </Col>
                                                            </div>
                                                            <Col span={24}>
                                                                {this.state.tags.length > 0 ? (
                                                                    <Button
                                                                        className="remove-button"
                                                                        onClick={() => this.removeTag(index)}>
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
                                                                tags: [...this.state.tags, {}]
                                                            })}
                                                            style={{width: '60%'}}>
                                                <Icon type="plus"/> Add field
                                            </Button>
                                            </span>
                                            }
                                            {
                                                <span className={ current < 3 || current === 4 ? "hide" : ''}>
                                                <h6>
                                                    faqs
                                                </h6>
                                                    {map(this.state.faqs, (k, index) => (
                                                        <span>
                                                            <div className="wrapper">
                                                                <Col className="first-item" span={11}>
                                                                    <FormItem>
                                                                        <Select
                                                                            showSearch
                                                                            placeholder={this.context.intl.formatMessage({
                                                                                id: "faqs",
                                                                            })}
                                                                            value={this.state.faqs[index].faq_id}
                                                                            onSearch={(value) => this.onSearch(value, 'FAQS', 'filter[question]')}
                                                                            onChange={value => this.changeFaq(value, index, 'faq_id', form.setFieldsValue)}
                                                                            defaultActiveFirstOption={false}
                                                                            showArrow={false}
                                                                            filterOption={false}
                                                                            notFoundContent={null}
                                                                        >
                                                                            {map(filteredData['FAQS'] || detailData['FAQS'], ({id, question}) => (
                                                                                <Option
                                                                                    value={id}
                                                                                    key={id}
                                                                                >
                                                                                    {question}
                                                                                </Option>
                                                                            ))}
                                                                        </Select>
                                                                    </FormItem>
                                                                </Col>
                                                                <Col span={11}>
                                                                    <FormItem>
                                                                    <Input
                                                                        placeholder="order"
                                                                        onChange={e => this.changeFaq(e.target.value, index, 'order', value => form.setFieldsValue({
                                                                            faqs: value,
                                                                        }))}
                                                                        value={this.state.faqs[index].order}
                                                                    />
                                                                    </FormItem>
                                                                </Col>
                                                            </div>
                                                            <Col span={24}>
                                                                {this.state.faqs.length > 0 ? (
                                                                    <Button
                                                                        className="remove-button"
                                                                        onClick={() => this.removeTag(index)}>
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
                                                                faqs: [...this.state.faqs, {}]
                                                            })}
                                                            style={{width: '60%'}}>
                                                <Icon type="plus"/> Add field
                                            </Button>
                                            </span>
                                            }
                                            {
                                                <span className={ current < 3 || current === 4 ? "hide" : ''}>
                                                <h6>
                                                    properties
                                                </h6>
                                                    {map(this.state.properties, (k, index) => (
                                                        <span>
                                                            <div className="wrapper">
                                                                <Col className="first-item"
                                                                     span={11}>
                                                                    <FormItem>
                                                                        <Select
                                                                            showSearch
                                                                            placeholder={this.context.intl.formatMessage({
                                                                                id: "properties",
                                                                            })}
                                                                            value={this.state.properties[index].property_id}
                                                                            onSearch={(value) => this.onSearch(value, 'PROPERTIES', 'filter[title]')}
                                                                            onChange={value => this.changeProperty(value, index, 'property_id', form.setFieldsValue)}
                                                                            defaultActiveFirstOption={false}
                                                                            showArrow={false}
                                                                            filterOption={false}
                                                                            notFoundContent={null}
                                                                        >
                                                                            {map(filteredData['PROPERTIES'] || detailData['PROPERTIES'], ({id, title}) => (
                                                                                <Option
                                                                                    value={id}
                                                                                    key={id}
                                                                                >
                                                                                    <IntlMessages id={title}/>
                                                                                </Option>
                                                                            ))}
                                                                        </Select>
                                                                    </FormItem>
                                                                </Col>
                                                                <Col span={11}>
                                                                    <FormItem>
                                                                        <Input
                                                                            placeholder="order"
                                                                            onChange={e => this.changeProperty(e.target.value, index, 'order', value => form.setFieldsValue({
                                                                                properties: value,
                                                                            }))}
                                                                            value={this.state.properties[index].order}
                                                                        />
                                                                    </FormItem>
                                                                </Col>
                                                            </div>
                                                            <Col span={24}>
                                                                {this.state.properties.length > 0 ? (
                                                                    <Button
                                                                        className="remove-button"
                                                                        onClick={() => this.removeProperties(index)}>
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
                                                                properties: [...this.state.properties, {}]
                                                            })}
                                                            style={{width: '60%'}}>
                                                <Icon type="plus"/> Add field
                                            </Button>
                                            </span>
                                            }
                                            {
                                                <span className={ current < 3 || current === 4 ? "hide" : ''}>
                                                <h6>
                                                    teachers
                                                </h6>
                                                    {map(this.state.teachers, (k, index) => (
                                                        <span>
                                                            <div className="wrapper">
                                                                <Col className="first-item"
                                                                     span={11}>
                                                                    <FormItem>
                                                                        <Select
                                                                            showSearch
                                                                            placeholder={this.context.intl.formatMessage({
                                                                                id: "teachers",
                                                                            })}
                                                                            value={this.state.teachers[index].teacher_profile_id}
                                                                            onSearch={(value) => this.onSearch(value, 'TEACHER', 'filter[name]')}
                                                                            onChange={value => this.changeTeacher(value, index, 'teacher_profile_id', form.setFieldsValue)}
                                                                            defaultActiveFirstOption={false}
                                                                            showArrow={false}
                                                                            filterOption={false}
                                                                            notFoundContent={null}
                                                                        >
                                                                            {map(filteredData['TEACHER'] || detailData['TEACHER'], ({id, name}) => (
                                                                                <Option
                                                                                    value={id}
                                                                                    key={id}
                                                                                >
                                                                                    <IntlMessages id={name}/>
                                                                                </Option>
                                                                            ))}
                                                                        </Select>
                                                                </FormItem>
                                                                </Col>
                                                                <Col span={11}>
                                                                    <FormItem>
                                                                        <Input
                                                                            placeholder="order"
                                                                            onChange={e => this.changeTeacher(e.target.value, index, 'order', value => form.setFieldsValue({
                                                                                lessons: value,
                                                                            }))}
                                                                            value={this.state.teachers[index].order}
                                                                        />
                                                                    </FormItem>
                                                                </Col>
                                                            </div>
                                                            <Col span={24}>
                                                                {this.state.teachers.length > 1 ? (
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
                                                <Icon type="plus"/> Add field
                                            </Button>
                                            </span>
                                            }

                                            {
                                                <span className={ current < 3 || current === 4 ? "hide" : ''}>
                                                <h6>
                                                    prerequisites
                                                </h6>
                                                    {map(this.state.prerequisites, (k, index) => (
                                                        <span>
                                                            <div className="wrapper">
                                                                <Col className="first-item" span={11}>
                                                                    <FormItem>
                                                                        <Select
                                                                            showSearch
                                                                            placeholder={this.context.intl.formatMessage({
                                                                                id: "course_prerequisite_id",
                                                                            })}
                                                                            value={this.state.prerequisites[index].course_prerequisite_id}
                                                                            onSearch={(value) => this.onSearch(value, 'COURSE', 'filter[header_title]')}
                                                                            onChange={value => this.changePrerequisites(value, index, 'course_prerequisite_id', form.setFieldsValue)}
                                                                            defaultActiveFirstOption={false}
                                                                            showArrow={false}
                                                                            filterOption={false}
                                                                            notFoundContent={null}
                                                                        >
                                                                                {map(filteredData['COURSE'] || detailData['COURSE'], ({id, header_title}) => (
                                                                                    <Option
                                                                                        value={id}
                                                                                        key={id}
                                                                                    >
                                                                                        <IntlMessages id={header_title}/>
                                                                                    </Option>
                                                                                ))}
                                                                            </Select>
                                                                </FormItem>
                                                                </Col>
                                                                <Col span={11}>
                                                                    <FormItem>
                                                                    <Input
                                                                        placeholder="order"
                                                                        onChange={e => this.changePrerequisites(e.target.value, index, 'order', value => form.setFieldsValue({
                                                                            prerequisites: value,
                                                                        }))}
                                                                        value={this.state.prerequisites[index].order}
                                                                    />
                                                                    </FormItem>
                                                                </Col>
                                                            </div>
                                                            <Col span={24}>
                                                                {this.state.prerequisites.length > 0 ? (
                                                                    <Button
                                                                        className="remove-button"
                                                                        onClick={() => this.removePrerequisites(index)}>
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
                                                                prerequisites: [...this.state.prerequisites, {}]
                                                            })}
                                                            style={{width: '60%'}}>
                                                <Icon type="plus"/> Add field
                                            </Button>
                                            </span>
                                            }

                                            {
                                                <span className={ current < 4 ? "hide" : ''}>
                                                <h6>
                                                    seasons
                                                </h6>
                                                    {map(this.state.seasons, (k, index) => (
                                                        <span>
                                                            <div className="wrapper">
                                                                <Col className="first-item"
                                                                     span={11}>
                                                                    <FormItem>
                                                                    <Select
                                                                        showSearch
                                                                        placeholder={this.context.intl.formatMessage({
                                                                            id: "seasons",
                                                                        })}
                                                                        value={this.state.seasons[index].season_id}
                                                                        onSearch={(value) => this.onSearch(value, 'SEASONS', 'filter[title]')}
                                                                        onChange={value => this.changeSeason(value, index, 'season_id', form.setFieldsValue)}
                                                                        defaultActiveFirstOption={false}
                                                                        showArrow={false}
                                                                        filterOption={false}
                                                                        notFoundContent={null}
                                                                    >
                                                                            {map(filteredData['SEASONS'] || detailData['SEASONS'], ({id, title}) => (
                                                                                <Option
                                                                                    value={id}
                                                                                    key={id}
                                                                                >
                                                                                    <IntlMessages id={title}/>
                                                                                </Option>
                                                                            ))}
                                                                        </Select>
                                                                </FormItem>
                                                                </Col>
                                                                <Col span={11}>
                                                                    <FormItem>
                                                                    <Input
                                                                        placeholder="order"
                                                                        onChange={e => this.changeSeason(e.target.value, index, 'order', value => form.setFieldsValue({
                                                                            seasons: value,
                                                                        }))}
                                                                        value={this.state.seasons[index].order}
                                                                    />
                                                                    </FormItem>
                                                                </Col>
                                                            </div>
                                                            <Col span={24}>
                                                                {this.state.seasons.length > 1 ? (
                                                                    <Button
                                                                        className="remove-button"
                                                                        onClick={() => this.removeSeasons(index)}>
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
                                                                seasons: [...this.state.seasons, {}]
                                                            })}
                                                            style={{width: '60%'}}>
                                                <Icon type="plus"/> Add field
                                            </Button>
                                            </span>
                                            }

                                        </div>
                                    </Col>
                                    <Col span={24} style={{display: "flex", marginTop: "30px"}}>
                                        <Button
                                            className="btn btn-primary shadow-2"
                                            type="primary"
                                            onClick={handleSubmit}
                                            loading={loading}
                                        >
                                            {this.context.intl.formatMessage({
                                                id: "course.add.form.submit",
                                            })}
                                        </Button>
                                    </Col>
                                </Row>
                            );
                        }}
                    </Form>
                    <Row>
                        <div className="steps-action">
                            {current < steps.length - 1 && (
                                <Button type="primary" onClick={() => this.next()}>
                                    مرحله بعد
                                </Button>
                            )}
                            {current === steps.length - 1 && (
                                <Button type="primary" >
                                    تمام
                                </Button>
                            )}
                            {current > 0 && (
                                <Button style={{ margin: '0 8px' }} onClick={() => this.prev()}>
                                    مرحله قبل
                                </Button>
                            )}
                        </div>
                    </Row>
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
        [formConstants.FORM, `${constants.COURSE}_data_loading`],
        false
    ),
    detailData: state.getIn(
        [constants.COURSE_DATA, 'data'],
        {}
    ),
    filteredData: state.getIn(
        [constants.COURSE_DATA, 'filtered'],
        {}
    ),
    initialData: state.getIn(
        [formConstants.FORM, `${constants.COURSE}_data`, 'data'],
        false
    ),
    loading: state.getIn(
        [formConstants.FORM, `${constants.COURSE}_loading`],
        false
    ),
});

const mapDispatchToProps = dispatch => {
    const {getData, getDataByFilter} = actions;
    return bindActionCreators({getData, getDataByFilter}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(toJS(Add));
