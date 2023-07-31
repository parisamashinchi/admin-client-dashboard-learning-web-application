import React from "react";
import { toDate } from "utils/moment";
import PersianNumber from "components/PersianNumber";

export function timeRender(time, format = "jYYYY/jMM/jD") {
  return <PersianNumber>{toDate(time, format)}</PersianNumber>;
}
