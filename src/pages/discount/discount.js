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

class Discount extends Component {
    constructor(props, context) {
        super(props);
        const {push} = props;
        this.table = createTable(constants.DISCOUNT);
        const editProps = {
            onClick: id =>
                push(
                    privateRoutes.ROUTE_DISCOUNT_EDIT.replace(":id", id || -1)
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
            url: constants.DISCOUNT_URL,
            buttonWithAction: () => {
                push(privateRoutes.ROUTE_DISCOUNT_ADD);
            },
            secondButtonWithAction: () => {
                push(privateRoutes.ROUTE_DISCOUNT_ADD_BULK);
            },
            customTextButtonWithAction: context.intl.formatMessage({
                id: "discount.list.add"
            }),
            secondCustomTextButtonWithAction: context.intl.formatMessage({
                id: "discount.list.add.bulk"
            }),
            addButtonText: context.intl.formatMessage({
                id: "create"
            }),
            columns: [
                {
                    title: context.intl.formatMessage({
                        id: "discount.list.id"
                    }),
                    dataIndex: "id",
                    key: "id",
                    render: record => <LocaleNumber>{record}</LocaleNumber>
                },
                {
                    title: context.intl.formatMessage({
                        id: "discount.list.code"
                    }),
                    dataIndex: "code",
                    key: "code"
                },
                {
                    title: context.intl.formatMessage({
                        id: "discount.list.seed"
                    }),
                    dataIndex: "seed",
                    key: "seed",
                },
                {
                    title: context.intl.formatMessage({
                        id: "discount.list.value"
                    }),
                    dataIndex: "value",
                    key: "value",
                },
                {
                    title: context.intl.formatMessage({
                        id: "discount.list.type"
                    }),
                    dataIndex: "type",
                    key: "type",
                },
                {
                    title: context.intl.formatMessage({
                        id: "discount.list.expired_at"
                    }),
                    dataIndex: "expired_at",
                    key: "expired_at",
                },
                {
                    title: context.intl.formatMessage({
                        id: "discount.list.threshold"
                    }),
                    dataIndex: "threshold",
                    key: "threshold",
                },
                {
                    title: context.intl.formatMessage({
                        id: "discount.list.is_published"
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
                    id: "discount.list.table"
                })}
            />
        );
    }
}

Discount.contextTypes = {
    intl: PropTypes.object.isRequired
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({push}, dispatch);
};

const mapStateToProps = state => ({
    loading: state.getIn([constants.DISCOUNT, "dashboard_loading"]),
    statistics: state.getIn([constants.DISCOUNT, "statistics"]),
    shopStatistics: state.getIn([constants.DISCOUNT, "shopStatistics"]),
    mostVisitedProducts: state.getIn([
        constants.DISCOUNT,
        "mostVisitedProducts",
    ]),
    activities: state.getIn([constants.DISCOUNT, "activities"]),
});

export default connect(mapStateToProps, mapDispatchToProps)(toJS(Discount));
