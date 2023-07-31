import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {push} from "connected-react-router";
import {toJS} from "hoc/toJsHoc";
import {createTable} from "containers/table/table";
import * as constants from "./constants";
import { booleanRender } from "containers/table/renders/booleanRender";
import * as privateRoutes from "router/private/constants";
import LocaleNumber from "utils/localeNumber";
import PropTypes from 'prop-types';

class SellType extends Component {
    constructor(props, context) {
        super(props);
        const {push} = props;
        this.table = createTable(constants.COURSE);
        this.state = {
            url: `${constants.COURSE_URL}/${props.match.params.id}/course_sell_type`
        };
        const editProps = {
            onClick: id =>
                push(
                    privateRoutes.ROUTE_COURSE_SELL_TYPES_EDIT.replace( ":courseId", props.match.params.id || -1).replace(":id", id || -1),
        )
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
            url: `${constants.COURSE_URL}/${props.match.params.id}/course_sell_type`,
            buttonWithAction: () => {
                push(privateRoutes.ROUTE_COURSE_SELL_TYPES_ADD.replace(":courseId", props.match.params.id || -1));
            },
            customTextButtonWithAction: context.intl.formatMessage({
                id: "course.list.add"
            }),
            secondButtonWithAction: () => {
                push(privateRoutes.ROUTE_COURSE_LIST);
            },
            secondCustomTextButtonWithAction: context.intl.formatMessage({
                id: "course.return"
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
                    dataIndex: "title",
                    key: "title"
                },
                {
                    title: context.intl.formatMessage({
                        id: "course.list.price"
                    }),
                    dataIndex: "price",
                    key: "price"
                },
                {
                    title: context.intl.formatMessage({
                        id: "course.list.type"
                    }),
                    dataIndex: "type",
                    key: "type"
                },
                {
                    title: context.intl.formatMessage({
                        id: "course.list.is_published"
                    }),
                    dataIndex: "is_published",
                    key: "is_published",
                    render: bool => booleanRender(bool),
                },
            ],
            hasActions: true,
            editProps,
            deleteProps,
        };
    }

    render() {
        const Table = this.table;
        return (
            <Table
                {...this.tableConf}
                {...this.props}
                titleBox={this.context.intl.formatMessage({
                    id: "course.list.table"
                })}
            />
        );
    }
}

SellType.contextTypes = {
    intl: PropTypes.object.isRequired
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({push}, dispatch);
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
});

export default connect(mapStateToProps, mapDispatchToProps)(toJS(SellType));
