import React, {Component} from "react";
import {Route} from "react-router-dom";
import asyncComponent from "utils/helpers/AsyncComponent";
import * as publicRoutes from "../constants";
import * as routes from "./constants";

const privateRoutes = [
    {
        path: routes.ROUTE_USER_DASHBOARD,
        component: asyncComponent(() => import("pages/user/dashboard/dashboard")),
    },
    {
        path: routes.ROUTE_USER_COURSE_ACTIVE,
        component: asyncComponent(() => import("pages/user/course/active")),
    },
    {
        path: routes.ROUTE_USER_COURSE_INACTIVE,
        component: asyncComponent(() => import("pages/user/course/inactive")),
    },
    {
        path: routes.ROUTE_USER_COURSE_COMPLETED,
        component: asyncComponent(() => import("pages/user/course/completed")),
    },
    {
        path: routes.ROUTE_USER_COURSE_DETAIL,
        component: asyncComponent(() => import("pages/user/course/course-detail")),
    },
    {
        path: routes.ROUTE_USER_CERTIFICATE,
        component: asyncComponent(() => import("pages/user/certificate/certificate")),
    },
    {
        path: routes.ROUTE_USER_PROFILE_INFO,
        component: asyncComponent(() => import("pages/user/profile/info")),
    },
    {
        path: routes.ROUTE_USER_PROFILE_PASSWORD,
        component: asyncComponent(() => import("pages/user/profile/password")),
    },
    {
        path: routes.ROUTE_USER_PROFILE_REPORT,
        component: asyncComponent(() => import("pages/user/profile/report")),
    },


    {
        path: routes.ROUTE_SLIDER_LIST,
        component: asyncComponent(() => import("pages/slider/slider")),
    },
    {
        path: routes.ROUTE_SLIDER_ADD,
        component: asyncComponent(() => import("pages/slider/add")),
    },
    {
        path: routes.ROUTE_SLIDER_EDIT,
        component: asyncComponent(() => import("pages/slider/add")),
    },
    {
        path: routes.ROUTE_PARALLEL_LIST,
        component: asyncComponent(() => import("pages/parallel/parallel")),
    },
    {
        path: routes.ROUTE_PARALLEL_ADD,
        component: asyncComponent(() => import("pages/parallel/add")),
    },
    {
        path: routes.ROUTE_PARALLEL_EDIT,
        component: asyncComponent(() => import("pages/parallel/add")),
    },
    {
        path: routes.ROUTE_EXAM_LIST,
        component: asyncComponent(() => import("pages/exam/exam")),
    },
    {
        path: routes.ROUTE_EXAM_ADD,
        component: asyncComponent(() => import("pages/exam/add")),
    },
    {
        path: routes.ROUTE_EXAM_EDIT,
        component: asyncComponent(() => import("pages/exam/add")),
    },
    {
        path: routes.ROUTE_VIDEO_LIST,
        component: asyncComponent(() => import("pages/video/video")),
    },
    {
        path: routes.ROUTE_VIDEO_ADD,
        component: asyncComponent(() => import("pages/video/add")),
    },
    {
        path: routes.ROUTE_VIDEO_EDIT,
        component: asyncComponent(() => import("pages/video/add")),
    },
    {
        path: routes.ROUTE_READING_LIST,
        component: asyncComponent(() => import("pages/reading/reading")),
    },
    {
        path: routes.ROUTE_READING_ADD,
        component: asyncComponent(() => import("pages/reading/add")),
    },
    {
        path: routes.ROUTE_READING_EDIT,
        component: asyncComponent(() => import("pages/reading/add")),
    },
    {
        path: routes.ROUTE_SEASON_LIST,
        component: asyncComponent(() => import("pages/season/season")),
    },
    {
        path: routes.ROUTE_SEASON_ADD,
        component: asyncComponent(() => import("pages/season/add")),
    },
    {
        path: routes.ROUTE_SEASON_EDIT,
        component: asyncComponent(() => import("pages/season/add")),
    },
    {
        path: routes.ROUTE_TAG_LIST,
        component: asyncComponent(() => import("pages/tag/tag")),
    },
    {
        path: routes.ROUTE_TAG_ADD,
        component: asyncComponent(() => import("pages/tag/add")),
    },
    {
        path: routes.ROUTE_TAG_EDIT,
        component: asyncComponent(() => import("pages/tag/add")),
    },
    {
        path: routes.ROUTE_PROPERTY_LIST,
        component: asyncComponent(() => import("pages/property/property")),
    },
    {
        path: routes.ROUTE_PROPERTY_ADD,
        component: asyncComponent(() => import("pages/property/add")),
    },
    {
        path: routes.ROUTE_PROPERTY_EDIT,
        component: asyncComponent(() => import("pages/property/add")),
    },
    {
        path: routes.ROUTE_CATEGORY_LIST,
        component: asyncComponent(() => import("pages/category/category")),
    },
    {
        path: routes.ROUTE_CATEGORY_ADD,
        component: asyncComponent(() => import("pages/category/add")),
    },
    {
        path: routes.ROUTE_CATEGORY_EDIT,
        component: asyncComponent(() => import("pages/category/add")),
    },
    {
        path: routes.ROUTE_COURSE_LIST,
        component: asyncComponent(() => import("pages/course/course")),
    },
    {
        path: routes.ROUTE_COURSE_ADD,
        component: asyncComponent(() => import("pages/course/add")),
    },
    {
        path: routes.ROUTE_COURSE_EDIT,
        component: asyncComponent(() => import("pages/course/add")),
    },
    {
        path: routes.ROUTE_COURSE_SELL_TYPES,
        component: asyncComponent(() => import("pages/course/sellType")),
    },
    {
        path: routes.ROUTE_COURSE_SELL_TYPES_ADD,
        component: asyncComponent(() => import("pages/course/sellTypeAdd")),
    },
    {
        path: routes.ROUTE_COURSE_SELL_TYPES_EDIT,
        component: asyncComponent(() => import("pages/course/sellTypeAdd")),
    },
    {
        path: routes.ROUTE_COURSE_STUDENT_LIST,
        component: asyncComponent(() => import("pages/course/student")),
    },
    {
        path: routes.ROUTE_COURSE_STUDENT_EXAM_LIST,
        component: asyncComponent(() => import("pages/course/exam")),
    },
    {
        path: routes.ROUTE_COURSE_NEW_STUDENT,
        component: asyncComponent(() => import("pages/course/addStudent")),
    },
    {
        path: routes.ROUTE_COURSE_PACKAGES,
        component: asyncComponent(() => import("pages/course/packages")),
    },
    {
        path: routes.ROUTE_COURSE_SAMPLES,
        component: asyncComponent(() => import("pages/course/samples")),
    },
    {
        path: routes.ROUTE_SAMPLE_ADD,
        component: asyncComponent(() => import("pages/course/addSample")),
    },
    {
        path: routes.ROUTE_SAMPLE_EDIT,
        component: asyncComponent(() => import("pages/course/addSample")),
    },
    {
        path: routes.ROUTE_COURSE_INVITE,
        component: asyncComponent(() => import("pages/course/invite")),
    },
    {
        path: routes.ROUTE_INVITE_ADD,
        component: asyncComponent(() => import("pages/course/addInvite")),
    },
    {
        path: routes.ROUTE_INVITE_EDIT,
        component: asyncComponent(() => import("pages/course/addInvite")),
    },
    {
        path: routes.ROUTE_TEACHER_LIST,
        component: asyncComponent(() => import("pages/teacher/teacher")),
    },
    {
        path: routes.ROUTE_TEACHER_ADD,
        component: asyncComponent(() => import("pages/teacher/add")),
    },
    {
        path: routes.ROUTE_TEACHER_EDIT,
        component: asyncComponent(() => import("pages/teacher/add")),
    },
    {
        path: routes.ROUTE_ALBUM_LIST,
        component: asyncComponent(() => import("pages/album/album")),
    },
    {
        path: routes.ROUTE_ALBUM_ADD,
        component: asyncComponent(() => import("pages/album/add")),
    },
    {
        path: routes.ROUTE_ALBUM_EDIT,
        component: asyncComponent(() => import("pages/album/add")),
    },
    {
        path: routes.ROUTE_DISCOUNT_LIST,
        component: asyncComponent(() => import("pages/discount/discount")),
    },
    {
        path: routes.ROUTE_DISCOUNT_ADD,
        component: asyncComponent(() => import("pages/discount/add")),
    },
    {
        path: routes.ROUTE_DISCOUNT_ADD_BULK,
        component: asyncComponent(() => import("pages/discount/add_bulk")),
    },
    {
        path: routes.ROUTE_DISCOUNT_EDIT,
        component: asyncComponent(() => import("pages/discount/add")),
    },
    {
        path: routes.ROUTE_PACKAGE_LIST,
        component: asyncComponent(() => import("pages/package/package")),
    },
    {
        path: routes.ROUTE_PACKAGE_ADD,
        component: asyncComponent(() => import("pages/package/add")),
    },
    {
        path: routes.ROUTE_PACKAGE_EDIT,
        component: asyncComponent(() => import("pages/package/add")),
    },
    {
        path: routes.ROUTE_ORDER_DETAIL,
        component: asyncComponent(() => import("pages/order/detail/orderDetail")),
    },
    {
        path: routes.ROUTE_ORDER_LIST,
        component: asyncComponent(() => import("pages/order/list")),
    },
    {
        path: routes.ROUTE_QUESTION_LIST,
        component: asyncComponent(() => import("pages/question/question")),
    },
    {
        path: routes.ROUTE_QUESTION_ADD,
        component: asyncComponent(() => import("pages/question/add")),
    },
    {
        path: routes.ROUTE_QUESTION_EDIT,
        component: asyncComponent(() => import("pages/question/add")),
    },
    {
        path: routes.ROUTE_COMMENTS_LIST,
        component: asyncComponent(() => import("pages/comments/comments")),
    },
    {
        path: routes.ROUTE_COMMENTS_ADD,
        component: asyncComponent(() => import("pages/comments/add")),
    },
    {
        path: routes.ROUTE_COMMENTS_EDIT,
        component: asyncComponent(() => import("pages/comments/add")),
    },
    {
        path: routes.ROUTE_SURVEY_LIST,
        component: asyncComponent(() => import("pages/survey/survey")),
    },
    {
        path: routes.ROUTE_SURVEY_ADD,
        component: asyncComponent(() => import("pages/survey/add")),
    },
    {
        path: routes.ROUTE_SURVEY_EDIT,
        component: asyncComponent(() => import("pages/survey/add")),
    },
    {
        path: routes.ROUTE_USER_MANAGEMENT_LIST,
        component: asyncComponent(() => import("pages/userManagement/student")),
    },
    {
        path: routes.ROUTE_USER_MANAGEMENT_WALLET,
        component: asyncComponent(() => import("pages/userManagement/wallet")),
    },
    {
        path: routes.ROUTE_LIVE_LIST,
        component: asyncComponent(() => import("pages/live/live")),
    },
    {
        path: routes.ROUTE_LIVE_ADD,
        component: asyncComponent(() => import("pages/live/add")),
    },
    {
        path: routes.ROUTE_LIVE_EDIT,
        component: asyncComponent(() => import("pages/live/add")),
    },
    {
        path: routes.ROUTE_DEPARTMENT_LIST,
        component: asyncComponent(() => import("pages/department/department")),
    },
    {
        path: routes.ROUTE_DEPARTMENT_ADD,
        component: asyncComponent(() => import("pages/department/add")),
    },
    {
        path: routes.ROUTE_DEPARTMENT_EDIT,
        component: asyncComponent(() => import("pages/department/add")),
    },
    {
        path: routes.ROUTE_FAQ_LIST,
        component: asyncComponent(() => import("pages/faq/faq")),
    },
    {
        path: routes.ROUTE_FAQ_ADD,
        component: asyncComponent(() => import("pages/faq/add")),
   },
   {
        path: routes.ROUTE_FAQ_EDIT,
        component: asyncComponent(() => import("pages/faq/add")),
    },
];



class AppRouter extends Component {
    render() {
        const {style} = this.props;
        return (
            <div style={style}>
                {privateRoutes.map(singleRoute => {
                    const {path, exact, ...otherProps} = singleRoute;
                    return (
                        <Route
                            exact={exact === false ? false : true}
                            key={singleRoute.path}
                            path={singleRoute.path}
                            {...otherProps}
                        />
                    );
                })}
            </div>
        );
    }
}

export default AppRouter;

export {routes};
