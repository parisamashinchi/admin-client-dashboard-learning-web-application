import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {push} from "connected-react-router";
import {toJS} from "hoc/toJsHoc";
import {createTable} from "containers/table/table";
import * as constants from "./constants";
import { booleanRender } from "containers/table/renders/booleanRender";
import * as privateRoutes from "router/private/constants";
import PropTypes from 'prop-types';

class Question extends Component {
    constructor(props, context) {
        super(props);
        const {push} = props;
        this.table = createTable(constants.QUESTION);
        const editProps = {
            onClick: id =>
                push(
                    privateRoutes.ROUTE_QUESTION_EDIT.replace(":id", id || -1)
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
            url: constants.QUESTION_URL,
            buttonWithAction: () => {
                push(privateRoutes.ROUTE_QUESTION_ADD);
            },
            customTextButtonWithAction: context.intl.formatMessage({
                id: "question.list.add"
            }),
            addButtonText: context.intl.formatMessage({
                id: "create"
            }),
            columns: [
                {
                    title: context.intl.formatMessage({
                        id: "question.list.question"
                    }),
                    dataIndex: "question",
                    key: "question"
                },
                {
                    title: context.intl.formatMessage({
                        id: "question.list.question_media"
                    }),
                    dataIndex: "question_media",
                    key: "question_media",
                },
                {
                    title: context.intl.formatMessage({
                        id: "question.list.is_published"
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
                    id: "question.list.table"
                })}
            />
        );
    }
}

Question.contextTypes = {
    intl: PropTypes.object.isRequired
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({push}, dispatch);
};

const mapStateToProps = state => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(toJS(Question));
