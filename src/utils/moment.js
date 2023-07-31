import React from "react";
import moment from "jalali-moment";
import config from "src/config";

export function toDate(date, format = "YYYY-MM-DD", diff = false) {
  if (isNaN(Date.parse(date.toString())) === true) {
    return <snan />;
  }
  let dateTime = "";
  if (diff) {
  } else {
    dateTime = moment(date.toString())
      .locale(config.language, { useGregorianParser: true })
      .format(format);
  }
  return dateTime;
}

const Moment = ({ className, diff, format = "YYYY-MM-DD", children }) => {
  return <span className={className}>{toDate(children, format, diff)}</span>;
};
export default Moment;
