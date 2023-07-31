import localStorage from "localStore";
import React from "react";
import config from "config";
import * as panelConstants from "utils/globalRedux/panel/constants";
import get from "lodash/get";

const rtl = () =>
  get(
    localStorage.get(config.localStorageName, {}),
    `${panelConstants.PANEL}.rtlLayout`,
    false
  );
const withDirection = Component => props => {
  return <Component {...props} data-rtl={rtl()} />;
};

export default withDirection;
export { rtl };
