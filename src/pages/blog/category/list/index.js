import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import { toJS } from "hoc/toJsHoc";
import * as blogCategoryConstants from "../constants";
import * as constants from "./constants";
import { push } from "connected-react-router";
import { createTable } from "containers/table/table";
import { emptyRender } from "containers/table/renders/emptyRender";
import { routes as privateRoutes } from "router/private";
import * as panelConstants from "utils/globalRedux/panel/constants";
import LocaleNumber from "utils/localeNumber";

class BlogCategoryList extends Component {
  constructor(props, context) {
    super(props);
    const { push } = props;
    const editProps = {
      onClick: id =>
        push(privateRoutes.ROUTE_BLOG_CATEGORY_EDIT.replace(":id", id || -1))
    };
    const deleteProps = {
      title: context.intl.formatMessage({
        id: "blog.blogCategoryList.pop.deleteTitle"
      }),
      okText: context.intl.formatMessage({
        id: "blog.blogCategoryList.pop.deleteConfirm"
      }),
      cancelText: context.intl.formatMessage({
        id: "blog.blogCategoryList.pop.deleteDeclined"
      })
    };
    this.table = createTable(constants.BLOG_CATEGORY_LIST);
    this.tableConf = {
      url: blogCategoryConstants.API_URL,
      buttonWithAction: () => {
        push(privateRoutes.ROUTE_BLOG_CATEGORY_ADD);
      },
      customTextButtonWithAction: context.intl.formatMessage({
        id: "blog.blogCategoryList.addBlogCategory"
      }),
      addButtonText: context.intl.formatMessage({
        id: "create"
      }),
      columns: [
        {
          title: context.intl.formatMessage({
            id: "blog.blogCategoryList.table.id"
          }),
          dataIndex: "id",
          key: "id",
          render: record => <LocaleNumber>{record}</LocaleNumber>
        },
        {
          title: context.intl.formatMessage({
            id: "blog.blogCategoryList.table.name"
          }),
          dataIndex: "name",
          key: "name"
        },
        {
          title: context.intl.formatMessage({
            id: "blog.blogCategoryList.table.slug"
          }),
          dataIndex: "slug",
          key: "slug"
        },
        {
          title: context.intl.formatMessage({
            id: "blog.blogCategoryList.table.parentName"
          }),
          dataIndex: "parentName",
          key: "parentName",
          render: text => emptyRender(text)
        }
      ],
      hasActions: true,
      editProps,
      deleteProps
    };
  }
  render() {
    const Table = this.table;
    return (
      <Table
        {...this.tableConf}
        {...this.props}
        titleBox={this.context.intl.formatMessage({
          id: "blog.blogCategoryList.table"
        })}
      />
    );
  }
}
BlogCategoryList.contextTypes = {
  intl: PropTypes.object.isRequired
};
const mapDispatchToProps = dispatch => {
  return bindActionCreators({ push }, dispatch);
};
const mapStateToProps = state => ({
  loading: state.getIn(
    ["loading", blogCategoryConstants.BLOG_CATEGORY, "status"],
    false
  ),
  rtlLayout: state.getIn([panelConstants.PANEL, "rtlLayout"], false)
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(toJS(BlogCategoryList));
