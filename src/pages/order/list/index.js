import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import { toJS } from "hoc/toJsHoc";
import * as orderConstants from "../constants";
import * as constants from "./constants";
import { push } from "connected-react-router";
import { createTable } from "containers/table/table";
import { booleanRender } from "containers/table/renders/booleanRender";
import { elipsisRender } from "containers/table/renders/elipsisRender";
import { emptyRender } from "containers/table/renders/emptyRender";
import { timeRender } from "containers/table/renders/timeRender";
import { routes as privateRoutes } from "router/private";
import PersianNumber from "components/PersianNumber";
import ImageLoader from "components/uiElements/imageLoader";
import Select, { Option } from "components/uiElements/select";
import IntlMessages from "utils/intlMessages";
import { NavLink } from "react-router-dom";

class OrderList extends Component {
  constructor(props, context) {
    super(props);
    const { push } = props;
    const deleteProps = {
      title: context.intl.formatMessage({
        id: "order.list.pop.deleteTitle",
      }),
      okText: context.intl.formatMessage({
        id: "order.list.pop.deleteConfirm",
      }),
      cancelText: context.intl.formatMessage({
        id: "order.list.pop.deleteDeclined",
      }),
    };
    this.table = createTable(constants.ORDER_LIST);
    this.tableConf = {
      url: orderConstants.API_URL,
      addButtonText: context.intl.formatMessage({
        id: "create",
      }),
      columns: [
        {
          title: context.intl.formatMessage({
            id: "order.list.table.orderNumber",
          }),
          dataIndex: "orderNumber",
          key: "orderNumber",
          render: (orderNumber, order) => (
            <NavLink
              to={privateRoutes.ROUTE_ORDER_DETAIL.replace(":id", order.id)}
              exact={true}
            >
              <PersianNumber comma={false}>{orderNumber}</PersianNumber>
            </NavLink>
          ),
        },
        {
          title: context.intl.formatMessage({
            id: "order.list.table.createDate",
          }),
          dataIndex: "createDate",
          key: "createDate",
          render: createDate => timeRender(createDate),
        },
        {
          title: context.intl.formatMessage({
            id: "order.list.table.deliveryDate",
          }),
          dataIndex: "deliveryDate",
          key: "deliveryDate",
          render: deliveryDate => timeRender(deliveryDate),
        },
        {
          title: context.intl.formatMessage({
            id: "order.list.table.orderStatus",
          }),
          dataIndex: "orderStatus",
          key: "orderStatus",
          render: orderStatus => {
            return (
              <Select
                dropdownMatchSelectWidth={false}
                style={{ minWidth: "150px" }}
                value={orderStatus}
              >
                <Option value={1}>
                  <IntlMessages id="order.list.table.orderStatus.canceled" />
                </Option>
                <Option value={2}>
                  <IntlMessages id="order.list.table.orderStatus.pending" />
                </Option>
                <Option value={3}>
                  <IntlMessages id="order.list.table.orderStatus.approved" />
                </Option>
                <Option value={4}>
                  <IntlMessages id="order.list.table.orderStatus.post" />
                </Option>
                <Option value={5}>
                  <IntlMessages id="order.list.table.orderStatus.delivered" />
                </Option>
                <Option value={6}>
                  <IntlMessages id="order.list.table.orderStatus.inBasket" />
                </Option>
                <Option value={7}>
                  <IntlMessages id="order.list.table.orderStatus.readyForPay" />
                </Option>
              </Select>
            );
          },
        },
        {
          title: context.intl.formatMessage({
            id: "order.list.table.finalAmount",
          }),
          dataIndex: "finalAmount",
          key: "finalAmount",
          render: finalAmount => (
            <PersianNumber comma={true}>{finalAmount}</PersianNumber>
          ),
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
          id: "order.list.table",
        })}
      />
    );
  }
}
OrderList.contextTypes = {
  intl: PropTypes.object.isRequired,
};
const mapDispatchToProps = dispatch => {
  return bindActionCreators({ push }, dispatch);
};
const mapStateToProps = state => ({
  loading: state.getIn(["loading", orderConstants.ORDER, "status"], false),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(toJS(OrderList));
