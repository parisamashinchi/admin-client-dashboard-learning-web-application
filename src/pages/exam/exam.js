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
import Button from "../../components/uiElements/button";
import {Icon} from "antd"

class Exam extends Component {
    constructor(props, context) {
        super(props);
        const {push} = props;
        this.table = createTable(constants.EXAM);
        const editProps = {
            onClick: id =>
                push(
                    privateRoutes.ROUTE_EXAM_EDIT.replace(":id", id || -1)
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
            url: constants.EXAM_URL,
            buttonWithAction: () => {
                push(privateRoutes.ROUTE_EXAM_ADD);
            },
            customTextButtonWithAction: context.intl.formatMessage({
                id: "exam.list.add"
            }),
            addButtonText: context.intl.formatMessage({
                id: "create"
            }),
            columns: [
                {
                    title: context.intl.formatMessage({
                        id: "exam.list.id"
                    }),
                    dataIndex: "id",
                    key: "id",
                    render: record => <LocaleNumber>{record}</LocaleNumber>
                },
                {
                    title: context.intl.formatMessage({
                        id: "exam.list.title"
                    }),
                    dataIndex: "title",
                    key: "title"
                },
                {
                    title: context.intl.formatMessage({
                        id: "exam.list.dueDate"
                    }),
                    dataIndex: "due_date",
                    key: "due_date"
                },
                {
                    title: context.intl.formatMessage({
                        id: "exam.list.description"
                    }),
                    dataIndex: "descriptions",
                    key: "descriptions",
                    render: text => emptyRender(<Ellipsis tooltip={true} length={15}>{text}</Ellipsis>)
                },
                {
                    dataIndex: "attachment_url",
                    key: "attachment_url",
                    render:  (attachment_url, data) =>
                        <Button onClick={() =>this.downloadExam(attachment_url, data.title)}>
                            <Icon type="download" />
                            {context.intl.formatMessage({
                                id: "exam.list.attachment_url"
                            })}
                        </Button>
                },
            ],
            hasActions: true,
            editProps,
            deleteProps,
        };
    }
    downloadExam= (url, title) => {
        fetch(url).then(res => res.blob()).then(blob => {
            let a = document.createElement('a');
            let url = window.URL.createObjectURL(blob);
            let filename;
            if(blob.type === "application/zip"){
                filename = `${title}.zip`;
            }else if(blob.type === "application/pdf"){
                filename = `${title}.pdf`;
            }else if(blob.type === "application/x-rar-compressed"){
                filename = `${title}.rar`;
            }
            a.href = url;
            a.download = filename;
            a.click();
        })
    }
    render() {
        const Table = this.table;
        return (
            <Table
                {...this.tableConf}
                {...this.props}
                titleBox={this.context.intl.formatMessage({
                    id: "exam.list.table"
                })}
            />
        );
    }
}

Exam.contextTypes = {
    intl: PropTypes.object.isRequired
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({push}, dispatch);
};

const mapStateToProps = state => ({
    loading: state.getIn([constants.EXAM, "dashboard_loading"]),
    statistics: state.getIn([constants.EXAM, "statistics"]),
    shopStatistics: state.getIn([constants.EXAM, "shopStatistics"]),
    mostVisitedProducts: state.getIn([
        constants.EXAM,
        "mostVisitedProducts",
    ]),
    activities: state.getIn([constants.EXAM, "activities"]),
});

export default connect(mapStateToProps, mapDispatchToProps)(toJS(Exam));
