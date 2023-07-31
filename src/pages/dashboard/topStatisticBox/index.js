import React, { Fragment } from "react";
import { Row, Col } from "antd";
import Card from "components/uiElements/card";
import TopStatistic from "./topStatistic";
import basicStyle from "theme/style";
import PersianNumber from "components/PersianNumber";
import IntlMessages from "utils/intlMessages";
import get from "lodash/get";
import reduce from "lodash/reduce";

const { rowStyleNoWidth } = basicStyle;

const TopStatisticBox = ({ statistics, shopStatistics }) => {
  const totalUser = get(statistics, "totalUser", 0);
  const uniqueView = get(statistics, "uniqueView", 0);
  const totalView = get(statistics, "totalView", 0);

  const todayOrders = get(shopStatistics, "todayOrders", 0);
  const todayUser = get(shopStatistics, "todayUser", 0);
  const order = get(shopStatistics, "order", []);
  const todayProducts = get(shopStatistics, "todayProducts", 0);
  const totalProducts = get(shopStatistics, "totalProducts", 0);

  const todayOrderStatistics = {
    title: "dashboard.topStatistic.todayOrders",
    boldValue: <PersianNumber comma={false}>{todayOrders}</PersianNumber>,
    secondValue: (
      <PersianNumber moneySign>
        {reduce(order, (total, item) => total + item.finalAmount, 0)}
      </PersianNumber>
    ),
  };
  const userStatistics = {
    title: "dashboard.topStatistic.todayUser",
    boldValue: <PersianNumber comma={false}>{todayUser}</PersianNumber>,
    secondValue: (
      <Fragment>
        <IntlMessages id="dashboard.topStatistic.total" />
        <PersianNumber comma={false}>{totalUser}</PersianNumber>
      </Fragment>
    ),
  };
  const viewStatistics = {
    title: "dashboard.topStatistic.uniqueView",
    boldValue: <PersianNumber comma={false}>{uniqueView}</PersianNumber>,
    secondValue: (
      <Fragment>
        <IntlMessages id="dashboard.topStatistic.total" />
        <PersianNumber comma={false}>{totalView}</PersianNumber>
      </Fragment>
    ),
  };
  const productStatistics = {
    title: "dashboard.topStatistic.todayProducts",
    boldValue: <PersianNumber comma={false}>{todayProducts}</PersianNumber>,
    secondValue: (
      <Fragment>
        <IntlMessages id="dashboard.topStatistic.total" />
        <PersianNumber comma={false}>{totalProducts}</PersianNumber>
      </Fragment>
    ),
  };
  return (
    <Row style={rowStyleNoWidth} gutter={30}>
      <Col span={6}>
        <Card>
          <TopStatistic {...todayOrderStatistics} />
        </Card>
      </Col>
      <Col span={6}>
        <Card>
          <TopStatistic {...userStatistics} />
        </Card>
      </Col>
      <Col span={6}>
        <Card>
          <TopStatistic {...viewStatistics} />
        </Card>
      </Col>
      <Col span={6}>
        <Card>
          <TopStatistic {...productStatistics} />
        </Card>
      </Col>
    </Row>
  );
};
export default TopStatisticBox;
