import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {push} from "connected-react-router";
import {toJS} from "hoc/toJsHoc";
import Ellipsis from 'ant-design-pro/lib/Ellipsis';
import {createTable} from "containers/table/table";
import * as constants from "./constants";
import {emptyRender} from "containers/table/renders/emptyRender";
import * as privateRoutes from "router/private/constants";
import LocaleNumber from "utils/localeNumber";
import PropTypes from 'prop-types';
import Button from '../../components/uiElements/button';
import * as actions from "../../containers/table/actions";
import * as userConstants from "utils/globalRedux/user/constants";

class Course extends Component {
    constructor(props, context) {
        super(props);
        const {push, setCourseId} = props;
        this.table = createTable(constants.COURSE);
        const editProps = {
            onClick: id =>
                push(privateRoutes.ROUTE_COURSE_EDIT.replace(":id", id || -1)),
        };

        const customActions = {
            onClick: id => {
                push(
                    privateRoutes.ROUTE_COURSE_SELL_TYPES.replace(":id", id || -1)
                )
            },
            title: context.intl.formatMessage({
                id: "course.sellType.list"
            })
        };
        const secondCustomActions = {
            onClick: id =>{
                push(
                    privateRoutes.ROUTE_COURSE_STUDENT_LIST.replace(":id", id || -1)
                ),
                    setCourseId(id);
            },
            title: context.intl.formatMessage({
                id: "course.student.list"
            })

        };
        const deleteProps = {
            title: context.intl.formatMessage({
                id: "product.productAttribute.list.pop.deleteTitle",
            }),
            okText: context.intl.formatMessage({
                id: "product.productAttribute.list.pop.deleteConfirm",
            }),
            cancelText: context.intl.formatMessage({
                id: "product.productAttribute.list.pop.deleteDeclined",
            }),
        };
        this.tableConf = {
            url: constants.COURSE_URL,
            buttonWithAction: () => {
                push(privateRoutes.ROUTE_COURSE_ADD);
            },
            customTextButtonWithAction: context.intl.formatMessage({
                id: "course.list.add"
            }),
            addButtonText: context.intl.formatMessage({
                id: "create"
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
                        id: "course.list.title"
                    }),
                    dataIndex: "header_title",
                    key: "header_title"
                },
                {
                    title: context.intl.formatMessage({
                        id: "course.list.level"
                    }),
                    dataIndex: "level",
                    key: "level"
                },
                {
                    title: context.intl.formatMessage({
                        id: "course.list.available"
                    }),
                    dataIndex: "available_period_day",
                    key: "available_period_day"
                },
                {
                    render:  (data) =>
                        <Button onClick={() => push(
                            privateRoutes.ROUTE_COURSE_PACKAGES.replace(":id", data.id || -1)
                            , data.id
                        )}
                        >
                            {context.intl.formatMessage({
                                id: "course.package.list"
                            })}
                        </Button>
                },
                {
                    render:  (data) =>
                        <Button onClick={() => push(
                            privateRoutes.ROUTE_COURSE_SAMPLES.replace(":id", data.id || -1)
                            , data.id
                        )}
                        >
                            {context.intl.formatMessage({
                                id: "course.samples"
                            })}
                        </Button>
                },
                {
                    render:  (data) =>
                        <Button onClick={() => push(
                            privateRoutes.ROUTE_COURSE_INVITE.replace(":id", data.id || -1)
                            , data.id
                        )}
                        >
                            {context.intl.formatMessage({
                                id: "course.invite"
                            })}
                        </Button>
                }
            ],
            hasActions:  true,
            editProps,
            deleteProps,
            customActions,
            secondCustomActions,

        };
        this.tableConfUNI = {
            url: constants.COURSE_URL,
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
                        id: "course.list.title"
                    }),
                    dataIndex: "header_title",
                    key: "header_title"
                },
                {
                    title: context.intl.formatMessage({
                        id: "course.list.level"
                    }),
                    dataIndex: "level",
                    key: "level"
                },
                {
                    title: context.intl.formatMessage({
                        id: "course.list.available"
                    }),
                    dataIndex: "available_period_day",
                    key: "available_period_day"
                },
                {
                    render:  (data) =>
                        <Button onClick={() => push(
                            privateRoutes.ROUTE_COURSE_INVITE.replace(":id", data.id || -1)
                            , data.id
                        )}
                        >
                            {context.intl.formatMessage({
                                id: "course.invite"
                            })}
                        </Button>
                }
            ],
            hasActions:  true,
            secondCustomActions,
        };
    }

    render() {
        const Table = this.table;
        return (
            this.props.userRole === "ADMIN-PROFILE" ||  this.props.userRole === 'view'
                ? <Table
                {...this.tableConf}
                {...this.props}
                titleBox={this.context.intl.formatMessage({
                    id: "course.list.table"
                })}
            />
            : <Table
                    {...this.tableConfUNI}
                    {...this.props}
                    titleBox={this.context.intl.formatMessage({
                        id: "course.list.table"
                    })}
                />


        );
    }
}

Course.contextTypes = {
    intl: PropTypes.object.isRequired
};


const mapDispatchToProps = dispatch => {
    const setCourseId = actions.setCourseId;
    return bindActionCreators({
        push, setCourseId
    }, dispatch);
};

const mapStateToProps = state => ({
    loading: state.getIn([constants.COURSE, "dashboard_loading"]),
    statistics: state.getIn([constants.COURSE, "statistics"]),
    shopStatistics: state.getIn([constants.COURSE, "shopStatistics"]),
    mostVisitedProducts: state.getIn([
        constants.COURSE,
        "mostVisitedProducts",
    ]),
    activities: state.getIn([constants.COURSE, "activities"]),
    userRole: state.getIn([userConstants.USER, "data","role"]),
});

export default connect(mapStateToProps, mapDispatchToProps)(toJS(Course));
