import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {push} from "connected-react-router";
import {toJS} from "hoc/toJsHoc";
import {createTable} from "containers/table/table";
import * as privateRoutes from "router/private/constants";
import * as constants from "./constants";
import LocaleNumber from "utils/localeNumber";
import PropTypes from 'prop-types';

class Samples extends Component {
    constructor(props, context) {
        super(props);
        const {push} = props;
        this.table = createTable(constants.INVITE);
        const editProps = {
            onClick: id =>
                push(
                    privateRoutes.ROUTE_INVITE_EDIT.replace(":id", id || -1), props.match.params.id
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
             url: `${constants.COURSE_URL}/${props.match.params.id}/invite_link`,
            secondButtonWithAction: () => {
                push(privateRoutes.ROUTE_COURSE_LIST);
            },
            secondCustomTextButtonWithAction: context.intl.formatMessage({
                id: "course.return"
            }),
            buttonWithAction: () => {
                push(privateRoutes.ROUTE_INVITE_ADD, props.match.params.id);
            },
            customTextButtonWithAction: context.intl.formatMessage({
                id: "course.invite.add"
            }),
            addButtonText: context.intl.formatMessage({
                id: "create"
            }),
            columns: [
                {
                    title: context.intl.formatMessage({
                        id: "package.list.id"
                    }),
                    dataIndex: "id",
                    key: "id",
                    render: record => <LocaleNumber>{record}</LocaleNumber>
                },
                {
                    title: context.intl.formatMessage({
                        id: "invite.list.link"
                    }),
                    dataIndex: "link",
                    key: "link"
                },
                {
                    title: context.intl.formatMessage({
                        id: "invite.list.capacity"
                    }),
                    dataIndex: "capacity",
                    key: "capacity"
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
                        id: "course.package.list"
                    })}
                />
            </div>

        );
    }
}

Samples.contextTypes = {
    intl: PropTypes.object.isRequired
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({push}, dispatch);
};

const mapStateToProps = state => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(toJS(Samples));
