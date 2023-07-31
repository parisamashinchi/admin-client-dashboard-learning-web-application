import React, {Component} from "react";
import {Divider, Row, Col, Button, notification, Card, Badge, Progress, Modal, Form, Input, Radio} from 'antd';
import IntlMessages from "utils/intlMessages";
import map from "lodash/map";
import isEmpty from "lodash/isEmpty";
import * as actions from "./actions";
import {bindActionCreators} from "redux";
import { toJS } from "hoc/toJsHoc";
import connect from "react-redux/es/connect/connect";
import * as courseConstants from "./constants";
import CountDown from 'ant-design-pro/lib/CountDown';
import PersianNumber from "components/PersianNumber";

class Exam extends Component {
    state = {
        value: 0,
        change: false,
        allow_time:  0
    };
    componentDidMount() {
        this.setState({
            allow_time: this.props.data.model.test.allowed_time * 1000,
            exam: this.props.data.model.test
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(!isEmpty(this.props.exam_time.test)) {
            if (prevProps.exam_time !== this.props.exam_time) {
                this.setState({
                    allow_time: this.props.exam_time.test.allowed_time * 1000
                })
            }
        } else {
            if (!isEmpty(this.props.data.model.test &&  this.state.allow_time !== 0)) {
                if (prevProps.data.model.test !== this.data.model.test) {
                    this.setState({
                        allow_time: this.props.data.model.test.allowed_time * 1000
                    })
                }
                console.log(this.state.allow_time )
            }
        }

        if(prevProps.exam_result !== this.props.exam_result && !isEmpty(this.props.exam_result )) {
            this.setState({
                exam: this.props.exam_result.test
            })
            this.props.setLessonDetail(this.props.course.current_model);
        }
    }

    render() {
        const radioStyle = {
            display: 'block',
            height: '30px',
            lineHeight: '30px',
        };
        const { exam_time,exam_result, data ,course} = this.props;
       const onChange = (question_id,e) => {
           const data = {
               course_id: this.props.course.id,
               season_id: this.props.data.season_id,
               exam_id: this.props.data.model.id,
               question_id: question_id,
               option_id: e.target.value,
           }
             this.props.sendQuestionAnswer(data);
               this.setState({
                  ['value' + question_id] : e.target.value,
                   ['change' + question_id]: true
               });
        };
       const onSubmit = () => {
           const data = {
               course_id: this.props.course.id,
               season_id: this.props.data.season_id,
               exam_id: this.props.data.model.id,
           }
        this.props.endExam(data);
           this.setState({
               allow_time: 0,
           })
       };

       const targetTime = new Date().getTime() + this.state.allow_time ;
        return (
            <div>
                <CountDown style={{ fontSize: 20 }} target={targetTime} className="counter" />
                <h4 className="exam-score">
                    <IntlMessages id="course.student.exam.score"/>
                    : <PersianNumber comma={false}>
                    {!isEmpty(exam_result.test) ? exam_result.test.score : data.model.test.score }
                </PersianNumber>
                </h4>
                {!isEmpty(this.state.exam) &&
                map(this.state.exam.question, (item, index) => {
                    return <Card className={ item.question_media !== null ?"card-with-img exam-internal-card" : "exam-internal-card"}>
                        <p>
                            <span className="number-icon">
                                <PersianNumber comma={false}>{index + 1}</PersianNumber>
                            </span>
                            {item.question}
                        </p>
                        <Row>
                            <Col xl={16} xs={24}>
                                <img src={item.question_media} className="question-img" />
                            </Col>
                            <Col xl={8} xs={24}>
                             <Radio.Group
                                onChange={(e) => onChange(item.id, e)}
                                value={item.chosen_id === null || this.state['change' + item.id]
                                    ? this.state['value' + item.id]
                                    : item.chosen_id}

                            >
                                {map(item.options, (option, index) => {
                                    return <Radio
                                        style={radioStyle}
                                        value={option.id}
                                         disabled={!this.state.exam.can_start  &&  !this.state.exam.is_running && 'disabled'}
                                        className={
                                            option.id === item.correct_id && item.correct_id === item.chosen_id
                                                ? 'correct'
                                                : option.id === item.chosen_id && item.correct_id !== item.chosen_id
                                                ? 'incorrect'

                                                : ''
                                        }
                                    >
                                        {option.option}
                                    </Radio>

                                })}
                            </Radio.Group>
                            </Col>
                        </Row>
                    </Card>
                })
                }
                <Row>
                    <Button onClick={onSubmit} className="exam-btn" disabled={this.state.allow_time === 0 && 'disabled'}>
                        <IntlMessages id="courses.add.form.submit"/>
                    </Button>

                </Row>
            </div>
        )
    }
}
const mapDispatchToProps = dispatch => {
    const { sendQuestionAnswer, endExam, setLessonDetail } = actions;
    return bindActionCreators({sendQuestionAnswer, endExam, setLessonDetail}, dispatch);
};
const mapStateToProps = state => ({
    lesson: state.getIn([courseConstants.COURSE, "lesson_detail"], {}),
    course: state.getIn([courseConstants.COURSE, "course_detail"], {}),
    season: state.getIn([courseConstants.COURSE, "season_detail"], {}),
    exam_time: state.getIn([courseConstants.COURSE, "exam_time"], {}),
    exam_result: state.getIn([courseConstants.COURSE, "exam_result"], {}),
});

export default connect(mapStateToProps, mapDispatchToProps)(toJS(Exam));;
