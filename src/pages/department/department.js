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

class Department extends Component {
    constructor(props, context) {
        super(props);
        const {push} = props;
        this.table = createTable(constants.DEPARTMENT);
        const editProps = {
            onClick: id =>
                push(
                    privateRoutes.ROUTE_DEPARTMENT_EDIT.replace(":id", id || -1)
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
            url: constants.DEPARTMENT_URL,
            buttonWithAction: () => {
                push(privateRoutes.ROUTE_DEPARTMENT_ADD);
            },
            customTextButtonWithAction: context.intl.formatMessage({
                id: "department.list.add"
            }),
            addButtonText: context.intl.formatMessage({
                id: "create"
            }),
            columns: [
                {
                    title: context.intl.formatMessage({
                        id: "department.list.id"
                    }),
                    dataIndex: "id",
                    key: "id",
                    render: record => <LocaleNumber>{record}</LocaleNumber>
                },
                {
                    title: context.intl.formatMessage({
                        id: "department.list.title"
                    }),
                    dataIndex: "title",
                    key: "title"
                },
                {
                    title: context.intl.formatMessage({
                        id: "department.list.is_published"
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
                    id: "department.list.table"
                })}
            />
        );
    }
}

Department.contextTypes = {
    intl: PropTypes.object.isRequired
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({push}, dispatch);
};

const mapStateToProps = state => ({
    loading: state.getIn([constants.DEPARTMENT, "dashboard_loading"]),
});

export default connect(mapStateToProps, mapDispatchToProps)(toJS(Department));
