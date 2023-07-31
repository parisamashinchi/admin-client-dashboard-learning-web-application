import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import { toJS } from "hoc/toJsHoc";
import * as giftCardConstants from "../constants";
import * as constants from "./constants";
import { push } from "connected-react-router";
import { createTable } from "containers/table/table";
import { booleanRender } from "containers/table/renders/booleanRender";
import { timeRender } from "containers/table/renders/timeRender";
import { routes as privateRoutes } from "router/private";
import LocaleNumber from "utils/localeNumber";
import PersianNumber from "components/PersianNumber";

class GiftCodeList extends Component {
  constructor(props, context) {
    super(props);
    const { push } = props;
    const editProps = {
      onClick: id =>
        push(privateRoutes.ROUTE_GIFT_CARD_EDIT.replace(":id", id || -1)),
    };
    const deleteProps = {
      title: context.intl.formatMessage({
        id: "giftCard.list.pop.deleteTitle",
      }),
      okText: context.intl.formatMessage({
        id: "giftCard.list.pop.deleteConfirm",
      }),
      cancelText: context.intl.formatMessage({
        id: "giftCard.list.pop.deleteDeclined",
      }),
    };
    this.table = createTable(constants.GIFT_CARD_LIST);
    this.tableConf = {
      url: giftCardConstants.API_URL,
      buttonWithAction: () => {
        push(privateRoutes.ROUTE_GIFT_CARD_ADD);
      },
      customTextButtonWithAction: context.intl.formatMessage({
        id: "giftCard.list.addGiftCard",
      }),
      addButtonText: context.intl.formatMessage({
        id: "create",
      }),
      columns: [
        {
          title: context.intl.formatMessage({
            id: "giftCard.list.table.id",
          }),
          dataIndex: "id",
          key: "id",
          render: record => <LocaleNumber>{record}</LocaleNumber>,
        },
        {
          title: context.intl.formatMessage({
            id: "giftCard.list.table.code",
          }),
          dataIndex: "code",
          key: "code",
        },
        {
          title: context.intl.formatMessage({
            id: "giftCard.list.table.count",
          }),
          dataIndex: "count",
          key: "count",
        },
        {
          title: context.intl.formatMessage({
            id: "giftCard.list.table.amount",
          }),
          dataIndex: "amount",
          key: "amount",
          render: amount => <PersianNumber moneySign>{amount}</PersianNumber>,
        },
        {
          title: context.intl.formatMessage({
            id: "giftCard.list.table.startDate",
          }),
          dataIndex: "startDate",
          key: "startDate",
          render: date => timeRender(date),
        },
        {
          title: context.intl.formatMessage({
            id: "giftCard.list.table.endDate",
          }),
          dataIndex: "endDate",
          key: "endDate",
          render: date => timeRender(date),
        },
        {
          title: context.intl.formatMessage({
            id: "giftCard.list.table.isActive",
          }),
          dataIndex: "isActive",
          key: "isActive",
          render: record => booleanRender(record),
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
          id: "giftCard.list.table",
        })}
      />
    );
  }
}
GiftCodeList.contextTypes = {
  intl: PropTypes.object.isRequired,
};
const mapDispatchToProps = dispatch => {
  return bindActionCreators({ push }, dispatch);
};
const mapStateToProps = state => ({
  loading: state.getIn(
    ["loading", giftCardConstants.GIFT_CARD, "status"],
    false
  ),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(toJS(GiftCodeList));
