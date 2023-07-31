import React, { Component } from "react";
import { Link } from "react-router-dom";

import config from "src/config";
import navigation from "src/menu-items";
import DEMO from "utils/globalRedux/panel/constants";
import Aux from "hoc/_Aux";
import PropTypes from "prop-types";
import IntlMessages from "utils/intlMessages";

export default class Breadcrumb extends Component {
  state = {
    main: [],
    item: [],
  };

  componentDidMount() {
    navigation.items.map((item, index) => {
      if (item.type && item.type === "group") {
        this.getCollapse(item, index);
      }
      return false;
    });
  }

  componentWillReceiveProps = () => {
    navigation.items.map((item, index) => {
      if (item.type && item.type === "group") {
        this.getCollapse(item);
      }
      return false;
    });
  };

  getCollapse = item => {
    if (item.children) {
      console.log(document.location);
      item.children.filter(collapse => {
        if (collapse.type && collapse.type === "collapse") {
          this.getCollapse(collapse);
        } else if (collapse.type && collapse.type === "item") {
          if (document.location.pathname === config.basename + collapse.url) {
            this.setState({ item: collapse, main: item });
          }
        }
        return false;
      });
    }
  };

  render() {
    let main, item;
    let breadcrumb = "";
    let title = " ";
    if (this.state.main && this.state.main.type === "collapse") {
      main = (
        <li className="breadcrumb-item">
          <a href={DEMO.BLANK_LINK}>
            <IntlMessages id={this.state.main.title} />
          </a>
        </li>
      );
    }

    if (this.state.item && this.state.item.type === "item") {
      title = this.state.item.title;
      item = (
        <li className="breadcrumb-item">
          <a href={DEMO.BLANK_LINK}>
            <IntlMessages id={title} />
          </a>
        </li>
      );

      if (this.state.item.breadcrumbs !== false) {
        breadcrumb = (
          <div className="page-header">
            <div className="page-block">
              <div className="row align-items-center">
                <div className="col-md-12">
                  <div className="page-header-title">
                    <h5 className="m-b-10">
                      <IntlMessages id={title} />
                    </h5>
                  </div>
                  <ul className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/">
                        <i className="feather icon-home" />
                      </Link>
                    </li>
                    {main}
                    {item}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );
      }
    }

    document.title = `${this.context.intl.formatMessage({
      id: title,
    })} ${this.context.intl.formatMessage({
      id: "site.meta.title",
    })}`;

    return <Aux>{breadcrumb}</Aux>;
  }
}
Breadcrumb.contextTypes = {
  intl: PropTypes.object.isRequired,
};
