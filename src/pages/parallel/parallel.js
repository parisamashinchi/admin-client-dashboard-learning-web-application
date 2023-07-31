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

class Parallel extends Component {
    constructor(props, context) {
        super(props);
        const {push} = props;
        this.table = createTable(constants.PARALLEL);
        const editProps = {
            onClick: id =>
                push(
                    privateRoutes.ROUTE_PARALLEL_EDIT.replace(":id", id || -1)
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
            url: constants.PARALLEL_URL,
            buttonWithAction: () => {
                push(privateRoutes.ROUTE_PARALLEL_ADD);
            },
            customTextButtonWithAction: context.intl.formatMessage({
                id: "parallel.list.add"
            }),
            addButtonText: context.intl.formatMessage({
                id: "create"
            }),
            columns: [
                {
                    title: context.intl.formatMessage({
                        id: "parallel.list.id"
                    }),
                    dataIndex: "id",
                    key: "id",
                    render: record => <LocaleNumber>{record}</LocaleNumber>
                },
                {
                    title: context.intl.formatMessage({
                        id: "parallel.list.title"
                    }),
                    dataIndex: "title",
                    key: "title"
                },
                {
                    title: context.intl.formatMessage({
                        id: "parallel.list.description"
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
                    id: "parallel.list.table"
                })}
            />
        );
    }
}

Parallel.contextTypes = {
    intl: PropTypes.object.isRequired
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({push}, dispatch);
};

const mapStateToProps = state => ({
    loading: state.getIn([constants.PARALLEL, "dashboard_loading"]),
    statistics: state.getIn([constants.PARALLEL, "statistics"]),
    shopStatistics: state.getIn([constants.PARALLEL, "shopStatistics"]),
    mostVisitedProducts: state.getIn([
        constants.PARALLEL,
        "mostVisitedProducts",
    ]),
    activities: state.getIn([constants.PARALLEL, "activities"]),
});

export default connect(mapStateToProps, mapDispatchToProps)(toJS(Parallel));
