import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import windowSize from "react-window-size";
import * as panelConstants from "utils/globalRedux/panel/constants";
import * as userConstants from "utils/globalRedux/user/constants";
import NavLogo from "./NavLogo";
import NavContent from "./NavContent";
import OutsideClick from "./OutsideClick";
import Aux from "hoc/_Aux";
import * as panelActions from "utils/globalRedux/panel/actions";
import navigation from "src/menu-items";
import userNavigation from "src/user-menu-items";
import universityNavigation from "src/university-menu-items";
import marketingNavigation from "src/marketing-menu-items";
import navImage1 from "static/images/nav-bg/navbar-img-1.jpg";
import navImage2 from "static/images/nav-bg/navbar-img-2.jpg";
import navImage3 from "static/images/nav-bg/navbar-img-3.jpg";
import navImage4 from "static/images/nav-bg/navbar-img-4.jpg";
import navImage5 from "static/images/nav-bg/navbar-img-5.jpg";
import * as signInActions from "pages/auth/signIn/actions";
import {Scrollbars} from "react-custom-scrollbars";

class Navigation extends Component {
  resize = () => {
    const contentWidth = document.getElementById("root").clientWidth;

    if (this.props.layout === "horizontal" && contentWidth < 992) {
      this.props.onChangeLayout("vertical");
    }
  };

  componentDidMount() {
    this.resize();
    window.addEventListener("resize", this.resize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.resize);
  }
  logout = () => {
    const { logoutRequest } = this.props;
    logoutRequest();

  };
  render() {
    let navClass = ["pcoded-navbar"];
    if (
      this.props.preLayout !== null &&
      this.props.preLayout !== "" &&
      this.props.preLayout !== "layout-6" &&
      this.props.preLayout !== "layout-8"
    ) {
      navClass = [...navClass, this.props.preLayout];
    } else {
      navClass = [
        ...navClass,
        this.props.layoutType,
        this.props.navBackColor,
        this.props.navBrandColor,
        "drp-icon-" + this.props.navDropdownIcon,
        "menu-item-icon-" + this.props.navListIcon,
        this.props.navActiveListColor,
        this.props.navListTitleColor
      ];

      if (this.props.layout === "horizontal") {
        navClass = [...navClass, "theme-horizontal"];
      }

      if (this.props.navBackImage) {
        navClass = [...navClass, this.props.navBackImage];
      }

      if (this.props.navIconColor) {
        navClass = [...navClass, "icon-colored"];
      }

      if (!this.props.navFixedLayout) {
        navClass = [...navClass, "menupos-static"];
      }

      if (this.props.navListTitleHide) {
        navClass = [...navClass, "caption-hide"];
      }
    }

    if (this.props.windowWidth < 992 && this.props.collapseMenu) {
      navClass = [...navClass, "mob-open"];
    } else if (this.props.collapseMenu) {
      navClass = [...navClass, "navbar-collapsed"];
    }
    else if (this.props.windowWidth < 992 &&  this.props.collapseMenu && this.props.location.pathname === "/user/course/detail") {
      navClass = [...navClass, "mob-open"];
    }

    if (this.props.preLayout === "layout-6") {
      document.body.classList.add("layout-6");
      document.body.style.backgroundImage = this.props.layout6Background;
      document.body.style.backgroundSize = this.props.layout6BackSize;
    }

    if (this.props.preLayout === "layout-8") {
      document.body.classList.add("layout-8");
    }

    if (this.props.layoutType === "dark") {
      document.body.classList.add("datta-dark");
    } else {
      document.body.classList.remove("datta-dark");
    }

    if (this.props.rtlLayout) {
      document.body.classList.add("datta-rtl");
    } else {
      document.body.classList.remove("datta-rtl");
    }

    if (this.props.boxLayout) {
      document.body.classList.add("container");
      document.body.classList.add("box-layout");
    } else {
      document.body.classList.remove("container");
      document.body.classList.remove("box-layout");
    }

    let backImage, navStyle;
    if (this.props.navBackImage) {
      switch (this.props.navBackImage) {
        case "navbar-image-1":
          backImage = navImage1;
          break;
        case "navbar-image-2":
          backImage = navImage2;
          break;
        case "navbar-image-3":
          backImage = navImage3;
          break;
        case "navbar-image-4":
          backImage = navImage4;
          break;
        case "navbar-image-5":
          backImage = navImage5;
          break;
        default:
          backImage = "";
      }
      navStyle = {
        backgroundImage: `url(${backImage})`
      };
    }
    const { rtlLayout } = this.props;
    let navContent = (
        <Scrollbars>
          <div className="navbar-wrapper">
            {this.props.location.pathname !== "/user/course/detail"
             ? <NavLogo
              collapseMenu={this.props.collapseMenu}
              windowWidth={this.props.windowWidth}
              onToggleNavigation={this.props.onToggleNavigation}
              profileInfo={this.props.info}
              logout = {this.props.logoutRequest}
              />
              : ""
            }

            { this.props.userRole === "STUDENT-PROFILE"
                ? <NavContent navigation={userNavigation.items}/>
                    : this.props.userRole === "university"
                        ? <NavContent navigation={universityNavigation.items}/>
                        : this.props.userRole === "marketing"
                            ? <NavContent navigation={marketingNavigation.items}/>
                        : this.props.userRole === "ADMIN-PROFILE"
                            ? <NavContent navigation={navigation.items}/>
                          : this.props.userRole === "view"
                                ? <NavContent navigation={navigation.items}/>
                                : ""
            }
          </div>
        </Scrollbars>
    );
    if (this.props.windowWidth < 992) {
      navContent = (
        <OutsideClick location={this.props.location.pathname }>
          <Scrollbars>
            <div className="navbar-wrapper">
              {this.props.location.pathname !== "/user/course/detail"
                  ? <NavLogo
                      collapseMenu={this.props.collapseMenu}
                      windowWidth={this.props.windowWidth}
                      onToggleNavigation={this.props.onToggleNavigation}
                      profileInfo={this.props.info}
                      logout = {this.props.logoutRequest}
                  />
                  : ""
              }
              { this.props.userRole === "STUDENT-PROFILE"
                  ? <NavContent navigation={userNavigation.items}/>

                  : <NavContent navigation={navigation.items}/>
              }
            </div>
          </Scrollbars>
        </OutsideClick>
      );
    }

    return (

      <Aux>

        <nav className={navClass.join(" ")} style={navStyle}>

          {navContent}

        </nav>

      </Aux>



    );
  }
}

const mapStateToProps = state => {
  return {
    layout: state.getIn([panelConstants.PANEL, "layout"]),
    preLayout: state.getIn([panelConstants.PANEL, "preLayout"]),
    collapseMenu: state.getIn([panelConstants.PANEL, "collapseMenu"]),
    layoutType: state.getIn([panelConstants.PANEL, "layoutType"]),
    navBackColor: state.getIn([panelConstants.PANEL, "navBackColor"]),
    navBackImage: state.getIn([panelConstants.PANEL, "navBackImage"]),
    navIconColor: state.getIn([panelConstants.PANEL, "navIconColor"]),
    navBrandColor: state.getIn([panelConstants.PANEL, "navBrandColor"]),
    layout6Background: state.getIn([panelConstants.PANEL, "layout6Background"]),
    layout6BackSize: state.getIn([panelConstants.PANEL, "layout6BackSize"]),
    rtlLayout: state.getIn([panelConstants.PANEL, "rtlLayout"]),
    navFixedLayout: state.getIn([panelConstants.PANEL, "navFixedLayout"]),
    boxLayout: state.getIn([panelConstants.PANEL, "boxLayout"]),
    navDropdownIcon: state.getIn([panelConstants.PANEL, "navDropdownIcon"]),
    navListIcon: state.getIn([panelConstants.PANEL, "navListIcon"]),
    navActiveListColor: state.getIn([
      panelConstants.PANEL,
      "navActiveListColor"
    ]),
    navListTitleColor: state.getIn([panelConstants.PANEL, "navListTitleColor"]),
    navListTitleHide: state.getIn([panelConstants.PANEL, "navListTitleHide"]),

    userRole: state.getIn([userConstants.USER, "data","role"]),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logoutRequest: () => dispatch(signInActions.setLogoutRequest() ),
    onToggleNavigation: () => dispatch({ type: panelActions.COLLAPSE_MENU }),
    onChangeLayout: layout =>
      dispatch({ type: panelActions.CHANGE_LAYOUT, layout: layout })
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(windowSize(Navigation))
);
