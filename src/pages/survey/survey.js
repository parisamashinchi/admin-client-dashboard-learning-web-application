import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {push} from "connected-react-router";
import {toJS} from "hoc/toJsHoc";
import {createTable} from "containers/table/table";
import * as constants from "./constants";
import * as privateRoutes from "router/private/constants";
import PropTypes from 'prop-types';

class Survey extends Component {
    constructor(props, context) {
        super(props);
        const {push} = props;
        this.table = createTable(constants.SURVEY);
        const editProps = {
            onClick: id =>
                push(
                    privateRoutes.ROUTE_SURVEY_EDIT.replace(":id", id || -1)
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
            url: constants.SURVEY_URL,
            buttonWithAction: () => {
                push(privateRoutes.ROUTE_SURVEY_ADD);
            },
            customTextButtonWithAction: context.intl.formatMessage({
                id: "comments.list.add"
            }),
            addButtonText: context.intl.formatMessage({
                id: "create"
            }),
            columns: [
                {
                    title: context.intl.formatMessage({
                        id: "survey.title"
                    }),
                    dataIndex: "title",
                    key: "title",
                },
                {
                    title: context.intl.formatMessage({
                        id: "survey.url"
                    }),
                    dataIndex: "url",
                    key: "url",
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
                    id: "survey.list.table"
                })}
            />
        );
    }
}

Survey.contextTypes = {
    intl: PropTypes.object.isRequired
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({push}, dispatch);
};

const mapStateToProps = state => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(toJS(Survey));
