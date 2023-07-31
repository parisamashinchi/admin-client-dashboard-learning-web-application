import React from "react";
import { Tooltip } from "antd/lib/index";
import _ from "lodash";
import { formatMessage } from "localization";
import { BooleanIcon } from "./booleanRender.style";

export function booleanRender(boolean, isReverse = false, tooltip) {
  // isReverse,it`s meaning when data came fo client  from server, the data is upside down data

  function getBool(val) {
    return !!JSON.parse(String(val).toLowerCase());
  }

  if (_.isString(boolean)) {
    boolean = getBool(boolean);
  }

  let data;
  if (isReverse) {
    data = !boolean;
  } else {
    data = boolean;
  }

  if (data) {
    return (
      <Tooltip title={tooltip ? formatMessage(tooltip.true) : null}>
        <BooleanIcon bool={true} />
      </Tooltip>
    );
  } else {
    return (
      <Tooltip title={tooltip ? formatMessage(tooltip.false) : null}>
        <BooleanIcon />
      </Tooltip>
    );
  }
}
