import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {push} from "connected-react-router";
import {toJS} from "hoc/toJsHoc";
import {createTable} from "containers/table/table";
import * as constants from "./constants";
import * as actions from "./actions";
import { booleanRender } from "containers/table/renders/booleanRender";
import * as privateRoutes from "router/private/constants";
import LocaleNumber from "utils/localeNumber";
import PropTypes from 'prop-types';
import * as tableActions from "../../containers/table/actions";
import {Button, Col, Form, Input, Modal, Row} from "antd";
import Checkbox from "components/uiElements/checkBox";
import 'react-dropzone-uploader/dist/styles.css';
import get from "lodash/index";
import split from 'lodash/split';
import {createForm} from "containers/form/form";
import {createUpload} from "containers/upload/upload";
import FormItem from "components/uiElements/formItem";
import * as formConstants from "containers/form/constants";
import * as userConstants from "utils/globalRedux/user/constants";

class Student extends Component {
    constructor(props, context) {
        super(props);
        this.state = {
            visible: false,
            certificate: false,
            extend_visible: false,
            score_visible: false,
            university_access: false
        };
        const {push} = props;
        this.props.setCourseId(props.match.params.id);
        this.table = createTable(constants.STUDENT);
        const customActions = {
            onClick: id => {
                push(
                    privateRoutes.ROUTE_COURSE_SELL_TYPES.replace(":id", id || -1)
                )
            },
            title: context.intl.formatMessage({
                id: "course."
            })
        };
        this.tableConf = {
            url: `${constants.COURSE_URL}/${props.match.params.id}/student_profile`,
            buttonWithAction: () => {
                push(privateRoutes.ROUTE_COURSE_NEW_STUDENT, props.match.params.id);
            },
            secondButtonWithAction: () => {
                push(privateRoutes.ROUTE_COURSE_LIST);
            },
            secondCustomTextButtonWithAction: context.intl.formatMessage({
                id: "course.return"
            }),
            customTextButtonWithAction: context.intl.formatMessage({
                id: "course.new.student"
            }),
            columns: [
                {
                    title: context.intl.formatMessage({
                        id: "course.list.id"
                    }),
                    dataIndex: "id",
                    key: "id",
                    render: record => <LocaleNumber>{record}</LocaleNumber>
                },
                {
                    title: context.intl.formatMessage({
                        id: "course.student.list.name"
                    }),
                    dataIndex: "name",
                    key: "name"
                },
                {
                    title: context.intl.formatMessage({
                        id: "course.student.list.mobile"
                    }),
                    dataIndex: "mobile_number",
                    key: "mobile_number"
                },
                {
                    title: context.intl.formatMessage({
                        id: "course.student.list.national_code"
                    }),
                    dataIndex: "national_code",
                    key: "national_code"
                },
                {
                    title: context.intl.formatMessage({
                        id: "course.student.list.passport_number"
                    }),
                    dataIndex: "passport_number",
                    key: "passport_number"
                },
                {
                    title: context.intl.formatMessage({
                        id: "course.student.list.status"
                    }),
                    dataIndex: "status",
                    key: "status"
                },
                {
                    title: context.intl.formatMessage({
                        id: "course.student.list.certificate"
                    }),
                    dataIndex: "certificate_file",
                    key: "certificate_file",
                },
                {
                    title: context.intl.formatMessage({
                        id: "course.student.list.can.have.certificate"
                    }),
                    dataIndex: "can_have_certificate",
                    key: "can_have_certificate",
                    render: bool => booleanRender(bool),
                },

                {
                    title: context.intl.formatMessage({
                        id: "course.student.list.media"
                    }),
                    dataIndex: "profile_media",
                    key: "profile_media"
                },
                {
                    render: (data) =>
                        <Button onClick={() =>  this.giveScore(data)}
                        >
                            {context.intl.formatMessage({
                                id: "course.student.score"
                            })}
                        </Button>
                },
                {
                    title: context.intl.formatMessage({
                        id: "course.student.list.university_access"
                    }),

                    render: (data) =>
                        <Button onClick={() =>  this.changeCheckboxUni(data)}
                    >
                        {data.university_access
                           ? context.intl.formatMessage({
                            id: "course.student.active"
                            })
                            : context.intl.formatMessage({
                                id: "course.student.inactive"
                            })
                        }
                     </Button>
                },
                {
                    render: (data) =>
                        <Button onClick={() =>  this.upload(data)}
                                disabled={data.can_have_certificate !== true && 'disabled'}
                        >
                            {context.intl.formatMessage({
                                id: "course.student.upload.certificate"
                            })}
                        </Button>
                },
                {
                  render:  (data) =>
                      <Button onClick={() => push(
                              privateRoutes.ROUTE_COURSE_STUDENT_EXAM_LIST.replace(":id", data.id || -1)
                          )}
                      >
                          {context.intl.formatMessage({
                              id: "course.student.exam.list"
                          })}
                      </Button>
                },
                {
                    render: (data) =>
                        <Button onClick={() =>  this.extend(data)}
                        >
                            {context.intl.formatMessage({
                                id: "course.student.extend"
                            })}
                        </Button>
                }
            ],
            hasActions: true,
        };
        this.tableConfUNI = {
            url: `${constants.COURSE_URL}/${props.match.params.id}/student_profile`,
            secondButtonWithAction: () => {
                push(privateRoutes.ROUTE_COURSE_LIST);
            },
            secondCustomTextButtonWithAction: context.intl.formatMessage({
                id: "course.return"
            }),
            columns: [
                {
                    title: context.intl.formatMessage({
                        id: "course.list.id"
                    }),
                    dataIndex: "id",
                    key: "id",
                    render: record => <LocaleNumber>{record}</LocaleNumber>
                },
                {
                    title: context.intl.formatMessage({
                        id: "course.student.list.name"
                    }),
                    dataIndex: "name",
                    key: "name"
                },
                {
                    title: context.intl.formatMessage({
                        id: "course.student.list.mobile"
                    }),
                    dataIndex: "mobile_number",
                    key: "mobile_number"
                },
                {
                    title: context.intl.formatMessage({
                        id: "course.student.list.national_code"
                    }),
                    dataIndex: "national_code",
                    key: "national_code"
                },
                {
                    title: context.intl.formatMessage({
                        id: "course.student.list.passport_number"
                    }),
                    dataIndex: "passport_number",
                    key: "passport_number"
                },
                {
                    title: context.intl.formatMessage({
                        id: "course.student.list.status"
                    }),
                    dataIndex: "status",
                    key: "status"
                },
                {
                    title: context.intl.formatMessage({
                        id: "course.student.list.certificate"
                    }),
                    dataIndex: "certificate_file",
                    key: "certificate_file",
                },
                {
                    title: context.intl.formatMessage({
                        id: "course.student.list.can.have.certificate"
                    }),
                    dataIndex: "can_have_certificate",
                    key: "can_have_certificate",
                    render: bool => booleanRender(bool),
                },

                {
                    title: context.intl.formatMessage({
                        id: "course.student.list.media"
                    }),
                    dataIndex: "profile_media",
                    key: "profile_media"
                },

                {
                    render:  (data) =>
                        <Button onClick={() => push(
                            privateRoutes.ROUTE_COURSE_STUDENT_EXAM_LIST.replace(":id", data.id || -1)
                        )}
                        >
                            {context.intl.formatMessage({
                                id: "course.student.exam.list"
                            })}
                        </Button>
                },
            ],
            hasActions: true,
        };
    }
    changeCheckboxUni = (data, id) => {
        this.setState({
            university_access: !data.university_access
        })
       const uniData = {
           course_id: this.props.match.params.id,
           student_id: data.id,
           university_access: !data.university_access
        }
        this.table = createTable(constants.STUDENT);
        this.props.updateUniversityAccess(uniData);

    };

    handleCancel = e => {
        this.setState({
            visible: false,
        });
        this.table = createTable(constants.STUDENT);
    };
    upload = (data) => {
        this.setState({
            visible: true,
            certificate: true,
        });
        this.modalForm = createForm({
            name: constants.CERTIFICATE,
            url: `${constants.COURSE_URL}/${this.props.match.params.id}/student_profile/${data.id}/certificate`,
            // id: this.props.match.params.id,
            title: this.context.intl.formatMessage({
                id: "course.student.upload.certificate",
            }),
        });
        this.certificateImage = createUpload(constants.CERTIFICATE_UPLOADER);
    }
    extend = (data) => {
        this.setState({
            visible: true,
            extend_visible: true
        });
        this.modalForm = createForm({
            name: constants.EXTEND,
            url: `${constants.COURSE_URL}/${this.props.match.params.id}/student_profile/extend_manually/${data.id}`,
            title: this.context.intl.formatMessage({
                id: "course.student.extend",
            }),
        });
    }
    giveScore = (data) => {
        this.setState({
            visible: true,
            score_visible: true
        });
        this.modalForm = createForm({
            name: constants.EXTEND,
            url: `${constants.COURSE_URL}/${this.props.match.params.id}/student_profile/score_manually/${data.id}`,
            title: this.context.intl.formatMessage({
                id: "course.student.score",
            }),
        });
    }

    render() {
        const Table = this.table;
        const {
            loading,
            initialData,
        } = this.props;
       let Form = this.modalForm;
        const CertificateImage = this.certificateImage;
        return (
            <div>
                {this.props.userRole === "university" ?
                    <Table
                        {...this.tableConfUNI}
                        {...this.props}
                        titleBox={this.context.intl.formatMessage({
                            id: "course.student.list"
                        })}
                    />
                    :
                    <Table
                        {...this.tableConf}
                        {...this.props}
                        titleBox={this.context.intl.formatMessage({
                            id: "course.student.list"
                        })}
                    />
                }
                <Modal
                        title={[]}
                        visible={this.state.visible}
                        onCancel={this.handleCancel}
                        footer={[]}
                        width="700px"
                    >
                    <Form>
                        {(fieldDecorator, handleSubmit, data, form) => {
                            return (
                                this.state.certificate
                               ? <Row>
                                    <Col className="form-col" span={24} >
                                        <FormItem
                                            label='serial_number'
                                        >
                                            {fieldDecorator("serial_number", {
                                                initialValue: get(initialData, "serial_number", ""),
                                                rules: [
                                                    {
                                                        required: true,
                                                        type: "string",
                                                    },
                                                ],
                                            })(
                                                <Input
                                                    disabled={loading}
                                                    onChange={e => form.setFieldsValue({
                                                        serial_number: e.target.value,
                                                    })}
                                                    placeholder={this.context.intl.formatMessage({
                                                        id:
                                                            "user.dashboard.certificate.serial",
                                                    })}
                                             />
                                            )}
                                        </FormItem>
                                        <FormItem
                                            label='certificate_file'
                                        >
                                            {fieldDecorator("certificate_file", {
                                                initialValue: split(get(initialData, "certificate_file", ''), '/')[6],
                                            })(<CertificateImage
                                                url={constants.UPLOAD_CERTIFICATE_URL}
                                                uploadName={constants.CERTIFICATE}
                                                onChanges={value => form.setFieldsValue({
                                                    certificate_file: value,
                                                })}
                                            />)}
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
                                : this.state.extend_visible
                                ?   <Row>
                                        <Col className="form-col" span={24}>
                                            <FormItem
                                                label='expired_at'
                                            >
                                                {fieldDecorator("expired_at", {
                                                    initialValue: get(initialData, "expired_at", ""),
                                                    rules: [
                                                        {
                                                            required: true,
                                                            type: "string",
                                                        },
                                                    ],
                                                })(
                                                    <Input
                                                        disabled={loading}
                                                        onChange={e => form.setFieldsValue({
                                                            expired_at: e.target.value,
                                                        })}
                                                        placeholder={this.context.intl.formatMessage({
                                                            id:
                                                                "course.student.extend.expire",
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
                                                    id: "submit",
                                                })}
                                            </Button>
                                        </Col>
                                    </Row>
                                    : this.state.score_visible
                                ?   <Row>
                                            <Col className="form-col" span={24}>
                                                <FormItem
                                                    label='score'
                                                >
                                                    {fieldDecorator("score", {
                                                        rules: [
                                                            {
                                                                required: true,
                                                                type: "string",
                                                            },
                                                        ],
                                                    })(
                                                        <Input
                                                            disabled={loading}
                                                            onChange={e => form.setFieldsValue({
                                                                score: e.target.value,
                                                            })}
                                                            placeholder={this.context.intl.formatMessage({
                                                                id: "course.student.score",
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
                                                        id: "submit",
                                                    })}
                                                </Button>
                                            </Col>
                                        </Row>
                                     : ''
                                )
                            }}
                    </Form>
                </Modal>
            </div>
        );
    }
}

Student.contextTypes = {
    intl: PropTypes.object.isRequired
};

const mapDispatchToProps = dispatch => {
    const setCourseId = tableActions.setCourseId;
    const updateUniversityAccess = actions.updateUniversityAccess;
    return bindActionCreators({push, setCourseId, updateUniversityAccess}, dispatch);
};

const mapStateToProps = state => ({
    userRole: state.getIn([userConstants.USER, "data","role"]),
    initialData: state.getIn([formConstants.FORM, `${constants.STUDENT}_data`, 'data'], false),
    loading: state.getIn([formConstants.FORM, `${constants.COURSE}_loading`], false),
    // uniAccess: state.getIn([constants.COURSE_DATA, `${constants.COURSE}_loading`], false),

});

export default connect(mapStateToProps, mapDispatchToProps)(toJS(Student));
