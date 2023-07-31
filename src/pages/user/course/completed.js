import React, {Component} from "react";
import IntlMessages from "utils/intlMessages";
import {Badge, Button, Col, Progress, Row, Card, Icon, Modal} from "antd";
import Style from "./course.style";
import { routes as privateRoutes } from "router/private";
import PropTypes from "prop-types";
import {bindActionCreators} from "redux";
import connect from "react-redux/es/connect/connect";
import * as actions from "./actions";
import { toJS } from "hoc/toJsHoc";
import * as constants from "./constants";
import map from "lodash/map";
import isEmpty from "lodash/isEmpty";
import * as profileConstants from "../profile/constants";
import * as profileActions from "../profile/actions";
import { timeRender } from "containers/table/renders/timeRender";
import notFound from "../../../static/images/notFound.png";
import {toPersianNumber} from 'utils/getters/PersianNumber';

class Completed extends Component {
    constructor(props){
        super(props);
        this.state = {
            visible: false,
            loading: false,
        };
    }
    componentDidMount() {
        const {getCompleteCourse, getProfileInfo} = this.props;
        getCompleteCourse();
        getProfileInfo();
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = e => {
        this.setState({ loading: true });
        setTimeout(() => {
            this.setState({
                loading: false,
                visible: false
            });
        }, 3000);
        this.props.history.push(privateRoutes.ROUTE_USER_PROFILE_INFO);
    };

    OnClickCourse = (course_id) => {
        this.props.history.push({
            pathname: privateRoutes.ROUTE_USER_COURSE_DETAIL,
            state:  {
                id:course_id,
            }
        })
    };
    handleCancel = e => {
        this.setState({
            visible: false,
        });
    };

    render() {
        return (
            <card>
                <Style>
                    {isEmpty(this.props.completed)
                        ? <Row className="certificate">
                            <Card className="not-found">
                                <img src={notFound} alt="دوره ای یافت نشد"/>
                                <p><IntlMessages id="user.dashboard.course.notFound"/></p>
                            </Card>
                        </Row>
                        :
                    <Row className="course"  gutter={20}>
                        {map(this.props.completed, item => {
                            return (
                                <Card>
                                    <Col xs={24}  xl={4}>
                                        <img  onClick={() =>this.OnClickCourse(item.id)} alt="example" src={item.thumbnail_media}/>
                                    </Col>
                                    <Col xs={24}  xl={20}>
                                        <Row>
                                            <Col span={20}>
                                                <h2 onClick={() =>this.OnClickCourse(item.id)}>{item.header_title}</h2>
                                                <p>
                                                    <Badge color="green" text="این دوره تکمیل شده"/>
                                                </p>
                                                {!isEmpty(item.done_at) &&
                                                <p>
                                                    <span>  تاریخ پایان دوره:</span>
                                                    <span> {timeRender(item.done_at)} </span>
                                                </p>
                                                }
                                                <p>
                                                    <b>
                                                        مدرس:
                                                        <span> {!isEmpty(item.teacher) && item.teacher[0].name}</span>
                                                    </b>
                                                </p>
                                            </Col>
                                            <Col span={4}>
                                                <Button  onClick={() => this.OnClickCourse(item.id)}>
                                                    <IntlMessages id="user.dashboard.class"/>
                                                </Button>
                                            </Col>
                                        </Row>
                                        {item.can_have_certificate &&
                                            <Row>
                                                <span className="score">
                                                    <Icon type="check"/>
                                                    <IntlMessages id="user.dashboard.score"/>
                                                    : {item.score}
                                                </span>
                                                <Button
                                                    className="certificate-btn"
                                                    onClick={this.showModal}
                                                >
                                                    {!isEmpty(item.certificate)
                                                        ? <IntlMessages id="user.dashboard.certificate.see"/>
                                                        : <IntlMessages id="user.dashboard.certificate.request"/>
                                                    }
                                                </Button>

                                                {isEmpty(item.certificate) && !item.is_prepared
                                                    ?<Modal
                                                        title={<IntlMessages id="user.dashboard.certificate.request"/>}
                                                        visible={this.state.visible}
                                                        onCancel={this.handleCancel}
                                                        footer={[
                                                            <Button type="primary" loading={this.state.loading}
                                                                    onClick={this.handleOk}>
                                                                <IntlMessages id="user.dashboard.certificate.button"/>
                                                            </Button>,
                                                        ]}
                                                        width="400px"
                                                    >
                                                        <p>
                                                            {!isEmpty(this.props.info) && this.props.info.name} عزیز
                                                            <IntlMessages id="user.dashboard.certificate.description1"/>
                                                            دوره {item.header_title}
                                                            <IntlMessages id="user.dashboard.certificate.description2"/>
                                                        </p>
                                                    </Modal>
                                                    : isEmpty(item.certificate) && item.is_prepared
                                                    ?<Modal
                                                        title={<IntlMessages id="user.dashboard.certificate.request"/>}
                                                        visible={this.state.visible}
                                                        onCancel={this.handleCancel}
                                                        footer={[]}
                                                        width="400px"
                                                    >
                                                        <p>
                                                            {!isEmpty(this.props.info) && this.props.info.name} عزیز
                                                            <IntlMessages id="user.dashboard.certificate.description3"/>
                                                        </p>
                                                    </Modal>
                                                        :''
                                                }
                                                {!isEmpty(item.certificate)
                                                &&
                                                <Modal
                                                    title={[]}
                                                    visible={this.state.visible}
                                                    onCancel={this.handleCancel}
                                                    footer={[]}
                                                    width="900px"
                                                    className="certificate-modal"
                                                    >
                                                        <img  className="certificate-image" src={item.certificate}  alt="گواهی نامه"/>
                                                </Modal>
                                                }
                                            </Row>
                                            }

                                        <Row>
                                            <Col xs={4}  xl={2}>
                                                <span className="ant-progress-newText" >{toPersianNumber( item.percentage)}%</span>
                                            </Col>
                                            <Col xs={20}  xl={22}>
                                                <Progress
                                                    strokeColor={{
                                                        '0%': '#ebef61',
                                                        '100%': '#92e08c',
                                                    }}
                                                    percent={ item.percentage}
                                                    strokeWidth={'25px'}
                                                />
                                            </Col>
                                        </Row>
                                    </Col>
                                </Card>
                            )
                        })}
                    </Row>
                    }
                </Style>
            </card>
        );
    }
}
Completed.contextTypes = {
    intl: PropTypes.object.isRequired
};

const mapDispatchToProps = dispatch => {
    const { getCompleteCourse } = actions;
    const { getProfileInfo } = profileActions;
    return bindActionCreators({getCompleteCourse, getProfileInfo}, dispatch);
};

const mapStateToProps = state => ({
    completed: state.getIn([constants.COURSE, "completed"], {}),
    info: state.getIn([profileConstants.PROFILE, "info"], {}),
});

export default connect(mapStateToProps, mapDispatchToProps)(toJS(Completed));
