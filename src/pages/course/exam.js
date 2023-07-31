import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {push} from "connected-react-router";
import {toJS} from "hoc/toJsHoc";
import Ellipsis from 'ant-design-pro/lib/Ellipsis';
import {createTable} from "containers/table/table";
import * as constants from "./constants";
import {emptyRender} from "containers/table/renders/emptyRender";
import { booleanRender } from "containers/table/renders/booleanRender";
import * as privateRoutes from "router/private/constants";
import LocaleNumber from "utils/localeNumber";
import PropTypes from 'prop-types';
import * as tableConstants from "../../containers/table/constants";
import {Modal, Button, Form, Row, Col, Input} from "antd";
import * as actions from "./actions";
import * as tableActions from "../../containers/table/actions";
import * as userConstants from "utils/globalRedux/user/constants";

class Exam extends Component {
    constructor(props, context) {
        super(props);
        const {push} = props;
        this.state = {
            visible: false,
        };
        this.table = createTable(constants.EXAM);
        this.tableConf = {
             url: `${constants.COURSE_URL}/${props.courseId}/student_profile/${props.match.params.id}/exam`,
            secondButtonWithAction: () => {
                push(privateRoutes.ROUTE_COURSE_STUDENT_LIST);
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
                        id: "course.student.exam.title"
                    }),
                    dataIndex: "title",
                    key: "title"
                },
                {
                    title: context.intl.formatMessage({
                        id: "course.student.exam.descriptions"
                    }),
                    dataIndex: "descriptions",
                    key: "descriptions",
                    render: text => emptyRender(<Ellipsis tooltip={true} length={15}>{text}</Ellipsis>)
                },
                {
                    title: context.intl.formatMessage({
                        id: "course.student.exam.due_date"
                    }),
                    dataIndex: "due_date",
                    key: "due_date"
                },
                {
                    title: context.intl.formatMessage({
                        id: "course.student.exam.max_score"
                    }),
                    dataIndex: "max_score",
                    key: "max_score",
                },
                {
                    title: context.intl.formatMessage({
                        id: "course.student.exam.attachment_url"
                    }),
                    dataIndex: "attachment_url",
                    key: "attachment_url",
                },

                {
                    title: context.intl.formatMessage({
                        id: "course.student.exam.answer"
                    }),
                    dataIndex: "answer",
                    key: "answer",
                    render: (answer, id) =>
                        <a onClick={()=> this.downloadExam(answer, id.title)}>
                           {answer}
                        </a>
                },
                {
                    title: context.intl.formatMessage({
                        id: "course.student.exam.score"
                    }),
                    dataIndex: "score",
                    key: "score"
                },
                {
                    title: context.intl.formatMessage({
                        id: "course.student.exam.weight"
                    }),
                    dataIndex: "weight",
                    key: "weight"
                },
                {
                    title: context.intl.formatMessage({
                        id: "course.student.exam.season_id"
                    }),
                    dataIndex: "season_id",
                    key: "season_id"
                },
                {render: (id) =>
                        <Button onClick={()=> this.setState({
                            visible: true,
                            exam_id: id.id,
                            season_id: id.season_id,
                            course_id: id.course_id
                        })}>
                            {context.intl.formatMessage({
                                id: "course.student.exam.give.score"
                            })}
                        </Button>
                }
            ],
            hasActions: true,
        };
        this.tableConfUNI = {
            url: `${constants.COURSE_URL}/${props.courseId}/student_profile/${props.match.params.id}/exam`,
            secondButtonWithAction: () => {
                push(privateRoutes.ROUTE_COURSE_STUDENT_LIST);
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
                        id: "course.student.exam.title"
                    }),
                    dataIndex: "title",
                    key: "title"
                },
                {
                    title: context.intl.formatMessage({
                        id: "course.student.exam.descriptions"
                    }),
                    dataIndex: "descriptions",
                    key: "descriptions",
                    render: text => emptyRender(<Ellipsis tooltip={true} length={15}>{text}</Ellipsis>)
                },
                {
                    title: context.intl.formatMessage({
                        id: "course.student.exam.due_date"
                    }),
                    dataIndex: "due_date",
                    key: "due_date"
                },
                {
                    title: context.intl.formatMessage({
                        id: "course.student.exam.max_score"
                    }),
                    dataIndex: "max_score",
                    key: "max_score",
                },
                {
                    title: context.intl.formatMessage({
                        id: "course.student.exam.attachment_url"
                    }),
                    dataIndex: "attachment_url",
                    key: "attachment_url",
                },

                {
                    title: context.intl.formatMessage({
                        id: "course.student.exam.answer"
                    }),
                    dataIndex: "answer",
                    key: "answer",
                    render: (answer, id) =>
                        <a onClick={()=> this.downloadExam(answer, id.title)}>
                            {answer}
                        </a>
                },
                {
                    title: context.intl.formatMessage({
                        id: "course.student.exam.score"
                    }),
                    dataIndex: "score",
                    key: "score"
                },
                {
                    title: context.intl.formatMessage({
                        id: "course.student.exam.weight"
                    }),
                    dataIndex: "weight",
                    key: "weight"
                },
                {
                    title: context.intl.formatMessage({
                        id: "course.student.exam.season_id"
                    }),
                    dataIndex: "season_id",
                    key: "season_id"
                },
            ],
            hasActions: true,
        };
    }

    downloadExam= (url, title) => {
        fetch(url).then(res => res.blob()).then(blob => {
            let a = document.createElement('a');
            let url = window.URL.createObjectURL(blob);
            let filename;
            if(blob.type === "application/zip"){
                filename = `${title}.zip`;
            }else if(blob.type === "application/pdf"){
                filename = `${title}.pdf`;
            }else if(blob.type === "application/x-rar-compressed"){
                filename = `${title}.rar`;
            }

            a.href = url;
            a.download = filename;
            a.click();

            if(this.state.width <= 575){
                window.open(url, '_blank');
            } else {
                window.URL.revokeObjectURL(url);
            }
        })
    }
     handleCancel = e => {
        this.setState({
            visible: false,
        });
         this.table = createTable(constants.EXAM);
    };
    handleChange = e => {
        this.setState({
            score:  e.target.value
        })
    };
    handleSubmit = () => {
        const {scoreExam} =this.props;
        const data = {
            "course_id":  this.state.course_id,
            "student_id": this.props.match.params.id,
            "exam_id": this.state.exam_id,
            "score": this.state.score,
            "season_id": this.state.season_id
        };
         scoreExam(data);
    };
    render() {
        const Table = this.table;
        return (
            <div>
                {this.props.userRole === "university" ?
                    <Table
                        {...this.tableConfUNI}
                        {...this.props}
                        titleBox={this.context.intl.formatMessage({
                            id: "course.student.exam.list"
                        })}
                    />
                    :
                    <Table
                        {...this.tableConf}
                        {...this.props}
                        titleBox={this.context.intl.formatMessage({
                            id: "course.student.exam.list"
                        })}
                    />
                }
                <Modal
                    title={[]}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    footer={[]}
                    width="500px"
                >
                    <Form>
                        <Row type="flex" >
                            <Col span={15}>
                                <Form.Item>
                                    <Input className="discount-input"
                                           placeholder="نمره "
                                           onChange={e =>this.handleChange(e)}
                                    />

                                </Form.Item>
                            </Col>
                            <Col span={9}>
                                <Form.Item>
                                    <Button className="action-btn"  onClick={this.handleSubmit}>
                                        {this.context.intl.formatMessage({
                                            id: "course.student.exam.give.score"
                                        })}
                                    </Button>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Modal>
            </div>

        );
    }
}

Exam.contextTypes = {
    intl: PropTypes.object.isRequired
};

const mapDispatchToProps = dispatch => {
    const scoreExam = actions.scoreExam;
    return bindActionCreators({push, scoreExam}, dispatch);
};

const mapStateToProps = state => ({
    courseId: state.getIn([tableConstants.TABLE, "courseId"]),
    userRole: state.getIn([userConstants.USER, "data","role"]),
});

export default connect(mapStateToProps, mapDispatchToProps)(toJS(Exam));
