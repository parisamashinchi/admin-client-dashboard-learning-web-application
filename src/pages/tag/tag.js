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

class Tag extends Component {
    constructor(props, context) {
        super(props);
        const {push} = props;
        this.table = createTable(constants.TAG);
        const editProps = {
            onClick: id =>
                push(
                    privateRoutes.ROUTE_TAG_EDIT.replace(":id", id || -1)
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
            url: constants.TAG_URL,
            buttonWithAction: () => {
                push(privateRoutes.ROUTE_TAG_ADD);
            },
            customTextButtonWithAction: context.intl.formatMessage({
                id: "tag.list.add"
            }),
            addButtonText: context.intl.formatMessage({
                id: "create"
            }),
            columns: [
                {
                    title: context.intl.formatMessage({
                        id: "tag.list.id"
                    }),
                    dataIndex: "id",
                    key: "id",
                    render: record => <LocaleNumber>{record}</LocaleNumber>
                },
                {
                    title: context.intl.formatMessage({
                        id: "tag.list.name"
                    }),
                    dataIndex: "tag_name",
                    key: "tag_name"
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
                    id: "tag.list.table"
                })}
            />
        );
    }
}

Tag.contextTypes = {
    intl: PropTypes.object.isRequired
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({push}, dispatch);
};

const mapStateToProps = state => ({
    loading: state.getIn([constants.TAG, "dashboard_loading"]),
    statistics: state.getIn([constants.TAG, "statistics"]),
    shopStatistics: state.getIn([constants.TAG, "shopStatistics"]),
    activities: state.getIn([constants.TAG, "activities"]),
});

export default connect(mapStateToProps, mapDispatchToProps)(toJS(Tag));
