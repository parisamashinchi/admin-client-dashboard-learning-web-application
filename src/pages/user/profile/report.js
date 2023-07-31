import React, {Component} from "react";
import PropTypes from "prop-types";
import * as actions from "./actions";
import * as constants from "./constants";
import connect from "react-redux/es/connect/connect";
import {Form} from "antd";
import {toJS} from "hoc/toJsHoc";
import {createTable} from "containers/table/table";
import profile from "../../../static/images/k.jpg";
import Style from "./profile.style";
class Report extends Component {
    constructor(props, context) {
        super(props);
        const {push} = props;
        this.table = createTable(constants.FINANCIAL);
        this.tableConf = {
            url: constants.FINANCIAL_URL,
            columns: [
                {
                    title: context.intl.formatMessage({
                        id: "user.profile.report.date"
                    }),
                    dataIndex: "date_time",
                    key: "date_time",
                },
                {
                    title: context.intl.formatMessage({
                        id: "user.profile.report.price"
                    }),
                    dataIndex: "amount",
                    key: "amount"
                },
                {
                    title: context.intl.formatMessage({
                        id: "user.profile.report.type"
                    }),
                    dataIndex: "type",
                    key: "type",
                },
                {
                    title: context.intl.formatMessage({
                        id: "user.profile.report.name"
                    }),
                    dataIndex: "title",
                    key: "title",
                },
            ],
            hasActions: false,
        };
    }

    render() {
        const Table = this.table;
        return (
            <Style>
                <img src={profile} className="back-img" alt="profile back" />
                <Table
                    {...this.tableConf}
                    {...this.props}
                />
            </Style>
        );
    }
}

Report.contextTypes = {
    intl: PropTypes.object.isRequired
};
export default Report;