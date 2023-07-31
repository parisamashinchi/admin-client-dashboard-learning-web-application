import React, { Component, Suspense } from "react";
import { connect } from "react-redux";
import Fullscreen from "react-full-screen";
import windowSize from "react-window-size";
import PrivateRoutes from "router/private";
import Navigation from "./Navigation";
import NavBar from "./NavBar";
import Breadcrumb from "./Breadcrumb";
import Aux from "hoc/_Aux";
import * as panelActions from "utils/globalRedux/panel/actions";
import "./app.scss";
import * as actions from "./actions";
import { withRouter } from "react-router-dom";
import * as panelConstants from "utils/globalRedux/panel/constants";
import * as profileConstants from "../../pages/user/profile/constants";
import * as userConstants from "utils/globalRedux/user/constants";
import { routes as privateRoutes } from "router/private";
import isEmpty from "lodash/isEmpty";

class AdminLayout extends Component {
  componentDidMount() {
    const { getMe } = this.props;
      getMe();
    console.log(this.props.location.search,'here')
      if(this.props.isLoggedIn &&  this.props.userRole === "STUDENT-PROFILE" && isEmpty(this.props.location.search)){
        this.props.history.push(privateRoutes.ROUTE_USER_DASHBOARD);
      }
  }
  fullScreenExitHandler = () => {
    if (
      !document.fullscreenElement &&
      !document.webkitIsFullScreen &&
      !document.mozFullScreen &&
      !document.msFullscreenElement
    ) {
      this.props.onFullScreenExit();
    }
  };
  componentWillMount() {
    if (
      this.props.windowWidth > 992 &&
      this.props.windowWidth <= 1024 &&
      this.props.layout !== "horizontal"
    ) {
      this.props.onComponentWillMount();
    }
  }
  mobileOutClickHandler() {
    if (this.props.windowWidth < 992 && this.props.collapseMenu) {
      this.props.onComponentWillMount();
    }
  }
  render() {
    /* full screen exit call */
    document.addEventListener("fullscreenchange", this.fullScreenExitHandler);
    document.addEventListener(
      "webkitfullscreenchange",
      this.fullScreenExitHandler
    );
    document.addEventListener(
      "mozfullscreenchange",
      this.fullScreenExitHandler
    );
    document.addEventListener("MSFullscreenChange", this.fullScreenExitHandler);
    return (
      <Aux>
        <Fullscreen enabled={this.props.isFullScreen}>
          <Navigation  info={this.props.info}/>
          <NavBar />
          <div
            className="pcoded-main-container"
            onClick={() => this.mobileOutClickHandler}
          >
            <div className="pcoded-wrapper">
              <div className="pcoded-content">
                <div className="pcoded-inner-content">
                    {/*<Breadcrumb />*/}
                  <div className="main-body">
                    <PrivateRoutes />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Fullscreen>
      </Aux>
    );
  }
}
const mapStateToProps = state => {
  return {
    defaultPath: state.getIn([panelConstants.PANEL, "defaultPath"]),
    isFullScreen: state.getIn([panelConstants.PANEL, "isFullScreen"]),
    collapseMenu: state.getIn([panelConstants.PANEL, "collapseMenu"]),
    configBlock: state.getIn([panelConstants.PANEL, "configBlock"]),
    layout: state.getIn([panelConstants.PANEL, "layout"]),
    info: state.getIn([profileConstants.PROFILE, "info"], {}),
    isLoggedIn: state.getIn([userConstants.USER, "data", "access_token"], null) !== null,
    userRole: state.getIn([userConstants.USER, "data","role"]),
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getMe: () => dispatch(actions.setGetMeRequest()),
    onFullScreenExit: () => dispatch({ type: panelActions.FULL_SCREEN_EXIT }),
    onComponentWillMount: () => dispatch({ type: panelActions.COLLAPSE_MENU }),

  };
};
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(windowSize(AdminLayout))
);


