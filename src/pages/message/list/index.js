import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import { toJS } from "hoc/toJsHoc";
import * as messageConstants from "../constants";
import * as constants from "./constants";
import { push } from "connected-react-router";
import { createTable } from "containers/table/table";
import { booleanRender } from "containers/table/renders/booleanRender";
import LocaleNumber from "utils/localeNumber";

class MessageList extends Component {
  constructor(props, context) {
    super(props);
    const { push } = props;
    const deleteProps = {
      title: context.intl.formatMessage({
        id: "message.list.pop.deleteTitle",
      }),
      okText: context.intl.formatMessage({
        id: "message.list.pop.deleteConfirm",
      }),
      cancelText: context.intl.formatMessage({
        id: "message.list.pop.deleteDeclined",
      }),
    };
    this.table = createTable(constants.MESSAGE_LIST);
    this.tableConf = {
      url: messageConstants.API_URL,
      addButtonText: context.intl.formatMessage({
        id: "create",
      }),
      columns: [
        {
          title: context.intl.formatMessage({
            id: "message.list.table.id",
          }),
          dataIndex: "id",
          key: "id",
          render: id => <LocaleNumber>{id}</LocaleNumber>,
        },
        {
          title: context.intl.formatMessage({
            id: "message.list.table.senderName",
          }),
          dataIndex: "senderName",
          key: "senderName",
        },
        {
          title: context.intl.formatMessage({
            id: "message.list.table.receiverName",
          }),
          dataIndex: "receiverName",
          key: "receiverName",
        },
      ],
      hasActions: true,
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
          id: "message.list.table",
        })}
      />
    );
  }
}
MessageList.contextTypes = {
  intl: PropTypes.object.isRequired,
};
const mapDispatchToProps = dispatch => {
  return bindActionCreators({ push }, dispatch);
};
const mapStateToProps = state => ({
  loading: state.getIn(["loading", messageConstants.MESSAGE, "status"], false),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(toJS(MessageList));
