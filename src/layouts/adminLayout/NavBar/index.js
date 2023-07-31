import React, { Component } from "react";
import { connect } from "react-redux";
import NavLeft from "./NavLeft";
import NavRight from "./NavRight";
import Aux from "hoc/_Aux";
import DEMO from "utils/globalRedux/panel/constants";
import * as panelActions from "utils/globalRedux/panel/actions";
import IntlMessages from "utils/intlMessages";
import * as courseConstants from "../../../pages/user/course/constants";

class NavBar extends Component {
  render() {
    let headerClass = [
      "navbar",
      "pcoded-header",
      "navbar-expand-lg",
      this.props.headerBackColor
    ];
    if (this.props.headerFixedLayout) {
      headerClass = [...headerClass, "headerpos-fixed"];
    }

    let toggleClass = ["mobile-menu"];
    if (this.props.collapseMenu) {
      toggleClass = [...toggleClass, "on"];
    }else if( this.props.collapseMenu && this.props.location === "/user/course/detail"){
      toggleClass = [...toggleClass, "on"];
    }
    // const onToggleCourseNavigation =() =>{
    //    const elements =document.getElementsByClassName('pcoded-navbar');
    //   console.log(elements,elements[0].classList.contains('mob-open'))
    //    if(elements.length > 0 &&  elements[0].classList.contains('mob-open')){
    //      elements[0].classList.remove('mob-open');
    //      document.getElementById('mobile-collapse1').classList.remove("on")
    //
    //    }else{
    //      elements[0].classList.add('mob-open');
    //      document.getElementById('mobile-collapse1').classList.add("on")
    //    }
    //  }

    return (
      <Aux>
        <header className={headerClass.join(" ")}>
          <div className="m-header">
            <a
              className={toggleClass.join(" ")}
              id="mobile-collapse1"
              href={DEMO.BLANK_LINK}
              onClick={this.props.onToggleNavigation}
              // style={this.props.location == "/user/course/detail" ? { zIndex: '999'} : {}}
            >
              <span />
            </a>
            {/*{this.props.windowWidth >= 575 &&*/}
            <a href="http://amoozal.com" className="b-brand">
              <div className="b-bg"/>
              <span className="b-title">
                <IntlMessages id="site.name"/>
                </span>
            </a>
            {/*}*/}
            { this.props.location === "/user/course/detail" &&
                <a
                    id="mobile-collapse1"
                    href={DEMO.BLANK_LINK}
                    onClick={this.props.onToggleNavigation}
                >
                <p className="lesson-list">
                    <IntlMessages id="site.list" />
                  </p>
                </a>
            }
          </div>
          <a className="mobile-menu" id="mobile-header" href={DEMO.BLANK_LINK}>
            <i className="feather icon-more-horizontal" />

          </a>
          <div className="collapse navbar-collapse">
            {/*<NavLeft />*/}
            {/*<NavRight rtlLayout={this.props.rtlLayout} />*/}
          </div>
        </header>
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    rtlLayout: state.getIn(["PANEL", "rtlLayout"]),
    headerBackColor: state.getIn(["PANEL", "headerBackColor"]),
    headerFixedLayout: state.getIn(["PANEL", "headerFixedLayout"]),
    collapseMenu: state.getIn(["PANEL", "collapseMenu"]),
    location: state.getIn(["router", "location",'pathname'], {}),

  };
};

const mapDispatchToProps = dispatch => {
  return {
    onToggleNavigation: () => dispatch({ type: panelActions.COLLAPSE_MENU })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar);
