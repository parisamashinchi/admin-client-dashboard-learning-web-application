import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import Style from "./orderDetail.style";
import { toJS } from "hoc/toJsHoc";
import * as orderConstants from "../constants";
import * as actions from "./actions";
import * as constants from "./constants";
import { push } from "connected-react-router";
import Table from "components/table";
import { booleanRender } from "containers/table/renders/booleanRender";
import { elipsisRender } from "containers/table/renders/elipsisRender";
import { emptyRender } from "containers/table/renders/emptyRender";
import { timeRender } from "containers/table/renders/timeRender";
import { orderStatusRender } from "containers/table/renders/orderStatusRender";
import { routes as privateRoutes } from "router/private";
import PersianNumber from "components/PersianNumber";
import ImageLoader from "components/uiElements/imageLoader";
import Select, { Option } from "components/uiElements/select";
import IntlMessages from "utils/intlMessages";
import { NavLink } from "react-router-dom";
import Descriptions, { DescriptionItems } from "components/description";
import { Row, Col } from "antd";
import Card from "components/uiElements/card";
import get from "lodash/get";
import map from "lodash/map";

class OrderDetail extends Component {
  constructor(props, context) {
    super(props);
    this.orderId = get(this.props.match, "params.id", undefined);
    this.productTableColumns = [
      {
        title: context.intl.formatMessage({
          id: "order.orderDetail.table.product",
        }),
        dataIndex: "productImage",
        key: "productImage",
        render: (productImage, record) => {
          const { productName } = record;
          return (
            <ImageLoader
              className="product-image"
              src={productImage}
              alt={productName}
            />
          );
        },
      },
      {
        title: context.intl.formatMessage({
          id: "order.orderDetail.table.title",
        }),
        dataIndex: "productName",
        key: "productName",
        render: (title, record) => {
          const { attributeIds } = record;
          return (
            <div className="product-title-container">
              <span className="product-title">{title}</span>
              {map(attributeIds, (attributeId, index) => {
                const { name, value } = attributeId;
                return (
                  <span
                    className="product-attribute"
                    key={index}
                  >{`${name} : ${value}`}</span>
                );
              })}
            </div>
          );
        },
      },
      {
        title: context.intl.formatMessage({
          id: "order.orderDetail.table.count",
        }),
        dataIndex: "count",
        key: "count",
        render: count => <PersianNumber comma={false}>{count}</PersianNumber>,
      },
      {
        title: context.intl.formatMessage({
          id: "order.orderDetail.table.price",
        }),
        dataIndex: "price",
        key: "price",
        render: (price, data) => {
          const { salePrice } = data;
          return salePrice > 0 ? (
            <div className="discounted">
              <PersianNumber moneySign>{price}</PersianNumber>
              <PersianNumber moneySign>{salePrice}</PersianNumber>
            </div>
          ) : (
            <PersianNumber moneySign>{price}</PersianNumber>
          );
        },
      },
    ];
  }
  componentDidMount() {
    const { getOrder } = this.props;
    getOrder(this.orderId);
  }
  getPaginationConfig() {
    return { position: "none" };
  }
  render() {
    const { order, loading } = this.props;
    const fullName = get(order, "fullName", "");
    const address = get(order, "address", "");
    const phoneNumber = get(order, "phoneNumber", "");
    const profitPrice = get(order, "profitPrice", 0);
    const orderNumber = get(order, "orderNumber", "");
    const totalProductPrices = get(order, "totalProductPrices", "");
    const finalAmount = get(order, "finalAmount", "");
    const discountAmount = get(order, "discountAmount", "");
    const orderStatus = get(order, "orderStatus", "");
    const createDate = get(order, "createDate", "");
    const deliveryDate = get(order, "deliveryDate", "");
    const shipmentPrice = get(order, "shipmentPrice", "");
    const orderItems = get(order, "orderItems", []);

    return (
      <Style>
        <Row>
          <Col span={24}>
            <Card
              title={
                <Fragment>
                  <IntlMessages id="order.orderDetail.title" />
                  <PersianNumber>{orderNumber}</PersianNumber>
                </Fragment>
              }
            >
              <Descriptions bordered>
                <DescriptionItems
                  label={this.context.intl.formatMessage({
                    id: "order.orderDetail.orderNumber",
                  })}
                >
                  <PersianNumber comma={false}>{orderNumber}</PersianNumber>
                </DescriptionItems>
                <DescriptionItems
                  label={this.context.intl.formatMessage({
                    id: "order.orderDetail.profitPrice",
                  })}
                >
                  <PersianNumber moneySign>{profitPrice}</PersianNumber>
                </DescriptionItems>
                <DescriptionItems
                  label={this.context.intl.formatMessage({
                    id: "order.orderDetail.shipmentPrice",
                  })}
                >
                  <PersianNumber moneySign>{shipmentPrice}</PersianNumber>
                </DescriptionItems>
                <DescriptionItems
                  label={this.context.intl.formatMessage({
                    id: "order.orderDetail.totalProductPrices",
                  })}
                >
                  <PersianNumber moneySign>{totalProductPrices}</PersianNumber>
                </DescriptionItems>
                <DescriptionItems
                  label={this.context.intl.formatMessage({
                    id: "order.orderDetail.finalAmount",
                  })}
                >
                  <PersianNumber moneySign>{finalAmount}</PersianNumber>
                </DescriptionItems>
                <DescriptionItems
                  label={this.context.intl.formatMessage({
                    id: "order.orderDetail.discountAmount",
                  })}
                >
                  <PersianNumber moneySign>{discountAmount}</PersianNumber>
                </DescriptionItems>
                <DescriptionItems
                  label={this.context.intl.formatMessage({
                    id: "order.orderDetail.orderStatus",
                  })}
                >
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
                </DescriptionItems>
                <DescriptionItems
                  label={this.context.intl.formatMessage({
                    id: "order.orderDetail.createDate",
                  })}
                >
                  {timeRender(createDate)}
                </DescriptionItems>
                <DescriptionItems
                  label={this.context.intl.formatMessage({
                    id: "order.orderDetail.deliveryDate",
                  })}
                >
                  {deliveryDate ? timeRender(deliveryDate) : "__"}
                </DescriptionItems>
                <DescriptionItems
                  label={this.context.intl.formatMessage({
                    id: "order.orderDetail.fullName",
                  })}
                >
                  {fullName}
                </DescriptionItems>
                <DescriptionItems
                  label={this.context.intl.formatMessage({
                    id: "order.orderDetail.phoneNumber",
                  })}
                >
                  <PersianNumber comma={false}>{phoneNumber}</PersianNumber>
                </DescriptionItems>
                <DescriptionItems
                  label={this.context.intl.formatMessage({
                    id: "order.orderDetail.address",
                  })}
                >
                  {address}
                </DescriptionItems>
              </Descriptions>
            </Card>
          </Col>
          <Col style={{ marginTop: "30px" }} span={24}>
            <Card
              title={this.context.intl.formatMessage({
                id: "order.orderDetail.table.cardTitle",
              })}
            >
              <Table
                columns={this.productTableColumns}
                dataSource={orderItems}
                pagination={this.getPaginationConfig()}
                loading={loading}
              />
            </Card>
          </Col>
        </Row>
      </Style>
    );
  }
}
OrderDetail.contextTypes = {
  intl: PropTypes.object.isRequired,
};
const mapDispatchToProps = dispatch => {
  const { getOrder } = actions;
  return bindActionCreators({ getOrder }, dispatch);
};
const mapStateToProps = state => ({
  loading: state.getIn(["loading", orderConstants.ORDER, "status"], false),
  order: state.getIn([orderConstants.ORDER, "order"], {}),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(toJS(OrderDetail));
