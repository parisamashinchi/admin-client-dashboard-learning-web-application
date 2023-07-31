import React, { Component } from "react";
import Style from "./dashboard.style.js";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { toJS } from "hoc/toJsHoc";
import { Row, Col } from "antd";
import Card from "components/uiElements/card";
import basicStyle from "theme/style";
import TopStatisticBox from "./topStatisticBox";
import StatisticTable from "./statisticTable";
import get from "lodash/get";
import * as actions from "./actions";
import * as constants from "./constants";
import PersianNumber from "components/PersianNumber";
import IntlMessages from "utils/intlMessages";
import { NavLink } from "react-router-dom";
import { emptyRender } from "containers/table/renders/emptyRender";
import { timeRender } from "containers/table/renders/timeRender";
import * as privateRoutes from "router/private/constants";
import Highcharts from "highcharts";
import highchartsVariablePie from "highcharts/modules/variable-pie";
import HighchartsReact from "highcharts-react-official";
import { orderStatusRender } from "containers/table/renders/orderStatusRender";

const { rowStyle, rowStyleNoWidth } = basicStyle;

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.recentActivitiesColumns = [
      {
        dataIndex: "actionName",
        key: "actionName",
      },
      {
        dataIndex: "nickName",
        key: "nickName",
        render: nickName => emptyRender(nickName),
      },
      {
        dataIndex: "createDate",
        key: "createDate",
        render: createDate => timeRender(createDate),
      },
    ];
    this.newOrdersColumns = [
      {
        dataIndex: "fullName",
        key: "fullName",
      },
      {
        dataIndex: "orderStatus",
        key: "orderStatus",
        render: orderStatus => orderStatusRender(orderStatus),
      },
      {
        dataIndex: "finalAmount",
        key: "finalAmount",
        render: finalAmount => (
          <PersianNumber moneySign>{finalAmount}</PersianNumber>
        ),
      },
    ];
    this.orderStatusColumns = [
      {
        dataIndex: "orderStatus",
        key: "orderStatus",
        render: orderStatus => orderStatusRender(orderStatus),
      },
      {
        dataIndex: "count",
        key: "count",
        render: count => <PersianNumber comma={false}>{count}</PersianNumber>,
      },
    ];
  }

  componentDidMount() {
    const { getDashboard } = this.props;
    //getDashboard();
  }
  render() {
    const {
      loading,
      statistics,
      shopStatistics,
      mostVisitedProducts,
      activities,
    } = this.props;
    const order = get(shopStatistics, "order", []);
    const ordersChart = {
      chart: {
        type: "column",
      },
      title: {
        text: "",
      },
      yAxis: [
        {
          className: "highcharts-color-0",
          title: {
            text: "Primary axis",
          },
        },
        {
          className: "highcharts-color-1",
          opposite: true,
          title: {
            text: "Secondary axis",
          },
        },
      ],
      plotOptions: {
        column: {
          borderRadius: 5,
        },
      },

      series: [
        {
          data: [1, 3, 2, 4],
        },
        {
          data: [324, 124, 547, 221],
          yAxis: 1,
        },
      ],
    };
    const usersChart = {
      chart: {
        type: "column",
      },
      title: {
        text: "",
      },
      yAxis: [
        {
          className: "highcharts-color-0",
          title: {
            text: "Primary axis",
          },
        },
        {
          className: "highcharts-color-1",
          opposite: true,
          title: {
            text: "Secondary axis",
          },
        },
      ],
      plotOptions: {
        column: {
          borderRadius: 5,
        },
      },

      series: [
        {
          data: [1, 3, 2, 4],
        },
        {
          data: [324, 124, 547, 221],
          yAxis: 1,
        },
      ],
    };
    const visitorsChart = {
      chart: {
        type: "column",
      },

      title: {
        text: "",
      },

      yAxis: [
        {
          className: "highcharts-color-0",
          title: {
            text: "Primary axis",
          },
        },
        {
          className: "highcharts-color-1",
          opposite: true,
          title: {
            text: "Secondary axis",
          },
        },
      ],

      plotOptions: {
        column: {
          borderRadius: 5,
        },
      },

      series: [
        {
          data: [1, 3, 2, 4],
        },
        {
          data: [324, 124, 547, 221],
          yAxis: 1,
        },
      ],
    };
    const mostUsedDeviceChart = {
      chart: {
        type: "variablepie",
      },
      title: {
        text: "",
      },
      tooltip: {
        headerFormat: "",
        pointFormat:
          '<span style="color:{point.color}">\u25CF</span> <b> {point.name}</b><br/>' +
          "Area (square km): <b>{point.y}</b><br/>" +
          "Population density (people per square km): <b>{point.z}</b><br/>",
      },
      series: [
        {
          minPointSize: 10,
          innerSize: "20%",
          zMin: 0,
          name: "countries",
          data: [
            {
              name: "Spain",
              y: 505370,
              z: 92.9,
            },
            {
              name: "France",
              y: 551500,
              z: 118.7,
            },
            {
              name: "Poland",
              y: 312685,
              z: 124.6,
            },
            {
              name: "Czech Republic",
              y: 78867,
              z: 137.5,
            },
            {
              name: "Italy",
              y: 301340,
              z: 201.8,
            },
            {
              name: "Switzerland",
              y: 41277,
              z: 214.5,
            },
            {
              name: "Germany",
              y: 357022,
              z: 235.6,
            },
          ],
        },
      ],
    };
    return (
      <Style>
        <Row>
          <Col span={24}>
            <TopStatisticBox
              statistics={statistics}
              shopStatistics={shopStatistics}
            />
          </Col>
          <Col span={24}>
            <Row style={{ ...rowStyleNoWidth, marginTop: "30px" }} gutter={30}>
              <Col span={8}>
                <Card title={<IntlMessages id="dashboard.chart.orders" />}>
                  <HighchartsReact
                    highcharts={Highcharts}
                    options={ordersChart}
                  />
                </Card>
              </Col>
              <Col span={8}>
                <Card title={<IntlMessages id="dashboard.chart.users" />}>
                  <HighchartsReact
                    highcharts={Highcharts}
                    options={usersChart}
                  />
                </Card>
              </Col>
              <Col span={8}>
                <Card title={<IntlMessages id="dashboard.chart.visitors" />}>
                  <HighchartsReact
                    highcharts={Highcharts}
                    options={visitorsChart}
                  />
                </Card>
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <Row style={{ ...rowStyleNoWidth, marginTop: "30px" }} gutter={30}>
              <Col span={14}>
                <Card
                  title={<IntlMessages id="dashboard.table.recentActivities" />}
                  extra={
                    <NavLink to={privateRoutes.ROUTE_ORDER_LIST} exact={true}>
                      <a>
                        <IntlMessages id="dashboard.table.activityList" />
                      </a>
                    </NavLink>
                  }
                >
                  <StatisticTable
                    columns={this.recentActivitiesColumns}
                    dataSource={activities}
                  />
                </Card>
              </Col>
              <Col span={10}>
                <Card
                  title={<IntlMessages id="dashboard.table.newOrders" />}
                  extra={
                    <NavLink to={privateRoutes.ROUTE_ORDER_LIST} exact={true}>
                      <a>
                        <IntlMessages id="dashboard.table.orderList" />
                      </a>
                    </NavLink>
                  }
                >
                  <StatisticTable
                    columns={this.newOrdersColumns}
                    dataSource={order}
                  />
                </Card>
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <Row style={{ ...rowStyleNoWidth, marginTop: "30px" }} gutter={30}>
              <Col span={8}>
                <Card
                  title={<IntlMessages id="dashboard.table.orderStatus" />}
                  extra={
                    <NavLink to={privateRoutes.ROUTE_ORDER_LIST} exact={true}>
                      <a>
                        <IntlMessages id="dashboard.table.orderList" />
                      </a>
                    </NavLink>
                  }
                >
                  <StatisticTable
                    columns={this.orderStatusColumns}
                    dataSource={constants.mockProductState}
                  />
                </Card>
              </Col>
              <Col span={16}>
                <Card
                  title={
                    <IntlMessages id="dashboard.table.mostVisitedProducts" />
                  }
                  extra={
                    <NavLink to={privateRoutes.ROUTE_ORDER_LIST} exact={true}>
                      <a>
                        <IntlMessages id="dashboard.table.productList" />
                      </a>
                    </NavLink>
                  }
                >
                  <StatisticTable
                    columns={this.newOrdersColumns}
                    dataSource={order}
                  />
                </Card>
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <Row style={{ ...rowStyleNoWidth, marginTop: "30px" }} gutter={30}>
              <Col span={12}>
                <Card
                  title={
                    <IntlMessages id="dashboard.table.bestSellersByAmount" />
                  }
                  extra={
                    <NavLink to={privateRoutes.ROUTE_ORDER_LIST} exact={true}>
                      <a>
                        <IntlMessages id="dashboard.table.productList" />
                      </a>
                    </NavLink>
                  }
                >
                  <StatisticTable
                    columns={this.newOrdersColumns}
                    dataSource={order}
                  />
                </Card>
              </Col>
              <Col span={12}>
                <Card
                  title={
                    <IntlMessages id="dashboard.table.bestSellersQuantity" />
                  }
                  extra={
                    <NavLink to={privateRoutes.ROUTE_ORDER_LIST} exact={true}>
                      <a>
                        <IntlMessages id="dashboard.table.productList" />
                      </a>
                    </NavLink>
                  }
                >
                  <StatisticTable
                    columns={this.newOrdersColumns}
                    dataSource={order}
                  />
                </Card>
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <Row style={{ ...rowStyleNoWidth, marginTop: "30px" }} gutter={30}>
              <Col span={8}>
                <Card
                  title={
                    <IntlMessages id="dashboard.table.popularSearchKeywords" />
                  }
                >
                  <StatisticTable
                    columns={this.newOrdersColumns}
                    dataSource={order}
                  />
                </Card>
              </Col>
              <Col span={8}>
                <Card
                  title={
                    <IntlMessages id="dashboard.chart.topCountriesAndRegions" />
                  }
                >
                  <HighchartsReact
                    highcharts={Highcharts}
                    options={mostUsedDeviceChart}
                  />
                </Card>
              </Col>
              <Col span={8}>
                <Card
                  title={<IntlMessages id="dashboard.chart.mostUsedDevice" />}
                >
                  <HighchartsReact
                    highcharts={highchartsVariablePie(Highcharts)}
                    options={mostUsedDeviceChart}
                  />
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </Style>
    );
  }
}
const mapStateToProps = state => ({
  loading: state.getIn([constants.DASHBOARD, "dashboard_loading"]),
  statistics: state.getIn([constants.DASHBOARD, "statistics"]),
  shopStatistics: state.getIn([constants.DASHBOARD, "shopStatistics"]),
  mostVisitedProducts: state.getIn([
    constants.DASHBOARD,
    "mostVisitedProducts",
  ]),
  activities: state.getIn([constants.DASHBOARD, "activities"]),
});
const mapDispatchToProps = dispatch => {
  const { getDashboard } = actions;
  return bindActionCreators({ getDashboard }, dispatch);
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(toJS(Dashboard));
