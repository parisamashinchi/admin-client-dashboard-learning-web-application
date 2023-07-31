import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {push} from "connected-react-router";
import {toJS} from "hoc/toJsHoc";
import {createTable} from "containers/table/table";
import * as constants from "./constants";
import * as privateRoutes from "router/private/constants";
import LocaleNumber from "utils/localeNumber";
import PropTypes from 'prop-types';

class Faq extends Component {
    constructor(props, context) {
        super(props);
        const {push} = props;
        this.table = createTable(constants.FAQ);
        const editProps = {
            onClick: id =>
                push(
                    privateRoutes.ROUTE_FAQ_EDIT.replace(":id", id || -1)
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
            url: constants.FAQ_URL,
            buttonWithAction: () => {
                push(privateRoutes.ROUTE_FAQ_ADD);
            },
            customTextButtonWithAction: context.intl.formatMessage({
                id: "faq.list.add"
            }),
            addButtonText: context.intl.formatMessage({
                id: "create"
            }),
            columns: [
                {
                    title: context.intl.formatMessage({
                        id: "faq.list.id"
                    }),
                    dataIndex: "id",
                    key: "id",
                    render: record => <LocaleNumber>{record}</LocaleNumber>
                },
                {
                    title: context.intl.formatMessage({
                        id: "question.list.name"
                    }),
                    dataIndex: "question",
                    key: "question"
                },
                {
                    title: context.intl.formatMessage({
                        id: "answer.list.name"
                    }),
                    dataIndex: "answer",
                    key: "answer"
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
                    id: "faq.list.table"
                })}
            />
        );
    }
}

Faq.contextTypes = {
    intl: PropTypes.object.isRequired
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({push}, dispatch);
};

const mapStateToProps = state => ({
    loading: state.getIn([constants.FAQ, "dashboard_loading"]),
    statistics: state.getIn([constants.FAQ, "statistics"]),
    shopStatistics: state.getIn([constants.FAQ, "shopStatistics"]),
    activities: state.getIn([constants.FAQ, "activities"]),
});

export default connect(mapStateToProps, mapDispatchToProps)(toJS(Faq));
