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

class Property extends Component {
    constructor(props, context) {
        super(props);
        const {push} = props;
        this.table = createTable(constants.PROPERTY);
        const editProps = {
            onClick: id =>
                push(
                    privateRoutes.ROUTE_PROPERTY_EDIT.replace(":id", id || -1)
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
            url: constants.PROPERTY_URL,
            buttonWithAction: () => {
                push(privateRoutes.ROUTE_PROPERTY_ADD);
            },
            customTextButtonWithAction: context.intl.formatMessage({
                id: "property.list.add"
            }),
            addButtonText: context.intl.formatMessage({
                id: "create"
            }),
            columns: [
                {
                    title: context.intl.formatMessage({
                        id: "property.list.id"
                    }),
                    dataIndex: "id",
                    key: "id",
                    render: record => <LocaleNumber>{record}</LocaleNumber>
                },
                {
                    title: context.intl.formatMessage({
                        id: "property.list.title"
                    }),
                    dataIndex: "title",
                    key: "title"
                },
                {
                    title: context.intl.formatMessage({
                        id: "property.list.is_published"
                    }),
                    dataIndex: "is_published",
                    key: "is_published",
                    render: bool => booleanRender(bool),
                },
                {
                    title: context.intl.formatMessage({
                        id: "property.list.order"
                    }),
                    dataIndex: "order",
                    key: "order",
                }
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
                    id: "property.list.table"
                })}
            />
        );
    }
}

Property.contextTypes = {
    intl: PropTypes.object.isRequired
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({push}, dispatch);
};

const mapStateToProps = state => ({
    loading: state.getIn([constants.PROPERTY, "dashboard_loading"]),
    statistics: state.getIn([constants.PROPERTY, "statistics"]),
    shopStatistics: state.getIn([constants.PROPERTY, "shopStatistics"]),
    mostVisitedProducts: state.getIn([
        constants.PROPERTY,
        "mostVisitedProducts",
    ]),
    activities: state.getIn([constants.PROPERTY, "activities"]),
});

export default connect(mapStateToProps, mapDispatchToProps)(toJS(Property));
