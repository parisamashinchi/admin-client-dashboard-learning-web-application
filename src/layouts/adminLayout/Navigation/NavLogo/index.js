import React from "react";
import Aux from "hoc/_Aux";
import IntlMessages from "utils/intlMessages";
import {Avatar} from "antd";
import avatar from "src/static/images/avatar.png";
import isEmpty from "lodash/isEmpty";

const navLogo = props => {
  let toggleClass = ["mobile-menu"];
  if (props.collapseMenu) {
    toggleClass = [...toggleClass, "on"];
  }
  return (
    <Aux>
        <div className="b-brand">

               <a href="http://amoozal.com">
                   { props.windowWidth >= 575
                       ? <div className="b-bg" />
                       : <div className="b-bg b-bg-mobile" />
                   }
               </a>

           <div>
               { isEmpty(props.profileInfo.profile_media)
               ? <Avatar src={avatar} alt="avatar"/>
               : <Avatar src={props.profileInfo.profile_media} alt="avatar"/>
               }

           </div>
            <span className="b-title">
              <span className="b-title-hello">
                  <IntlMessages id="navBar.welcome1" />
                  { !isEmpty(props.profileInfo) &&
                      <span>{props.profileInfo.name} <span>{props.profileInfo.family}</span></span>

                  }
              </span>
              <IntlMessages id="navBar.welcome2" />
            </span>
            <div className="b-icon">
                <i className="icon feather icon-bell" />
                <a
                    onClick={props.logout}
                >
                    <i className="feather icon-log-out" />
                </a>
            </div>
        </div>

        <a
            className={toggleClass.join(" ")}
            id="mobile-collapse"
            onClick={props.onToggleNavigation}
        >
            <span />
            <p className="lesson-list">
                <IntlMessages id="site.list" />
            </p>
        </a>
    </Aux>
  );
};

export default navLogo;
