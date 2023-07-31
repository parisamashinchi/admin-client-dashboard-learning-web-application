import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import queryStringToJson from "utils/helpers/queryStringToJson";
import jsonToQueryString from "utils/helpers/jsonToQueryString";
import setQueryStringState from "utils/helpers/setQueryStringState";
import { Header } from "./table.style";
import StyledTable from "components/table";
import PropTypes from "prop-types";
import IntlMessages from "utils/intlMessages";
import { toJS } from "hoc/toJsHoc";
import * as constants from "./constants";
import * as actions from "./actions";
import { mutate } from "utils/helpers/mutator";
import _ from "lodash";
import Button from "components/uiElements/button";
import Icon from "antd/lib/icon";
import { Card } from "react-bootstrap";
import * as panelConstants from "utils/globalRedux/panel/constants";
import TableActions from "./tableActions";
import get from "lodash/get";
import omit from "lodash/omit";
import { formatNumber } from "localization";
import Input from "components/uiElements/textInput";
import { Row, Col } from "antd";
import { animations } from "react-animation";

export function createTable(name) {
  class Table extends Component {
    constructor(props) {
      super(props);
      this.columns = props.columns;
    }
    componentDidMount() {
      const { hasActions = false } = this.props;
      if (hasActions !== false) {
        this.addActionsCol();
      }
      this.fetchData();
    }
    fetchData = (page, limit, query) => {
      const {
        getPage,
        url,
        location: { search },
      } = this.props;
      const queryObject = queryStringToJson(search);
      if (!query) {
        query = omit(queryObject, ["page", "limit"]);
      }
      if (!page) {
        page = Number(get(queryObject, "page", constants.DEFAULT_PAGE_NUMBER));
      }
      if (!limit) {
        limit = Number(get(queryObject, "limit", constants.DEFAULT_PAGE_SIZE));
      }
      setQueryStringState(jsonToQueryString({ page, limit, ...query }));
      console.log(name, url)
      getPage(name, url, { page, limit, ...query });
    };
    refreshTable = e => {
      e.preventDefault();
      this.fetchData();
    };
    preformSearch = e => {
      const { currentPage, limit } = this.props;
      const {
        target: { value },
      } = e;
      const query = value === "" ? {} : { query: value };
      this.fetchData(currentPage, limit, query);
    };
    addActionsCol() {
      const {
        url,
        editProps,
        deleteProps,
        customActions,
        secondCustomActions,
        rtlLayout,
      } = this.props;
      const actionsColumn = {
        title: "",
        dataIndex: "operation",
        render: (text, record, index) => (
          <TableActions
            url={url}
            record={record}
            name={name}
            placement={rtlLayout ? "topLeft" : "topRight"}
            editProps={editProps}
            deleteProps={deleteProps}
            customActions={customActions}
            secondCustomActions ={secondCustomActions}
          />
        ),
      };
      this.columns.push(actionsColumn);
    }
    getPaginationConfig() {
      const { currentPage, totalCount, limit } = this.props;
      return {
        current: currentPage,
        total: totalCount,
        pageSize: limit,
        showSizeChanger: false,
        showTotal: (total, range) =>
          ` ${this.context.intl.formatMessage({
            id: "table.pagination.showTotal",
          })} ${formatNumber(range[1])}-${formatNumber(
            range[0]
          )} ${this.context.intl.formatMessage({
            id: "table.pagination.fromTotal",
          })} ${formatNumber(total)}`,
        onShowSizeChange: this.fetchData,
        itemRender: (current, type, originalElement) => {
          if (type === "prev") {
            return (
              <a>
                <IntlMessages id="table.pagination.prev" />
              </a>
            );
          }
          if (type === "next") {
            return (
              <a>
                <IntlMessages id="table.pagination.next" />
              </a>
            );
          }
          if (type === "page") {
            return <a>{formatNumber(current)}</a>;
          }
          return originalElement;
        },
      };
    }
    // TODO: make a function that reads query
    onSuccess = () => {
      const { currentPage, size } = this.props;
      this.fetchData(currentPage, size);
    };
    handleTableChange = (pagination, filters, sorter) => {
      const { limit } = this.props;
      this.fetchData(pagination.current, limit, filters);
    };
    render() {
      const {
        rtlLayout,
        failed,
        data,
        loading,
        mutator,
        toolbar,
        titleBox,
        expandedRowRender,
        buttonWithAction,
        secondButtonWithAction,
        customTextButtonWithAction,
        secondCustomTextButtonWithAction,
        location: { search },
          mockData,
      } = this.props;
      const mutatedData = _.isObject(mutator)
        ? _.map(data, row => mutate(row, mutator))
        : data;
      // TODO: add retry button in failed state
      const emptyText = !loading ? (
        failed ? (
          <Button onClick={this.refreshTable}>
            <IntlMessages id="table.refresh" />
          </Button>
        ) : (
          <IntlMessages id="table.empty" />
        )
      ) : (
        <span />
      );
      const queryObject = queryStringToJson(search);
      const query = get(queryObject, "query", "");
      return (
        <div>
          <Card style={{ animation: animations.fadeIn }}>
            <Card.Header>
              <Card.Title as="h5">{titleBox}</Card.Title>
            </Card.Header>
            <Card.Body>
              <Header>
                <Row className="toolbar">
                  <Col className="toolbar-left" span={24} sm={{ span: 12 }}>
                    {buttonWithAction !== undefined ? (
                      <Button dark onClick={buttonWithAction} type="primary">
                        <Icon type="plus" />
                        &nbsp;
                        {customTextButtonWithAction}
                      </Button>
                    ) : (
                      ""
                    )}
                    {secondButtonWithAction !== undefined ? (
                        <Button dark onClick={secondButtonWithAction} type="primary" className="second-button">
                          &nbsp;
                          {secondCustomTextButtonWithAction}
                        </Button>
                    ) : (
                        ""
                    )}
                  </Col>
                  <Col className="toolbar-right" span={24} sm={{ span: 12 }}>
                    <Input
                      className="search-input"
                      defaultValue={query}
                      placeholder={this.context.intl.formatMessage({
                        id: "table.search",
                      })}
                      onPressEnter={this.preformSearch}
                    />
                  </Col>
                </Row>
              </Header>
              <div className="table-head">{toolbar}</div>
              <StyledTable
                rtlLayout={rtlLayout}
                locale={{ emptyText }}
                rowKey={item => item.id}
                columns={this.columns}
                expandedRowRender={expandedRowRender}
                dataSource={mutatedData}
                loading={loading}
                pagination={this.getPaginationConfig()}
                onChange={this.handleTableChange}
                className="isoEditableTable"
              />
            </Card.Body>
          </Card>
        </div>
      );
    }
  }
  Table.propTypes = {
    url: PropTypes.string.isRequired,
    query: PropTypes.object,
    addButtonText: PropTypes.string,
    columns: PropTypes.array.isRequired,
    expandedRowRender: PropTypes.func,
    mutator: PropTypes.object,
    addConf: PropTypes.oneOfType([
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        children: PropTypes.any.isRequired,
      }),
      PropTypes.arrayOf(
        PropTypes.shape({
          menuItem: PropTypes.any.isRequired,
          title: PropTypes.string.isRequired,
          children: PropTypes.any.isRequired,
        })
      ),
    ]),
    filterConf: PropTypes.oneOfType([
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        children: PropTypes.any.isRequired,
      }),
    ]),
    editConf: PropTypes.shape({
      title: PropTypes.string.isRequired,
      children: PropTypes.any.isRequired,
    }),
  };
  Table.contextTypes = {
    intl: PropTypes.object.isRequired,
  };
  const mapStateToProps = state => ({
    loading: state.getIn([constants.TABLE, name + "_loading"]),
    data: state.getIn([constants.TABLE, name + "_data"]),
    totalCount: state.getIn([constants.TABLE, name + "_meta", "total"]),
    currentPage: state.getIn(
      [constants.TABLE, name + "_meta", "current_page"],
      constants.DEFAULT_PAGE_NUMBER
    ),
    limit: state.getIn(
      [constants.TABLE, name + "_meta", "per_page"],
      constants.DEFAULT_PAGE_SIZE
    ),
    failed: state.getIn([constants.TABLE, name + "_failed"]),
    count: state.getIn(
      ["Form", `TableFilter/${name}` + "_formData", "filter"],
      {}
    ),
    submitted: state.getIn(
      ["Form", `TableFilter/${name}` + "_formData", "submitted"],
      {}
    ),
    rtlLayout: state.getIn([panelConstants.PANEL, "rtlLayout"], false),
  });
  const mapDispatchToProps = dispatch => {
    const { getPage, remove } = actions;
    return bindActionCreators({ getPage, remove }, dispatch);
  };
  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(toJS(Table));
}
