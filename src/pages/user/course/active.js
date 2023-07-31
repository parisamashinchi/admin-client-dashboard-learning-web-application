import React, {Component} from "react";
import IntlMessages from "utils/intlMessages";
import {Badge, Button, Col, Progress, Row, Card, Divider} from "antd";
import Style from "./course.style";
import PropTypes from "prop-types";
import {bindActionCreators} from "redux";
import connect from "react-redux/es/connect/connect";
import * as actions from "./actions";
import * as constants from "./constants";
import { toJS } from "hoc/toJsHoc";
import { routes as privateRoutes } from "router/private";
import map from "lodash/map";
import isEmpty from "lodash/isEmpty";
import notFound from "../../../static/images/notFound.png";
import {toPersianNumber} from 'utils/getters/PersianNumber';

class Active extends Component {
    componentDidMount() {
        const {getActiveCourse} = this.props;
        getActiveCourse();
    }

    OnClickCourse = (course_id) => {
        this.props.history.push({
            pathname: privateRoutes.ROUTE_USER_COURSE_DETAIL,
            state:  {
                 id:course_id,
            }
        })
    };

    timeConverter = (time) => {
        let hours = Math.floor(time / 3600);
        time -= hours * 3600;
        let minutes = Math.floor(time / 60);
        if( minutes == '0'){
            return hours + ' ساعت ' ;
        } else if ( hours ==  '0'){
            return   minutes + ' دقیقه ' ;
        } else {
            return hours + ' ساعت و ' +  minutes + ' دقیقه ' ;
        }
    };

    render() {
        return (
            <Style>
                {isEmpty(this.props.active)
                    ? <Row className="certificate">
                        <Card className="not-found">
                            <img src={notFound} alt="دوره ای یافت نشد"/>
                            <p><IntlMessages id="user.dashboard.course.notFound"/></p>
                        </Card>
                    </Row>
                    :
                    <Row className="course" gutter={20}>
                        {map(this.props.active, item => {
                            return (
                                <Card>
                                    <Col xs={24}  xl={4}>
                                        <img onClick={() =>this.OnClickCourse(item.id)} alt="example" src={item.thumbnail_media}/>
                                    </Col>
                                    <Col xs={24}  xl={20}>
                                        <Row>
                                            <h2 onClick={() =>this.OnClickCourse(item.id)}> {item.header_title}</h2>
                                            <p>
                                                <Badge color="blue" text="این دوره فعال می باشد"/>
                                            </p>
                                            <p>
                                                <b>
                                                    مدرس:
                                                    <span>{!isEmpty(item.teacher) && item.teacher[0].name}</span>
                                                </b>
                                                &nbsp;
                                                / زمان دوره
                                                <span> {item.total_duration}</span>
                                                هفته
                                            </p>
                                            {item.sell_type === 'with_type' &&
                                                <span className="support">
                                                    <IntlMessages id="user.course.support1"/>
                                                    <b>{item.expired_at}</b>
                                                    <IntlMessages id="user.course.support2"/>
                                                </span>
                                            }
                                            <Button onClick={() => this.OnClickCourse(item.id)}>
                                                <IntlMessages id="user.dashboard.class"/>
                                            </Button>
                                         </Row>
                                        <Row>
                                            <Col  xs={4}  xl={2} >
                                                <span className="ant-progress-newText" >{toPersianNumber( item.percentage)}%</span>
                                            </Col>
                                            <Col xs={20}  xl={22} >
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
        );
    }
}
Active.contextTypes = {
    intl: PropTypes.object.isRequired
};

const mapDispatchToProps = dispatch => {
    const { getActiveCourse, getCourseDetail } = actions;
    return bindActionCreators({getActiveCourse, getCourseDetail}, dispatch);
};

const mapStateToProps = state => ({
    active: state.getIn([constants.COURSE, "active"], {}),
});

export default connect(mapStateToProps, mapDispatchToProps)(toJS(Active));