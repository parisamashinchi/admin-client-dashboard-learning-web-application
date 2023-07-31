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

class Teacher extends Component {
    constructor(props, context) {
        super(props);
        const {push} = props;
        this.table = createTable(constants.TEACHER);
        const editProps = {
            onClick: id =>
                push(
                    privateRoutes.ROUTE_TEACHER_EDIT.replace(":id", id || -1)
                ),
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
            url: constants.TEACHER_URL,
            buttonWithAction: () => {
                push(privateRoutes.ROUTE_TEACHER_ADD);
            },
            customTextButtonWithAction: context.intl.formatMessage({
                id: "teacher.list.add"
            }),
            addButtonText: context.intl.formatMessage({
                id: "create"
            }),
            columns: [
                {
                    title: context.intl.formatMessage({
                        id: "teacher.list.id"
                    }),
                    dataIndex: "id",
                    key: "id",
                    render: record => <LocaleNumber>{record}</LocaleNumber>
                },
                {
                    title: context.intl.formatMessage({
                        id: "teacher.list.name"
                    }),
                    dataIndex: "name",
                    key: "name"
                },
                {
                    title: context.intl.formatMessage({
                        id: "teacher.form.mobileNumber"
                    }),
                    dataIndex: "mobile_number",
                    key: "mobile_number",
                },
                {
                    title: context.intl.formatMessage({
                        id: "teacher.form.role"
                    }),
                    dataIndex: "role",
                    key: "role",
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
                    id: "teacher.list.table"
                })}
            />
        );
    }
}

Teacher.contextTypes = {
    intl: PropTypes.object.isRequired
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({push}, dispatch);
};

const mapStateToProps = state => ({
    loading: state.getIn([constants.TEACHER, "dashboard_loading"]),
    statistics: state.getIn([constants.TEACHER, "statistics"]),
    shopStatistics: state.getIn([constants.TEACHER, "shopStatistics"]),
    mostVisitedProducts: state.getIn([
        constants.TEACHER,
        "mostVisitedProducts",
    ]),
    activities: state.getIn([constants.TEACHER, "activities"]),
});

export default connect(mapStateToProps, mapDispatchToProps)(toJS(Teacher));
