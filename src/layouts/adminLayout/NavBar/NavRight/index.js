import React, { Component } from "react";
import { Dropdown } from "react-bootstrap";
import { connect } from "react-redux";
import * as constants from "./constants";
import * as signInActions from "pages/auth/signIn/actions";
import PropTypes from "prop-types";
import { toJS } from "hoc/toJsHoc";
import IntlMessages from "utils/intlMessages";
import { NavLink } from "react-router-dom";
import ImageLoader from "components/uiElements/imageLoader";

import * as userConstants from "utils/globalRedux/user/constants";
import { routes as privateRoutes } from "router/private";

import ChatList from "./ChatList";
import Aux from "hoc/_Aux";
import DEMO from "utils/globalRedux/panel/constants";

import Avatar2 from "static/images/user/avatar-2.jpg";

class NavRight extends Component {
  state = {
    listOpen: false
  };
  render() {
    const { userName, userFamily, userAvatar } = this.props;
    return (
      <Aux>
        <ul className="navbar-nav ml-auto">
          <li className={this.props.rtlLayout ? "m-r-15" : "m-l-15"}>
            <a
              href={DEMO.BLANK_LINK}
              className="displayChatbox"
              onClick={() => {
                this.setState({ listOpen: true });
              }}
            >
              <i className="icon feather icon-mail" />
            </a>
          </li>
          <li>
            <Dropdown alignRight={!this.props.rtlLayout} className="drp-user">
              <Dropdown.Toggle variant={"link"} id="dropdown-basic">
                <i className="icon feather icon-settings" />
              </Dropdown.Toggle>
              <Dropdown.Menu alignRight className="profile-notification">
                <div className="pro-head">
                  <ImageLoader
                    src={userAvatar || Avatar2}
                    local={!userAvatar}
                    className="img-radius"
                    alt="User Profile"
                  />
                  <span>{`${userName} ${userFamily}`}</span>
                  <a
                    className="dud-logout"
                    title={this.context.intl.formatMessage({
                      id: "navBar.logout"
                    })}
                    onClick={this.logout}
                  >
                    <i className="feather icon-log-out" />
                  </a>
                </div>
                <ul className="pro-body">
                  <li>
                    <NavLink
                      className="dropdown-item"
                      to={privateRoutes.ROUTE_SETTINGS}
                      exact={true}
                    >
                      <i className="feather icon-settings" />
                      &nbsp;
                      <IntlMessages id="navBar.settings" />
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="dropdown-item"
                      to={privateRoutes.ROUTE_PROFILE}
                      exact={true}
                    >
                      <i className="feather icon-user" />
                      &nbsp;
                      <IntlMessages id="navBar.profile" />
                    </NavLink>
                  </li>
                </ul>
              </Dropdown.Menu>
            </Dropdown>
          </li>
        </ul>
        <ChatList
          listOpen={this.state.listOpen}
          closed={() => {
            this.setState({ listOpen: false });
          }}
        />
      </Aux>
    );
  }
}
NavRight.contextTypes = {
  intl: PropTypes.object.isRequired
};
const mapDispatchToProps = {
  logoutRequest: signInActions.setLogoutRequest
};
const mapStateToProps = state => ({
  userName: state.getIn([userConstants.USER, "name"], ""),
  userFamily: state.getIn([userConstants.USER, "family"], ""),
  userAvatar: state.getIn([userConstants.USER, "avatar"]),
  loading: state.getIn(["loading", constants.LOGOUT, "status"], false)
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(toJS(NavRight));
