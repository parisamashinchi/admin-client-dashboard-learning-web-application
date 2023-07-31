import React, {Component} from "react";
import IntlMessages from "utils/intlMessages";
import {Icon, Button, Col, Row, Card, Divider, Spin, Modal, Checkbox} from "antd";
import Style from "./course.style";
import PropTypes from "prop-types";
import {bindActionCreators} from "redux";
import connect from "react-redux/es/connect/connect";
import * as actions from "./actions";
import { toJS } from "hoc/toJsHoc";
import * as courseConstants from "./constants";
import 'video-react/dist/video-react.css';
import { Player, ControlBar, ReplayControl, ForwardControl,BigPlayButton,PlaybackRateMenuButton } from 'video-react';
import Dropzone from 'react-dropzone-uploader'
import 'react-dropzone-uploader/dist/styles.css';
import isEmpty from 'lodash/isEmpty';
import get from "lodash/get";
import VideoPlayer from 'react-video-js-player';
import videojs from 'video.js';
import QualitySelector from '@silvermine/videojs-quality-selector';
import '@silvermine/videojs-quality-selector/src/sass/quality-selector.scss';
import findIndex from 'lodash/findIndex';
import * as routes from "../../../router/private/constants";
import { routes as privateRoutes } from "router/private";
import Exam from "./exam";
import PersianNumber from "components/PersianNumber";
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser'

class Detail extends Component {

    player = {};

    constructor(props) {
        super(props);
        this.videoNode = React.createRef();
        this.state = {
            numPages: null,
            pageNumber: 1,
            playerSource: '',
            current_show: true,
            width: window.innerWidth,
            uploaded: true,
            end:false,
            new_season:0,
            showExam: false,
            modal:false,
            supportModal:false,
            rule:false,
        }
    }
    componentWillMount() {
        window.addEventListener('resize', this.handleWindowSizeChange);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowSizeChange);
    }

    handleWindowSizeChange = () => {
        this.setState({ width: window.innerWidth });
    };

    componentDidMount() {
        const {getCourseDetail} = this.props;
        const {courseSeasons, lesson, course} = this.props;
        getCourseDetail(this.props.location.state.id);
        const noContext = document.getElementById('noContextMenu');
        noContext.addEventListener('contextmenu', e => {
            e.preventDefault();
        });
        // join QualitySelector plugin to videojs
        require('@silvermine/videojs-quality-selector')(videojs);
        videojs.registerPlugin('QualitySelector', QualitySelector);
        require('videojs-seek-buttons');
        // videojs option
        const options = {
            controls: true,
            responsive: true,
            fluid: true,
            autoplay: false,
            playbackRates: [0.7, 1.0, 1.2, 1.5, 2.0],
            techCanOverridePoster: true,
            textTrackSettings: false,
            preload: "auto",
            allowfullscreen: true,
            // controlBar: { volumePanel: { inline: false } },
        }

        // define videojs player
        this.player = videojs(this.videoNode, options);
        this.player.seekButtons({
            forward: 10,
            back: 10
        });
        this.player.src([
            {
                src: !isEmpty(get(this.props.video.mp4_videos, [0])) && get(get(this.props.video.mp4_videos, [0]), 'link'),
                type: 'video/mp4',
                label: get(get(this.props.video.mp4_videos, [0]), 'label'),
                selected: get(get(this.props.video.mp4_videos, [0]), 'selected'),
            },
            {
                src: !isEmpty(get(this.props.video.mp4_videos, [1])) && get(get(this.props.video.mp4_videos, [1]), 'link'),
                type: 'video/mp4',
                label: get(get(this.props.video.mp4_videos, [1]), 'label'),
                selected: get(get(this.props.video.mp4_videos, [1]), 'selected'),
            },
            {
                src: !isEmpty(get(this.props.video.mp4_videos, [2])) && get(get(this.props.video.mp4_videos, [2]), 'link'),
                type: 'video/mp4',
                label: get(get(this.props.video.mp4_videos, [2]), 'label'),
                selected: get(get(this.props.video.mp4_videos, [2]), 'selected'),
            },
            {
                src: !isEmpty(get(this.props.video.mp4_videos, [3])) && get(get(this.props.video.mp4_videos, [3]), 'link'),
                type: 'video/mp4',
                label: get(get(this.props.video.mp4_videos, [3]), 'label'),
                selected: get(get(this.props.video.mp4_videos, [3]), 'selected'),
            },
        ]);

        // only one selector
        if (isEmpty(this.player.getChild('controlBar').getChild('QualitySelector'))) {
            this.player.getChild('controlBar').addChild('QualitySelector', {});
        }
        if(!isEmpty(course)){
            this.props.setLessonDetail(this.props.course.current_model);
        }
    }
    
    setup() {
        let updateCount = this.state.updateCount;
        this.setState({
            updateCount: updateCount + 1
        });
    }

    componentDidUpdate(prevProps, prevState) {
        const {courseSeasons, lesson, course} = this.props;
        const x = get(prevProps.course.current_model, 'model');
        const y = get(this.props.course.current_model, 'model');
        if(!isEmpty(this.props.course)) {
            if (this.props.course !== prevProps.course) {
                if (this.props.course.current_model.type === "VIDEO") {
                    const data = {
                        course_id: this.props.course.id,
                        season_id: this.props.course.current_model.season_id,
                        lesson_id: this.props.course.current_model.model.id,
                    }
                    this.props.getVideoUrl(data);
                    this.setState({
                        playerSource: this.props.video.video_url,
                        current_show: false,
                    })
                    this.props.setLessonDetail(this.props.course.current_model);

                } else {
                    if (get(x, 'id') !== get(y, 'id')) {
                        this.props.setLessonDetail(this.props.course.current_model);
                    }
                }
            }
        }
        if(get(this.props.video.mp4_videos, [0]) !== get(prevProps.video.mp4_videos, [0]) ){
            // videojs option
            const options = {
                controls: true,
                responsive: true,
                fluid: true,
                autoplay: true,
                playbackRates: true,
                techCanOverridePoster: true,
                textTrackSettings: false,
                preload: "auto",
                allowfullscreen: true
                // controlBar: { volumePanel: { inline: false } },
            }

            // define videojs player
            this.player = videojs(this.videoNode, options);
            this.player.src([
                {
                    src: !isEmpty(get(this.props.video.mp4_videos, [0])) && get(get(this.props.video.mp4_videos, [0]), 'link'),
                    type: 'video/mp4',
                    label: get(get(this.props.video.mp4_videos, [0]), 'label'),
                    selected: get(get(this.props.video.mp4_videos, [0]), 'selected'),
                },
                {
                    src: !isEmpty(get(this.props.video.mp4_videos, [1])) && get(get(this.props.video.mp4_videos, [1]), 'link'),
                    type: 'video/mp4',
                    label: get(get(this.props.video.mp4_videos, [1]), 'label'),
                    selected: get(get(this.props.video.mp4_videos, [1]), 'selected'),
                },
                {
                    src: !isEmpty(get(this.props.video.mp4_videos, [2])) && get(get(this.props.video.mp4_videos, [2]), 'link'),
                    type: 'video/mp4',
                    label: get(get(this.props.video.mp4_videos, [2]), 'label'),
                    selected: get(get(this.props.video.mp4_videos, [2]), 'selected'),
                },
                {
                    src: !isEmpty(get(this.props.video.mp4_videos, [3])) && get(get(this.props.video.mp4_videos, [3]), 'link'),
                    type: 'video/mp4',
                    label: get(get(this.props.video.mp4_videos, [3]), 'label'),
                    selected: get(get(this.props.video.mp4_videos, [3]), 'selected'),
                },
            ]);
        }
        if (!isEmpty(this.props.lesson.model)) {
            if (this.props.lesson.type === "VIDEO") {
                if (this.props.video.video_url !== prevState.playerSource) {
                    this.setState({
                        playerSource: this.props.video.video_url
                    })
                    // this.player.load();
                }
            }
        }
        if (this.state.end) {
           this.setState({
               new_season:  findIndex(courseSeasons, function (o) {
                   return o.id === lesson.season_id
               })
           })
            for (let i = this.state.new_season; i < courseSeasons.length; i++) {
                // add lesson index by 1, findIndex of each lesson
                let new_lesson = findIndex(courseSeasons[i].lessons, function (o) {
                    return o.model.id === lesson.model.id
                }) + 1;

                for (let j = new_lesson; j < courseSeasons[i].lessons.length; j++) {
                    let data = {};

                    //check latest item in each season ,latest lesson must setLessonDetail +1
                    if(j !== courseSeasons[i].lessons.length && courseSeasons[i].lessons[j].type === "VIDEO"){
                        data = {
                            course_id: course.id,
                            season_id: courseSeasons[i].lessons[j].season_id,
                            lesson_id: courseSeasons[i].lessons[j].model.id,
                            lesson_type: courseSeasons[i].lessons[j].type,
                        }
                        this.props.setLessonDetail(courseSeasons[i].lessons[j]);
                        this.props.getVideoUrl(data);
                        this.props.seenLesson(data);
                        this.setState({
                            end: false,
                            new_season:courseSeasons[i].lessons[j].season_id,
                        })
                        return;
                    } else if(j === courseSeasons[i].lessons.length && courseSeasons[i].lessons[j].type === "VIDEO"){
                        data = {
                            course_id: course.id,
                            season_id: courseSeasons[i + 1].lessons[0].season_id,
                            lesson_id: courseSeasons[i + 1].lessons[0].model.id,
                            lesson_type: courseSeasons[i + 1].lessons[0].type,
                        }
                        this.props.setLessonDetail(courseSeasons[i+1].lessons[0]);
                        this.props.getVideoUrl(data);
                        this.props.seenLesson(data);
                        this.setState({
                            end: false,
                            new_season: i+1
                        })
                        break;
                    }
                }
            }
        }

       //pause video when type is reading or exam or survey
        if(lesson.type === "READING" || lesson.type === "EXAM" || lesson.type === "SURVEY" ){
            if (this.player) {
                this.player.pause();
            }
        }
        //change exam for new exam if new exam in new season started
        if(lesson.type === "EXAM" &&  get(lesson.model,'id') !== get(prevProps.lesson.model,'id') ) {
            this.setState({showExam: false});
        }
        //to show modal
        if(!isEmpty(this.props.course)) {
            if (this.props.course !== prevProps.course) {
            if (this.props.course.accept_rule === false) {
                this.setState({
                    modal: true
                });
              }
            }
        }
    }

    handlePlay(season_id) {
        const {seenLesson ,lesson} = this.props;
        const data = {
            course_id: this.props.course.id,
            season_id: season_id,
            lesson_id: lesson.model.id,
            lesson_type: lesson.type,
        }
         seenLesson(data);
    }

    onDrop = ({ meta, file }) => {
         const { uploadExerciseCourse } = this.props;
         let formData = new FormData();
         formData.append('answer', file);
         uploadExerciseCourse(formData);
    }

    sendExercise = (exam_id, season_id) => {
          const  data = {
                exam_id: exam_id,
                course_id: this.props.course.id,
                season_id: season_id,
                file_name: this.props.upload.file,
                lesson_type: this.props.lesson.type
            }
     const { sendExerciseCourse } = this.props;
        sendExerciseCourse(data);
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
            } else if(blob.type === "application/octet-stream"){
                filename = `${title}.mp3`;
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

    onVideoEnd=()=>{
        this.setState({end:true});
    }

    previousVideo = () => {
        const {courseSeasons, lesson, course} = this.props;
        let new_season =  findIndex(courseSeasons, function (o) {
                return o.id === lesson.season_id
            })
        //check if index of lesson is equal to 0 go to previous season
        if(findIndex(courseSeasons[new_season].lessons, function (o) {return o.model.id === lesson.model.id}) === 0){
            // minus season  index by 1, findIndex of each season
            new_season =  findIndex(courseSeasons, function (o) {
                return o.id === lesson.season_id
            })-1;
            for (let i = new_season; i >= 0 ; i--) {
                for (let j = courseSeasons[new_season].lessons.length-1; j >= 0; j--) {
                    let data = {};
                    if (courseSeasons[i].lessons[j].type === "VIDEO") {
                        data = {
                            course_id: course.id,
                            season_id: courseSeasons[i].lessons[j].season_id,
                            lesson_id: courseSeasons[i].lessons[j].model.id,
                            lesson_type: courseSeasons[i].lessons[j].type,
                        }
                        this.props.setLessonDetail(courseSeasons[i].lessons[j]);
                        this.props.getVideoUrl(data);
                        this.props.seenLesson(data);
                        this.setState({
                            end: false,
                        })
                        return;
                    }
                }
            }
        }else {
            for (let i = new_season; i >= 0; i--) {
                // minus lesson index by 1, findIndex of each lesson
                let new_lesson = findIndex(courseSeasons[i].lessons, function (o) {
                    return o.model.id === lesson.model.id
                }) - 1;
                for (let j = new_lesson; j >= 0; j--) {
                    let data = {};
                    if (courseSeasons[i].lessons[j].type === "VIDEO") {
                        data = {
                            course_id: course.id,
                            season_id: courseSeasons[i].lessons[j].season_id,
                            lesson_id: courseSeasons[i].lessons[j].model.id,
                            lesson_type: courseSeasons[i].lessons[j].type,
                        }
                        this.props.setLessonDetail(courseSeasons[i].lessons[j]);
                        this.props.getVideoUrl(data);
                        this.props.seenLesson(data);
                        this.setState({
                            end: false,
                        })
                        return;
                    }
                }
            }
        }
    }

    onReturn = () =>{
        this.props.history.push(routes.ROUTE_USER_COURSE_ACTIVE);
    }

    startExam = (lesson) => {
        if(lesson.model.test.can_start) {
            const data = {
                course_id: this.props.course.id,
                season_id: lesson.season_id,
                exam_id: lesson.model.id,
            }
            this.props.startExam(data);
        }
        this.setState({showExam:true});
    }
    showModal = () => {
        this.setState({
            modal: true
        });
    };
    showSupportModal= () => {
        this.setState({
            supportModal: true
        });
    };
    handleOk = () => {
        if(this.state.rule) {
            this.props.acceptRule(this.props.course.id);
            this.setState({
                modal: false
            });
        } else {
            this.setState({
                show_error: true
            });
        }
    };
    handleCancel = () => {
        this.setState({
            modal: false,
            supportModal: false
        });
    };

    onChangeCheckbox = (e) => {
        this.setState({
            rule: e.target.checked,
            show_error: false
        })
    }

    render() {
        const {course,lesson, uploadLoading, sendLoading, courseSeasons} = this.props;
        return (
        <Style>
            <Col span={12}>
                {!isEmpty(course.telegram_invitation_group_link) &&
                    <button className="support-btn" onClick={this.showSupportModal}>
                        <IntlMessages id="user.support"/>
                    </button>
                }
            </Col>
            <Col span={12}>
                <a  onClick={this.onReturn}>
                    <span className="return"><IntlMessages id="user.dashboard"/></span>
                </a>
            </Col>
                <div className={lesson.type !== 'VIDEO' ? 'disappear' : ''} id="noContextMenu">
                    {lesson.model &&
                    <div>
                        <h4>{lesson.model.title}</h4>
                        <div className="next-btn">
                            <Button
                                onClick={() => this.onVideoEnd(lesson)}>
                                <Icon type="step-forward"/>
                                <IntlMessages id="user.next.video"/>
                            </Button>
                        </div>
                        <div className="previous-btn">
                            <Button
                                onClick={() => this.previousVideo(lesson)}>
                                <IntlMessages id="user.previous.video"/>
                                <Icon type="step-backward"/>
                            </Button>
                        </div>
                    </div>
                    }
                    <div className="video-responsive ">
                        <div data-vjs-player>
                            <video ref={node => this.videoNode = node} id="node" className="video-js"
                                   onEnded={this.onVideoEnd}
                            />
                        </div>
                    </div>
                    {/*<p>{!isEmpty(lesson.model) && ReactHtmlParser(lesson.model.descriptions)}</p>*/}
                </div>
                <Card className="course-detail">
                    {lesson.model && !isEmpty(lesson.model.attachment_url) && lesson.model.attachment_url.includes('mp3')
                        ? <a href={lesson.model.attachment_url} download target="_blank" className="download-btn">
                            <Icon type="download"/>
                            <IntlMessages id="user.exam.download"/>
                        </a>
                        : ""
                    }
                    {lesson.model && !isEmpty(lesson.model.attachment_url) && !lesson.model.attachment_url.includes('mp3') && lesson.type === 'VIDEO'
                        ? <Button className=" m-20 download-btn"
                                  onClick={() => this.downloadExam(lesson.model.attachment_url, lesson.model.title)}>
                            <Icon type="download"/>
                            <IntlMessages id="user.exam.download"/>
                        </Button>
                        : ""
                    }
                    {lesson.type === "EXAM"
                        ?
                        <Row className="exam">
                            {this.state.showExam && lesson.model.type !== 'upload' &&
                            <Row>
                                <Col span={24}>
                                    <Divider orientation="left">
                                        <IntlMessages id="user.course.active"/>
                                    </Divider>
                                </Col>
                            </Row>
                            }
                            {/*<h4>{lesson.model.descriptions}</h4>*/}
                            <Card
                                className={this.state.showExam && lesson.model.type !== 'upload' ? 'exam-external-card' : 'internal-card'}>
                                {lesson.model.type === 'upload'
                                    ? <div>
                                        <h4>{ReactHtmlParser(lesson.model.descriptions)}</h4>
                                        <p><IntlMessages id="user.exam.desc1"/></p>
                                        <Button className="download-btn"
                                                onClick={() => this.downloadExam(lesson.model.upload.attachment_url, lesson.model.title)}>
                                            <Icon type="download"/>
                                            <IntlMessages id="user.exam.download"/>
                                        </Button>
                                    </div>

                                    : <div>
                                        {!this.state.showExam
                                            ? <div>
                                                <Col span={10}>
                                                    <h3 className="question-num"><IntlMessages id="user.exam"/></h3>
                                                    <h2>{lesson.model.title}</h2>
                                                    <p className="question-num">
                                                        <PersianNumber
                                                            comma={false}>{lesson.model.test.question.length}</PersianNumber>
                                                        <IntlMessages id="user.exam.question"/>
                                                    </p>
                                                    <button onClick={() => this.startExam(lesson)} className="ant-btn">
                                                        <IntlMessages id="user.exam.button"/>
                                                    </button>
                                                </Col>
                                                <Col span={1}>
                                                    <Divider type="vertical"/>
                                                </Col>
                                                <Col span={13}>
                                                    <p>{lesson.model.descriptions}</p>
                                                </Col>
                                            </div>
                                            : <Exam data={lesson}/>
                                        }
                                    </div>
                                }
                            </Card>
                            {!isEmpty(lesson.model.upload) && lesson.model.upload.can_upload &&
                            <div className="upload-line">
                                <Col xl={16} xs={24}>
                                    <p><IntlMessages id="user.exam.format"/></p>
                                    <Spin spinning={uploadLoading}>
                                        <Dropzone
                                            onChangeStatus={this.onDrop}
                                            accept="doc/*,docx/*,pdf/*,zip/*,jpeg/*"
                                            inputContent={<IntlMessages id="user.exam.choose.file"/>}
                                        />
                                    </Spin>

                                </Col>
                                <Col xl={8} xs={24}>
                                    <Button
                                        onClick={() => this.sendExercise(lesson.model.id, lesson.season_id)}
                                        disabled={this.props.uploaded !== true && 'disabled'}
                                        loading={sendLoading}
                                    >
                                        <IntlMessages id="user.exam.upload"/>
                                    </Button>
                                </Col>
                            </div>
                            }
                        </Row>

                        : lesson.type === "READING"
                            ?
                            <div className="reading">

                                {/*<Row>*/}
                                {/*    <Col xl={23} xs={24}>*/}
                                {/*        <Divider orientation="left" >*/}
                                {/*             {lesson.model.title}*/}
                                {/*        </Divider>*/}
                                {/*    </Col>*/}
                                {/*</Row>*/}
                                <h5>{lesson.model.title}</h5>
                                <p>{ReactHtmlParser(lesson.model.descriptions)}</p>
                                {/*<Document*/}
                                {/*    // URL = "http://example.com/sample.pdf"*/}
                                {/*      file = {{url:"http://www.africau.edu/images/default/sample.pdf"}}*/}
                                {/*    // onLoadSuccess={this.onDocumentLoadSuccess}*/}
                                {/*>*/}
                                {/*    <Page pageNumber={1} />*/}
                                {/*</Document>*/}
                                {!isEmpty(lesson.model.pdf_url) &&
                                    <a href={lesson.model.pdf_url} target="_blank" className="reading-desc">دانلود pdf
                                    </a>
                                }
                                {!isEmpty(lesson.model.attachment_url) &&
                                    <Button className="download-btn"
                                            onClick={() => this.downloadExam(lesson.model.attachment_url, lesson.model.title)}>
                                        <Icon type="download"/>
                                        <IntlMessages id="user.exam.download"/>
                                    </Button>
                                }
                            </div>
                            : lesson.type === "SURVEY"
                                ?
                                <iframe src={lesson.model.url} style={{'height': '700px', 'width': '100%'}}></iframe>
                                : lesson.type === "LIVE"
                                    ?
                                    <iframe src={lesson.model.url} width="100%" height="100%"
                                            frameBorder="0" allowFullScreen="true"
                                            allow="autoplay;fullscreen;speaker;microphone;camera;display-capture"
                                            style={{'height': '700px', 'width': '100%'}}
                                    ></iframe>
                                : ""
                        // : <Row>
                        //     <Card className="internal-card">
                        //         <Col span={10}>
                        //             <h3><IntlMessages id="user.exam" /></h3>
                        //             {/*<h2>{lesson.model.title}</h2>*/}
                        //             <p className="question-num"> 6<IntlMessages id="user.exam.question" /></p>
                        //             {/*<a href={lesson.model.attachment_url} className="ant-btn">*/}
                        //             {/*    <IntlMessages id="user.exam.button" />*/}
                        //             {/*</a>*/}
                        //         </Col>
                        //         <Col span={1}>
                        //             <Divider type="vertical" />
                        //         </Col>
                        //         <Col span={13}>
                        //             <p>
                        //                 <IntlMessages id="user.exam.min.score" />
                        //             </p>
                        //             <p>
                        //                 <IntlMessages id="user.exam.type" />
                        //             </p>
                        //             <p>
                        //                 <IntlMessages id="user.exam.date" />
                        //                 {/*{lesson.model.due_date}*/}
                        //             </p>
                        //         </Col>
                        //     </Card>
                        //     <div className="empty-line"/>
                        // </Row>

                    }
                </Card>
            <Modal title="عضویت در گروه پشتیبانی" visible={this.state.modal}
                   footer={[
                       <Button key="submit" type="primary" onClick={this.handleOk}>
                           تایید
                       </Button>
                   ]}
                   className="telegram-modal"
            >
                <p> از طریق لینک زیر در گروه تلگرامی پشتیبانی خود عضو شوید. برای اینکار ابتدا فیلتر شکن خود را روشن کنید و سپس روی لینک زیر بزنید. پس از عضویت در گروه تلگرام پیام زیر را تایید کنید.</p>
                {!isEmpty(course.telegram_invitation_group_link) &&
                    <div className="link">
                        <a href={course.telegram_invitation_group_link} target="_blank">{course.telegram_invitation_group_link}</a>
                    </div>
                }

                {course.support_section  &&
                    <Checkbox  onChange={this.onChangeCheckbox}>
                         ویدیوهای نحوه گذراندن دوره را مشاهده کردم.
                        {this.state.show_error && <div className="show-error"> مشاهده را تایید کنید.</div>}
                    </Checkbox>
                }
                {course.telegram_section  &&
                    <Checkbox  onChange={this.onChangeCheckbox}>
                        <IntlMessages id="telegram.modal.rule"/>
                        {this.state.show_error && <div className="show-error">عضویت در گروه تلگرام خود را تایید کنید.</div>}
                    </Checkbox>
                }

            </Modal>
            <Modal title="عضویت در گروه پشتیبانی"
                   visible={this.state.supportModal}
                   onCancel={this.handleCancel}
                   footer={[]}>
                <p>لینک عضویت تلگرام</p>
                <div className="link">
                    <a href={course.telegram_invitation_group_link}  target="_blank">{course.telegram_invitation_group_link}</a>
                </div>
            </Modal>
        </Style>

        );
    }
}
Detail.contextTypes = {
    intl: PropTypes.object.isRequired
};

const mapDispatchToProps = dispatch => {
    const { getCourseDetail } = actions;
    const { setLessonDetail } = actions;
    const { uploadExerciseCourse } = actions;
    const { sendExerciseCourse } = actions;
    const { seenLesson } = actions;
    const { getVideoUrl } = actions;
    const { startExam } = actions;
    const { acceptRule } = actions;
    return bindActionCreators({
        getCourseDetail,
        setLessonDetail,
        uploadExerciseCourse,
        sendExerciseCourse,
        seenLesson,
        getVideoUrl,
        startExam,
        acceptRule},
        dispatch);
};

const mapStateToProps = state => ({
    lesson: state.getIn([courseConstants.COURSE, "lesson_detail"], {}),
    course: state.getIn([courseConstants.COURSE, "course_detail"], {}),
    season: state.getIn([courseConstants.COURSE, "season_detail"], {}),
    upload: state.getIn([courseConstants.COURSE, "upload_exam"], {}),
    uploaded: state.getIn([courseConstants.COURSE, "uploaded"], {}),
    firstCourse: state.getIn([courseConstants.COURSE, "course_detail", "seasons", "0","lessons", "0"], {}),
    video: state.getIn([courseConstants.COURSE, "video"], {}),
    uploadLoading: state.getIn([courseConstants.COURSE, "upload_loading"],false),
    sendLoading: state.getIn([courseConstants.COURSE, "send_loading"],false),
    courseSeasons: state.getIn([courseConstants.COURSE, "course_detail", "seasons"], {}),
});

export default connect(mapStateToProps, mapDispatchToProps)(toJS(Detail));