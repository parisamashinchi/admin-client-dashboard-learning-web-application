import React, {Component} from "react";
import {createTable} from "containers/table/table";
import * as constants from "./constants";
import LocaleNumber from "utils/localeNumber";
import PropTypes from 'prop-types';
import * as privateRoutes from "router/private/constants";

class Live extends Component {
    constructor(props, context) {
        super(props);
        this.table = createTable(constants.LIVE);
        const editProps = {
            onClick: id =>
                this.props.history.push(
                    privateRoutes.ROUTE_LIVE_EDIT.replace(":id", id || -1),
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
            url: `/admin/live`,

            buttonWithAction: () => {
                this.props.history.push(privateRoutes.ROUTE_LIVE_ADD);
            },
            customTextButtonWithAction: context.intl.formatMessage({
                id: "live.add"
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
                        id: "live.title"
                    }),
                    dataIndex: "title",
                    key: "title"
                },
                {
                    title: context.intl.formatMessage({
                        id: "live.url"
                    }),
                    dataIndex: "url",
                    key: "url"
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
            <div>
                <Table
                    {...this.tableConf}
                    {...this.props}
                    titleBox={this.context.intl.formatMessage({
                        id: "live.list"
                    })}
                />
            </div>
        );
    }
}

Live.contextTypes = {
    intl: PropTypes.object.isRequired
};

export default Live;

