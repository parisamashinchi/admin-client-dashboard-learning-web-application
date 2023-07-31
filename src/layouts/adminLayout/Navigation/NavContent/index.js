import React, { Component } from "react";
import { connect } from "react-redux";
import {NavLink, withRouter} from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";
import windowSize from "react-window-size";
import * as panelConstants from "utils/globalRedux/panel/constants";
import * as courseActions from "../../../../pages/user/course/actions";
import Aux from "hoc/_Aux";
import NavGroup from "./NavGroup";
import DEMO from "utils/globalRedux/panel/constants";
import * as panelActions from "utils/globalRedux/panel/actions";
import * as courseConstants from "../../../../pages/user/course/constants";
import isEmpty from 'lodash/isEmpty';
import * as routes from "../../../../router/private/constants";
import IntlMessages from "utils/intlMessages";
import {bindActionCreators} from "redux";
import {Icon, notification} from "antd";
import Dotdotdot from 'react-dotdotdot';

class NavContent extends Component {
    state = {
        scrollWidth: 0,
        prevDisable: true,
        nextDisable: false,
        item_index: 0,
        active_lesson: 0,
        click: false, // season clicked
    };

    scrollPrevHandler = () => {
        const wrapperWidth = document.getElementById("sidenav-wrapper").clientWidth;

        let scrollWidth = this.state.scrollWidth - wrapperWidth;
        if (scrollWidth < 0) {
            this.setState({scrollWidth: 0, prevDisable: true, nextDisable: false});
        } else {
            this.setState({scrollWidth: scrollWidth, prevDisable: false});
        }
    };

    scrollNextHandler = () => {
        const wrapperWidth = document.getElementById("sidenav-wrapper").clientWidth;
        const contentWidth = document.getElementById("sidenav-horizontal")
            .clientWidth;

        let scrollWidth = this.state.scrollWidth + (wrapperWidth - 80);
        if (scrollWidth > contentWidth - wrapperWidth) {
            scrollWidth = contentWidth - wrapperWidth + 80;
            this.setState({
                scrollWidth: scrollWidth,
                prevDisable: false,
                nextDisable: true
            });
        } else {
            this.setState({scrollWidth: scrollWidth, prevDisable: false});
        }
    };
    onClickSeason = (index, season) => {
        if(this.state.item_index !== index) {
            this.props.setSeasonDetail(season);
            this.setState({
                item_index: index,
                active_lesson: -1,
                click: true,
            })
        } else {
            this.setState({
                item_index: -1,
                active_lesson: -1,
                click: true,
            })
        }
    }
     openNotification = placement => {
        notification.info({
            // message: `Notification ${placement}`,
            description:
                'برای مشاهده دوره فصل مربوط به  پشتیبانی را حتما مشاهده کنید',
            placement,
        });
    };
    onClickLesson = (lesson, index) => {
        if(lesson.is_lock){
            this.openNotification('topLeft')
        } else {
            this.props.setLessonDetail(lesson);
            this.setState({
                active_lesson: index
            })
            if (lesson.type === "VIDEO") {
                const data = {
                    course_id: this.props.course.id,
                    season_id: lesson.season_id,
                    lesson_id: lesson.model.id,
                    lesson_type: lesson.type,
                }
                this.props.getVideoUrl(data);
                this.props.seenLesson(data);
            }
            if (lesson.type === "READING" || lesson.type === "SURVEY") {
                const data = {
                    course_id: this.props.course.id,
                    season_id: lesson.season_id,
                    lesson_id: lesson.model.id,
                    lesson_type: lesson.type,
                }
                this.props.seenLesson(data);
            }
            const elements = document.getElementsByClassName('pcoded-navbar')
            if (elements.length > 0) {
                elements[0].classList.remove('mob-open');
                document.getElementById('mobile-collapse1').classList.remove("on")
            }
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.state.item_index !== this.props.lesson.season_id && !this.state.click) {
            this.setState({
                item_index: this.props.lesson.season_id,
                active_lesson: -1
            })
        }
    }

    render() {
        const navItems = this.props.navigation.map(item => {
            if (item.hidden) return false;
            switch (item.type) {
                case "group":
                    return (
                        <NavGroup layout={this.props.layout} key={item.id} group={item}/>
                    );
                default:
                    return false;
            }
        });
        const courseSeasonsList =
            !isEmpty(this.props.courseSeasons) &&
            this.props.courseSeasons.map((item, index) => {
                return (

                    <li className={
                        this.state.item_index !== item.id
                            ? "nav-item pcoded-hasmenu "
                            : " nav-item pcoded-hasmenu active pcoded-trigger"
                    }>
                        <a className={this.state.item_index !== item.id ? "nav-link" : "nav-link active"}
                           onClick={() => this.onClickSeason(item.id, item)}>{item.title}</a>
                        <ul className="pcoded-submenu">
                            {item.lessons.map((lesson , index)=> {
                                return (
                                    <li className={lesson.is_lock && "lock"} >
                                        <a
                                            className={
                                                lesson.is_current
                                                ? "nav-link  active_lesson "
                                                : lesson.is_seen
                                                    ?  "nav-link seen_lesson "
                                                    : this.state.active_lesson === index
                                                        ?  "nav-link click_lesson"
                                                : "nav-link"
                                            }
                                            aria-current="page"
                                            onClick={()=>this.onClickLesson(lesson, index)}
                                        >
                                            {lesson.is_lock
                                                ? <span className="pcoded-micon">
                                                    <Icon type="lock"/>
                                                </span>
                                                : <span className="c">
                                                 {lesson.type === "VIDEO"
                                                     ? <i className="feather icon-play"></i>
                                                     : lesson.type === "EXAM"
                                                         ? <Icon type="form"/>
                                                         : lesson.type === "READING"
                                                             ? <Icon type="file-text"/>
                                                             : ''
                                                 }

                                             </span>
                                            }
                                                <span className="pcoded-mtext">
                                                  <Dotdotdot clamp={2}>
                                                      <p>
                                                        {!isEmpty(lesson.model) && lesson.model.title}
                                                      </p>
                                                  </Dotdotdot>
                                            </span>
                                        </a>
                                    </li>
                                )
                            })}
                        </ul>
                    </li>
                )
            });

        let mainContent = "";
        if (this.props.layout === "horizontal") {
            let prevClass = ["sidenav-horizontal-prev"];
            if (this.state.prevDisable) {
                prevClass = [...prevClass, "disabled"];
            }
            let nextClass = ["sidenav-horizontal-next"];
            if (this.state.nextDisable) {
                nextClass = [...nextClass, "disabled"];
            }

            mainContent = (
                <div className="navbar-content sidenav-horizontal" id="layout-sidenav">
                    <a
                        href={DEMO.BLANK_LINK}
                        className={prevClass.join(" ")}
                        onClick={this.scrollPrevHandler}
                    >
                        <span/>
                    </a>
                    <div id="sidenav-wrapper" className="sidenav-horizontal-wrapper">
                        <ul
                            id="sidenav-horizontal"
                            className={`nav pcoded-inner-navbar ${
                                this.props.rtlLayout ? "rtl" : ""
                            } sidenav-inner`}
                            onMouseLeave={this.props.onNavContentLeave}
                            style={{marginLeft: "-" + this.state.scrollWidth + "px"}}
                        >
                            {navItems}
                        </ul>
                    </div>
                    <a
                        href={DEMO.BLANK_LINK}
                        className={nextClass.join(" ")}
                        onClick={this.scrollNextHandler}
                    >
                        <span/>
                    </a>
                </div>
            );
        } else {
            if (this.props.location.pathname !== "/user/course/detail") {
                mainContent = (
                    <div className="navbar-content datta-scroll">
                        <ul
                            className={`nav pcoded-inner-navbar ${
                                this.props.rtlLayout ? "rtl" : ""
                            }`}
                        >
                            {navItems}
                        </ul>
                    </div>

                );
            } else {
                mainContent = (

                    <div className="navbar-content datta-scroll">

                        <ul
                            className={`nav pcoded-inner-navbar detail-nav ${
                                this.props.rtlLayout ? "rtl" : ""
                            }`}
                        >
                            <li className="nav-item return-nav-item">
                                <a className="nav-link active big-nav" >
                                    <span className="pcoded-mtext">{!isEmpty(this.props.course) && this.props.course.header_title}</span>
                                </a>

                            </li>
                            {courseSeasonsList}
                        </ul>

                    </div>

                );
            }
        }
        return <Aux>{mainContent}</Aux>;
    }

}


const mapStateToProps = state => {
  return {
    layout: state.getIn([panelConstants.PANEL, "layout"]),
    collapseMenu: state.getIn([panelConstants.PANEL, "collapseMenu"]),
    rtlLayout: state.getIn([panelConstants.PANEL, "rtlLayout"]),
    courseSeasons: state.getIn([courseConstants.COURSE, "course_detail", "seasons"], {}),
    course: state.getIn([courseConstants.COURSE, "course_detail"], {}),
      lesson: state.getIn([courseConstants.COURSE, "lesson_detail"], {}),
  };
};

const mapDispatchToProps = dispatch => {
     const { setLessonDetail } = courseActions;
     const { setSeasonDetail } = courseActions;
     const { seenLesson } = courseActions;
     const { getVideoUrl } = courseActions;
     //const {  panelActions.NAV_CONTENT_LEAVE } = actions;
    // onNavContentLeave: () => dispatch({ type: panelActions.NAV_CONTENT_LEAVE });
    // const { onNavContentLeave } = panelActions;
    // return bindActionCreators({setLessonDetail,onNavContentLeave}, dispatch);
  return bindActionCreators({setLessonDetail, setSeasonDetail, seenLesson, getVideoUrl}, dispatch);
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(windowSize(NavContent))
);
