import React from "react";
import * as constants from "src/constants";
import { palette } from "theme/injectGlobal";
import IntlMessages from "utils/intlMessages";

export function orderStatusRender(orderStatus) {
  switch (orderStatus) {
    case constants.ORDER_STATUS_CANCELED:
      return (
        <span style={{ color: palette.red }}>
          <IntlMessages id="order.list.table.orderStatus.canceled" />
        </span>
      );
    case constants.ORDER_STATUS_PENDING:
      return (
        <span style={{ color: palette.orange }}>
          <IntlMessages id="order.list.table.orderStatus.pending" />
        </span>
      );
    case constants.ORDER_STATUS_APPROVED:
      return (
        <span style={{ color: palette.green }}>
          <IntlMessages id="order.list.table.orderStatus.approved" />
        </span>
      );
    case constants.ORDER_STATUS_POST:
      return (
        <span style={{ color: palette.green }}>
          <IntlMessages id="order.list.table.orderStatus.post" />
        </span>
      );
    case constants.ORDER_STATUS_DELIVERED:
      return (
        <span style={{ color: palette.green }}>
          <IntlMessages id="order.list.table.orderStatus.delivered" />
        </span>
      );
    case constants.ORDER_STATUS_IN_BASKET:
      return (
        <span style={{ color: palette.blue }}>
          <IntlMessages id="order.list.table.orderStatus.inBasket" />
        </span>
      );
    case constants.ORDER_STATUS_READY_FOR_PAY:
      return (
        <span style={{ color: palette.orange }}>
          <IntlMessages id="order.list.table.orderStatus.readyForPay" />
        </span>
      );
    default:
      return (
        <span style={{ color: palette.blue }}>
          <IntlMessages id="order.list.table.orderStatus.canceled" />
        </span>
      );
  }
}
