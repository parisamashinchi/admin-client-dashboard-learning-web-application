import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import { toJS } from "hoc/toJsHoc";
import * as constants from "./constants";
import * as blogConstants from "../constants";
import { push } from "connected-react-router";
import { createTable } from "containers/table/table";
import { booleanRender } from "containers/table/renders/booleanRender";
import { elipsisRender } from "containers/table/renders/elipsisRender";
import { emptyRender } from "containers/table/renders/emptyRender";
import { routes as privateRoutes } from "router/private";
import * as panelConstants from "utils/globalRedux/panel/constants";
import LocaleNumber from "utils/localeNumber";

class BlogList extends Component {
  constructor(props, context) {
    super(props);
    const { push } = props;
    const editProps = {
      onClick: id =>
        push(privateRoutes.ROUTE_BLOG_EDIT.replace(":id", id || -1)),
    };
    const deleteProps = {
      title: context.intl.formatMessage({
        id: "blog.blogList.pop.deleteTitle",
      }),
      okText: context.intl.formatMessage({
        id: "blog.blogList.pop.deleteConfirm",
      }),
      cancelText: context.intl.formatMessage({
        id: "blog.blogList.pop.deleteDeclined",
      }),
    };
    this.table = createTable(constants.BLOG_LIST);
    this.tableConf = {
      url: blogConstants.API_URL,
      buttonWithAction: () => {
        push(privateRoutes.ROUTE_BLOG_ADD);
      },
      customTextButtonWithAction: context.intl.formatMessage({
        id: "blog.blogList.addBlog",
      }),
      addButtonText: context.intl.formatMessage({
        id: "create",
      }),
      columns: [
        {
          title: context.intl.formatMessage({
            id: "blog.blogList.table.id",
          }),
          dataIndex: "id",
          key: "id",
          render: record => <LocaleNumber>{record}</LocaleNumber>,
        },
        {
          title: context.intl.formatMessage({
            id: "blog.blogList.table.title",
          }),
          dataIndex: "title",
          key: "title",
          render: text => elipsisRender(text, 30),
        },
        {
          title: context.intl.formatMessage({
            id: "blog.blogList.table.shortDescription",
          }),
          dataIndex: "shortDescription",
          key: "shortDescription",
          render: text => elipsisRender(emptyRender(text), 30),
        },
        {
          title: context.intl.formatMessage({
            id: "blog.blogList.table.slug",
          }),
          dataIndex: "slug",
          key: "slug",
          render: text => elipsisRender(text, 30),
        },
        {
          title: context.intl.formatMessage({
            id: "blog.blogList.table.isPublish",
          }),
          dataIndex: "isPublish",
          key: "isPublish",
          render: record =>
            booleanRender(
              record,
              false,
              record
                ? "blog.blogList.table.isPublish.published"
                : "blog.blogList.table.isPublish.notPublished"
            ),
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
          id: "blog.blogList.table",
        })}
      />
    );
  }
}
BlogList.contextTypes = {
  intl: PropTypes.object.isRequired,
};
const mapDispatchToProps = dispatch => {
  return bindActionCreators({ push }, dispatch);
};
const mapStateToProps = state => ({
  loading: state.getIn(["loading", blogConstants.BLOG, "status"], false),
  rtlLayout: state.getIn([panelConstants.PANEL, "rtlLayout"], false),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(toJS(BlogList));
