import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {push} from "connected-react-router";
import {toJS} from "hoc/toJsHoc";
import {createTable} from "containers/table/table";
import * as constants from "./constants";
import * as privateRoutes from "router/private/constants";
import PropTypes from 'prop-types';

class Comments extends Component {
    constructor(props, context) {
        super(props);
        const {push} = props;
        this.table = createTable(constants.COMMENTS);
        const editProps = {
            onClick: id =>
                push(
                    privateRoutes.ROUTE_COMMENTS_EDIT.replace(":id", id || -1)
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
            url: constants.COMMENTS_URL,
            buttonWithAction: () => {
                push(privateRoutes.ROUTE_COMMENTS_ADD);
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
                        id: "comments.list.course"
                    }),
                    dataIndex: "course_id.header_title",
                    key: "course_id.header_title",
                },
                {
                    title: context.intl.formatMessage({
                        id: "comments.list.student"
                    }),
                    dataIndex: "student_profile_id.name",
                    key: "student_profile_id.name",
                },
                {
                    title: context.intl.formatMessage({
                        id: "comments.list.content"
                    }),
                    dataIndex: "content",
                    key: "content"
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
                    id: "comments.list.table"
                })}
            />
        );
    }
}

Comments.contextTypes = {
    intl: PropTypes.object.isRequired
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({push}, dispatch);
};

const mapStateToProps = state => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(toJS(Comments));
