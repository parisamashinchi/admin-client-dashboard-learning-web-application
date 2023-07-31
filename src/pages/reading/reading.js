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

class Reading extends Component {
    constructor(props, context) {
        super(props);
        const {push} = props;
        this.table = createTable(constants.READING);
        const editProps = {
            onClick: id =>
                push(
                    privateRoutes.ROUTE_READING_EDIT.replace(":id", id || -1)
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
            url: constants.READING_URL,
            buttonWithAction: () => {
                push(privateRoutes.ROUTE_READING_ADD);
            },
            customTextButtonWithAction: context.intl.formatMessage({
                id: "reading.list.add"
            }),
            addButtonText: context.intl.formatMessage({
                id: "create"
            }),
            columns: [
                {
                    title: context.intl.formatMessage({
                        id: "reading.list.id"
                    }),
                    dataIndex: "id",
                    key: "id",
                    render: record => <LocaleNumber>{record}</LocaleNumber>
                },
                {
                    title: context.intl.formatMessage({
                        id: "reading.list.title"
                    }),
                    dataIndex: "title",
                    key: "title"
                },
                {
                    title: context.intl.formatMessage({
                        id: "reading.list.is_published"
                    }),
                    dataIndex: "is_published",
                    key: "is_published"
                },
                {
                    title: context.intl.formatMessage({
                        id: "reading.list.description"
                    }),
                    dataIndex: "descriptions",
                    key: "descriptions",
                    render: text => emptyRender(<Ellipsis tooltip={true} length={15}>{text}</Ellipsis>)
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
                    id: "reading.list.table"
                })}
            />
        );
    }
}

Reading.contextTypes = {
    intl: PropTypes.object.isRequired
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({push}, dispatch);
};

const mapStateToProps = state => ({
    loading: state.getIn([constants.READING, "dashboard_loading"]),
    statistics: state.getIn([constants.READING, "statistics"]),
    shopStatistics: state.getIn([constants.READING, "shopStatistics"]),
    mostVisitedProducts: state.getIn([
        constants.READING,
        "mostVisitedProducts",
    ]),
    activities: state.getIn([constants.READING, "activities"]),
});

export default connect(mapStateToProps, mapDispatchToProps)(toJS(Reading));
